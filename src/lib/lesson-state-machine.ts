export type LessonState =
  | "idle"
  | "showing_question"
  | "feedback_correct"
  | "feedback_wrong"
  | "done"
  | "persisting"
  | "complete"
  | "error";

export type LessonAction =
  | { type: "START" }
  | { type: "SUBMIT"; answer: string; isCorrect: boolean }
  | { type: "NEXT"; isLast: boolean }
  | { type: "SAVE_SUCCESS"; xpEarned: number; newStreak: number }
  | { type: "SAVE_ERROR" }
  | { type: "RETRY" };

export type LessonEventType =
  | "ANSWER_SUBMITTED"
  | "XP_AWARDED"
  | "LESSON_COMPLETED"
  | "STREAK_EXTENDED";

export type TransitionResult = {
  nextState: LessonState;
  events: LessonEventType[];
};

export const initialLessonState: LessonState = "idle";

export function transition(state: LessonState, action: LessonAction): TransitionResult {
  switch (state) {
    case "idle":
      if (action.type === "START") {
        return { nextState: "showing_question", events: [] };
      }
      break;

    case "showing_question":
      if (action.type === "SUBMIT") {
        // Use the explicit correctness flag provided by the caller
        const nextState = action.isCorrect ? "feedback_correct" : "feedback_wrong";
        return { nextState, events: ["ANSWER_SUBMITTED"] };
      }
      break;

    case "feedback_correct":
    case "feedback_wrong":
      if (action.type === "NEXT") {
        // If this was the final exercise, the caller should indicate that.
        return { nextState: action.isLast ? "done" : "showing_question", events: [] };
      }
      break;

    case "done":
      if (action.type === "NEXT") {
        return { nextState: "persisting", events: ["LESSON_COMPLETED"] };
      }
      break;

    case "persisting":
      if (action.type === "SAVE_SUCCESS") {
        const events: LessonEventType[] = ["XP_AWARDED"];
        if (action.newStreak > 0) {
          events.push("STREAK_EXTENDED");
        }
        return { nextState: "complete", events };
      }

      if (action.type === "SAVE_ERROR") {
        return { nextState: "error", events: [] };
      }
      break;

    case "error":
      if (action.type === "RETRY") {
        return { nextState: "persisting", events: [] };
      }
      break;

    case "complete":
      break;
  }

  return { nextState: state, events: [] };
}
