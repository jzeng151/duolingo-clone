import { describe, test, expect } from 'vitest';
import {
  transition,
  initialLessonState,
  type LessonState,
  type LessonAction,
} from '../src/lib/lesson-state-machine';

describe('lesson state machine', () => {
  test('starts idle', () => {
    expect(initialLessonState).toBe('idle');
  });

  test('idle + START -> showing_question, no events', () => {
    expect(transition('idle', { type: 'START' })).toEqual({
      nextState: 'showing_question',
      events: [],
    });
  });

  test('SUBMIT correct -> feedback_correct, emits ANSWER_SUBMITTED', () => {
    expect(
      transition('showing_question', { type: 'SUBMIT', answer: 'x', isCorrect: true })
    ).toEqual({ nextState: 'feedback_correct', events: ['ANSWER_SUBMITTED'] });
  });

  test('SUBMIT wrong -> feedback_wrong, emits ANSWER_SUBMITTED', () => {
    expect(
      transition('showing_question', { type: 'SUBMIT', answer: 'x', isCorrect: false })
    ).toEqual({ nextState: 'feedback_wrong', events: ['ANSWER_SUBMITTED'] });
  });

  test.each(['feedback_correct', 'feedback_wrong'] as LessonState[])(
    '%s + NEXT (not last) -> showing_question',
    (state) => {
      expect(transition(state, { type: 'NEXT', isLast: false })).toEqual({
        nextState: 'showing_question',
        events: [],
      });
    }
  );

  test.each(['feedback_correct', 'feedback_wrong'] as LessonState[])(
    '%s + NEXT (last) -> done',
    (state) => {
      expect(transition(state, { type: 'NEXT', isLast: true })).toEqual({
        nextState: 'done',
        events: [],
      });
    }
  );

  test('done + NEXT -> persisting, emits LESSON_COMPLETED', () => {
    expect(transition('done', { type: 'NEXT', isLast: true })).toEqual({
      nextState: 'persisting',
      events: ['LESSON_COMPLETED'],
    });
  });

  test('persisting + SAVE_SUCCESS without streak -> complete, only XP_AWARDED', () => {
    expect(
      transition('persisting', { type: 'SAVE_SUCCESS', xpEarned: 10, newStreak: 0 })
    ).toEqual({ nextState: 'complete', events: ['XP_AWARDED'] });
  });

  test('persisting + SAVE_SUCCESS with streak -> complete, XP + STREAK_EXTENDED', () => {
    expect(
      transition('persisting', { type: 'SAVE_SUCCESS', xpEarned: 10, newStreak: 3 })
    ).toEqual({ nextState: 'complete', events: ['XP_AWARDED', 'STREAK_EXTENDED'] });
  });

  test('persisting + SAVE_ERROR -> error, no events', () => {
    expect(transition('persisting', { type: 'SAVE_ERROR' })).toEqual({
      nextState: 'error',
      events: [],
    });
  });

  test('error + RETRY -> persisting, no events', () => {
    expect(transition('error', { type: 'RETRY' })).toEqual({
      nextState: 'persisting',
      events: [],
    });
  });

  test('complete is terminal: any action is a no-op', () => {
    expect(transition('complete', { type: 'START' })).toEqual({
      nextState: 'complete',
      events: [],
    });
    expect(transition('complete', { type: 'RETRY' })).toEqual({
      nextState: 'complete',
      events: [],
    });
  });

  describe('illegal transitions are no-ops (state preserved, no events)', () => {
    const illegal: Array<[LessonState, LessonAction]> = [
      ['idle', { type: 'SUBMIT', answer: 'x', isCorrect: true }],
      ['idle', { type: 'NEXT', isLast: false }],
      ['showing_question', { type: 'START' }],
      ['showing_question', { type: 'NEXT', isLast: false }],
      ['feedback_correct', { type: 'START' }],
      ['feedback_correct', { type: 'SUBMIT', answer: 'x', isCorrect: true }],
      ['done', { type: 'START' }],
      ['done', { type: 'SUBMIT', answer: 'x', isCorrect: true }],
      ['done', { type: 'SAVE_SUCCESS', xpEarned: 10, newStreak: 1 }],
      ['persisting', { type: 'START' }],
      ['persisting', { type: 'RETRY' }],
      ['persisting', { type: 'NEXT', isLast: true }],
      ['error', { type: 'SAVE_SUCCESS', xpEarned: 10, newStreak: 1 }],
      ['error', { type: 'SUBMIT', answer: 'x', isCorrect: true }],
      ['error', { type: 'NEXT', isLast: true }],
      // The dangerous one: a double-tap after the lesson is already complete
      // must not re-fire persistence or completion events.
      ['complete', { type: 'NEXT', isLast: true }],
      ['complete', { type: 'SAVE_SUCCESS', xpEarned: 10, newStreak: 1 }],
      ['complete', { type: 'SUBMIT', answer: 'x', isCorrect: true }],
    ];

    test.each(illegal)('%s ignores %o', (state, action) => {
      expect(transition(state, action)).toEqual({ nextState: state, events: [] });
    });
  });

  test('a full happy-path run reaches complete with the expected event stream', () => {
    const events: string[] = [];
    let state = initialLessonState;
    const step = (action: LessonAction) => {
      const r = transition(state, action);
      state = r.nextState;
      events.push(...r.events);
    };

    step({ type: 'START' });
    // two exercises
    step({ type: 'SUBMIT', answer: 'a', isCorrect: true });
    step({ type: 'NEXT', isLast: false });
    step({ type: 'SUBMIT', answer: 'b', isCorrect: false });
    step({ type: 'NEXT', isLast: true });
    step({ type: 'NEXT', isLast: true });
    step({ type: 'SAVE_SUCCESS', xpEarned: 10, newStreak: 2 });

    expect(state).toBe('complete');
    expect(events).toEqual([
      'ANSWER_SUBMITTED',
      'ANSWER_SUBMITTED',
      'LESSON_COMPLETED',
      'XP_AWARDED',
      'STREAK_EXTENDED',
    ]);
  });

  test('error path recovers via RETRY then SAVE_SUCCESS', () => {
    let state: LessonState = 'persisting';
    state = transition(state, { type: 'SAVE_ERROR' }).nextState;
    expect(state).toBe('error');
    state = transition(state, { type: 'RETRY' }).nextState;
    expect(state).toBe('persisting');
    const r = transition(state, { type: 'SAVE_SUCCESS', xpEarned: 10, newStreak: 0 });
    expect(r.nextState).toBe('complete');
    expect(r.events).toEqual(['XP_AWARDED']);
  });
});
