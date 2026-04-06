import { CursorParallaxBackground } from "@/components/landing/CursorParallaxBackground";
import { CyberMetrics } from "@/components/landing/CyberMetrics";
import { CyberPet } from "@/components/landing/CyberPet";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <>
      <CursorParallaxBackground />
      <CyberPet />
      <Navbar />
      <main className="relative">
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
