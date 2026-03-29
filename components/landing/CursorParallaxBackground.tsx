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
 * Link11-style ambient layers: cursor-driven gradient drift + scroll parallax.
 * pointer-events-none so it never blocks interaction.
 */
export function CursorParallaxBackground() {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const springX = useSpring(mx, { stiffness: 32, damping: 26, mass: 0.65 });
  const springY = useSpring(my, { stiffness: 32, damping: 26, mass: 0.65 });

  useEffect(() => {
    if (reduceMotion) return;
    const handler = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my, reduceMotion]);

  const moveX = useTransform(springX, [0, 1], reduceMotion ? [0, 0] : [-36, 36]);
  const moveY = useTransform(springY, [0, 1], reduceMotion ? [0, 0] : [-28, 28]);
  const moveX2 = useTransform(springX, [0, 1], reduceMotion ? [0, 0] : [24, -24]);
  const moveY2 = useTransform(springY, [0, 1], reduceMotion ? [0, 0] : [20, -20]);

  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 2400], [0, reduceMotion ? 0 : 100]);
  const orbSlow = useTransform(scrollY, [0, 2400], [0, reduceMotion ? 0 : -60]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black"
      aria-hidden
    >
      {/* Base depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_100%,rgba(128,0,0,0.35),transparent_50%)]" />

      {/* Gold orb — follows cursor */}
      <motion.div
        className="absolute -left-[20%] top-[10%] h-[min(85vw,520px)] w-[min(85vw,520px)] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.22),transparent_68%)] blur-3xl"
        style={{ x: moveX, y: moveY }}
      />

      {/* Maroon counter-orb */}
      <motion.div
        className="absolute -right-[15%] bottom-[5%] h-[min(75vw,480px)] w-[min(75vw,480px)] rounded-full bg-[radial-gradient(circle_at_70%_60%,rgba(128,0,0,0.45),transparent_65%)] blur-3xl"
        style={{ x: moveX2, y: moveY2 }}
      />

      {/* Mid accent ring */}
      <motion.div
        className="absolute left-1/2 top-1/3 h-[min(90vw,640px)] w-[min(90vw,640px)] -translate-x-1/2 rounded-full border border-[#FFD700]/[0.07] bg-[radial-gradient(circle,rgba(255,215,0,0.06),transparent_70%)] blur-sm"
        style={{ y: orbSlow }}
      />

      {/* Cyber grid — parallax scroll */}
      <motion.div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          y: gridY,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Diagonal scanlines (very subtle) */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "repeating-linear-gradient(-18deg, transparent, transparent 2px, rgba(255,215,0,0.12) 2px, rgba(255,215,0,0.12) 3px)",
        }}
      />

      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.55)_55%,#000_100%)]" />
    </div>
  );
}
