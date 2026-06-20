import { describe, expect, it } from "vitest";
import type { Exercise } from "../src/content/types";
import {
  CATEGORY_LABELS,
  MISTAKE_CATEGORIES,
  getMistakeCategory,
  isMistakeCategory,
} from "../src/lib/mistake-patterns";

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

  it("prefers an explicit category tag over type inference", () => {
    const tagged = {
      type: "select_image",
      prompt: "apple",
      options: [],
      answer: "la manzana",
      category: "grammar",
    } as Exercise;
    // Without the tag this would infer "vocabulary".
    expect(getMistakeCategory(tagged)).toBe("grammar");
  });
});

describe("isMistakeCategory", () => {
  it("accepts every known category", () => {
    for (const category of MISTAKE_CATEGORIES) {
      expect(isMistakeCategory(category)).toBe(true);
    }
  });

  it("rejects unknown or non-string values", () => {
    expect(isMistakeCategory("phonetics")).toBe(false);
    expect(isMistakeCategory("")).toBe(false);
    expect(isMistakeCategory(undefined)).toBe(false);
    expect(isMistakeCategory(null)).toBe(false);
    expect(isMistakeCategory(3)).toBe(false);
  });
});

describe("CATEGORY_LABELS", () => {
  it("has a plain-language label for every category", () => {
    for (const category of MISTAKE_CATEGORIES) {
      expect(CATEGORY_LABELS[category]).toBeTruthy();
    }
  });

  it("renders word_order as a human label, not the raw key", () => {
    expect(CATEGORY_LABELS.word_order).toBe("Word order");
  });
});