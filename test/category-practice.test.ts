import { describe, expect, it } from "vitest";
import {
  getCategoryPracticePool,
  PRACTICE_SIZE,
} from "../src/lib/category-practice";
import {
  getMistakeCategory,
  MISTAKE_CATEGORIES,
} from "../src/lib/mistake-patterns";

describe("getCategoryPracticePool", () => {
  it("returns only exercises that match the requested category", () => {
    for (const category of MISTAKE_CATEGORIES) {
      for (const exercise of getCategoryPracticePool(category)) {
        expect(getMistakeCategory(exercise)).toBe(category);
      }
    }
  });

  it("caps each pool at PRACTICE_SIZE", () => {
    for (const category of MISTAKE_CATEGORIES) {
      expect(getCategoryPracticePool(category).length).toBeLessThanOrEqual(
        PRACTICE_SIZE,
      );
    }
  });

  it("builds a non-empty pool for every category the course contains", () => {
    for (const category of [
      "vocabulary",
      "grammar",
      "listening",
      "word_order",
    ] as const) {
      expect(getCategoryPracticePool(category).length).toBeGreaterThan(0);
    }
  });

  it("returns an empty pool for a category with no exercises (spelling)", () => {
    expect(getCategoryPracticePool("spelling")).toEqual([]);
  });

  it("does not repeat the same exercise within a pool", () => {
    const pool = getCategoryPracticePool("vocabulary");
    const keys = pool.map((exercise) => JSON.stringify(exercise));
    expect(new Set(keys).size).toBe(keys.length);
  });
});
