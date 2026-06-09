import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(88,204,2,0.16),transparent_24%),linear-gradient(to_bottom_right,#ecfccb,#f8fafc)] text-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#58CC02] text-2xl font-semibold text-white shadow-xl shadow-[#58cc0230]">
              D
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-600">Duolingo Clone</p>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Spanish lessons that feel fun and fast.
              </h1>
            </div>
          </div>

          <Link
            href="/lesson"
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
          >
            Start lesson
          </Link>
        </header>

        <main className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-start">
          <section className="space-y-8 rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-[0_35px_85px_-45px_rgba(15,23,42,0.3)] sm:p-10">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-3 rounded-full bg-[#d4f2c2] px-4 py-2 text-sm font-semibold text-[#166800]">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#58CC02] text-white">
                  🔥
                </span>
                Build a streak with just one short lesson a day.
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Learn Spanish through games, XP, and streaks.
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-slate-700">
                  A friendly clone designed to make practice feel playful. Follow bite-sized lessons, earn XP, and stay motivated with daily progress.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Current streak</p>
                <p className="mt-4 text-4xl font-semibold text-slate-950">0 days</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Complete your first lesson to start a streak.</p>
              </article>

              <article className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Total XP</p>
                <p className="mt-4 text-4xl font-semibold text-slate-950">0 XP</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Gain points with every correct answer.</p>
              </article>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-[28px] bg-[#58CC02] p-6 text-white shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-[0.2em]">Lesson goal</p>
                <p className="mt-4 text-3xl font-semibold">Spanish basics</p>
                <p className="mt-2 text-sm leading-6 text-slate-100/90">Translate, match, and fill in the blanks with friendly feedback.</p>
              </article>

              <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Why this app?</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  <li>• Bite-sized lessons for daily practice.</li>
                  <li>• Clear progress with XP and streaks.</li>
                  <li>• Friendly, gamified learning flow.</li>
                </ul>
              </article>
            </div>
          </section>

          <aside className="space-y-6 rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-[0_35px_85px_-45px_rgba(15,23,42,0.3)] sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Featured lesson</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950">Spanish Lesson 1</h3>
              </div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#FF9600] text-white shadow-lg">
                ⚡
              </div>
            </div>

            <ul role="list" className="space-y-4 text-slate-700">
              <li className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-950">Translate basic phrases</p>
                <p className="mt-2 text-sm">Practice short sentences with instant feedback.</p>
              </li>
              <li className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-950">Match words correctly</p>
                <p className="mt-2 text-sm">Connect Spanish words to their English meaning.</p>
              </li>
              <li className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-950">Fill in the blank</p>
                <p className="mt-2 text-sm">Choose the right word to complete each phrase.</p>
              </li>
            </ul>

            <Link
              href="/lesson"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#58CC02] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#58cc0230] transition hover:bg-[#47b300]"
            >
              Continue lesson
            </Link>
          </aside>
        </main>
      </div>
    </div>
  );
}
