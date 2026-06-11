import Link from "next/link";

const LANGUAGES = [
  { name: "English", flag: "🇬🇧", href: "/course/en/en/Learn-English" },
  { name: "Spanish", flag: "🇪🇸", href: "/course/es/en/Learn-Spanish" },
  { name: "French", flag: "🇫🇷", href: "/course/fr/en/Learn-French" },
  { name: "German", flag: "🇩🇪", href: "/course/de/en/Learn-German" },
  { name: "Italian", flag: "🇮🇹", href: "/course/it/en/Learn-Italian" },
  { name: "Portuguese", flag: "🇧🇷", href: "/course/pt/en/Learn-Portuguese" },
  { name: "Math", flag: "🧮", href: "/course/math/Learn-Math" },
  { name: "Chess", flag: "♟️", href: "/chess" },
  { name: "Dutch", flag: "🇳🇱", href: "/course/nl-NL/en/Learn-Dutch" },
  { name: "Japanese", flag: "🇯🇵", href: "/course/ja/en/Learn-Japanese" },
  { name: "Arabic", flag: "🇸🇦", href: "/course/ar/en/Learn-Arabic" },
  { name: "Czech", flag: "🇨🇿", href: "/course/cs/en/Learn-Czech" },
  { name: "Welsh", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", href: "/course/cy/en/Learn-Welsh" },
  { name: "Danish", flag: "🇩🇰", href: "/course/da/en/Learn-Danish" },
  { name: "Greek", flag: "🇬🇷", href: "/course/el/en/Learn-Greek" },
  { name: "Esperanto", flag: "🌍", href: "/course/eo/en/Learn-Esperanto" },
  { name: "Finnish", flag: "🇫🇮", href: "/course/fi/en/Learn-Finnish" },
  { name: "Irish", flag: "🇮🇪", href: "/course/ga/en/Learn-Irish" },
  { name: "Scottish Gaelic", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", href: "/course/gd/en/Learn-Scottish%20Gaelic" },
  { name: "Hebrew", flag: "🇮🇱", href: "/course/he/en/Learn-Hebrew" },
  { name: "Hindi", flag: "🇮🇳", href: "/course/hi/en/Learn-Hindi" },
  { name: "Haitian Creole", flag: "🇭🇹", href: "/course/ht/en/Learn-Haitian%20Creole" },
  { name: "Hungarian", flag: "🇭🇺", href: "/course/hu/en/Learn-Hungarian" },
  { name: "High Valyrian", flag: "🐉", href: "/course/hv/en/Learn-High%20Valyrian" },
  { name: "Hawaiian", flag: "🌺", href: "/course/hw/en/Learn-Hawaiian" },
  { name: "Indonesian", flag: "🇮🇩", href: "/course/id/en/Learn-Indonesian" },
  { name: "Korean", flag: "🇰🇷", href: "/course/ko/en/Learn-Korean" },
  { name: "Latin", flag: "🏛️", href: "/course/la/en/Learn-Latin" },
  { name: "Norwegian (Bokmål)", flag: "🇳🇴", href: "/course/no-BO/en/Learn-Norwegian%20Bokm%C3%A5l" },
  { name: "Navajo", flag: "🪶", href: "/course/nv/en/Learn-Navajo" },
  { name: "Polish", flag: "🇵🇱", href: "/course/pl/en/Learn-Polish" },
  { name: "Romanian", flag: "🇷🇴", href: "/course/ro/en/Learn-Romanian" },
  { name: "Russian", flag: "🇷🇺", href: "/course/ru/en/Learn-Russian" },
  { name: "Swedish", flag: "🇸🇪", href: "/course/sv/en/Learn-Swedish" },
  { name: "Swahili", flag: "🇰🇪", href: "/course/sw/en/Learn-Swahili" },
  { name: "Klingon", flag: "🖖", href: "/course/tlh/en/Learn-Klingon" },
  { name: "Turkish", flag: "🇹🇷", href: "/course/tr/en/Learn-Turkish" },
  { name: "Ukrainian", flag: "🇺🇦", href: "/course/uk/en/Learn-Ukrainian" },
  { name: "Vietnamese", flag: "🇻🇳", href: "/course/vi/en/Learn-Vietnamese" },
  { name: "Yiddish", flag: "✡️", href: "/course/yi/en/Learn-Yiddish" },
  { name: "Chinese", flag: "🇨🇳", href: "/course/zh/en/Learn-Chinese" },
  { name: "Zulu", flag: "🇿🇦", href: "/course/zu/en/Learn-Zulu" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-snow">
      {/* ───────────────────────────────────────────
           BANNER — full-viewport hero
           Matches: <banner> on duolingo.com
           Structure: nav → mascot → h1 → CTAs → language strip at bottom
           ─────────────────────────────────────────── */}
      <header className="relative flex min-h-screen flex-col items-center bg-snow">
        {/* Nav bar — pinned to top */}
        <nav className="flex w-full items-center justify-between px-16 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-feather-green text-lg font-extrabold text-white">
              D
            </span>
            <span className="text-xl font-extrabold tracking-tight text-feather-green">
              duolingo
            </span>
          </Link>
          <button className="flex items-center gap-1 text-sm text-wolf transition-colors hover:text-eel">
            Site language: English
            <span className="text-xs">▾</span>
          </button>
        </nav>

        {/* Center block: mascot + headline + CTAs */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          {/* Duo owl — large mascot illustration */}
          <div className="mb-8">
            <span className="text-[10rem] leading-none">🦉</span>
          </div>

          <h1
            className="max-w-2xl font-extrabold text-eel"
            style={{ fontSize: "2.5rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            the free, fun, and effective way to learn a language!
          </h1>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-feather-green px-8 py-4 text-base font-bold uppercase tracking-wide text-white shadow-md transition-colors hover:bg-feather-green-hover"
            >
              get started
            </Link>
            <button className="rounded-full border-2 border-eel px-6 py-3 text-sm font-bold uppercase tracking-wide text-eel transition-colors hover:bg-polar">
              i already have an account
            </button>
          </div>
        </div>

        {/* Language strip — anchored to bottom of the hero */}
        <nav className="w-full border-t border-swan bg-polar">
          <div className="mx-auto flex max-w-5xl items-center gap-3 overflow-x-auto px-4 py-4">
            {/* Left arrow */}
            <span className="flex-shrink-0 text-2xl text-wolf">‹</span>

            <ul className="flex flex-shrink-0 items-center gap-2">
              {LANGUAGES.map((lang) => (
                <li key={lang.name}>
                  <Link
                    href={lang.href}
                    className="flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-1.5 text-sm font-bold text-eel transition-colors hover:bg-hero-green"
                  >
                    <span className="text-base">{lang.flag}</span>
                    {lang.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right arrow */}
            <span className="flex-shrink-0 text-2xl text-wolf">›</span>
          </div>
        </nav>
      </header>

      {/* ───────────────────────────────────────────
           MAIN — feature sections (only visible after scroll)
           Matches: <main> on duolingo.com
           ─────────────────────────────────────────── */}
      <main>
        {/* free. fun. effective. */}
        <section className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
          <h2
            className="font-extrabold text-eel"
            style={{ fontSize: "2rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            free. fun. effective.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-wolf">
            Learning with Duolingo is fun, and{" "}
            <Link href="/efficacy" className="font-semibold text-macaw underline">
              research shows that it works
            </Link>
            ! With quick, bite-sized lessons, you&apos;ll earn points and
            unlock new levels while gaining real-world communication skills.
          </p>
        </section>

        {/* backed by science */}
        <section className="bg-hero-green">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
            <h2
              className="font-extrabold text-eel"
              style={{ fontSize: "2rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              backed by science
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-eel">
              We use a combination of research-backed teaching methods and
              delightful content to create courses that effectively teach
              reading, writing, listening, and speaking skills!
            </p>
          </div>
        </section>

        {/* stay motivated */}
        <section className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
          <h2
            className="font-extrabold text-eel"
            style={{ fontSize: "2rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            stay motivated
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-wolf">
            We make it easy to form a habit of language learning with
            game-like features, fun challenges, and reminders from our
            friendly mascot, Duo the owl.
          </p>
        </section>

        {/* personalized learning */}
        <section className="bg-hero-green">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
            <h2
              className="font-extrabold text-eel"
              style={{ fontSize: "2rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              personalized learning
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-eel">
              Combining the best of AI and language science, lessons are
              tailored to help you learn at just the right level and pace.
            </p>
          </div>
        </section>

        {/* learn anytime, anywhere */}
        <section className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
          <h2
            className="font-extrabold text-eel"
            style={{ fontSize: "2rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            learn anytime, anywhere
          </h2>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-xl bg-eel px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-eel/80"
            >
              🍎 Download on the App Store
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-xl bg-eel px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-eel/80"
            >
              ▶️ Get it on Google Play
            </Link>
          </div>
        </section>

        {/* Super Duolingo promo */}
        <section className="bg-beetle">
          <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center lg:px-8">
            <span className="text-6xl">⭐</span>
            <h2
              className="mt-6 font-extrabold text-white"
              style={{ fontSize: "2rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              super duolingo
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-white/90">
              No ads, unlimited hearts, and personalized practice. Take your
              learning to the next level!
            </p>
            <button className="mt-8 rounded-full bg-white px-8 py-4 text-base font-bold uppercase tracking-wide text-beetle shadow-md transition-colors hover:bg-polar">
              try 1 week free
            </button>
          </div>
        </section>

        {/* duolingo english test */}
        <section className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
          <h2
            className="font-extrabold text-eel"
            style={{ fontSize: "2rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            duolingo english test
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-wolf">
            Our convenient, fast, and affordable English test integrates the
            latest assessment science and AI — empowering anyone to
            accurately test their English where and when they&apos;re at their
            best.
          </p>
          <Link
            href="https://englishtest.duolingo.com/en"
            className="mt-6 inline-block text-base font-bold text-macaw underline"
          >
            Certify your English
          </Link>
        </section>

        {/* duolingo for schools */}
        <section className="bg-hero-green">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
            <h2
              className="font-extrabold text-eel"
              style={{ fontSize: "2rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              duolingo for schools
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-eel">
              Teachers, we&apos;re here to help you! Our free tools support
              your students as they learn languages through the Duolingo app,
              both in and out of the classroom.
            </p>
            <Link
              href="https://schools.duolingo.com"
              className="mt-6 inline-block text-base font-bold text-macaw underline"
            >
              Get your class started
            </Link>
          </div>
        </section>

        {/* duolingo abc */}
        <section className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
          <h2
            className="font-extrabold text-eel"
            style={{ fontSize: "2rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            duolingo abc
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-wolf">
            From language to literacy! With fun phonics lessons and delightful
            stories, Duolingo ABC helps kids ages 3–8 learn to read and write
            — 100% free.
          </p>
          <Link
            href="/abc"
            className="mt-6 inline-block text-base font-bold text-macaw underline"
          >
            Learn more about ABC
          </Link>
        </section>

        {/* Final CTA — learn a language with duolingo */}
        <section className="bg-feather-green">
          <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center lg:px-8">
            <span className="text-7xl">🦉</span>
            <h2
              className="mt-6 font-extrabold text-white"
              style={{ fontSize: "2rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              learn a language with duolingo
            </h2>
            <Link
              href="/register"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold uppercase tracking-wide text-feather-green shadow-md transition-colors hover:bg-polar"
            >
              get started
            </Link>
          </div>
        </section>
      </main>

      {/* ───────────────────────────────────────────
           FOOTER
           ─────────────────────────────────────────── */}
      <footer className="bg-eel text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-6">
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/60">
                About us
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/courses" className="text-white/80 hover:text-white">Courses</Link></li>
                <li><Link href="https://about.duolingo.com" className="text-white/80 hover:text-white">Mission</Link></li>
                <li><Link href="/efficacy" className="text-white/80 hover:text-white">Efficacy</Link></li>
                <li><Link href="https://careers.duolingo.com" className="text-white/80 hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/60">
                Products
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-white/80 hover:text-white">Duolingo</Link></li>
                <li><Link href="/super" className="text-white/80 hover:text-white">Super Duolingo</Link></li>
                <li><Link href="https://englishtest.duolingo.com/en" className="text-white/80 hover:text-white">English Test</Link></li>
                <li><Link href="https://schools.duolingo.com" className="text-white/80 hover:text-white">For Schools</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/60">
                Apps
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-white/80 hover:text-white">iOS</Link></li>
                <li><Link href="#" className="text-white/80 hover:text-white">Android</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/60">
                Help
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help" className="text-white/80 hover:text-white">FAQs</Link></li>
                <li><Link href="https://status.duolingo.com" className="text-white/80 hover:text-white">Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/60">
                Privacy
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="text-white/80 hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="text-white/80 hover:text-white">Privacy</Link></li>
                <li><Link href="/guidelines" className="text-white/80 hover:text-white">Guidelines</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/60">
                Social
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="https://instagram.com/duolingo" className="text-white/80 hover:text-white">Instagram</Link></li>
                <li><Link href="https://tiktok.com/@duolingo" className="text-white/80 hover:text-white">TikTok</Link></li>
                <li><Link href="https://youtube.com/user/duolingo" className="text-white/80 hover:text-white">YouTube</Link></li>
                <li><Link href="https://twitter.com/duolingo" className="text-white/80 hover:text-white">Twitter</Link></li>
              </ul>
            </div>
          </div>
          <hr className="my-8 border-white/10" />
          <p className="text-center text-xs text-white/40">
            © {new Date().getFullYear()} Duolingo Clone — For educational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}
