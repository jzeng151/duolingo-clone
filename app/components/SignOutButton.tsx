"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../../lib/supabase-browser";

export default function SignOutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignOut() {
    setError(null);
    setLoading(true);

    try {
      const { error: signOutError } = await supabaseBrowser.auth.signOut();

      if (signOutError) {
        setError(signOutError.message);
        return;
      }

      router.push("/login");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred while logging out.");
    } finally {
      setLoading(false);
    }
  }

  // Compact icon-only variant for the mobile/tablet top bar, where the full
  // pill doesn't fit alongside the logo and stats. Same handler.
  if (compact) {
    return (
      <button
        type="button"
        onClick={handleSignOut}
        disabled={loading}
        aria-label="Log out"
        title={error ?? 'Log out'}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#AFAFAF] transition-colors hover:bg-[#F7F7F7] hover:text-[#4B4B4B] disabled:opacity-60"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 17l5-5-5-5M20 12H9M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3" />
        </svg>
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleSignOut}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Signing out..." : "Log out"}
      </button>
      {error ? <p className="rounded-3xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
