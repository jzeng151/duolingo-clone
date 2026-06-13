import type { Exercise } from './types';

export const spanishLesson1: Exercise[] = [
  {
    type: 'translate',
    prompt: 'The cat',
    answer: 'el gato',
  },
  {
    type: 'translate',
    prompt: 'The dog',
    answer: 'el perro',
  },
  {
    type: 'fill',
    template: 'Yo ___ un estudiante.',
    answer: 'soy',
    options: ['soy', 'es', 'eres', 'somos'],
  },
  {
    type: 'fill',
    template: 'Ella ___ mi amiga.',
    answer: 'es',
    options: ['soy', 'es', 'eres', 'somos'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'hello', right: 'hola' },
      { left: 'goodbye', right: 'adiós' },
      { left: 'please', right: 'por favor' },
    ],
  },
  {
    type: 'translate',
    prompt: 'Thank you',
    answer: 'gracias',
  },
];
