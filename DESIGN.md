# Design System

This document defines the visual language for the Duolingo clone. Follow these specs exactly — consistency is what makes the app feel like Duolingo.

---

## Colors

### Primary Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Duo Green** | `#58CC02` | Primary buttons, active states, correct answer highlight, streak icon |
| **Duo Green Dark** | `#46A302` | Button hover/pressed state for green buttons |
| **Duo Green Light** | `#D7FFB8` | Correct answer feedback background |
| **Duo Blue** | `#1CB0F6` | Links, secondary actions, info highlights |
| **Duo Blue Dark** | `#0D94D0` | Blue button hover/pressed |
| **Duo Orange** | `#FF9600` | XP counter, flame/streak icon, warning states |
| **Duo Red** | `#FF4B4B` | Wrong answer feedback, error states, hearts |
| **Duo Red Light** | `#FFD2D2` | Wrong answer feedback background |

### Neutral Palette

| Name | Hex | Usage |
|------|-----|-------|
| **White** | `#FFFFFF` | Page background, card backgrounds |
| **Gray 50** | `#F7F7F7` | Subtle section backgrounds |
| **Gray 100** | `#E5E5E5` | Borders, dividers, disabled button backgrounds |
| **Gray 300** | `#AFAFAF` | Placeholder text, disabled text |
| **Gray 600** | `#777777` | Secondary text, labels |
| **Gray 900** | `#3C3C3C` | Body text, primary text |
| **Black** | `#1F1F1F` | Headings, high-contrast text |

### Tailwind Config — add custom colors

To use names like `bg-duo-green` instead of `bg-[#58CC02]` everywhere, add this to `tailwind.config.ts` under `theme.extend.colors`:

```js
colors: {
  'duo-green':       '#58CC02',
  'duo-green-dark':  '#46A302',
  'duo-green-light': '#D7FFB8',
  'duo-blue':        '#1CB0F6',
  'duo-blue-dark':   '#0D94D0',
  'duo-orange':      '#FF9600',
  'duo-red':         '#FF4B4B',
  'duo-red-light':   '#FFD2D2',
  'gray-border':     '#E5E5E5',
  'gray-text':       '#3C3C3C',
  'gray-muted':      '#AFAFAF',
},
```

After adding this, you can write `bg-duo-green` instead of `bg-[#58CC02]` anywhere in the project.

### Semantic Colors

| State | Background | Border | Text |
|-------|-----------|--------|------|
| Correct | `#D7FFB8` | `#58CC02` | `#3C3C3C` |
| Wrong | `#FFD2D2` | `#FF4B4B` | `#3C3C3C` |
| Disabled | `#E5E5E5` | `#E5E5E5` | `#AFAFAF` |

---

## Typography

Duolingo uses **DIN Round Pro** for headings and **Nunito** as the body/fallback font. Both are rounded, friendly, and highly legible.

### Font Families

```css
/* Heading font — DIN Round Pro (load via Adobe Fonts or equivalent) */
font-family: 'DIN Round Pro', 'Nunito', 'Varela Round', sans-serif;

/* Body font — Nunito (available free on Google Fonts) */
font-family: 'Nunito', 'Varela Round', sans-serif;
```

> **Note for Bath:** If DIN Round Pro isn't available, use Nunito for everything. It's free on Google Fonts and very close in feel.

**How to add Nunito to the project** — put this in `src/app/layout.tsx`:
```tsx
import { Nunito } from 'next/font/google'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="font-[var(--font-nunito)]">{children}</body>
    </html>
  )
}
```

Then add this to `tailwind.config.ts` under `theme.extend`:
```js
fontFamily: {
  sans: ['var(--font-nunito)', 'sans-serif'],
},
```

After that, Tailwind's default `font-sans` will use Nunito everywhere automatically.

### Type Scale

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| `display` | 32px / 2rem | 800 (ExtraBold) | Completion screen headline ("You're on fire!") |
| `heading-1` | 24px / 1.5rem | 700 (Bold) | Page titles, section headers |
| `heading-2` | 20px / 1.25rem | 700 (Bold) | Card titles, exercise prompts |
| `body-lg` | 18px / 1.125rem | 600 (SemiBold) | Answer options, primary UI text |
| `body` | 16px / 1rem | 400 (Regular) | Body text, descriptions |
| `body-sm` | 14px / 0.875rem | 400 (Regular) | Labels, captions, secondary text |
| `caption` | 12px / 0.75rem | 400 (Regular) | Fine print, tooltips |

---

## Buttons

Duolingo buttons have a distinctive 3D "raised" look — a solid bottom border that makes them look like physical buttons.

### Primary Button (Green)

