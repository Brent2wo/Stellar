"use client";

import { useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import { Bar, Line } from "react-chartjs-2";
import "./chart-register";
import { barChartOptions, lineChartOptions } from "./chart-theme";

const GOLD = "#FFD700";
const MAROON = "#800000";

function useRevealMount() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -8% 0px", amount: 0.2 });
  return { ref, mounted: inView };
}

export function MetricsBarChart() {
  const { ref, mounted } = useRevealMount();

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
    <div
      ref={ref}
      className="h-full rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur-sm sm:p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[#FFD700]/90">
        Traffic profile (sample)
      </p>
      <p className="mt-1 text-sm text-white/55">Indexed edge requests by day (illustrative)</p>
      <div className="relative mt-4 h-[220px] w-full sm:h-[240px]">
        {mounted ? (
          <Bar data={data} options={barChartOptions} />
        ) : (
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-white/10 bg-black/40 text-xs text-white/35">
            Scroll to load chart
          </div>
        )}
      </div>
    </div>
  );
}

export function MetricsLineChart() {
  const { ref, mounted } = useRevealMount();

  const data = useMemo(
    () => ({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Threat signals blocked (k)",
          data: [118, 142, 128, 176, 162, 189],
          borderColor: GOLD,
          backgroundColor: `${MAROON}55`,
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
    <div
      ref={ref}
      className="h-full rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur-sm sm:p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[#FFD700]/90">
        Defense trend
      </p>
      <p className="mt-1 text-sm text-white/55">Policy-triggered blocks over time (illustrative)</p>
      <div className="relative mt-4 h-[220px] w-full sm:h-[240px]">
        {mounted ? (
          <Line data={data} options={lineChartOptions} />
        ) : (
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-white/10 bg-black/40 text-xs text-white/35">
            Scroll to load chart
          </div>
        )}
      </div>
    </div>
  );
}
