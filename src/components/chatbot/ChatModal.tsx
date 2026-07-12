"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import ChatScreen from "./ChatScreen";
import WelcomeScreen from "./WelcomeScreen";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ChatModal({ open, onClose }: Props) {
  const [started, setStarted] = useState(false);

  const handleClose = () => {
    setStarted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="
            fixed
            inset-0
            z-[9999]

            pointer-events-none

            flex
            items-end
            justify-end

            p-3
            sm:p-5
            lg:p-6
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 40,
              scale: 0.96,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="pointer-events-auto"
          >
            <div
              className="
                w-[360px]
                h-[520px]

                sm:w-[380px]
                sm:h-[560px]

                md:w-[400px]
                md:h-[580px]

                lg:w-[420px]
                lg:h-[600px]

                overflow-hidden

                rounded-3xl

                border
                border-white/10

                bg-black/60
                backdrop-blur-2xl

                shadow-[0_25px_80px_rgba(0,0,0,0.45)]
                shadow-violet-900/30
              "
            >
              {started ? (
                <ChatScreen onClose={handleClose} />
              ) : (
                <WelcomeScreen onStart={() => setStarted(true)} />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}