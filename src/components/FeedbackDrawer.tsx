'use client';

type FeedbackDrawerProps = {
  isCorrect: boolean;
  correctAnswer?: string;
  onContinue: () => void;
};

export default function FeedbackDrawer({ isCorrect, correctAnswer, onContinue }: FeedbackDrawerProps) {
  const palette = isCorrect
    ? { bg: 'bg-[#D7FFB8]', accent: 'text-[#58A700]', btn: 'bg-[#58CC02] btn-shadow-green', iconBg: 'bg-[#58CC02]' }
    : { bg: 'bg-[#FFDFE0]', accent: 'text-[#EA2B2B]', btn: 'bg-[#FF4B4B] btn-shadow-red', iconBg: 'bg-[#FF4B4B]' };

  return (
    <div
      className={`feedback-slide-up fixed bottom-0 left-0 right-0 z-50 ${palette.bg}`}
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${palette.iconBg} text-2xl font-bold text-white`}>
            {isCorrect ? '✓' : '✗'}
          </span>
          <div>
            <p className={`text-xl font-extrabold ${palette.accent}`}>{isCorrect ? 'Nice!' : 'Correct solution:'}</p>
            {!isCorrect && correctAnswer ? (
              <p className={`mt-0.5 text-base font-bold ${palette.accent}`}>{correctAnswer}</p>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className={`w-full rounded-2xl px-6 py-3 text-lg font-bold uppercase tracking-wide text-white sm:w-auto sm:px-12 ${palette.btn}`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
