'use client';

import { playWord, wordAudioSrc } from '../lib/word-audio';

/* Duolingo's blue speaker button. Plays the Spanish audio for `text`.
   `slow` renders the smaller turtle-speed variant (same clip; we have one
   recording per string). Renders nothing if we have no audio for the text. */
export default function Speaker({
  text,
  slow = false,
  className = '',
}: {
  text: string;
  slow?: boolean;
  className?: string;
}) {
  if (!wordAudioSrc(text)) return null;
  const size = slow ? 'h-12 w-12' : 'h-16 w-16';
  const bg = slow ? 'bg-[#84D8FF]' : 'bg-[#1CB0F6]';
  return (
    <button
      type="button"
      onClick={() => playWord(text)}
      aria-label={slow ? `Play "${text}" slowly` : `Play "${text}"`}
      className={`flex shrink-0 items-center justify-center rounded-2xl border-b-4 border-black/20 text-white transition-transform active:translate-y-0.5 ${bg} ${size} ${className}`}
    >
      <svg viewBox="0 0 24 24" className={slow ? 'h-5 w-5' : 'h-7 w-7'} fill="currentColor" aria-hidden="true">
        <path d="M3 9v6h4l5 5V4L7 9H3z" />
        {!slow && <path d="M16 7.5a5 5 0 0 1 0 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
        {!slow && <path d="M18.5 5a8.5 8.5 0 0 1 0 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
      </svg>
    </button>
  );
}
