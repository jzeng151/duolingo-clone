import { describe, test, expect } from 'vitest';
import { getSpanishLesson, getLessonById } from '../src/content/spanish-lessons';
import { spanishLesson1 } from '../src/content/spanish-lesson-1';
import { ALL_LESSON_IDS } from '../src/content/course';
import type { LearningReason } from '../src/lib/onboarding';

const THEMED: LearningReason[] = ['travel', 'career', 'education', 'people'];
const UNTHEMED: LearningReason[] = ['fun', 'productivity', 'other'];

describe('getSpanishLesson', () => {
  test.each(THEMED)('reason %s returns a dedicated (non-base) themed lesson', (reason) => {
    const lesson = getSpanishLesson(reason);
    expect(lesson.length).toBeGreaterThan(0);
    expect(lesson).not.toBe(spanishLesson1);
  });

  test.each(UNTHEMED)('reason %s falls back to the base lesson', (reason) => {
    expect(getSpanishLesson(reason)).toBe(spanishLesson1);
  });

  test('distinct reasons map to distinct lesson objects', () => {
    const lessons = THEMED.map(getSpanishLesson);
    expect(new Set(lessons).size).toBe(THEMED.length);
  });

  test('a corrupt/unknown reason value falls back to the base lesson', () => {
    // getLearningReason casts localStorage data unchecked, so a stale or garbage
    // reason can reach here; it must not crash or return undefined.
    expect(getSpanishLesson('garbage' as LearningReason)).toBe(spanishLesson1);
  });
});

describe('getLessonById', () => {
  test('lesson 1 stays themed by the onboarding reason', () => {
    expect(getLessonById('spanish-lesson-1', 'travel')).toBe(getSpanishLesson('travel'));
    expect(getLessonById('spanish-lesson-1', 'fun')).toBe(spanishLesson1);
  });

  test('every course lesson id resolves to a non-empty exercise list', () => {
    for (const id of ALL_LESSON_IDS) {
      const lesson = getLessonById(id, 'fun');
      expect(lesson.length, `lesson ${id} should have exercises`).toBeGreaterThan(0);
    }
  });

  test('a non-lesson-1 fixed id ignores the reason', () => {
    expect(getLessonById('spanish-2-1', 'travel')).toBe(getLessonById('spanish-2-1', 'career'));
  });

  test('unknown ids fall back to the base lesson', () => {
    expect(getLessonById('does-not-exist', 'fun')).toBe(spanishLesson1);
  });
});
