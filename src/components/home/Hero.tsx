"use client";

import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";

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
          blur-[70px] md:blur-[100px]
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
            overflow-hidden
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
          "
        >
          <motion.span
            className="inline-block text-white"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Build Your Space.
          </motion.span>

          <br />

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
      </div>
    </section>
  );
}