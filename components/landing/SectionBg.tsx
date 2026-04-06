"use client";

import { motion } from "framer-motion";

const G = "#FFD700";
const M = "#800000";

/* ── HeroBg — hex grid + animated circuit traces + corner brackets ─────────── */
export function HeroBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Hex grid pattern */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="hexHero" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
            <path d="M15 0 L45 0 L60 26 L45 52 L15 52 L0 26 Z" fill="none" stroke={G} strokeWidth="0.6" opacity="0.10" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexHero)" />
      </svg>

      {/* Animated circuit traces */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.13]" viewBox="0 0 1200 500" fill="none" preserveAspectRatio="xMidYMid slice">
        <motion.path d="M80 300 H280 V120 H520 V200 H700"
          stroke={G} strokeWidth="1.2" strokeDasharray="10 14"
          animate={{ strokeDashoffset: [0, -96] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />
        <motion.path d="M820 420 H960 V280 H1140"
          stroke={M} strokeWidth="1" strokeDasharray="8 10"
          animate={{ strokeDashoffset: [0, -72] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
        {[[280,300],[520,120],[700,200],[960,420]].map(([x,y],i) => (
          <motion.circle key={i} cx={x} cy={y} r="3.5" fill={i < 3 ? G : M}
            animate={{ opacity:[0.3,1,0.3], r:[3,4.5,3] }}
            transition={{ duration:2, repeat:Infinity, delay:i*0.5 }} />
        ))}
      </svg>

      {/* Corner brackets */}
      {[
        ["left-7 top-7","M0 22 V3 Q0 0 3 0 H22"],
        ["right-7 top-7","M40 22 V3 Q40 0 37 0 H18"],
        ["left-7 bottom-7","M0 18 V37 Q0 40 3 40 H22"],
        ["right-7 bottom-7","M40 18 V37 Q40 40 37 40 H18"],
      ].map(([cls, d], i) => (
        <svg key={i} className={`absolute ${cls} opacity-25`} width="40" height="40" fill="none">
          <path d={d} stroke={G} strokeWidth="1.5" />
        </svg>
      ))}
    </div>
  );
}

/* ── FeaturesBg — ghost shield outlines + scan line + dot grid ─────────────── */
const SHIELDS = [
  { l:"6%",  t:"6%",  s:130, o:0.06, d:0.0 },
  { l:"80%", t:"4%",  s:95,  o:0.05, d:1.0 },
  { l:"88%", t:"52%", s:150, o:0.07, d:0.5 },
  { l:"2%",  t:"58%", s:105, o:0.05, d:1.5 },
  { l:"42%", t:"74%", s:80,  o:0.04, d:0.8 },
];

export function FeaturesBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {SHIELDS.map((s, i) => (
        <motion.div key={i} style={{ position:"absolute", left:s.l, top:s.t, width:s.s, height:s.s*1.14 }}
          animate={{ opacity:[s.o*0.3, s.o, s.o*0.3] }}
          transition={{ duration:4, repeat:Infinity, ease:"easeInOut", delay:s.d }}>
          <svg viewBox="0 0 70 80" width="100%" height="100%" fill="none">
            <path d="M35 4 L63 15 L63 40 Q63 62 35 74 Q7 62 7 40 L7 15 Z" stroke={M} strokeWidth="1.5" />
            <path d="M35 4 L63 15 L63 40 Q63 62 35 74 Q7 62 7 40 L7 15 Z" stroke={G} strokeWidth="0.7" strokeDasharray="5 7" />
          </svg>
        </motion.div>
      ))}
      {/* Scanning horizontal line */}
      <motion.div className="absolute inset-x-0 h-px"
        style={{ background:`linear-gradient(90deg,transparent,${G}28,transparent)` }}
        animate={{ top:["8%","92%","8%"] }}
        transition={{ duration:9, repeat:Infinity, ease:"linear" }} />
      {/* Dot grid */}
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

/* ── StackBg — diagonal grid + pulsing corner nodes ─────────────────────────── */
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
      {[["3%","8%",G],["94%","8%",G],["3%","88%",M],["94%","88%",M]].map(([l,t,c],i) => (
        <motion.div key={i} className="absolute h-2 w-2 rounded-full"
          style={{ left:l, top:t, backgroundColor:c }}
          animate={{ scale:[1,1.8,1], opacity:[0.25,0.8,0.25] }}
          transition={{ duration:2.5, repeat:Infinity, delay:i*0.6 }} />
      ))}
    </div>
  );
}

/* ── MetricsBg — vertical data streams + flowing waveform + reticle ─────────── */
const STREAMS = Array.from({ length: 11 }, (_,i) => ({
  x:`${7+i*8}%`, h:38+(i*19)%46, del:(i*0.38)%3, dur:2.4+(i*0.28)%2,
}));

