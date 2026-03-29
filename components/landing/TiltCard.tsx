"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
};

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 22, mass: 0.4 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-7deg", "7deg"]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="perspective-[1200px]" style={{ perspective: 1200 }}>
      <motion.article
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`relative z-0 h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition-shadow duration-300 hover:z-10 hover:border-[#FFD700]/35 hover:shadow-[0_0_40px_rgba(255,215,0,0.12),0_24px_48px_rgba(0,0,0,0.45)] ${className}`}
      >
        {children}
      </motion.article>
    </div>
  );
}
