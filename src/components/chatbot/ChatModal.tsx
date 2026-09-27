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
            pointer-events-none
            fixed
            inset-0
            z-[9999]
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
              y: 24,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.98,
            }}
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
            className="pointer-events-auto"
          >
            <div
              className="
                h-[520px]
                w-[360px]
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-[#09090B]/95
                shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                sm:h-[560px]
                sm:w-[380px]
                md:h-[580px]
                md:w-[400px]
                lg:h-[600px]
                lg:w-[420px]
              "
            >
              {started ? (
                <ChatScreen onClose={handleClose} />
              ) : (
                <WelcomeScreen
                  onStart={() => setStarted(true)}
                  onClose={handleClose}
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}