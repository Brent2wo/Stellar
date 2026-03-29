"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { MetricsBarChart, MetricsLineChart } from "./MetricsChartPanels";
import {
  lineReveal,
  staggerContainer,
  staggerItem,
  staggerTextBlock,
  viewportOnce,
} from "./variants";

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
          variants={staggerTextBlock}
          className="max-w-2xl"
        >
          <motion.p
            variants={lineReveal}
            className="text-sm font-semibold uppercase tracking-widest text-[#FFD700]"
          >
            Operational visibility
          </motion.p>
          <motion.h2
            variants={lineReveal}
            className="mt-3 border-l-4 border-[#800000] pl-4 text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Edge intelligence you can read at a glance
          </motion.h2>
          <motion.p variants={lineReveal} className="mt-4 text-white/70">
            Illustrative throughput and defense signals—mirroring how teams review blocked traffic,
            attack trends, and tenant-scoped activity in the platform dashboard.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-14 grid gap-6 lg:grid-cols-2"
        >
          <motion.div variants={staggerItem}>
            <MetricsBarChart />
          </motion.div>
          <motion.div variants={staggerItem}>
            <MetricsLineChart />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-stretch"
        >
          <motion.div
            variants={staggerItem}
            className="flex justify-center lg:col-span-4 lg:justify-start"
          >
            <div className="relative h-52 w-52 sm:h-56 sm:w-56">
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

          <motion.div variants={staggerItem} className="flex flex-col justify-center gap-4 lg:col-span-8">
            <div className="rounded-2xl border border-[#800000]/40 bg-gradient-to-br from-[#800000]/15 to-black/80 px-5 py-4">
              <p className="text-xs text-white/55">Requests inspected (24h)</p>
              <p className="mt-2 text-2xl font-semibold tabular-nums text-[#FFD700]">
                <CountUp end={12400000} suffix="+" />
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
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
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 text-center text-xs text-white/40"
        >
          Figures shown are demonstrative and for narrative context—not live tenant data.
        </motion.p>
      </div>
    </section>
  );
}
