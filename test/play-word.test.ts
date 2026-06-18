import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

// word-audio.ts holds a module-level cache of <audio> elements keyed by src.
// We reset the module registry before each test and re-import playWord, so the
// cache starts empty every time and the "constructs once" assertions hold by
// construction rather than by picking globally-unique words.
async function freshPlayWord() {
  vi.resetModules();
  return (await import('../src/lib/word-audio')).playWord;
}

// Minimal HTMLAudioElement stand-in that records construction and play() calls.
class MockAudio {
  static instances: MockAudio[] = [];
  src: string;
  currentTime = 99;
  play = vi.fn(() => Promise.resolve());
  constructor(src: string) {
    this.src = src;
    MockAudio.instances.push(this);
  }
}

beforeEach(() => {
  MockAudio.instances = [];
  (globalThis as Record<string, unknown>).window = {};
  (globalThis as Record<string, unknown>).Audio = MockAudio;
});

afterEach(() => {
  delete (globalThis as Record<string, unknown>).window;
  delete (globalThis as Record<string, unknown>).Audio;
  vi.restoreAllMocks();
});

describe('playWord', () => {
  test('no-ops (and never constructs Audio) on the server', async () => {
    delete (globalThis as Record<string, unknown>).window;
    const playWord = await freshPlayWord();
    expect(() => playWord('Bien')).not.toThrow();
    expect(MockAudio.instances).toHaveLength(0);
  });

  test('does nothing for a word with no audio', async () => {
    const playWord = await freshPlayWord();
    playWord('this string has no recording');
    expect(MockAudio.instances).toHaveLength(0);
  });

  test('constructs an Audio for the right src, rewinds, and plays', async () => {
    const playWord = await freshPlayWord();
    playWord('Bien');
    expect(MockAudio.instances).toHaveLength(1);
    const el = MockAudio.instances[0];
    expect(el.src).toBe('/audio/es/bien.mp3');
    expect(el.currentTime).toBe(0);
    expect(el.play).toHaveBeenCalledTimes(1);
  });

  test('caches the element: a repeated word constructs once but plays again', async () => {
    const playWord = await freshPlayWord();
    playWord('Bien');
    playWord('Bien');
    expect(MockAudio.instances).toHaveLength(1);
    expect(MockAudio.instances[0].play).toHaveBeenCalledTimes(2);
  });

  test('distinct words construct distinct elements', async () => {
    const playWord = await freshPlayWord();
    playWord('Bien');
    playWord('Adiós');
    expect(MockAudio.instances).toHaveLength(2);
    expect(MockAudio.instances.map((a) => a.src)).toEqual([
      '/audio/es/bien.mp3',
      '/audio/es/adios.mp3',
    ]);
  });

  test('rewinds to 0 before each replay', async () => {
    const playWord = await freshPlayWord();
    playWord('Bien');
    const el = MockAudio.instances[0];
    el.currentTime = 42;
    playWord('Bien');
    expect(el.currentTime).toBe(0);
  });
});
