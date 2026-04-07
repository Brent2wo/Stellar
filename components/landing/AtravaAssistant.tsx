"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type Role = "bot" | "user";
type Msg  = { id: number; role: Role; text: string; ts: string };

// ── Knowledge base ────────────────────────────────────────────────────────────
const KB: { keys: string[]; text: string }[] = [
  {
    keys: ["waf", "web application firewall", "application firewall", "firewall"],
    text: "ATRAVA Defense runs a **managed WAF** built on ModSecurity v3 and the OWASP Core Rule Set.\n\nIt inspects every HTTP/S request in real time, blocking **SQL injection, XSS, RFI, command injection**, and hundreds of other attack vectors before they reach your origin server.\n\nResponse inspection is also available for API and data-leak scenarios.",
  },
  {
    keys: ["ddos", "denial of service", "flood", "volumetric attack"],
    text: "Our edge absorbs **DDoS attacks** — volumetric floods and application-layer abuse — through:\n\n• Adaptive rate limiting by IP, endpoint & context\n• IP reputation and real-time threat intelligence\n• Geo controls to filter high-risk regions\n• Challenge-based bot filtering\n\nOur team continuously tunes thresholds so legitimate traffic stays unaffected.",
  },
  {
    keys: ["ssl", "tls", "certificate", "https", "cert"],
    text: "ATRAVA Defense provides **fully managed SSL/TLS**:\n\n• Automated certificate issuance & renewal (no expiry risk)\n• SNI-based multi-domain and wildcard support\n• Custom certificate upload for compliance requirements\n• Seamless HTTPS across all protected sites\n\nZero manual cert management — we handle it end-to-end.",
  },
  {
    keys: ["price", "pricing", "plan", "cost", "how much", "fee"],
    text: "Our managed plans:\n\n**Essential — $79/mo**\n1 site · Scheduled support · Core WAF + SSL · 7-day logs\n\n**Professional — $179/mo**\n1 site · Priority ops · Bot & geo controls · Virtual patching · 30-day logs\n\n**Business — $399/mo**\nUp to 3 sites · 24/7 operations · Advanced controls · 90-day logs\n\nAgencies & enterprises: custom multi-site programmes available.",
  },
  {
    keys: ["start", "onboard", "begin", "sign up", "get started", "setup", "activate"],
    text: "Getting started with ATRAVA Defense is simple:\n\n1. **Pick a plan** — scroll to the Pricing section above.\n2. **Contact us** at hello@atravad.cisoasaservice.io\n3. We handle DNS delegation, SSL provisioning, and WAF policy tuning.\n4. Most sites are **fully protected within 24–48 hours**.\n\nNo complex infrastructure changes required on your end.",
  },
  {
    keys: ["bot", "crawler", "scrape", "abuse", "credential stuffing"],
    text: "Our **bot & abuse defense** detects and blocks:\n\n• Known malicious crawler signatures\n• Scraping and content-theft patterns\n• Credential stuffing & brute-force attempts\n• Headless browser and automation toolkits\n\nRules are tuned to your verified traffic baseline to minimise false positives.",
  },
  {
    keys: ["owasp", "crs", "core rule set", "ruleset"],
    text: "ATRAVA Defense is built on the **OWASP Core Rule Set (CRS)** — the industry standard for WAF coverage.\n\nWe keep CRS versions current and apply **custom exception tuning** to eliminate false positives while maintaining coverage across the OWASP Top 10 and beyond.\n\nCoverage includes: SQLi, XSS, RCE, LFI/RFI, PHP injection, Java injection, and more.",
  },
  {
    keys: ["virtual patch", "patching", "zero day", "cve", "vulnerability", "exploit"],
    text: "**Virtual patching** is one of ATRAVA's most powerful capabilities.\n\nWhen a critical CVE is disclosed, we deploy a WAF rule to **block exploitation at the edge within hours** — without waiting for application code changes or maintenance windows.\n\nEspecially valuable for CMS plugins, library vulnerabilities (Log4j-style events), and fast-moving threat campaigns.",
  },
  {
    keys: ["rate limit", "throttle", "brute force", "rate"],
    text: "Rate limiting in ATRAVA Defense is **context-aware**:\n\n• **Per-IP** — global request throttling\n• **Per-endpoint** — protect /login, /api/*, /register separately\n• **Burst protection** — absorb spikes without blocking legitimate peaks\n• **Lockout thresholds** — progressive delays on repeated failures\n\nAll thresholds are configurable and tuned by our team.",
  },
  {
    keys: ["geo", "country", "ip block", "cidr", "region", "location"],
    text: "**Geo & IP controls** give you precise traffic governance:\n\n• Allow or block specific **countries or regions**\n• Target individual **IPs or CIDR ranges**\n• All decisions are **fully logged** with request metadata\n• Rules can be scoped globally or per-path",
  },
  {
    keys: ["log", "dashboard", "analytics", "monitor", "visibility", "report"],
    text: "Every protected site gets a **tenant-scoped dashboard** showing:\n\n• Real-time request & attack volume\n• Blocked threat categories & attack signatures\n• Geographic traffic distribution\n• Trend charts and policy-trigger history\n\nLog retention: **7 days** (Essential) · **30 days** (Professional) · **90 days** (Business).",
  },
  {
    keys: ["api", "rest", "graphql", "endpoint protection"],
    text: "**API-aware protection** for REST APIs and backend services:\n\n• Authentication format enforcement (Bearer, API key validation)\n• Payload schema and content-type checks\n• Per-endpoint rate limiting\n• Versioning rules for legacy endpoint protection\n• Bot detection tuned for API abuse patterns",
  },
  {
    keys: ["contact", "email", "phone", "reach", "support", "talk", "human"],
    text: "Our cybersecurity team is ready to help:\n\n📧 **hello@atravad.cisoasaservice.io**\n📞 **+63 (2) 000-0000**\n\n**Business hours** — all plans\n**Priority support** — Professional & Business\n**24/7 operations** — Business tier\n\nScroll to the Contact section below to reach us directly.",
  },
  {
    keys: ["tip", "best practice", "recommend", "advice", "how to secure", "posture"],
    text: "**Cybersecurity best practices from our team:**\n\n1. Run WAF in **detection mode** first to baseline your traffic.\n2. Use **virtual patching** for critical CVEs — don't wait for the next deploy.\n3. Apply **rate limits to every auth endpoint** — login, reset, registration.\n4. Enable **geo logging** to spot anomalous spikes from unexpected regions.\n5. Rely on **automated SSL renewal** to prevent certificate lapses.\n6. Treat WAF alerts as **signals, not noise** — tune false positives early.",
  },
  {
    keys: ["intrusion", "ids", "ips", "detection"],
    text: "ATRAVA Defense operates at the **edge inspection layer**, analysing and blocking malicious requests before they hit your infrastructure:\n\n• **Signature-based detection** via CRS rules\n• **Anomaly scoring** — requests exceeding thresholds are blocked\n• **Real-time policy enforcement** — no delayed processing\n• **Response inspection** for data-leak scenarios",
  },
];

