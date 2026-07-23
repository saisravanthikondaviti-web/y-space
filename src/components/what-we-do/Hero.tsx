"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      data-scroll-section
      id="hero"
      className="flex min-h-screen items-center justify-center px-6 pt-40 pb-28 md:px-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mx-auto flex max-w-5xl flex-col items-center text-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/60 backdrop-blur-xl">
          Strategy • Design • Technology • Growth
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl xl:text-6xl">
          We help ambitious brands
          <span className="mt-2 block bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
            become impossible to ignore.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-3xl text-lg leading-8 text-white/60 md:text-xl">
          Through strategy, branding, design, technology, and marketing,
          <br />
          we build connected digital experiences that strengthen perception,
          <br />
          create trust, and drive meaningful growth.
        </p>
      </motion.div>
    </section>
  );
}