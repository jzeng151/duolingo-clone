import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '../../lib/supabase-server';
import SignOutButton from '../components/SignOutButton';

export default async function LearnPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: progress } = await supabase
    .from('user_progress')
    .select('total_xp, current_streak')
    .eq('user_id', user.id)
    .maybeSingle();

  const totalXp = progress?.total_xp ?? 0;
  const currentStreak = progress?.current_streak ?? 0;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#58CC02]">
              Your dashboard
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-950">
              Keep learning!
            </h1>
          </div>

          <SignOutButton />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Current streak
            </p>

            <p className="mt-4 text-4xl font-bold text-slate-950">
              🔥 {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
            </p>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Total XP
            </p>

            <p className="mt-4 text-4xl font-bold text-slate-950">
              ⚡ {totalXp} XP
            </p>
          </article>
        </div>

        <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Spanish lesson
          </p>

          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            Practice the basics
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Complete a short lesson with picture, multiple-choice, word-bank, and matching exercises.
          </p>

          <Link
            href="/lesson"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#58CC02] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-[#58CC02]/20 transition hover:bg-[#47b300]"
          >
            Start Lesson
          </Link>
        </section>
      </div>
    </main>
  );
}
