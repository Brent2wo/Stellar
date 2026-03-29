"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

/**
 * Gemini-style ambient parallax background.
 *
 * Three independent spring layers (slow / medium / fast) so each orb reacts
 * at a different speed, creating genuine depth.  A twinkling star-field layer
 * and scroll-driven grid complete the premium cyber look.
 */

// Fixed star positions (% of viewport).  Deterministic so SSR is consistent.
const STARS = [
  { x: "11%",  y: "7%",  r: 1.4, base: 0.55 },
  { x: "27%",  y: "14%", r: 1.0, base: 0.38 },
  { x: "73%",  y: "5%",  r: 1.8, base: 0.50 },
  { x: "86%",  y: "19%", r: 1.2, base: 0.42 },
  { x: "4%",   y: "33%", r: 1.0, base: 0.35 },
  { x: "93%",  y: "44%", r: 1.4, base: 0.48 },
  { x: "17%",  y: "56%", r: 1.1, base: 0.40 },
  { x: "61%",  y: "27%", r: 1.0, base: 0.33 },
  { x: "44%",  y: "73%", r: 1.7, base: 0.47 },
  { x: "79%",  y: "69%", r: 1.2, base: 0.42 },
  { x: "31%",  y: "89%", r: 1.0, base: 0.36 },
  { x: "89%",  y: "86%", r: 1.4, base: 0.45 },
  { x: "52%",  y: "10%", r: 1.1, base: 0.38 },
  { x: "6%",   y: "78%", r: 1.6, base: 0.44 },
  { x: "68%",  y: "48%", r: 1.0, base: 0.32 },
];

