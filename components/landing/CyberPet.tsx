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
import { createPortal } from "react-dom";

/* ─────────────────────────────────────────────────────────────────────────────
   CyberPet — cursor-following shield creature with section-scoped pinning.

   Following mode  (default)
   ─────────────────────────
   The pet is `position: fixed` and trails the cursor with spring physics.
   The 70×88 px SVG is the only area that captures clicks/pointer events.

   Pinned ("good boy") mode  (after click)
   ─────────────────────────────────────────
   • Detects which <section> / <footer> is directly under the pet using
     document.elementsFromPoint() (viewport coordinates).
   • Renders the pet as `position: absolute` INSIDE that section element via
     React.createPortal(), so it scrolls with the page naturally.
   • Because the pet is inside the section, it is only visible while that
     section is in the viewport — no IntersectionObserver needed.
   • Clicking the pinned pet removes it and resumes cursor-following from the
     same on-screen position (no visual jump).

   Requirements
   ────────────
   • Every <section> / <footer> must have `position: relative` (already set).
   • Container: pointer-events-none so it never blocks page interactions.
   • prefers-reduced-motion: returns null (no animation at all).
───────────────────────────────────────────────────────────────────────────── */

type EyeOffset  = { x: number; y: number };
type PinnedData = { element: HTMLElement; x: number; y: number } | null;

