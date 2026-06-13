'use client';

/* Tiny synthesized feedback tones so the lesson has Duolingo's signature
   "ding / buzz" feel without shipping any audio assets. No-ops on the
   server and if the Web Audio API is unavailable. */

let ctx: AudioContext | null = null;

function audioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  return ctx;
}

function tone(freq: number, start: number, duration: number) {
  const ac = audioContext();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  const t = ac.currentTime + start;
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.15, t + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + duration + 0.02);
}

export function playCorrect() {
  // Bright ascending two-note chime.
  tone(587.33, 0, 0.12); // D5
  tone(880.0, 0.1, 0.18); // A5
}

export function playWrong() {
  // Low descending buzz.
  tone(196.0, 0, 0.18); // G3
  tone(146.83, 0.12, 0.22); // D3
}
