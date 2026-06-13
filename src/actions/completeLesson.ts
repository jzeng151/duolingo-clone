'use server';

import { createServerSupabaseClient } from '../../lib/supabase-server';

type CompleteLessonResult =
  | {
      xpEarned: number;
      newStreak: number;
    }
  | {
      error: string;
    };

type CompleteLessonRow = {
  xp_earned: number;
  current_streak: number;
};

export async function completeLesson(
  lessonId: string
): Promise<CompleteLessonResult> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: 'unauthenticated' };
  }

  const trimmedLessonId = lessonId.trim();

  if (!trimmedLessonId) {
    return { error: 'lesson_id is required' };
  }

  const { data, error: rpcError } = await supabase.rpc('complete_lesson', {
    p_lesson_id: trimmedLessonId,
  });

  if (rpcError) {
    return { error: rpcError.message };
  }

  const row = Array.isArray(data)
    ? (data[0] as CompleteLessonRow | undefined)
    : undefined;

  if (!row) {
    return { error: 'No progress returned' };
  }

  return {
    xpEarned: row.xp_earned,
    newStreak: row.current_streak,
  };
}
