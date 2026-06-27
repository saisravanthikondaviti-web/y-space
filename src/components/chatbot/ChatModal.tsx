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
        <motion.div
          initial={{
            opacity: 0,
            y: 80,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 80,
            scale: 0.9,
          }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
          className="fixed bottom-24 right-6 z-[9999]"
        >
          <div
            className="
              h-[700px]
              w-[420px]
              overflow-hidden
              rounded-[32px]
              border
              border-white/10
              bg-black/50
              shadow-2xl
              shadow-violet-900/30
              backdrop-blur-2xl

              max-md:h-screen
              max-md:w-screen
              max-md:rounded-none
            "
          >
            {started ? (
              <ChatScreen onClose={handleClose} />
            ) : (
              <WelcomeScreen onStart={() => setStarted(true)} />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}