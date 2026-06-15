import type { Exercise } from './types';

/* A basic Unit-1 Spanish lesson: ramps in from an easy picture question
   and ends on an easy one, the way Duolingo paces a beginner lesson. */
export const spanishLesson1: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'apple',
    answer: 'la manzana',
    options: [
      { emoji: '🍎', word: 'la manzana' },
      { emoji: '🐱', word: 'el gato' },
      { emoji: '🐶', word: 'el perro' },
      { emoji: '👦', word: 'el niño' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'woman',
    answer: 'la mujer',
    options: [
      { emoji: '👩', word: 'la mujer' },
      { emoji: '👨', word: 'el hombre' },
      { emoji: '👧', word: 'la niña' },
      { emoji: '👦', word: 'el niño' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'I am a boy',
    character: 'duo',
    answer: 'Yo soy un niño',
    options: ['Yo soy un niño', 'Yo soy una niña', 'Tú eres un niño', 'Él es un niño'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'I am a student',
    character: 'duo',
    answer: 'Yo soy un estudiante',
    bank: ['Yo', 'soy', 'un', 'estudiante', 'eres', 'es'],
  },
  {
    type: 'select_translation',
    prompt: 'Thank you',
    character: 'neutral',
    answer: 'Gracias',
    options: ['Gracias', 'Por favor', 'Hola', 'Adiós'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'hello', right: 'hola' },
      { left: 'goodbye', right: 'adiós' },
      { left: 'please', right: 'por favor' },
      { left: 'thank you', right: 'gracias' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'Yo soy un estudiante',
    bank: ['Yo', 'soy', 'un', 'estudiante', 'eres', 'es'],
  },
  {
    type: 'dialogue',
    character: 'duo',
    lead: 'Buenos días',
    options: ['Buenos días', 'Hasta luego', 'Gracias'],
    answer: 'Buenos días',
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'She is my friend',
    character: 'duo',
    answer: 'Ella es mi amiga',
    bank: ['Ella', 'es', 'mi', 'amiga', 'soy', 'tú'],
  },
  {
    type: 'select_image',
    prompt: 'dog',
    answer: 'el perro',
    options: [
      { emoji: '🐶', word: 'el perro' },
      { emoji: '🐱', word: 'el gato' },
      { emoji: '🍎', word: 'la manzana' },
      { emoji: '👩', word: 'la mujer' },
    ],
  },
];
