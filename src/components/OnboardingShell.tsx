'use client';

import { ReactNode } from 'react';

/* The chrome shared by every onboarding step after language select:
   back arrow + green progress bar up top, a fixed CONTINUE button at the
   bottom-right that stays disabled until the step is answered. */
export default function OnboardingShell({
  progress,
  onBack,
  onContinue,
  canContinue,
  children,
}: {
  /** 0–100. */
  progress: number;
  onBack: () => void;
  onContinue: () => void;
  canContinue: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="mx-auto flex w-full max-w-3xl items-center gap-4 px-4 py-5 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="text-[#AFAFAF] transition-colors hover:text-[#4B4B4B]"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-[#E5E5E5]">
          <div
            className="h-full rounded-full bg-[#58CC02] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="flex flex-1 flex-col px-4 py-6 sm:px-6">
        <div className="mx-auto w-full max-w-2xl">{children}</div>
      </main>

      <footer className="border-t-2 border-[#E5E5E5] px-4 py-4 sm:px-6">
        <div className="mx-auto flex w-full max-w-3xl justify-end">
          <button
            type="button"
            onClick={onContinue}
            disabled={!canContinue}
            className={`w-full rounded-2xl px-6 py-3.5 text-lg font-bold uppercase tracking-wide transition-colors sm:w-auto sm:min-w-[180px] ${
              canContinue
                ? 'btn-shadow-green bg-[#58CC02] text-white'
                : 'cursor-not-allowed bg-[#E5E5E5] text-[#AFAFAF]'
            }`}
          >
            Continue
          </button>
        </div>
      </footer>
    </div>
  );
}
