"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeSlideUp, staggerContainer, staggerItem, viewportOnce } from "./variants";

const social = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: LinkedInIcon,
  },
  {
    name: "X",
    href: "https://twitter.com",
    icon: XIcon,
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: GitHubIcon,
  },
];

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 bg-black pb-14 pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid gap-14 lg:grid-cols-[1.15fr_1fr]"
        >
          <motion.div variants={staggerItem}>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#FFD700]">
              ATRAVA Defense
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
              Protect production websites and APIs with a managed enterprise WAF
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65">
              Deliver credible protection with managed SSL, policy enforcement, threat visibility, and
              controls built for live environments—operated by Filipino cybersecurity professionals.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#pricing"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[#FFD700] px-6 text-sm font-semibold text-black transition hover:bg-[#e6c200]"
                >
                  Start with ATRAVA Defense
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#pricing"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-[#800000] px-6 text-sm font-semibold text-white transition hover:border-[#FFD700]/50 hover:bg-[#800000]/35"
                >
                  Review pricing
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#800000]">
                Contact
              </h3>
              <div className="mt-4 h-px w-12 bg-gradient-to-r from-[#FFD700] to-transparent" />
              <ul className="mt-5 space-y-3 text-sm text-white/75">
                <li>
                  <a
                    href="mailto:hello@atravad.cisoasaservice.io"
                    className="transition hover:text-[#FFD700]"
                  >
                    hello@atravad.cisoasaservice.io
                  </a>
                </li>
                <li>
                  <a href="tel:+6320000000" className="transition hover:text-[#FFD700]">
                    +63 (2) 000-0000
                  </a>
                </li>
                <li className="text-white/50">Business hours &amp; 24/7 on select plans</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#800000]">
                Follow
              </h3>
              <div className="mt-4 h-px w-12 bg-gradient-to-r from-[#FFD700] to-transparent" />
              <ul className="mt-5 flex flex-wrap gap-3">
                {social.map((s) => (
                  <li key={s.name}>
                    <motion.a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2, scale: 1.06 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-[#FFD700] transition hover:border-[#FFD700]/60 hover:bg-[#800000]/30 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]"
                      aria-label={s.name}
                    >
                      <s.icon className="h-5 w-5" />
                    </motion.a>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs text-white/40">
                Reference:{" "}
                <a
                  href="https://atravad-waf.cisoasaservice.io/"
                  className="text-[#FFD700]/85 underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  atravad-waf.cisoasaservice.io
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeSlideUp}
          className="mt-16 border-t border-[#800000]/50 pt-10"
        >
          <div className="flex flex-col gap-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} ATRAVA Defense. All rights reserved.</p>
            <div className="flex flex-wrap gap-6">
              <Link href="#" className="transition hover:text-[#FFD700]">
                Privacy
              </Link>
              <Link href="#" className="transition hover:text-[#FFD700]">
                Terms
              </Link>
              <Link href="#contact" className="transition hover:text-[#FFD700]">
                Security disclosure
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.13V23h-4v-7.35c0-1.75-.03-4-2.44-4-2.44 0-2.81 1.9-2.81 3.87V23h-4V8z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}
