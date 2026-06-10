# Duolingo Clone

A faithful Duolingo clone built to learn by building. Two-person project: **Jason Zeng** and **Bath Bilissalou**.

---

## Start here

Read these documents in this order before writing any code:

1. **`TODOS.md`** — The step-by-step build checklist. Work through this top to bottom.
2. **`ARCHITECTURE.md`** — The tech stack and database design. Reference this when building anything that touches the database or server.
3. **`DESIGN.md`** — Colors, fonts, buttons, spacing. Reference this whenever you're building a screen or component.
4. **`PRD.md`** — The full product requirements. Reference this if you're ever unsure what a feature is supposed to do.
5. **`DESIGN-DOC.md`** — The full technical design document. Contains all the important decisions made before building started. Read this if something in TODOS or ARCHITECTURE doesn't make sense.

---

## Git workflow

1. Never commit directly to `main`.
2. Create a branch for your work: `git checkout -b your-name/what-youre-building`
   - Example: `git checkout -b bath/database-setup` or `git checkout -b jason/lesson-screen`
3. When your task is done, open a pull request on GitHub.
4. Jason reviews Bath's PRs. Bath reviews Jason's PRs. Merge after approval.

---

## Running the project locally

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open `http://localhost:3000` in your browser.

> Note: This project uses `npm run dev` with `next dev --webpack` because the default Turbopack mode in Next.js 16 caused a PostCSS/Tailwind build issue in this repository.

---

## Environment setup

You need a `.env.local` file in the root of the project with these values. Get the values from the Supabase project dashboard (Settings → API):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

- `NEXT_PUBLIC_SUPABASE_URL` — the URL of your Supabase project. Found under Settings → API → Project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — the safe public key. Found under Settings → API → Project API keys → `anon public`.
- `SUPABASE_SERVICE_ROLE_KEY` — the privileged key used only in server functions. Found under Settings → API → Project API keys → `service_role`. **Never put this in any file that gets committed to GitHub. Never use it in browser-side code.**

> The `.env.local` file is already in `.gitignore` — it will never be committed. The `.env.example` file is what gets committed; it has the same variable names but no real values.
## Troubleshooting

### JSON Parsing Error During Build

If Next.js reports a JSON parsing error but all project JSON files are valid, the issue may be caused by a corrupted `.next` cache.

Run:

```bash
rm -rf .next
npm run build
