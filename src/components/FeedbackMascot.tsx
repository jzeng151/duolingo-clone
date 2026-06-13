'use client';

import { useEffect, useRef } from 'react';

/* Shown under the answer choices while the feedback banner is up.
   Scales up from nothing ("maximizes into screen") and finishes with a
   subtle pop. Remounted per feedback, so the animation replays each time.
   On mount it scrolls itself into the center of the scroll area so the pop
   is visible above the fixed feedback drawer even when the question is tall. */
export default function FeedbackMascot({ isCorrect }: { isCorrect: boolean }) {
  const ref = useRef<HTMLImageElement>(null);
  const src = isCorrect ? '/assets/mascot_happy.svg' : '/assets/mascot_sad.svg';
  const alt = isCorrect ? 'Happy mascot — correct answer' : 'Sad mascot — incorrect answer';

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <div className="mt-10 flex justify-center">
      <img
        ref={ref}
        src={src}
        alt={alt}
        className="mascot-feedback-pop h-40 w-40 object-contain sm:h-48 sm:w-48"
      />
    </div>
  );
}
