"use client";

import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      data-scroll-section
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      <HeroBackground />
      <div
        className="
    absolute
    left-1/2
    top-1/2
    h-[600px]
    w-[600px]
    -translate-x-1/2
    -translate-y-1/2
    rounded-full
    bg-[#616CFA]/20
    blur-[150px]
  "
      />

      <div
        className="
    absolute
    top-20
    right-20
    h-[300px]
    w-[300px]
    rounded-full
    bg-[#E46ECC]/20
    blur-[120px]
  "
      />
      <div className="relative z-10 px-6 text-center">
        <p
          className="
      mb-3
      text-[10px]
      uppercase
      tracking-[0.25em]
      text-zinc-500
      sm:mb-4
      sm:text-xs
      sm:tracking-[0.35em]
      md:text-sm
      md:tracking-[0.4em]
    "
        >
          A Creative Space
        </p>

        <motion.h1
          className="
    mx-auto
    max-w-xs
    text-4xl
    font-bold
    leading-tight
    sm:max-w-xl
    sm:text-5xl
    md:max-w-3xl
    md:text-6xl
    lg:max-w-5xl
    lg:text-7xl
    xl:text-8xl
    overflow-hidden
  "
        >
          {/* Left Animation */}
          <motion.span
            className="inline-block text-white"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Build Your Space.
          </motion.span>

          <br />

          {/* Right Animation */}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-white">Own Your </span>
            <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
              Market.
            </span>
          </motion.span>
        </motion.h1>

        <p
          className="
      mx-auto
      mt-5
      max-w-xs
      text-sm
      leading-relaxed
      text-zinc-400
      sm:mt-6
      sm:max-w-lg
      sm:text-base
      md:mt-7
      md:max-w-xl
      md:text-lg
      lg:mt-8
      lg:max-w-2xl
      lg:text-xl
    "
        >
          Strategy. Design. Technology. Growth.
        </p>

        {/* <div className="mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row sm:justify-center sm:gap-5">
          <Link href="/contact">
            <motion.button
              className="
      w-full
      sm:w-auto
      rounded-full
      bg-gradient-to-r
      from-[#616CFA]
      to-[#E46ECC]
      px-6
      py-3
      text-sm
      font-medium
      text-white
      transition-all
      duration-300
      hover:scale-105
      sm:px-7
      sm:py-3.5
      sm:text-base
      lg:px-7
      lg:py-3
      lg:text-lg
    "
              animate={{
                boxShadow: [
                  "0 0 10px rgba(97,108,250,0.4)",
                  "0 0 35px rgba(97,108,250,0.8)",
                  "0 0 10px rgba(97,108,250,0.4)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Book Strategy Call
            </motion.button>
          </Link>

          <Link href="/what-we-do">
            <button
              className="
      w-full
      sm:w-auto
      rounded-full
      border
      border-white/20
      px-6
      py-3
      text-sm
      font-medium
      transition-all
      duration-300
      hover:border-white/40
      hover:bg-white/5
      sm:px-7
      sm:py-3.5
      sm:text-base
      lg:px-7
      lg:py-3
      lg:text-lg
    "
            >
              Explore Work
            </button>
          </Link>
        </div> */}
      </div>
    </section>
  );
}
