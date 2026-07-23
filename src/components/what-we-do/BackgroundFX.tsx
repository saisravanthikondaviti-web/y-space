"use client";

import { motion } from "framer-motion";

import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SectionNavigator from "@/components/ui/SectionNavigator";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function BackgroundFX() {
  return (
    <>
      <ScrollProgress />
      <SmoothScroll />
      <CustomCursor />
      <SectionNavigator />
      <Navbar />

      {/* Grid */}
      <div
        className="
          fixed inset-0 -z-30
          bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      {/* Gradient Orbs */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 150, -100, 0],
            y: [0, -100, 100, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-200px] left-[-100px] h-[500px] w-[500px] rounded-full bg-[#616CFA]/20 blur-[140px]"
        />

        <motion.div
          animate={{
            x: [0, -120, 120, 0],
            y: [0, 120, -80, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-250px] right-[-100px] h-[550px] w-[550px] rounded-full bg-[#E46ECC]/20 blur-[160px]"
        />
      </div>

      {/* Radial Glow */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)]" />
    </>
  );
}