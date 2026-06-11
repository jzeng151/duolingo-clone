"use client";

import { useState, useEffect, useCallback } from "react";

const images = [
  { id: 1, label: "Sunday Service",      gradient: "from-midnight via-navy to-midnight-800" },
  { id: 2, label: "Worship Night",       gradient: "from-midnight-800 via-midnight to-navy"  },
  { id: 3, label: "Community Day",       gradient: "from-navy via-midnight-800 to-midnight"  },
  { id: 4, label: "Youth Conference",    gradient: "from-midnight to-midnight-800 via-navy"  },
  { id: 5, label: "Prayer Gathering",    gradient: "from-midnight-800 to-midnight via-navy"  },
  { id: 6, label: "Women's Ministry",    gradient: "from-navy to-midnight-800 via-midnight"  },
  { id: 7, label: "Men's Breakfast",     gradient: "from-midnight via-navy to-midnight-900"  },
  { id: 8, label: "Christmas Service",   gradient: "from-midnight-900 via-midnight to-navy"  },
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const close = useCallback(() => setSelected(null), []);
  const prev  = useCallback(() =>
    setSelected((s) => (s !== null ? (s === 0 ? images.length - 1 : s - 1) : null)), []);
  const next  = useCallback(() =>
    setSelected((s) => (s !== null ? (s === images.length - 1 ? 0 : s + 1) : null)), []);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     close();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, close, prev, next]);

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setSelected(i)}
            className={`group relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br ${img.gradient} hover:scale-[1.03] transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2`}
          >
            {/* Gold shimmer on hover */}
            <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/8 transition-colors duration-300" />

            {/* Zoom icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/20">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>

            {/* Label slide-up */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-xs font-semibold">{img.label}</p>
            </div>

            {/* Gold bottom line accent */}
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          style={{ animation: "fade-in 0.2s ease-out both" }}
          onClick={close}
        >
          <div
            className="relative w-full max-w-4xl mx-4 lg:mx-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image display */}
            <div
              className={`relative w-full aspect-video rounded-2xl bg-gradient-to-br ${images[selected].gradient} overflow-hidden shadow-2xl`}
              style={{ animation: "fade-up 0.25s ease-out both" }}
            >
              {/* Gold cross watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <svg viewBox="0 0 100 140" fill="white" className="w-32 h-32">
                  <rect x="40" y="0" width="20" height="140" />
                  <rect x="0" y="40" width="100" height="20" />
                </svg>
              </div>

              {/* Label and counter */}
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-gold text-xs uppercase tracking-[0.3em] mb-2">
                  {selected + 1} / {images.length}
                </p>
                <p
                  className="text-white text-3xl font-semibold"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {images[selected].label}
                </p>
              </div>
            </div>

            {/* Close */}
            <button
              onClick={close}
              className="absolute -top-12 right-0 text-white/60 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors"
            >
              Close
              <span className="text-lg leading-none">✕</span>
            </button>

            {/* Prev */}
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 lg:-translate-x-16 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-lg transition-all hover:scale-110"
            >
              ←
            </button>

            {/* Next */}
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 lg:translate-x-16 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-lg transition-all hover:scale-110"
            >
              →
            </button>

            {/* Dot strip */}
            <div className="flex justify-center gap-2 mt-6">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === selected ? "w-6 bg-gold" : "w-1.5 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
