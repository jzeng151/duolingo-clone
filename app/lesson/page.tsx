import Link from "next/link";
import { redirect } from "next/navigation";
import SignOutButton from "../components/SignOutButton";
import { createServerSupabaseClient } from "../../lib/supabase-server";

export default async function LessonPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.auth.getSession();

  if (!data.session?.user) {
    redirect("/login");
  }

  const email = data.session.user.email ?? "Learner";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Lesson</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">Welcome back, {email}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">This lesson page is protected. Only signed-in users can access it.</p>
          </div>
          <SignOutButton />
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-lg shadow-slate-900/5">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Protected content</p>
          <h2 className="mt-4 text-3xl font-semibold">Your first Spanish lesson</h2>
          <p className="mt-4 text-slate-700">You are authenticated and can now continue building the lesson experience here.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
