import { CyberMetrics } from "@/components/landing/CyberMetrics";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <div
          className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
          aria-hidden
        />
        <Hero />
        <Features />
        <CyberMetrics />
        <Pricing />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
