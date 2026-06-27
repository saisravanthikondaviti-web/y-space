"use client";

import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-3xl rounded-bl-md border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
        <div className="flex gap-2">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              animate={{
                y: [0, -5, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay: dot * 0.15,
              }}
              className="h-2 w-2 rounded-full bg-violet-400"
            />
          ))}
        </div>
      </div>
    </div>
  );
}