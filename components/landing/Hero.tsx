import Link from "next/link";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-[#800000]/40"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,215,0,0.12),transparent)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-[#800000]/20 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8 lg:pb-32 lg:pt-24">
        <Reveal>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFD700]/35 bg-[#FFD700]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#FFD700] sm:text-sm">
            Managed WAF-as-a-service
          </p>
        </Reveal>
        <Reveal delayMs={80}>
          <h1
            id="hero-heading"
            className="max-w-4xl text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.12]"
          >
            Let us take care of your{" "}
            <span className="text-[#FFD700]">cyber defense</span> so you can focus on what you do
            best: running and growing your business.
          </h1>
        </Reveal>
        <Reveal delayMs={140}>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
            ATRAVA Defense is a managed WAF service that protects your websites and APIs with
            continuous monitoring, policy enforcement, threat blocking, managed SSL, and security
            operations support—delivered by Filipino cybersecurity professionals for production-ready
            defense.
          </p>
        </Reveal>
        <Reveal delayMs={200}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#pricing"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#FFD700] px-8 text-sm font-semibold text-black transition hover:bg-[#e6c200] hover:shadow-[0_0_24px_rgba(255,215,0,0.35)]"
            >
              Start protected access
            </Link>
            <Link
              href="#features"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#800000] bg-transparent px-8 text-sm font-semibold text-white transition hover:border-[#FFD700] hover:bg-[#800000]/40"
            >
              See what is protected
            </Link>
          </div>
        </Reveal>
        <Reveal delayMs={260}>
          <div className="mt-14 grid gap-4 border-t border-[#800000]/50 pt-10 sm:grid-cols-3">
            {[
              { k: "Active", v: "Threat inspection" },
              { k: "SSL", v: "Managed & custom certs" },
              { k: "Edge", v: "Policy-driven protection" },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[#FFD700]">
                  {item.k}
                </p>
                <p className="mt-1 text-sm text-white/80">{item.v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
