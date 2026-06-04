"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Particle = {
  left: number;
  top: number;
  duration: number;
  color: string;
};

export default function GlobalParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = [...Array(40)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 6,
      color: Math.random() > 0.5 ? "#616CFA" : "#E46ECC",
    }));

    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -50, 0],
            opacity: [0.15, 0.8, 0.15],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-[2px] w-[2px] rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}