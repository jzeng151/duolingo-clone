import { describe, test, expect, beforeEach, vi } from 'vitest';

// Mock the Supabase server client so the action runs without next/headers or a
// real backend. vi.hoisted lets the mock factory reference these fns safely.
const { getUser, rpc } = vi.hoisted(() => ({ getUser: vi.fn(), rpc: vi.fn() }));

vi.mock('../lib/supabase-server', () => ({
  createServerSupabaseClient: vi.fn(async () => ({
    auth: { getUser },
    rpc,
  })),
}));

import { completeLesson } from '../src/actions/completeLesson';

const authedUser = { data: { user: { id: 'u1' } }, error: null };

beforeEach(() => {
  getUser.mockReset();
  rpc.mockReset();
});

describe('completeLesson', () => {
  test('returns unauthenticated when getUser reports an error', async () => {
    getUser.mockResolvedValue({ data: { user: null }, error: { message: 'nope' } });
    expect(await completeLesson('spanish-lesson-1')).toEqual({ error: 'unauthenticated' });
    expect(rpc).not.toHaveBeenCalled();
  });

  test('returns unauthenticated when there is no user (no error)', async () => {
    getUser.mockResolvedValue({ data: { user: null }, error: null });
    expect(await completeLesson('spanish-lesson-1')).toEqual({ error: 'unauthenticated' });
    expect(rpc).not.toHaveBeenCalled();
  });

  test('rejects a blank lesson id before calling the RPC', async () => {
    getUser.mockResolvedValue(authedUser);
    expect(await completeLesson('   ')).toEqual({ error: 'lesson_id is required' });
    expect(rpc).not.toHaveBeenCalled();
  });

  test('trims the lesson id before passing it to the RPC', async () => {
    getUser.mockResolvedValue(authedUser);
    rpc.mockResolvedValue({ data: [{ xp_earned: 10, current_streak: 1 }], error: null });
    await completeLesson('  spanish-1-2  ');
    expect(rpc).toHaveBeenCalledWith('complete_lesson', { p_lesson_id: 'spanish-1-2' });
  });

  test('surfaces the RPC error message', async () => {
    getUser.mockResolvedValue(authedUser);
    rpc.mockResolvedValue({ data: null, error: { message: 'lesson is locked' } });
    expect(await completeLesson('spanish-1-2')).toEqual({ error: 'lesson is locked' });
  });

  test('returns "No progress returned" when the RPC yields an empty array', async () => {
    getUser.mockResolvedValue(authedUser);
    rpc.mockResolvedValue({ data: [], error: null });
    expect(await completeLesson('spanish-1-2')).toEqual({ error: 'No progress returned' });
  });

  test('returns "No progress returned" when data is not an array', async () => {
    getUser.mockResolvedValue(authedUser);
    rpc.mockResolvedValue({ data: { xp_earned: 10, current_streak: 1 }, error: null });
    expect(await completeLesson('spanish-1-2')).toEqual({ error: 'No progress returned' });
  });

  test('maps a successful row to xpEarned / newStreak', async () => {
    getUser.mockResolvedValue(authedUser);
    rpc.mockResolvedValue({
      data: [{ xp_earned: 10, current_streak: 4 }],
      error: null,
    });
    expect(await completeLesson('spanish-1-2')).toEqual({ xpEarned: 10, newStreak: 4 });
  });

  test('re-completing an already-done lesson returns xpEarned 0 with the carried streak', async () => {
    // complete_lesson() (migration 004) inserts ON CONFLICT DO NOTHING and, when
    // nothing was inserted, returns xp_earned 0 and the existing streak. That is
    // a success, not an error — the action must surface it as such.
    getUser.mockResolvedValue(authedUser);
    rpc.mockResolvedValue({ data: [{ xp_earned: 0, current_streak: 5 }], error: null });
    expect(await completeLesson('spanish-1-2')).toEqual({ xpEarned: 0, newStreak: 5 });
  });

  test('uses the first row when the RPC returns multiple', async () => {
    getUser.mockResolvedValue(authedUser);
    rpc.mockResolvedValue({
      data: [
        { xp_earned: 0, current_streak: 7 },
        { xp_earned: 10, current_streak: 1 },
      ],
      error: null,
    });
    expect(await completeLesson('spanish-1-2')).toEqual({ xpEarned: 0, newStreak: 7 });
  });
});
