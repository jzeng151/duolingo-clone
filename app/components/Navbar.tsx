"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#about",       label: "About"      },
  { href: "#ministries",  label: "Ministries" },
  { href: "#events",      label: "Events"     },
  { href: "#sermons",     label: "Sermons"    },
  { href: "#connect",     label: "Connect"    },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-midnight shadow-[0_4px_40px_rgba(0,0,0,0.4)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* Logo */}
        <Link href="#home" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-midnight text-xs font-bold tracking-wide shrink-0">
            ICC
          </div>
          <div className="hidden sm:block leading-none">
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold/80 mb-0.5">
              International Christian Centre
            </p>
            <p
              className="text-white font-semibold text-xl leading-none"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Houston
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-gold transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="#visit"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-midnight hover:bg-gold-dark transition-colors duration-200 shadow-lg shadow-gold/20"
          >
            Plan Your Visit
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-midnight-800 border-t border-white/10 px-6 py-5 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 text-white/70 hover:text-gold font-medium transition-colors tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3">
            <Link
              href="#visit"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-midnight"
            >
              Plan Your Visit
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
