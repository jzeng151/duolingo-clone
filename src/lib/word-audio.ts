'use client';

/* Per-word / per-sentence Spanish audio. The manifest maps each Spanish
   string used in our lessons to a generated TTS mp3 under /audio/es/.
   Built by scripts/gen-word-audio (Google Translate TTS); see word-audio.json. */
import manifest from '../content/word-audio.json';

const map = manifest as Record<string, string>;

/** The audio file for a Spanish string, or null if we have none. */
export function wordAudioSrc(text: string): string | null {
  return map[text.trim()] ?? null;
}

const cache = new Map<string, HTMLAudioElement>();

/** Play the audio for a Spanish string. No-op on the server or when unknown. */
export function playWord(text: string) {
  if (typeof window === 'undefined') return;
  const src = wordAudioSrc(text);
  if (!src) return;
  let el = cache.get(src);
  if (!el) {
    el = new Audio(src);
    cache.set(src, el);
  }
  el.currentTime = 0;
  void el.play().catch(() => {});
}
