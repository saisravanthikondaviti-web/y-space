// src/app/about/page.tsx

import AboutHero from "@/components/about/AboutHero";
import Belief from "@/components/about/Belief";
import Story from "@/components/about/Story";
import Approach from "@/components/about/Approach";
import Founder from "@/components/about/Founder";
import Philosophy from "@/components/about/Philosophy";
import CTA from "@/components/about/CTA";
import CustomCursor from "@/components/ui/CustomCursor";

export default function AboutPage() {
  return (
    <main className="bg-black text-white overflow-hidden">
      <CustomCursor />
      <AboutHero />
      <Belief />
      <Story />
      <Approach />
      <Founder />
      <Philosophy />
      <CTA />
    </main>
  );
}