"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

type InViewCounterProps = {
  end: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

/**
 * Re-runs count animation every time the stat scrolls into view (lively metrics).
 */
export function InViewCounter({ end, suffix = "", prefix = "", className = "" }: InViewCounterProps) {
  const [session, setSession] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.35,
    rootMargin: "-5% 0px",
    onChange: (visible) => {
      if (visible) setSession((s) => s + 1);
    },
  });

  return (
    <span ref={ref} className={className}>
      {inView ? <CountUp key={session} end={end} prefix={prefix} suffix={suffix} /> : "—"}
    </span>
  );
}

function CountUp({
  end,
  suffix,
  prefix,
}: {
  end: number;
  suffix: string;
  prefix: string;
}) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame: number;
    const duration = 1650;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.floor(eased * end);
      if (el.current) el.current.textContent = `${prefix}${v.toLocaleString()}${suffix}`;
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, prefix, suffix]);

  return <span ref={el} className="tabular-nums" />;
}
