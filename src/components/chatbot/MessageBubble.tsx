"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface Props {
  role: "bot" | "user";
  content: string;
}

export default function MessageBubble({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={clsx(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          "max-w-[82%] rounded-3xl px-5 py-4 text-sm leading-7 shadow-lg",
          isUser
            ? "rounded-br-md bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white"
            : "rounded-bl-md border border-white/10 bg-white/5 text-zinc-100 backdrop-blur-xl"
        )}
      >
        <p className="whitespace-pre-line">{content}</p>
      </div>
    </motion.div>
  );
}