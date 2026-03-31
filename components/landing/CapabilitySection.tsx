"use client";

import { motion } from "framer-motion";
import { RippleLink } from "./RippleLink";
import { lineReveal, staggerContainer, staggerItem, staggerTextBlock, viewportOnce } from "./variants";

/* ─────────────────────────────────────────────────────────────────────────────
   Capability data — one entry per core capability of ATRAVA Defense
───────────────────────────────────────────────────────────────────────────── */

const G = "#FFD700";
const M = "#800000";

const CAPABILITIES = [
  {
    id: "waf",
    num: "01",
    badge: "WAF Engine",
    title: "ModSecurity + OWASP Core Rule Set",
    description:
      "Full request and optional response inspection powered by ModSecurity v3 and the OWASP Core Rule Set. Live production traffic is evaluated against a continuously maintained ruleset covering OWASP Top 10 threats, injection attacks, XSS, and more—managed and tuned by our team.",
    points: [
      "Request and response body inspection at the edge",
      "OWASP CRS v3+ with managed rule tuning",
      "False positive reduction and policy refinement",
      "Anomaly scoring with configurable thresholds",
    ],
    Visual: WafVisual,
    bg: "hex",
  },
  {
    id: "virtual-patching",
    num: "02",
    badge: "Virtual Patching",
    title: "Policy-Level Vulnerability Mitigation",
    description:
      "Deploy WAF-level protection for disclosed vulnerabilities before your development team has time to release a patch. Virtual patches block known exploit patterns at the edge, buying critical time without requiring changes to origin application code.",
    points: [
      "Rapid rule deployment for disclosed CVEs",
      "No origin code changes required",
      "Patch window protection for framework vulnerabilities",
      "Coordinated with threat intelligence feeds",
    ],
    Visual: VirtualPatchVisual,
    bg: "diagonal",
  },
  {
    id: "bot-defense",
    num: "03",
    badge: "Bot & Abuse Defense",
    title: "Intelligent Bot Mitigation",
    description:
      "Identify and block malicious bots, scrapers, credential stuffers, and automated attack tools before they reach your application. Our managed rules cover known bad actor signatures, suspicious user-agent patterns, and behavioral abuse signals.",
    points: [
      "Bot signature and user-agent fingerprinting",
      "Credential stuffing and account takeover prevention",
      "Scraping and content harvesting defense",
      "Behavioral abuse pattern detection",
    ],
    Visual: BotVisual,
    bg: "dots",
  },
  {
    id: "rate-limiting",
    num: "04",
    badge: "Adaptive Rate Limiting",
    title: "Context-Aware Traffic Throttling",
    description:
      "Protect login endpoints, APIs, and high-value routes from brute force and volumetric abuse. Rate limits are applied per IP, per endpoint, and per context — with burst tolerance configured to your risk profile and escalation workflows.",
    points: [
      "Per-IP and per-endpoint rate controls",
      "Burst protection for login and API abuse",
      "Configurable window sizes and thresholds",
      "Graduated response: throttle before block",
    ],
    Visual: RateLimitVisual,
    bg: "lines",
  },
  {
    id: "geo-ip",
    num: "05",
    badge: "Geo & IP Controls",
    title: "Geographic and Network-Level Policy",
    description:
      "Enforce access controls at the network layer with country-level blocking, IP allowlists, and CIDR-range policies. All enforcement is logged for incident review, giving your team visibility into containment actions without touching application infrastructure.",
    points: [
      "Country-level allow and block rules",
      "IP and CIDR range management",
      "Allowlist for trusted partner networks",
      "Full logging of all enforcement actions",
    ],
    Visual: GeoVisual,
    bg: "grid",
  },
  {
    id: "api-protection",
    num: "06",
    badge: "API-Specific Protection",
    title: "Structured Defense for APIs and Endpoints",
    description:
      "Apply API-aware rules that understand authentication formats, key validation, version structures, and endpoint sensitivity. Protect REST APIs and backend services with policies built for machine-to-machine traffic, not just browser requests.",
    points: [
      "API key and auth header validation",
      "Version-specific and endpoint-scoped rules",
      "Sensitive endpoint hardening",
      "Schema-aware anomaly detection",
    ],
    Visual: ApiVisual,
    bg: "pcb",
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────────────
   Static background patterns (no motion — CSS only)
───────────────────────────────────────────────────────────────────────────── */

type BgKey = "hex" | "diagonal" | "dots" | "lines" | "grid" | "pcb";

function CapabilityBg({ pattern }: { pattern: BgKey }) {
  const base = "pointer-events-none absolute inset-0 overflow-hidden";

  if (pattern === "hex") return (
    <div className={base} aria-hidden>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="capHex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
            <path d="M15 0 L45 0 L60 26 L45 52 L15 52 L0 26 Z" fill="none" stroke={G} strokeWidth="0.5" opacity="0.08" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#capHex)" />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_0%,rgba(128,0,0,0.12),transparent)]" />
    </div>
  );

  if (pattern === "diagonal") return (
    <div className={base} aria-hidden>
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 28px, ${G} 28px, ${G} 29px)` }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_0%_100%,rgba(128,0,0,0.15),transparent)]" />
    </div>
  );

  if (pattern === "dots") return (
    <div className={base} aria-hidden>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="capDots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="0.9" fill={G} opacity="0.10" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#capDots)" />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_100%_100%,rgba(128,0,0,0.14),transparent)]" />
    </div>
  );

  if (pattern === "lines") return (
    <div className={base} aria-hidden>
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 24px, ${G} 24px, ${G} 25px)` }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_50%,rgba(128,0,0,0.12),transparent)]" />
    </div>
  );

  if (pattern === "grid") return (
    <div className={base} aria-hidden>
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `linear-gradient(rgba(255,215,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.1) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_100%_50%,rgba(128,0,0,0.14),transparent)]" />
    </div>
  );

  // pcb
  return (
    <div className={base} aria-hidden>
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="capPcb" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <line x1="0" y1="24" x2="48" y2="24" stroke={G} strokeWidth="0.5" strokeDasharray="4 8" />
            <line x1="24" y1="0" x2="24" y2="48" stroke={G} strokeWidth="0.5" strokeDasharray="4 8" />
            <circle cx="24" cy="24" r="1.8" fill="none" stroke={M} strokeWidth="0.5" />
            <circle cx="24" cy="24" r="0.7" fill={G} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#capPcb)" />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_55%_at_0%_0%,rgba(128,0,0,0.14),transparent)]" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SVG Visual Components — one per capability
───────────────────────────────────────────────────────────────────────────── */

function WafVisual() {
  return (
    <svg viewBox="0 0 320 280" fill="none" className="w-full max-w-sm mx-auto">
      {/* Layers: Request -> WAF -> Origin */}
      {[
        { y: 20,  label: "INCOMING REQUEST", color: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.2)" },
        { y: 110, label: "WAF ENGINE  •  OWASP CRS", color: "rgba(128,0,0,0.25)", border: M },
        { y: 200, label: "ORIGIN SERVER", color: "rgba(255,215,0,0.08)", border: G },
      ].map((row, i) => (
        <g key={i}>
          <rect x="20" y={row.y} width="280" height="60" rx="8" fill={row.color} stroke={row.border} strokeWidth="1" />
          <text x="160" y={row.y + 35} textAnchor="middle" fill={i === 1 ? M : "rgba(255,255,255,0.7)"} fontSize="11" fontFamily="monospace" letterSpacing="1">{row.label}</text>
        </g>
      ))}
      {/* Arrows */}
      {[80, 170].map((y, i) => (
        <g key={i}>
          <line x1="160" y1={y} x2="160" y2={y + 30} stroke={G} strokeWidth="1.5" />
          <polygon points={`155,${y+30} 165,${y+30} 160,${y+38}`} fill={G} />
        </g>
      ))}
      {/* Shield icon center of WAF layer */}
      <path d="M152 128 L160 122 L168 128 L168 136 Q168 142 160 145 Q152 142 152 136 Z" stroke={G} strokeWidth="1.5" fill="rgba(255,215,0,0.15)" />
      <path d="M157 134 L159 136 L163 131" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Labels */}
      <text x="20" y="15" fill="rgba(255,215,0,0.5)" fontSize="9" fontFamily="monospace">TRAFFIC INSPECTION FLOW</text>
    </svg>
  );
}

function VirtualPatchVisual() {
  return (
    <svg viewBox="0 0 320 280" fill="none" className="w-full max-w-sm mx-auto">
      {/* Code block */}
      <rect x="20" y="30" width="200" height="160" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <rect x="20" y="30" width="200" height="28" rx="8" fill="rgba(255,255,255,0.06)" />
      <text x="36" y="49" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">vulnerability.php</text>
      {/* Code lines */}
      {[80, 100, 120, 140, 160, 175].map((y, i) => (
        <rect key={i} x="36" y={y} width={[120, 80, 140, 60, 100, 80][i]} height="8" rx="2"
          fill={i === 2 ? "rgba(128,0,0,0.4)" : "rgba(255,255,255,0.07)"} />
      ))}
      {/* Vulnerability marker */}
      <rect x="26" y="116" width="4" height="20" rx="2" fill={M} />
      <text x="40" y="112" fill={M} fontSize="9" fontFamily="monospace">CVE-2024-XXXX ↓</text>
      {/* Shield patch overlay */}
      <rect x="200" y="80" width="100" height="110" rx="8" fill="rgba(128,0,0,0.15)" stroke={M} strokeWidth="1.5" />
      <path d="M242 108 L250 102 L258 108 L258 120 Q258 128 250 131 Q242 128 242 120 Z" stroke={G} strokeWidth="1.5" fill="rgba(255,215,0,0.18)" />
      <path d="M246 117 L249 120 L254 113" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <text x="250" y="145" textAnchor="middle" fill={G} fontSize="9" fontFamily="monospace">PATCHED</text>
      <text x="250" y="158" textAnchor="middle" fill={G} fontSize="9" fontFamily="monospace">AT EDGE</text>
      {/* Arrow connecting vuln to patch */}
      <path d="M180 126 Q195 126 200 125" stroke={G} strokeWidth="1" strokeDasharray="4 3" />
      <polygon points="197,121 204,125 197,129" fill={G} />
      <text x="20" y="22" fill="rgba(255,215,0,0.5)" fontSize="9" fontFamily="monospace">VIRTUAL PATCHING</text>
    </svg>
  );
}

function BotVisual() {
  const bots = [[40,40],[40,100],[40,160],[40,220]];
  const legit = [[40,130]]; // one legitimate
  return (
    <svg viewBox="0 0 320 280" fill="none" className="w-full max-w-sm mx-auto">
      <text x="20" y="20" fill="rgba(255,215,0,0.5)" fontSize="9" fontFamily="monospace">BOT TRAFFIC FILTER</text>
      {/* Filter wall */}
      <rect x="150" y="30" width="4" height="240" fill={M} opacity="0.6" />
      <text x="157" y="25" fill={M} fontSize="9" fontFamily="monospace">FILTER</text>
      {/* Bot sources (blocked) */}
      {bots.map(([x,y],i) => (
        <g key={i}>
          <rect x={x} y={y} width="60" height="24" rx="4" fill="rgba(128,0,0,0.2)" stroke={M} strokeWidth="0.8" />
          <text x={x+30} y={y+15} textAnchor="middle" fill={M} fontSize="8" fontFamily="monospace">BOT {i+1}</text>
          <line x1={x+60} y1={y+12} x2="150" y2={y+12} stroke={M} strokeWidth="1" strokeDasharray="4 3" />
          {/* X mark */}
          <line x1="140" y1={y+8} x2="148" y2={y+16} stroke={M} strokeWidth="1.5" />
          <line x1="148" y1={y+8} x2="140" y2={y+16} stroke={M} strokeWidth="1.5" />
        </g>
      ))}
      {/* Legit traffic (passes) */}
      <rect x="40" y="130" width="60" height="24" rx="4" fill="rgba(255,215,0,0.1)" stroke={G} strokeWidth="0.8" />
      <text x="70" y="145" textAnchor="middle" fill={G} fontSize="8" fontFamily="monospace">LEGIT</text>
      <line x1="100" y1="142" x2="154" y2="142" stroke={G} strokeWidth="1.5" />
      <line x1="154" y1="142" x2="270" y2="142" stroke={G} strokeWidth="1.5" />
      <polygon points="265,138 272,142 265,146" fill={G} />
      {/* Server */}
      <rect x="270" y="128" width="40" height="28" rx="4" fill="rgba(255,215,0,0.08)" stroke={G} strokeWidth="0.8" />
      <text x="290" y="145" textAnchor="middle" fill={G} fontSize="8" fontFamily="monospace">ORIGIN</text>
    </svg>
  );
}

function RateLimitVisual() {
  const bars = [55, 70, 48, 92, 110, 85, 65];
  const MAX_H = 100;
  const limit = 80;
  return (
    <svg viewBox="0 0 320 280" fill="none" className="w-full max-w-sm mx-auto">
      <text x="20" y="22" fill="rgba(255,215,0,0.5)" fontSize="9" fontFamily="monospace">REQUESTS PER WINDOW</text>
      {/* Y axis */}
      <line x1="50" y1="40" x2="50" y2="220" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      {/* X axis */}
      <line x1="50" y1="220" x2="300" y2="220" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      {/* Bars */}
      {bars.map((h, i) => {
        const barH = (h / 130) * MAX_H;
        const x = 65 + i * 34;
        const y = 220 - barH * 1.4;
        const blocked = h > limit;
        return (
          <g key={i}>
            <rect x={x} y={y} width="22" height={barH * 1.4} rx="3"
              fill={blocked ? `rgba(128,0,0,0.5)` : `rgba(255,215,0,0.25)`}
              stroke={blocked ? M : G} strokeWidth="0.8" />
          </g>
        );
      })}
      {/* Rate limit threshold line */}
      <line x1="50" y1={220 - (limit / 130) * 140} x2="300" y2={220 - (limit / 130) * 140}
        stroke={M} strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="305" y={220 - (limit / 130) * 140 + 4} fill={M} fontSize="9" fontFamily="monospace">LIMIT</text>
      {/* Labels */}
      <text x="160" y="270" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">TIME WINDOW →</text>
      <text x="20" y={220 - (limit/130)*140 + 4} fill="rgba(255,255,255,0.25)" fontSize="8">80</text>
    </svg>
  );
}

function GeoVisual() {
  const grid: { col: number; row: number; status: "allowed" | "blocked" | "neutral" }[] = [];
  const blocked = [[1,0],[2,1],[0,2],[3,3],[4,0],[1,4]];
  const allowed = [[0,0],[3,1],[2,2],[4,2],[0,3],[3,4],[2,4]];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) {
    const isB = blocked.some(([bc,br]) => bc===c && br===r);
    const isA = allowed.some(([ac,ar]) => ac===c && ar===r);
    grid.push({ col: c, row: r, status: isB ? "blocked" : isA ? "allowed" : "neutral" });
  }
  return (
    <svg viewBox="0 0 320 280" fill="none" className="w-full max-w-sm mx-auto">
      <text x="20" y="22" fill="rgba(255,215,0,0.5)" fontSize="9" fontFamily="monospace">GEO POLICY MAP</text>
      {grid.map(({ col, row, status }, i) => {
        const x = 30 + col * 46, y = 40 + row * 44;
        const fill = status === "blocked" ? "rgba(128,0,0,0.35)" : status === "allowed" ? "rgba(255,215,0,0.15)" : "rgba(255,255,255,0.04)";
        const stroke = status === "blocked" ? M : status === "allowed" ? G : "rgba(255,255,255,0.12)";
        return (
          <g key={i}>
            <rect x={x} y={y} width="38" height="34" rx="5" fill={fill} stroke={stroke} strokeWidth="0.8" />
            {status === "blocked" && <text x={x+19} y={y+20} textAnchor="middle" fill={M} fontSize="12">✕</text>}
            {status === "allowed" && <text x={x+19} y={y+20} textAnchor="middle" fill={G} fontSize="10">✓</text>}
            {status === "neutral" && <circle cx={x+19} cy={y+17} r="4" fill="rgba(255,255,255,0.15)" />}
          </g>
        );
      })}
      {/* Legend */}
      <rect x="30" y="262" width="12" height="10" rx="2" fill="rgba(255,215,0,0.15)" stroke={G} strokeWidth="0.8" />
      <text x="46" y="271" fill="rgba(255,255,255,0.5)" fontSize="9">Allowed</text>
      <rect x="110" y="262" width="12" height="10" rx="2" fill="rgba(128,0,0,0.35)" stroke={M} strokeWidth="0.8" />
      <text x="126" y="271" fill="rgba(255,255,255,0.5)" fontSize="9">Blocked</text>
    </svg>
  );
}

function ApiVisual() {
  const steps = [
    { x: 20,  label: "API CLIENT", sublabel: "Request + Key" },
    { x: 120, label: "AUTH GATE",  sublabel: "Key Validation" },
    { x: 220, label: "ENDPOINT",   sublabel: "Scoped Access"  },
  ];
  return (
    <svg viewBox="0 0 320 280" fill="none" className="w-full max-w-sm mx-auto">
      <text x="20" y="22" fill="rgba(255,215,0,0.5)" fontSize="9" fontFamily="monospace">API PROTECTION CHAIN</text>
      {/* Chain nodes */}
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="80" width="82" height="80" rx="8"
            fill={i === 1 ? "rgba(128,0,0,0.2)" : "rgba(255,215,0,0.06)"}
            stroke={i === 1 ? M : G} strokeWidth="1.2" />
          {/* Lock icon on auth gate */}
          {i === 1 && (
            <>
              <rect x={s.x+31} y="100" width="20" height="16" rx="3" stroke={G} strokeWidth="1.2" fill="rgba(255,215,0,0.12)" />
              <path d={`M${s.x+35} 100 V96 Q${s.x+41} 91 ${s.x+47} 96 V100`} stroke={G} strokeWidth="1.2" fill="none" />
              <circle cx={s.x+41} cy="109" r="2" fill={G} />
            </>
          )}
          {i !== 1 && <circle cx={s.x+41} cy="112" r="12" stroke={G} strokeWidth="1" fill="rgba(255,215,0,0.06)" />}
          <text x={s.x+41} y="174" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="8" fontFamily="monospace">{s.label}</text>
          <text x={s.x+41} y="186" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7">{s.sublabel}</text>
        </g>
      ))}
      {/* Connecting arrows */}
      {[102, 202].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="120" x2={x+18} y2="120" stroke={G} strokeWidth="1.2" />
          <polygon points={`${x+14},116 ${x+20},120 ${x+14},124`} fill={G} />
        </g>
      ))}
      {/* Version badges */}
      <text x="160" y="250" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="monospace">v1  •  v2  •  /api/secure/*</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CapabilitySection — reusable alternating layout
───────────────────────────────────────────────────────────────────────────── */

function CapabilitySection({
  cap,
  flip,
}: {
  cap: (typeof CAPABILITIES)[number];
  flip: boolean;
}) {
  const textBlock = (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerTextBlock}
      className="flex flex-col justify-center"
    >
      {/* Number + badge */}
      <motion.div variants={lineReveal} className="mb-4 flex items-center gap-3">
        <span className="font-mono text-3xl font-bold leading-none text-[#800000]/40">
          {cap.num}
        </span>
        <span className="inline-flex items-center rounded-full border border-[#FFD700]/30 bg-[#FFD700]/[0.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFD700]">
          {cap.badge}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        variants={lineReveal}
        className="border-l-4 border-[#800000] pl-4 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl"
      >
        {cap.title}
      </motion.h2>

      {/* Description */}
      <motion.p
        variants={lineReveal}
        className="mt-5 text-base leading-relaxed text-white/68"
      >
        {cap.description}
      </motion.p>

      {/* Points */}
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mt-6 space-y-3"
      >
        {cap.points.map((pt) => (
          <motion.li
            key={pt}
            variants={staggerItem}
            className="flex items-start gap-3 text-sm text-white/80"
          >
            <span className="mt-0.5 shrink-0 text-[#FFD700]">▸</span>
            <span>{pt}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );

  const visual = (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 shadow-[0_0_0_1px_rgba(255,215,0,0.04)]"
    >
      <cap.Visual />
    </motion.div>
  );

  return (
    <section
      id={cap.id}
      className="relative scroll-mt-20 border-b border-[#800000]/20 py-20 sm:py-28"
    >
      <CapabilityBg pattern={cap.bg} />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${flip ? "lg:[direction:rtl]" : ""}`}
        >
          <div className={flip ? "lg:[direction:ltr]" : ""}>{textBlock}</div>
          <div className={flip ? "lg:[direction:ltr]" : ""}>{visual}</div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Exported component — renders all 6 capability sections
───────────────────────────────────────────────────────────────────────────── */

export function Capabilities() {
  return (
    <>
      {CAPABILITIES.map((cap, i) => (
        <CapabilitySection key={cap.id} cap={cap} flip={i % 2 === 1} />
      ))}
    </>
  );
}
