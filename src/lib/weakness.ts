import type { MistakeCategory } from "./mistake-patterns";

/* Mistake-pattern detection.

   A "weak category" is one a learner has missed at least THRESHOLD times
   within a rolling WINDOW. The rolling window is what makes a weakness
   de-escalate on its own: once the learner stops missing a category, its
   recent events age out and it drops below threshold — no explicit "clear"
   step needed. This is the single source of truth for detection; the server
   only stores raw events and runs this over them. */

export type MistakeEvent = {
  category: MistakeCategory;
  /** ISO string, epoch ms, or Date — anything `new Date()` accepts. */
  createdAt: string | number | Date;
};

export type WeakCategory = {
  category: MistakeCategory;
  count: number;
};

export const WEAKNESS_THRESHOLD = 3;
export const WEAKNESS_WINDOW_DAYS = 14;

const DAY_MS = 24 * 60 * 60 * 1000;

export function detectWeakCategories(
  events: MistakeEvent[],
  opts: { threshold?: number; windowDays?: number; now?: number } = {},
): WeakCategory[] {
  const threshold = opts.threshold ?? WEAKNESS_THRESHOLD;
  const windowDays = opts.windowDays ?? WEAKNESS_WINDOW_DAYS;
  const now = opts.now ?? Date.now();
  const cutoff = now - windowDays * DAY_MS;

  const counts = new Map<MistakeCategory, number>();
  for (const event of events) {
    const t = new Date(event.createdAt).getTime();
    if (Number.isNaN(t) || t < cutoff) continue;
    counts.set(event.category, (counts.get(event.category) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .filter((weak) => weak.count >= threshold)
    .sort((a, b) => b.count - a.count);
}
