'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { checkAnswer, solutionText, type Exercise } from '../content/types';
import QuestionDisplay from './QuestionDisplay';
import FeedbackDrawer from './FeedbackDrawer';
import CompletionScreen from './CompletionScreen';
import { playCorrect, playWrong } from '../lib/sounds';
import { initialLessonState, transition, type LessonState } from '../lib/lesson-state-machine';

const TOTAL_HEARTS = 5;
const XP_PER_CORRECT = 10;

type OnCompleteResult = { xpEarned: number; newStreak: number };

function Hearts({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1 text-[#FF4B4B]" aria-label={`${count} hearts left`}>
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M12 21s-6.7-4.35-9.33-8.07C.9 10.27 1.4 6.6 4.2 5.2c2-1 4.2-.3 5.3 1.2L12 9l2.5-2.6c1.1-1.5 3.3-2.2 5.3-1.2 2.8 1.4 3.3 5.07 1.53 7.73C18.7 16.65 12 21 12 21z" />
      </svg>
      <span className="text-lg font-bold">{count}</span>
    </div>
  );
}

export default function LessonRunner({
  exercises,
  onComplete,
}: {
  exercises: Exercise[];
  onComplete: (payload: { xpEarned: number }) => Promise<OnCompleteResult>;
}) {
  // Start the lesson immediately: run the machine's START transition once so
  // 'idle' is never rendered (avoids a setState-in-effect on mount).
  const [state, setState] = useState<LessonState>(
    () => transition(initialLessonState, { type: 'START' }).nextState,
  );
  const [index, setIndex] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [streakDays, setStreakDays] = useState<number | null>(null);
  const [hearts, setHearts] = useState(TOTAL_HEARTS);
  const [mistakes, setMistakes] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const submissionLockedRef = useRef(false);

  const currentExercise = exercises.length > 0 ? exercises[index] : null;
  const progress = exercises.length > 0 ? Math.round((index / exercises.length) * 100) : 0;
  const inFeedback = state === 'feedback_correct' || state === 'feedback_wrong';

  function handleCheck() {
    if (state !== 'showing_question' || submissionLockedRef.current || currentAnswer == null || !currentExercise) {
      return;
    }
    submissionLockedRef.current = true;

    const isCorrect = checkAnswer(currentExercise, currentAnswer);
    if (isCorrect) {
      setXpEarned((x) => x + XP_PER_CORRECT);
      playCorrect();
    } else {
      setHearts((h) => Math.max(0, h - 1));
      setMistakes((m) => m + 1);
      playWrong();
    }

    setState((prev) => transition(prev, { type: 'SUBMIT', answer: currentAnswer, isCorrect }).nextState);
  }

  async function handleContinueFromFeedback(isLast: boolean) {
    setState((prev) => transition(prev, { type: 'NEXT', isLast }).nextState);

    if (!isLast) {
      setCurrentAnswer(null);
      setIndex((i) => Math.min(i + 1, exercises.length - 1));
      submissionLockedRef.current = false;
      return;
    }

    // Final question: queue the second NEXT (done -> persisting), then persist.
    setState((prev) => transition(prev, { type: 'NEXT', isLast: true }).nextState);
    await persistResults();
  }

  async function persistResults() {
    try {
      const result = await onComplete({ xpEarned });
      const xp = result?.xpEarned ?? xpEarned;
      const streak = result?.newStreak ?? 0;
      setXpEarned(xp);
      setStreakDays(streak);
      setState((prev) => transition(prev, { type: 'SAVE_SUCCESS', xpEarned: xp, newStreak: streak }).nextState);
    } catch {
      setState((prev) => transition(prev, { type: 'SAVE_ERROR' }).nextState);
    }
  }

  function handleRetry() {
    setState((prev) => transition(prev, { type: 'RETRY' }).nextState);
    void persistResults();
  }

  const accuracy =
    exercises.length > 0 ? Math.round(((exercises.length - mistakes) / exercises.length) * 100) : 0;

  // Terminal screens take over the whole view.
  if (state === 'complete') {
    return <CompletionScreen status="success" streakDays={streakDays ?? 0} xpEarned={xpEarned} accuracy={accuracy} />;
  }
  if (state === 'error') {
    return <CompletionScreen status="error" onRetry={handleRetry} />;
  }
  if (state === 'persisting') {
    return <CompletionScreen status="loading" />;
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Top bar: close · progress · hearts */}
      <header className="flex items-center gap-4 px-4 py-4 sm:px-6">
        <Link href="/learn" aria-label="Quit lesson" className="text-[#AFAFAF] transition-colors hover:text-[#4B4B4B]">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </Link>
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-[#E5E5E5]">
          <div
            className="h-full rounded-full bg-[#58CC02] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <Hearts count={hearts} />
      </header>

      {/* Question */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-2xl">
          {currentExercise ? (
            <QuestionDisplay key={index} exercise={currentExercise} onAnswerChange={setCurrentAnswer} />
          ) : (
            <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 text-center">No exercises available.</div>
          )}
        </div>
      </main>

      {/* Footer CHECK button (hidden while the feedback banner is up) */}
      {!inFeedback && (
        <footer className="border-t-2 border-[#E5E5E5] px-4 py-4 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <button
              type="button"
              onClick={handleCheck}
              disabled={currentAnswer == null}
              className={`w-full rounded-2xl px-6 py-4 text-lg font-bold uppercase tracking-wide transition-colors ${
                currentAnswer == null
                  ? 'cursor-not-allowed bg-[#E5E5E5] text-[#AFAFAF]'
                  : 'btn-shadow-green bg-[#58CC02] text-white'
              }`}
            >
              Check
            </button>
          </div>
        </footer>
      )}

      {inFeedback && currentExercise && (
        <FeedbackDrawer
          isCorrect={state === 'feedback_correct'}
          correctAnswer={solutionText(currentExercise)}
          onContinue={() => handleContinueFromFeedback(index === exercises.length - 1)}
        />
      )}
    </div>
  );
}
