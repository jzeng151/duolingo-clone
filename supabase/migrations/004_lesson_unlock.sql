-- Sequential-unlock enforcement at the write path.
--
-- The /lesson route already redirects locked lessons, but complete_lesson() is
-- granted to authenticated users and callable directly with the public client,
-- so without a server-side check a learner could record an out-of-order
-- completion and bypass the course map. This migration encodes the lesson order
-- in the database and makes complete_lesson() reject a lesson until every
-- earlier lesson is done.
--
-- SOURCE OF TRUTH: course_lessons mirrors ALL_LESSON_IDS in
-- src/content/course.ts. If you add/reorder lessons there, add a follow-up
-- migration to keep this table in sync.

create table if not exists public.course_lessons (
  lesson_id text primary key,
  position integer not null unique
);

-- Order matches src/content/course.ts UNITS (Section 1, Units 1-5).
insert into public.course_lessons (lesson_id, position) values
  ('spanish-lesson-1', 1),
  ('spanish-1-2', 2),
  ('spanish-1-3', 3),
  ('spanish-1-4', 4),
  ('spanish-2-1', 5),
  ('spanish-2-2', 6),
  ('spanish-2-3', 7),
  ('spanish-2-4', 8),
  ('spanish-3-1', 9),
  ('spanish-3-2', 10),
  ('spanish-3-3', 11),
  ('spanish-3-4', 12),
  ('spanish-4-1', 13),
  ('spanish-4-2', 14),
  ('spanish-4-3', 15),
  ('spanish-4-4', 16),
  ('spanish-5-1', 17),
  ('spanish-5-2', 18),
  ('spanish-5-3', 19),
  ('spanish-5-4', 20)
on conflict (lesson_id) do update set position = excluded.position;

-- Lesson order is not secret; allow authenticated reads. The completion check
-- below runs inside a security-definer function and reads the table as owner
-- regardless of RLS.
alter table public.course_lessons enable row level security;

drop policy if exists "Anyone authenticated can read course order"
on public.course_lessons;

create policy "Anyone authenticated can read course order"
on public.course_lessons
for select
to authenticated
using (true);

create or replace function public.complete_lesson(p_lesson_id text)
returns table (
  xp_earned integer,
  current_streak integer
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_today date := timezone('utc', now())::date;
  v_rows_inserted integer;
  v_current_streak integer;
  v_position integer;
  v_unmet integer;
begin
  if v_user_id is null then
    raise exception 'unauthenticated';
  end if;

  if p_lesson_id is null or btrim(p_lesson_id) = '' then
    raise exception 'lesson_id is required';
  end if;

  -- Sequential-unlock guard (mirrors src/content/course.ts computeStates). If
  -- the lesson is part of the ordered course, every earlier lesson must already
  -- be completed. Lessons absent from course_lessons (e.g. legacy ids) are
  -- unaffected.
  select position into v_position
  from public.course_lessons
  where lesson_id = btrim(p_lesson_id);

  if v_position is not null then
    select count(*) into v_unmet
    from public.course_lessons cl
    where cl.position < v_position
      and not exists (
        select 1 from public.lesson_completions lc
        where lc.user_id = v_user_id and lc.lesson_id = cl.lesson_id
      );

    if v_unmet > 0 then
      raise exception 'lesson is locked: complete earlier lessons first';
    end if;
  end if;

  insert into public.lesson_completions (user_id, lesson_id)
  values (v_user_id, btrim(p_lesson_id))
  on conflict do nothing;

  get diagnostics v_rows_inserted = row_count;

  if v_rows_inserted = 1 then
    insert into public.user_progress (
      user_id,
      total_xp,
      current_streak,
      last_completed_on
    )
    values (
      v_user_id,
      10,
      1,
      v_today
    )
    on conflict (user_id)
    do update set
      total_xp = public.user_progress.total_xp + 10,
      current_streak =
        case
          when public.user_progress.last_completed_on = v_today
            then public.user_progress.current_streak
          when public.user_progress.last_completed_on = v_today - 1
            then public.user_progress.current_streak + 1
          else 1
        end,
      last_completed_on = v_today
    returning public.user_progress.current_streak
    into v_current_streak;

    return query
    select 10, v_current_streak;
  end if;

  select coalesce(public.user_progress.current_streak, 0)
  into v_current_streak
  from public.user_progress
  where public.user_progress.user_id = v_user_id;

  return query
  select 0, coalesce(v_current_streak, 0);
end;
$$;

revoke all on function public.complete_lesson(text) from public;
grant execute on function public.complete_lesson(text) to authenticated;
