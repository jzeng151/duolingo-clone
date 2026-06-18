import { describe, test, expect } from 'vitest';
import { checkAnswer, solutionText, type Exercise } from '../src/content/types';

const selectImage: Exercise = {
  type: 'select_image',
  prompt: 'apple',
  answer: 'la manzana',
  options: [
    { emoji: '🍎', word: 'la manzana' },
    { emoji: '🍞', word: 'el pan' },
  ],
};

const selectTranslation: Exercise = {
  type: 'select_translation',
  prompt: 'Where is the hotel?',
  answer: '¿Dónde está el hotel?',
  options: ['¿Dónde está el hotel?', '¿Cómo estás?'],
};

const wordBank: Exercise = {
  type: 'word_bank',
  prompt: 'I need a ticket',
  answer: 'Necesito un billete',
  bank: ['Necesito', 'un', 'billete', 'hotel'],
};

const listenTap: Exercise = {
  type: 'listen_tap',
  answer: 'el gato',
  bank: ['el', 'gato', 'perro'],
};

const dialogue: Exercise = {
  type: 'dialogue',
  lead: 'Hola',
  answer: 'Adiós',
  options: ['Adiós', 'Gracias'],
};

const match: Exercise = {
  type: 'match',
  pairs: [
    { left: 'apple', right: 'manzana' },
    { left: 'bread', right: 'pan' },
  ],
};

describe('checkAnswer', () => {
  test('accepts the exact answer for each text-graded type', () => {
    expect(checkAnswer(selectImage, 'la manzana')).toBe(true);
    expect(checkAnswer(selectTranslation, '¿Dónde está el hotel?')).toBe(true);
    expect(checkAnswer(wordBank, 'Necesito un billete')).toBe(true);
    expect(checkAnswer(listenTap, 'el gato')).toBe(true);
    expect(checkAnswer(dialogue, 'Adiós')).toBe(true);
  });

  test('rejects a wrong answer', () => {
    expect(checkAnswer(selectImage, 'el pan')).toBe(false);
    expect(checkAnswer(wordBank, 'Necesito un hotel')).toBe(false);
    expect(checkAnswer(dialogue, 'Gracias')).toBe(false);
  });

  test('normalizes case, surrounding whitespace, and collapses inner spaces', () => {
    expect(checkAnswer(wordBank, '  necesito   un  billete ')).toBe(true);
    expect(checkAnswer(selectImage, 'LA MANZANA')).toBe(true);
  });

  test('does NOT strip accents or punctuation (graded strictly on those)', () => {
    expect(checkAnswer(selectTranslation, '¿Donde esta el hotel?')).toBe(false);
    expect(checkAnswer(selectTranslation, 'Dónde está el hotel')).toBe(false);
  });

  test('match is always correct (UI prevents wrong locks)', () => {
    expect(checkAnswer(match, '')).toBe(true);
    expect(checkAnswer(match, 'anything')).toBe(true);
  });
});

describe('solutionText', () => {
  test('returns the answer string for text-graded types', () => {
    expect(solutionText(selectImage)).toBe('la manzana');
    expect(solutionText(selectTranslation)).toBe('¿Dónde está el hotel?');
    expect(solutionText(wordBank)).toBe('Necesito un billete');
    expect(solutionText(listenTap)).toBe('el gato');
    expect(solutionText(dialogue)).toBe('Adiós');
  });

  test('joins match pairs into a readable list', () => {
    expect(solutionText(match)).toBe('apple — manzana, bread — pan');
  });
});