```
Background:     #58CC02
Bottom border:  4px solid #46A302   ← this creates the 3D raised effect
Border radius:  12px
Text color:     #FFFFFF
Font:           18px / 700 (Bold)
Padding:        16px 32px
Text transform: UPPERCASE
Letter spacing: 0.05em

Hover:  background shifts to #46A302, bottom border shrinks to 2px (button "presses down")
Active: same as hover
Disabled: background #E5E5E5, border #E5E5E5, text #AFAFAF, cursor not-allowed
```

**Tailwind classes:**
```jsx
<button className="
  w-full rounded-xl
  bg-[#58CC02] border-b-4 border-[#46A302]
  px-8 py-4
  text-white text-lg font-bold uppercase tracking-wide
  hover:bg-[#46A302] hover:border-b-2 active:border-b-2
  disabled:bg-[#E5E5E5] disabled:border-[#E5E5E5] disabled:text-[#AFAFAF] disabled:cursor-not-allowed
  transition-all duration-100
">
  CHECK
</button>
```

### Secondary Button (White/Outlined)

```
Background:     #FFFFFF
Border:         2px solid #E5E5E5
Bottom border:  4px solid #E5E5E5
Border radius:  12px
Text color:     #3C3C3C
Font:           18px / 700 (Bold)
Padding:        16px 32px
Text transform: UPPERCASE
Letter spacing: 0.05em
```

**Tailwind classes:**
```jsx
<button className="
  w-full rounded-xl
  bg-white border-2 border-b-4 border-[#E5E5E5]
  px-8 py-4
  text-[#3C3C3C] text-lg font-bold uppercase tracking-wide
  hover:bg-[#F7F7F7]
  transition-all duration-100
">
  SKIP
</button>
```

### Danger Button (Red)

Same structure as Primary but with `#FF4B4B` background and `#CC0000` bottom border. Used for destructive actions and error states.

**Tailwind classes:**
```jsx
<button className="
  w-full rounded-xl
  bg-[#FF4B4B] border-b-4 border-[#CC0000]
  px-8 py-4
  text-white text-lg font-bold uppercase tracking-wide
  hover:bg-[#CC0000] hover:border-b-2
  transition-all duration-100
">
  TRY AGAIN
</button>
```

---

## Cards & Surfaces

### Answer Option Card (for translate / multiple choice)

```
Background:     #FFFFFF
Border:         2px solid #E5E5E5
Bottom border:  4px solid #E5E5E5
Border radius:  12px
Padding:        16px
Font:           18px / 600

Selected (before submit):
  Border:       2px solid #1CB0F6
  Bottom:       4px solid #1CB0F6
  Background:   #F0F8FF

Correct (after submit):
  Border:       2px solid #58CC02
  Background:   #D7FFB8

Wrong (after submit):
  Border:       2px solid #FF4B4B
  Background:   #FFD2D2
```

**Tailwind classes (use conditional classes based on state):**
```jsx
// Default (unselected)
<button className="w-full rounded-xl bg-white border-2 border-b-4 border-[#E5E5E5] p-4 text-lg font-semibold text-left transition-all duration-100 hover:bg-[#F7F7F7]">
  el gato
</button>

// Selected (user clicked but hasn't submitted yet)
<button className="w-full rounded-xl bg-[#F0F8FF] border-2 border-b-4 border-[#1CB0F6] p-4 text-lg font-semibold text-left">
  el gato
</button>

// Correct (after submit)
<button className="w-full rounded-xl bg-[#D7FFB8] border-2 border-b-4 border-[#58CC02] p-4 text-lg font-semibold text-left" disabled>
  el gato
</button>

// Wrong (after submit)
<button className="w-full rounded-xl bg-[#FFD2D2] border-2 border-b-4 border-[#FF4B4B] p-4 text-lg font-semibold text-left animate-shake" disabled>
  el perro
</button>
```

### Feedback Drawer (bottom sheet)

```
Background:     #D7FFB8 (correct) or #FFD2D2 (wrong)
Border top:     3px solid #58CC02 (correct) or #FF4B4B (wrong)
Padding:        24px
Position:       fixed, bottom 0, full width
Min height:     140px
Border radius:  20px 20px 0 0 (rounded top corners only)

Correct icon:   ✓ checkmark in #58CC02
Wrong icon:     ✗ in #FF4B4B, followed by "Correct answer:" in gray text
Continue button: Green primary button, full width
```

