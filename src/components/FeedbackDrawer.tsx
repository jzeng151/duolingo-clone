'use client';

type FeedbackDrawerProps = {
  isCorrect: boolean;
  correctAnswer?: string;
  onContinue: () => void;
};

export default function FeedbackDrawer({
  isCorrect,
  correctAnswer,
  onContinue,
}: FeedbackDrawerProps) {
  const backgroundClass = isCorrect ? "bg-[#D7FFB8] border-[#58CC02]" : "bg-[#FFD2D2] border-[#FF4B4B]";
  const icon = isCorrect ? "✓" : "✗";
  const label = isCorrect ? "Nice work!" : "Correct answer:";

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 translate-y-0 rounded-t-[20px] border-t-4 ${backgroundClass} p-6 min-h-[140px] shadow-2xl transition-transform duration-300 ease-out`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <span className={isCorrect ? "text-[#58CC02] text-3xl font-bold" : "text-[#FF4B4B] text-3xl font-bold"}>
          {icon}
        </span>
        <div className="text-slate-900">
          <p className="text-lg font-bold">{label}</p>
          {!isCorrect && correctAnswer ? (
            <p className="mt-1 text-sm font-medium text-slate-700">{correctAnswer}</p>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-6 w-full rounded-2xl bg-[#58CC02] px-5 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-[#4DB201]"
      >
        Continue
      </button>
    </div>
  );
}
