/* ═══════════════════════════════════════════════════════════════
   Onboarding state.

   Mirrors Duolingo's pre-account onboarding: the learner picks a
   language, a reason, a proficiency level, and a daily goal BEFORE
   they have an account. We hold those choices in localStorage so the
   first lesson can run anonymously, then sync them to Supabase once
   the learner signs up (see src/actions/syncOnboarding.ts).
   ═══════════════════════════════════════════════════════════════ */

/** Why the learner is studying. Drives which themed lesson they get. */
export type LearningReason =
  | 'education'
  | 'people'
  | 'fun'
  | 'travel'
  | 'productivity'
  | 'career'
  | 'other';

/** Self-reported starting level (the "How much Spanish do you know?" step). */
export type Proficiency = 'new' | 'words' | 'basic' | 'topics' | 'detailed';

export type OnboardingData = {
  /** Course language code. Only 'es' is wired up for now. */
  language: string;
  reason: LearningReason;
  proficiency: Proficiency;
  /** Daily target in minutes: 5 / 10 / 15 / 20. */
  goalMinutes: number;
  /** "How did you hear about us" — captured for parity, not yet acted on. */
  source?: string;
};

const STORAGE_KEY = 'duo:onboarding';

/** Read the in-progress onboarding choices, or null if none/SSR. */
export function loadOnboarding(): Partial<OnboardingData> | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<OnboardingData>) : null;
  } catch {
    return null;
  }
}

/** Merge a patch into the stored onboarding choices. */
export function saveOnboarding(patch: Partial<OnboardingData>): void {
  if (typeof window === 'undefined') return;
  const next = { ...(loadOnboarding() ?? {}), ...patch };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

/** Clear onboarding state (called after a successful sync to Supabase). */
export function clearOnboarding(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

/** The chosen reason, defaulting to 'fun' (the no-theme base lesson). */
export function getLearningReason(): LearningReason {
  return (loadOnboarding()?.reason as LearningReason) ?? 'fun';
}
