import type { Exercise } from "../content/types";

export type MistakeCategory =
  | "vocabulary"
  | "grammar"
  | "spelling"
  | "listening"
  | "word_order";

/** Every category, in display order. Single source for validation + UI. */
export const MISTAKE_CATEGORIES: MistakeCategory[] = [
  "vocabulary",
  "grammar",
  "spelling",
  "listening",
  "word_order",
];

/** Plain-language labels for the completion screen and weak-area list. */
export const CATEGORY_LABELS: Record<MistakeCategory, string> = {
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  spelling: "Spelling",
  listening: "Listening",
  word_order: "Word order",
};

export function isMistakeCategory(value: unknown): value is MistakeCategory {
  return (
    typeof value === "string" &&
    (MISTAKE_CATEGORIES as string[]).includes(value)
  );
}

/**
 * The skill category a wrong answer is attributed to. An explicit
 * `exercise.category` tag always wins; otherwise we infer from the exercise
 * format. The inference is a coarse default — hand-tagging is what captures
 * cross-format skills like gender agreement.
 */
export function getMistakeCategory(exercise: Exercise): MistakeCategory {
  if (exercise.category) return exercise.category;

  switch (exercise.type) {
    case "listen_tap":
      return "listening";

    case "word_bank":
      return "word_order";

    case "dialogue":
      return "grammar";

    case "select_image":
    case "select_translation":
    case "match":
      return "vocabulary";
  }
}
