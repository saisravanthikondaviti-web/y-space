"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section
      data-scroll-section
      id="cta"
      className="px-6 pb-32 md:px-16"
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        className="
          mx-auto
          max-w-7xl
          overflow-hidden
          rounded-[32px]
          border
          border-white/10
          bg-white/[0.03]
          p-10
          backdrop-blur-xl
          md:p-16
        "
      >
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Left Content */}
          <div className="max-w-3xl">

            <span className="text-sm uppercase tracking-[0.2em] text-white/40">
              Let&apos;s Build
            </span>


            <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">

              Your next stage of growth

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
                starts with VAISPACE.
              </span>

            </h2>


            <p
              className="
                mt-6
                text-lg
                leading-relaxed
                text-white/60
              "
            >
              Whether you&apos;re launching, scaling, or repositioning,
              we create the systems that move brands forward.
            </p>


            <Link
              href="/contact"
              className="
                mt-10
                inline-flex
                items-center
                rounded-full
                bg-gradient-to-r
                from-[#616CFA]
                to-[#E46ECC]
                px-8
                py-4
                font-medium
                transition-all
                duration-300
                hover:scale-105
              "
            >
              Start a Project →
            </Link>

          </div>


          {/* Right Illustration */}
          <div
            className="
              relative
              hidden
              justify-center
              lg:flex
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
                from-[#616CFA]/25
                to-[#E46ECC]/25
                blur-[120px]
              "
            />


            <Image
              src="/images/graphpic.png"
              alt="Digital Agency Illustration"
              width={480}
              height={480}
              className="
                relative
                z-10
                w-full
                max-w-[480px]
                object-contain
                transition-transform
                duration-700
                hover:scale-105
              "
            />

          </div>


        </div>
      </motion.div>
    </section>
  );
}