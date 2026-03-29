import type { ChartOptions } from "chart.js";

const GOLD = "#FFD700";
const MAROON = "#800000";
const TEXT = "rgba(255,255,255,0.65)";
const GRID = "rgba(255,255,255,0.06)";

const baseAnimation = {
  duration: 1500,
  easing: "easeOutQuart" as const,
};

/** Shared Chart.js animation phases for smooth re-draw on each mount */
const chartAnimations = {
  colors: {
    type: "color" as const,
    properties: ["color", "backgroundColor", "borderColor"],
    duration: 1500,
    easing: "easeOutQuart" as const,
  },
  numbers: {
    type: "number" as const,
    properties: ["x", "y", "width", "height", "innerRadius", "outerRadius"],
    duration: 1500,
    easing: "easeOutQuart" as const,
  },
};

export const barChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: baseAnimation,
  animations: chartAnimations,
  interaction: { intersect: false, mode: "index" },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "rgba(0,0,0,0.88)",
      borderColor: `${GOLD}44`,
      borderWidth: 1,
      titleColor: GOLD,
      bodyColor: TEXT,
      padding: 12,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { color: GRID },
      ticks: { color: TEXT, font: { size: 11 } },
      border: { color: `${MAROON}66` },
    },
    y: {
      beginAtZero: true,
      grid: { color: GRID },
      ticks: { color: TEXT, font: { size: 11 } },
      border: { color: `${MAROON}66` },
    },
  },
};

export const lineChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: baseAnimation,
  animations: chartAnimations,
  interaction: { intersect: false, mode: "index" },
  plugins: {
    legend: {
      display: true,
      position: "top",
      align: "end",
      labels: {
        color: TEXT,
        usePointStyle: true,
        padding: 16,
        font: { size: 11 },
      },
    },
    tooltip: {
      backgroundColor: "rgba(0,0,0,0.88)",
      borderColor: `${GOLD}44`,
      borderWidth: 1,
      titleColor: GOLD,
      bodyColor: TEXT,
      padding: 12,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { color: GRID },
      ticks: { color: TEXT, font: { size: 11 } },
      border: { color: `${MAROON}66` },
    },
    y: {
      beginAtZero: true,
      grid: { color: GRID },
      ticks: { color: TEXT, font: { size: 11 } },
      border: { color: `${MAROON}66` },
    },
  },
};
