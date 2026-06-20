'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import LessonRunner from './LessonRunner';
import { getLessonById } from '../content/spanish-lessons';
import { getLearningReason, type LearningReason } from '../lib/onboarding';
import { getCategoryPracticePool } from '../lib/category-practice';
import { CATEGORY_LABELS, type MistakeCategory } from '../lib/mistake-patterns';

type OnCompleteResult = { xpEarned: number; newStreak: number };

// The onboarding reason lives in localStorage (client-only) and is fixed for
// the duration of a lesson, so there's nothing to subscribe to.
const noopSubscribe = () => () => {};

/* Loads the requested lesson's exercises. Lesson 1 is themed by the reason
   saved during onboarding (localStorage); other lessons are fixed.

   The reason is read through useSyncExternalStore so the server snapshot is
   null (the loading state renders during SSR and hydration) and the client
   swaps in the real, reason-specific lesson right after hydration. This avoids
   a hydration mismatch — the server can't know the localStorage reason — with
   no setState inside an effect. */
export default function LessonClient({
  lessonId,
  isAuthenticated,
  onComplete,
  practiceCategory = null,
}: {
  lessonId: string;
  isAuthenticated: boolean;
  onComplete: (payload: { xpEarned: number }) => Promise<OnCompleteResult>;
  /** When set, this is a targeted-practice session for a weak category. */
  practiceCategory?: MistakeCategory | null;
}) {
  const reason = useSyncExternalStore<LearningReason | null>(
    noopSubscribe,
    () => getLearningReason(),
    () => null,
  );

  // Targeted practice is drawn from the whole course by category, so it does
  // not depend on the onboarding reason and can render immediately.
  if (practiceCategory) {
    const pool = getCategoryPracticePool(practiceCategory);
    if (pool.length === 0) {
      return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-lg font-bold text-[#4B4B4B]">
            No practice available for {CATEGORY_LABELS[practiceCategory]} yet.
          </p>
          <Link href="/learn" className="text-sm font-bold uppercase tracking-wide text-[#1CB0F6]">
            Back to learn
          </Link>
        </div>
      );
    }
    return (
      <LessonRunner
        exercises={pool}
        isAuthenticated={isAuthenticated}
        onComplete={onComplete}
        practiceCategory={practiceCategory}
      />
    );
  }

  if (reason === null) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#E5E5E5] border-t-[#58CC02]" />
      </div>
    );
  }

  const exercises = getLessonById(lessonId, reason);
  return (
    <LessonRunner
      exercises={exercises}
      isAuthenticated={isAuthenticated}
      onComplete={onComplete}
      lessonId={lessonId}
    />
  );
}
