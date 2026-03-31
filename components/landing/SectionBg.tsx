"use client";

/**
 * SectionBg — static decorative backgrounds per section.
 * All motion animations removed. Pure CSS / SVG patterns only.
 */

const G = "#FFD700";
const M = "#800000";

/* ── HeroBg ─────────────────────────────────────────────────────────────────── */
export function HeroBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Hex grid */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="hexHero" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
            <path d="M15 0 L45 0 L60 26 L45 52 L15 52 L0 26 Z" fill="none" stroke={G} strokeWidth="0.6" opacity="0.09" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexHero)" />
      </svg>
      {/* Corner brackets */}
      {[
        ["left-7 top-7",    "M0 22 V3 Q0 0 3 0 H22"],
        ["right-7 top-7",   "M40 22 V3 Q40 0 37 0 H18"],
        ["left-7 bottom-7", "M0 18 V37 Q0 40 3 40 H22"],
        ["right-7 bottom-7","M40 18 V37 Q40 40 37 40 H18"],
      ].map(([cls, d], i) => (
        <svg key={i} className={`absolute ${cls} opacity-20`} width="40" height="40" fill="none">
          <path d={d} stroke={G} strokeWidth="1.5" />
        </svg>
      ))}
      {/* Static circuit traces */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.08]" viewBox="0 0 1200 500" fill="none" preserveAspectRatio="xMidYMid slice">
        <path d="M80 300 H280 V120 H520 V200 H700" stroke={G} strokeWidth="1.2" />
        <path d="M820 420 H960 V280 H1140" stroke={M} strokeWidth="1" />
        {[[280,300],[520,120],[700,200],[960,420]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="3.5" fill={i < 3 ? G : M} opacity="0.7" />
        ))}
      </svg>
    </div>
  );
}

/* ── FeaturesBg — retained but static ───────────────────────────────────────── */
export function FeaturesBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full opacity-[0.055]" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="dotsFeat" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="16" cy="16" r="1" fill={G} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotsFeat)" />
      </svg>
    </div>
  );
}

/* ── StackBg — static ───────────────────────────────────────────────────────── */
export function StackBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full opacity-[0.05]" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="diagStack" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="40" stroke={G} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagStack)" />
      </svg>
    </div>
  );
}

/* ── MetricsBg — static waveform + reticle ──────────────────────────────────── */
export function MetricsBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Static waveform */}
      <svg className="absolute bottom-0 inset-x-0 w-full opacity-[0.07]" viewBox="0 0 1200 80" preserveAspectRatio="none" fill="none">
        <path d="M0 40 Q150 8 300 40 Q450 72 600 40 Q750 8 900 40 Q1050 72 1200 40" stroke={G} strokeWidth="1.5" />
      </svg>
      {/* Static reticle */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.05]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <circle cx="50" cy="50" r="18" stroke={G} strokeWidth="0.3" fill="none" />
        <circle cx="50" cy="50" r="32" stroke={M} strokeWidth="0.2" strokeDasharray="3 8" fill="none" />
      </svg>
    </div>
  );
}

/* ── PricingBg — static diamond rings + dot grid ───────────────────────────── */
export function PricingBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full opacity-[0.05]" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="dotsPricing" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="0.8" fill={G} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotsPricing)" />
      </svg>
      {/* Static diamond outlines */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[520px] w-[520px]">
          {[
            { size:"520px", border:`1px solid rgba(255,215,0,0.08)`,  rot:45  },
            { size:"370px", border:`1px solid rgba(128,0,0,0.10)`,    rot:30  },
            { size:"220px", border:`1px dashed rgba(255,215,0,0.08)`, rot:15  },
          ].map((d,i) => (
            <div key={i} className="absolute left-1/2 top-1/2"
              style={{ width:d.size, height:d.size, border:d.border,
                transform:`translate(-50%,-50%) rotate(${d.rot}deg)` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── TestimonialsBg — static constellation ─────────────────────────────────── */
const NODES = [
  {x:10,y:20},{x:26,y:8},{x:50,y:14},{x:73,y:9},{x:89,y:24},
  {x:81,y:50},{x:66,y:70},{x:41,y:80},{x:18,y:68},{x:5,y:45},
  {x:36,y:40},{x:61,y:38},
];
const EDGES = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,0],[1,10],[10,11],[11,5],[10,7]];

export function TestimonialsBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none">
        {EDGES.map(([a,b],i) => (
          <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y}
            stroke={i%3===0 ? M : G} strokeWidth="0.12" strokeOpacity="0.12" />
        ))}
        {NODES.map((n,i) => (
          <circle key={i} cx={n.x} cy={n.y} r="0.55" fill={i%3===0 ? M : G} opacity="0.25" />
        ))}
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_35%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
}

/* ── FooterBg — static PCB grid ─────────────────────────────────────────────── */
export function FooterBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="pcbFooter" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <line x1="0" y1="24" x2="48" y2="24" stroke={G} strokeWidth="0.5" strokeDasharray="4 8" />
            <line x1="24" y1="0" x2="24" y2="48" stroke={G} strokeWidth="0.5" strokeDasharray="4 8" />
            <circle cx="24" cy="24" r="2" fill="none" stroke={M} strokeWidth="0.5" />
            <circle cx="24" cy="24" r="0.8" fill={G} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pcbFooter)" />
      </svg>
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background:`linear-gradient(90deg,transparent,${M},transparent)` }} />
    </div>
  );
}
