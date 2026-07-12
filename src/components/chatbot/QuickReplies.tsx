"use client";

import { motion } from "framer-motion";

interface Props {
  options: string[];
  onSelect: (value: string) => void;
}

export default function QuickReplies({ options, onSelect }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="
        mt-3
        flex
        flex-wrap
        gap-2
        sm:gap-3
      "
    >
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className="
            min-h-11

            rounded-full

            border
            border-violet-500/30

            bg-violet-500/10
            backdrop-blur-md

            px-4
            py-2.5

            sm:px-5
            sm:py-3

            text-[13px]
            sm:text-sm

            font-medium
            text-violet-200

            transition-all
            duration-300

            hover:border-violet-400
            hover:bg-violet-500/20
            hover:text-white
            hover:shadow-lg
            hover:shadow-violet-500/20

            active:scale-95

            whitespace-normal
            break-words
          "
        >
          {option}
        </button>
      ))}
    </motion.div>
  );
}