"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section
      id="cta"
      data-scroll-section
      className="
        relative
        overflow-hidden
        bg-black
        py-20
        lg:py-24
      "
    >
      {/* Background */}

      <div className="absolute inset-0">
        <div
          className="
            absolute
            left-[-150px]
            top-20
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#616CFA]/12
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            right-[-120px]
            bottom-0
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#E46ECC]/12
            blur-[160px]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.02),transparent)]
          "
        />
      </div>

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-6
          lg:px-8
        "
      >
        <div
          className="
            grid
            items-center

            gap-10

            lg:grid-cols-[1fr_1fr]
            lg:gap-12
          "
        >
          {/* LEFT CONTENT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <p
              className="
                text-sm
                uppercase
                tracking-[0.35em]
                text-[#7B86FF]
              "
            >
              WORK WITH US
            </p>

            <h2
              className="
                mt-6
                text-4xl
                font-bold
                leading-[1.15]
                text-white

                sm:text-5xl
                lg:text-5xl
              "
            >
              Build Something That
              <br />
              <span
                className="
                  bg-gradient-to-r
                  from-[#616CFA]
                  to-[#E46ECC]
                  bg-clip-text
                  text-transparent
                "
              >
                Actually Matters
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-xl
                text-lg
                leading-8
                text-zinc-400

                lg:text-xl
              "
            >
              Great brands don't happen by chance. They are built through
              thoughtful strategy, purposeful design, and consistent execution.
              Let's create something that lasts.
            </p>

            {/* BUTTON MOVED WITH CONTENT */}

            <Link
              href="/contact"
              className="
                mt-8
                inline-flex
                h-14
                items-center
                justify-center

                rounded-full

                bg-gradient-to-r
                from-[#616CFA]
                to-[#E46ECC]

                px-8

                text-lg
                font-semibold
                text-white

                transition-all
                duration-300

                hover:scale-105
              "
            >
              Start a Project
            </Link>

            <p
              className="
                mt-4
                text-sm
                text-zinc-500
              "
            >
              Response within 24–48 hours.
            </p>
          </motion.div>

          {/* RIGHT IMAGE */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              relative
              flex
              justify-center

              lg:justify-end
              lg:-mr-10
            "
          >
            {/* Glow */}

            <div
              className="
                absolute
                h-[380px]
                w-[380px]
                rounded-full
                bg-gradient-to-r
                from-[#616CFA]/20
                to-[#E46ECC]/20
                blur-[120px]
              "
            />

            <motion.img
              src="/images/abtcta.PNG"
              alt="Creative Illustration"
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
  relative
  z-10

  w-full

  max-w-lg

  sm:max-w-xl

  md:max-w-2xl

  lg:max-w-3xl

  xl:max-w-[1000px]

  object-contain

  mt-6
  lg:mt-10
"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
