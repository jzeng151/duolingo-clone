import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock the browser Supabase client (its module throws at import without env
// vars, and we don't want a real network call).
const { rpc } = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock('../lib/supabase-browser', () => ({ supabaseBrowser: { rpc } }));

import { syncOnboarding } from '../src/lib/syncOnboarding';
import { saveOnboarding, loadOnboarding } from '../src/lib/onboarding';

function installLocalStorage() {
  const store = new Map<string, string>();
  (globalThis as Record<string, unknown>).window = {
    localStorage: {
      getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
      setItem: (k: string, v: string) => void store.set(k, String(v)),
      removeItem: (k: string) => void store.delete(k),
      clear: () => store.clear(),
    },
  };
}

beforeEach(() => {
  rpc.mockReset();
  installLocalStorage();
});

afterEach(() => {
  delete (globalThis as Record<string, unknown>).window;
});

describe('syncOnboarding', () => {
  test('does nothing when there is no stored onboarding', async () => {
    await syncOnboarding();
    expect(rpc).not.toHaveBeenCalled();
  });

  test('pushes stored choices to the save_onboarding RPC', async () => {
    saveOnboarding({ language: 'es', reason: 'travel', proficiency: 'new', goalMinutes: 15 });
    rpc.mockResolvedValue({ error: null });

    await syncOnboarding();

    expect(rpc).toHaveBeenCalledWith('save_onboarding', {
      p_language: 'es',
      p_reason: 'travel',
      p_proficiency: 'new',
      p_goal_minutes: 15,
    });
  });

  test('clears localStorage after a successful sync', async () => {
    saveOnboarding({ reason: 'career' });
    rpc.mockResolvedValue({ error: null });

    await syncOnboarding();

    expect(loadOnboarding()).toBeNull();
  });

  test('keeps localStorage when the RPC fails, so a later retry can resync', async () => {
    saveOnboarding({ reason: 'career' });
    rpc.mockResolvedValue({ error: { message: 'network' } });

    await syncOnboarding();

    expect(loadOnboarding()).toEqual({ reason: 'career' });
  });

  test('sends a literal goalMinutes 0 rather than collapsing it to null', async () => {
    // `data.goalMinutes ?? null` must preserve 0 (a real, if unused, choice),
    // not treat it as missing.
    saveOnboarding({ reason: 'fun', goalMinutes: 0 });
    rpc.mockResolvedValue({ error: null });

    await syncOnboarding();

    expect(rpc.mock.calls[0][1].p_goal_minutes).toBe(0);
  });

  test('does not send the source field (the RPC has no p_source param)', async () => {
    saveOnboarding({ reason: 'fun', source: 'tiktok' });
    rpc.mockResolvedValue({ error: null });

    await syncOnboarding();

    expect(rpc.mock.calls[0][1]).not.toHaveProperty('p_source');
  });

  test('applies defaults: language es, missing fields null', async () => {
    saveOnboarding({ reason: 'people' });
    rpc.mockResolvedValue({ error: null });

    await syncOnboarding();

    expect(rpc).toHaveBeenCalledWith('save_onboarding', {
      p_language: 'es',
      p_reason: 'people',
      p_proficiency: null,
      p_goal_minutes: null,
    });
  });
});
