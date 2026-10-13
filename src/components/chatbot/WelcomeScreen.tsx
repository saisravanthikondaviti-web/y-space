"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  onStart: () => void;
  onClose: () => void;
}

export default function WelcomeScreen({ onStart, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      onClick={onClose}
      className="
        relative
        flex
        h-full
        w-full
        cursor-pointer
        flex-col
        items-center
        justify-center
        overflow-hidden
        bg-[#09090B]
        px-5
        text-center
        sm:px-6
      "
    >
      {/* Background Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -top-16
          left-1/2
          h-48
          w-48
          -translate-x-1/2
          rounded-full
          bg-violet-600/15
          blur-[80px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          h-36
          w-36
          rounded-full
          bg-fuchsia-600/15
          blur-[80px]
        "
      />

      <div className="relative z-10">
        {/* Assistant Image */}
        <div
          className="
            mx-auto
            mb-6
            h-16
            w-16
            overflow-hidden
            rounded-full
            border
            border-violet-500/50
            bg-black
            shadow-lg
            shadow-violet-600/20
            sm:h-[72px]
            sm:w-[72px]
          "
        >
          <Image
            src="/images/chatbot/robot_wink.png"
            alt="VAI SPACE Assistant"
            width={72}
            height={72}
            priority={false}
            className="h-full w-full object-cover"
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
          "
        >
          I&apos;m your AI assistant.
          <br />
          Let&apos;s understand your project and help you find the perfect
          digital solution.
        </p>

        {/* Start Button */}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onStart();
          }}
          className="
            group
            mt-7
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
            transition-transform
            duration-200
            hover:scale-[1.03]
            active:scale-95
            sm:px-6
            sm:text-base
          "
        >
          Let&apos;s Start

          <ArrowRight
            size={16}
            className="
              transition-transform
              duration-200
              group-hover:translate-x-1
            "
          />
        </button>
      </div>
    </motion.div>
  );
}