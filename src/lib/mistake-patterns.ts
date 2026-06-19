import type { Exercise } from "../content/types";

export type MistakeCategory =
  | "vocabulary"
  | "grammar"
  | "spelling"
  | "listening"
  | "word_order";

export function getMistakeCategory(
  exercise: Exercise
): MistakeCategory {
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
