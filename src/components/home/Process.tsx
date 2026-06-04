"use client";

import FadeUp from "../ui/FadeUp";

const pillars = [
  {
    number: "01",
    title: "Think Before We Build",
    description:
      "Every successful project begins with clarity. We invest time understanding the business, audience, and goals before making creative or technical decisions.",
  },
  {
    number: "02",
    title: "Design With Purpose",
    description:
      "Beautiful interfaces are important, but meaningful experiences create impact. Every visual decision is guided by usability, emotion, and business objectives.",
  },
  {
    number: "03",
    title: "Build For Growth",
    description:
      "Scalable architecture, performance optimization, and future-ready technology ensure digital products continue to evolve alongside the business.",
  },
  {
    number: "04",
    title: "Measure & Improve",
    description:
      "Launch is never the finish line. We continuously evaluate performance, user behavior, and business outcomes to uncover opportunities for growth.",
  },
];

export default function Process() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-20 h-80 w-80 rounded-full bg-[#616CFA]/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-[#E46ECC]/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-8">
        {/* Header */}
        <FadeUp>
          <div className="mb-16 max-w-4xl">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
              Our Approach
            </p>

            <h2 className="text-4xl font-bold md:text-5xl">
              The Principles Behind
              <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
                {" "}
                Every Project We Create
              </span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              Rather than following a rigid process, we focus on a set of
              principles that guide every decision—from strategy and design to
              development and long-term growth.
            </p>
          </div>
        </FadeUp>

        {/* 2x2 Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {pillars.map((pillar) => (
            <FadeUp key={pillar.title}>
              <div
                className="
                  group
                  h-full
                  rounded-3xl
                  border
                  border-white/10
                  bg-zinc-900/40
                  backdrop-blur-xl
                  p-10
                  transition-all
                  duration-500
                  hover:border-[#616CFA]/20
                  hover:bg-zinc-900/60
                "
              >
                <p className="mb-8 text-5xl font-bold text-white/10">
                  {pillar.number}
                </p>

                <h3 className="mb-4 text-2xl font-semibold text-white">
                  {pillar.title}
                </h3>

                <p className="leading-relaxed text-zinc-400">
                  {pillar.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}