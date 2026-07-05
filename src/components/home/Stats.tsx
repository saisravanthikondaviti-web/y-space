"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "8+",
    label: "Years of Experience",
  },
  {
    value: "90+",
    label: "Projects Delivered",
  },
  {
    value: "3+",
    label: "Countries",
  },
  {
    value: "94%",
    label: "Client Retention",
  },
];

export default function Stats() {
  return (
    <section className="bg-black px-6 py-24 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className={`relative flex flex-col items-center justify-center py-14 ${
                  index !== stats.length - 1
                    ? "md:border-r md:border-white/10"
                    : ""
                } ${
                  index < 2
                    ? "border-b border-white/10 md:border-b-0"
                    : ""
                }`}
              >
                <h3 className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
                  {stat.value}
                </h3>

                <p className="mt-3 text-center text-sm text-gray-400 md:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}