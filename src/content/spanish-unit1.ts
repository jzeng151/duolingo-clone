import type { Exercise } from './types';

/* ═══════════════════════════════════════════════════════════════
   Section 1, Unit 1 — "Order at a café".

   Lessons 2-4 of the unit (lesson 1 lives in spanish-lesson-1.ts and
   is themed by the learner's onboarding reason). These three are
   fixed café-vocabulary lessons that unlock in sequence.

   Authoring rules that keep grading correct (see checkAnswer in
   types.ts — it lowercases/trims/collapses spaces but does NOT strip
   punctuation):
   - word_bank / listen_tap answers are space-separated with no
     punctuation; every answer word appears in `bank`.
   - select_translation / dialogue answers are exactly one of the
     listed options (punctuation allowed there).
   ═══════════════════════════════════════════════════════════════ */

// Lesson 2 — café vocabulary.
export const spanishLesson1_2: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'the coffee',
    answer: 'el café',
    options: [
      { emoji: '☕', word: 'el café' },
      { emoji: '💧', word: 'el agua' },
      { emoji: '🍵', word: 'el té' },
      { emoji: '🥛', word: 'la leche' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'the water',
    answer: 'el agua',
    options: [
      { emoji: '💧', word: 'el agua' },
      { emoji: '☕', word: 'el café' },
      { emoji: '🍞', word: 'el pan' },
      { emoji: '🍵', word: 'el té' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'the menu',
    character: 'neutral',
    answer: 'el menú',
    options: ['el menú', 'la cuenta', 'la mesa', 'el café'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'I want a coffee',
    character: 'duo',
    answer: 'Quiero un café',
    bank: ['Quiero', 'un', 'café', 'agua', 'la', 'té'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'coffee', right: 'café' },
      { left: 'water', right: 'agua' },
      { left: 'tea', right: 'té' },
      { left: 'milk', right: 'leche' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'the tea',
    answer: 'el té',
    options: [
      { emoji: '🍵', word: 'el té' },
      { emoji: '☕', word: 'el café' },
      { emoji: '💧', word: 'el agua' },
      { emoji: '🍰', word: 'el pastel' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'Quiero un té',
    bank: ['Quiero', 'un', 'té', 'café', 'agua', 'por'],
  },
  {
    type: 'dialogue',
    lead: '¿Qué quieres?',
    character: 'duo',
    answer: 'Quiero un café',
    options: ['Quiero un café', 'Tengo un café', 'La cuenta', 'Buenos días'],
  },
];

// Lesson 3 — ordering phrases.
export const spanishLesson1_3: Exercise[] = [
  {
    type: 'select_translation',
    prompt: 'A coffee, please',
    character: 'duo',
    answer: 'Un café, por favor',
    options: ['Un café, por favor', 'Un té, por favor', 'Quiero agua', 'La cuenta, por favor'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'I want water',
    character: 'duo',
    answer: 'Quiero agua',
    bank: ['Quiero', 'agua', 'café', 'un', 'por', 'leche'],
  },
  {
    type: 'select_image',
    prompt: 'the bill',
    answer: 'la cuenta',
    options: [
      { emoji: '🧾', word: 'la cuenta' },
      { emoji: '📋', word: 'el menú' },
      { emoji: '🍽️', word: 'la mesa' },
      { emoji: '☕', word: 'el café' },
    ],
  },
  {
    type: 'dialogue',
    lead: 'Buenos días, ¿qué quieres?',
    character: 'neutral',
    answer: 'Quiero un té, por favor',
    options: ['Quiero un té, por favor', 'Tengo una mesa', 'Adiós', 'Soy un café'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'The bill, please',
    character: 'duo',
    answer: 'La cuenta por favor',
    bank: ['La', 'cuenta', 'por', 'favor', 'café', 'agua'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'please', right: 'por favor' },
      { left: 'the bill', right: 'la cuenta' },
      { left: 'water', right: 'agua' },
      { left: 'menu', right: 'menú' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'I want a tea',
    character: 'neutral',
    answer: 'Quiero un té',
    options: ['Quiero un té', 'Quiero un café', 'Tengo un té', 'Quieres un té'],
  },
  {
    type: 'listen_tap',
    answer: 'Un café por favor',
    bank: ['Un', 'café', 'por', 'favor', 'té', 'agua'],
  },
];

// Lesson 4 — at the table (review + quantities).
export const spanishLesson1_4: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'the table',
    answer: 'la mesa',
    options: [
      { emoji: '🍽️', word: 'la mesa' },
      { emoji: '🪑', word: 'la silla' },
      { emoji: '🧾', word: 'la cuenta' },
      { emoji: '☕', word: 'el café' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'the waiter',
    character: 'neutral',
    answer: 'el camarero',
    options: ['el camarero', 'el cocinero', 'el cliente', 'el menú'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'I want bread please',
    character: 'duo',
    answer: 'Quiero pan por favor',
    bank: ['Quiero', 'pan', 'por', 'favor', 'agua', 'café'],
  },
  {
    type: 'dialogue',
    lead: '¿Algo más?',
    character: 'duo',
    answer: 'La cuenta, por favor',
    options: ['La cuenta, por favor', 'Quiero una mesa', 'Buenas noches', 'Soy el camarero'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'table', right: 'mesa' },
      { left: 'waiter', right: 'camarero' },
      { left: 'bread', right: 'pan' },
      { left: 'milk', right: 'leche' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'La mesa por favor',
    bank: ['La', 'mesa', 'por', 'favor', 'cuenta', 'café'],
  },
  {
    type: 'select_translation',
    prompt: 'Two coffees, please',
    character: 'neutral',
    answer: 'Dos cafés, por favor',
    options: ['Dos cafés, por favor', 'Un café, por favor', 'Tres tés, por favor', 'Dos aguas, por favor'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'I want a glass of water',
    character: 'duo',
    answer: 'Quiero un vaso de agua',
    bank: ['Quiero', 'un', 'vaso', 'de', 'agua', 'café', 'la'],
  },
];
