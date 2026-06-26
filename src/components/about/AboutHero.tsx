"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section id="about-hero" data-scroll-section className="relative min-h-[90vh] overflow-hidden flex items-center justify-center px-8 bg-black">
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
          top-10
          left-10
          h-[320px] 
          w-[320px]
          md:h-[420px] 
          md:w-[420px]
          rounded-full
          bg-[#616CFA]/30
          blur-[140px]
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
          h-[380px]
          w-[380px]
          md:h-[500px]
          md:w-[500px]
          rounded-full
          bg-[#E46ECC]/30
          blur-[160px]
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
          h-[220px] 
          w-[220px]
          md:h-[300px] 
          md:w-[300px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/5
          blur-[120px]
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
          backgroundSize: "60px 60px",
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
      <div className="relative z-20 w-full max-w-5xl mx-auto text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
      uppercase
      tracking-[0.25em]
      text-[#E46ECC]
      text-xs
      md:text-sm
      mb-5
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

      text-[3rem]
      sm:text-[4rem]
      md:text-[5rem]
      lg:text-[6.5rem]

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
      mt-8
      max-w-2xl
      mx-auto
      text-base
      md:text-lg
      text-zinc-400
      leading-relaxed
    "
        >
          Great brands aren't created by chance. They're built with clarity,
          consistency, and intention.
        </motion.p>
      </div>
    </section>
  );
}
