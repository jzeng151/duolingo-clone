-- Onboarding preferences captured anonymously (language, reason, proficiency,
-- daily goal) and synced to the learner's row once they create an account.
-- Stored on user_progress to avoid a second table; the columns are nullable so
-- existing rows and the complete_lesson() flow are unaffected.

alter table public.user_progress
  add column if not exists course_language text,
  add column if not exists learning_reason text,
  add column if not exists proficiency text,
  add column if not exists daily_goal_minutes integer;

-- Upsert onboarding choices for the current user without touching xp/streak.
-- security definer (like complete_lesson) so it can write through the
-- select-only RLS policies on user_progress.
create or replace function public.save_onboarding(
  p_language text,
  p_reason text,
  p_proficiency text,
  p_goal_minutes integer
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null then
    raise exception 'unauthenticated';
  end if;

  insert into public.user_progress (
    user_id,
    course_language,
    learning_reason,
    proficiency,
    daily_goal_minutes
  )
  values (
    v_user_id,
    p_language,
    p_reason,
    p_proficiency,
    p_goal_minutes
  )
  on conflict (user_id) do update set
    course_language = excluded.course_language,
    learning_reason = excluded.learning_reason,
    proficiency = excluded.proficiency,
    daily_goal_minutes = excluded.daily_goal_minutes;
end;
$$;

revoke all on function public.save_onboarding(text, text, text, integer) from public;
grant execute on function public.save_onboarding(text, text, text, integer) to authenticated;
