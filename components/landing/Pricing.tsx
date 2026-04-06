"use client";

import { motion } from "framer-motion";
import { PricingBg } from "./SectionBg";
import { RippleLink } from "./RippleLink";
import {
  fadeSlideUp,
  lineReveal,
  staggerContainer,
  staggerItem,
  staggerTextBlock,
  viewportOnce,
} from "./variants";

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
      className="relative scroll-mt-20 border-y border-[#800000]/40 bg-[linear-gradient(180deg,rgba(128,0,0,0.14)_0%,transparent_42%,rgba(0,0,0,1)_100%)] py-20 sm:py-28"
    >
      <PricingBg />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerTextBlock}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p variants={lineReveal} className="text-sm font-semibold uppercase tracking-widest">
            <span className="text-gradient-shimmer">Pricing</span>
          </motion.p>
          <motion.h2
            variants={lineReveal}
            className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Service plans for teams that want cyber defense handled well
          </motion.h2>
          <motion.p variants={lineReveal} className="mt-4 text-white/70">
            Every plan includes managed protection, operational support, and visibility that scales
            with the applications you protect.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            /*
             * Every column gets the same pt-5 + flex-col so all three cells
             * are identical height containers. The featured card's badge lives
             * in that 20px top slot; non-featured cards leave it blank.
             * This makes the grid rows perfectly uniform across all breakpoints.
             */
            <div key={plan.name} className="flex flex-col pt-5">
              <motion.article
                variants={staggerItem}
                layout
                whileHover={{
                  scale: plan.featured ? 1.03 : 1.025,
                  y: -6,
                  transition: { type: "spring", stiffness: 380, damping: 24 },
                }}
                className={`relative flex flex-1 flex-col rounded-2xl border p-8 ${
                  plan.featured
                    ? "border-[#FFD700]/55 bg-gradient-to-b from-[#FFD700]/12 via-black/80 to-black shadow-[0_0_56px_rgba(255,215,0,0.14)]"
                    : "border-white/10 bg-black/70 hover:border-[#800000]/75"
                }`}
              >
                {/* Decorative top gradient bar — overflow-hidden scoped here only */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 overflow-hidden rounded-t-2xl">
                  <div className="h-full w-full bg-gradient-to-r from-transparent via-[#800000] to-transparent opacity-80" />
                </div>

                {/* "Most popular" badge — sits in the pt-5 space above the card */}
                {plan.featured ? (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.75, y: -4 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    className="absolute -top-[1.1rem] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#800000] bg-[#800000] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white shadow-[0_4px_18px_rgba(128,0,0,0.55)]"
                  >
                    Most popular
                  </motion.span>
                ) : null}

                {/* ── Card body ── */}
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#FFD700]">{plan.price}</span>
                  <span className="text-white/60">{plan.period}</span>
                </div>

                <div className="my-4 h-px w-full bg-gradient-to-r from-[#800000] via-[#FFD700]/25 to-[#800000]" />

                <p className="text-sm font-medium text-[#FFD700]/90">{plan.annual}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/75">{plan.blurb}</p>

                {/* Feature list — flex-1 pushes the CTA to the bottom of every card */}
                <ul className="mt-6 flex-1 space-y-3 text-sm text-white/85">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-0.5 shrink-0 text-[#FFD700]" aria-hidden>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA always anchored to the bottom */}
                <motion.div className="mt-8" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <RippleLink
                    href="#contact"
                    variant={plan.featured ? "gold" : "outline"}
                    fullWidth
                    className={plan.featured ? "" : "!border-[#800000]"}
                  >
                    {plan.cta}
                  </RippleLink>
                </motion.div>
              </motion.article>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeSlideUp}
          className="mt-10 overflow-hidden rounded-2xl border border-dashed border-[#FFD700]/35 bg-black/50 p-8 backdrop-blur-sm sm:flex sm:items-center sm:justify-between sm:text-left"
        >
          <div>
            <h3 className="text-lg font-semibold text-white">Managed Multi-Site & Custom</h3>
            <p className="mt-2 max-w-xl text-sm text-white/70">
              Agencies and larger organizations: tailored programs across multiple sites, custom
              SLAs, dedicated service planning, and 24/7 operations coverage.
            </p>
          </div>
          <motion.div
            className="mt-6 shrink-0 sm:mt-0"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <RippleLink
              href="#contact"
              variant="outline"
              className="!inline-flex !h-11 min-w-[160px] !border-[#FFD700] !bg-transparent !px-6 !text-[#FFD700] hover:!bg-[#FFD700] hover:!text-black"
            >
              Talk to sales
            </RippleLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
