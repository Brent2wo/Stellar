"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RippleLink } from "./RippleLink";

/* ─────────────────────────────────────────────────────────────────────────────
   Staggered fade-up variant — simple, no dependency on variants.ts
───────────────────────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0  },
};

function fadeDelay(delay: number) {
  return { duration: 0.7, delay, ease: "easeOut" } as const;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Philippines map — real uploaded image blend.
   Technique:
     • invert(1)        → white bg becomes black (invisible on dark page)
     • sepia(1)         → grey islands shift to warm amber
     • saturate(4)      → push saturation toward gold
     • hue-rotate(4deg) → fine-tune hue toward #FFD700
     • opacity: 0.18    → very subtle, premium watermark feel
     • mix-blend-mode: screen → black areas vanish, gold areas glow
───────────────────────────────────────────────────────────────────────────── */
function PhilippinesMap() {
  return (
    /*
     * Covers the full right 55% of the hero at 100% viewport height.
     * Next.js `fill` + object-contain + object-center keeps the map's
     * natural proportions while maximising size within the container.
     * CSS background removal:
     *   invert(1)        → white bg → black (screens out on dark page)
     *   sepia + saturate → grey islands → warm gold tones
     *   mix-blend-mode: screen → black is transparent on #000 background
     */
    <div
      className="absolute inset-y-0 right-0 w-full sm:w-[58%]"
      style={{ isolation: "isolate" }}
      aria-hidden
    >
      <Image
        src="/ph-map.png"
        alt=""
        fill
        className="select-none object-contain object-center sm:object-right"
        style={{
          filter:
            "invert(1) sepia(1) saturate(3.5) hue-rotate(5deg) brightness(1.1)",
          opacity: 0.13,
          mixBlendMode: "screen",
        }}
        priority
        draggable={false}
      />
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────────────────────
   Hero — Link11-inspired minimal layout
───────────────────────────────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden border-b border-[#800000]/25"
      aria-labelledby="hero-heading"
    >
      {/* ── Background layers ─────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Maroon warmth — bottom-left */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_5%_95%,rgba(128,0,0,0.28),transparent_50%)]" />

        {/* Philippines map — full right-half fill */}
        <PhilippinesMap />

        {/* Left mask — keeps headline + body text crisp */}
        <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-black via-black/95 to-transparent" />
        {/* Mobile: stronger full-screen dim so text always readable */}
        <div className="absolute inset-0 bg-black/40 sm:hidden" />
        {/* Right edge fade */}
        <div className="absolute inset-y-0 right-0 w-[12%] bg-gradient-to-l from-black to-transparent" />
        {/* Top + bottom fades */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />




        {/* Very subtle static grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-6xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
        <div className="max-w-[52rem]">

          {/* Label */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeDelay(0)}
            className="mb-7 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-[#800000]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FFD700]/65">
              Managed WAF &bull; ATRAVA Defense &bull; Philippines
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeDelay(0.13)}
            className="text-[2.6rem] font-bold leading-[1.10] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
          >
            Your websites,{" "}
            <span className="text-[#FFD700]">protected</span>
            {" "}at the edge.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeDelay(0.26)}
            className="mt-6 max-w-xl text-base leading-[1.8] text-white/58 sm:text-[1.05rem]"
          >
            ATRAVA Defense is a managed WAF service powered by ModSecurity and
            the OWASP Core Rule Set — blocking threats before they reach your
            origin, with zero infrastructure overhead.
          </motion.p>

          {/* Single CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeDelay(0.39)}
            className="mt-10"
          >
            <RippleLink href="#pricing" variant="gold">
              Get protected today
            </RippleLink>
          </motion.div>

          {/* Trust metrics */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeDelay(0.52)}
            className="mt-16 border-t border-white/[0.07] pt-10"
          >
            <dl className="grid grid-cols-3 gap-x-8 gap-y-6 sm:flex sm:gap-16">
              {[
                { value: "< 42 ms", label: "Added latency"       },
                { value: "12M+",    label: "Requests per day"    },
                { value: "99.9%",   label: "Threat capture rate" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-xl font-bold text-[#FFD700] sm:text-2xl">
                    {value}
                  </span>
                  <span className="text-xs leading-snug text-white/38">{label}</span>
                </div>
              ))}
            </dl>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