export function CursorParallaxBackground() {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  // ── Three spring depths ───────────────────────────────────────────────────
  // Slow  → large background blobs  (far away, sluggish)
  const sX = useSpring(mx, { stiffness: 14, damping: 26, mass: 1.2 });
  const sY = useSpring(my, { stiffness: 14, damping: 26, mass: 1.2 });
  // Medium → mid-distance accents
  const mX = useSpring(mx, { stiffness: 30, damping: 26, mass: 0.7 });
  const mY = useSpring(my, { stiffness: 30, damping: 26, mass: 0.7 });
  // Fast  → close star-field + accent sparks
  const fX = useSpring(mx, { stiffness: 52, damping: 28, mass: 0.45 });
  const fY = useSpring(my, { stiffness: 52, damping: 28, mass: 0.45 });

  useEffect(() => {
    if (reduceMotion) return;
    const handler = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my, reduceMotion]);

  const rm = reduceMotion;

  // Slow layer — large sweeping offsets
  const s1x = useTransform(sX, [0, 1], rm ? [0, 0] : [-50, 50]);
  const s1y = useTransform(sY, [0, 1], rm ? [0, 0] : [-36, 36]);
  const s2x = useTransform(sX, [0, 1], rm ? [0, 0] : [32, -32]);
  const s2y = useTransform(sY, [0, 1], rm ? [0, 0] : [24, -24]);

  // Medium layer
  const m1x = useTransform(mX, [0, 1], rm ? [0, 0] : [-38, 38]);
  const m1y = useTransform(mY, [0, 1], rm ? [0, 0] : [-28, 28]);
  const m2x = useTransform(mX, [0, 1], rm ? [0, 0] : [26, -26]);
  const m2y = useTransform(mY, [0, 1], rm ? [0, 0] : [20, -20]);

  // Fast layer
  const f1x = useTransform(fX, [0, 1], rm ? [0, 0] : [-58, 58]);
  const f1y = useTransform(fY, [0, 1], rm ? [0, 0] : [-42, 42]);
  const f2x = useTransform(fX, [0, 1], rm ? [0, 0] : [42, -42]);
  const f2y = useTransform(fY, [0, 1], rm ? [0, 0] : [30, -30]);

  // Scroll parallax
  const { scrollY } = useScroll();
  const gridY  = useTransform(scrollY, [0, 2400], [0, rm ? 0 : 100]);
  const orbSlow = useTransform(scrollY, [0, 2400], [0, rm ? 0 : -60]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black"
      aria-hidden
    >
      {/* ── Static atmospheric base ─────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_140%_90%_at_50%_108%,rgba(128,0,0,0.40),transparent_52%)]" />

      {/* ── SLOW layer — large far-background blobs ─────────────────────────── */}
      {/* Gold primary (top-left) */}
      <motion.div
        className="absolute -left-[22%] top-[4%] h-[min(110vw,660px)] w-[min(110vw,660px)] rounded-full"
        style={{
          x: s1x, y: s1y,
          background: "radial-gradient(circle at 30% 30%, rgba(255,215,0,0.26), transparent 68%)",
          filter: "blur(44px)",
        }}
      />
      {/* Maroon counter (bottom-right) */}
      <motion.div
        className="absolute -right-[18%] bottom-[2%] h-[min(100vw,620px)] w-[min(100vw,620px)] rounded-full"
        style={{
          x: s2x, y: s2y,
          background: "radial-gradient(circle at 68% 62%, rgba(128,0,0,0.54), transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── MEDIUM layer — mid-distance accents ─────────────────────────────── */}
      {/* Gold accent right */}
      <motion.div
        className="absolute -right-[10%] top-[14%] h-[min(70vw,440px)] w-[min(70vw,440px)] rounded-full"
        style={{
          x: m2x, y: m2y,
          background: "radial-gradient(circle at 64% 28%, rgba(255,215,0,0.15), transparent 65%)",
          filter: "blur(32px)",
        }}
      />
      {/* Maroon accent left */}
      <motion.div
        className="absolute -left-[8%] top-[30%] h-[min(60vw,400px)] w-[min(60vw,400px)] rounded-full"
        style={{
          x: m1x, y: m1y,
          background: "radial-gradient(circle at 30% 38%, rgba(128,0,0,0.34), transparent 60%)",
          filter: "blur(30px)",
        }}
      />

      {/* ── FAST layer — close accent sparks ────────────────────────────────── */}
      {/* Gold spark (upper-right) */}
      <motion.div
        className="absolute right-[16%] top-[7%] h-[min(32vw,220px)] w-[min(32vw,220px)] rounded-full"
        style={{
          x: f1x, y: f1y,
          background: "radial-gradient(circle, rgba(255,215,0,0.19), transparent 70%)",
          filter: "blur(22px)",
        }}
      />
      {/* Maroon spark (lower-left) */}
      <motion.div
        className="absolute left-[12%] bottom-[18%] h-[min(28vw,190px)] w-[min(28vw,190px)] rounded-full"
        style={{
          x: f2x, y: f2y,
          background: "radial-gradient(circle, rgba(128,0,0,0.28), transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* ── Floating star field (moves at medium speed counterdirection) ─────── */}
      <motion.div
        className="absolute inset-0"
        style={{ x: m2x, y: m2y }}
      >
        {STARS.map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#FFD700]"
            style={{
              left: s.x,
              top: s.y,
              width: s.r * 2,
              height: s.r * 2,
              opacity: s.base,
            }}
            animate={{ opacity: [s.base * 0.3, s.base, s.base * 0.3] }}
            transition={{
              duration: 2.2 + (i % 4) * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i * 0.28) % 2.5,
            }}
          />
        ))}
      </motion.div>

      {/* ── Mid accent ring (scroll parallax) ────────────────────────────────── */}
      <motion.div
        className="absolute left-1/2 top-1/3 h-[min(90vw,640px)] w-[min(90vw,640px)] -translate-x-1/2 rounded-full border border-[#FFD700]/[0.06] bg-[radial-gradient(circle,rgba(255,215,0,0.055),transparent_70%)] blur-sm"
        style={{ y: orbSlow }}
      />

      {/* ── Cyber grid (scroll parallax) ─────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          y: gridY,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* ── Diagonal scanlines (very subtle) ─────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.030]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-18deg, transparent, transparent 2px, rgba(255,215,0,0.12) 2px, rgba(255,215,0,0.12) 3px)",
        }}
      />

      {/* ── Bottom vignette ────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.55)_55%,#000_100%)]" />
    </div>
  );
}
