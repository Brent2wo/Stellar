"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { memo, useEffect, useId, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   CyberPet — a tiny glowing shield creature that follows the cursor.

   Architecture
   ────────────
   • rawX / rawY       : motion values updated directly in mousemove (no React state)
   • petX  / petY      : spring-damped versions → smooth lag behind cursor
   • tilt              : horizontal body lean derived from petX
   • eye               : React state updated via RAF for pupil gaze direction
   • ShieldPet         : memoised SVG so only the eye circles re-render
───────────────────────────────────────────────────────────────────────────── */

type EyeOffset = { x: number; y: number };

export function CyberPet() {
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, "p");

  // Raw cursor — set directly, never triggers React state
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Pet lags ~200 ms behind cursor (slow, floaty spring)
  const petX = useSpring(rawX, { stiffness: 38, damping: 16, mass: 1.4 });
  const petY = useSpring(rawY, { stiffness: 38, damping: 16, mass: 1.4 });

  // Gentle horizontal body tilt
  const tilt = useTransform(petX, [0, 2560], [-7, 7]);

  // Eye gaze (lightweight state — only re-renders ShieldPet ~60fps)
  const [eye, setEye] = useState<EyeOffset>({ x: 0, y: 0 });
  const eyeSmooth = useRef<EyeOffset>({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  // Mount: seed positions from actual window size
  useEffect(() => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    rawX.set(cx);
    rawY.set(cy);
    mousePos.current = { x: cx, y: cy };
    setMounted(true);
  }, [rawX, rawY]);

  // Cursor tracking + eye RAF loop
  useEffect(() => {
    if (!mounted || reduceMotion) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf: number;
    const tick = () => {
      // Direction from pet centre → cursor
      const px = petX.get();
      const py = petY.get();
      const dx = mousePos.current.x - px;
      const dy = mousePos.current.y - py;
      const dist = Math.hypot(dx, dy);
      const MAX = 4.2;
      const tx = dist > 4 ? (dx / dist) * Math.min(MAX, dist * 0.10) : 0;
      const ty = dist > 4 ? (dy / dist) * Math.min(MAX * 0.65, dist * 0.07) : 0;
      // Smooth interpolation so pupils glide, not snap
      eyeSmooth.current.x += (tx - eyeSmooth.current.x) * 0.10;
      eyeSmooth.current.y += (ty - eyeSmooth.current.y) * 0.10;
      setEye({ x: eyeSmooth.current.x, y: eyeSmooth.current.y });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [mounted, reduceMotion, rawX, rawY, petX, petY]);

  if (!mounted || reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-30"
      style={{
        x: petX,
        y: petY,
        rotate: tilt,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <ShieldPet uid={uid} eye={eye} />
    </motion.div>
  );
}

/* ── SVG creature — memoised so only swaps when eye offsets change ─────────── */

const ShieldPet = memo(function ShieldPet({
  uid,
  eye,
}: {
  uid: string;
  eye: EyeOffset;
}) {
  // Shield path (friendly proportions)
  const shield = "M35 5 L64 17 L64 42 Q64 65 35 78 Q6 65 6 42 L6 17 Z";
  // Inner shield path (for border detail)
  const innerShield = "M35 12 L58 22 L58 42 Q58 61 35 72 Q12 61 12 42 L12 22 Z";

  return (
    <motion.svg
      width="70"
      height="88"
      viewBox="0 0 70 88"
      fill="none"
      // Idle float
      animate={{ y: [0, -9, 0] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Shield body gradient */}
        <radialGradient id={`${uid}bg`} cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#5a0000" stopOpacity="0.92" />
          <stop offset="50%" stopColor="#1c0000" stopOpacity="0.97" />
          <stop offset="100%" stopColor="#000000" stopOpacity="1" />
        </radialGradient>

        {/* Scan-line glow */}
        <linearGradient id={`${uid}scan`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0" />
          <stop offset="35%" stopColor="#FFD700" stopOpacity="0.22" />
          <stop offset="65%" stopColor="#FFD700" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </linearGradient>

        {/* Eye glow filter */}
        <filter id={`${uid}eg`} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="2.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Outer aura filter */}
        <filter id={`${uid}aura`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip to shield */}
        <clipPath id={`${uid}clip`}>
          <path d={shield} />
        </clipPath>
      </defs>

      {/* ── Outer breathing aura ──────────────────────────────────────────── */}
      <motion.path
        d={shield}
        stroke="#FFD700"
        fill="none"
        animate={{
          strokeWidth: [10, 22, 10],
          strokeOpacity: [0, 0.18, 0],
        }}
        transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut" }}
        filter={`url(#${uid}aura)`}
      />

      {/* ── Shield body ───────────────────────────────────────────────────── */}
      <path d={shield} fill={`url(#${uid}bg)`} />

      {/* Inner detail ring */}
      <path
        d={innerShield}
        fill="none"
        stroke="#800000"
        strokeWidth="0.8"
        strokeOpacity="0.5"
      />

      {/* Gold border — pulses opacity */}
      <motion.path
        d={shield}
        stroke="#FFD700"
        strokeWidth="1.7"
        fill="none"
        animate={{ strokeOpacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Circuit decoration (clipped inside shield) ────────────────────── */}
      <g clipPath={`url(#${uid}clip)`} opacity="0.24">
        {/* Top rail */}
        <line x1="14" y1="25" x2="56" y2="25" stroke="#FFD700" strokeWidth="0.65" />
        {/* Side drops */}
        <line x1="14" y1="25" x2="14" y2="38" stroke="#FFD700" strokeWidth="0.65" />
        <line x1="56" y1="25" x2="56" y2="38" stroke="#FFD700" strokeWidth="0.65" />
        {/* Bottom rail */}
        <line x1="14" y1="63" x2="56" y2="63" stroke="#FFD700" strokeWidth="0.65" />
        {/* Blips */}
        <circle cx="14" cy="25" r="1.6" fill="#FFD700" />
        <circle cx="56" cy="25" r="1.6" fill="#FFD700" />
        <circle cx="14" cy="63" r="1.6" fill="#FFD700" />
        <circle cx="56" cy="63" r="1.6" fill="#FFD700" />
        {/* Centre cross-hair */}
        <line x1="35" y1="42" x2="35" y2="50" stroke="#FFD700" strokeWidth="0.65" />
        <line x1="29" y1="46" x2="41" y2="46" stroke="#FFD700" strokeWidth="0.65" />
      </g>

      {/* ── Animated scan line ────────────────────────────────────────────── */}
      <motion.rect
        x="6" y="0"
        width="58" height="8"
        fill={`url(#${uid}scan)`}
        clipPath={`url(#${uid}clip)`}
        animate={{ y: [16, 73, 16] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
      />

      {/* ── Eyes ─────────────────────────────────────────────────────────── */}
      {/* Left socket */}
      <circle cx="24" cy="41" r="7.5" fill="rgba(0,0,0,0.88)" />
      {/* Right socket */}
      <circle cx="46" cy="41" r="7.5" fill="rgba(0,0,0,0.88)" />

      {/* Left pupil */}
      <motion.circle
        cx={24 + eye.x}
        cy={41 + eye.y}
        r="4"
        fill="#FFD700"
        filter={`url(#${uid}eg)`}
        animate={{ opacity: [0.82, 1, 0.82] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      {/* Left shine */}
      <circle
        cx={22 + eye.x * 0.45}
        cy={39 + eye.y * 0.45}
        r="1.2"
        fill="white"
        opacity="0.88"
      />

      {/* Right pupil */}
      <motion.circle
        cx={46 + eye.x}
        cy={41 + eye.y}
        r="4"
        fill="#FFD700"
        filter={`url(#${uid}eg)`}
        animate={{ opacity: [0.82, 1, 0.82] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0.28 }}
      />
      {/* Right shine */}
      <circle
        cx={44 + eye.x * 0.45}
        cy={39 + eye.y * 0.45}
        r="1.2"
        fill="white"
        opacity="0.88"
      />

      {/* ── Cyber mouth / data bar ────────────────────────────────────────── */}
      <motion.rect
        x="27" y="56"
        width="16" height="2.8"
        rx="1.4"
        fill="#800000"
        opacity="0.9"
        animate={{ width: [16, 21, 11, 16], x: [27, 24.5, 29.5, 27] }}
        transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Antenna ───────────────────────────────────────────────────────── */}
      <motion.line
        x1="35" y1="5"
        x2="35" y2="-7"
        stroke="#FFD700"
        strokeWidth="1.3"
        strokeOpacity="0.72"
        animate={{ strokeOpacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      <motion.circle
        cx="35" cy="-10"
        r="3.2"
        fill="#FFD700"
        animate={{
          r: [2.6, 3.8, 2.6],
          opacity: [0.55, 1, 0.55],
          fill: ["#FFD700", "#fffacc", "#FFD700"],
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Maroon pulse ring at shield base ────────────────────────────── */}
      <motion.circle
        cx="35" cy="79"
        r="6"
        fill="none"
        stroke="#800000"
        strokeWidth="1.5"
        animate={{ r: [5, 14, 5], strokeOpacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
      />
    </motion.svg>
  );
});
