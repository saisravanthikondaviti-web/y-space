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
      <div className="relative z-10 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-zinc-500">
          Creative Space
        </p>

        <motion.h1
          className="max-w-5xl text-6xl font-bold leading-tight md:text-8xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Build Your Space.
          <br />
          Own Your Market.
        </motion.h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-zinc-400">
          Strategy. Creativity. Performance. Technology.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <motion.button
            className="
    rounded-full
    px-6
    py-3
    font-medium
    text-white
    bg-gradient-to-r
    from-[#616CFA]
    to-[#E46ECC]
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

          <button className="rounded-full border border-white/20 px-6 py-3">
            Explore Work
          </button>
        </div>
      </div>
    </section>
  );
}
