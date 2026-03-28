"use client";

import { useCallback, useEffect, useState } from "react";
import { Reveal } from "./Reveal";

const items = [
  {
    quote:
      "We moved production APIs behind ATRAVA Defense and finally had consistent ModSecurity coverage without babysitting edge nodes. Their team tuned CRS noise down within the first week.",
    name: "R. Mendoza",
    role: "CTO, regional SaaS",
  },
  {
    quote:
      "Managed SSL, geo rules, and rate limits in one place—our agency clients get tenant-scoped policies without us building a security operations center from scratch.",
    name: "K. Villanueva",
    role: "Head of Infrastructure",
  },
  {
    quote:
      "Virtual patching bought us time on a disclosed framework issue. The WAF rule shipped before our patch window, and logs made the incident review straightforward.",
    name: "J. Reyes",
    role: "Security Lead, fintech",
  },
  {
    quote:
      "Support feels like an extension of our team: clear escalation, readable dashboards, and they actually understand OWASP CRS false positives.",
    name: "A. Cruz",
    role: "Director of Engineering",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + items.length) % items.length),
    [],
  );

  useEffect(() => {
    const t = window.setInterval(next, 6500);
    return () => window.clearInterval(t);
  }, [next]);

  const active = items[index];

  return (
    <section
      id="testimonials"
      className="scroll-mt-20 border-b border-[#800000]/30 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#FFD700]">
              Trusted operations
            </p>
            <h2 className="mt-3 border-l-4 border-[#800000] pl-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              What teams say about managed protection
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative mt-12 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#800000]/20 via-black to-black p-8 sm:p-12">
            <div key={`${active.name}-${index}`} className="animate-testimonial-in">
              <blockquote className="text-lg leading-relaxed text-white/90 sm:text-xl">
                “{active.quote}”
              </blockquote>
              <footer className="mt-8 flex flex-col gap-1 border-t border-[#800000]/50 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <cite className="not-italic font-semibold text-[#FFD700]">{active.name}</cite>
                  <p className="text-sm text-white/60">{active.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    className="rounded-full border border-white/20 p-2 text-white transition hover:border-[#FFD700] hover:text-[#FFD700]"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="rounded-full border border-white/20 p-2 text-white transition hover:border-[#FFD700] hover:text-[#FFD700]"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </footer>
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-[#FFD700]" : "w-2 bg-white/25 hover:bg-white/45"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ChevronLeft() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
