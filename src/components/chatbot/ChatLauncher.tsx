"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ChatModal from "./ChatModal";

type BotState = "awake" | "blinking" | "happy" | "wink" | "thinking";

const botImages: Record<BotState, string> = {
  awake: "/images/chatbot/robot_awake.png",
  blinking: "/images/chatbot/robot_blinking.png",
  happy: "/images/chatbot/robot_happy.png",
  wink: "/images/chatbot/robot_wink.png",
  thinking: "/images/chatbot/robot_thinking.png",
};

const idleSequence: {
  state: BotState;
  duration: number;
}[] = [
  { state: "awake", duration: 5000 },
  { state: "blinking", duration: 500 },
  { state: "awake", duration: 3500 },
  { state: "happy", duration: 2600 },
  { state: "awake", duration: 4500 },
  { state: "wink", duration: 900 },
  { state: "awake", duration: 4500 },
  { state: "thinking", duration: 2600 },
];

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [botState, setBotState] = useState<BotState>("awake");

  /*
  |--------------------------------------------------------------------------
  | PRELOAD BOT IMAGES
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    Object.values(botImages).forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  /*
  |--------------------------------------------------------------------------
  | GREETING
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!open) {
        setShowGreeting(true);
      }
    }, 3500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [open]);

  /*
  |--------------------------------------------------------------------------
  | BOT FACE ANIMATION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (open || hovered) {
      return;
    }

    let cancelled = false;
    let timer: number | undefined;
    let index = 0;

    const runNext = () => {
      if (cancelled) {
        return;
      }

      const current = idleSequence[index];

      setBotState(current.state);

      timer = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        index = (index + 1) % idleSequence.length;

        runNext();
      }, current.duration);
    };

    runNext();

    return () => {
      cancelled = true;

      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
    };
  }, [open, hovered]);

  /*
  |--------------------------------------------------------------------------
  | OPEN CHAT
  |--------------------------------------------------------------------------
  */

  const handleOpen = () => {
    setShowGreeting(false);
    setBotState("happy");
    setOpen(true);
  };

  /*
  |--------------------------------------------------------------------------
  | CLOSE CHAT
  |--------------------------------------------------------------------------
  */

  const handleClose = () => {
    setOpen(false);
    setBotState("awake");
  };

  /*
  |--------------------------------------------------------------------------
  | HOVER
  |--------------------------------------------------------------------------
  */

  const handleMouseEnter = () => {
    setHovered(true);

    if (!open) {
      setBotState("happy");
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <>
      <ChatModal open={open} onClose={handleClose} />

      <div
        className="
          fixed
          bottom-5
          right-5
          z-[9998]
          sm:bottom-7
          sm:right-7
        "
      >
        {/* GREETING */}

        <AnimatePresence>
          {showGreeting && !open && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 6,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="
                absolute
                right-0
                bottom-[88px]
                w-[250px]
                sm:bottom-[102px]
              "
            >
              <div
                className="
                  relative
                  rounded-[20px]
                  border
                  border-white/10
                  bg-black/90
                  px-5
                  py-4
                  shadow-[0_12px_35px_rgba(92,45,180,0.22)]
                "
              >
                <button
                  type="button"
                  aria-label="Dismiss greeting"
                  onClick={() => setShowGreeting(false)}
                  className="
                    absolute
                    right-2.5
                    top-2.5
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    text-sm
                    text-white/40
                    transition
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  ×
                </button>

                <div className="pr-5">
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-violet-300
                    "
                  >
                    VAI Assistant
                  </p>

                  <p
                    className="
                      mt-1
                      whitespace-nowrap
                      text-[13px]
                      font-medium
                      text-white/85
                    "
                  >
                    Hi 👋 Need some help?
                  </p>
                </div>

                <div
                  className="
                    absolute
                    -bottom-[6px]
                    right-8
                    h-3
                    w-3
                    rotate-45
                    border-r
                    border-b
                    border-white/10
                    bg-black/90
                  "
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CHATBOT BUTTON */}

        <motion.button
          type="button"
          aria-label="Open AI Assistant"
          aria-expanded={open}
          onClick={handleOpen}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.96,
          }}
          className="
            relative
            flex
            h-[68px]
            w-[68px]
            items-center
            justify-center
            rounded-full
            outline-none
            sm:h-[76px]
            sm:w-[76px]
            focus-visible:ring-2
            focus-visible:ring-violet-400/70
          "
        >
          {/* STATIC AMBIENT GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              inset-[-8px]
              rounded-full
              bg-violet-500/15
              blur-xl
            "
          />

          {/* SLOW ROTATING RING */}

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-full
              border
              border-violet-400/20
            "
          />

          {/* CORE */}

          <div
            className="
              pointer-events-none
              absolute
              inset-[6px]
              rounded-full
              border
              border-white/10
              bg-black/85
              shadow-[inset_0_0_18px_rgba(139,92,246,0.12)]
            "
          />

          {/* ROBOT FACE */}

          <div
            className="
              pointer-events-none
              relative
              z-10
              flex
              h-[50px]
              w-[50px]
              items-center
              justify-center
              overflow-hidden
              rounded-full
              sm:h-[58px]
              sm:w-[58px]
            "
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={botState}
                src={botImages[botState]}
                alt="AI Assistant"
                draggable={false}
                initial={{
                  opacity: 0,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  select-none
                  object-contain
                "
                onError={() => {
                  console.error(
                    `Failed to load chatbot image: ${botImages[botState]}`
                  );
                }}
              />
            </AnimatePresence>
          </div>

          {/* ONLINE DOT */}

          <span
            className="
              absolute
              right-[4px]
              top-[4px]
              z-30
              h-[9px]
              w-[9px]
              rounded-full
              border-2
              border-black
              bg-emerald-400
              sm:h-[10px]
              sm:w-[10px]
            "
          />

          {/* ONLINE PULSE */}

          <motion.span
            animate={{
              scale: [1, 1.5],
              opacity: [0.35, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="
              pointer-events-none
              absolute
              right-[4px]
              top-[4px]
              z-20
              h-[9px]
              w-[9px]
              rounded-full
              bg-emerald-400
              sm:h-[10px]
              sm:w-[10px]
            "
          />
        </motion.button>
      </div>
    </>
  );
}