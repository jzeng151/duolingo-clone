"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "../../lib/supabase-browser";
import { syncOnboarding } from "../../src/lib/syncOnboarding";
import { AuthShell, OAuthButtons, authInputClass } from "../components/AuthShell";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
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
      const { error: signUpError } = await supabaseBrowser.auth.signUp({
        email,
        password,
        options: name ? { data: { display_name: name } } : undefined,
      });

      if (signUpError) {
        setError(signUpError.message);
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
    <AuthShell switchHref="/login" switchLabel="Log in">
      <h1 className="mb-6 text-center text-2xl font-extrabold text-[#3C3C3C]">Create your profile</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name (optional)"
          className={authInputClass}
        />

        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="Email"
          className={authInputClass}
        />

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
          placeholder="Password"
          className={authInputClass}
        />

        {error ? (
          <p className="rounded-xl bg-[#FFDFE0] px-4 py-3 text-sm font-semibold text-[#EA2B2B]">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="btn-shadow-blue w-full rounded-2xl bg-[#1CB0F6] px-5 py-3.5 text-base font-bold uppercase tracking-wide text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <OAuthButtons />

      <p className="mt-8 text-center text-xs leading-5 text-[#AFAFAF]">
        By signing up for Duolingo, you agree to our{" "}
        <span className="font-bold text-[#777777]">Terms</span> and{" "}
        <span className="font-bold text-[#777777]">Privacy Policy</span>.
      </p>

      <p className="mt-6 text-center text-sm text-[#777777]">
        Already have an account?{" "}
        <Link href="/login" className="font-bold uppercase text-[#1CB0F6]">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
