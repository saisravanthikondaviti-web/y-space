"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  onStart: () => void;
  onClose: () => void;
}

export default function WelcomeScreen({ onStart, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      onClick={onClose}
      className="
        relative
        flex
        h-full
        w-full
        flex-col
        items-center
        justify-center
        overflow-hidden
        bg-[#09090B]
        px-5
        text-center
        sm:px-6
        md:px-8
        cursor-pointer
      "
    >
      {/* Background Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -top-20
          left-1/2
          h-56
          w-56
          -translate-x-1/2
          rounded-full
          bg-violet-600/20
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          h-44
          w-44
          rounded-full
          bg-fuchsia-600/20
          blur-[100px]
        "
      />

      <div className="relative z-10">
        {/* Logo */}
        <div
  className="
    mx-auto
    mb-6
    h-16
    w-16
    overflow-hidden
    rounded-full
    border-2
    border-violet-500/60
    bg-gradient-to-br
    from-violet-600
    to-fuchsia-500
    shadow-xl
    shadow-violet-600/30
    sm:h-18
    sm:w-18
    md:h-20
    md:w-20
  "
>
  <img
    src="/images/chatbot/robot_wink.png"
    alt="VAI SPACE Assistant"
    className="block h-full w-full object-cover"
  />
</div>

        {/* Title */}
        <h1
          className="
            mb-3
            text-2xl
            font-bold
            text-white
            sm:text-[28px]
            md:text-3xl
          "
        >
          Welcome to VAISPACE
        </h1>

        {/* Subtitle */}
        <p
          className="
            mx-auto
            max-w-[280px]
            text-sm
            leading-6
            text-zinc-400
            sm:max-w-xs
            sm:text-[15px]
            md:max-w-sm
            md:text-base
            md:leading-7
          "
        >
          I&apos;m your AI assistant.
          <br />
          Let&apos;s understand your project and help you find the perfect
          digital solution.
        </p>

        {/* Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onStart();
          }}
          className="
            group
            mt-8
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-gradient-to-r
            from-violet-600
            to-fuchsia-500
            px-5
            py-3
            text-sm
            font-medium
            text-white
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-lg
            hover:shadow-violet-600/40
            sm:px-6
            sm:py-3.5
            sm:text-base
          "
        >
          Let&apos;s Start

          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </motion.div>
  );
}