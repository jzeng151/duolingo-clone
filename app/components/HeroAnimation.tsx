"use client";

import Lottie from "./Lottie";

/* ═══════════════════════════════════════════════════════════════
   HeroAnimation — Duolingo's hero character group, animated.
   This is the real duolingo.com hero Lottie with Duo the owl's
   artwork swapped for our mascot: the mascot is embedded as an
   image layer driven by Duo's original body transform, so it
   tumbles out of the phone, spins upright, and idle-bobs exactly
   the way Duo does — perfectly in sync with the rest of the cast.

   The cast tumbles out of the phone once, then loops the idle
   range [124, 204] — one full idle period whose endpoints match —
   so it floats in place seamlessly and never snaps back.
   ═══════════════════════════════════════════════════════════════ */
export default function HeroAnimation() {
  return (
    <Lottie
      src="/lottie/hero-mascot.json"
      className="h-full w-full"
      idleFrom={124}
      idleTo={204}
    />
  );
}
