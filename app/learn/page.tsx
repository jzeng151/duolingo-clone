import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '../../lib/supabase-server';
import { UNITS, computeStates, type CourseUnit, type NodeIcon, type NodeState } from '../../src/content/course';
import SignOutButton from '../components/SignOutButton';

/* The /learn dashboard — a faithful clone of Duolingo's web learn screen:
   a fixed left nav rail, the winding lesson path in the centre, and a right
   rail of stats + promo cards. The path is data-driven: each lesson's node
   state (complete / active / locked) is computed from the player's lesson
   completions, and streak + XP come from real Supabase data. */

export default async function LearnPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: progress } = await supabase
    .from('user_progress')
    .select('total_xp, current_streak')
    .eq('user_id', user.id)
    .maybeSingle();

  const { data: completions } = await supabase
    .from('lesson_completions')
    .select('lesson_id')
    .eq('user_id', user.id);

  const totalXp = progress?.total_xp ?? 0;
  const currentStreak = progress?.current_streak ?? 0;

  const completed = new Set((completions ?? []).map((row) => row.lesson_id as string));
  const states = computeStates(completed);

  return (
    <div className="flex min-h-screen w-full bg-white text-[#4B4B4B]">
      <SideNav />

      <div className="flex flex-1 flex-col xl:flex-row">
        <MobileTopBar streak={currentStreak} xp={totalXp} />

        <main className="flex-1 px-4 pb-24 pt-4 sm:px-6 xl:pb-12">
          <div className="mx-auto w-full max-w-[600px]">
            {UNITS.map((unit, i) => (
              <Unit key={unit.label} unit={unit} states={states} stagger={i % 2 === 1} />
            ))}
            <LockedSection />
          </div>
        </main>

        <RightRail streak={currentStreak} xp={totalXp} />
      </div>
    </div>
  );
}

/* ───────────────────────── Left navigation rail ───────────────────────── */

const NAV_ITEMS: { label: string; icon: React.ReactNode; active?: boolean }[] = [
  { label: 'Learn', icon: <HouseIcon />, active: true },
  { label: 'Leaderboards', icon: <ShieldIcon /> },
  { label: 'Quests', icon: <ChestIcon /> },
  { label: 'Shop', icon: <ShopIcon /> },
  { label: 'Profile', icon: <ProfileIcon /> },
  { label: 'More', icon: <MoreIcon /> },
];

