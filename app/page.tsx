"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Lottie from "./components/Lottie";
import HeroAnimation from "./components/HeroAnimation";

/* ═══════════════════════════════════════════════════════════════
   Duo Mascot — SVG recreation of the Duolingo owl
   Built from official shape-language: circles, rounded rects,
   pill shadows. Colors from design.duolingo.com palette.
   ═══════════════════════════════════════════════════════════════ */
function DuoOwl({ size = 280 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="duo-mascot"
      aria-label="Duo the Duolingo owl"
    >
      {/* Pill shadow */}
      <ellipse cx="140" cy="262" rx="72" ry="8" fill="#4B4B4B" opacity="0.1" />

      {/* Body — rounded shape */}
      <path
        d="M140 28C82 28 42 68 42 128C42 188 82 240 140 240C198 240 238 188 238 128C238 68 198 28 140 28Z"
        fill="#58CC02"
      />
      {/* Belly — lighter green circle */}
      <ellipse cx="140" cy="150" rx="60" ry="65" fill="#89E219" />
      {/* Belly inner — lighter */}
      <ellipse cx="140" cy="155" rx="44" ry="50" fill="#A8ED3A" opacity="0.5" />

      {/* Wing overlays */}
      <path d="M85 120Q72 150 78 185Q88 190 92 185Q86 150 95 125Z" fill="#43C000" />
      <path d="M195 120Q208 150 202 185Q192 190 188 185Q194 150 185 125Z" fill="#43C000" />

      {/* Eyes — white circles */}
      <circle cx="108" cy="108" r="26" fill="#FFFFFF" />
      <circle cx="172" cy="108" r="26" fill="#FFFFFF" />

      {/* Pupils */}
      <circle cx="112" cy="110" r="11" fill="#4B4B4B" />
      <circle cx="168" cy="110" r="11" fill="#4B4B4B" />
      {/* Eye highlights */}
      <circle cx="115" cy="106" r="4" fill="#FFFFFF" />
      <circle cx="171" cy="106" r="4" fill="#FFFFFF" />

      {/* Eyebrows — feather-green arcs above eyes */}
      <path d="M88 86Q108 74 128 86" stroke="#43C000" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M152 86Q172 74 192 86" stroke="#43C000" strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* Beak — orange rounded shape */}
      <path
        d="M128 128C128 128 135 140 140 140C145 140 152 128 152 128C152 128 148 138 140 138C132 138 128 128 128 128Z"
        fill="#FFC200"
      />
      <path
        d="M122 132C122 132 132 152 140 152C148 152 158 132 158 132C158 132 150 148 140 148C130 148 122 132 122 132Z"
        fill="#F49000"
      />
      <path
        d="M130 142C130 142 135 148 140 148C145 148 150 142 150 142C150 142 146 152 140 152C134 152 130 142 130 142Z"
        fill="#FFC200"
      />

      {/* Feet */}
      <ellipse cx="115" cy="245" rx="14" ry="6" fill="#FFC200" />
      <ellipse cx="165" cy="245" rx="14" ry="6" fill="#FFC200" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   App Store badge
   ═══════════════════════════════════════════════════════════════ */
function AppStoreBadge({ store }: { store: "apple" | "google" }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg bg-eel px-4 py-2 text-white transition-transform hover:scale-105">
      <span className="text-xl">{store === "apple" ? "" : "▶"}</span>
      <div className="text-left">
        <div className="text-[10px] leading-tight opacity-80">
          {store === "apple" ? "Download on the" : "Get it on"}
        </div>
        <div className="text-sm font-bold leading-tight">
          {store === "apple" ? "App Store" : "Google Play"}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Feature Illustration — generic decorative SVG per section
   ═══════════════════════════════════════════════════════════════ */
function FeatureIllustration({ variant }: { variant: "books" | "trophy" | "heart" | "ai" }) {
  const colors: Record<string, { bg: string; fg: string; accent: string }> = {
    books: { bg: "#D7FFDB", fg: "#58CC02", accent: "#1CB0F6" },
    trophy: { bg: "#FFF4D6", fg: "#FFC800", accent: "#FF9600" },
    heart: { bg: "#FFE0E0", fg: "#FF4B4B", accent: "#CE82FF" },
    ai: { bg: "#E0F0FF", fg: "#1CB0F6", accent: "#CE82FF" },
  };
  const c = colors[variant];

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pill shadow */}
      <ellipse cx="100" cy="185" rx="50" ry="6" fill="#4B4B4B" opacity="0.08" />

      {variant === "books" && (
        <>
          <rect x="50" y="60" width="55" height="80" rx="6" fill="#58CC02" transform="rotate(-8 77 100)" />
          <rect x="95" y="50" width="55" height="80" rx="6" fill="#1CB0F6" transform="rotate(6 122 90)" />
          <rect x="70" y="40" width="55" height="80" rx="6" fill="#FFC800" />
          <rect x="80" y="48" width="35" height="6" rx="3" fill="#FFFFFF" opacity="0.6" />
        </>
      )}
      {variant === "trophy" && (
        <>
          <path d="M65 50H135V85C135 110 120 125 100 125C80 125 65 110 65 85V50Z" fill="#FFC800" />
          <rect x="92" y="122" width="16" height="20" rx="2" fill="#FF9600" />
          <rect x="75" y="140" width="50" height="10" rx="5" fill="#FF9600" />
          <path d="M65 55H45V70C45 82 54 90 65 90" stroke="#FFC800" strokeWidth="6" fill="none" />
          <path d="M135 55H155V70C155 82 146 90 135 90" stroke="#FFC800" strokeWidth="6" fill="none" />
          <circle cx="100" cy="82" r="14" fill="#FF9600" opacity="0.3" />
        </>
      )}
      {variant === "heart" && (
        <>
          <path
            d="M100 150C100 150 55 120 55 85C55 70 67 58 82 58C92 58 100 65 100 65C100 65 108 58 118 58C133 58 145 70 145 85C145 120 100 150 100 150Z"
            fill="#FF4B4B"
          />
          <ellipse cx="80" cy="75" rx="10" ry="8" fill="#FFFFFF" opacity="0.3" />
        </>
      )}
      {variant === "ai" && (
        <>
          <circle cx="100" cy="95" r="45" fill="#1CB0F6" />
          <circle cx="100" cy="95" r="30" fill="#FFFFFF" opacity="0.2" />
          <path d="M70 95L85 80L100 95L115 80L130 95" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="100" cy="95" r="6" fill="#CE82FF" />
          <circle cx="70" cy="95" r="5" fill="#CE82FF" />
          <circle cx="130" cy="95" r="5" fill="#CE82FF" />
        </>
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Language list — matches duolingo.com exactly
   ═══════════════════════════════════════════════════════════════ */
const LANGUAGES = [
  { name: "English", flag: "english", href: "/course/en/en/Learn-English" },
  { name: "Spanish", flag: "spanish", href: "/course/es/en/Learn-Spanish" },
  { name: "French", flag: "french", href: "/course/fr/en/Learn-French" },
  { name: "German", flag: "german", href: "/course/de/en/Learn-German" },
  { name: "Italian", flag: "italian", href: "/course/it/en/Learn-Italian" },
  { name: "Portuguese", flag: "portuguese", href: "/course/pt/en/Learn-Portuguese" },
  { name: "Math", flag: "math", href: "/math" },
  { name: "Chess", flag: "chess", href: "/chess" },
  { name: "Music", flag: "music", href: "/music" },
  { name: "Dutch", flag: "dutch", href: "/course/nl-NL/en/Learn-Dutch" },
  { name: "Japanese", flag: "japanese", href: "/course/ja/en/Learn-Japanese" },
  { name: "Arabic", flag: "arabic", href: "/course/ar/en/Learn-Arabic" },
  { name: "Czech", flag: "czech", href: "/course/cs/en/Learn-Czech" },
  { name: "Welsh", flag: "welsh", href: "/course/cy/en/Learn-Welsh" },
  { name: "Danish", flag: "danish", href: "/course/da/en/Learn-Danish" },
  { name: "Greek", flag: "greek", href: "/course/el/en/Learn-Greek" },
  { name: "Esperanto", flag: "esperanto", href: "/course/eo/en/Learn-Esperanto" },
  { name: "Finnish", flag: "finnish", href: "/course/fi/en/Learn-Finnish" },
  { name: "Irish", flag: "irish", href: "/course/ga/en/Learn-Irish" },
  { name: "Scottish Gaelic", flag: "scottish-gaelic", href: "/course/gd/en/Learn-Scottish%20Gaelic" },
  { name: "Hebrew", flag: "hebrew", href: "/course/he/en/Learn-Hebrew" },
  { name: "Hindi", flag: "hindi", href: "/course/hi/en/Learn-Hindi" },
  { name: "Haitian Creole", flag: "haitian-creole", href: "/course/ht/en/Learn-Haitian%20Creole" },
  { name: "Hungarian", flag: "hungarian", href: "/course/hu/en/Learn-Hungarian" },
  { name: "High Valyrian", flag: "high-valyrian", href: "/course/hv/en/Learn-High%20Valyrian" },
  { name: "Hawaiian", flag: "hawaiian", href: "/course/hw/en/Learn-Hawaiian" },
  { name: "Indonesian", flag: "indonesian", href: "/course/id/en/Learn-Indonesian" },
  { name: "Korean", flag: "korean", href: "/course/ko/en/Learn-Korean" },
  { name: "Latin", flag: "latin", href: "/course/la/en/Learn-Latin" },
  { name: "Norwegian (Bokmål)", flag: "norwegian", href: "/course/no-BO/en/Learn-Norwegian%20Bokm%C3%A5l" },
  { name: "Navajo", flag: "navajo", href: "/course/nv/en/Learn-Navajo" },
  { name: "Polish", flag: "polish", href: "/course/pl/en/Learn-Polish" },
  { name: "Romanian", flag: "romanian", href: "/course/ro/en/Learn-Romanian" },
  { name: "Russian", flag: "russian", href: "/course/ru/en/Learn-Russian" },
  { name: "Swedish", flag: "swedish", href: "/course/sv/en/Learn-Swedish" },
  { name: "Swahili", flag: "swahili", href: "/course/sw/en/Learn-Swahili" },
  { name: "Klingon", flag: "klingon", href: "/course/tlh/en/Learn-Klingon" },
  { name: "Turkish", flag: "turkish", href: "/course/tr/en/Learn-Turkish" },
  { name: "Ukrainian", flag: "ukrainian", href: "/course/uk/en/Learn-Ukrainian" },
  { name: "Vietnamese", flag: "vietnamese", href: "/course/vi/en/Learn-Vietnamese" },
  { name: "Yiddish", flag: "yiddish", href: "/course/yi/en/Learn-Yiddish" },
  { name: "Chinese", flag: "chinese", href: "/course/zh/en/Learn-Chinese" },
  { name: "Zulu", flag: "zulu", href: "/course/zu/en/Learn-Zulu" },
];

/* Interface / UI languages — matches duolingo.com footer exactly (28 languages, alphabetical by native name) */
const SITE_LANGUAGES = [
  { name: "العربية", flag: "arabic", code: "ar", href: "//ar.duolingo.com" },
  { name: "বাংলা", flag: "bengali", code: "bn", href: "//bn.duolingo.com" },
  { name: "Čeština", flag: "czech", code: "cs", href: "//cs.duolingo.com" },
  { name: "Deutsch", flag: "german", code: "de", href: "//de.duolingo.com" },
  { name: "Ελληνικά", flag: "greek", code: "el", href: "//el.duolingo.com" },
  { name: "English", flag: "english", code: "en", href: "//en.duolingo.com" },
  { name: "Español", flag: "spanish", code: "es", href: "//es.duolingo.com" },
  { name: "Français", flag: "french", code: "fr", href: "//fr.duolingo.com" },
  { name: "हिंदी", flag: "hindi", code: "hi", href: "//hi.duolingo.com" },
  { name: "Magyar", flag: "hungarian", code: "hu", href: "//hu.duolingo.com" },
  { name: "Bahasa Indonesia", flag: "indonesian", code: "id", href: "//id.duolingo.com" },
  { name: "Italiano", flag: "italian", code: "it", href: "//it.duolingo.com" },
  { name: "日本語", flag: "japanese", code: "ja", href: "//ja.duolingo.com" },
  { name: "한국어", flag: "korean", code: "ko", href: "//ko.duolingo.com" },
  { name: "Nederlands", flag: "dutch", code: "dn", href: "//dn.duolingo.com" },
  { name: "Polski", flag: "polish", code: "pl", href: "//pl.duolingo.com" },
  { name: "Português", flag: "portuguese", code: "pt", href: "//pt.duolingo.com" },
  { name: "Română", flag: "romanian", code: "ro", href: "//ro.duolingo.com" },
  { name: "Русский", flag: "russian", code: "ru", href: "//ru.duolingo.com" },
  { name: "svenska", flag: "swedish", code: "sv", href: "//sv.duolingo.com" },
  { name: "தமிழ்", flag: "tamil", code: "ta", href: "//ta.duolingo.com" },
  { name: "తెలుగు", flag: "telugu", code: "te", href: "//te.duolingo.com" },
  { name: "ภาษาไทย", flag: "thai", code: "th", href: "//th.duolingo.com" },
  { name: "Tagalog", flag: "tagalog", code: "tl", href: "//tl.duolingo.com" },
  { name: "Türkçe", flag: "turkish", code: "tr", href: "//tr.duolingo.com" },
  { name: "Українською", flag: "ukrainian", code: "uk", href: "//uk.duolingo.com" },
  { name: "Tiếng Việt", flag: "vietnamese", code: "vi", href: "//vi.duolingo.com" },
  { name: "中文", flag: "chinese", code: "zs", href: "//zs.duolingo.com" },
];

/* ═══════════════════════════════════════════════════════════════
   Reusable section heading (lowercase, bold, per brand guidelines)
   ═══════════════════════════════════════════════════════════════ */
function SectionHeading({ children, color = "feather-green" }: { children: React.ReactNode; color?: string }) {
  return (
    <h2
      className={`font-extrabold text-${color}`}
      style={{ fontSize: "3rem", lineHeight: 1.2 }}
    >
      {children}
    </h2>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Page Component
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [langScrollIndex, setLangScrollIndex] = useState(0);
  const langScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll the language bar by 2 items
  const scrollLangBar = (direction: "left" | "right") => {
    const container = langScrollRef.current;
    if (!container) return;
    const ul = container.querySelector("ul");
    if (!ul) return;
    const items = ul.children;
    if (items.length === 0) return;

    const currentIdx = langScrollIndex;
    let newIdx: number;

    if (direction === "left") {
      newIdx = Math.max(0, currentIdx - 2);
    } else {
      // Check if we can still scroll right
      newIdx = Math.min(items.length - 1, currentIdx + 2);
      // If already at or past the last visible set, don't go further
      if (currentIdx >= items.length - 2) return;
    }

    const targetItem = items[newIdx] as HTMLElement;
    if (targetItem) {
      const offsetLeft = targetItem.offsetLeft;
      container.scrollTo({ left: offsetLeft, behavior: "smooth" });
      setLangScrollIndex(newIdx);
    }
  };

  // Check max scroll to disable right arrow
  const maxScrollIndex = LANGUAGES.length - 1;

  return (
    <div className="flex min-h-screen flex-col bg-snow">
      {/* ═══════════════════════════════════════════════════════════
           HERO BANNER (full viewport)
           Layout: nav → mascot(left) + headline/CTAs(right) → language strip
           ═══════════════════════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════════════════════
           HERO BANNER — pixel-accurate to duolingo.com
           Layout: flex column, header fills viewport
           Nav → [mascot(424px) | headline+CTAs(480px)] → language strip
           ═══════════════════════════════════════════════════════════ */}
      {/* ── Sticky navbar — border + Get started appear on scroll ── */}
      <nav
        className={`sticky top-0 z-50 flex items-center justify-center px-6 py-4 transition-all duration-300 ${
          scrolled
            ? "border-b border-swan bg-snow/95 backdrop-blur"
            : "border-b border-transparent bg-snow"
        }`}
      >
        <div className="flex w-[988px] max-w-full items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/assets/mascot_logo.svg" alt="duolingo" className="h-[52px]" />
            <span className="text-[32px] font-bold lowercase text-feather-green">duolingo</span>
          </Link>
          {scrolled ? (
            <Link
              href="/register"
              className="flex items-center justify-center border-b-4 border-feather-green-dark bg-feather-green text-white"
              style={{ height: "42px", borderRadius: "12px", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.8px", padding: "0 20px" }}
            >
              Get started
            </Link>
          ) : (
            <div className="group relative">
              <button className="flex items-center gap-2 text-[17px] font-bold text-wolf transition-colors hover:text-eel">
                Site language: English
                <img src="/chevron-down.svg" alt="" width={14} height={14} className="transition-transform duration-200 group-hover:rotate-180" />
              </button>
              {/* Dropdown — appears on hover */}
              <div className="invisible absolute right-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="grid w-[440px] grid-cols-2 gap-x-1 rounded-2xl border border-swan bg-white p-3 shadow-xl">
                  {SITE_LANGUAGES.map((lang) => (
                    <a
                      key={lang.code}
                      href={lang.href}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-[15px] font-medium text-eel transition-colors hover:bg-polar"
                    >
                      <img
                        src={`/flags/${lang.flag}.svg`}
                        alt={lang.name}
                        width={30}
                        height={22}
                        className="h-[22px] w-[30px] flex-shrink-0 rounded-[3px]"
                      />
                      {lang.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <header className="flex min-h-[calc(100vh-90px)] flex-col bg-snow">

        {/* ── Content: mascot (left) + headline/CTAs (right) ── */}
        <div
          className="mx-auto flex max-w-full flex-1 flex-row items-center justify-end"
          style={{ width: "988px", gap: "80px" }}
        >
          {/* Character group — real Duolingo hero Lottie (Duo swapped for our mascot) */}
          <div
            className="flex flex-shrink-0 items-end justify-center"
            style={{ width: "424px", height: "424px", marginRight: "-65px" }}
          >
            <HeroAnimation />
          </div>

          {/* Right column — headline + CTAs, 480px wide, centered text */}
          <div className="flex w-[480px] flex-shrink-0 flex-col items-center">
            <h1
              className="font-bold text-eel"
              style={{ fontSize: "32px", fontWeight: "700", lineHeight: "normal", width: "480px" }}
            >
              The free, fun, and effective way to learn a language!
            </h1>

            <div
              className="flex flex-col"
              style={{ width: "330px", gap: "12px", marginTop: "40px" }}
            >
              <Link
                href="/register"
                className="flex items-center justify-center border-b-4 border-feather-green-dark bg-feather-green text-white"
                style={{ width: "330px", height: "50px", borderRadius: "12px", fontSize: "15px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.8px" }}
              >
                Get started
              </Link>
              <button
                className="flex items-center justify-center border-b-4 border-swan bg-white text-macaw transition-colors hover:bg-polar"
                style={{ width: "330px", height: "50px", borderRadius: "12px", fontSize: "15px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.8px" }}
              >
                I already have an account
              </button>
            </div>
          </div>
        </div>

        {/* ── Language strip — scroll by 2, arrows disabled at boundaries ── */}
        <nav className="w-full bg-snow">
          <div className="mx-auto flex w-[988px] max-w-full items-center gap-2 px-6 py-6">
            {/* Left arrow — disabled at start */}
            <button
              onClick={() => scrollLangBar("left")}
              disabled={langScrollIndex === 0}
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-2xl transition-colors ${
                langScrollIndex === 0
                  ? "cursor-default text-swan"
                  : "cursor-pointer text-wolf hover:bg-polar"
              }`}
            >
              ‹
            </button>

            <div ref={langScrollRef} className="hide-scrollbar flex flex-1 items-center gap-2 overflow-x-auto scroll-smooth">
              <ul className="flex flex-shrink-0 items-center gap-2">
                {LANGUAGES.map((lang) => (
                  <li key={lang.name}>
                    <Link
                      href={lang.href}
                      className="flex items-center gap-2 whitespace-nowrap text-[17px] font-medium text-wolf transition-colors hover:text-eel"
                    >
                      <img
                        src={`/flags/${lang.flag}.svg`}
                        alt={lang.name}
                        width={36}
                        height={28}
                        className="h-[28px] w-[36px] flex-shrink-0"
                      />
                      {lang.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right arrow — disabled at end */}
            <button
              onClick={() => scrollLangBar("right")}
              disabled={langScrollIndex >= maxScrollIndex - 1}
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-2xl transition-colors ${
                langScrollIndex >= maxScrollIndex - 1
                  ? "cursor-default text-swan"
                  : "cursor-pointer text-wolf hover:bg-polar"
              }`}
            >
              ›
            </button>
          </div>
        </nav>
      </header>

      {/* ═══════════════════════════════════════════════════════════
           MAIN CONTENT — vertical feature sections
           ═══════════════════════════════════════════════════════════ */}
      <main>
        {/* ── free. fun. effective. — TEXT LEFT, IMAGE RIGHT ── */}
        <section className="bg-white">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center md:flex-row md:items-center">
            <div className="flex w-full flex-col items-start p-6 md:w-1/2 md:pl-[146px] md:pr-8">
              <h2 className="text-left font-extrabold text-feather-green" style={{ fontSize: "48px", lineHeight: 1.1 }}>
                free. fun. effective.
              </h2>
              <p className="mt-4 text-left text-[17px] font-medium leading-6 text-wolf">
                Learning with Duolingo is fun, and{" "}
                <Link href="/efficacy" className="font-bold text-macaw underline underline-offset-2">
                  research shows that it works
                </Link>
                ! With quick, bite-sized lessons, you&rsquo;ll earn points and unlock new levels while gaining real-world communication skills.
              </p>
            </div>
            <div className="flex w-full justify-center md:w-1/2">
              <Lottie src="/lottie/aea5aff1143a9410b81448245ad7c839.json" className="aspect-square w-[530px] max-w-full" />
            </div>
          </div>
        </section>

        {/* ── backed by science — IMAGE LEFT, TEXT RIGHT ── */}
        <section className="bg-white">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center md:flex-row md:items-center">
            <div className="flex w-full justify-center md:w-1/2 md:order-1">
              <Lottie src="/lottie/71b01cd301b53ec9879f2d06eb85f5db.json" className="aspect-square w-[530px] max-w-full" />
            </div>
            <div className="flex w-full flex-col items-start p-6 md:w-1/2 md:order-2 md:pr-[146px] md:pl-8">
              <h2 className="text-left font-extrabold text-feather-green" style={{ fontSize: "48px", lineHeight: 1.1 }}>
                backed by science
              </h2>
              <p className="mt-4 text-left text-[17px] font-medium leading-6 text-wolf">
                We use a combination of research-backed teaching methods and delightful content to create courses that effectively teach reading, writing, listening, and speaking skills!
              </p>
            </div>
          </div>
        </section>

        {/* ── stay motivated — TEXT LEFT, IMAGE RIGHT ── */}
        <section className="bg-white">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center md:flex-row md:items-center">
            <div className="flex w-full flex-col items-start p-6 md:w-1/2 md:pl-[146px] md:pr-8">
              <h2 className="text-left font-extrabold text-feather-green" style={{ fontSize: "48px", lineHeight: 1.1 }}>
                stay motivated
              </h2>
              <p className="mt-4 text-left text-[17px] font-medium leading-6 text-wolf">
                We make it easy to form a habit of language learning with game-like features, fun challenges, and reminders from our friendly mascot, Duo the owl.
              </p>
            </div>
            <div className="flex w-full justify-center md:w-1/2">
              <Lottie src="/lottie/82f26795696242931a7b905b4918eb1e.json" className="aspect-square w-[530px] max-w-full" />
            </div>
          </div>
        </section>

        {/* ── personalized learning — IMAGE LEFT, TEXT RIGHT ── */}
        <section className="bg-white">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center md:flex-row md:items-center">
            <div className="flex w-full justify-center md:w-1/2 md:order-1">
              <Lottie src="/lottie/e97b1cde32a58c629a0193eea36ddaab.json" className="aspect-square w-[530px] max-w-full" />
            </div>
            <div className="flex w-full flex-col items-start p-6 md:w-1/2 md:order-2 md:pr-[146px] md:pl-8">
              <h2 className="text-left font-extrabold text-feather-green" style={{ fontSize: "48px", lineHeight: 1.1 }}>
                personalized learning
              </h2>
              <p className="mt-4 text-left text-[17px] font-medium leading-6 text-wolf">
                Combining the best of AI and language science, lessons are tailored to help you learn at just the right level and pace.
              </p>
            </div>
          </div>
        </section>

        {/* ── learn anytime, anywhere — TEXT LEFT, IMAGE RIGHT ── */}
        <section className="bg-white">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center md:flex-row md:items-center">
            <div className="flex w-full flex-col items-start p-6 md:w-1/2 md:pl-[146px] md:pr-8">
              <h2 className="text-left font-extrabold text-feather-green" style={{ fontSize: "48px", lineHeight: 1.1 }}>
                learn anytime, anywhere
              </h2>
              <p className="mt-4 text-left text-[17px] font-medium leading-6 text-wolf">
                Learn on the go with our free app! Download lessons offline, practice anytime, and sync your progress across all your devices.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <AppStoreBadge store="apple" />
                <AppStoreBadge store="google" />
              </div>
            </div>
            <div className="flex w-full justify-center md:w-1/2">
              <Lottie src="/lottie/c16e90b93e35750c893be4b58720cef2.json" className="aspect-[41/23] w-[530px] max-w-full" />
            </div>
          </div>
        </section>

        {/* ── Super Duolingo promo — full viewport dark ── */}
        <section className="flex min-h-screen items-center justify-center overflow-hidden bg-eel">
          <div className="flex flex-col items-center gap-8 px-6 py-24 text-center">
            <img
              src="/characters/character-super-illustration.svg"
              alt="Super Duolingo"
              className="w-72 max-w-full"
            />
            <img
              src="/characters/super-duolingo-wordmark.svg"
              alt="Super Duolingo"
              className="h-10"
            />
            <button className="flex items-center justify-center border-b-4 border-eel bg-white text-eel" style={{ height: "50px", borderRadius: "12px", fontSize: "15px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.8px", padding: "0 24px" }}>
              Try 1 week free
            </button>
          </div>
        </section>

        {/* ── duolingo english test — TEXT LEFT, IMAGE RIGHT ── */}
        <section className="bg-white">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center md:flex-row md:items-center">
            <div className="flex w-full flex-col items-start p-6 md:w-1/2 md:pl-[146px] md:pr-8">
              <h2 className="text-left font-extrabold text-feather-green" style={{ fontSize: "48px", lineHeight: 1.1 }}>
                duolingo english&nbsp;test
              </h2>
              <p className="mt-4 text-left text-[17px] font-medium leading-6 text-wolf">
                Our convenient, fast, and affordable English test integrates the latest assessment science and AI &mdash; empowering anyone to accurately test their English where and when they&rsquo;re at their best.
              </p>
              <Link
                href="https://englishtest.duolingo.com/en"
                className="mt-6 text-[17px] font-bold text-macaw underline underline-offset-2"
              >
                Certify your English
              </Link>
            </div>
            <div className="flex w-full justify-center md:w-1/2">
              <Lottie src="/lottie/2c6db87220e7de95124c1a2882afd64f.json" className="aspect-square w-[530px] max-w-full" />
            </div>
          </div>
        </section>

        {/* ── duolingo for schools — IMAGE LEFT, TEXT RIGHT ── */}
        <section className="bg-white">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center md:flex-row md:items-center">
            <div className="flex w-full justify-center md:w-1/2 md:order-1">
              <Lottie src="/lottie/d69c05e332d40f318009fefd85bfcd43.json" className="aspect-square w-[530px] max-w-full" />
            </div>
            <div className="flex w-full flex-col items-start p-6 md:w-1/2 md:order-2 md:pr-[146px] md:pl-8">
              <h2 className="text-left font-extrabold text-feather-green" style={{ fontSize: "48px", lineHeight: 1.1 }}>
                duolingo for schools
              </h2>
              <p className="mt-4 text-left text-[17px] font-medium leading-6 text-wolf">
                Teachers, we&rsquo;re here to help you! Our free tools support your students as they learn languages through the Duolingo app, both in and out of the classroom.
              </p>
              <Link
                href="https://schools.duolingo.com"
                className="mt-6 text-[17px] font-bold text-macaw underline underline-offset-2"
              >
                Get your class started
              </Link>
            </div>
          </div>
        </section>

        {/* ── duolingo abc — TEXT LEFT, IMAGE RIGHT ── */}
        <section className="bg-white">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center md:flex-row md:items-center">
            <div className="flex w-full flex-col items-start p-6 md:w-1/2 md:pl-[146px] md:pr-8">
              <h2 className="text-left font-extrabold text-feather-green" style={{ fontSize: "48px", lineHeight: 1.1 }}>
                duolingo abc
              </h2>
              <p className="mt-4 text-left text-[17px] font-medium leading-6 text-wolf">
                From language to literacy! With fun phonics lessons and delightful stories, Duolingo ABC helps kids ages 3&ndash;8 learn to read and write &mdash; 100% free.
              </p>
              <Link
                href="/abc"
                className="mt-6 text-[17px] font-bold text-macaw underline underline-offset-2"
              >
                Learn more about ABC
              </Link>
            </div>
            <div className="flex w-full justify-center md:w-1/2">
              <Lottie src="/lottie/76f61a943cfc8aa61dd79aea33db7a62.json" className="aspect-square w-[530px] max-w-full" />
            </div>
          </div>
        </section>

        {/* ── Final CTA — green section ── */}
        <section className="bg-feather-green">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center px-6 py-24 text-center">
            <Lottie src="/lottie/9b9c41cb3a201cad24a2f18f90f4d564.json" className="aspect-[48/27] w-48" />
            <h2 className="mt-6 font-extrabold text-white" style={{ fontSize: "48px", lineHeight: 1.2 }}>
              learn a language with duolingo
            </h2>
            <Link
              href="/register"
              className="flex items-center justify-center border-b-4 border-eel bg-white text-feather-green"
              style={{ height: "50px", borderRadius: "12px", fontSize: "15px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.8px", padding: "0 24px", marginTop: "40px" }}
            >
              Get started
            </Link>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════════
           FOOTER
           ═══════════════════════════════════════════════════════════ */}
      <footer className="bg-eel text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-6">
            {/* About us */}
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.04em] text-white/60">
                About us
              </h3>
              <ul className="space-y-2 text-sm font-semibold text-white/80">
                <li><Link href="/courses" className="hover:text-white">Courses</Link></li>
                <li><Link href="https://about.duolingo.com" className="hover:text-white">Mission</Link></li>
                <li><Link href="/efficacy" className="hover:text-white">Efficacy</Link></li>
                <li><Link href="https://careers.duolingo.com" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            {/* Products */}
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.04em] text-white/60">
                Products
              </h3>
              <ul className="space-y-2 text-sm font-semibold text-white/80">
                <li><Link href="/" className="hover:text-white">Duolingo</Link></li>
                <li><Link href="/super" className="hover:text-white">Super Duolingo</Link></li>
                <li><Link href="https://englishtest.duolingo.com/en" className="hover:text-white">English Test</Link></li>
                <li><Link href="https://schools.duolingo.com" className="hover:text-white">For Schools</Link></li>
              </ul>
            </div>
            {/* Apps */}
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.04em] text-white/60">
                Apps
              </h3>
              <ul className="space-y-2 text-sm font-semibold text-white/80">
                <li><Link href="#" className="hover:text-white">iOS</Link></li>
                <li><Link href="#" className="hover:text-white">Android</Link></li>
              </ul>
            </div>
            {/* Help */}
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.04em] text-white/60">
                Help
              </h3>
              <ul className="space-y-2 text-sm font-semibold text-white/80">
                <li><Link href="/help" className="hover:text-white">FAQs</Link></li>
                <li><Link href="https://status.duolingo.com" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
            {/* Privacy */}
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.04em] text-white/60">
                Privacy
              </h3>
              <ul className="space-y-2 text-sm font-semibold text-white/80">
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/guidelines" className="hover:text-white">Guidelines</Link></li>
              </ul>
            </div>
            {/* Social */}
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.04em] text-white/60">
                Social
              </h3>
              <ul className="space-y-2 text-sm font-semibold text-white/80">
                <li><Link href="https://instagram.com/duolingo" className="hover:text-white">Instagram</Link></li>
                <li><Link href="https://tiktok.com/@duolingo" className="hover:text-white">TikTok</Link></li>
                <li><Link href="https://youtube.com/user/duolingo" className="hover:text-white">YouTube</Link></li>
                <li><Link href="https://twitter.com/duolingo" className="hover:text-white">Twitter</Link></li>
              </ul>
            </div>
          </div>

          <hr className="my-8 border-white/10" />

          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} Duolingo
            </p>
            <button className="flex items-center gap-1 text-xs font-semibold text-white/60 hover:text-white">
              Site language: English
              <span>&#9662;</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
