"use client";

import { motion } from "framer-motion";
import { HeroBg } from "./SectionBg";
import { RippleLink } from "./RippleLink";
import { staggerContainer, staggerItem } from "./variants";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-[#800000]/40"
      aria-labelledby="hero-heading"
    >
      <HeroBg />
      {/* Local depth only — global cursor/parallax lives in CursorParallaxBackground */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.55)_100%)]" />

      <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8 lg:pb-32 lg:pt-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerContainer}
        >
          <motion.p
            variants={staggerItem}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFD700]/35 bg-[#FFD700]/[0.06] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] sm:text-sm"
          >
            <span className="text-gradient-shimmer">Managed WAF-as-a-service</span>
          </motion.p>

          <motion.div variants={staggerItem}>
            <h1
              id="hero-heading"
              className="max-w-4xl text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.12]"
            >
              Let us take care of your{" "}
              <GradientText>cyber defense</GradientText> so you can focus on what you do best:
              running and growing your business.
            </h1>
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg"
          >
            ATRAVA Defense is a managed WAF service that protects your websites and APIs with
            continuous monitoring, policy enforcement, threat blocking, managed SSL, and security
            operations support—delivered by Filipino cybersecurity professionals for production-ready
            defense.
          </motion.p>

          <motion.div variants={staggerItem} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <RippleLink href="#pricing" variant="gold">
              Start protected access
            </RippleLink>
            <RippleLink href="#features" variant="outline">
              See what is protected
            </RippleLink>
          </motion.div>

          <motion.div variants={staggerItem} className="mt-14 grid gap-4 border-t border-[#800000]/50 pt-10 sm:grid-cols-3">
            {[
              { k: "Active", v: "Threat inspection" },
              { k: "SSL", v: "Managed & custom certs" },
              { k: "Edge", v: "Policy-driven protection" },
            ].map((item, i) => (
              <motion.div
                key={item.k}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_0_1px_rgba(255,215,0,0.04)] backdrop-blur-sm transition-shadow hover:shadow-[0_0_24px_rgba(255,215,0,0.08)]"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[#FFD700]">
                  {item.k}
                </p>
                <p className="mt-1 text-sm text-white/80">{item.v}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="inline-block bg-clip-text text-transparent"
      style={{
        backgroundImage:
          "linear-gradient(90deg, #FFD700 0%, #FFD700 35%, #800000 65%, #FFD700 100%)",
        backgroundSize: "220% 100%",
      }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  );
}
