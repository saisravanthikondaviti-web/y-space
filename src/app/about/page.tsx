// src/app/about/page.tsx
import Navbar from "@/components/layout/Navbar";
import AboutHero from "@/components/about/AboutHero";
import Belief from "@/components/about/Belief";
import Story from "@/components/about/Story";
import Approach from "@/components/about/Approach";
import Founder from "@/components/about/Founder";
import Philosophy from "@/components/about/Philosophy";
import CTA from "@/components/about/CTA";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import Footer from "@/components/layout/Footer";
import SectionNavigator from "@/components/ui/SectionNavigator";

export default function AboutPage() {
  return (
    <main className="bg-black text-white overflow-hidden">
      <ScrollProgress />
      <SmoothScroll />
      <SectionNavigator />
      <CustomCursor />
      <Navbar />
      <AboutHero />
      <Belief />
      <Story />
      <Approach />
      <Founder />
      <Philosophy />
      <CTA />
      <Footer />
    </main>
  );
}