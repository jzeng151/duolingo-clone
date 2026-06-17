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

  return (
  <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4">
    <section className="rounded-2xl border border-[#E5E5E5] bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-bold text-[#1F2937]">
        Skill Tree
      </h2>

      <div className="grid gap-3 sm:grid-cols-3">
        {exercises.map((exercise, exerciseIndex) => {
          const isUnlocked = exerciseIndex === 0;

          return (
            <div
              key={exercise.id ?? exerciseIndex}
              className={`rounded-xl border p-4 text-center ${
                isUnlocked
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-300 bg-gray-100 text-gray-500"
              }`}
            >
              <div className="text-2xl">{isUnlocked ? "🔓" : "🔒"}</div>
              <p className="mt-2 font-semibold">Lesson {exerciseIndex + 1}</p>
              <p className="text-sm">{isUnlocked ? "Unlocked" : "Locked"}</p>
            </div>
          );
        })}
      </div>
    </section>

    <LessonRunner
      exercises={exercises}
      isAuthenticated={isAuthenticated}
      onComplete={onComplete}
    />
  </div>
);
}

