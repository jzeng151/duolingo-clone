# TODOS

This is the build checklist. Tasks are in order — each one builds on the one before it. Work through them top to bottom. Check off each task when it's done.

---

## Step 1: Initial setup

Both of you need to do this before splitting off. It takes about an hour.

- [x] ** Initialize the app** — In your terminal, run this command exactly:
  ```bash
  npx create-next-app@latest duolingo-clone --typescript --tailwind --app --src-dir
  ```
  When it asks questions: say **Yes** to TypeScript, **Yes** to Tailwind, **Yes** to App Router, **Yes** to `src/` directory, **No** to everything else. This creates the blank project.

- [x] ** Push to GitHub** — Go to github.com, create a new repository called `duolingo-clone`, then run:
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/duolingo-clone.git
  git push -u origin main
  ```

- [x] ** Create a Supabase project** — Go to [supabase.com](https://supabase.com), sign in, click "New project". Name it `duolingo-clone`. Pick any region close to you. Save the generated database password somewhere safe — you can't recover it later.

- [x] ** Add environment variables** — In Supabase, go to **Settings → API**. Copy the three values into a new file called `.env.local` at the root of the project:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
  ```
  - `NEXT_PUBLIC_SUPABASE_URL` → Supabase: Settings → API → **Project URL**
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Supabase: Settings → API → **anon public**
  - `SUPABASE_SERVICE_ROLE_KEY` → Supabase: Settings → API → **service_role** ⚠️ Never share this or commit it to GitHub.

  Also create `.env.example` with the same keys but empty values (safe to commit):
  ```
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=
  SUPABASE_SERVICE_ROLE_KEY=
  ```

- [x] ** Install Supabase and confirm it runs** — Run:
  ```bash
  npm install @supabase/supabase-js @supabase/ssr
  npm run dev
  ```
  Open `http://localhost:3000`. If you see the Next.js welcome page, setup worked.

---

## GitHub Workflow

1. Create and switch to a branch for the feature you're working on
  -Do this for each step

2. When you finish the feature stage, commit, push to feature branch

3. Create a pull request

4. Sync your main branch with GitHub when the pull request is merged

---

### Step 2: Set up the database

- [x] ** Create the database tables** — In the Supabase dashboard, go to **SQL Editor** and run the SQL from `ARCHITECTURE.md` → "Database Schema" section. This creates the `users`, `xp_events`, and `streaks` tables.

- [x] ** Add the auto-create trigger** — In the same SQL Editor, run the trigger SQL from `ARCHITECTURE.md` → "Auth Trigger" section. This makes sure a `users` row is created automatically whenever someone signs up.

- [x] ** Add security rules** — In the Supabase dashboard, go to **Authentication → Policies**. Enable Row Level Security on all three tables and add a policy to each: users can only read rows where `user_id = auth.uid()`.

- [x] ** Write the lesson-completion database function** — Create a file `supabase/migrations/002_complete_lesson.sql`. This is the function that handles everything when a lesson is finished: saving XP, updating the streak, and making sure it only counts once. The full logic is in `DESIGN-DOC.md` → "Resolved Architecture Decisions → D1" and "ASCII Diagrams → POSTGRES FUNCTION". Paste that logic to an AI and ask it to write the SQL function.

---

### Step 3: Add login and sign-up ` `

- [x] ** Add sign-up with email** — Create `src/app/signup/page.tsx`. Build a form with email and password fields. When submitted, call Supabase's `signUp()` function. On success, redirect to `/lesson`.

- [x] ** Add login** — Create `src/app/login/page.tsx`. Same idea — email + password form, call Supabase's `signInWithPassword()`, redirect to `/` on success.

- [x] ** Add a logout button** — Add a "Log out" button to the home page. When clicked, call Supabase's `signOut()` and redirect to `/login`.

- [x] ** Protect the lesson page** — In `src/app/lesson/page.tsx`, check if there's a logged-in user. If not, redirect to `/login`. Ask an AI: "How do I check if a user is logged in on a Next.js App Router page using Supabase SSR?"

---

### Step 4: Define the exercise format

- [x] ** Create the exercise types file** — Create `src/content/types.ts` with this exact content:
  ```typescript
  export type Exercise =
    | { type: 'translate'; prompt: string; answer: string; hint?: string }
    | { type: 'match'; pairs: Array<{ left: string; right: string }> }
    | { type: 'fill'; template: string; answer: string; options: string[] }
  ```

---

### Step 5: Build the lesson screen

- [x] ** Build the lesson state machine** — Create `src/lib/lesson-state-machine.ts`. This is the logic engine for the lesson — it tracks what's happening at every moment. Use this exact structure:
  ```typescript
  type LessonState = 'idle' | 'showing_question' | 'feedback_correct' | 'feedback_wrong' | 'done' | 'persisting' | 'complete' | 'error'
  type LessonAction = { type: 'START' } | { type: 'SUBMIT'; answer: string } | { type: 'NEXT' } | { type: 'SAVE_SUCCESS'; xpEarned: number; newStreak: number } | { type: 'SAVE_ERROR' } | { type: 'RETRY' }
  type LessonEventType = 'ANSWER_SUBMITTED' | 'XP_AWARDED' | 'LESSON_COMPLETED' | 'STREAK_EXTENDED'
  type TransitionResult = { nextState: LessonState; events: LessonEventType[] }
  
  export function transition(state: LessonState, action: LessonAction): TransitionResult { ... }
  ```
  Ask an AI to implement the `transition` function. The full state diagram is in `DESIGN-DOC.md` → "ASCII Diagrams → LESSON FLOW".

