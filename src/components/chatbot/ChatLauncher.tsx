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
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        onClick={() => setOpen(true)}
        className="
          fixed
          bottom-6
          right-6
          z-[9998]

          flex
          items-center
          gap-3

          rounded-full

          border
          border-violet-500/30

          bg-gradient-to-r
          from-violet-600
          to-fuchsia-500

          px-5
          py-4

          text-white

          shadow-xl
          shadow-violet-700/40
        "
      >
        <Sparkles size={18} />

        <span className="font-medium">
          Y Assistant
        </span>
      </motion.button>
    </>
  );
}