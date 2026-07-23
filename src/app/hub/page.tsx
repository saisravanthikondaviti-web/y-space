"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

const stars = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 3 + Math.random() * 4,
}));

const shootingStars = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  top: 10 + i * 12,
  delay: i * 3,
}));

export default function TeamPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <ScrollProgress />
      <SmoothScroll />
      <CustomCursor />
      <Navbar />

      {/* ================= BACKGROUND ================= */}

      {/* Grid */}
      <div
        className="
        fixed inset-0 -z-40
        bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
        bg-[size:60px_60px]
      "
      />

      {/* Aurora Blob 1 */}
      <motion.div
        animate={{
          x: [0, 120, -60, 0],
          y: [0, -80, 60, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        fixed
        -top-48
        -left-40
       h-[320px]
w-[320px]
sm:h-[420px]
sm:w-[420px]
lg:h-[520px]
lg:w-[520px]
        rounded-full
        bg-[#616CFA]/20
        blur-[150px]
        -z-30
      "
      />

      {/* Aurora Blob 2 */}
      <motion.div
        animate={{
          x: [0, -140, 100, 0],
          y: [0, 80, -60, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        fixed
        bottom-[-220px]
        right-[-120px]
        h-[350px]
w-[350px]
sm:h-[450px]
sm:w-[450px]
lg:h-[600px]
lg:w-[600px]
        rounded-full
        bg-[#E46ECC]/20
        blur-[170px]
        -z-30
      "
      />

      {/* Center Glow */}
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_65%)]" />

      {/* Stars */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: star.duration,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Shooting Stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        {shootingStars.map((meteor) => (
          <motion.div
            key={meteor.id}
            initial={{
              x: "-20%",
              y: "-20%",
              opacity: 0,
            }}
            animate={{
              x: "140vw",
              y: "80vh",
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              repeat: Infinity,
              repeatDelay: 8,
              duration: 2,
              delay: meteor.delay,
              ease: "easeInOut",
            }}
            className="absolute"
            style={{
              top: `${meteor.top}%`,
            }}
          >
            <div className="h-[2px] w-40 bg-gradient-to-r from-white via-[#616CFA] to-transparent rotate-[25deg]" />
          </motion.div>
        ))}
      </div>

      {/* Floating Small Orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 8 + i,
            ease: "easeInOut",
          }}
          className="fixed rounded-full blur-3xl -z-20"
          style={{
            width: 100 + i * 20,
            height: 100 + i * 20,
            left: `${10 + i * 10}%`,
            top: `${15 + (i % 3) * 25}%`,
            background:
              i % 2 === 0 ? "rgba(97,108,250,0.05)" : "rgba(228,110,204,0.05)",
          }}
        />
      ))}

      {/* ================= HERO ================= */}

      <section className="relative flex min-h-screen items-center justify-center px-5 pt-28 pb-20 sm:px-6 md:px-10 lg:px-16">
        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 sm:px-6 backdrop-blur-xl"
          >
            <span className="h-2 w-2 rounded-full bg-[#616CFA] animate-pulse" />

            <span className="text-xs uppercase tracking-[0.35em] text-white/60">
              VAISPACE
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
            }}
            className="
mt-3
text-4xl
font-black
leading-tight
sm:text-5xl
md:text-6xl
lg:text-7xl
xl:text-[8rem]
"
          >
            <span className="block text-white">SOMETHING</span>

            <span className="mt-2 sm:mt-4 block bg-gradient-to-r from-[#616CFA] via-white to-[#E46ECC] bg-clip-text text-transparent animate-pulse">
              COMING SOON
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
            }}
            className="
mt-8
max-w-3xl
px-2
text-base
leading-7
text-white/60
sm:text-lg
sm:leading-8
md:text-xl
md:leading-9
"
          >
            We are building something extraordinary — a refined digital
            experience crafted with creativity, innovation, and precision.
            <br />
            Stay tuned.
          </motion.p>

          {/* Glass Card */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.8,
              duration: 0.8,
            }}
            className="
relative
mt-14
w-full
max-w-4xl
overflow-hidden
rounded-3xl
border
border-white/10
bg-white/[0.03]
backdrop-blur-2xl
p-6
sm:p-8
md:p-10
lg:p-14
"
          >
            {/* Card Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#616CFA]/5 via-transparent to-[#E46ECC]/5" />

            <div className="relative z-10">
              <div className="flex justify-center">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 18,
                    ease: "linear",
                  }}
                  className="
flex
h-20
w-20
sm:h-24
sm:w-24
md:h-28
md:w-28
items-center
justify-center
rounded-full
border
border-white/10
bg-white/[0.02]
"
                >
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#616CFA] to-[#E46ECC] text-2xl md:text-3xl shadow-[0_0_40px_rgba(97,108,250,0.5)]">
                    ✦
                  </div>
                </motion.div>
              </div>

              <h2 className="mt-8 text-2xl font-semibold sm:text-3xl md:text-4xl">
                Launching Something Extraordinary
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
                Every great experience begins with a bold vision. We're putting
                the finishing touches on something that blends strategy,
                creativity, and technology into one seamless journey.
              </p>

              <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
                <Link
                  href="/"
                  className="
                    rounded-full
                    bg-gradient-to-r
                    from-[#616CFA]
                    to-[#E46ECC]
                    w-full
                     sm:w-auto
                      px-8
                       py-3
                        text-center
                    font-medium
                    transition-all
                    duration-300
                    hover:scale-105
                  "
                >
                  Back to Home
                </Link>

                <Link
                  href="/contact"
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.03]
                    w-full 
                    sm:w-auto 
                    px-8 
                    py-3 
                    text-center
                    font-medium
                    transition-all
                    duration-300
                    hover:bg-white/10
                  "
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}

          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="mt-16 sm:mt-20 flex flex-col items-center text-white/40"
          >
            <span className="text-xs tracking-[0.35em] uppercase">
              Stay Tuned
            </span>

            <div className="mt-5 h-12 w-[2px] bg-gradient-to-b from-[#616CFA] to-[#E46ECC]" />
          </motion.div>
        </div>
      </section>
      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 h-64 w-[300px] sm:w-[500px] lg:w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#616CFA]/10 via-[#E46ECC]/10 to-[#616CFA]/10 blur-[140px]" />

      {/* Footer */}
      <Footer />
    </main>
  );
}
