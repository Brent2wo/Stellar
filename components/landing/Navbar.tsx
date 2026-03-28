"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#stack", label: "Protection stack" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Clients" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow] duration-300 ${
        scrolled
          ? "border-white/10 bg-black/85 shadow-[0_8px_32px_rgba(0,0,0,0.65)] backdrop-blur-xl"
          : "border-transparent bg-black/40 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <Link
          href="#"
          className="group flex items-center gap-2 font-semibold tracking-tight text-white"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#FFD700]/40 bg-[#FFD700]/10 text-[#FFD700] transition-colors group-hover:border-[#800000]/80 group-hover:bg-[#800000]/30"
            aria-hidden
          >
            <ShieldIcon className="h-5 w-5" />
          </span>
          <span className="text-sm sm:text-base">
            ATRAVA <span className="text-[#FFD700]">Defense</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-[#800000]/35 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="ml-1 rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-[#800000]/35 hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href="#pricing"
            className="ml-1 rounded-full bg-[#FFD700] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#e6c200]"
          >
            Protect a site
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-white/15 p-2 text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Open menu</span>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-white/10 bg-black/95 px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-3 text-white/90 hover:bg-[#800000]/40"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="mt-2 rounded-lg py-3 text-center text-sm text-white/90 hover:bg-[#800000]/40"
              onClick={() => setOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="#pricing"
              className="mt-1 rounded-full bg-[#FFD700] py-3 text-center text-sm font-semibold text-black"
              onClick={() => setOpen(false)}
            >
              Protect a site
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 4 6v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V6l-8-3Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
