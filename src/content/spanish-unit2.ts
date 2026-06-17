import type { Exercise } from './types';

/* ═══════════════════════════════════════════════════════════════
   Section 1, Unit 2 — "Greet people and say goodbye".

   Four fixed greetings/farewells lessons that unlock in sequence.

   Authoring rules that keep grading correct (see checkAnswer in
   types.ts — it lowercases/trims/collapses spaces but does NOT strip
   punctuation):
   - word_bank / listen_tap answers are space-separated with no
     punctuation; every answer word appears in `bank`.
   - select_translation / dialogue answers are exactly one of the
     listed options (punctuation allowed there).
   ═══════════════════════════════════════════════════════════════ */

// Lesson 1 — hello, goodbye, the basics.
export const spanishLesson2_1: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'hello',
    answer: 'hola',
    options: [
      { emoji: '👋', word: 'hola' },
      { emoji: '🚪', word: 'adiós' },
      { emoji: '🌙', word: 'buenas noches' },
      { emoji: '☀️', word: 'buenos días' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'goodbye',
    answer: 'adiós',
    options: [
      { emoji: '🚪', word: 'adiós' },
      { emoji: '👋', word: 'hola' },
      { emoji: '🙏', word: 'gracias' },
      { emoji: '⏰', word: 'hasta luego' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'Hello!',
    character: 'duo',
    answer: 'Hola',
    options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'Goodbye',
    character: 'neutral',
    answer: 'Adiós',
    bank: ['Adiós', 'Hola', 'Gracias', 'Bien'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'See you later',
    character: 'duo',
    answer: 'Hasta luego',
    bank: ['Hasta', 'luego', 'mañana', 'Hola'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'hello', right: 'hola' },
      { left: 'goodbye', right: 'adiós' },
      { left: 'thank you', right: 'gracias' },
      { left: 'please', right: 'por favor' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'Hola adiós',
    bank: ['Hola', 'adiós', 'gracias', 'luego'],
  },
  {
    type: 'dialogue',
    lead: 'Hola, ¿qué tal?',
    character: 'neutral',
    answer: 'Hola',
    options: ['Hola', 'Adiós', 'Por favor', 'Hasta mañana'],
  },
];

// Lesson 2 — time-of-day greetings.
export const spanishLesson2_2: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'good morning',
    answer: 'buenos días',
    options: [
      { emoji: '☀️', word: 'buenos días' },
      { emoji: '🌆', word: 'buenas tardes' },
      { emoji: '🌙', word: 'buenas noches' },
      { emoji: '👋', word: 'hola' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'good night',
    answer: 'buenas noches',
    options: [
      { emoji: '🌙', word: 'buenas noches' },
      { emoji: '☀️', word: 'buenos días' },
      { emoji: '🌆', word: 'buenas tardes' },
      { emoji: '🚪', word: 'adiós' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'Good afternoon',
    character: 'duo',
    answer: 'Buenas tardes',
    options: ['Buenas tardes', 'Buenos días', 'Buenas noches', 'Hasta luego'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'Good morning',
    character: 'duo',
    answer: 'Buenos días',
    bank: ['Buenos', 'días', 'noches', 'tardes'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'Good night',
    character: 'neutral',
    answer: 'Buenas noches',
    bank: ['Buenas', 'noches', 'días', 'Hola'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'good morning', right: 'buenos días' },
      { left: 'good afternoon', right: 'buenas tardes' },
      { left: 'good night', right: 'buenas noches' },
      { left: 'see you tomorrow', right: 'hasta mañana' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'Buenas tardes',
    bank: ['Buenas', 'tardes', 'noches', 'días'],
  },
  {
    type: 'dialogue',
    lead: 'Buenos días, ¿cómo estás?',
    character: 'neutral',
    answer: 'Buenos días',
    options: ['Buenos días', 'Buenas noches', 'Adiós', 'Por favor'],
  },
];

// Lesson 3 — how are you? / feelings.
export const spanishLesson2_3: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'good / well',
    answer: 'bien',
    options: [
      { emoji: '😀', word: 'bien' },
      { emoji: '😟', word: 'mal' },
      { emoji: '🙏', word: 'gracias' },
      { emoji: '👋', word: 'hola' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'bad / unwell',
    answer: 'mal',
    options: [
      { emoji: '😟', word: 'mal' },
      { emoji: '😀', word: 'bien' },
      { emoji: '🤩', word: 'muy bien' },
      { emoji: '🌙', word: 'buenas noches' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'How are you?',
    character: 'duo',
    answer: '¿Cómo estás?',
    options: ['¿Cómo estás?', '¿Qué tal?', 'Muy bien', 'De nada'],
  },
  {
    type: 'select_translation',
    prompt: "What's up? / How's it going?",
    character: 'neutral',
    answer: '¿Qué tal?',
    options: ['¿Qué tal?', '¿Cómo estás?', 'Hasta luego', 'Mucho gusto'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'Very well, thank you',
    character: 'duo',
    answer: 'Muy bien gracias',
    bank: ['Muy', 'bien', 'gracias', 'mal', 'nada'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'well', right: 'bien' },
      { left: 'very well', right: 'muy bien' },
      { left: 'bad', right: 'mal' },
      { left: "you're welcome", right: 'de nada' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'Muy bien',
    bank: ['Muy', 'bien', 'mal', 'gracias'],
  },
  {
    type: 'dialogue',
    lead: 'Hola, ¿qué tal?',
    character: 'neutral',
    answer: 'Muy bien, gracias',
    options: ['Muy bien, gracias', 'Adiós', 'Me llamo Ana', 'Por favor'],
  },
];

// Lesson 4 — names and introductions.
export const spanishLesson2_4: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'thank you',
    answer: 'gracias',
    options: [
      { emoji: '🙏', word: 'gracias' },
      { emoji: '🤝', word: 'de nada' },
      { emoji: '🙇', word: 'por favor' },
      { emoji: '😊', word: 'mucho gusto' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'nice to meet you',
    answer: 'mucho gusto',
    options: [
      { emoji: '😊', word: 'mucho gusto' },
      { emoji: '🙏', word: 'gracias' },
      { emoji: '🤝', word: 'de nada' },
      { emoji: '🙇', word: 'por favor' },
    ],
  },
  {
    type: 'select_translation',
    prompt: "What's your name?",
    character: 'duo',
    answer: '¿Cómo te llamas?',
    options: ['¿Cómo te llamas?', 'Me llamo Ana', 'Mucho gusto', 'Encantado'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'My name is Ana',
    character: 'neutral',
    answer: 'Me llamo Ana',
    bank: ['Me', 'llamo', 'Ana', 'gusto', 'tal'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'Nice to meet you',
    character: 'duo',
    answer: 'Mucho gusto',
    bank: ['Mucho', 'gusto', 'gracias', 'nada'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'nice to meet you', right: 'mucho gusto' },
      { left: 'my name is', right: 'me llamo' },
      { left: 'pleased to meet you', right: 'encantado' },
      { left: 'see you tomorrow', right: 'hasta mañana' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'Me llamo Ana',
    bank: ['Me', 'llamo', 'Ana', 'gusto'],
  },
  {
    type: 'dialogue',
    lead: '¿Cómo te llamas?',
    character: 'neutral',
    answer: 'Me llamo Ana',
    options: ['Me llamo Ana', 'Mucho gusto', 'Hasta luego', 'De nada'],
  },
];