- [X] ** Build the question display component** — Create `src/components/QuestionDisplay.tsx`. It receives an `Exercise` object and renders the right UI for it. For `translate`: show the prompt and a text input. For `fill`: show the sentence with a blank and a row of word buttons. For `match`: show two columns of words to pair up. See `DESIGN.md` for how the answer option cards should look.

- [X] ** Build the feedback drawer** — Create `src/components/FeedbackDrawer.tsx`. This is the panel that slides up from the bottom after each answer. Green background + checkmark if correct. Red background + correct answer shown if wrong. Full-width "Continue" button. See `DESIGN.md` → "Feedback Drawer" for the exact colors and styling.

- [ ] ** Build the completion screen** — Create `src/components/CompletionScreen.tsx`. Shows after the last question. Displays XP earned and current streak. Has two states:
  - **Loading:** show a spinner while the save is in progress
  - **Success:** show "🔥 X day streak!" and "⚡ +X XP" with a celebration feel
  - **Error:** show "Progress couldn't be saved. Check your connection." with a "Try again" button

- [ ] ** Wire the lesson runner together** — Create `src/components/LessonRunner.tsx`. This component:
  1. Holds the state machine state using React's `useState`
  2. Shows the progress bar at the top
  3. Renders `<QuestionDisplay>` for the current exercise
  4. Shows `<FeedbackDrawer>` when in feedback state
  5. Shows `<CompletionScreen>` when done
  6. Accepts an `onComplete(result)` callback prop that gets called with the server's response

---

### Step 6: Save lesson results ` `

- [ ] ** Build the save-lesson server action** — Create `src/actions/completeLesson.ts`. This is a server function (not browser code) that:
  1. Checks who's logged in using `supabase.auth.getUser()` — never trust data sent from the browser
  2. Calls the `complete_lesson()` database function with the lesson ID
  3. Returns the updated XP and streak count
  
  The full code pattern is in `DESIGN-DOC.md` → "Resolved Architecture Decisions → D6".

- [ ] ** Create the Spanish exercise content** — Create `src/content/spanish-lesson-1.ts` with 5–8 exercises using the `Exercise` type from `src/content/types.ts`. Include at least one of each type (translate, match, fill). Example:
  ```typescript
  import type { Exercise } from './types'
  
  export const spanishLesson1: Exercise[] = [
    { type: 'translate', prompt: 'The cat', answer: 'el gato' },
    { type: 'translate', prompt: 'The dog', answer: 'el perro' },
    { type: 'fill', template: 'Yo ___ un estudiante.', answer: 'soy', options: ['soy', 'es', 'eres', 'somos'] },
    { type: 'match', pairs: [{ left: 'hello', right: 'hola' }, { left: 'goodbye', right: 'adiós' }, { left: 'please', right: 'por favor' }] },
  ]
  ```

---

### Step 7: Wire everything together and build the home page

- [ ] ** Wire the lesson page** — Create `src/app/lesson/page.tsx`. Import `<LessonRunner>` and the Spanish exercises. Pass `onComplete` as a prop that calls Bath's `completeLesson` server action. This is the page that makes everything connect.

- [ ] ** Build the home page** — Update `src/app/page.tsx` to show the logged-in user's streak count, total XP, and a "Start Lesson" button. Fetch the data from Supabase using the user's session.

---

## Milestone 2 — Coming Later

Don't start these until Milestone 1 is fully working and feels good.

- [ ] **Wrong-answer re-queuing** — When a user gets an answer wrong, add that exercise back into the queue so they have to get it right before finishing the lesson.
- [ ] **Skill tree / course map** — A visual map of all the available lessons, showing which are locked and which are unlocked.
- [ ] **Hearts / lives system** — Give users a limited number of wrong answers before the lesson ends.
- [ ] **Placement test** — Let returning learners skip beginner content by testing out of early lessons.
- [ ] **Streak freeze** — Let users protect a streak on a missed day.
- [ ] **Milestone celebrations** — Confetti and special animations at 7-day, 30-day streak milestones.
- [ ] **Friend leaderboard** — Let users add friends and see a weekly XP ranking.
- [ ] **Timezone auto-detection** — Automatically detect the user's timezone on sign-up. See "Deferred Notes" below.
- [ ] **Audio** — Text-to-speech for exercises and listening exercises.
- [ ] **Speaking exercises** — Microphone-based pronunciation practice.
- [ ] **Spaced repetition** — Track which words a user struggles with and surface them more often.

---

## Deferred Notes

### Timezone auto-detection on signup

**What:** On new user sign-up, detect the user's browser timezone automatically and save it to their account instead of defaulting to Pacific Time.

**Why:** The streak system checks the user's stored timezone to decide what "today" means. If a user in Tokyo signs up and nothing detects their timezone, their streak will count days using Pacific Time — wrong for anyone not in California.

**How:** The browser exposes the timezone via `Intl.DateTimeFormat().resolvedOptions().timeZone`, which returns a string like `'Asia/Tokyo'`. Right after sign-up, call a server function that writes that value to the user's database row.

**Where to start:** `src/app/auth/callback/route.ts` — add a call to a server function that writes the timezone after the auth callback completes.

**Depends on:** Step 2 (database tables) must be done first.
