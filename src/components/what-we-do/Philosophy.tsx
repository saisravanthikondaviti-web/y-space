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
      className="
        px-6
        py-16

        sm:px-8
        sm:py-20

        md:px-16
        md:py-24
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div
          className="
            mb-6

            sm:mb-12

            md:mb-16
          "
        >
          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-white/40

              sm:text-xs
              sm:tracking-[0.3em]

              md:text-sm
            "
          >
            What Drives Our Work
          </span>

          <h2
            className="
    mt-3
    max-w-xs
    text-xl
    font-bold
    leading-tight
    tracking-tight

    sm:max-w-xl
    sm:text-4xl

    md:max-w-5xl
    md:text-5xl
  "
          >
            Every project begins with
            <span
              className="
      bg-gradient-to-r
      from-[#616CFA]
      to-[#E46ECC]
      bg-clip-text
      text-transparent
    "
            >
              {" "}
              understanding, 
            </span>
             before execution.
          </h2>
        </div>

        {/* Cards */}
        <div
          className="
            grid
            gap-3

            sm:gap-6

            md:grid-cols-3
          "
        >
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
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                p-4
                backdrop-blur-xl
                transition-all
                duration-300

                sm:p-7

                md:p-8
              "
            >
              <span
                className="
                  text-xs
                  font-medium

                  sm:text-sm
                "
                style={{ color: item.color }}
              >
                {item.number}
              </span>

              <h3
                className="
                  mt-4
                  text-xl
                  font-semibold

                  sm:text-2xl
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-white/60

                  sm:text-base
                  sm:leading-7
                "
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
