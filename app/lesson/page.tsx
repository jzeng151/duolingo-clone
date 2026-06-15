import LessonClient from '../../src/components/LessonClient';
import { completeLesson } from '../../src/actions/completeLesson';
import { createServerSupabaseClient } from '../../lib/supabase-server';

const LESSON_ID = 'spanish-lesson-1';

export default async function LessonPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = Boolean(user);

  async function handleComplete(_: { xpEarned: number }) {
    'use server';

    const result = await completeLesson(LESSON_ID);

    if ('error' in result) {
      throw new Error(result.error);
    }

    return result;
  }

  return (
    <main className="flex flex-1 flex-col bg-white">
      <LessonClient isAuthenticated={isAuthenticated} onComplete={handleComplete} />
    </main>
  );
}
