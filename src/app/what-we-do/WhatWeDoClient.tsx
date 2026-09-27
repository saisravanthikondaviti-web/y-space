"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

import {
  BackgroundFX,
  Hero,
  Philosophy,
  Outcomes,
  Services,
  CTA,
} from "@/components/what-we-do";

export default function WhatWeDoClient() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Global page components */}
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      {/* Background effects */}
      <BackgroundFX />

      {/* Page content */}
      <Hero />
      <Philosophy />
      <Outcomes />
      <Services />
      <CTA />

      <Footer />
    </main>
  );
}