-- Mistake Pattern Detector: per-user error events.
--
-- Stores one row per wrong answer, tagged with its skill category. Weak-area
-- detection (threshold within a rolling window) runs in application code over
-- these rows (src/lib/weakness.ts), so this migration only needs the table,
-- an index for the windowed read, and row-level security. Anonymous learners
-- are not persisted — the feature is authenticated-only by design.

create table if not exists public.mistake_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (
    category in ('vocabulary', 'grammar', 'spelling', 'listening', 'word_order')
  ),
  -- The lesson the mistake happened in. Null for targeted-practice sessions,
  -- which are not course lessons.
  lesson_id text,
  created_at timestamptz not null default now()
);

-- The hot path is "this user's events newer than <cutoff>".
create index if not exists mistake_events_user_created_idx
  on public.mistake_events (user_id, created_at desc);

alter table public.mistake_events enable row level security;

drop policy if exists "Users can view their own mistake events"
  on public.mistake_events;

create policy "Users can view their own mistake events"
  on public.mistake_events
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own mistake events"
  on public.mistake_events;

create policy "Users can insert their own mistake events"
  on public.mistake_events
  for insert
  with check (auth.uid() = user_id);
