'use client';

/* Duolingo's real lesson feedback effects, captured from the web app:
   correct  = sounds/37d8f0b39dcfe63872192c89653a93f6.mp3
   incorrect= sounds/f0b6ab4396d5891241ef4ca73b4de13a.mp3
   Played via cached <audio> elements. No-ops on the server. */

let correctEl: HTMLAudioElement | null = null;
let wrongEl: HTMLAudioElement | null = null;

function play(el: HTMLAudioElement | null) {
  if (!el) return;
  el.currentTime = 0;
  // Autoplay can reject before the first user gesture; ignore that.
  void el.play().catch(() => {});
}

export function playCorrect() {
  if (typeof window === 'undefined') return;
  if (!correctEl) correctEl = new Audio('/audio/sfx/correct.mp3');
  play(correctEl);
}

export function playWrong() {
  if (typeof window === 'undefined') return;
  if (!wrongEl) wrongEl = new Audio('/audio/sfx/incorrect.mp3');
  play(wrongEl);
}
