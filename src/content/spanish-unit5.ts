import type { Exercise } from './types';

/* Section 1, Unit 5 — "Get around town". */

export const spanishLesson5_1: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'the bank',
    answer: 'el banco',
    options: [
      { emoji: '🏦', word: 'el banco' },
      { emoji: '🏪', word: 'la tienda' },
      { emoji: '🍽️', word: 'el restaurante' },
      { emoji: '🚉', word: 'la estación' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'the store',
    answer: 'la tienda',
    options: [
      { emoji: '🏪', word: 'la tienda' },
      { emoji: '🏨', word: 'el hotel' },
      { emoji: '🌳', word: 'el parque' },
      { emoji: '🏦', word: 'el banco' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'Where is the bank?',
    character: 'duo',
    answer: '¿Dónde está el banco?',
    options: ['¿Dónde está el banco?', 'Está a la derecha', 'Voy a la tienda', '¿Cómo estás?'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'Where is the store?',
    character: 'duo',
    answer: 'Dónde está la tienda',
    bank: ['Dónde', 'está', 'la', 'tienda', 'el', 'banco'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'street', right: 'la calle' },
      { left: 'store', right: 'la tienda' },
      { left: 'bank', right: 'el banco' },
      { left: 'restaurant', right: 'el restaurante' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'El banco está aquí',
    bank: ['El', 'banco', 'está', 'aquí', 'la', 'tienda'],
  },
  {
    type: 'select_translation',
    prompt: 'It is here',
    answer: 'Está aquí',
    options: ['Está aquí', 'Está lejos', 'Voy al banco', 'Adiós'],
  },
  {
    type: 'dialogue',
    lead: '¿Dónde está la tienda?',
    character: 'neutral',
    answer: 'Está aquí',
    options: ['Está aquí', 'Soy de México', 'Gracias', 'Hola'],
  },
];

export const spanishLesson5_2: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'the station',
    answer: 'la estación',
    options: [
      { emoji: '🚉', word: 'la estación' },
      { emoji: '🏨', word: 'el hotel' },
      { emoji: '🌳', word: 'el parque' },
      { emoji: '🍽️', word: 'el restaurante' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'the hotel',
    answer: 'el hotel',
    options: [
      { emoji: '🏨', word: 'el hotel' },
      { emoji: '🏦', word: 'el banco' },
      { emoji: '🏪', word: 'la tienda' },
      { emoji: '🚉', word: 'la estación' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'Where is the station?',
    character: 'duo',
    answer: '¿Dónde está la estación?',
    options: ['¿Dónde está la estación?', 'Está a la izquierda', 'Voy al hotel', 'Buenos días'],
  },
  {
    type: 'select_translation',
    prompt: 'It is to the right',
    answer: 'Está a la derecha',
    options: ['Está a la derecha', 'Está a la izquierda', 'Todo recto', 'Está aquí'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'The hotel is to the left',
    character: 'neutral',
    answer: 'El hotel está a la izquierda',
    bank: ['El', 'hotel', 'está', 'a', 'la', 'izquierda', 'derecha'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'station', right: 'la estación' },
      { left: 'hotel', right: 'el hotel' },
      { left: 'to the right', right: 'a la derecha' },
      { left: 'to the left', right: 'a la izquierda' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'La estación está a la derecha',
    bank: ['La', 'estación', 'está', 'a', 'la', 'derecha', 'izquierda'],
  },
  {
    type: 'dialogue',
    lead: '¿Dónde está el hotel?',
    character: 'neutral',
    answer: 'Está a la izquierda',
    options: ['Está a la izquierda', 'Soy estudiante', 'Tengo hambre', 'Hasta luego'],
  },
];

export const spanishLesson5_3: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'the park',
    answer: 'el parque',
    options: [
      { emoji: '🌳', word: 'el parque' },
      { emoji: '🏬', word: 'el mercado' },
      { emoji: '🏨', word: 'el hotel' },
      { emoji: '🚉', word: 'la estación' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'the market',
    answer: 'el mercado',
    options: [
      { emoji: '🏬', word: 'el mercado' },
      { emoji: '🌳', word: 'el parque' },
      { emoji: '🏦', word: 'el banco' },
      { emoji: '🍽️', word: 'el restaurante' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'I am going to the park',
    character: 'duo',
    answer: 'Voy al parque',
    options: ['Voy al parque', 'Voy al mercado', 'Está cerca', 'Está lejos'],
  },
  {
    type: 'select_translation',
    prompt: 'It is far',
    answer: 'Está lejos',
    options: ['Está lejos', 'Está cerca', 'Todo recto', 'A la derecha'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'I am going to the market',
    character: 'duo',
    answer: 'Voy al mercado',
    bank: ['Voy', 'al', 'mercado', 'parque', 'la'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'park', right: 'el parque' },
      { left: 'market', right: 'el mercado' },
      { left: 'near', right: 'cerca' },
      { left: 'far', right: 'lejos' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'El mercado está cerca',
    bank: ['El', 'mercado', 'está', 'cerca', 'lejos', 'parque'],
  },
  {
    type: 'dialogue',
    lead: '¿Está lejos el parque?',
    character: 'neutral',
    answer: 'No, está cerca',
    options: ['No, está cerca', 'Me llamo Ana', 'Es rojo', 'Buenas noches'],
  },
];

export const spanishLesson5_4: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'the bus',
    answer: 'el autobús',
    options: [
      { emoji: '🚌', word: 'el autobús' },
      { emoji: '🚆', word: 'el tren' },
      { emoji: '🚗', word: 'el coche' },
      { emoji: '🚉', word: 'la estación' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'the train',
    answer: 'el tren',
    options: [
      { emoji: '🚆', word: 'el tren' },
      { emoji: '🚗', word: 'el coche' },
      { emoji: '🚌', word: 'el autobús' },
      { emoji: '🌳', word: 'el parque' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'How do I get to the station?',
    character: 'duo',
    answer: '¿Cómo llego a la estación?',
    options: ['¿Cómo llego a la estación?', 'Voy en autobús', 'Todo recto', '¿Dónde está el tren?'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'Go straight ahead',
    character: 'neutral',
    answer: 'Todo recto',
    bank: ['Todo', 'recto', 'cerca', 'lejos'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'I am going by train',
    character: 'duo',
    answer: 'Voy en tren',
    bank: ['Voy', 'en', 'tren', 'autobús', 'coche'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'bus', right: 'el autobús' },
      { left: 'train', right: 'el tren' },
      { left: 'car', right: 'el coche' },
      { left: 'straight ahead', right: 'todo recto' },
    ],
  },
  {
    type: 'listen_tap',
    answer: 'Voy a la estación en tren',
    bank: ['Voy', 'a', 'la', 'estación', 'en', 'tren', 'autobús'],
  },
  {
    type: 'dialogue',
    lead: '¿Cómo llego al parque?',
    character: 'neutral',
    answer: 'Todo recto y a la derecha',
    options: ['Todo recto y a la derecha', 'Tengo un perro', 'Soy de Perú', 'Me gusta el café'],
  },
];
