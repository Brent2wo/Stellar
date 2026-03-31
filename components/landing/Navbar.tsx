"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RippleLink } from "./RippleLink";

const links = [
  { href: "#waf",          label: "Capabilities" },
  { href: "#metrics",      label: "Insights"     },
  { href: "#pricing",      label: "Pricing"      },
  { href: "#testimonials", label: "Clients"      },
  { href: "#contact",      label: "Contact"      },
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
          ? "border-white/10 bg-black/90 shadow-[0_8px_32px_rgba(0,0,0,0.65)] backdrop-blur-xl"
          : "border-transparent bg-black/50 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <Link
          href="#"
          className="group flex items-center gap-2 font-semibold tracking-tight text-white"
        >
          <motion.span
            whileHover={{ rotate: [0, -4, 4, 0], transition: { duration: 0.45 } }}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#FFD700]/40 bg-[#FFD700]/10 text-[#FFD700] transition-colors group-hover:border-[#800000]/80 group-hover:bg-[#800000]/30"
            aria-hidden
          >
            <ShieldIcon className="h-5 w-5" />
          </motion.span>
          <span className="text-sm sm:text-base">
            ATRAVA <span className="text-[#FFD700]">Defense</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.label}
            </NavLink>
          ))}
          <Link
            href="#contact"
            className="ml-2 rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-[#800000]/35 hover:text-white"
          >
            Sign in
          </Link>
          <div className="ml-1">
            <RippleLink href="#pricing" variant="gold" compact>
              Protect a site
            </RippleLink>
          </div>
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
          className="border-t border-white/10 bg-black/95 md:hidden"
        >
          <div className="flex flex-col gap-1 px-4 py-4">
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
            <div className="mt-1 px-1">
              <RippleLink
                href="#pricing"
                variant="gold"
                fullWidth
                className="!py-3"
                onClick={() => setOpen(false)}
              >
                Protect a site
              </RippleLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative px-3 py-2 text-sm text-white/78 transition-colors duration-300 hover:text-white hover:[text-shadow:0_0_20px_rgba(255,215,0,0.28)]"
    >
      {children}
      <motion.span
        className="pointer-events-none absolute bottom-1 left-3 right-3 h-[2px] origin-left rounded-full bg-gradient-to-r from-[#FFD700] to-[#800000]"
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />
    </Link>
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
