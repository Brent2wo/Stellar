import Link from "next/link";
import { Reveal } from "./Reveal";

const plans = [
  {
    name: "Managed Essential",
    price: "$79",
    period: "/mo",
    annual: "$790 billed annually",
    blurb: "Smaller teams that need dependable baseline coverage and guided onboarding.",
    features: [
      "1 protected website or application",
      "Managed WAF monitoring with scheduled support",
      "7-day logs & 30-day analytics retention",
      "Managed SSL and domain onboarding support",
      "Threat blocking with core analytics",
      "Email support during business hours",
    ],
    cta: "Get started",
    featured: false,
  },
  {
    name: "Managed Professional",
    price: "$179",
    period: "/mo",
    annual: "$1,790 billed annually",
    blurb: "Growing businesses that need stronger protection and regular policy tuning.",
    features: [
      "1 protected website or application",
      "Priority managed WAF operations",
      "Bot mitigation, geo controls, rate limiting",
      "Virtual patching & tuned policy adjustments",
      "30-day logs & 90-day analytics retention",
      "Priority support & faster response",
    ],
    cta: "Get started",
    featured: true,
  },
  {
    name: "Managed Business",
    price: "$399",
    period: "/mo",
    annual: "$3,990 billed annually",
    blurb: "Business-critical apps with higher-touch defense and faster escalation.",
    features: [
      "Up to 3 protected websites or applications",
      "24/7 managed WAF operations & escalation",
      "Advanced threat controls & hands-on tuning",
      "90-day logs & 180-day analytics retention",
      "Priority support with faster targets",
      "Commercial-grade onboarding & guidance",
    ],
    cta: "Get started",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-y border-[#800000]/40 bg-[linear-gradient(180deg,rgba(128,0,0,0.12)_0%,transparent_45%,rgba(0,0,0,1)_100%)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#FFD700]">Pricing</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Service plans for teams that want cyber defense handled well
            </h2>
            <p className="mt-4 text-white/70">
              Every plan includes managed protection, operational support, and visibility that scales
              with the applications you protect.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delayMs={i * 80}>
              <article
                className={`relative flex h-full flex-col rounded-2xl border p-8 transition ${
                  plan.featured
                    ? "border-[#FFD700]/55 bg-gradient-to-b from-[#FFD700]/10 to-black shadow-[0_0_48px_rgba(255,215,0,0.12)]"
                    : "border-white/10 bg-black/60 hover:border-[#800000]/70"
                }`}
              >
                {plan.featured ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-[#800000] bg-[#800000] px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
                    Most popular
                  </span>
                ) : null}
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#FFD700]">{plan.price}</span>
                  <span className="text-white/60">{plan.period}</span>
                </div>
                <p className="mt-3 text-sm font-medium text-[#FFD700]/90">{plan.annual}</p>
                <p className="mt-4 text-sm text-white/75">{plan.blurb}</p>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-white/85">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-0.5 text-[#FFD700]" aria-hidden>
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#contact"
                  className={`mt-8 inline-flex h-11 items-center justify-center rounded-full text-sm font-semibold transition ${
                    plan.featured
                      ? "bg-[#FFD700] text-black hover:bg-[#e6c200]"
                      : "border border-[#800000] text-white hover:border-[#FFD700] hover:bg-[#800000]/50"
                  }`}
                >
                  {plan.cta}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <article className="mt-10 rounded-2xl border border-dashed border-[#FFD700]/35 bg-black/40 p-8 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
            <div>
              <h3 className="text-lg font-semibold text-white">Managed Multi-Site & Custom</h3>
              <p className="mt-2 max-w-xl text-sm text-white/70">
                Agencies and larger organizations: tailored programs across multiple sites, custom
                SLAs, dedicated service planning, and 24/7 operations coverage.
              </p>
            </div>
            <Link
              href="#contact"
              className="mt-6 inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-[#FFD700] px-6 text-sm font-semibold text-[#FFD700] transition hover:bg-[#FFD700] hover:text-black sm:mt-0"
            >
              Talk to sales
            </Link>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
