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
      "Crafting messaging that creates clarity, trust, and differentiation.",
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
    description:
      "Optimizing, scaling, and continuously improving performance.",
  },
];

export default function Approach() {
  return (
    <section id="approach" className="relative py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8E96FF]">
            Our Process
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
            From Vision To{" "}
            <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
              Impact
            </span>
          </h2>
        </motion.div>

        {/* Process */}
        <div className="relative">
          {/* Desktop Connector */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#616CFA]/30 via-[#E46ECC]/50 to-[#616CFA]/30" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {/* Step Number */}
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-[#0F0F14] border border-white/10 flex items-center justify-center backdrop-blur-xl relative z-10">
                    <span className="text-sm font-bold bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 text-center transition-all duration-500 hover:border-[#616CFA]/40 hover:-translate-y-1">
                  <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed leading-[1.6]">
                    {step.description}
                  </p>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#616CFA]/10 to-[#E46ECC]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 w-[320px] h-[320px] -translate-x-1/2 -translate-y-1/2 bg-[#616CFA]/10 blur-[100px] rounded-full" />
    </section>
  );
}