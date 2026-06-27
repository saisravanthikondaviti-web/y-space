"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface Props {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-[#09090B] px-8 text-center"
    >
      {/* Background Glow */}
      <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="absolute bottom-0 h-56 w-56 rounded-full bg-fuchsia-600/20 blur-[120px]" />

      <div className="relative z-10">
        {/* Logo */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-2xl shadow-violet-600/40">
          <Sparkles className="text-white" size={32} />
        </div>

        <h1 className="mb-3 text-3xl font-bold text-white">
          Welcome to Y Space
        </h1>

        <p className="mx-auto max-w-sm text-zinc-400 leading-7">
          I'm your AI assistant.
          <br />
          Let's understand your project and help you find the perfect digital solution.
        </p>

        <button
          onClick={onStart}
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-7 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-violet-600/40"
        >
          Let's Start

          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </motion.div>
  );
}