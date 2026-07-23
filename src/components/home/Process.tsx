"use client";

import { motion } from "framer-motion";
import FadeUp from "../ui/FadeUp";

const pillars = [
  {
    number: "01",
    title: "Think Before We Build",
    description:
      "We start by understanding your business, audience, and goals before making creative or technical decisions.",
  },
  {
    number: "02",
    title: "Design With Purpose",
    description:
      "Every design is created to balance aesthetics, usability, and measurable business impact.",
  },
  {
    number: "03",
    title: "Build For Growth",
    description:
      "We build scalable, high-performance digital products that support long-term business growth.",
  },
  {
    number: "04",
    title: "Measure & Improve",
    description:
      "We analyze performance and continuously refine solutions to maximize results.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Process() {
  return (
    <section
      id="process"
      data-scroll-section
      className="relative flex min-h-screen lg:h-screen items-center overflow-hidden py-10"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-16 h-44 w-44 rounded-full bg-[#616CFA]/10 blur-[80px]" />
        <div className="absolute right-1/4 bottom-10 h-44 w-44 rounded-full bg-[#E46ECC]/10 blur-[80px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left */}
          <FadeUp>
            <div className="max-w-md">
              <p className="mb-2 text-xs uppercase tracking-[0.28em] text-zinc-500">
                Our Approach
              </p>

              <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl xl:text-6xl">
                The Principles Behind{" "}
                <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
                  Every Project
                </span>
              </h2>

              <p className="mt-3 text-[14px] leading-6 text-zinc-400">
                Every decision is guided by strategy, thoughtful design,
                scalable technology, and continuous improvement.
              </p>
            </div>
          </FadeUp>

          {/* Right */}
          <motion.div
            className="grid gap-3 sm:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.25,
            }}
          >
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={cardVariants}
                className="rounded-xl border border-white/10 bg-zinc-900/40 p-4 backdrop-blur-xl transition-all duration-500 hover:border-[#616CFA]/20 hover:bg-zinc-900/60"
              >
                <p className="mb-2 text-2xl font-bold text-white/50">
                  {pillar.number}
                </p>

                <h3 className="mb-2 text-base font-semibold text-white">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-[13px] leading-5 text-zinc-400">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}