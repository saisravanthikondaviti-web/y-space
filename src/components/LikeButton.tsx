"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={() => setLiked(!liked)}
      className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-[#ff4d6d]/50 hover:bg-white/10"
    >
      <motion.div
        animate={
          liked
            ? {
                scale: [1, 1.35, 1],
                rotate: [0, -10, 10, 0],
              }
            : {
                scale: 1,
                rotate: 0,
              }
        }
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        <Heart
          size={22}
          className={`transition-all duration-300 ${
            liked
              ? "fill-red-500 text-red-500"
              : "text-white group-hover:text-red-400"
          }`}
        />
      </motion.div>
    </motion.button>
  );
}