export function CyberPet() {
  const reduceMotion = useReducedMotion();
  const uid          = useId().replace(/:/g, "p");

  // ── Raw cursor & spring-damped pet position (motion values, no re-renders) ─
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const petX = useSpring(rawX, { stiffness: 38, damping: 16, mass: 1.4 });
  const petY = useSpring(rawY, { stiffness: 38, damping: 16, mass: 1.4 });
  const tilt = useTransform(petX, [0, 2560], [-7, 7]);

  // ── Eye gaze (updated in RAF — no re-render pressure on parent) ───────────
  const [eye, setEye]   = useState<EyeOffset>({ x: 0, y: 0 });
  const eyeSmooth        = useRef<EyeOffset>({ x: 0, y: 0 });
  const mousePos         = useRef({ x: 0, y: 0 });

  // ── Pinned state ──────────────────────────────────────────────────────────
  // isPinnedRef drives RAF/event handlers (avoids stale closure).
  // isPinned (state) drives React rendering.
  const isPinnedRef        = useRef(false);
  const [isPinned, setIsPinned]     = useState(false);
  const [pinnedData, setPinnedData] = useState<PinnedData>(null);
  const [showBadge, setShowBadge]   = useState(false);

  const [mounted, setMounted] = useState(false);

  // ── Mount ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight * 0.80;
    rawX.set(cx);
    rawY.set(cy);
    mousePos.current = { x: cx, y: cy };
    setMounted(true);
  }, [rawX, rawY]);

  // ── Cursor tracking + eye-gaze RAF ───────────────────────────────────────
  useEffect(() => {
    if (!mounted || reduceMotion) return;

    const onMove = (e: MouseEvent) => {
      if (isPinnedRef.current) return;
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf: number;
    const tick = () => {
      if (!isPinnedRef.current) {
        const px   = petX.get();
        const py   = petY.get();
        const dx   = mousePos.current.x - px;
        const dy   = mousePos.current.y - py;
        const dist = Math.hypot(dx, dy);
        const MAX  = 4.2;
        const tx   = dist > 4 ? (dx / dist) * Math.min(MAX, dist * 0.10) : 0;
        const ty   = dist > 4 ? (dy / dist) * Math.min(MAX * 0.65, dist * 0.07) : 0;
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

  // ── Click: pin into the section currently under the pet ──────────────────
  const handleFollowingClick = useCallback(() => {
    const px = petX.get();
    const py = petY.get();

    // Hit-test viewport coordinates → find nearest <section> or <footer>
    const hits      = document.elementsFromPoint(px, py);
    const sectionEl = hits.find(
      (el) => el.tagName === "SECTION" || el.tagName === "FOOTER"
    ) as HTMLElement | undefined;

    if (sectionEl) {
      const rect = sectionEl.getBoundingClientRect();
      isPinnedRef.current = true;
      setIsPinned(true);
      setPinnedData({ element: sectionEl, x: px - rect.left, y: py - rect.top });
      setShowBadge(true);
      setTimeout(() => setShowBadge(false), 2600);
    }
  }, [petX, petY]);

  // ── Click pinned pet: unpin and resume following from same screen position ─
  const handlePinnedClick = useCallback(() => {
    if (!pinnedData) return;
    // Teleport rawX/rawY to pinned element's current on-screen position
    const rect    = pinnedData.element.getBoundingClientRect();
    const screenX = rect.left + pinnedData.x;
    const screenY = rect.top  + pinnedData.y;
    rawX.set(screenX);
    rawY.set(screenY);
    mousePos.current  = { x: screenX, y: screenY };

    isPinnedRef.current = false;
    setIsPinned(false);
    setPinnedData(null);
  }, [pinnedData, rawX, rawY]);

  if (!mounted || reduceMotion) return null;

  return (
    <>
      {/* ── Following pet (fixed, cursor-tracked) ──────────────────────────── */}
      <AnimatePresence>
        {!isPinned && (
          <div className="pointer-events-none fixed inset-0 z-[4]" aria-hidden>
            <motion.div
              style={{
                x: petX,
                y: petY,
                rotate: tilt,
                translateX: "-50%",
                translateY: "-50%",
                position: "absolute",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.88, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.3 } }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="pointer-events-auto cursor-pointer select-none"
                onClick={handleFollowingClick}
                title="Click to sit here!"
              >
                <ShieldPet uid={uid} eye={eye} isPinned={false} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Pinned pet (absolute inside section via portal) ─────────────────── */}
      {isPinned && pinnedData && createPortal(
        <motion.div
          className="pointer-events-none absolute z-[4]"
          style={{
            left:      pinnedData.x,
            top:       pinnedData.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ scale: 0.55, opacity: 0 }}
          animate={{ scale: 1,    opacity: 0.92 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* "GOOD BOY" badge */}
          <AnimatePresence>
            {showBadge && (
              <motion.div
                className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#FFD700] px-3 py-1 text-[10px] font-black tracking-widest text-black shadow-[0_4px_18px_rgba(255,215,0,0.5)]"
                initial={{ opacity: 0, y: 8,  scale: 0.75 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={  { opacity: 0, y: -8,  scale: 0.8  }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                GOOD BOY! 🐾
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating z z z */}
          <motion.span
            className="pointer-events-none absolute -right-7 -top-5 font-bold text-[#FFD700]"
            style={{ fontSize: 10, letterSpacing: 2 }}
            animate={{ opacity: [0, 1, 0], y: [0, -6, -12] }}
            transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
          >
            z z z
          </motion.span>

          {/* Clickable SVG to unpin */}
          <div
            className="pointer-events-auto cursor-pointer select-none"
            onClick={handlePinnedClick}
            title="Click to follow cursor again!"
          >
            <ShieldPet uid={uid} eye={{ x: 0, y: 0 }} isPinned={true} />
          </div>
        </motion.div>,
        pinnedData.element
      )}
    </>
  );
}

/* ── Memoised SVG — only re-renders when eye offsets or pinned state change ── */
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
        duration: isPinned ? 4.8 : 3.6,
        repeat:   Infinity,
        ease:     "easeInOut",
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

      {/* Breathing aura */}
      <motion.path
        d={shield} stroke={isPinned ? "#800000" : "#FFD700"} fill="none"
        animate={{ strokeWidth: [10, 22, 10], strokeOpacity: [0, isPinned ? 0.10 : 0.18, 0] }}
        transition={{ duration: isPinned ? 4.2 : 3.0, repeat: Infinity, ease: "easeInOut" }}
        filter={`url(#${uid}aura)`}
      />

      {/* Shield body + inner ring */}
      <path d={shield}      fill={`url(#${uid}bg)`} />
      <path d={innerShield} fill="none" stroke="#800000" strokeWidth="0.8" strokeOpacity="0.5" />

      {/* Border */}
      <motion.path
        d={shield} stroke={isPinned ? "#800000" : "#FFD700"} strokeWidth="1.7" fill="none"
        animate={{ strokeOpacity: [0.45, 1, 0.45] }}
        transition={{ duration: isPinned ? 4.2 : 3.0, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Circuit decoration */}
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

      {/* Scan line (active only when following) */}
      {!isPinned && (
        <motion.rect
          x="6" y="0" width="58" height="8"
          fill={`url(#${uid}scan)`} clipPath={`url(#${uid}clip)`}
          animate={{ y: [16, 73, 16] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Eyes — happy arcs when pinned, tracking pupils when following */}
      {isPinned ? (
        <>
          <motion.path d="M18 42 Q24 35 30 42" stroke="#FFD700" strokeWidth="2.5"
            strokeLinecap="round" fill="none" filter={`url(#${uid}eg)`}
            animate={{ strokeOpacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity }} />
          <motion.path d="M40 42 Q46 35 52 42" stroke="#FFD700" strokeWidth="2.5"
            strokeLinecap="round" fill="none" filter={`url(#${uid}eg)`}
            animate={{ strokeOpacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: 0.2 }} />
        </>
      ) : (
        <>
          <circle cx="24" cy="41" r="7.5" fill="rgba(0,0,0,0.88)" />
          <circle cx="46" cy="41" r="7.5" fill="rgba(0,0,0,0.88)" />
          <motion.circle cx={24+eye.x} cy={41+eye.y} r="4" fill="#FFD700"
            filter={`url(#${uid}eg)`}
            animate={{ opacity: [0.82, 1, 0.82] }}
            transition={{ duration: 2.2, repeat: Infinity }} />
          <circle cx={22+eye.x*0.45} cy={39+eye.y*0.45} r="1.2" fill="white" opacity="0.88" />
          <motion.circle cx={46+eye.x} cy={41+eye.y} r="4" fill="#FFD700"
            filter={`url(#${uid}eg)`}
            animate={{ opacity: [0.82, 1, 0.82] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.28 }} />
          <circle cx={44+eye.x*0.45} cy={39+eye.y*0.45} r="1.2" fill="white" opacity="0.88" />
        </>
      )}

      {/* Mouth */}
      <motion.rect x="27" y="56" width="16" height="2.8" rx="1.4"
        fill={isPinned ? "#FFD700" : "#800000"} opacity="0.9"
        animate={isPinned
          ? { width: [20, 22, 20], x: [25, 24, 25] }
          : { width: [16, 21, 11, 16], x: [27, 24.5, 29.5, 27] }}
        transition={{ duration: isPinned ? 2.5 : 3.0, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Antenna */}
      <motion.line x1="35" y1="5" x2="35" y2="-7" stroke="#FFD700" strokeWidth="1.3"
        animate={{ strokeOpacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: isPinned ? 3.5 : 1.8, repeat: Infinity }} />
      <motion.circle cx="35" cy="-10" r="3.2"
        fill={isPinned ? "#800000" : "#FFD700"}
        animate={{
          r:    isPinned ? [3.0, 4.5, 3.0] : [2.6, 3.8, 2.6],
          opacity: [0.55, 1, 0.55],
          fill: isPinned ? ["#800000","#ff4444","#800000"] : ["#FFD700","#fffacc","#FFD700"],
        }}
        transition={{ duration: isPinned ? 2.8 : 1.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pulse ring at base */}
      <motion.circle cx="35" cy="79" r="6" fill="none" stroke="#800000" strokeWidth="1.5"
        animate={{ r: [5, 14, 5], strokeOpacity: [0.7, 0, 0.7] }}
        transition={{ duration: isPinned ? 4.5 : 2.6, repeat: Infinity, ease: "easeOut" }}
      />
    </motion.svg>
  );
});
