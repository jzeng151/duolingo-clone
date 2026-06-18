import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  loadOnboarding,
  saveOnboarding,
  clearOnboarding,
  getLearningReason,
} from '../src/lib/onboarding';

// onboarding.ts gates on `typeof window === 'undefined'` and talks to
// window.localStorage. We stub a minimal in-memory localStorage on globalThis
// rather than pull in jsdom for a single module.
function installLocalStorage() {
  const store = new Map<string, string>();
  const localStorage = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
  };
  (globalThis as Record<string, unknown>).window = { localStorage };
  return store;
}

describe('onboarding (browser)', () => {
  let store: Map<string, string>;

  beforeEach(() => {
    store = installLocalStorage();
  });

  afterEach(() => {
    delete (globalThis as Record<string, unknown>).window;
    vi.restoreAllMocks();
  });

  test('loadOnboarding returns null when nothing stored', () => {
    expect(loadOnboarding()).toBeNull();
  });

  test('saveOnboarding then loadOnboarding round-trips', () => {
    saveOnboarding({ language: 'es', reason: 'travel' });
    expect(loadOnboarding()).toEqual({ language: 'es', reason: 'travel' });
  });

  test('saveOnboarding merges patches rather than overwriting', () => {
    saveOnboarding({ language: 'es', reason: 'travel' });
    saveOnboarding({ goalMinutes: 15 });
    expect(loadOnboarding()).toEqual({
      language: 'es',
      reason: 'travel',
      goalMinutes: 15,
    });
  });

  test('a later patch overrides the same key', () => {
    saveOnboarding({ reason: 'travel' });
    saveOnboarding({ reason: 'career' });
    expect(loadOnboarding()?.reason).toBe('career');
  });

  test('clearOnboarding removes the stored state', () => {
    saveOnboarding({ reason: 'fun' });
    clearOnboarding();
    expect(loadOnboarding()).toBeNull();
  });

  test('loadOnboarding tolerates corrupt JSON and returns null', () => {
    store.set('duo:onboarding', '{not valid json');
    expect(loadOnboarding()).toBeNull();
  });

  test('getLearningReason returns the stored reason', () => {
    saveOnboarding({ reason: 'education' });
    expect(getLearningReason()).toBe('education');
  });

  test('getLearningReason defaults to "fun" when unset', () => {
    expect(getLearningReason()).toBe('fun');
  });
});

describe('onboarding (server / no window)', () => {
  beforeEach(() => {
    delete (globalThis as Record<string, unknown>).window;
  });

  test('loadOnboarding is null and writers are no-ops under SSR', () => {
    expect(loadOnboarding()).toBeNull();
    expect(() => saveOnboarding({ reason: 'travel' })).not.toThrow();
    expect(() => clearOnboarding()).not.toThrow();
    expect(getLearningReason()).toBe('fun');
  });
});
