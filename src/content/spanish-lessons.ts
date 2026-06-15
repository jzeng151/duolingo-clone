import type { Exercise } from './types';
import type { LearningReason } from '../lib/onboarding';
import { spanishLesson1 } from './spanish-lesson-1';

/* ═══════════════════════════════════════════════════════════════
   Reason-themed Spanish lessons.

   Real Duolingo uses the "why are you learning?" answer only to
   personalize messaging. We go one step further (a deliberate
   extension, not a Duolingo feature): the chosen reason swaps in a
   themed first lesson so the vocabulary matches the learner's goal.

   Reasons without a dedicated theme (fun / productivity / other)
   fall back to the general base lesson.
   ═══════════════════════════════════════════════════════════════ */

const travelLesson: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'the ticket',
    answer: 'el billete',
    options: [
      { emoji: '🎫', word: 'el billete' },
      { emoji: '🏨', word: 'el hotel' },
      { emoji: '✈️', word: 'el avión' },
      { emoji: '🧳', word: 'la maleta' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'the suitcase',
    answer: 'la maleta',
    options: [
      { emoji: '🧳', word: 'la maleta' },
      { emoji: '🛂', word: 'el pasaporte' },
      { emoji: '🏨', word: 'el hotel' },
      { emoji: '🎫', word: 'el billete' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'Where is the hotel?',
    character: 'duo',
    answer: '¿Dónde está el hotel?',
    options: ['¿Dónde está el hotel?', '¿Dónde está el baño?', '¿Cómo estás?', '¿Qué hora es?'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'I need a ticket',
    character: 'duo',
    answer: 'Necesito un billete',
    bank: ['Necesito', 'un', 'billete', 'hotel', 'tengo', 'el'],
  },
  {
    type: 'select_translation',
    prompt: 'the airport',
    character: 'neutral',
    answer: 'el aeropuerto',
    options: ['el aeropuerto', 'el avión', 'la playa', 'el tren'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'ticket', right: 'billete' },
      { left: 'hotel', right: 'hotel' },
      { left: 'passport', right: 'pasaporte' },
      { left: 'beach', right: 'playa' },
    ],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'The beach is beautiful',
    character: 'duo',
    answer: 'La playa es bonita',
    bank: ['La', 'playa', 'es', 'bonita', 'el', 'mar'],
  },
];

const careerLesson: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'the office',
    answer: 'la oficina',
    options: [
      { emoji: '🏢', word: 'la oficina' },
      { emoji: '📧', word: 'el correo' },
      { emoji: '👥', word: 'la reunión' },
      { emoji: '👔', word: 'el jefe' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'the email',
    answer: 'el correo',
    options: [
      { emoji: '📧', word: 'el correo' },
      { emoji: '🏢', word: 'la oficina' },
      { emoji: '👥', word: 'la reunión' },
      { emoji: '💼', word: 'el trabajo' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'I have a meeting',
    character: 'duo',
    answer: 'Tengo una reunión',
    options: ['Tengo una reunión', 'Tengo un correo', 'Soy el jefe', 'Voy a la oficina'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'I work in an office',
    character: 'duo',
    answer: 'Trabajo en una oficina',
    bank: ['Trabajo', 'en', 'una', 'oficina', 'casa', 'soy'],
  },
  {
    type: 'select_translation',
    prompt: 'the boss',
    character: 'neutral',
    answer: 'el jefe',
    options: ['el jefe', 'el correo', 'la reunión', 'la empresa'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'meeting', right: 'reunión' },
      { left: 'email', right: 'correo' },
      { left: 'office', right: 'oficina' },
      { left: 'boss', right: 'jefe' },
    ],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'She is my boss',
    character: 'duo',
    answer: 'Ella es mi jefa',
    bank: ['Ella', 'es', 'mi', 'jefa', 'amigo', 'soy'],
  },
];

const educationLesson: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'the book',
    answer: 'el libro',
    options: [
      { emoji: '📖', word: 'el libro' },
      { emoji: '✏️', word: 'el lápiz' },
      { emoji: '🎒', word: 'la mochila' },
      { emoji: '📝', word: 'el examen' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'the exam',
    answer: 'el examen',
    options: [
      { emoji: '📝', word: 'el examen' },
      { emoji: '📖', word: 'el libro' },
      { emoji: '🎒', word: 'la mochila' },
      { emoji: '✏️', word: 'el lápiz' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'I am a student',
    character: 'duo',
    answer: 'Yo soy un estudiante',
    options: ['Yo soy un estudiante', 'Yo soy un profesor', 'Tú eres un estudiante', 'Él es un niño'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'I have homework',
    character: 'duo',
    answer: 'Tengo tarea',
    bank: ['Tengo', 'tarea', 'un', 'libro', 'soy', 'examen'],
  },
  {
    type: 'select_translation',
    prompt: 'the teacher',
    character: 'neutral',
    answer: 'el profesor',
    options: ['el profesor', 'el estudiante', 'el libro', 'la escuela'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'book', right: 'libro' },
      { left: 'teacher', right: 'profesor' },
      { left: 'exam', right: 'examen' },
      { left: 'homework', right: 'tarea' },
    ],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'The school is big',
    character: 'duo',
    answer: 'La escuela es grande',
    bank: ['La', 'escuela', 'es', 'grande', 'libro', 'el'],
  },
];

const peopleLesson: Exercise[] = [
  {
    type: 'select_image',
    prompt: 'the friend',
    answer: 'el amigo',
    options: [
      { emoji: '🧑‍🤝‍🧑', word: 'el amigo' },
      { emoji: '👨‍👩‍👧', word: 'la familia' },
      { emoji: '👩', word: 'la mujer' },
      { emoji: '👨', word: 'el hombre' },
    ],
  },
  {
    type: 'select_image',
    prompt: 'the family',
    answer: 'la familia',
    options: [
      { emoji: '👨‍👩‍👧', word: 'la familia' },
      { emoji: '🧑‍🤝‍🧑', word: 'el amigo' },
      { emoji: '👩', word: 'la madre' },
      { emoji: '👶', word: 'el bebé' },
    ],
  },
  {
    type: 'select_translation',
    prompt: 'She is my friend',
    character: 'duo',
    answer: 'Ella es mi amiga',
    options: ['Ella es mi amiga', 'Él es mi amigo', 'Ella es mi madre', 'Yo soy tu amigo'],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'I love my family',
    character: 'duo',
    answer: 'Amo a mi familia',
    bank: ['Amo', 'a', 'mi', 'familia', 'amigo', 'es'],
  },
  {
    type: 'select_translation',
    prompt: 'Nice to meet you',
    character: 'neutral',
    answer: 'Mucho gusto',
    options: ['Mucho gusto', 'Buenos días', 'Hasta luego', 'Por favor'],
  },
  {
    type: 'match',
    pairs: [
      { left: 'friend', right: 'amigo' },
      { left: 'family', right: 'familia' },
      { left: 'mother', right: 'madre' },
      { left: 'brother', right: 'hermano' },
    ],
  },
  {
    type: 'word_bank',
    instruction: 'Write this in Spanish',
    prompt: 'We are friends',
    character: 'duo',
    answer: 'Somos amigos',
    bank: ['Somos', 'amigos', 'es', 'mi', 'familia', 'soy'],
  },
];

const themedLessons: Partial<Record<LearningReason, Exercise[]>> = {
  travel: travelLesson,
  career: careerLesson,
  education: educationLesson,
  people: peopleLesson,
};

/** The first Spanish lesson, themed to the learner's reason for learning. */
export function getSpanishLesson(reason: LearningReason): Exercise[] {
  return themedLessons[reason] ?? spanishLesson1;
}
