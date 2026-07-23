"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      data-scroll-section
      id="hero"
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        px-6
        py-24
        sm:px-10
        md:px-16
        lg:py-32
      "
    >
      {/* Glow Background */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[450px]
          w-[450px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#616CFA]/20
          blur-[140px]
          sm:h-[550px]
          sm:w-[550px]
        "
      />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="
          relative
          z-10
          mx-auto
          flex
          max-w-5xl
          flex-col
          items-center
          text-center
        "
      >

        {/* Badge */}
        <div
          className="
            inline-flex
            rounded-full
            border
            border-white/10
            bg-white/5
            px-4
            py-2
            text-[11px]
            tracking-wide
            text-white/60
            backdrop-blur-xl
            sm:px-5
            sm:text-sm
          "
        >
          Strategy • Design • Technology • Growth
        </div>


        {/* Heading */}
        <h1
          className="
            mt-6
            max-w-xs
            text-4xl
            font-bold
            leading-[1.08]
            tracking-tight

            sm:max-w-xl
            sm:text-5xl

            md:max-w-3xl
            md:text-6xl

            lg:max-w-5xl
            lg:text-6xl
          "
        >
          We help ambitious brands

          <span
            className="
              mt-2
              block
              bg-gradient-to-r
              from-[#616CFA]
              to-[#E46ECC]
              bg-clip-text
              text-transparent
            "
          >
            become impossible to ignore.
          </span>
        </h1>


        {/* Description */}
        <p
          className="
            mt-5
            max-w-xs
            text-sm
            leading-relaxed
            text-white/60

            sm:mt-6
            sm:max-w-lg
            sm:text-base

            md:mt-8
            md:max-w-3xl
            md:text-lg
            md:leading-8

            lg:text-xl
          "
        >
          Through strategy, branding, design, technology,
          and marketing, we build connected digital experiences
          that strengthen perception, create trust, and drive
          meaningful growth.
        </p>

      </motion.div>
    </section>
  );
}