import { describe, expect, it } from "vitest";
import {
  detectWeakCategories,
  WEAKNESS_THRESHOLD,
  WEAKNESS_WINDOW_DAYS,
} from "../src/lib/weakness";

const NOW = Date.UTC(2026, 5, 20);
const DAY = 24 * 60 * 60 * 1000;
const daysAgo = (n: number) => new Date(NOW - n * DAY).toISOString();

describe("detectWeakCategories", () => {
  it("flags a category at the threshold within the window", () => {
    const events = Array.from({ length: WEAKNESS_THRESHOLD }, () => ({
      category: "word_order" as const,
      createdAt: daysAgo(1),
    }));
    expect(detectWeakCategories(events, { now: NOW })).toEqual([
      { category: "word_order", count: 3 },
    ]);
  });

  it("does not flag a category below the threshold", () => {
    const events = [
      { category: "vocabulary" as const, createdAt: daysAgo(1) },
      { category: "vocabulary" as const, createdAt: daysAgo(2) },
    ];
    expect(detectWeakCategories(events, { now: NOW })).toEqual([]);
  });

  it("ages out mistakes outside the rolling window (de-escalation)", () => {
    const stale = Array.from({ length: 5 }, () => ({
      category: "listening" as const,
      createdAt: daysAgo(WEAKNESS_WINDOW_DAYS + 1),
    }));
    expect(detectWeakCategories(stale, { now: NOW })).toEqual([]);
  });

  it("counts only in-window events when a category straddles the cutoff", () => {
    const events = [
      { category: "grammar" as const, createdAt: daysAgo(1) },
      { category: "grammar" as const, createdAt: daysAgo(2) },
      { category: "grammar" as const, createdAt: daysAgo(3) },
      { category: "grammar" as const, createdAt: daysAgo(WEAKNESS_WINDOW_DAYS + 5) },
    ];
    expect(detectWeakCategories(events, { now: NOW })).toEqual([
      { category: "grammar", count: 3 },
    ]);
  });

  it("sorts flagged categories by count, descending", () => {
    const events = [
      ...Array.from({ length: 5 }, () => ({
        category: "vocabulary" as const,
        createdAt: daysAgo(1),
      })),
      ...Array.from({ length: 3 }, () => ({
        category: "grammar" as const,
        createdAt: daysAgo(1),
      })),
    ];
    expect(detectWeakCategories(events, { now: NOW })).toEqual([
      { category: "vocabulary", count: 5 },
      { category: "grammar", count: 3 },
    ]);
  });

  it("honors a custom threshold", () => {
    const events = [{ category: "spelling" as const, createdAt: daysAgo(1) }];
    expect(detectWeakCategories(events, { now: NOW, threshold: 1 })).toEqual([
      { category: "spelling", count: 1 },
    ]);
  });

  it("returns nothing for an empty event list", () => {
    expect(detectWeakCategories([], { now: NOW })).toEqual([]);
  });
});
