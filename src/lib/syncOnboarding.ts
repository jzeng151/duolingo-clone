import { supabaseBrowser } from '../../lib/supabase-browser';
import { loadOnboarding, clearOnboarding } from './onboarding';

/* Push the anonymous onboarding choices (held in localStorage) into Supabase
   once the learner has a session. Best-effort: on failure we keep localStorage
   so a later sign-in can retry. Called right after signup / login succeeds. */
export async function syncOnboarding(): Promise<void> {
  const data = loadOnboarding();
  if (!data) return;

  const { error } = await supabaseBrowser.rpc('save_onboarding', {
    p_language: data.language ?? 'es',
    p_reason: data.reason ?? null,
    p_proficiency: data.proficiency ?? null,
    p_goal_minutes: data.goalMinutes ?? null,
  });

  if (!error) clearOnboarding();
}
