"use client";

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

export default function Process() {
  return (
    <section id="process" data-scroll-section className="relative flex h-screen items-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-20 h-80 w-80 rounded-full bg-[#616CFA]/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-[#E46ECC]/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-8">
        {/* Header */}
        <FadeUp>
          <div className="mb-10 max-w-4xl">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
              Our Approach
            </p>

            <h2 className="text-3xl font-bold md:text-4xl xl:text-5xl">
              The Principles Behind
              <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
                {" "}
                Every Project We Create
              </span>
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
              Rather than following a rigid process, we focus on a set of
              principles that guide every decision—from strategy and design to
              development and long-term growth.
            </p>
          </div>
        </FadeUp>

        {/* 2x2 Grid */}
        <div className="grid gap-4 md:grid-cols-2">
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
                  p-6
                  transition-all
                  duration-500
                  hover:border-[#616CFA]/20
                  hover:bg-zinc-900/60
                "
              >
                <p className="mb-5 text-4xl font-bold text-white/10">
                  {pillar.number}
                </p>

                <h3 className="mb-4 text-xl font-semibold text-white">
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