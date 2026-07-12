"use client";

import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div
        className="
          rounded-3xl
          rounded-bl-md

          border
          border-white/10

          bg-white/5
          backdrop-blur-xl

          px-4
          py-3

          sm:px-5
          sm:py-4

          shadow-lg
          shadow-black/20
        "
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              animate={{
                y: [0, -4, 0],
                opacity: [0.35, 1, 0.35],
                scale: [0.9, 1.2, 0.9],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.9,
                delay: dot * 0.18,
                ease: "easeInOut",
              }}
              className="
                h-2
                w-2

                sm:h-2.5
                sm:w-2.5

                rounded-full
                bg-gradient-to-r
                from-violet-400
                to-fuchsia-400
              "
            />
          ))}
        </div>
      </div>
    </div>
  );
}