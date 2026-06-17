import type { Exercise } from './types';

/* Section 1, Unit 3 — "Say where you're from". */

export const spanishLesson3_1: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'Spain',
    answer: 'España',
    options: [
      { emoji: '🇪🇸', word: 'España' },
      { emoji: '🇲🇽', word: 'México' },
      { emoji: '🇺🇸', word: 'Estados Unidos' },
      { emoji: '🇦🇷', word: 'Argentina' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'Mexico',
    answer: 'México',
    options: [
      { emoji: '🇲🇽', word: 'México' },
      { emoji: '🇪🇸', word: 'España' },
      { emoji: '🇦🇷', word: 'Argentina' },
      { emoji: '🏙️', word: 'la ciudad' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'Where are you from?',
    character: 'duo',
    answer: '¿De dónde eres?',
    options: ['¿De dónde eres?', '¿Dónde vives?', 'Soy de España', '¿Cómo estás?'],
  },
  {
    type: 'select_translation',
    prompt: 'I am from Spain.',
    character: 'neutral',
    answer: 'Soy de España',
    options: ['Soy de España', 'Eres de México', 'Vivo aquí', 'Es de Argentina'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'I am from Spain',
    character: 'duo',
    answer: 'Soy de España',
    bank: ['Soy', 'de', 'España', 'México', 'eres'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'Where are you from?',
    character: 'neutral',
    answer: 'De dónde eres',
    bank: ['De', 'dónde', 'eres', 'vives', 'soy'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'Spain', right: 'España' },
      { left: 'Mexico', right: 'México' },
      { left: 'I am', right: 'soy' },
      { left: 'from', right: 'de' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'Soy de México',
    bank: ['Soy', 'de', 'México', 'España', 'eres'],
  },
];

export const spanishLesson3_2: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'The United States',
    answer: 'Estados Unidos',
    options: [
      { emoji: '🇺🇸', word: 'Estados Unidos' },
      { emoji: '🇦🇷', word: 'Argentina' },
      { emoji: '🇪🇸', word: 'España' },
      { emoji: '🇲🇽', word: 'México' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'Argentina',
    answer: 'Argentina',
    options: [
      { emoji: '🇦🇷', word: 'Argentina' },
      { emoji: '🇺🇸', word: 'Estados Unidos' },
      { emoji: '🇲🇽', word: 'México' },
      { emoji: '🇪🇸', word: 'España' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'You are from Mexico.',
    character: 'neutral',
    answer: 'Eres de México',
    options: ['Eres de México', 'Soy de España', 'Es de Argentina', 'Vivo en México'],
  },
  {
    type: 'select_translation',
    prompt: 'She is from Argentina.',
    character: 'duo',
    answer: 'Es de Argentina',
    options: ['Es de Argentina', 'Eres de México', 'Soy de Estados Unidos', '¿De dónde eres?'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'You are from the United States',
    character: 'duo',
    answer: 'Eres de Estados Unidos',
    bank: ['Eres', 'de', 'Estados', 'Unidos', 'soy', 'España'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'the United States', right: 'Estados Unidos' },
      { left: 'Argentina', right: 'Argentina' },
      { left: 'you are', right: 'eres' },
      { left: 'he is', right: 'es' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'Es de Argentina',
    bank: ['Es', 'de', 'Argentina', 'España', 'eres'],
  },
  {
    type: 'dialogue',
    lead: '¿De dónde eres?',
    character: 'neutral',
    answer: 'Soy de Estados Unidos',
    options: ['Soy de Estados Unidos', 'Vivo aquí', 'Adiós', 'Gracias'],
  },
];

export const spanishLesson3_3: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'The city',
    answer: 'la ciudad',
    options: [
      { emoji: '🏙️', word: 'la ciudad' },
      { emoji: '🌍', word: 'el país' },
      { emoji: '🇪🇸', word: 'España' },
      { emoji: '🏛️', word: 'la capital' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'The country',
    answer: 'el país',
    options: [
      { emoji: '🌍', word: 'el país' },
      { emoji: '🏙️', word: 'la ciudad' },
      { emoji: '🏛️', word: 'la capital' },
      { emoji: '🇲🇽', word: 'México' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'Where do you live?',
    character: 'duo',
    answer: '¿Dónde vives?',
    options: ['¿Dónde vives?', '¿De dónde eres?', 'Vivo en México', 'Soy de España'],
  },
  {
    type: 'select_translation',
    prompt: 'I live in Mexico.',
    character: 'neutral',
    answer: 'Vivo en México',
    options: ['Vivo en México', 'Vives en España', 'Soy de Argentina', 'Vive en la ciudad'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'I live in the city',
    character: 'duo',
    answer: 'Vivo en la ciudad',
    bank: ['Vivo', 'en', 'la', 'ciudad', 'país', 'vives'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'the city', right: 'la ciudad' },
      { left: 'the country', right: 'el país' },
      { left: 'the capital', right: 'la capital' },
      { left: 'I live', right: 'vivo' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'Vivo en España',
    bank: ['Vivo', 'en', 'España', 'México', 'vives'],
  },
  {
    type: 'dialogue',
    lead: '¿Dónde vives?',
    character: 'neutral',
    answer: 'Vivo en la ciudad',
    options: ['Vivo en la ciudad', 'Soy de España', 'Gracias', 'Hasta luego'],
  },
];

export const spanishLesson3_4: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'Here',
    answer: 'aquí',
    options: [
      { emoji: '📍', word: 'aquí' },
      { emoji: '🏞️', word: 'allí' },
      { emoji: '🏙️', word: 'la ciudad' },
      { emoji: '🌍', word: 'el país' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'The capital',
    answer: 'la capital',
    options: [
      { emoji: '🏛️', word: 'la capital' },
      { emoji: '🏙️', word: 'la ciudad' },
      { emoji: '🌍', word: 'el país' },
      { emoji: '📍', word: 'aquí' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'I am Spanish.',
    character: 'duo',
    answer: 'Soy español',
    options: ['Soy español', 'Soy mexicana', 'Vivo allí', 'Es americano'],
  },
  {
    type: 'select_translation',
    prompt: 'He lives there.',
    character: 'neutral',
    answer: 'Vive allí',
    options: ['Vive allí', 'Vivo aquí', 'Vives en México', 'Soy de España'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'I live here',
    character: 'duo',
    answer: 'Vivo aquí',
    bank: ['Vivo', 'aquí', 'allí', 'en', 'vives'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'The capital is big',
    character: 'neutral',
    answer: 'La capital es grande',
    bank: ['La', 'capital', 'es', 'grande', 'pequeño', 'ciudad'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'here', right: 'aquí' },
      { left: 'there', right: 'allí' },
      { left: 'big', right: 'grande' },
      { left: 'small', right: 'pequeño' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'La ciudad es pequeña',
    bank: ['La', 'ciudad', 'es', 'pequeña', 'grande', 'país'],
  },
];
