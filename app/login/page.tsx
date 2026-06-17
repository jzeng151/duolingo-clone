"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "../../lib/supabase-browser";
import { syncOnboarding } from "../../src/lib/syncOnboarding";
import { AuthShell, OAuthButtons, authInputClass } from "../components/AuthShell";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/learn");
      }
    });
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await supabaseBrowser.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      await syncOnboarding();
      router.push("/learn");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell switchHref="/signup" switchLabel="Sign up">
      <h1 className="mb-6 text-center text-2xl font-extrabold text-[#3C3C3C]">Log in</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="Email or username"
          className={authInputClass}
        />

        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            placeholder="Password"
            className={authInputClass}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-wide text-[#1CB0F6]">
            Forgot?
          </span>
        </div>

        {error ? (
          <p className="rounded-xl bg-[#FFDFE0] px-4 py-3 text-sm font-semibold text-[#EA2B2B]">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="btn-shadow-blue w-full rounded-2xl bg-[#1CB0F6] px-5 py-3.5 text-base font-bold uppercase tracking-wide text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <OAuthButtons />

      <p className="mt-8 text-center text-xs leading-5 text-[#AFAFAF]">
        By signing in to Duolingo, you agree to our{" "}
        <span className="font-bold text-[#777777]">Terms</span> and{" "}
        <span className="font-bold text-[#777777]">Privacy Policy</span>.
      </p>

      <p className="mt-6 text-center text-sm text-[#777777]">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-bold uppercase text-[#1CB0F6]">
          Sign up
        </Link>
      </p>
    </AuthShell>
  );
}
