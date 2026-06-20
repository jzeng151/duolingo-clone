import { createServerSupabaseClient } from "../../lib/supabase-server";
import type { MistakeCategory } from "./mistake-patterns";
import {
  detectWeakCategories,
  WEAKNESS_WINDOW_DAYS,
  type MistakeEvent,
  type WeakCategory,
} from "./weakness";

/* Server-side data access for the Mistake Pattern Detector. Both helpers are
   RLS-scoped to the signed-in user; for anonymous users they no-op to an empty
   list. Detection itself lives in ./weakness so there is one implementation. */

const DAY_MS = 24 * 60 * 60 * 1000;

type MistakeEventRow = { category: string; created_at: string };

async function readWeakCategories(
  supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>,
  userId: string,
): Promise<WeakCategory[]> {
  const since = new Date(
    Date.now() - WEAKNESS_WINDOW_DAYS * DAY_MS,
  ).toISOString();

  const { data } = await supabase
    .from("mistake_events")
    .select("category, created_at")
    .eq("user_id", userId)
    .gte("created_at", since);

  const events: MistakeEvent[] = ((data ?? []) as MistakeEventRow[]).map(
    (row) => ({
      category: row.category as MistakeCategory,
      createdAt: row.created_at,
    }),
  );

  return detectWeakCategories(events);
}

/** Persist this session's mistakes, then return the user's current weak areas. */
export async function recordMistakes(
  lessonId: string | null,
  categories: MistakeCategory[],
): Promise<WeakCategory[]> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  if (categories.length > 0) {
    await supabase.from("mistake_events").insert(
      categories.map((category) => ({
        user_id: user.id,
        category,
        lesson_id: lessonId,
      })),
    );
  }

  return readWeakCategories(supabase, user.id);
}

/** Read-only weak areas, for the /learn dashboard. */
export async function fetchWeakCategories(): Promise<WeakCategory[]> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  return readWeakCategories(supabase, user.id);
}
