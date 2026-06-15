/* ═══════════════════════════════════════════════════════════════
   Lesson content model.

   Mirrors the question formats in a basic Duolingo Unit-1 Spanish
   lesson, which are overwhelmingly multiple-choice:

   - select_image   "Which one of these is _la manzana_?"  (2×2 picture grid)
   - select_translation  pick the right sentence from a list of cards
   - word_bank      tap word tiles to build the sentence
   - match          "Tap the pairs" — match target ↔ base language

   Picture questions use emoji as license-safe stand-ins for
   Duolingo's proprietary noun illustrations.
   ═══════════════════════════════════════════════════════════════ */

export type CharacterId = 'duo' | 'neutral';

export type Exercise =
  | {
      type: 'select_image';
      /** English word the learner is hunting for, e.g. "apple". The cards show the Spanish words. */
      prompt: string;
      options: Array<{ emoji: string; word: string }>;
      /** The `word` of the correct option. */
      answer: string;
    }
  | {
      type: 'select_translation';
      /** Sentence to translate (shown in the speech bubble). */
      prompt: string;
      character?: CharacterId;
      options: string[];
      answer: string;
    }
  | {
      type: 'word_bank';
      /** Sentence to translate. */
      prompt: string;
      /** e.g. "Write this in Spanish". */
      instruction?: string;
      character?: CharacterId;
      /** Word tiles to choose from (includes a few distractors). */
      bank: string[];
      /** Correct sentence, space-separated. */
      answer: string;
    }
  | {
      type: 'match';
      pairs: Array<{ left: string; right: string }>;
    }
  | {
      // Duolingo "Tap what you hear": audio plays a Spanish sentence and the
      // learner taps Spanish word tiles to reconstruct it. No written prompt.
      type: 'listen_tap';
      /** The Spanish sentence the audio speaks; also the correct answer. */
      answer: string;
      /** Word tiles to tap (includes a few distractors). */
      bank: string[];
    }
  | {
      // Duolingo "Complete the chat": one speaker's line is shown (with audio)
      // and the learner picks the missing reply from a list.
      type: 'dialogue';
      /** The opening line shown in the first speech bubble (Spanish). */
      lead: string;
      character?: CharacterId;
      /** Reply options (Spanish). */
      options: string[];
      /** The correct reply. */
      answer: string;
    };

export const CHARACTERS: Record<CharacterId, { src: string; name: string }> = {
  duo: { src: '/assets/mascot_excited.svg', name: 'Duo' },
  neutral: { src: '/assets/neutral.svg', name: 'Junior' },
};

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Single source of truth for grading, used by both the question UI and the footer. */
export function checkAnswer(exercise: Exercise, answer: string): boolean {
  switch (exercise.type) {
    case 'select_image':
    case 'select_translation':
    case 'word_bank':
    case 'listen_tap':
    case 'dialogue':
      return normalize(answer) === normalize(exercise.answer);
    case 'match':
      // Wrong pairs can never be locked in the UI, so a completed board is always correct.
      return true;
  }
}

/** Human-readable correct answer, shown in the red "Correct solution" banner. */
export function solutionText(exercise: Exercise): string {
  switch (exercise.type) {
    case 'select_image':
    case 'select_translation':
    case 'word_bank':
    case 'listen_tap':
    case 'dialogue':
      return exercise.answer;
    case 'match':
      return exercise.pairs.map((p) => `${p.left} — ${p.right}`).join(', ');
  }
}
