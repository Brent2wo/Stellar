"use client";

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
   Philippines map — simplified SVG silhouettes of the main island groups.
   Positioned right-side as a low-opacity watermark (like a geographic anchor).
───────────────────────────────────────────────────────────────────────────── */
function PhilippinesMap() {
  return (
    <svg
      viewBox="0 0 320 540"
      fill="none"
      className="absolute right-0 top-1/2 h-[min(88vh,640px)] w-auto -translate-y-[48%] select-none"
      aria-hidden
    >
      {/* ── Luzon — northern main island ───────────────────────────────── */}
      <path
        d="M 138 6
           L 158 17 L 174 40 L 168 65 L 150 78
           L 168 106 L 162 134 L 175 168
           L 156 190 L 144 220 L 122 248
           L 101 260 L 80 252 L 65 234
           L 71 212 L 83 192 L 65 165
           L 61 138 L 72 114 L 53 92
           L 50 65 L 62 42 L 80 21 L 110 7 Z"
        stroke="#FFD700" strokeWidth="1.2" strokeLinejoin="round"
        fill="#FFD700" fillOpacity="0.06"
      />

      {/* ── Palawan — long western island ──────────────────────────────── */}
      <path
        d="M 22 278 L 38 264 L 50 272
           L 54 292 L 48 320 L 42 348
           L 34 366 L 22 360 L 16 340
           L 14 310 L 18 288 Z"
        stroke="#FFD700" strokeWidth="1.0" strokeLinejoin="round"
        fill="#FFD700" fillOpacity="0.05"
      />

      {/* ── Panay ──────────────────────────────────────────────────────── */}
      <path
        d="M 60 285 L 86 274 L 102 286 L 97 304 L 77 310 L 58 298 Z"
        stroke="#FFD700" strokeWidth="0.9"
        fill="#FFD700" fillOpacity="0.05"
      />

      {/* ── Negros ─────────────────────────────────────────────────────── */}
      <path
        d="M 96 305 L 120 296 L 133 310 L 129 332 L 111 338 L 93 325 Z"
        stroke="#FFD700" strokeWidth="0.9"
        fill="#FFD700" fillOpacity="0.05"
      />

      {/* ── Cebu ───────────────────────────────────────────────────────── */}
      <path
        d="M 140 282 L 155 274 L 165 287 L 160 308 L 145 314 L 132 302 Z"
        stroke="#FFD700" strokeWidth="0.9"
        fill="#FFD700" fillOpacity="0.05"
      />

      {/* ── Samar ──────────────────────────────────────────────────────── */}
      <path
        d="M 182 272 L 208 264 L 226 278 L 220 296 L 200 304 L 178 288 Z"
        stroke="#FFD700" strokeWidth="0.9"
        fill="#FFD700" fillOpacity="0.05"
      />

      {/* ── Leyte ──────────────────────────────────────────────────────── */}
      <path
        d="M 180 300 L 204 291 L 215 305 L 210 326 L 194 332 L 176 318 Z"
        stroke="#FFD700" strokeWidth="0.9"
        fill="#FFD700" fillOpacity="0.05"
      />

      {/* ── Mindanao — large southern island ───────────────────────────── */}
      <path
        d="M 68 358
           L 118 342 L 166 339 L 210 347
           L 252 343 L 280 360 L 292 390
           L 284 420 L 262 444 L 234 458
           L 200 463 L 166 461 L 133 452
           L 103 438 L 80 418 L 63 394
           L 61 372 Z"
        stroke="#FFD700" strokeWidth="1.2" strokeLinejoin="round"
        fill="#FFD700" fillOpacity="0.06"
      />

      {/* ── City dots ──────────────────────────────────────────────────── */}
      {/* Manila */}
      <circle cx="88" cy="178" r="3.5" fill="#800000" opacity="0.55" />
      <circle cx="88" cy="178" r="7"   fill="none" stroke="#800000" strokeWidth="0.7" opacity="0.30" />

      {/* Cebu City */}
      <circle cx="150" cy="298" r="2.5" fill="#FFD700" opacity="0.45" />

      {/* Davao */}
      <circle cx="196" cy="432" r="2.5" fill="#FFD700" opacity="0.45" />
    </svg>
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
        {/* Deep maroon radial — warmth at bottom-left */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_8%_90%,rgba(128,0,0,0.25),transparent_52%)]" />

        {/* Subtle gold ambient — top-right behind map */}
        <div className="absolute -right-[8%] -top-[5%] h-[55vh] w-[55vh] rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.07),transparent_60%)] blur-3xl" />

        {/* Philippines map watermark */}
        <PhilippinesMap />

        {/* Gradient mask — fade from left so text stays readable */}
        <div className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-black via-black/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-black to-transparent" />

        {/* Bottom fade to next section */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />

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
