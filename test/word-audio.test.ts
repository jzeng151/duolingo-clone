import { describe, test, expect } from 'vitest';
import { wordAudioSrc } from '../src/lib/word-audio';
import manifest from '../src/content/word-audio.json';

const map = manifest as Record<string, string>;

describe('wordAudioSrc', () => {
  test('resolves a known Spanish string to its audio path', () => {
    expect(wordAudioSrc('Adiós')).toBe('/audio/es/adios.mp3');
  });

  test('trims surrounding whitespace before lookup', () => {
    expect(wordAudioSrc('  Adiós  ')).toBe('/audio/es/adios.mp3');
  });

  test('returns null for an unknown string', () => {
    expect(wordAudioSrc('this is not in the manifest')).toBeNull();
  });

  test('returns null (not undefined) so callers can no-op cleanly', () => {
    expect(wordAudioSrc('nope')).toBeNull();
  });

  test('resolves every key in the manifest', () => {
    for (const key of Object.keys(map)) {
      expect(wordAudioSrc(key)).toBe(map[key]);
    }
  });
});
