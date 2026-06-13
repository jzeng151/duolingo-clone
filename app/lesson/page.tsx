import LessonRunner from '../../src/components/LessonRunner';
import { completeLesson } from '../../src/actions/completeLesson';
import { spanishLesson1 } from '../../src/content/spanish-lesson-1';

const LESSON_ID = 'spanish-lesson-1';

export default function LessonPage() {
  async function handleComplete(_: { xpEarned: number }) {
    'use server';

    const result = await completeLesson(LESSON_ID);

    if ('error' in result) {
      throw new Error(result.error);
    }

    return result;
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <LessonRunner
        exercises={spanishLesson1}
        onComplete={handleComplete}
      />
    </main>
  );
}
