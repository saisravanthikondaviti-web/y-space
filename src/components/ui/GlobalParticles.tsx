
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Particle = {
  left: number;
  top: number;
  duration: number;
  color: string;
  size: number;
};

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 4 + Math.random() * 6,
    color: Math.random() > 0.5 ? "#616CFA" : "#E46ECC",
    size: 1 + Math.random() * 3,
  }));
}

export default function GlobalParticles() {
  const [particles] = useState<Particle[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const isTouchDevice = window.matchMedia(
      "(pointer: coarse)"
    ).matches;

    // Fewer particles on touch devices for better mobile performance.
    const particleCount = isTouchDevice ? 12 : 40;

    return generateParticles(particleCount);
  });

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -50, 0],
            opacity: [0.15, 0.8, 0.15],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
          }}
        />
      ))}
    </div>
  );
}

