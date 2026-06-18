import { describe, test, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { checkAnswer, type Exercise } from '../src/content/types';
import { getSpanishLesson, getLessonById } from '../src/content/spanish-lessons';
import { ALL_LESSON_IDS } from '../src/content/course';
import { wordAudioSrc } from '../src/lib/word-audio';
import type { LearningReason } from '../src/lib/onboarding';
import manifest from '../src/content/word-audio.json';

const ALL_REASONS: LearningReason[] = [
  'education',
  'people',
  'fun',
  'travel',
  'productivity',
  'career',
  'other',
];

// Mirror types.ts `normalize` (not exported) so membership checks match how
// the grader actually compares strings.
const normalize = (v: string) => v.trim().toLowerCase().replace(/\s+/g, ' ');

// Every exercise a learner can actually reach: the four themed lesson-1
// variants + the base, and every fixed lesson in the course map.
type Tagged = { label: string; index: number; ex: Exercise };
const exercises: Tagged[] = [];
for (const reason of ALL_REASONS) {
  getSpanishLesson(reason).forEach((ex, index) =>
    exercises.push({ label: `themed:${reason}`, index, ex })
  );
}
for (const id of ALL_LESSON_IDS) {
  getLessonById(id, 'fun').forEach((ex, index) =>
    exercises.push({ label: id, index, ex })
  );
}

describe('content integrity', () => {
  test('there are exercises to validate', () => {
    expect(exercises.length).toBeGreaterThan(50);
  });

  describe.each(exercises)('$label[$index] ($ex.type)', ({ ex }) => {
    test('is self-consistent for its type', () => {
      switch (ex.type) {
        case 'select_image': {
          expect(ex.options.length).toBeGreaterThanOrEqual(2);
          for (const opt of ex.options) {
            expect(opt.emoji, 'every option has an emoji').toBeTruthy();
            expect(opt.word, 'every option has a word').toBeTruthy();
          }
          const words = ex.options.map((o) => o.word);
          expect(new Set(words).size, 'option words are distinct').toBe(words.length);
          const matches = ex.options.filter(
            (o) => normalize(o.word) === normalize(ex.answer)
          );
          expect(matches, 'answer matches exactly one option word').toHaveLength(1);
          // The canonical answer grades correct; the other option words do not.
          expect(checkAnswer(ex, ex.answer)).toBe(true);
          for (const o of ex.options) {
            if (normalize(o.word) !== normalize(ex.answer)) {
              expect(checkAnswer(ex, o.word)).toBe(false);
            }
          }
          break;
        }

        case 'select_translation':
        case 'dialogue': {
          expect(ex.options.length).toBeGreaterThanOrEqual(2);
          expect(new Set(ex.options).size, 'options are distinct').toBe(ex.options.length);
          const matches = ex.options.filter((o) => normalize(o) === normalize(ex.answer));
          expect(matches, 'answer is exactly one of the options').toHaveLength(1);
          expect(checkAnswer(ex, ex.answer)).toBe(true);
          for (const o of ex.options) {
            if (normalize(o) !== normalize(ex.answer)) {
              expect(checkAnswer(ex, o)).toBe(false);
            }
          }
          if (ex.type === 'dialogue') {
            expect(ex.lead, 'dialogue has a lead line').toBeTruthy();
          }
          break;
        }

        case 'word_bank':
        case 'listen_tap': {
          expect(ex.bank.length).toBeGreaterThan(0);
          expect(ex.answer.trim(), 'answer is non-empty').toBeTruthy();
          expect(ex.answer, 'answer has no leading/trailing whitespace').toBe(ex.answer.trim());
          // Every answer word must be buildable from the bank tiles, counting
          // multiplicity — the UI consumes a tile per word.
          const remaining = [...ex.bank];
          for (const word of ex.answer.split(' ')) {
            const i = remaining.indexOf(word);
            expect(
              i,
              `bank is missing a tile for "${word}" in "${ex.answer}" (bank: ${ex.bank.join(', ')})`
            ).toBeGreaterThanOrEqual(0);
            if (i >= 0) remaining.splice(i, 1);
          }
          expect(checkAnswer(ex, ex.answer)).toBe(true);
          // listen_tap has NO written prompt — QuestionDisplay auto-plays
          // playWord(answer) (QuestionDisplay.tsx:102). Without audio the
          // exercise is silent and unsolvable, so the answer MUST have a clip.
          if (ex.type === 'listen_tap') {
            expect(
              wordAudioSrc(ex.answer),
              `listen_tap answer "${ex.answer}" has no audio in word-audio.json`
            ).toBeTruthy();
          }
          break;
        }

        case 'match': {
          expect(ex.pairs.length).toBeGreaterThanOrEqual(2);
          for (const p of ex.pairs) {
            expect(p.left, 'pair has a left').toBeTruthy();
            expect(p.right, 'pair has a right').toBeTruthy();
          }
          const lefts = ex.pairs.map((p) => p.left);
          const rights = ex.pairs.map((p) => p.right);
          expect(new Set(lefts).size, 'left sides are distinct').toBe(lefts.length);
          expect(new Set(rights).size, 'right sides are distinct').toBe(rights.length);
          break;
        }
      }
    });
  });
});

describe('course map ↔ database sync (all migrations)', () => {
  // course_lessons is the DB's source of truth for the sequential-unlock guard;
  // its final migrated state must mirror ALL_LESSON_IDS exactly, in order.
  //
  // We replay EVERY migration (not just 004) so the documented growth path holds:
  // course.ts says to add lessons via a follow-up migration rather than editing a
  // historical one. We scan all migration files in filename order, collect every
  // `course_lessons` (lesson_id, position) tuple, and apply last-write-wins per
  // lesson_id — so a later `005_*` that inserts or repositions rows is honored.
  const dir = join(process.cwd(), 'supabase/migrations');
  const files = readdirSync(dir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  // Final position per lesson_id after all migrations are applied.
  const finalPos = new Map<string, number>();
  for (const file of files) {
    const sql = readFileSync(join(dir, file), 'utf8');
    // Only `insert into ... course_lessons ... values (...)` blocks, so an
    // unrelated `('x', 1)` tuple elsewhere in a file can't pollute the parse.
    for (const block of sql.matchAll(
      /insert\s+into\s+public\.course_lessons[^;]*?values([\s\S]*?);/gi
    )) {
      for (const m of block[1].matchAll(/\(\s*'([^']+)'\s*,\s*(\d+)\s*\)/g)) {
        finalPos.set(m[1], Number(m[2]));
      }
    }
  }

  const rows = [...finalPos.entries()]
    .map(([id, position]) => ({ id, position }))
    .sort((a, b) => a.position - b.position);

  test('at least one migration defines the full course_lessons table', () => {
    expect(rows.length).toBe(ALL_LESSON_IDS.length);
  });

  test('final migrated order matches ALL_LESSON_IDS', () => {
    expect(rows.map((r) => r.id)).toEqual(ALL_LESSON_IDS);
  });

  test('final positions are a 1..N contiguous sequence', () => {
    expect(rows.map((r) => r.position)).toEqual(
      ALL_LESSON_IDS.map((_, i) => i + 1)
    );
  });
});

describe('audio manifest integrity', () => {
  const map = manifest as Record<string, string>;

  test('keys are non-empty and trimmed', () => {
    for (const key of Object.keys(map)) {
      expect(key.length).toBeGreaterThan(0);
      expect(key).toBe(key.trim());
    }
  });

  test('every value is an /audio/es path to a file that exists on disk', () => {
    const missing: string[] = [];
    for (const [, src] of Object.entries(map)) {
      expect(src.startsWith('/audio/es/')).toBe(true);
      if (!existsSync(join(process.cwd(), 'public', src))) missing.push(src);
    }
    expect(missing, `manifest points at missing audio files: ${missing.join(', ')}`).toEqual([]);
  });

  // Note: distinct strings legitimately share one recording — case, punctuation,
  // and accent variants ("Bien"/"bien", "¿De dónde eres?"/"De dónde eres") slug
  // to the same TTS file. So shared values are expected, not a defect.
});