export function MetricsBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {STREAMS.map((s,i) => (
        <motion.div key={i} className="absolute top-0 w-px"
          style={{ left:s.x, height:`${s.h}%`,
            background:`linear-gradient(to bottom,transparent,${i%3===0?G:M}38,transparent)` }}
          animate={{ opacity:[0,0.55,0], y:["0%","100%"] }}
          transition={{ duration:s.dur, repeat:Infinity, ease:"linear", delay:s.del }} />
      ))}
      {/* Flowing waveform */}
      <svg className="absolute bottom-0 inset-x-0 w-full opacity-[0.10]" viewBox="0 0 1200 80" preserveAspectRatio="none" fill="none">
        <motion.path
          d="M0 40 Q150 8 300 40 Q450 72 600 40 Q750 8 900 40 Q1050 72 1200 40"
          stroke={G} strokeWidth="1.5" strokeDasharray="18 12"
          animate={{ strokeDashoffset:[0,-90] }}
          transition={{ duration:3, repeat:Infinity, ease:"linear" }} />
      </svg>
      {/* Reticle */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.055]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <circle cx="50" cy="50" r="18" stroke={G} strokeWidth="0.3" fill="none" />
        <circle cx="50" cy="50" r="32" stroke={M} strokeWidth="0.2" strokeDasharray="3 8" fill="none" />
        {[[50,10],[50,74],[10,50],[74,50],[50,28],[50,32]].slice(0,4).map(([x,y],i)=>(
          <line key={i} x1={x} y1={y} x2={x===50?x:y} y2={x===50?y+8:50} stroke={G} strokeWidth="0.4" />
        ))}
      </svg>
    </div>
  );
}

/* ── PricingBg — rotating diamond rings + dot grid + circuit corners ─────────── */
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
      {/* Rotating diamonds — CSS divs avoid SVG transform quirks */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[520px] w-[520px]">
          {[
            { size:"520px", border:`1px solid ${G}18`, dur:28, dir:1  },
            { size:"370px", border:`1px solid ${M}22`, dur:20, dir:-1 },
            { size:"220px", border:`1px dashed ${G}20`, dur:14, dir:1 },
          ].map((d,i) => (
            <motion.div key={i} className="absolute left-1/2 top-1/2"
              style={{ width:d.size, height:d.size, border:d.border,
                marginLeft:`calc(-${d.size}/2)`, marginTop:`calc(-${d.size}/2)` }}
              animate={{ rotate: d.dir > 0 ? [45,405] : [-45,-405] }}
              transition={{ duration:d.dur, repeat:Infinity, ease:"linear" }} />
          ))}
        </div>
      </div>
      {/* Corner accents */}
      <svg className="absolute left-0 top-0 h-28 w-28 opacity-20" viewBox="0 0 100 100" fill="none">
        <path d="M0 55 H28 V28 H65 V0" stroke={G} strokeWidth="1" />
        <circle cx="28" cy="28" r="2.5" fill={G} /><circle cx="65" cy="28" r="2.5" fill={G} />
      </svg>
      <svg className="absolute bottom-0 right-0 h-28 w-28 opacity-20" viewBox="0 0 100 100" fill="none">
        <path d="M100 45 H72 V72 H35 V100" stroke={M} strokeWidth="1" />
        <circle cx="72" cy="72" r="2.5" fill={M} /><circle cx="35" cy="72" r="2.5" fill={M} />
      </svg>
    </div>
  );
}

/* ── TestimonialsBg — constellation network ─────────────────────────────────── */
const NODES = [
  {x:10,y:20},{x:26,y:8},{x:50,y:14},{x:73,y:9},{x:89,y:24},
  {x:81,y:50},{x:66,y:70},{x:41,y:80},{x:18,y:68},{x:5,y:45},
  {x:36,y:40},{x:61,y:38},
];
const EDGES = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,0],[1,10],[10,11],[11,5],[10,7],[2,10],[11,6]];

export function TestimonialsBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none">
        {EDGES.map(([a,b],i) => (
          <motion.line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y}
            stroke={i%3===0 ? M : G} strokeWidth="0.15"
            animate={{ strokeOpacity:[0.04,0.18,0.04] }}
            transition={{ duration:3+(i%3), repeat:Infinity, ease:"easeInOut", delay:(i*0.2)%2.5 }} />
        ))}
        {NODES.map((n,i) => (
          <motion.circle key={i} cx={n.x} cy={n.y} r="0.6" fill={i%3===0 ? M : G}
            animate={{ r:[0.4,0.9,0.4], opacity:[0.15,0.6,0.15] }}
            transition={{ duration:2.8, repeat:Infinity, ease:"easeInOut", delay:(i*0.18)%2.5 }} />
        ))}
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}

/* ── FooterBg — PCB circuit trace grid + corner clusters ─────────────────────── */
export function FooterBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full opacity-[0.08]" preserveAspectRatio="xMidYMid slice">
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
      {/* Top edge glow */}
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background:`linear-gradient(90deg,transparent,${M},transparent)` }} />
      {/* Bottom-left circuit cluster */}
      <svg className="absolute bottom-0 left-0 h-36 w-36 opacity-[0.18]" viewBox="0 0 120 120" fill="none">
        <path d="M0 90 H32 V60 H62 V30 H92 V0" stroke={G} strokeWidth="0.9" />
        <path d="M0 108 H22 V78 H52 V48 H82 V18 H112 V0" stroke={M} strokeWidth="0.5" strokeDasharray="3 5" />
        {[[32,60],[62,30],[92,0]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="2.5" fill={i%2===0?G:M} />
        ))}
      </svg>
      {/* Top-right circuit cluster */}
      <svg className="absolute right-0 top-0 h-36 w-36 opacity-[0.18]" viewBox="0 0 120 120" fill="none">
        <path d="M120 30 H88 V60 H58 V90 H28 V120" stroke={G} strokeWidth="0.9" />
        {[[88,60],[58,90],[28,120]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="2.5" fill={i%2===0?G:M} />
        ))}
      </svg>
    </div>
  );
}
