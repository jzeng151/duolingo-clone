import Link from "next/link";
import type { ReactNode } from "react";

/* Shared chrome for the login + signup pages, modelled on Duolingo's auth
   screens: a top bar with the wordmark, a cosmetic language picker, and a
   "switch" button (Sign up / Log in), wrapped around a centred card. */

export const authInputClass =
  "w-full rounded-2xl border-2 border-[#E5E5E5] bg-[#F7F7F7] px-4 py-3 text-[15px] font-medium text-[#3C3C3C] placeholder-[#AFAFAF] outline-none transition focus:border-[#1CB0F6] focus:bg-white";

export function AuthShell({
  children,
  switchHref,
  switchLabel,
}: {
  children: ReactNode;
  switchHref: string;
  switchLabel: string;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#4B4B4B]">
      <header className="flex items-center justify-between px-5 py-4">
        <span className="text-2xl font-extrabold tracking-tight text-[#58CC02]">duolingo</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden items-center gap-1 text-sm font-bold uppercase tracking-wide text-[#AFAFAF] sm:flex"
          >
            Site language: English
          </button>
          <Link
            href={switchHref}
            className="btn-shadow-white rounded-2xl border-2 border-[#E5E5E5] bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-[#1CB0F6]"
          >
            {switchLabel}
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-8">
        <div className="w-full max-w-[400px]">{children}</div>
      </main>
    </div>
  );
}

/* Cosmetic social sign-in. The buttons are decorative per the design brief:
   they carry no auth handler, only the divider + Facebook/Google styling. */
export function OAuthButtons() {
  return (
    <>
      <div className="my-6 flex items-center gap-4">
        <span className="h-0.5 flex-1 bg-[#E5E5E5]" />
        <span className="text-sm font-bold uppercase tracking-wide text-[#AFAFAF]">or</span>
        <span className="h-0.5 flex-1 bg-[#E5E5E5]" />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          aria-label="Continue with Facebook"
          className="btn-shadow-white flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-[#E5E5E5] bg-white py-3 text-sm font-bold uppercase tracking-wide text-[#3C5A99]"
        >
          <span className="text-lg font-black">f</span>
          <span className="hidden sm:inline">Facebook</span>
        </button>
        <button
          type="button"
          aria-label="Continue with Google"
          className="btn-shadow-white flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-[#E5E5E5] bg-white py-3 text-sm font-bold uppercase tracking-wide text-[#777777]"
        >
          <span className="text-lg font-black text-[#4285F4]">G</span>
          <span className="hidden sm:inline">Google</span>
        </button>
      </div>
    </>
  );
}
