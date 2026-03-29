"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useId, useState, type ReactNode } from "react";

type Ripple = { id: number; x: number; y: number };

type RippleLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  variant?: "gold" | "outline";
  /** Narrow padding for nav / toolbars */
  compact?: boolean;
  /** Full-width block (e.g. pricing cards) */
  fullWidth?: boolean;
  onClick?: () => void;
};

/**
 * Maroon ripple burst on press; gold variant adds persistent glow on hover.
 */
export function RippleLink({
  href,
  className = "",
  children,
  variant = "gold",
  compact = false,
  fullWidth = false,
  onClick,
}: RippleLinkProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const uid = useId();

  const addRipple = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipples((r) => [
      ...r,
      {
        id: Date.now() + Math.random(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    ]);
    window.setTimeout(() => {
      setRipples((r) => r.slice(1));
    }, 650);
  }, []);

  const size =
    compact
      ? "min-w-0 rounded-full px-4 py-2 text-sm"
      : fullWidth
        ? "flex h-11 w-full min-w-0 items-center justify-center rounded-full text-sm font-semibold"
        : "inline-flex min-w-[200px] items-center justify-center rounded-full px-8 py-3 text-sm font-semibold";

  const base =
    variant === "gold"
      ? `${size} relative overflow-hidden bg-[#FFD700] text-black shadow-[0_0_0_1px_rgba(255,215,0,0.35)] transition-shadow hover:shadow-[0_0_36px_rgba(255,215,0,0.55),0_0_60px_rgba(255,215,0,0.15)]`
      : `${size} relative overflow-hidden border border-[#800000] bg-white/[0.04] text-white backdrop-blur-sm transition-colors hover:border-[#FFD700]/55 hover:bg-[#800000]/38`;

  return (
    <Link
      href={href}
      className={`${base} ${className}`}
      onMouseDown={addRipple}
      onClick={onClick}
    >
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={`${uid}-${r.id}`}
            className="pointer-events-none absolute rounded-full bg-[#800000]/50"
            style={{ left: r.x, top: r.y, width: 24, height: 24, marginLeft: -12, marginTop: -12 }}
            initial={{ scale: 0.2, opacity: 0.85 }}
            animate={{ scale: 14, opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
