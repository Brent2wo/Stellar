"use client";

import { motion } from "framer-motion";
import { useMemo, useState, type ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import { Bar, Line } from "react-chartjs-2";
import "./chart-register";
import { barChartOptions, lineChartOptions } from "./chart-theme";

const GOLD = "#FFD700";
const MAROON = "#800000";

const shellTransition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
};

type ChartViewportCardProps = {
  title: string;
  subtitle: string;
  children: (chartKey: number) => ReactNode;
};

function ChartViewportCard({ title, subtitle, children }: ChartViewportCardProps) {
  const [chartKey, setChartKey] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.22,
    rootMargin: "-6% 0px -6% 0px",
    onChange: (visible) => {
      if (visible) setChartKey((k) => k + 1);
    },
  });

  return (
    <div
      ref={ref}
      className="h-full rounded-2xl border border-white/10 bg-black/60 p-5 shadow-[0_0_0_1px_rgba(255,215,0,0.04)] backdrop-blur-sm sm:p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[#FFD700]/90">{title}</p>
      <p className="mt-1 text-sm text-white/55">{subtitle}</p>

      <motion.div
        className="relative mt-4 h-[220px] w-full origin-center sm:h-[240px]"
        initial={false}
        animate={
          inView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.92 }
        }
        transition={shellTransition}
      >
        {inView ? (
          <div className="h-full w-full">{children(chartKey)}</div>
        ) : (
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-white/[0.08] bg-black/50 text-xs text-white/35">
            Scroll into view to replay
          </div>
        )}
      </motion.div>
    </div>
  );
}

export function MetricsBarChart() {
  const data = useMemo(
    () => ({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Edge throughput (M req)",
          data: [2.1, 2.4, 2.2, 2.9, 3.2, 2.7, 2.4],
          borderColor: MAROON,
          borderWidth: 1,
          borderRadius: 8,
          borderSkipped: false,
          backgroundColor(context: import("chart.js").ScriptableContext<"bar">) {
            const { chart } = context;
            const { ctx, chartArea } = chart;
            if (!chartArea) return `${GOLD}aa`;
            const g = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            g.addColorStop(0, `${MAROON}dd`);
            g.addColorStop(0.45, `${GOLD}88`);
            g.addColorStop(1, `${GOLD}cc`);
            return g;
          },
        },
      ],
    }),
    [],
  );

  return (
    <ChartViewportCard
      title="Traffic profile (sample)"
      subtitle="Indexed edge requests by day (illustrative)"
    >
      {(key) => <Bar key={key} data={data} options={barChartOptions} />}
    </ChartViewportCard>
  );
}

export function MetricsLineChart() {
  const data = useMemo(
    () => ({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Threat signals blocked (k)",
          data: [118, 142, 128, 176, 162, 189],
          borderColor: GOLD,
          backgroundColor: "rgba(128, 0, 0, 0.38)",
          borderWidth: 2,
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: GOLD,
          pointBorderColor: MAROON,
          pointBorderWidth: 1,
        },
      ],
    }),
    [],
  );

  return (
    <ChartViewportCard
      title="Defense trend"
      subtitle="Policy-triggered blocks over time (illustrative)"
    >
      {(key) => <Line key={key} data={data} options={lineChartOptions} />}
    </ChartViewportCard>
  );
}
