"use client";

import { useEffect, useState } from "react";

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
import IntroVideo from "@/components/ui/IntroVideo";

const INTRO_STORAGE_KEY = "yspace_intro_seen";

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean | null>(null);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem(INTRO_STORAGE_KEY);

    if (hasSeenIntro === "true") {
      // User has already seen the intro
      setShowIntro(false);
    } else {
      // First visit
      setShowIntro(true);
    }
  }, []);

  const handleIntroFinish = () => {
    localStorage.setItem(INTRO_STORAGE_KEY, "true");
    setShowIntro(false);
  };

  // Prevent the page from briefly showing the wrong state
  // while localStorage is being checked.
  if (showIntro === null) {
    return null;
  }

  return (
    <>
      {/* First visit only */}
      {showIntro && <IntroVideo onFinish={handleIntroFinish} />}

      {/* Main website */}
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
  );
}