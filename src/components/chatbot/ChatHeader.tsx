"use client";

import { X, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  onClose: () => void;
}

export default function ChatHeader({ onClose }: Props) {
  return (
    <motion.div
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative overflow-hidden border-b border-white/10 bg-black/40 backdrop-blur-xl"
    >
      {/* Background Glow */}
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="absolute -right-8 top-0 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="relative flex items-center justify-between px-5 py-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-500/30">
            <Sparkles size={18} className="text-white" />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              Y Space Assistant
            </h2>

            <div className="mt-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />

              <p className="text-xs text-zinc-400">
                Online • Ready to help
              </p>
            </div>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/5
            text-zinc-300
            transition-all
            duration-300
            hover:rotate-90
            hover:border-violet-500/40
            hover:bg-violet-500/10
            hover:text-white
          "
        >
          <X size={18} />
        </button>
      </div>
    </motion.div>
  );
}