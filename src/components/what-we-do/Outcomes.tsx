"use client";

import { motion } from "framer-motion";
import { outcomes } from "./data";

export default function Outcomes() {
  return (
    <section
      data-scroll-section
      id="outcomes"
      className="px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="
            grid
            gap-12
            lg:grid-cols-2
            lg:items-center
            lg:gap-20
          "
        >
          {/* LEFT CONTENT */}

          <div>
            <span
              className="
                text-sm
                uppercase
                tracking-[0.3em]
                text-white/40
              "
            >
              Outcomes
            </span>

            <h2
              className="
                mt-5
                max-w-lg
                text-5xl
                font-bold
                leading-[1.05]

                md:text-6xl
              "
            >
              What success
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-[#616CFA]
                  to-[#E46ECC]
                  bg-clip-text
                  text-transparent
                "
              >
                looks like
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-md
                text-lg
                leading-relaxed
                text-white/50
              "
            >
              Every strategy we create is designed to create measurable growth,
              stronger positioning, and long-term business impact.
            </p>
          </div>

          {/* RIGHT CIRCULAR OUTCOMES */}

          <div
            className="
    grid
    gap-8
    sm:grid-cols-2
    place-items-center
  "
          >
            {outcomes.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}
                className="
        group
        relative
        flex
        aspect-square
        w-full
        max-w-[240px]
        items-center
        justify-center
        rounded-full

        border
        border-white/10

        bg-white/[0.03]

        backdrop-blur-xl

        transition-all
        duration-500

        hover:-translate-y-2
        hover:border-[#616CFA]/50
      "
              >
                {/* Outer Glow */}

                <div
                  className="
          absolute
          inset-0
          rounded-full
          bg-gradient-to-br
          from-[#616CFA]/20
          to-[#E46ECC]/20
          opacity-0
          blur-2xl
          transition
          duration-500
          group-hover:opacity-100
        "
                />

                {/* Gradient Ring */}

                <div
                  className="
          absolute
          inset-3
          rounded-full
          border
          border-white/5
        "
                />

                {/* Content */}

                <div
                  className="
          relative
          z-10
          px-8
          text-center
        "
                >
                  <span
                    className="
            block
            text-sm
            font-bold
            text-white/40
          "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3
                    className="
            mt-4
            text-lg
            font-bold
            leading-tight
          "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
            mt-3
            hidden
            text-xs
            leading-relaxed
            text-white/50

            md:block
          "
                  >
                    {item.description}
                  </p>
                </div>

                {/* Hover Border Animation */}

                <div
                  className="
          absolute
          inset-0
          rounded-full
          border
          border-transparent

          bg-gradient-to-r
          from-[#616CFA]
          to-[#E46ECC]

          opacity-0

          transition
          duration-500

          group-hover:opacity-40

          [mask-image:linear-gradient(#fff_0_0)]
        "
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
