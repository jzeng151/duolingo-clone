import type { Exercise } from './types';

/* Section 1, Unit 4 — "Introduce family and friends". */

export const spanishLesson4_1: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'the mother',
    answer: 'la madre',
    options: [
      { emoji: '👩', word: 'la madre' },
      { emoji: '👨', word: 'el padre' },
      { emoji: '👧', word: 'la hija' },
      { emoji: '👶', word: 'el bebé' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'the father',
    answer: 'el padre',
    options: [
      { emoji: '👨', word: 'el padre' },
      { emoji: '👩', word: 'la madre' },
      { emoji: '👦', word: 'el hijo' },
      { emoji: '👵', word: 'la abuela' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'This is my mother',
    character: 'duo',
    answer: 'Esta es mi madre',
    options: ['Esta es mi madre', 'Este es mi padre', 'Tengo un hijo', '¿Quién es?'],
  },
  {
    type: 'select_translation',
    prompt: 'This is my father',
    character: 'neutral',
    answer: 'Este es mi padre',
    options: ['Este es mi padre', 'Esta es mi madre', 'Es mi amiga', 'Se llama Ana'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'She is my mother',
    character: 'duo',
    answer: 'Ella es mi madre',
    bank: ['Ella', 'es', 'mi', 'madre', 'padre', 'soy'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'mother', right: 'la madre' },
      { left: 'father', right: 'el padre' },
      { left: 'son', right: 'el hijo' },
      { left: 'daughter', right: 'la hija' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'Este es mi padre',
    bank: ['Este', 'es', 'mi', 'padre', 'madre', 'Esta'],
  },
  {
    type: 'dialogue',
    lead: '¿Quién es?',
    character: 'neutral',
    answer: 'Es mi madre',
    options: ['Es mi madre', 'Soy de España', 'Adiós', 'Gracias'],
  },
];

export const spanishLesson4_2: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'the brother',
    answer: 'el hermano',
    options: [
      { emoji: '👦', word: 'el hermano' },
      { emoji: '👧', word: 'la hermana' },
      { emoji: '👨', word: 'el padre' },
      { emoji: '👩', word: 'la madre' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'the sister',
    answer: 'la hermana',
    options: [
      { emoji: '👧', word: 'la hermana' },
      { emoji: '👦', word: 'el hermano' },
      { emoji: '👶', word: 'el bebé' },
      { emoji: '👵', word: 'la abuela' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'I have a brother',
    character: 'duo',
    answer: 'Tengo un hermano',
    options: ['Tengo un hermano', 'Tengo una hermana', 'Es mi amigo', 'Esta es mi hija'],
  },
  {
    type: 'select_translation',
    prompt: 'This is my sister',
    character: 'neutral',
    answer: 'Esta es mi hermana',
    options: ['Esta es mi hermana', 'Este es mi hermano', 'Tengo un bebé', '¿Quién es?'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'I have a sister',
    character: 'duo',
    answer: 'Tengo una hermana',
    bank: ['Tengo', 'una', 'hermana', 'hermano', 'un', 'mi'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'brother', right: 'el hermano' },
      { left: 'sister', right: 'la hermana' },
      { left: 'baby', right: 'el bebé' },
      { left: 'family', right: 'la familia' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'Tengo un hermano',
    bank: ['Tengo', 'un', 'hermano', 'hermana', 'una'],
  },
  {
    type: 'dialogue',
    lead: '¿Quién es?',
    character: 'neutral',
    answer: 'Es mi hermana',
    options: ['Es mi hermana', 'Soy estudiante', 'Buenos días', 'Tengo un gato'],
  },
];

export const spanishLesson4_3: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'the grandmother',
    answer: 'la abuela',
    options: [
      { emoji: '👵', word: 'la abuela' },
      { emoji: '👴', word: 'el abuelo' },
      { emoji: '👩', word: 'la madre' },
      { emoji: '👶', word: 'el bebé' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'the grandfather',
    answer: 'el abuelo',
    options: [
      { emoji: '👴', word: 'el abuelo' },
      { emoji: '👵', word: 'la abuela' },
      { emoji: '👨', word: 'el padre' },
      { emoji: '👦', word: 'el hermano' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'This is my grandmother',
    character: 'duo',
    answer: 'Esta es mi abuela',
    options: ['Esta es mi abuela', 'Este es mi abuelo', 'Tengo una hija', 'Se llama Luis'],
  },
  {
    type: 'select_translation',
    prompt: 'He is my grandfather',
    character: 'neutral',
    answer: 'Él es mi abuelo',
    options: ['Él es mi abuelo', 'Ella es mi abuela', 'Es mi amigo', '¿Quién es?'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'This is my grandfather',
    character: 'duo',
    answer: 'Este es mi abuelo',
    bank: ['Este', 'es', 'mi', 'abuelo', 'abuela', 'Esta'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'grandmother', right: 'la abuela' },
      { left: 'grandfather', right: 'el abuelo' },
      { left: 'mom', right: 'la mamá' },
      { left: 'dad', right: 'el papá' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'Esta es mi abuela',
    bank: ['Esta', 'es', 'mi', 'abuela', 'abuelo', 'Este'],
  },
  {
    type: 'dialogue',
    lead: '¿Quién es?',
    character: 'neutral',
    answer: 'Es mi abuelo',
    options: ['Es mi abuelo', 'Hasta luego', 'Soy de México', 'Gracias'],
  },
];

export const spanishLesson4_4: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'the friend (male)',
    answer: 'el amigo',
    options: [
      { emoji: '🧑‍🤝‍🧑', word: 'el amigo' },
      { emoji: '👨‍👩‍👧', word: 'la familia' },
      { emoji: '👶', word: 'el bebé' },
      { emoji: '👴', word: 'el abuelo' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'the family',
    answer: 'la familia',
    options: [
      { emoji: '👨‍👩‍👧', word: 'la familia' },
      { emoji: '👩', word: 'la madre' },
      { emoji: '👦', word: 'el hermano' },
      { emoji: '👵', word: 'la abuela' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'She is my friend',
    character: 'duo',
    answer: 'Ella es mi amiga',
    options: ['Ella es mi amiga', 'Él es mi amigo', 'Es mi hermana', 'Se llama Ana'],
  },
  {
    type: 'select_translation',
    prompt: 'Her name is Ana',
    character: 'neutral',
    answer: 'Se llama Ana',
    options: ['Se llama Ana', 'Es mi familia', 'Tengo un amigo', '¿Quién es?'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'He is my friend',
    character: 'duo',
    answer: 'Él es mi amigo',
    bank: ['Él', 'es', 'mi', 'amigo', 'amiga', 'Ella'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'friend (m)', right: 'el amigo' },
      { left: 'friend (f)', right: 'la amiga' },
      { left: 'family', right: 'la familia' },
      { left: 'son', right: 'el hijo' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'Esta es mi familia',
    bank: ['Esta', 'es', 'mi', 'familia', 'amiga', 'Este'],
  },
  {
    type: 'dialogue',
    lead: '¿Quién es?',
    character: 'neutral',
    answer: 'Es mi amiga',
    options: ['Es mi amiga', 'Tengo sed', 'Buenas noches', 'Soy profesor'],
  },
];
