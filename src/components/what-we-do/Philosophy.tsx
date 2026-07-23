"use client";

import { motion } from "framer-motion";

const philosophy = [
  {
    number: "01",
    color: "#616CFA",
    title: "Understand",
    description:
      "We learn the business, audience, and market before making decisions.",
  },
  {
    number: "02",
    color: "#E46ECC",
    title: "Simplify",
    description:
      "We remove complexity and create clarity through strategy and design.",
  },
  {
    number: "03",
    color: "#616CFA",
    title: "Grow",
    description:
      "Every solution is built to create measurable long-term growth.",
  },
];

export default function Philosophy() {
  return (
    <section
      data-scroll-section
      id="philosophy"
      className="px-6 py-20 md:px-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16">
          <span className="text-sm uppercase tracking-[0.25em] text-white/40">
            What Drives Our Work
          </span>

          <h2 className="mt-4 max-w-3xl text-4xl font-bold md:text-5xl">
            Every project begins with understanding before execution.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {philosophy.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -8,
                borderColor: "rgba(97,108,250,0.35)",
              }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-300"
            >
              <span
                className="text-sm font-medium"
                style={{ color: item.color }}
              >
                {item.number}
              </span>

              <h3 className="mt-4 text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-white/60">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}