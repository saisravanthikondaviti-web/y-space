import { Suspense } from "react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SmoothScroll from "@/components/ui/SmoothScroll";

import ServicesStepper from "@/components/services/ServicesStepper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What We Do | Creative Digital Services | VAI SPACE",
  description:
    "Explore VAI SPACE's creative digital services, including branding, website development, AI-powered solutions, UI/UX design, digital marketing, SEO, and custom technology built for modern businesses.",
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