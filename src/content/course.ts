/* ═══════════════════════════════════════════════════════════════
   Course manifest — the skill-tree / course map structure.

   Duolingo organizes a course as Section → Unit → lessons. We model
   the slice that's actually playable today: Section 1, Unit 1 with
   four lessons. Lessons unlock strictly in order — finishing one
   reveals the next — which the map renders as complete / active /
   locked nodes.

   To add content later, drop new lessons into a unit (and register
   their exercises in spanish-lessons.ts). The map and unlock logic
   pick them up automatically.
   ═══════════════════════════════════════════════════════════════ */

/** Glyph shown inside a path node. Mirrors Duolingo's lesson/chest/trophy icons. */
export type NodeIcon = 'star' | 'book' | 'dumbbell' | 'chest' | 'trophy';

export type CourseLesson = {
  /** Matches lesson_completions.lesson_id and the lesson registry in spanish-lessons.ts. */
  id: string;
  icon: NodeIcon;
};

export type CourseUnit = {
  /** Banner eyebrow, e.g. "Section 1, Unit 1". */
  label: string;
  /** Banner title, e.g. "Order at a café". */
  title: string;
  lessons: CourseLesson[];
};

/** The units a learner can actually play right now. */
export const UNITS: CourseUnit[] = [
  {
    label: 'Section 1, Unit 1',
    title: 'Order at a café',
    lessons: [
      { id: 'spanish-lesson-1', icon: 'star' },
      { id: 'spanish-1-2', icon: 'book' },
      { id: 'spanish-1-3', icon: 'dumbbell' },
      { id: 'spanish-1-4', icon: 'chest' },
    ],
  },
  {
    label: 'Section 1, Unit 2',
    title: 'Greet people and say goodbye',
    lessons: [
      { id: 'spanish-2-1', icon: 'star' },
      { id: 'spanish-2-2', icon: 'book' },
      { id: 'spanish-2-3', icon: 'dumbbell' },
      { id: 'spanish-2-4', icon: 'chest' },
    ],
  },
  {
    label: 'Section 1, Unit 3',
    title: "Say where you're from",
    lessons: [
      { id: 'spanish-3-1', icon: 'star' },
      { id: 'spanish-3-2', icon: 'book' },
      { id: 'spanish-3-3', icon: 'dumbbell' },
      { id: 'spanish-3-4', icon: 'chest' },
    ],
  },
  {
    label: 'Section 1, Unit 4',
    title: 'Introduce family and friends',
    lessons: [
      { id: 'spanish-4-1', icon: 'star' },
      { id: 'spanish-4-2', icon: 'book' },
      { id: 'spanish-4-3', icon: 'dumbbell' },
      { id: 'spanish-4-4', icon: 'chest' },
    ],
  },
  {
    label: 'Section 1, Unit 5',
    title: 'Get around town',
    lessons: [
      { id: 'spanish-5-1', icon: 'star' },
      { id: 'spanish-5-2', icon: 'book' },
      { id: 'spanish-5-3', icon: 'dumbbell' },
      { id: 'spanish-5-4', icon: 'trophy' },
    ],
  },
];

/** All lesson ids in path order — the spine of the unlock logic. */
export const ALL_LESSON_IDS: string[] = UNITS.flatMap((u) => u.lessons.map((l) => l.id));

export function isKnownLessonId(id: string): boolean {
  return ALL_LESSON_IDS.includes(id);
}

export type NodeState = 'complete' | 'active' | 'locked';

/**
 * Compute each lesson's node state from the set of completed lesson ids.
 * Everything completed is `complete`; the first not-yet-completed lesson in
 * path order is `active`; all later lessons are `locked`. When every lesson is
 * complete there is no active node (the unit is finished).
 */
export function computeStates(completed: Set<string>): Record<string, NodeState> {
  const states: Record<string, NodeState> = {};
  let activeAssigned = false;
  for (const id of ALL_LESSON_IDS) {
    if (completed.has(id)) {
      states[id] = 'complete';
    } else if (!activeAssigned) {
      states[id] = 'active';
      activeAssigned = true;
    } else {
      states[id] = 'locked';
    }
  }
  return states;
}
