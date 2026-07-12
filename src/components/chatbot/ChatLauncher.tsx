"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import ChatModal from "./ChatModal";

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ChatModal
        open={open}
        onClose={() => setOpen(false)}
      />

      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{
          scale: 1.04,
        }}
        whileTap={{
          scale: 0.96,
        }}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          fixed
          bottom-4
          right-4

          sm:bottom-6
          sm:right-6

          z-[9998]

          flex
          items-center
          justify-center
          gap-2

          min-h-12
          min-w-12

          rounded-full

          border
          border-violet-500/30

          bg-gradient-to-r
          from-violet-600
          to-fuchsia-500

          px-4
          py-3

          sm:px-5
          sm:py-3.5

          text-white

          shadow-[0_12px_35px_rgba(139,92,246,0.35)]

          transition-all
          duration-300

          hover:shadow-[0_18px_45px_rgba(139,92,246,0.45)]
        "
      >
        <Sparkles
          className="h-5 w-5 sm:h-[18px] sm:w-[18px]"
        />

        <span
          className="
            hidden
            sm:block

            text-sm
            font-medium
            tracking-wide
          "
        >
          Y Assistant
        </span>
      </motion.button>
    </>
  );
}