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
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9998]"
      >
        {/* Outer Ring */}
        <div
          className="
            relative
            flex
            h-[56px]
            w-[56px]
            sm:h-[64px]
            sm:w-[64px]
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-[#0b0b14]
            shadow-[0_0_24px_rgba(139,92,246,0.12)]
          "
        >
          {/* Inner Gradient Circle */}
          <div
            className="
              flex
              h-[34px]
              w-[34px]
              sm:h-[40px]
              sm:w-[40px]
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-pink-500
              via-violet-500
              to-indigo-500
              shadow-[0_6px_16px_rgba(168,85,247,0.4)]
              transition-transform
              duration-300
              hover:scale-110
            "
          >
            <Sparkles
              className="h-[14px] w-[14px] sm:h-[16px] sm:w-[16px] text-white"
              fill="currentColor"
              strokeWidth={2}
            />
          </div>
        </div>
      </motion.button>
    </>
  );
}