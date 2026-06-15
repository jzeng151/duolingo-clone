'use client';

import Link from 'next/link';
import HeroAnimation from '../../app/components/HeroAnimation';

type CompletionScreenProps =
  | { status: 'loading' }
  | { status: 'success'; streakDays: number; xpEarned: number; accuracy: number; anonymous?: boolean }
  | { status: 'error'; onRetry: () => void };

function StatCard({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex-1 rounded-2xl border-2 border-b-4 p-0.5 text-center" style={{ borderColor: color }}>
      <p className="rounded-t-xl py-1 text-xs font-bold uppercase tracking-wide text-white" style={{ backgroundColor: color }}>
        {label}
      </p>
      <p className="py-2 text-2xl font-extrabold" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

export default function CompletionScreen(props: CompletionScreenProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
      {props.status === 'loading' ? (
        <>
          <div className="mb-6 h-16 w-16 animate-spin rounded-full border-4 border-[#E5E5E5] border-t-[#58CC02]" />
          <p className="text-lg font-bold text-[#4B4B4B]">Saving your progress…</p>
          <p className="mt-2 text-sm text-[#777777]">Hold tight while we lock in your streak and XP.</p>
        </>
      ) : props.status === 'success' ? (
        <>
          <div className="h-44 w-44">
            <HeroAnimation />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-[#58CC02]">Lesson Complete!</h1>

          <div className="mt-8 flex w-full max-w-md gap-3">
            <StatCard color="#FFC800" label="Total XP" value={`+${props.xpEarned}`} />
            <StatCard color="#58CC02" label="Accuracy" value={`${props.accuracy}%`} />
            <StatCard color="#FF9600" label="Streak" value={`🔥 ${props.streakDays}`} />
          </div>

          {props.anonymous ? (
            <>
              <p className="mt-10 max-w-md text-base font-medium text-[#777777]">
                Create a profile to save your XP and keep your streak going!
              </p>
              <Link
                href="/signup"
                className="btn-shadow-green mt-4 w-full max-w-md rounded-2xl bg-[#58CC02] px-6 py-4 text-lg font-bold uppercase tracking-wide text-white"
              >
                Create a profile
              </Link>
              <Link href="/login" className="mt-4 text-sm font-bold uppercase tracking-wide text-[#1CB0F6]">
                I already have an account
              </Link>
            </>
          ) : (
            <Link
              href="/learn"
              className="btn-shadow-green mt-10 w-full max-w-md rounded-2xl bg-[#58CC02] px-6 py-4 text-lg font-bold uppercase tracking-wide text-white"
            >
              Continue
            </Link>
          )}
        </>
      ) : (
        <>
          <div className="mb-6 rounded-full bg-[#FFDFE0] px-6 py-4">
            <p className="text-3xl font-extrabold text-[#FF4B4B]">Uh oh!</p>
          </div>
          <p className="text-lg font-bold text-[#4B4B4B]">Progress couldn&apos;t be saved. Check your connection.</p>
          <button
            type="button"
            onClick={props.onRetry}
            className="btn-shadow-red mt-6 w-full max-w-md rounded-2xl bg-[#FF4B4B] px-6 py-4 text-lg font-bold uppercase tracking-wide text-white"
          >
            Try again
          </button>
        </>
      )}
    </div>
  );
}