**Tailwind classes:**
```jsx
// Correct drawer
<div className="fixed bottom-0 left-0 right-0 rounded-t-[20px] bg-[#D7FFB8] border-t-4 border-[#58CC02] p-6 min-h-[140px] flex flex-col gap-4">
  <div className="flex items-center gap-2">
    <span className="text-[#58CC02] text-2xl font-bold">✓</span>
    <span className="text-[#3C3C3C] text-lg font-bold">Nice work!</span>
  </div>
  {/* Green primary button */}
</div>

// Wrong drawer
<div className="fixed bottom-0 left-0 right-0 rounded-t-[20px] bg-[#FFD2D2] border-t-4 border-[#FF4B4B] p-6 min-h-[140px] flex flex-col gap-4">
  <div className="flex items-center gap-2">
    <span className="text-[#FF4B4B] text-2xl font-bold">✗</span>
    <span className="text-[#3C3C3C] text-lg font-bold">Correct answer: <span className="font-normal">el gato</span></span>
  </div>
  {/* Red danger button */}
</div>
```

---

## Progress Bar

```
Track background:  #E5E5E5
Fill:              #58CC02
Height:            16px
Border radius:     8px (fully rounded ends)
Transition:        width 400ms ease-in-out
```

**Tailwind classes:**
```jsx
// progress is a number from 0 to 100
<div className="w-full bg-[#E5E5E5] rounded-lg h-4 overflow-hidden">
  <div
    className="h-full bg-[#58CC02] rounded-lg transition-all duration-400 ease-in-out"
    style={{ width: `${progress}%` }}
  />
</div>
```

---

## Icons & Illustrations

- **Streak flame:** Use the emoji 🔥 or an SVG flame icon in `#FF9600`.
- **XP bolt:** ⚡ or an SVG lightning bolt in `#FF9600`.
- **Heart:** ❤️ or a heart SVG in `#FF4B4B`.
- **Duo (the owl):** The Duolingo mascot is trademarked. For this clone, either use a placeholder icon or a green owl SVG you draw yourself. Do not copy Duolingo's exact owl artwork.

---

## Spacing

Use a base-4 spacing scale (4, 8, 12, 16, 24, 32, 48, 64px). In Tailwind terms: `p-1 p-2 p-3 p-4 p-6 p-8 p-12 p-16`.

---

## Border Radius

| Element | Radius |
|---------|--------|
| Buttons | 12px (`rounded-xl`) |
| Cards / option tiles | 12px (`rounded-xl`) |
| Feedback drawer | 20px top corners only |
| Progress bar | 8px (`rounded-lg`) |
| Input fields | 8px (`rounded-lg`) |

---

## Animations & Transitions

Duolingo's feel comes from small, snappy animations. Keep them fast — they should feel instant, not slow.

| Interaction | Animation |
|-------------|-----------|
| Answer submitted → feedback shows | Feedback drawer slides up from bottom, `300ms ease-out` |
| Correct answer | Brief green flash on the selected card, then drawer slides up |
| Wrong answer | Brief red shake on the selected card (`shake` keyframe, 300ms), then drawer slides up |
| Progress bar advance | Width transition, `400ms ease-in-out` |
| Completion screen appears | Fade in + scale up from 0.95, `300ms ease-out` |
| XP counter | Animate the number counting up over `600ms` |

### Tailwind Config — custom animation for wrong answer shake

```js
// tailwind.config.js
theme: {
  extend: {
    keyframes: {
      shake: {
        '0%, 100%': { transform: 'translateX(0)' },
        '20%':       { transform: 'translateX(-6px)' },
        '40%':       { transform: 'translateX(6px)' },
        '60%':       { transform: 'translateX(-4px)' },
        '80%':       { transform: 'translateX(4px)' },
      },
    },
    animation: {
      shake: 'shake 0.3s ease-in-out',
    },
  },
},
```

---

## Layout

### Max Width

Lesson content is centered and capped at `640px` wide on desktop. On mobile it fills the screen edge-to-edge with `16px` horizontal padding.

```css
.lesson-container {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 16px;
}
```

**Tailwind equivalent:**
```jsx
<div className="max-w-2xl mx-auto px-4">
  {/* all lesson content goes here */}
</div>
```

### Lesson Screen Layout (top to bottom)

```
┌────────────────────────────────────┐
│  [X close]  [████████░░░░] progress│  ← fixed top bar, 64px tall
├────────────────────────────────────┤
│                                    │
│         Exercise prompt            │  ← ~40% of remaining height
│         (question text)            │
│                                    │
├────────────────────────────────────┤
│   [ Answer option A ]              │
│   [ Answer option B ]              │  ← answer options, centered
│   [ Answer option C ]              │
│   [ Answer option D ]              │
│                                    │
└────────────────────────────────────┘
         ↑ feedback drawer slides up here when answer submitted
```

---

## Responsive Breakpoints

```
Mobile first. Design for 375px width as the base.
sm: 640px   — tablet portrait
md: 768px   — tablet landscape / small laptop
lg: 1024px  — desktop
```

On mobile, the feedback drawer is full width. On desktop, it matches the 640px content container.

---

## Dark Mode

Not in scope for Milestone 1. Do not add dark mode styles now — they'll conflict when we add them properly later.
