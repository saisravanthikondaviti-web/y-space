import { Suspense } from "react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SmoothScroll from "@/components/ui/SmoothScroll";

import ServicesStepper from "@/components/services/ServicesStepper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore VAI SPACE services including branding, website development, UI/UX design, AI solutions, digital marketing, performance marketing, and creative production.",
};

export default function ServicesPage() {
  return (
    <>
      <ScrollProgress />
      <SmoothScroll />
      <CustomCursor />

      <Navbar />

      <main className="min-h-screen bg-black">
        <Suspense fallback={null}>
          <ServicesStepper />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}