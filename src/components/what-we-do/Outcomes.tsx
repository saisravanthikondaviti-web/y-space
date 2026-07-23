"use client";

import { motion } from "framer-motion";
import { outcomes } from "./data";

export default function Outcomes() {
  return (
    <section
      data-scroll-section
      id="outcomes"
      className="px-6 py-32 md:px-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-20 text-center">
          <span className="text-sm uppercase tracking-[0.25em] text-white/40">
            Outcomes
          </span>

          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            What success looks like
          </h2>
        </div>

        <div className="relative">
          {/* Timeline */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#616CFA] via-[#E46ECC] to-[#616CFA] lg:block" />

          <div className="space-y-20">
            {outcomes.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className={`relative grid items-center gap-10 lg:grid-cols-2 ${
                  index % 2 === 0
                    ? ""
                    : "lg:[&>*:first-child]:order-2"
                }`}
              >
                {/* Content */}
                <div
                  className={
                    index % 2 === 0
                      ? "lg:pr-24 lg:text-right"
                      : "lg:pl-24 lg:text-left"
                  }
                >
                  <h3 className="text-3xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-white/60">
                    {item.description}
                  </p>
                </div>

                {/* Empty Side */}
                <div />

                {/* Timeline Node */}
                <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex items-center justify-center">
                  <div className="absolute h-20 w-20 rounded-full bg-[#616CFA]/20 blur-2xl" />

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black text-lg font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}