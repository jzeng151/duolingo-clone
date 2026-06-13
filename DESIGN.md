---
version: alpha
name: Duolingo Clone
description: >-
  Playful, approachable, and bold. Duolingo's visual identity centers on a
  cheerful green owl mascot, rounded friendly type, and generous white space.
  The tone is irreverent and fun while remaining clear and trustworthy.
colors:
  # ── Canonical alias (required by tooling) ──
  primary: "#58CC02"
  # ── Core brand colors (from Duo's body) ──
  feather-green: "#58CC02"
  mask-green: "#89E219"
  eel: "#4B4B4B"
  snow: "#FFFFFF"
  # ── Secondary colors (UI accents & illustrations) ──
  macaw: "#1CB0F6"
  cardinal: "#FF4B4B"
  bee: "#FFC800"
  fox: "#FF9600"
  beetle: "#CE82FF"
  humpback: "#2B70C9"
  # ── Neutrals (hierarchy & utility) ──
  wolf: "#777777"
  hare: "#AFAFAF"
  swan: "#E5E5E5"
  polar: "#F7F7F7"
  # ── Duo-specific palette ──
  wing-overlay: "#43C000"
  beak-inner: "#B66E28"
  beak-lower: "#F49000"
  beak-upper: "#FFC200"
  beak-highlight: "#FFDE00"
  tongue-pink: "#FFCAFF"
  # ── Functional / surface ──
  bg-page: "#FFFFFF"
  bg-herogreen: "#D7FFDB"
  text-primary: "#4B4B4B"
  text-secondary: "#777777"
  link-default: "#1CB0F6"
  border-light: "#E5E5E5"
typography:
  h1:
    fontFamily: "'Nunito', sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "'Nunito', sans-serif"
    fontSize: "2rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h3:
    fontFamily: "'Nunito', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body-lg:
    fontFamily: "'Nunito', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0em"
  body-md:
    fontFamily: "'Nunito', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0em"
  body-sm:
    fontFamily: "'Nunito', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  label:
    fontFamily: "'Nunito', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.08em"
rounded:
  sm: "4px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  4xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.feather-green}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "16px 24px"
    typography: "{typography.body-md}"
  button-primary-hover:
    backgroundColor: "#47B300"
    textColor: "#FFFFFF"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.eel}"
    rounded: "{rounded.full}"
    padding: "16px 24px"
    typography: "{typography.body-sm}"
  nav-bar:
    backgroundColor: "{colors.snow}"
    textColor: "{colors.eel}"
    height: "64px"
    padding: "0 24px"
  section-feature:
    backgroundColor: "{colors.snow}"
    padding: "96px 24px"
  footer:
    backgroundColor: "{colors.eel}"
    textColor: "{colors.snow}"
    padding: "64px 24px"
---

## Overview

Duolingo's visual identity is built around three pillars: **playful**, **approachable**, and **bold**. The mascot Duo (a round green owl) is the emotional anchor. The design system uses rounded shapes, a custom bold typeface (Feather Bold), generous white space, and a vibrant green-driven palette to create a feeling that language learning is fun — not intimidating.

Every page should feel like it's smiling at you.

