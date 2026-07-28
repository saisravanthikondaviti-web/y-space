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

function generateParticles(): Particle[] {
  return Array.from({ length: 40 }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 4 + Math.random() * 6,
    color: Math.random() > 0.5 ? "#616CFA" : "#E46ECC",
    size: 1 + Math.random() * 3,
  }));
}

export default function GlobalParticles() {
  const [particles] = useState<Particle[]>(generateParticles);

  return (
    <div
      className="
        fixed
        inset-0
        pointer-events-none
        z-0
        overflow-hidden
      "
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