import { Reveal } from "./Reveal";

const highlights = [
  {
    title: "Threat inspection",
    body: "Full request and optional response inspection for live production traffic.",
    icon: ScanIcon,
  },
  {
    title: "SSL handling",
    body: "Auto or custom certificates with managed onboarding and SNI-based domains.",
    icon: LockIcon,
  },
  {
    title: "Traffic controls",
    body: "Geo, IP, rate limits, and bot-aware rules aligned to your risk profile.",
    icon: SlidersIcon,
  },
  {
    title: "Observability",
    body: "Logs, trends, attack views, and tenant-scoped activity in one place.",
    icon: ChartIcon,
  },
];

const stack = [
  {
    title: "ModSecurity + OWASP CRS",
    body: "Request and response inspection backed by ModSecurity v3 and OWASP Core Rule Set coverage.",
  },
  {
    title: "Virtual patching",
    body: "Policy-level mitigation for exposed vulnerabilities without waiting on origin code changes.",
  },
  {
    title: "Bot and abuse defense",
    body: "Suspicious agents, crawler signatures, scraping patterns, and automated attack traffic.",
  },
  {
    title: "Adaptive rate limiting",
    body: "Throttle by IP, endpoint, and context with burst protection for login and API abuse.",
  },
  {
    title: "Geo and IP controls",
    body: "Allowlist or block countries, IPs, and CIDR ranges with logging for containment.",
  },
  {
    title: "API-specific protection",
    body: "API keys, auth format expectations, and version rules for sensitive endpoints.",
  },
];

export function Features() {
  return (
    <>
      <section id="features" className="scroll-mt-20 border-b border-[#800000]/30 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#FFD700]">
                Managed security posture
              </p>
              <h2 className="mt-3 border-l-4 border-[#800000] pl-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Protection built for live production traffic
              </h2>
              <p className="mt-4 text-white/70">
                Designed for websites, APIs, SaaS teams, and managed customer environments.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((f, i) => (
              <Reveal key={f.title} delayMs={i * 60}>
                <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 transition hover:border-[#FFD700]/40 hover:shadow-[0_0_0_1px_rgba(255,215,0,0.15)]">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#FFD700]/30 bg-[#FFD700]/10 text-[#FFD700] transition group-hover:border-[#800000] group-hover:bg-[#800000]/40">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">{f.body}</p>
                  <div className="mt-4 h-px w-12 bg-[#800000] transition group-hover:w-full group-hover:bg-[#FFD700]/50" />
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <ul className="mt-12 flex flex-wrap gap-3">
              {["OWASP CRS coverage", "Multi-tenant controls", "Analytics & logging", "Managed SSL"].map(
                (tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-[#800000]/60 px-4 py-1.5 text-xs font-medium text-white/85"
                  >
                    {tag}
                  </li>
                ),
              )}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="stack" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#FFD700]">
                Core capabilities
              </p>
              <h2 className="mt-3 border-l-4 border-[#800000] pl-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                The protection stack your customers expect from a serious WAF
              </h2>
              <p className="mt-4 text-white/70">
                Reverse-proxy edge, policy-driven inspection, certificate automation, operational
                visibility, and tenant-scoped control in one managed layer.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stack.map((item, i) => (
              <Reveal key={item.title} delayMs={i * 50}>
                <article className="h-full rounded-2xl border border-white/10 bg-black p-6 transition hover:border-[#800000]/80 hover:bg-[#800000]/10">
                  <h3 className="text-lg font-semibold text-[#FFD700]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ScanIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 4h10v4H7V4ZM5 10h14v10H5V10Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 14h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 11V8a4 4 0 0 1 8 0v3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15" r="1.25" fill="currentColor" />
    </svg>
  );
}

function SlidersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M8 7V5M16 7v2M4 17h16M10 17v2M14 17v-2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="8" cy="7" r="1.5" fill="currentColor" />
      <circle cx="16" cy="17" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 19h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 16V10M12 16V6M17 16v-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
