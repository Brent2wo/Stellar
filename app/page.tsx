import { Capabilities } from "@/components/landing/CapabilitySection";
import { CyberMetrics } from "@/components/landing/CyberMetrics";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { Pricing } from "@/components/landing/Pricing";
import { StaticBg } from "@/components/landing/StaticBg";
import { Testimonials } from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <>
      {/* Static dark atmospheric background — no cursor tracking, no motion */}
      <StaticBg />
      <Navbar />
      <main className="relative">
        <Hero />
        {/* Six dedicated capability viewpoints */}
        <Capabilities />
        <CyberMetrics />
        <Pricing />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
