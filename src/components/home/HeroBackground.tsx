"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Particle = {
  left: string;
  top: string;
  duration: number;
};

export default function HeroBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 5,
      }))
    );
  }, []);

  return (
    <>
      {/* Orbs */}

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
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{
            left: particle.left,
            top: particle.top,
          }}
        />
      ))}
    </>
  );
}