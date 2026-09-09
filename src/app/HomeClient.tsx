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
import Stats from "@/components/home/Stats";
import IntroVideo from "@/components/ui/IntroVideo";

const INTRO_STORAGE_KEY = "yspace_intro_seen";

export default function HomeClient() {
  // Keep the server and first client render identical.
  const [showIntro, setShowIntro] = useState(false);
  const [introChecked, setIntroChecked] = useState(false);

  useEffect(() => {
    try {
      const introSeen = window.localStorage.getItem(INTRO_STORAGE_KEY);

      setShowIntro(introSeen !== "true");
    } catch (error) {
      // If storage is unavailable, show the intro safely.
      setShowIntro(true);
    } finally {
      setIntroChecked(true);
    }
  }, []);

  const handleIntroFinish = () => {
    try {
      window.localStorage.setItem(INTRO_STORAGE_KEY, "true");
    } catch (error) {
      console.warn("Unable to save intro preference:", error);
    }

    setShowIntro(false);
  };

  return (
    <>
      {/* Only render after checking browser storage */}
      {introChecked && showIntro && (
        <IntroVideo onFinish={handleIntroFinish} />
      )}

      <SmoothScroll />

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