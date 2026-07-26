"use client";

import { useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import About from "@/components/home/About";
import Industries from "@/components/home/Industries";
import Process from "@/components/home/Process";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SectionNavigator from "@/components/ui/SectionNavigator";
import Stats from "@/components/home/Stats";
import IntroVideo from "@/components/ui/IntroVideo"; // ✅ make sure path is correct

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* ✅ Show intro video first */}
      {showIntro && (
        <IntroVideo onFinish={() => setShowIntro(false)} />
      )}

      {/* ✅ Show website AFTER intro finishes */}
      {!showIntro && (
        <>
          <SmoothScroll />
          <SectionNavigator />
          <ScrollProgress />
          <CustomCursor />

          <Navbar />
          <Hero />
          <About />
          <Services />
          <Stats />
          <Industries />
          <Process />
          <CTA />
          <Footer />
        </>
      )}
    </>
  );
}