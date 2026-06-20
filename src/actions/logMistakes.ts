"use server";

import type { MistakeCategory } from "../lib/mistake-patterns";
import { recordMistakes } from "../lib/mistakes";
import type { WeakCategory } from "../lib/weakness";

/* Client entry point (called from LessonRunner) for persisting a finished
   session's mistakes. Thin wrapper over the server-only data helper so the
   client never imports supabase-server directly. */
export async function logMistakes(
  lessonId: string | null,
  categories: MistakeCategory[],
): Promise<WeakCategory[]> {
  return recordMistakes(lessonId, categories);
}
