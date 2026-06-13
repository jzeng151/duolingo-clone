"use client";

import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   Lottie — renders a Duolingo animation JSON via lottie-web.
   Lazy: the player only loads + plays once scrolled near the
   viewport, so a page full of heavy SVG animations stays smooth.

   idleFrom/idleTo: this animation is a one-shot "tumble out and
   settle." We play the intro once, then loop the idle range
   [idleFrom, idleTo] forward forever. That range is one full idle
   period whose start and end poses match, so the loop is seamless
   — the sprites float in place with no jump-cut reset.
   ═══════════════════════════════════════════════════════════════ */
export default function Lottie({
  src,
  className,
  loop = true,
  idleFrom,
  idleTo,
}: {
  src: string;
  className?: string;
  loop?: boolean;
  idleFrom?: number;
  idleTo?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    type Anim = {
      destroy: () => void;
      loop: boolean;
      totalFrames: number;
      addEventListener: (e: string, cb: () => void) => void;
      playSegments: (s: number[] | number[][], force: boolean) => void;
    };
    let anim: Anim | null = null;
    let cancelled = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !anim) {
          import("lottie-web").then((m) => {
            if (cancelled || !ref.current) return;
            anim = m.default.loadAnimation({
              container: ref.current,
              renderer: "svg",
              loop: idleFrom == null ? loop : false,
              autoplay: idleFrom == null,
              path: src,
            }) as unknown as Anim;

            if (idleFrom != null) {
              const a = anim;
              let pinged = false;
              a.addEventListener("DOMLoaded", () => {
                a.playSegments([0, idleTo ?? a.totalFrames], true);
              });
              a.addEventListener("complete", () => {
                if (pinged) return;
                pinged = true;
                a.loop = true;
                a.playSegments([idleFrom, idleTo ?? a.totalFrames], true);
              });
            }
          });
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      anim?.destroy();
    };
  }, [src, loop, idleFrom, idleTo]);

  return <div ref={ref} className={className} aria-hidden="true" />;
}
