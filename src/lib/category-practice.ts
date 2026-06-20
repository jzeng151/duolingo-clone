import type { Exercise } from "../content/types";
import { getMistakeCategory, type MistakeCategory } from "./mistake-patterns";
import { spanishLesson1 } from "../content/spanish-lesson-1";
import {
  spanishLesson1_2,
  spanishLesson1_3,
  spanishLesson1_4,
} from "../content/spanish-unit1";
import {
  spanishLesson2_1,
  spanishLesson2_2,
  spanishLesson2_3,
  spanishLesson2_4,
} from "../content/spanish-unit2";
import {
  spanishLesson3_1,
  spanishLesson3_2,
  spanishLesson3_3,
  spanishLesson3_4,
} from "../content/spanish-unit3";
import {
  spanishLesson4_1,
  spanishLesson4_2,
  spanishLesson4_3,
  spanishLesson4_4,
} from "../content/spanish-unit4";
import {
  spanishLesson5_1,
  spanishLesson5_2,
  spanishLesson5_3,
  spanishLesson5_4,
} from "../content/spanish-unit5";

/* Targeted practice: a synthetic lesson drawn from a single weak category,
   pooled across the whole fixed course. Deterministic (stable order, deduped)
   so it is easy to test; a real product would rotate the selection. */

const ALL_LESSONS: Exercise[][] = [
  spanishLesson1,
  spanishLesson1_2,
  spanishLesson1_3,
  spanishLesson1_4,
  spanishLesson2_1,
  spanishLesson2_2,
  spanishLesson2_3,
  spanishLesson2_4,
  spanishLesson3_1,
  spanishLesson3_2,
  spanishLesson3_3,
  spanishLesson3_4,
  spanishLesson4_1,
  spanishLesson4_2,
  spanishLesson4_3,
  spanishLesson4_4,
  spanishLesson5_1,
  spanishLesson5_2,
  spanishLesson5_3,
  spanishLesson5_4,
];

const ALL_EXERCISES: Exercise[] = ALL_LESSONS.flat();

/** How many exercises a targeted-practice session contains. */
export const PRACTICE_SIZE = 8;

/** All course exercises whose mistake-category matches, deduped, capped. */
export function getCategoryPracticePool(
  category: MistakeCategory,
): Exercise[] {
  const seen = new Set<string>();
  const pool: Exercise[] = [];

  for (const exercise of ALL_EXERCISES) {
    if (getMistakeCategory(exercise) !== category) continue;
    const key = JSON.stringify(exercise);
    if (seen.has(key)) continue;
    seen.add(key);
    pool.push(exercise);
    if (pool.length >= PRACTICE_SIZE) break;
  }

  return pool;
}
