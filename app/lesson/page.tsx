import LessonClient from '../../src/components/LessonClient';
import { completeLesson } from '../../src/actions/completeLesson';
import { createServerSupabaseClient } from '../../lib/supabase-server';
import { isKnownLessonId } from '../../src/content/course';

const DEFAULT_LESSON_ID = 'spanish-lesson-1';

export default async function LessonPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await searchParams;
  // The map links to /lesson?id=<lessonId>; fall back to lesson 1 for a bare
  // /lesson visit or any id that isn't part of the course.
  const requested = Array.isArray(id) ? id[0] : id;
  const lessonId = requested && isKnownLessonId(requested) ? requested : DEFAULT_LESSON_ID;

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = Boolean(user);

  async function handleComplete() {
    'use server';

    const result = await completeLesson(lessonId);

    if ('error' in result) {
      throw new Error(result.error);
    }

    return result;
  }

  return (
    <main className="flex flex-1 flex-col bg-white">
      <LessonClient lessonId={lessonId} isAuthenticated={isAuthenticated} onComplete={handleComplete} />
    </main>
  );
}
