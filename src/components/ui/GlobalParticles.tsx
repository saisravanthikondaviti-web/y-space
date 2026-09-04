
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Particle = {
  left: number;
  top: number;
  duration: number;
  delay: number;
  color: string;
  size: number;
};

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,

    // Smooth, slow movement
    duration: 7 + Math.random() * 5,

    // Stagger animations
    delay: Math.random() * 4,

    // VAI SPACE colors
    color: Math.random() > 0.5 ? "#616CFA" : "#E46ECC",

    // Slightly reduced medium size
    size: 2.5 + Math.random() * 1.5,
  }));
}

export default function GlobalParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const desktopQuery = window.matchMedia(
      "(min-width: 1280px) and (pointer: fine)"
    );

    // No particles on mobile/tablets for better performance
    if (!desktopQuery.matches) {
      return;
    }

    setParticles(generateParticles(22));
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          animate={{
            y: [0, -45, 0],
            x: [0, 10, -8, 0],
            opacity: [0.35, 1, 0.45, 0.35],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,

            // Subtle colored glow
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
}

