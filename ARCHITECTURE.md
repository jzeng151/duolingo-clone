# Architecture

This document describes the technology stack, project structure, and database schema for the Duolingo clone.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 14+ (App Router) | Full-stack React framework. Handles both the frontend UI and backend server functions in one project. |
| **Language** | TypeScript | Catches errors before the code runs. Both contributors use the same type definitions. |
| **Styling** | Tailwind CSS | Utility classes directly in the HTML. Fast to build with, easy to read. |
| **Database** | Supabase (PostgreSQL) | Free-tier hosted Postgres. Includes auth, real-time, and a JS client out of the box. |
| **Auth** | Supabase Auth | Email/password sign-up and login. Handles sessions automatically. |
| **Deployment** | Vercel | Deploys automatically on every push to `main`. Free tier is sufficient. |
| **Testing (unit)** | Vitest | Fast unit tests for pure functions (streak logic, state machine). |
| **Testing (E2E)** | Playwright | Automated browser tests for full user flows (complete a lesson, check XP updates). |
| **CI** | GitHub Actions | Runs lint, type-check, build, and tests on every pull request. Also checks that database migrations are in sync. |

---

## Project Structure

```
duolingo-clone/
├── src/
│   ├── app/                        # Next.js pages (App Router)
│   │   ├── page.tsx                # Home / dashboard (shows streak + XP)
│   │   ├── lesson/
│   │   │   └── page.tsx            # Lesson page
│   │   └── auth/
│   │       └── callback/
│   │           └── route.ts        # Post-login redirect handler
│   ├── components/
│   │   ├── LessonRunner.tsx        # Runs through the exercises in order
│   │   ├── FeedbackDrawer.tsx      # Bottom drawer: green/red after each answer
│   │   └── CompletionScreen.tsx    # End-of-lesson screen: XP earned, streak
│   ├── lib/
│   │   └── lesson-state-machine.ts # Logic for what happens at each step of a lesson
│   ├── actions/
│   │   └── completeLesson.ts       # Server function: saves XP + streak to database
│   └── content/
│       ├── types.ts                # TypeScript types for exercises (translate, match, fill)
│       └── spanish-lesson-1.ts    # Hardcoded Spanish exercises for Milestone 1
├── supabase/
│   └── migrations/
│       ├── 001_initial.sql         # Creates users, xp_events, streaks tables + auth trigger
│       └── 002_complete_lesson.sql # complete_lesson() database function
├── e2e/
│   └── lesson-completion.spec.ts  # Playwright end-to-end test
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI
├── .env.local                      # Your actual keys (never commit this)
├── .env.example                    # Placeholder keys (safe to commit)
├── TODOS.md
├── PRD.md
├── ARCHITECTURE.md
├── DESIGN.md
└── DESIGN-DOC.md
```

---

## Database Schema

Three tables. Everything in the app reads from or writes to these.

### `users`
Stores one row per registered user. Extends Supabase's built-in auth system.

```sql
users (
  id         uuid primary key references auth.users,
  timezone   text not null default 'America/Los_Angeles'
  -- IANA timezone string, e.g. 'America/New_York', 'Asia/Tokyo'
  -- Used to calculate what "today" means for streak purposes
)
```

### `xp_events`
Records every completed lesson. One row per lesson per user per day.

```sql
xp_events (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references users(id),
  lesson_id     text not null,          -- e.g. 'spanish-lesson-1'
  completed_day date not null,          -- today's date in the user's timezone
  xp_earned     integer not null,       -- XP awarded for this lesson
  created_at    timestamptz default now(),

  unique (user_id, lesson_id, completed_day)
  -- This unique constraint is what prevents a lesson from being counted twice.
  -- If you submit the same lesson twice on the same day, the second insert is ignored.
)
```

### `streaks`
Tracks each user's current streak. One row per user.

```sql
streaks (
  user_id              uuid primary key references users(id),
  current_streak       integer not null default 0,
  last_completed_day   date
  -- null if the user has never completed a lesson
)
```

---

## Auth Trigger

When a new user signs up, Supabase creates a row in `auth.users` (its internal table). This trigger automatically creates a matching row in `public.users` so the foreign keys in `xp_events` work correctly.

```sql
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

---

## Security Rules (Row Level Security)

All three tables have RLS enabled. This means:

- A logged-in user can only read their own rows — not anyone else's XP or streaks.
- Writes (creating XP events, updating streaks) go through **server functions only**, using a privileged key that is never exposed to the browser.
- The browser only ever talks to Supabase using the safe "anon" key, which only allows reading your own data.

---

## How Lesson Completion Works (End to End)

1. User finishes the last exercise in the lesson.
2. Browser calls the `completeLesson` server function.
3. Server function checks: is the user actually logged in? (If not, returns an error.)
4. Server function calls the `complete_lesson()` database function, passing in the lesson ID.
5. Database function:
   - Looks up the user's timezone to figure out what "today" is.
   - Tries to insert a row into `xp_events`. If a row already exists for this user + lesson + today (double-submit), it skips the insert and returns the existing data instead.
   - If the insert succeeded, updates the streak: extend by 1 if they studied yesterday, reset to 1 if they missed days, no change if they already studied today.
   - Returns the XP earned and the new streak count.
6. Browser receives the result and shows the completion screen.

---

## Exercise Types

Defined in `src/content/types.ts`. Both contributors must import from this file — do not redefine these types elsewhere.

```typescript
type Exercise =
  | { type: 'translate'; prompt: string; answer: string; hint?: string }
  | { type: 'match'; pairs: Array<{ left: string; right: string }> }
  | { type: 'fill'; template: string; answer: string; options: string[] }
```

**Answer matching rules:**
- `translate` and `fill`: case-insensitive string comparison.
- `match`: all pairs must be correct to earn full XP. No partial credit in Milestone 1.

---

## State Machine

The lesson runs through a state machine defined in `src/lib/lesson-state-machine.ts`. It tracks where the user is at every moment during a lesson.

```
States:
  Idle              → waiting for lesson to start
  ShowingQuestion   → question is on screen, waiting for answer
  Submitted         → user hit submit, answer being checked
  Feedback(correct) → green drawer showing, answer was right
  Feedback(wrong)   → red drawer showing, correct answer displayed
  Done              → all exercises finished, ready to save
  Persisting        → saving to database
  CompletionScreen  → save succeeded, showing XP + streak
  ErrorState        → save failed, showing retry button

Key rule: transition() always returns { nextState, events }
  — the events list records what happened (ANSWER_SUBMITTED, XP_AWARDED, etc.)
  — this makes the state history inspectable for debugging
```
