create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  total_xp integer not null default 0,
  current_streak integer not null default 0,
  last_completed_on date
);

create table if not exists public.lesson_completions (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

alter table public.user_progress enable row level security;
alter table public.lesson_completions enable row level security;

drop policy if exists "Users can view their own progress"
on public.user_progress;

create policy "Users can view their own progress"
on public.user_progress
for select
using (auth.uid() = user_id);

drop policy if exists "Users can view their own lesson completions"
on public.lesson_completions;

create policy "Users can view their own lesson completions"
on public.lesson_completions
for select
using (auth.uid() = user_id);

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
begin
  if v_user_id is null then
    raise exception 'unauthenticated';
  end if;

  if p_lesson_id is null or btrim(p_lesson_id) = '' then
    raise exception 'lesson_id is required';
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