**Source:** [Duolingo Brand Guidelines](https://design.duolingo.com)

## Colors

### Core brand colors

These four colors are taken directly from Duo's body and form the backbone of every Duolingo surface:

- **Feather Green (#58CC02):** The single most recognizable color. Used for primary CTAs, active states, key highlights, and Duo's body. "When in doubt, lean into green!"
- **Mask Green (#89E219):** Secondary green. Used for Duo's mask area and supporting green surfaces.
- **Eel (#4B4B4B):** The primary text color. Warm dark gray, not pure black. Used for headings and body text.
- **Snow (#FFFFFF):** Primary background color. The default canvas.

### Secondary colors

Vibrant accents for UI elements, illustrations, and delightful splashes:

- **Macaw (#1CB0F6):** Blue — links, info states, water/ice themed content
- **Cardinal (#FF4B4B):** Red — errors, warnings, hearts/lives
- **Bee (#FFC800):** Yellow — gold/streaks, achievements, star ratings
- **Fox (#FF9600):** Orange — XP, energy, secondary CTAs, Duo's beak
- **Beetle (#CE82FF):** Purple — premium (Super Duolingo), magic/special content
- **Humpback (#2B70C9):** Dark blue — deep links, trust elements

### Neutrals

Provide hierarchy without competing with core and secondary colors:

- **Eel (#4B4B4B):** Primary text
- **Wolf (#777777):** Secondary text, labels
- **Hare (#AFAFAF):** Disabled states, placeholders
- **Swan (#E5E5E5):** Borders, dividers
- **Polar (#F7F7F7):** Subtle backgrounds, cards
- **Snow (#FFFFFF):** Page background

### Surface colors

- **bg-page (#FFFFFF):** Default page background — always white, never gray
- **bg-herogreen (#D7FFDB):** Soft mint-green used behind the hero section for a subtle green wash

## Typography

### Primary typeface: Feather Bold (bespoke) → Nunito as substitute

Feather Bold is Duolingo's custom typeface, bespoke and unavailable externally. **Nunito** (Google Fonts) is the official substitute recommended by Duolingo's brand guidelines — it shares the same rounded, friendly geometric character.

**Rules:**
- Always use **lowercase** for headlines. Never all caps. (Capitals only for proper nouns.)
- Leading: 100–110% for headlines
- Tracking: -0.02em (roughly -20 units at 1000 UPEm)
- Never below 30px on screen
- Keep headlines under 10 words; if longer, switch to DIN Next Rounded (Nunito regular/light weight)
- Always left-aligned or centered. Never fully justified.
- Never hyphenated

### Secondary typeface: DIN Next Rounded → Nunito as substitute

Used for body copy, subheadings, and long headlines (>10 words).

**Rules:**
- Leading: 140%
- Tracking: 0 (normal)
- Never below 14px on screen
- Left-aligned or centered. Never fully justified.

### Type hierarchy

When combining both:
- Feather Bold (bold Nunito) is always the star — 150% larger than body text
- DIN Next Rounded (regular Nunito) supports it, never larger
- Never mix both in the same sentence

### Heading scale (screen)

| Role | Size | Weight | Tracking | Leading |
|------|------|--------|----------|---------|
| H1 / Hero headline | 48px (3rem) | 800 | -0.02em | 1.1 |
| H2 / Section heading | 32px (2rem) | 800 | -0.02em | 1.1 |
| H3 / Subheading | 24px (1.5rem) | 700 | -0.01em | 1.2 |
| Body large | 18px | 400 | 0 | 1.4 |
| Body | 16px | 400 | 0 | 1.4 |
| Body small / caption | 14px | 400 | 0 | 1.5 |
| Label / overline | 12px | 700 | 0.08em | 1.5 |

## Layout & Spacing

### Page structure

Duolingo's landing page uses a **single-column, full-width, vertically stacked** layout. There are no sidebar cards or dashboard-style grids. Each content section spans the full viewport width and is constrained only by a max-width container for text readability.

- **Max content width:** 960px (centered)
- **Hero section:** Full viewport height, centered content (text + mascot illustration + CTA)
- **Content sections:** Full-width bands, alternating between white and subtle green backgrounds, generous vertical padding (96px+)
- **Footer:** Full-width dark (Eel) background, multi-column link grid

### Grid

The landing page does NOT use a multi-column card grid. It's a **single-column editorial layout** — one heading + one paragraph per section, stacked vertically. This is the key difference from a dashboard.

### Spacing scale

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight inline gaps |
| sm | 8px | Small element spacing |
| md | 16px | Standard padding, gaps |
| lg | 24px | Section padding (horizontal) |
| xl | 32px | Card padding |
| 2xl | 48px | Between elements in a section |
| 3xl | 64px | Section top/bottom padding |
| 4xl | 96px | Major section separation |

## Elevation & Depth

Duolingo's landing page is **flat** — it deliberately avoids card shadows, drop shadows, and layered surfaces. Content sits directly on the background.

- **No card borders or shadows** on content sections
- **No box shadows** on the hero
- The only shadows appear on **buttons** (subtle pressed/lifted states) and the **mascot illustration** (optional)
- Cards and panels, when used in the app UI (not the landing page), get a very subtle border (`1px solid {swan}`) with no shadow

## Shapes

Everything is **rounded**. Duolingo avoids sharp corners entirely:

- **Buttons:** Fully rounded (pill shape, 9999px border-radius)
- **Cards/panels:** 16px radius
- **Avatars/icons:** Circular
- **Illustrations:** Organic, bubbly shapes with no hard edges

## Components

### Button — Primary (Get Started)

The hero CTA is the most important interactive element. It must be impossible to miss:

- Background: Feather Green (#58CC02)
- Text: White, 16px, weight 700
- Border-radius: Full pill (9999px)
- Padding: 16px vertical, 24px+ horizontal
- Hover: Darker green (#47B300)
- No border, no shadow (or very subtle)
- Text is **UPPERCASE** on the landing page ("GET STARTED")

### Button — Secondary (I ALREADY HAVE AN ACCOUNT)

- Background: transparent
- Text: Eel (#4B4B4B), 14px, weight 700
- Border: 2px solid Eel (#4B4B4B)
- Border-radius: Full pill
- **UPPERCASE** text
- Hover: Subtle background fill

### Navigation bar

- Fixed/sticky at top
- White background (#FFFFFF)
- Contains: Duolingo wordmark logo (left), language selector (right)
- Height: ~64px
- Subtle bottom border or none
- Clean, minimal — no heavy chrome

### Hero section

- Full viewport height
- Centered layout
- Contains (top to bottom): Duo owl illustration (large), H1 headline text, "Get Started" button, "I ALREADY HAVE AN ACCOUNT" button
- Optionally: language course carousel below the CTAs
- Background: White or very subtle green wash (#D7FFDB)

### Feature sections

Each section has:
- H2 heading in lowercase bold (e.g., "free. fun. effective.")
- Body paragraph below
- Full-width, no card container
- Generous vertical spacing (96px between sections)

### Footer

- Dark background (Eel #4B4B4B)
- Multi-column layout (4-6 columns of links)
- White text
- Contains: About, Products, Apps, Help, Privacy, Social links
- Language selector at bottom

## Do's and Don'ts

### Do

- **Use lowercase headlines** — "free. fun. effective." not "Free. Fun. Effective."
- **Center the hero** — text and mascot centered together
- **Make the CTA green and pill-shaped** — it should look like a Duolingo button
- **Leave generous white space** — sections breathe
- **Use the mascot** — Duo is the brand's most recognizable asset
- **Keep it flat** — no heavy shadows or card borders on the landing page
- **Use Nunito** as the typeface — it's the official substitute for Feather Bold

### Don't

- **Don't use all-caps headlines** (buttons can be uppercase, headings cannot)
- **Don't use a multi-column dashboard layout** for the landing page
- **Don't use dark/navy/black buttons** — the primary CTA is always green
- **Don't use card shadows on content sections** — they should be flat
- **Don't use sharp corners** — everything is rounded
- **Don't hyphenate text**
- **Don't justify text** — left-align or center only
- **Don't use gray or slate backgrounds** — the page is white with green accents
- **Don't use the green as a full page background** — it's an accent, not a canvas
