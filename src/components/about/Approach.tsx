"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Strategy",
    description:
      "Understanding the market, audience, and opportunities before execution.",
  },
  {
    number: "02",
    title: "Story",
    description:
      "Crafting brand stories that inspire trust, clarity, and meaningful connection.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Building experiences that are intuitive, beautiful, and memorable.",
  },
  {
    number: "04",
    title: "Growth",
    description: "Optimizing, scaling, and continuously improving performance.",
  },
];

export default function Approach() {
  return (
    <section
      id="approach"
      data-scroll-section
      className="relative overflow-hidden px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center lg:mb-16"
        >
          <span className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] text-[#8E96FF]">
            Our Process
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            From Vision To{" "}
            <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
              Impact
            </span>
          </h2>
        </motion.div>

        {/* Process */}
        <div className="relative">
          {/* Desktop Connector */}
          <div className="absolute left-[12%] right-[12%] top-9 hidden h-[2px] bg-gradient-to-r from-[#616CFA]/30 via-[#E46ECC]/50 to-[#616CFA]/30 lg:block" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {/* Step Number */}
                <div className="mb-5 flex justify-center">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0F0F14] backdrop-blur-xl sm:h-16 sm:w-16">
                    <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-sm font-bold text-transparent sm:text-base">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-6
                    text-center
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-[#616CFA]/40
                  "
                >
                  <h3
                    className="
    mb-3
    text-lg
    font-semibold
    tracking-tight

    bg-gradient-to-r
    from-[#616CFA]
    to-[#E46ECC]
    bg-clip-text
    text-transparent

    sm:text-xl
  "
                  >
                    {step.title}
                  </h3>

                  <p className="text-sm leading-7 text-gray-300 sm:text-[15px]">
                    {step.description}
                  </p>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#616CFA]/10 to-[#E46ECC]/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#616CFA]/10 blur-[80px] sm:h-[320px] sm:w-[320px] sm:blur-[100px] lg:h-[500px] lg:w-[500px] lg:blur-[70px] md:blur-[100px]" />
    </section>
  );
}
