"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section
      id="about-hero"
      data-scroll-section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5 sm:px-6 md:px-8 lg:px-12"
    >
      {/* Indigo Blob */}
      <motion.div
        animate={{
          x: [0, 200, -100, 0],
          y: [0, -120, 80, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-0
          top-0

          h-[180px]
          w-[180px]

          sm:left-8
          sm:top-8
          sm:h-[260px]
          sm:w-[260px]

          md:h-[420px]
          md:w-[420px]

          xl:h-[520px]
          xl:w-[520px]

          rounded-full
          bg-[#616CFA]/30

          blur-[90px]
          sm:blur-[120px]
          md:blur-[150px]
        "
      />

      {/* Orchid Blob */}
      <motion.div
        animate={{
          x: [0, -200, 120, 0],
          y: [0, 120, -100, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-0
          right-0

          h-[220px]
          w-[220px]

          sm:h-[320px]
          sm:w-[320px]

          md:h-[500px]
          md:w-[500px]

          xl:h-[620px]
          xl:w-[620px]

          rounded-full
          bg-[#E46ECC]/30

          blur-[100px]
          sm:blur-[130px]
          md:blur-[170px]
        "
      />

      {/* Center Glow */}
      <motion.div
        animate={{
          x: [0, 100, -120, 0],
          y: [0, 60, -80, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2

          h-[140px]
          w-[140px]

          sm:h-[220px]
          sm:w-[220px]

          md:h-[300px]
          md:w-[300px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full
          bg-white/5

          blur-[80px]
          sm:blur-[120px]
        "
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          maskImage:
            "radial-gradient(circle at center, white, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, white, transparent 85%)",
        }}
      />

      {/* Radial Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.06), transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 mx-auto w-full max-w-6xl px-2 text-center sm:px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            mb-4

            text-[10px]
            sm:text-xs
            md:text-sm

            uppercase
            tracking-[0.28em]
            text-[#E46ECC]
          "
        >
          About VAI Space
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="
            font-bold
            leading-[1.05]
            tracking-[-0.04em]

            text-[2.75rem]
            sm:text-[4rem]
            md:text-[5rem]
            lg:text-[6rem]
            xl:text-[7rem]

            bg-gradient-to-r
            from-[#616CFA]
            via-white
            to-[#E46ECC]
            bg-clip-text
            text-transparent
          "
        >
          Where Strategy
          <br />
          Meets Storytelling
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="
            mx-auto
            mt-6

            max-w-xs
            sm:mt-8
            sm:max-w-xl
            md:max-w-2xl

            px-2

            text-sm
            sm:text-base
            md:text-lg

            leading-relaxed
            text-zinc-400
          "
        >
          Great brands aren't created by chance. They're built with clarity,
          consistency, and intention.
        </motion.p>
      </div>
    </section>
  );
}