const CHIPS = ["What is WAF?", "View pricing", "SSL management", "Bot protection", "Virtual patching", "Get started", "Security tips"];

function now() { return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }

function findAnswer(q: string) {
  const lq = q.toLowerCase();
  for (const e of KB) if (e.keys.some((k) => lq.includes(k))) return e.text;
  return "I don't have specific info on that yet — but our team would love to help!\n\n📧 **hello@atravad.cisoasaservice.io**\n\nOr scroll down to the **Contact section** below.";
}

function Md({ text }: { text: string }) {
  return (
    <span className="block space-y-1 leading-relaxed">
      {text.split("\n").map((line, i) => {
        const parts = line.split(/\*\*(.+?)\*\*/g);
        return (
          <span key={i} className={`block ${line === "" ? "h-1" : ""}`}>
            {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="font-semibold text-white">{p}</strong> : p)}
          </span>
        );
      })}
    </span>
  );
}

// ── Shield FAB icon ────────────────────────────────────────────────────────────
function ShieldFab() {
  return (
    <svg width="32" height="38" viewBox="0 0 70 82" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M35 4 L63 15 L63 40 Q63 62 35 74 Q7 62 7 40 L7 15 Z" fill="rgba(128,0,0,0.7)" stroke="#FFD700" strokeWidth="2.5" />
      <path d="M35 18 L52 25 L52 40 Q52 54 35 62 Q18 54 18 40 L18 25 Z" fill="none" stroke="#FFD700" strokeWidth="0.8" strokeOpacity="0.5" />
      <circle cx="35" cy="38" r="7" fill="#FFD700" opacity="0.9" />
      <path d="M31 38 L34 41 L40 34" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export function AtravaAssistant() {
  const [open, setOpen]       = useState(false);
  const [msgs, setMsgs]       = useState<Msg[]>([]);
  const [input, setInput]     = useState("");
  const [typing, setTyping]   = useState(false);
  const [hasNew, setHasNew]   = useState(false);
  const [mounted, setMounted] = useState(false);
  const bottomRef             = useRef<HTMLDivElement>(null);
  const inputRef              = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    setMsgs([{
      id: 0, role: "bot", ts: now(),
      text: "👋 Hi! I'm **ATRA** — your ATRAVA Defense AI guide.\n\nAsk me anything about our managed WAF, pricing, SSL, bot protection, or cybersecurity best practices.\n\nHow can I help today?",
    }]);
    const t = setTimeout(() => setHasNew(true), 3500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  useEffect(() => {
    if (open) {
      setHasNew(false);
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open]);

  const send = useCallback((text: string) => {
    if (!text.trim() || typing) return;
    setMsgs((p) => [...p, { id: Date.now(), role: "user", text: text.trim(), ts: now() }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((p) => [...p, { id: Date.now() + 1, role: "bot", text: findAnswer(text), ts: now() }]);
    }, 900 + Math.random() * 700);
  }, [typing]);

  if (!mounted) return null;

  return (
    <>
      {/* ── Floating Action Button ────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* "Ask ATRA" nudge tooltip */}
        <AnimatePresence>
          {!open && hasNew && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="rounded-full border border-[#FFD700]/40 bg-black/90 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#FFD700] shadow-lg backdrop-blur"
            >
              Ask ATRA 🛡️
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#FFD700]/70 bg-black shadow-[0_0_24px_rgba(255,215,0,0.25)] transition-shadow hover:shadow-[0_0_40px_rgba(255,215,0,0.45)]"
          aria-label={open ? "Close ATRA assistant" : "Open ATRA assistant"}
        >
          {/* Idle pulse ring */}
          {!open && (
            <motion.span
              className="absolute inset-0 rounded-full border border-[#FFD700]/35"
              animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
          )}

          {/* Icon: shield when closed, X when open */}
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="text-2xl text-[#FFD700]"
              >✕</motion.span>
            ) : (
              <motion.span
                key="shield"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <ShieldFab />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Notification dot */}
          <AnimatePresence>
            {!open && hasNew && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="absolute right-0.5 top-0.5 h-3.5 w-3.5 rounded-full border-2 border-black bg-[#FFD700]"
              />
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Chat Panel ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[5.5rem] right-4 z-50 flex w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-[#FFD700]/25 bg-black/96 shadow-[0_8px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:right-6 sm:w-[390px]"
            style={{ height: "min(530px, calc(100vh - 9rem))" }}
          >
            {/* Header */}
            <div className="relative flex shrink-0 items-center gap-3 border-b border-[#800000]/50 bg-gradient-to-r from-[#800000]/30 via-black/40 to-black/20 px-4 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#FFD700]/40 bg-[#FFD700]/10">
                <ShieldFab />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold tracking-wide text-[#FFD700]">ATRA</p>
                <p className="text-[11px] text-white/55">ATRAVA Defense AI Assistant</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                <span className="text-[11px] text-white/45">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 scrollbar-thin">
              {msgs.map((m) => (
                <div key={m.id} className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  {/* Avatar */}
                  {m.role === "bot" && (
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#FFD700]/35 bg-[#FFD700]/10">
                      <svg width="13" height="16" viewBox="0 0 70 82" fill="none">
                        <path d="M35 4L63 15L63 40Q63 62 35 74Q7 62 7 40L7 15Z" fill="rgba(128,0,0,0.8)" stroke="#FFD700" strokeWidth="3" />
                        <circle cx="35" cy="38" r="8" fill="#FFD700" opacity="0.85" />
                      </svg>
                    </div>
                  )}

                  <div className={`group max-w-[82%] ${m.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-tr-sm bg-[#FFD700] text-black"
                        : "rounded-tl-sm border border-white/8 bg-white/[0.06] text-white/90"
                    }`}>
                      {m.role === "bot" ? <Md text={m.text} /> : m.text}
                    </div>
                    <span className="px-1 text-[10px] text-white/30">{m.ts}</span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex gap-2.5">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#FFD700]/35 bg-[#FFD700]/10">
                    <svg width="13" height="16" viewBox="0 0 70 82" fill="none">
                      <path d="M35 4L63 15L63 40Q63 62 35 74Q7 62 7 40L7 15Z" fill="rgba(128,0,0,0.8)" stroke="#FFD700" strokeWidth="3" />
                      <circle cx="35" cy="38" r="8" fill="#FFD700" opacity="0.85" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-white/8 bg-white/[0.06] px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-[#FFD700]/60"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.18 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick chips */}
            <div className="shrink-0 border-t border-white/8 px-3 py-2">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {CHIPS.map((c) => (
                  <button key={c} onClick={() => send(c)}
                    className="shrink-0 rounded-full border border-[#800000]/60 bg-[#800000]/10 px-3 py-1 text-[11px] text-white/75 transition hover:border-[#FFD700]/60 hover:bg-[#FFD700]/10 hover:text-[#FFD700]"
                  >{c}</button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={(e: FormEvent) => { e.preventDefault(); send(input); }}
              className="shrink-0 flex items-center gap-2 border-t border-white/8 bg-white/[0.03] px-3 py-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about WAF, pricing, SSL…"
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2 text-sm text-white placeholder-white/35 outline-none transition focus:border-[#FFD700]/50 focus:ring-1 focus:ring-[#FFD700]/20"
              />
              <motion.button type="submit" disabled={!input.trim() || typing}
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFD700] text-black shadow-[0_0_14px_rgba(255,215,0,0.35)] transition disabled:opacity-35 disabled:shadow-none"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
