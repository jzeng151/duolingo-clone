'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { checkAnswer, solutionText, type Exercise } from '../content/types';
import QuestionDisplay from './QuestionDisplay';
import FeedbackMascot from './FeedbackMascot';
import FeedbackDrawer from './FeedbackDrawer';
import CompletionScreen from './CompletionScreen';
import { playCorrect, playWrong } from '../lib/sounds';
import { initialLessonState, transition, type LessonState } from '../lib/lesson-state-machine';
import {
  getMistakeCategory,
  type MistakeCategory,
} from "../lib/mistake-patterns";
import { logMistakes } from "../actions/logMistakes";
import type { WeakCategory } from "../lib/weakness";

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
  isAuthenticated = true,
  lessonId = null,
  practiceCategory = null,
}: {
  exercises: Exercise[];
  onComplete: (payload: { xpEarned: number }) => Promise<OnCompleteResult>;
  /** Anonymous learners finish the lesson locally and are then asked to sign up. */
  isAuthenticated?: boolean;
  /** Course lesson id, used to attribute logged mistakes. Null in practice mode. */
  lessonId?: string | null;
  /** Set when this is a targeted-practice session for a weak category. */
  practiceCategory?: MistakeCategory | null;
}) {
  // Start the lesson immediately: run the machine's START transition once so
  // 'idle' is never rendered (avoids a setState-in-effect on mount).
  const [state, setState] = useState<LessonState>(
    () => transition(initialLessonState, { type: 'START' }).nextState,
  );
  // Exercises still to be answered correctly. The head is the current question.
  // A wrong answer pushes its exercise back onto the tail, so the lesson can't
  // finish until every exercise has been answered correctly at least once.
  const [queue, setQueue] = useState<Exercise[]>(() => exercises);
  // Monotonic counter used only as a React remount key: a re-queued exercise
  // reappears and must mount fresh rather than reuse the previous instance.
  const [step, setStep] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [streakDays, setStreakDays] = useState<number | null>(null);
  const [weakCategories, setWeakCategories] = useState<WeakCategory[]>([]);
  const [hearts, setHearts] = useState(TOTAL_HEARTS);
  const [mistakes, setMistakes] = useState(0);
  const [mistakePatterns, setMistakePatterns] = useState<
  Record<MistakeCategory, number>
>({
  vocabulary: 0,
  grammar: 0,
  spelling: 0,
  listening: 0,
  word_order: 0,
});
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const submissionLockedRef = useRef(false);

  const currentExercise = queue.length > 0 ? queue[0] : null;
  const progress =
    exercises.length > 0 ? Math.round(((exercises.length - queue.length) / exercises.length) * 100) : 0;
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
      const mistakeCategory = getMistakeCategory(currentExercise);

setMistakePatterns((prev) => ({
  ...prev,
  [mistakeCategory]: prev[mistakeCategory] + 1,
}));
      playWrong();
    }

    setState((prev) => transition(prev, { type: 'SUBMIT', answer: currentAnswer, isCorrect }).nextState);
  }

  async function handleContinueFromFeedback() {
    const wasCorrect = state === 'feedback_correct';
    // The lesson ends only when the final remaining exercise was just answered
    // correctly. A wrong answer re-queues it, so there is always more to do.
    const isLast = wasCorrect && queue.length === 1;
    setState((prev) => transition(prev, { type: 'NEXT', isLast }).nextState);

    if (!isLast) {
      setCurrentAnswer(null);
      setQueue((prev) => {
        const [head, ...rest] = prev;
        return wasCorrect ? rest : [...rest, head];
      });
      setStep((s) => s + 1);
      submissionLockedRef.current = false;
      return;
    }

    // Final question: drain the queue, queue the second NEXT (done ->
    // persisting), then persist.
    setQueue((prev) => prev.slice(1));
    setState((prev) => transition(prev, { type: 'NEXT', isLast: true }).nextState);
    await persistResults();
  }

  async function persistResults() {
    const isPractice = practiceCategory != null;

    // Anonymous run: nothing to save server-side. Finish locally; the
    // completion screen then invites the learner to create an account.
    if (!isAuthenticated) {
      setStreakDays(0);
      setState((prev) => transition(prev, { type: 'SAVE_SUCCESS', xpEarned, newStreak: 0 }).nextState);
      return;
    }

    // Log this session's mistakes for the pattern detector and pick up the
    // learner's current weak areas. Detector logging must never block lesson
    // completion, so failures here are swallowed.
    try {
      const events = (
        Object.entries(mistakePatterns) as [MistakeCategory, number][]
      ).flatMap(([category, count]) =>
        Array.from({ length: count }, () => category),
      );
      const weak = await logMistakes(isPractice ? null : lessonId, events);
      setWeakCategories(weak);
    } catch {
      // ignore — the completion screen falls back to the per-lesson summary.
    }

    // Practice sessions are reviews: they don't complete a course lesson or
    // touch XP/streak server-side.
    if (isPractice) {
      setStreakDays(0);
      setState((prev) => transition(prev, { type: 'SAVE_SUCCESS', xpEarned, newStreak: 0 }).nextState);
      return;
    }

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

  // Each exercise is answered correctly exactly once (exercises.length correct
  // submissions); every wrong answer is one extra submission. Accuracy is
  // correct over total submissions, which stays valid when re-queuing pushes
  // the mistake count past the number of exercises.
  const accuracy =
    exercises.length > 0
      ? Math.round((exercises.length / (exercises.length + mistakes)) * 100)
      : 0;

  // Terminal screens take over the whole view.
  if (state === 'complete') {
    return <CompletionScreen status="success" anonymous={!isAuthenticated} streakDays={streakDays ?? 0} xpEarned={xpEarned} accuracy={accuracy} mistakePatterns={mistakePatterns} weakCategory={weakCategories[0] ?? null} />;
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

      {/* Question. Reserve bottom space during feedback so the mascot can clear
          the fixed FeedbackDrawer (taller on mobile) instead of hiding behind it. */}
      <main className={`flex-1 overflow-y-auto px-4 py-6 sm:px-6 ${inFeedback ? 'pb-56' : ''}`}>
        <div className="mx-auto max-w-2xl">
          {currentExercise ? (
            <QuestionDisplay key={step} exercise={currentExercise} onAnswerChange={setCurrentAnswer} />
          ) : (
            <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 text-center">No exercises available.</div>
          )}

          {inFeedback && <FeedbackMascot key={`fb-${step}`} isCorrect={state === 'feedback_correct'} />}
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
          onContinue={() => handleContinueFromFeedback()}
        />
      )}
    </div>
  );
}
