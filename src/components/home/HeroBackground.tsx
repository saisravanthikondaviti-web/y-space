"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function HeroBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 5,
      })),
    []
  );

  return (
    <>
      {/* Indigo Orb */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[20%]
          top-[30%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#616CFA]/20
          blur-[140px]
        "
      />

      {/* Orchid Orb */}
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[10%]
          top-[20%]
          h-[400px]
          w-[400px]
          rounded-full
          bg-[#E46ECC]/20
          blur-[120px]
        "
      />

      {/* Floating Particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            h-1
            w-1
            rounded-full
            bg-white
          "
          style={{
            left: particle.left,
            top: particle.top,
          }}
        />
      ))}
    </>
  );
}