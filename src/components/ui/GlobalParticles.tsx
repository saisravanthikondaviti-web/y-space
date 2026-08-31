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
    duration: 6 + Math.random() * 5,
    delay: Math.random() * 3,
    color: Math.random() > 0.5 ? "#616CFA" : "#E46ECC",
    size: 1 + Math.random() * 2,
  }));
}

export default function GlobalParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const desktopQuery = window.matchMedia(
      "(min-width: 1280px) and (pointer: fine)"
    );

    // No particles on mobile and tablets for better performance.
    if (!desktopQuery.matches) {
      return;
    }

    setParticles(generateParticles(15));
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full will-change-transform"
          animate={{
            y: [0, -35, 0],
            opacity: [0.2, 0.65, 0.2],
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
          }}
        />
      ))}
    </div>
  );
}