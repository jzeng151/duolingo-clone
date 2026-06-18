import { describe, test, expect } from 'vitest';
import {
  UNITS,
  ALL_LESSON_IDS,
  isKnownLessonId,
  computeStates,
} from '../src/content/course';

describe('course manifest', () => {
  test('ALL_LESSON_IDS is the flattened, ordered unit lesson ids', () => {
    expect(ALL_LESSON_IDS).toEqual(UNITS.flatMap((u) => u.lessons.map((l) => l.id)));
  });

  test('lesson ids are unique', () => {
    expect(new Set(ALL_LESSON_IDS).size).toBe(ALL_LESSON_IDS.length);
  });

  test('isKnownLessonId reflects membership', () => {
    expect(isKnownLessonId('spanish-lesson-1')).toBe(true);
    expect(isKnownLessonId('spanish-5-4')).toBe(true);
    expect(isKnownLessonId('does-not-exist')).toBe(false);
    expect(isKnownLessonId('')).toBe(false);
  });
});

describe('computeStates', () => {
  test('nothing completed: first lesson active, rest locked', () => {
    const states = computeStates(new Set());
    expect(states[ALL_LESSON_IDS[0]]).toBe('active');
    for (const id of ALL_LESSON_IDS.slice(1)) {
      expect(states[id]).toBe('locked');
    }
  });

  test('completed lessons are complete; the first gap is the only active node', () => {
    const completed = new Set([ALL_LESSON_IDS[0], ALL_LESSON_IDS[1]]);
    const states = computeStates(completed);
    expect(states[ALL_LESSON_IDS[0]]).toBe('complete');
    expect(states[ALL_LESSON_IDS[1]]).toBe('complete');
    expect(states[ALL_LESSON_IDS[2]]).toBe('active');
    expect(states[ALL_LESSON_IDS[3]]).toBe('locked');
  });

  test('a later completion without earlier ones still only activates the first gap', () => {
    // Out-of-order completion data (defensive): id[2] done but id[0] not.
    const states = computeStates(new Set([ALL_LESSON_IDS[2]]));
    expect(states[ALL_LESSON_IDS[0]]).toBe('active');
    expect(states[ALL_LESSON_IDS[1]]).toBe('locked');
    expect(states[ALL_LESSON_IDS[2]]).toBe('complete');
    expect(states[ALL_LESSON_IDS[3]]).toBe('locked');
  });

  test('exactly one active node when the course is partially complete', () => {
    const states = computeStates(new Set([ALL_LESSON_IDS[0]]));
    const actives = Object.values(states).filter((s) => s === 'active');
    expect(actives).toHaveLength(1);
  });

  test('everything completed: all complete, no active node', () => {
    const states = computeStates(new Set(ALL_LESSON_IDS));
    expect(Object.values(states).every((s) => s === 'complete')).toBe(true);
    expect(Object.values(states)).not.toContain('active');
  });

  test('every lesson id receives a state', () => {
    const states = computeStates(new Set());
    expect(Object.keys(states).sort()).toEqual([...ALL_LESSON_IDS].sort());
  });

  test('unknown completed ids do not affect the path', () => {
    const states = computeStates(new Set(['ghost-lesson']));
    expect(states['ghost-lesson']).toBeUndefined();
    expect(states[ALL_LESSON_IDS[0]]).toBe('active');
  });
});