function SideNav() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[256px] shrink-0 flex-col border-r-2 border-[#E5E5E5] px-4 py-6 xl:flex">
      <span className="mb-8 px-3 text-[1.75rem] font-extrabold tracking-tight text-[#58CC02]">
        duolingo
      </span>

      <nav className="flex flex-1 flex-col gap-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`flex items-center gap-4 rounded-xl border-2 px-3 py-3 text-left text-[15px] font-bold uppercase tracking-wide transition-colors ${
              item.active
                ? 'border-[#84D8FF] bg-[#DDF4FF] text-[#1CB0F6]'
                : 'border-transparent text-[#777777] hover:bg-[#F7F7F7]'
            }`}
          >
            <span className="h-8 w-8 shrink-0">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-4 border-t-2 border-[#E5E5E5] pt-4">
        <SignOutButton />
      </div>
    </aside>
  );
}

/* ────────────────────── Mobile / tablet top bar ───────────────────────── */

function MobileTopBar({ streak, xp }: { streak: number; xp: number }) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 border-b-2 border-[#E5E5E5] bg-white px-4 py-3 xl:hidden">
      <span className="text-2xl font-extrabold tracking-tight text-[#58CC02]">duolingo</span>
      <div className="ml-auto flex items-center gap-3">
        <StatsRow streak={streak} xp={xp} />
        {/* The desktop SideNav (and its logout) is hidden below xl, so surface a
            compact logout here too. */}
        <SignOutButton compact />
      </div>
    </header>
  );
}

/* ───────────────────────── Unit (header + path) ───────────────────────── */

/* The signature serpentine: a node's horizontal nudge cycles through this
   pattern. Alternating units mirror it (via `stagger`) so the path keeps
   weaving as it flows from one unit into the next. */
const ZIGZAG = [0, -44, -68, -44, 0, 44, 68, 44];
function zigzag(index: number, stagger: boolean): number {
  return (stagger ? -1 : 1) * ZIGZAG[index % ZIGZAG.length];
}

function Unit({
  unit,
  states,
  stagger,
}: {
  unit: CourseUnit;
  states: Record<string, NodeState>;
  stagger: boolean;
}) {
  return (
    <section className="mb-2">
      <UnitHeader label={unit.label} title={unit.title} />

      <div className="relative flex flex-col items-center gap-5 py-4">
        {/* A Duo mascot loitering beside the path, like the real thing. */}
        <Image
          src="/assets/mascot_happy.svg"
          alt=""
          width={112}
          height={112}
          className="pointer-events-none absolute right-0 top-2 hidden h-28 w-28 sm:block"
          aria-hidden
        />

        {unit.lessons.map((lesson, i) => (
          <PathNode
            key={lesson.id}
            lesson={lesson}
            state={states[lesson.id] ?? 'locked'}
            offset={zigzag(i, stagger)}
          />
        ))}
      </div>
    </section>
  );
}

function UnitHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="sticky top-2 z-[5] mb-6 flex items-center justify-between rounded-2xl bg-[#58CC02] px-5 py-4 text-white shadow-[0_4px_0_#46A302]">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/80">{label}</p>
        <h1 className="mt-1 text-xl font-extrabold">{title}</h1>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 rounded-xl border-2 border-white/40 px-3 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-white/10"
      >
        <BookIcon />
        Guidebook
      </button>
    </div>
  );
}

/* ─────────────────────────────── Path node ────────────────────────────── */

function NodeGlyph({ icon }: { icon: NodeIcon }) {
  switch (icon) {
    case 'star':
      return <StarIcon />;
    case 'book':
      return <BookIcon />;
    case 'dumbbell':
      return <DumbbellIcon />;
    case 'chest':
      return <ChestIcon />;
    case 'trophy':
      return <TrophyIcon />;
  }
}

function PathNode({
  lesson,
  state,
  offset,
}: {
  lesson: { id: string; icon: NodeIcon };
  state: NodeState;
  offset: number;
}) {
  const showStart = state === 'active';

  const circle = (
    <div
      className={`relative flex h-[70px] w-[70px] items-center justify-center rounded-full transition-transform active:translate-y-[3px] ${
        state === 'locked'
          ? 'bg-[#E5E5E5] text-[#AFAFAF] shadow-[0_5px_0_#CFCFCF]'
          : 'bg-[#58CC02] text-white shadow-[0_6px_0_#46A302]'
      }`}
    >
      {state === 'locked' ? (
        <LockIcon />
      ) : state === 'complete' ? (
        <CheckIcon />
      ) : (
        <NodeGlyph icon={lesson.icon} />
      )}

      {showStart && (
        <span className="absolute -top-12 left-1/2 -translate-x-1/2 animate-bounce whitespace-nowrap rounded-2xl border-2 border-[#E5E5E5] bg-white px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide text-[#58CC02] shadow-sm">
          Start
          <span className="absolute -bottom-[9px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-[#E5E5E5] bg-white" />
        </span>
      )}
    </div>
  );

  return (
    <div style={{ transform: `translateX(${offset}px)` }} className={showStart ? 'mt-8' : ''}>
      {state === 'locked' ? (
        <button type="button" aria-label="Locked lesson" disabled>
          {circle}
        </button>
      ) : (
        <Link href={`/lesson?id=${lesson.id}`} aria-label={state === 'complete' ? 'Practice lesson' : 'Start lesson'}>
          {circle}
        </Link>
      )}
    </div>
  );
}

/* The next section, shown locked — a teaser like Duolingo's greyed-out card. */
function LockedSection() {
  return (
    <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border-2 border-[#E5E5E5] bg-[#F7F7F7] px-6 py-8 text-center">
      <div className="flex items-center gap-2 text-[#AFAFAF]">
        <LockIcon />
        <span className="text-xs font-bold uppercase tracking-[0.15em]">Section 2</span>
      </div>
      <p className="max-w-xs text-sm font-medium text-[#AFAFAF]">
        Learn words, phrases, and grammar concepts for basic interactions
      </p>
    </div>
  );
}

/* ───────────────────────────── Right rail ─────────────────────────────── */

function RightRail({ streak, xp }: { streak: number; xp: number }) {
  return (
    <aside className="hidden w-[368px] shrink-0 flex-col gap-6 px-6 py-6 xl:flex">
      <div className="flex justify-end">
        <StatsRow streak={streak} xp={xp} />
      </div>

      {/* Super promo */}
      <section className="rounded-2xl border-2 border-[#E5E5E5] p-5">
        <div className="mb-3 flex items-center justify-between">
          <Image
            src="/characters/super-duolingo-wordmark.svg"
            alt="Super Duolingo"
            width={150}
            height={24}
            className="h-6 w-auto"
          />
        </div>
        <p className="text-[15px] font-bold text-[#4B4B4B]">Try Super for free</p>
        <p className="mt-1 text-sm text-[#777777]">No ads, personalized practice, and unlimited hearts.</p>
        <button
          type="button"
          className="btn-shadow-beetle mt-4 w-full rounded-2xl bg-[#CE82FF] px-4 py-3 text-sm font-bold uppercase tracking-wide text-white"
        >
          Try 2 weeks free
        </button>
      </section>

      {/* Daily quests */}
      <section className="rounded-2xl border-2 border-[#E5E5E5] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[#3C3C3C]">Daily Quests</h2>
          <button type="button" className="text-sm font-bold uppercase tracking-wide text-[#1CB0F6]">
            View all
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl">⚡</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#4B4B4B]">Earn 10 XP</p>
            <div className="mt-2 h-4 overflow-hidden rounded-full bg-[#E5E5E5]">
              <div className="h-full rounded-full bg-[#FFC800]" style={{ width: '40%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard teaser */}
      <section className="rounded-2xl border-2 border-[#E5E5E5] p-5">
        <h2 className="text-lg font-extrabold text-[#3C3C3C]">Unlock Leaderboards!</h2>
        <p className="mt-1 text-sm text-[#777777]">
          Complete more lessons to start competing this week.
        </p>
      </section>

      <footer className="px-1 text-xs font-bold uppercase tracking-wide text-[#AFAFAF]">
        About · Help · Terms · Privacy
      </footer>
    </aside>
  );
}

/* Top-right stat cluster: flag, streak, XP, gems, hearts. Streak and XP are
   real; gems and hearts are static (the data model has no notion of them). */
function StatsRow({ streak, xp }: { streak: number; xp: number }) {
  return (
    <div className="flex items-center gap-4 font-extrabold">
      <Image src="/flags/spanish.svg" alt="Spanish" width={28} height={28} className="h-7 w-7 rounded-md" />
      <span className="flex items-center gap-1 text-[#FF9600]" title="Streak">
        🔥 <span>{streak}</span>
      </span>
      <span className="flex items-center gap-1 text-[#FFC800]" title="Total XP">
        ⚡ <span>{xp}</span>
      </span>
      <span className="hidden items-center gap-1 text-[#1CB0F6] sm:flex" title="Gems">
        💎 <span>500</span>
      </span>
      <span className="flex items-center gap-1 text-[#FF4B4B]" title="Hearts">
        ❤️ <span>5</span>
      </span>
    </div>
  );
}

/* ─────────────────────────────── Icons ────────────────────────────────── */
/* Compact, single-use glyphs for the nav rail and path nodes. */

function HouseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <path d="M12 3 2 11h2v8a1 1 0 0 0 1 1h4v-6h6v6h4a1 1 0 0 0 1-1v-8h2L12 3z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3zm-1 13-3-3 1.4-1.4L11 12.2l3.6-3.6L16 10l-5 5z" />
    </svg>
  );
}

function ChestIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2h-7V8h-2v2H4V8zm0 4h7v2h2v-2h7v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6z" />
    </svg>
  );
}

function ShopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <path d="M5 4h14l1 5a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-5.8.8L5 4zm0 9.9A4.9 4.9 0 0 0 8 14v6h8v-6a4.9 4.9 0 0 0 3-.1V20H5v-6.1z" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-9 w-9">
      <path d="m12 2 2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 8.9l6.9-.6L12 2z" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
      <path d="M4 4h7v15H6a2 2 0 0 0-2 1V4zm9 0h7v16a2 2 0 0 0-2-1h-5V4z" />
    </svg>
  );
}

function DumbbellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
      <path d="M4 9h2V7H4v2zm3-3h2v12H7V6zm10 0h2v12h-2V6zm3 3h-2v2h2V9zM10 11h4v2h-4v-2z" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-9 w-9">
      <path d="M6 4h12v2h3v2a4 4 0 0 1-4 4h-.3A6 6 0 0 1 13 15.9V18h3v2H8v-2h3v-2.1A6 6 0 0 1 7.3 12H7a4 4 0 0 1-4-4V6h3V4zm-1 4a2 2 0 0 0 1 1.7V8H5zm14 0h-1v1.7A2 2 0 0 0 19 8z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
      <path d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h1zm2 0h6V8a3 3 0 0 0-6 0v2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-9 w-9"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
