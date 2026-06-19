import { describe, expect, it } from "vitest";
import type { Exercise } from "../src/content/types";
import { getMistakeCategory } from "../src/lib/mistake-patterns";

function exerciseWithType(type: Exercise["type"]): Exercise {
  return { type } as Exercise;
}

describe("getMistakeCategory", () => {
  it("maps listen_tap to listening", () => {
    expect(
      getMistakeCategory(exerciseWithType("listen_tap"))
    ).toBe("listening");
  });

  it("maps word_bank to word_order", () => {
    expect(
      getMistakeCategory(exerciseWithType("word_bank"))
    ).toBe("word_order");
  });

  it("maps dialogue to grammar", () => {
    expect(
      getMistakeCategory(exerciseWithType("dialogue"))
    ).toBe("grammar");
  });

  it("maps select_image to vocabulary", () => {
    expect(
      getMistakeCategory(exerciseWithType("select_image"))
    ).toBe("vocabulary");
  });

  it("maps select_translation to vocabulary", () => {
    expect(
      getMistakeCategory(exerciseWithType("select_translation"))
    ).toBe("vocabulary");
  });

  it("maps match to vocabulary", () => {
    expect(
      getMistakeCategory(exerciseWithType("match"))
    ).toBe("vocabulary");
  });
});