"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { fadeSlideUp, staggerContainer, staggerItem, viewportOnce } from "./variants";

const bars = [42, 68, 55, 82, 71, 94, 76, 88, 63, 91, 79, 97];

const R = 40;
const C = 2 * Math.PI * R;

function CountUp({
  end,
  suffix = "",
  prefix = "",
  className = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame: number;
    const duration = 1600;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.floor(eased * end);
      if (ref.current) ref.current.textContent = `${prefix}${v.toLocaleString()}${suffix}`;
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, prefix, suffix]);

  return <span ref={ref} className={className} />;
}

export function CyberMetrics() {
  return (
    <section
      id="metrics"
      className="scroll-mt-20 border-y border-[#800000]/25 bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,rgba(128,0,0,0.2),transparent_55%)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeSlideUp}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-[#FFD700]">
            Operational visibility
          </p>
          <h2 className="mt-3 border-l-4 border-[#800000] pl-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Edge intelligence you can read at a glance
          </h2>
          <p className="mt-4 text-white/70">
            Illustrative throughput and defense signals—mirroring how teams review blocked traffic,
            attack trends, and tenant-scoped activity in the platform dashboard.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-14 grid gap-8 lg:grid-cols-12"
        >
          <motion.div
            variants={staggerItem}
            className="lg:col-span-5 rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-[#FFD700]/90">
              Traffic profile (sample)
            </p>
            <p className="mt-1 text-sm text-white/55">Requests indexed vs. policy-triggered blocks</p>
            <div className="mt-6 flex h-44 items-end gap-1.5 sm:gap-2">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-[#800000]/80 to-[#FFD700]/90"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.85,
                    delay: i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ minHeight: 4 }}
                />
              ))}
            </div>
            <div className="mt-3 flex justify-between text-[10px] uppercase tracking-wider text-white/40">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>24:00</span>
            </div>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="lg:col-span-4 rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-[#FFD700]/90">
              Block ratio
            </p>
            <div className="relative mx-auto mt-4 h-44 w-44">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <defs>
                  <linearGradient id="metricsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#800000" />
                  </linearGradient>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r={R}
                  fill="none"
                  stroke="rgba(128,0,0,0.35)"
                  strokeWidth="10"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r={R}
                  fill="none"
                  stroke="url(#metricsGrad)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  initial={{ strokeDashoffset: C }}
                  whileInView={{ strokeDashoffset: C * (1 - 0.872) }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <motion.span
                  className="text-3xl font-bold text-white tabular-nums"
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.35 }}
                >
                  87%
                </motion.span>
                <span className="text-xs text-white/50">blocked at edge</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="flex flex-col gap-4 lg:col-span-3">
            <div className="rounded-2xl border border-[#800000]/40 bg-gradient-to-br from-[#800000]/15 to-black/80 px-5 py-4">
              <p className="text-xs text-white/55">Requests inspected (24h)</p>
              <p className="mt-2 text-2xl font-semibold tabular-nums text-[#FFD700]">
                <CountUp end={12400000} suffix="+" />
              </p>
            </div>
            <div className="rounded-2xl border border-[#800000]/40 bg-gradient-to-br from-[#800000]/15 to-black/80 px-5 py-4">
              <p className="text-xs text-white/55">Threat signals actioned</p>
              <p className="mt-2 text-2xl font-semibold tabular-nums text-[#FFD700]">
                <CountUp end={18420} />
              </p>
            </div>
            <div className="rounded-2xl border border-[#800000]/40 bg-gradient-to-br from-[#800000]/15 to-black/80 px-5 py-4">
              <p className="text-xs text-white/55">Median edge latency</p>
              <p className="mt-2 text-2xl font-semibold tabular-nums text-[#FFD700]">
                <span className="text-white/70">&lt;</span>
                <CountUp end={42} suffix="ms" />
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-10 text-center text-xs text-white/40"
        >
          Figures shown are demonstrative and for narrative context—not live tenant data.
        </motion.p>
      </div>
    </section>
  );
}
