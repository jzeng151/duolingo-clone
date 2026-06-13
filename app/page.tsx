import Link from 'next/link';
import { createServerSupabaseClient } from '../lib/supabase-server';
import SignOutButton from './components/SignOutButton';

export default async function HomePage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#58CC02]">
            Language learning
          </p>

          <h1 className="mt-4 text-4xl font-bold text-slate-950 sm:text-5xl">
            Practice Spanish one lesson at a time.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Log in or create an account to complete exercises, earn XP, and build your streak.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Sign up
            </Link>
          </div>
        </div>
      </main>
    );
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
            Complete a short lesson with translation, fill-in-the-blank, and matching exercises.
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
