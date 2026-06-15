'use client';

import { useEffect, useState } from 'react';
import LessonRunner from './LessonRunner';
import { getSpanishLesson } from '../content/spanish-lessons';
import { getLearningReason } from '../lib/onboarding';
import type { Exercise } from '../content/types';

type OnCompleteResult = { xpEarned: number; newStreak: number };

/* Picks the lesson variant from the reason saved during onboarding
   (localStorage, client-only), then runs it. Mounts the runner only
   after the reason is known so the chosen variant never flashes/swaps. */
export default function LessonClient({
  isAuthenticated,
  onComplete,
}: {
  isAuthenticated: boolean;
  onComplete: (payload: { xpEarned: number }) => Promise<OnCompleteResult>;
}) {
  const [exercises, setExercises] = useState<Exercise[] | null>(null);

  useEffect(() => {
    setExercises(getSpanishLesson(getLearningReason()));
  }, []);

  if (!exercises) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#E5E5E5] border-t-[#58CC02]" />
      </div>
    );
  }

  return <LessonRunner exercises={exercises} isAuthenticated={isAuthenticated} onComplete={onComplete} />;
}
