"use client";

import Footer from "@/components/layout/Footer";

import {
  BackgroundFX,
  Hero,
  Philosophy,
  Outcomes,
  Services,
  CTA,
} from "@/components/what-we-do";


export default function WhatWeDo() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      <BackgroundFX />

      <Hero />

      <Philosophy />

      <Outcomes />

      <Services />

      <CTA />

      <Footer />

    </main>
  );
}