"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { memo, useCallback, useEffect, useId, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   CyberPet — background shield creature that follows cursor.

   Layering
   ────────
   • Outer container : fixed inset-0, pointer-events-none, z-[4]
     → sits above background (-z-10) but below page sections (which create
       stacking contexts via Framer Motion transforms at z-auto / higher).
   • SVG wrapper div : pointer-events-auto, cursor-pointer
     → only the 70×88 px SVG area catches clicks; rest of screen is clear.

   Pinned ("good boy") mode
   ────────────────────────
   Click the pet → it freezes in place, shows happy squinting eyes,
   a "GOOD BOY! 🐾" badge, and a floating z z z indicator.
   Click again → resumes following cursor.
───────────────────────────────────────────────────────────────────────────── */

type EyeOffset = { x: number; y: number };

/** Returns the nearest named section element that contains the viewport point (x, y). */
const SECTION_SELECTORS = [
  '[aria-labelledby="hero-heading"]',
  "#features",
  "#stack",
  "#metrics",
  "#pricing",
  "#testimonials",
  "#contact",
];

function findSectionAt(x: number, y: number): Element | null {
  for (const sel of SECTION_SELECTORS) {
    const el = document.querySelector(sel);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (y >= r.top && y <= r.bottom && x >= r.left && x <= r.right) return el;
  }
  return null;
}

