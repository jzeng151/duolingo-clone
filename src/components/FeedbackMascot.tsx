'use client';

/* Shown under the answer choices while the feedback banner is up.
   Scales up from nothing ("maximizes into screen") and finishes with a
   subtle pop. Remounted per feedback, so the animation replays each time. */
export default function FeedbackMascot({ isCorrect }: { isCorrect: boolean }) {
  const src = isCorrect ? '/assets/mascot_happy.svg' : '/assets/mascot_sad.svg';
  const alt = isCorrect ? 'Happy mascot — correct answer' : 'Sad mascot — incorrect answer';

  return (
    <div className="mt-10 flex justify-center">
      <img src={src} alt={alt} className="mascot-feedback-pop h-40 w-40 object-contain sm:h-48 sm:w-48" />
    </div>
  );
}
