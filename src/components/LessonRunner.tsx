'use client';

import { useEffect, useRef, useState } from 'react';
import type { Exercise } from './QuestionDisplay';
import QuestionDisplay from './QuestionDisplay';
import FeedbackDrawer from './FeedbackDrawer';
import CompletionScreen from './CompletionScreen';
import { initialLessonState, transition, type LessonState } from '../lib/lesson-state-machine';

type OnCompleteResult = { xpEarned: number; newStreak: number };

export default function LessonRunner({
  exercises,
  onComplete,
}: {
  exercises: Exercise[];
  onComplete: (payload: { xpEarned: number }) => Promise<OnCompleteResult>;
}) {
  const [state, setState] = useState<LessonState>(initialLessonState);
  const [index, setIndex] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [streakDays, setStreakDays] = useState<number | null>(null);
  const submissionLockedRef = useRef(false);

  // Start the lesson on mount
  useEffect(() => {
    const r = transition(state, { type: 'START' });
    setState(r.nextState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentExercise = exercises.length > 0 ? exercises[index] : null;
  const progress = exercises.length > 0 ? Math.round((index / exercises.length) * 100) : 0;

  function handleSubmit(result: { answer: string; isCorrect: boolean }) {
    if (state !== 'showing_question' || submissionLockedRef.current) {
      return;
    }

    submissionLockedRef.current = true;

    // Update local XP immediately when correct (client-side tally)
    if (result.isCorrect) {
      setXpEarned((x) => x + 10);
    }

    // Dispatch submit to state machine with the provided answer
    setState((prev) => {
      const r = transition(prev, { type: 'SUBMIT', answer: result.answer, isCorrect: result.isCorrect });
      return r.nextState;
    });
  }

  async function handleContinueFromFeedback(isLast: boolean) {
    // From feedback -> NEXT
    setState((prev) => {
      const r = transition(prev, { type: 'NEXT', isLast });
      return r.nextState;
    });

    // If not last, advance index and unlock submission for the next question
    if (!isLast) {
      setIndex((i) => Math.min(i + 1, exercises.length - 1));
      submissionLockedRef.current = false;
      return;
    }

    // For the final question: queue the second NEXT so the machine moves from done -> persisting,
    // then persist the lesson results.
    setState((prev) => {
      const r = transition(prev, { type: 'NEXT', isLast: true });
      return r.nextState;
    });

    await persistResults();
  }

  async function persistResults() {
    // show loading CompletionScreen by relying on machine state 'persisting'
    try {
      const result = await onComplete({ xpEarned });
      const xp = result?.xpEarned ?? xpEarned;
      const streak = result?.newStreak ?? 0;
      setXpEarned(xp);
      setStreakDays(streak);
      setState((prev) => {
        const r = transition(prev, { type: 'SAVE_SUCCESS', xpEarned: xp, newStreak: streak });
        return r.nextState;
      });
    } catch (err) {
      setState((prev) => {
        const r = transition(prev, { type: 'SAVE_ERROR' });
        return r.nextState;
      });
    }
  }

  function handleRetry() {
    // Dispatch retry and re-run persist
    setState((prev) => {
      const r = transition(prev, { type: 'RETRY' });
      return r.nextState;
    });
    void persistResults();
  }

  const correctAnswer =
    currentExercise && currentExercise.type !== 'match'
      ? currentExercise.answer
      : currentExercise && currentExercise.type === 'match'
      ? currentExercise.pairs.map((pair) => `${pair.left} — ${pair.right}`).join(', ')
      : undefined;

  return (
    <div className="space-y-6">
      <div className="w-full bg-[#E5E5E5] rounded-lg h-4 overflow-hidden">
        <div className="h-full bg-[#58CC02] rounded-lg transition-all duration-400 ease-in-out" style={{ width: `${progress}%` }} />
      </div>

      {state === 'complete' ? (
        <CompletionScreen status="success" streakDays={streakDays ?? 0} xpEarned={xpEarned} />
      ) : state === 'error' ? (
        <CompletionScreen status="error" onRetry={handleRetry} />
      ) : state === 'persisting' ? (
        <CompletionScreen status="loading" />
      ) : (
        <>
          {exercises.length > 0 && currentExercise ? (
            <QuestionDisplay key={index} exercise={currentExercise} onSubmit={handleSubmit} />
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">No exercises available.</div>
          )}
        </>
      )}

      {/* Feedback drawer appears when in feedback states */}
      {(state === 'feedback_correct' || state === 'feedback_wrong') && (
        <FeedbackDrawer
          isCorrect={state === 'feedback_correct'}
          correctAnswer={correctAnswer}
          onContinue={() => handleContinueFromFeedback(index === exercises.length - 1)}
        />
      )}
    </div>
  );
}