export function CyberPet() {
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, "p");

  // Raw cursor position (motion value, never triggers React render)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Pet follows cursor with soft spring lag
  const petX = useSpring(rawX, { stiffness: 38, damping: 16, mass: 1.4 });
  const petY = useSpring(rawY, { stiffness: 38, damping: 16, mass: 1.4 });

  // Gentle horizontal tilt based on screen position
  const tilt = useTransform(petX, [0, 2560], [-7, 7]);

  // Eye gaze tracking via RAF (avoids layout thrashing)
  const [eye, setEye]   = useState<EyeOffset>({ x: 0, y: 0 });
  const eyeSmooth        = useRef<EyeOffset>({ x: 0, y: 0 });
  const mousePos         = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  // Pinned state — useRef for RAF handler (avoids stale closure)
  const pinnedRef            = useRef(false);
  const [isPinned, setIsPinned]     = useState(false);
  const [showBadge, setShowBadge]   = useState(false);

  // Section-scoped visibility when pinned
  const [pinnedSection, setPinnedSection] = useState<Element | null>(null);
  const [sectionVisible, setSectionVisible] = useState(true);

  // ── Mount: initialise positions from window ───────────────────────────────
  useEffect(() => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight * 0.82; // start near bottom centre
    rawX.set(cx);
    rawY.set(cy);
    mousePos.current = { x: cx, y: cy };
    setMounted(true);
  }, [rawX, rawY]);

  // ── Cursor tracking + eye gaze RAF loop ──────────────────────────────────
  useEffect(() => {
    if (!mounted || reduceMotion) return;

    const onMove = (e: MouseEvent) => {
      if (pinnedRef.current) return; // frozen when pinned
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf: number;
    const tick = () => {
      if (!pinnedRef.current) {
        const px = petX.get();
        const py = petY.get();
        const dx = mousePos.current.x - px;
        const dy = mousePos.current.y - py;
        const dist = Math.hypot(dx, dy);
        const MAX  = 4.2;
        const tx = dist > 4 ? (dx / dist) * Math.min(MAX,          dist * 0.10) : 0;
        const ty = dist > 4 ? (dy / dist) * Math.min(MAX * 0.65,   dist * 0.07) : 0;
        eyeSmooth.current.x += (tx - eyeSmooth.current.x) * 0.10;
        eyeSmooth.current.y += (ty - eyeSmooth.current.y) * 0.10;
        setEye({ x: eyeSmooth.current.x, y: eyeSmooth.current.y });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [mounted, reduceMotion, rawX, rawY, petX, petY]);

  // ── IntersectionObserver — hide pet when its pinned section scrolls away ──
  useEffect(() => {
    if (!pinnedSection) { setSectionVisible(true); return; }
    const obs = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0.04 }
    );
    obs.observe(pinnedSection);
    setSectionVisible(true); // optimistic: already visible when pinned
    return () => obs.disconnect();
  }, [pinnedSection]);

  // ── Click handler — toggle pinned ─────────────────────────────────────────
  const handleClick = useCallback(() => {
    pinnedRef.current = !pinnedRef.current;
    setIsPinned(pinnedRef.current);
    if (pinnedRef.current) {
      // Detect & store the section the pet is currently inside
      const section = findSectionAt(petX.get(), petY.get());
      setPinnedSection(section);
      setSectionVisible(true);
      setShowBadge(true);
      setTimeout(() => setShowBadge(false), 2400);
    } else {
      setPinnedSection(null);
      setSectionVisible(true);
    }
  }, [petX, petY]);

  if (!mounted || reduceMotion) return null;

  // Pet is visible when: not pinned (always follows), OR pinned + section in view
  const petVisible = !isPinned || sectionVisible;

  return (
    <div className="pointer-events-none fixed inset-0 z-[4]" aria-hidden>
      <motion.div
        style={{
          x: petX,
          y: petY,
          rotate: isPinned ? 0 : tilt,
          translateX: "-50%",
          translateY: "-50%",
          position: "absolute",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: petVisible ? 0.88 : 0,
          scale:   petVisible ? 1    : 0.7,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── "GOOD BOY" badge (shown for ~2.4 s on pin) ─────────────────── */}
        <AnimatePresence>
          {showBadge && (
            <motion.div
              className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#FFD700] px-3 py-1 text-[10px] font-black tracking-widest text-black shadow-[0_4px_18px_rgba(255,215,0,0.5)]"
              initial={{ opacity: 0, y: 8, scale: 0.75 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={  { opacity: 0, y: -8, scale: 0.8   }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              GOOD BOY! 🐾
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Floating z z z when pinned ──────────────────────────────────── */}
        <AnimatePresence>
          {isPinned && (
            <motion.span
              className="pointer-events-none absolute -right-7 -top-5 font-bold text-[#FFD700]"
              style={{ fontSize: 10, letterSpacing: 2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], y: [0, -6, -12] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
            >
              z z z
            </motion.span>
          )}
        </AnimatePresence>

        {/* ── SVG — only this area is pointer-events-auto ─────────────────── */}
        <div
          className="pointer-events-auto cursor-pointer select-none"
          onClick={handleClick}
          title={isPinned ? "Click to resume following" : "Click to make it sit!"}
        >
          <ShieldPet uid={uid} eye={eye} isPinned={isPinned} />
        </div>
      </motion.div>
    </div>
  );
}

/* ── Memoised SVG — re-renders only when eye offsets or pinned state change ─ */

const ShieldPet = memo(function ShieldPet({
  uid,
  eye,
  isPinned,
}: {
  uid: string;
  eye: EyeOffset;
  isPinned: boolean;
}) {
  const shield      = "M35 5 L64 17 L64 42 Q64 65 35 78 Q6 65 6 42 L6 17 Z";
  const innerShield = "M35 12 L58 22 L58 42 Q58 61 35 72 Q12 61 12 42 L12 22 Z";

  return (
    <motion.svg
      width="70"
      height="88"
      viewBox="0 0 70 88"
      fill="none"
      animate={{ y: isPinned ? [0, -3, 0] : [0, -9, 0] }}
      transition={{
        duration:  isPinned ? 4.8 : 3.6,
        repeat:    Infinity,
        ease:      "easeInOut",
      }}
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id={`${uid}bg`} cx="50%" cy="38%" r="62%">
          <stop offset="0%"   stopColor="#5a0000" stopOpacity="0.92" />
          <stop offset="50%"  stopColor="#1c0000" stopOpacity="0.97" />
          <stop offset="100%" stopColor="#000000" stopOpacity="1"    />
        </radialGradient>

        <linearGradient id={`${uid}scan`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FFD700" stopOpacity="0"    />
          <stop offset="35%"  stopColor="#FFD700" stopOpacity="0.22" />
          <stop offset="65%"  stopColor="#FFD700" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0"    />
        </linearGradient>

        <filter id={`${uid}eg`} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="2.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id={`${uid}aura`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <clipPath id={`${uid}clip`}>
          <path d={shield} />
        </clipPath>
      </defs>

      {/* ── Breathing aura ───────────────────────────────────────────────── */}
      <motion.path
        d={shield}
        stroke={isPinned ? "#800000" : "#FFD700"}
        fill="none"
        animate={{
          strokeWidth:   [10, 22, 10],
          strokeOpacity: [0, isPinned ? 0.10 : 0.18, 0],
        }}
        transition={{ duration: isPinned ? 4.2 : 3.0, repeat: Infinity, ease: "easeInOut" }}
        filter={`url(#${uid}aura)`}
      />

      {/* ── Shield body ───────────────────────────────────────────────────── */}
      <path d={shield}      fill={`url(#${uid}bg)`} />
      <path d={innerShield} fill="none" stroke="#800000" strokeWidth="0.8" strokeOpacity="0.5" />

      {/* ── Border ────────────────────────────────────────────────────────── */}
      <motion.path
        d={shield}
        stroke={isPinned ? "#800000" : "#FFD700"}
        strokeWidth="1.7"
        fill="none"
        animate={{ strokeOpacity: [0.45, 1, 0.45] }}
        transition={{ duration: isPinned ? 4.2 : 3.0, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Circuit decoration ────────────────────────────────────────────── */}
      <g clipPath={`url(#${uid}clip)`} opacity="0.24">
        <line x1="14" y1="25" x2="56" y2="25" stroke="#FFD700" strokeWidth="0.65" />
        <line x1="14" y1="25" x2="14" y2="38" stroke="#FFD700" strokeWidth="0.65" />
        <line x1="56" y1="25" x2="56" y2="38" stroke="#FFD700" strokeWidth="0.65" />
        <line x1="14" y1="63" x2="56" y2="63" stroke="#FFD700" strokeWidth="0.65" />
        <circle cx="14" cy="25" r="1.6" fill="#FFD700" />
        <circle cx="56" cy="25" r="1.6" fill="#FFD700" />
        <circle cx="14" cy="63" r="1.6" fill="#FFD700" />
        <circle cx="56" cy="63" r="1.6" fill="#FFD700" />
        <line x1="35" y1="42" x2="35" y2="50" stroke="#FFD700" strokeWidth="0.65" />
        <line x1="29" y1="46" x2="41" y2="46" stroke="#FFD700" strokeWidth="0.65" />
      </g>

      {/* ── Scan line (pauses when pinned / sleeping) ──────────────────────── */}
      {!isPinned && (
        <motion.rect
          x="6" y="0"
          width="58" height="8"
          fill={`url(#${uid}scan)`}
          clipPath={`url(#${uid}clip)`}
          animate={{ y: [16, 73, 16] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* ── Eyes ─────────────────────────────────────────────────────────── */}
      {isPinned ? (
        /* Happy squinting arcs when sitting */
        <>
          <motion.path
            d="M18 42 Q24 35 30 42"
            stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" fill="none"
            filter={`url(#${uid}eg)`}
            animate={{ strokeOpacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
          <motion.path
            d="M40 42 Q46 35 52 42"
            stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" fill="none"
            filter={`url(#${uid}eg)`}
            animate={{ strokeOpacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: 0.2 }}
          />
        </>
      ) : (
        /* Normal tracking eyes */
        <>
          <circle cx="24" cy="41" r="7.5" fill="rgba(0,0,0,0.88)" />
          <circle cx="46" cy="41" r="7.5" fill="rgba(0,0,0,0.88)" />
          {/* Left pupil */}
          <motion.circle
            cx={24 + eye.x} cy={41 + eye.y} r="4"
            fill="#FFD700" filter={`url(#${uid}eg)`}
            animate={{ opacity: [0.82, 1, 0.82] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
          <circle cx={22 + eye.x * 0.45} cy={39 + eye.y * 0.45} r="1.2" fill="white" opacity="0.88" />
          {/* Right pupil */}
          <motion.circle
            cx={46 + eye.x} cy={41 + eye.y} r="4"
            fill="#FFD700" filter={`url(#${uid}eg)`}
            animate={{ opacity: [0.82, 1, 0.82] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.28 }}
          />
          <circle cx={44 + eye.x * 0.45} cy={39 + eye.y * 0.45} r="1.2" fill="white" opacity="0.88" />
        </>
      )}

      {/* ── Mouth ─────────────────────────────────────────────────────────── */}
      <motion.rect
        x="27" y="56" width="16" height="2.8" rx="1.4"
        fill={isPinned ? "#FFD700" : "#800000"}
        opacity="0.9"
        animate={
          isPinned
            ? { width: [20, 22, 20], x: [25, 24, 25] }   // happy smile
            : { width: [16, 21, 11, 16], x: [27, 24.5, 29.5, 27] } // data scan
        }
        transition={{ duration: isPinned ? 2.5 : 3.0, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Antenna ───────────────────────────────────────────────────────── */}
      <motion.line
        x1="35" y1="5" x2="35" y2="-7"
        stroke="#FFD700" strokeWidth="1.3"
        animate={{ strokeOpacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: isPinned ? 3.5 : 1.8, repeat: Infinity }}
      />
      <motion.circle
        cx="35" cy="-10" r="3.2"
        fill={isPinned ? "#800000" : "#FFD700"}
        animate={{
          r:       isPinned ? [3.0, 4.5, 3.0]          : [2.6, 3.8, 2.6],
          opacity: [0.55, 1, 0.55],
          fill:    isPinned ? ["#800000","#ff4444","#800000"] : ["#FFD700","#fffacc","#FFD700"],
        }}
        transition={{ duration: isPinned ? 2.8 : 1.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Pulse ring at base ────────────────────────────────────────────── */}
      <motion.circle
        cx="35" cy="79" r="6" fill="none"
        stroke="#800000" strokeWidth="1.5"
        animate={{ r: [5, 14, 5], strokeOpacity: [0.7, 0, 0.7] }}
        transition={{ duration: isPinned ? 4.5 : 2.6, repeat: Infinity, ease: "easeOut" }}
      />
    </motion.svg>
  );
});
