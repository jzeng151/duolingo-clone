'use client';

type CompletionScreenProps =
  | { status: 'loading' }
  | { status: 'success'; streakDays: number; xpEarned: number }
  | { status: 'error'; onRetry: () => void };

export default function CompletionScreen(props: CompletionScreenProps) {
  return (
    <section className="mx-auto flex max-w-lg flex-col items-center justify-center rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-xl">
      {props.status === 'loading' ? (
        <>
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-slate-200 border-t-[#58CC02] animate-spin" />
          <p className="text-lg font-semibold text-slate-900">Saving your progress...</p>
          <p className="mt-2 text-sm text-slate-500">Hold tight while we lock in your streak and XP.</p>
        </>
      ) : props.status === 'success' ? (
        <>
          <div className="mb-6 rounded-full bg-[#FF9600] bg-opacity-10 px-6 py-4 text-[#FF8600]">
            <p className="text-3xl font-extrabold">You're on fire!</p>
          </div>
          <p className="text-2xl font-bold text-[#FF9600]">🔥 {props.streakDays} day streak!</p>
          <p className="mt-4 text-2xl font-bold text-[#FF9600]">⚡ +{props.xpEarned} XP</p>
          <p className="mt-5 text-sm font-medium text-slate-600">Nice work — your learning streak is up to date.</p>
        </>
      ) : (
        <>
          <div className="mb-6 rounded-full bg-[#FFD2D2] px-6 py-4 text-[#FF4B4B]">
            <p className="text-3xl font-extrabold">Uh oh!</p>
          </div>
          <p className="text-lg font-semibold text-slate-900">Progress couldn't be saved. Check your connection.</p>
          <button
            type="button"
            onClick={props.onRetry}
            className="mt-6 w-full rounded-xl bg-[#FF4B4B] border-b-4 border-[#CC0000] px-6 py-4 text-lg font-bold text-white uppercase tracking-wide transition hover:bg-[#CC0000] hover:border-b-2"
          >
            Try again
          </button>
        </>
      )}
    </section>
  );
}
