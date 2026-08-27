"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ChatModal from "./ChatModal";

type BotState = "awake" | "blinking" | "happy" | "wink" | "thinking";

/*
|--------------------------------------------------------------------------
| BOT IMAGES
|--------------------------------------------------------------------------
*/

const botImages: Record<BotState, string> = {
  awake: "/images/chatbot/robot_awake.png",
  blinking: "/images/chatbot/robot_blinking.png",
  happy: "/images/chatbot/robot_happy.png",
  wink: "/images/chatbot/robot_wink.png",
  thinking: "/images/chatbot/robot_thinking.png",
};

/*
|--------------------------------------------------------------------------
| IDLE ANIMATION
|--------------------------------------------------------------------------
| Longer transitions make the expressions feel more natural.
|--------------------------------------------------------------------------
*/

const idleSequence: {
  state: BotState;
  duration: number;
}[] = [
  {
    state: "awake",
    duration: 5000,
  },
  {
    state: "blinking",
    duration: 500,
  },
  {
    state: "awake",
    duration: 3500,
  },
  {
    state: "happy",
    duration: 2600,
  },
  {
    state: "awake",
    duration: 4500,
  },
  {
    state: "wink",
    duration: 900,
  },
  {
    state: "awake",
    duration: 4500,
  },
  {
    state: "thinking",
    duration: 2600,
  },
];

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [hovered, setHovered] = useState(false);

  const [botState, setBotState] = useState<BotState>("awake");

  /*
  |--------------------------------------------------------------------------
  | PRELOAD IMAGES
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
    const timer = setTimeout(() => {
      if (!open) {
        setShowGreeting(true);
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [open]);

  /*
  |--------------------------------------------------------------------------
  | AUTOMATIC FACE ANIMATION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (open || hovered) {
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    let index = 0;

    const runNextAnimation = () => {
      if (cancelled) return;

      const current = idleSequence[index];

      setBotState(current.state);

      timer = setTimeout(() => {
        if (cancelled) return;

        index = (index + 1) % idleSequence.length;

        runNextAnimation();
      }, current.duration);
    };

    runNextAnimation();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [open, hovered]);

  /*
  |--------------------------------------------------------------------------
  | OPEN
  |--------------------------------------------------------------------------
  */

  const handleOpen = () => {
    setShowGreeting(false);
    setBotState("happy");
    setOpen(true);
  };

  /*
  |--------------------------------------------------------------------------
  | CLOSE
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
      {/* =========================================================
          CHAT MODAL
      ========================================================= */}

      <ChatModal open={open} onClose={handleClose} />

      {/* =========================================================
          LAUNCHER
      ========================================================= */}

      <div
        className="
          fixed
          bottom-5
          right-5
          sm:bottom-7
          sm:right-7
          z-[9998]
        "
      >
        {/* =======================================================
            GREETING
        ======================================================= */}

        <AnimatePresence>
          {showGreeting && !open && (
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 8,
                scale: 0.94,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              className="
                absolute
                right-0
                bottom-[88px]
                sm:bottom-[102px]
                w-[250px]
              "
            >
              <div
                className="
                  relative
                  rounded-[22px]
                  border
                  border-white/10
                  bg-black/75
                  px-5
                  py-4
                  shadow-[0_20px_60px_rgba(92,45,180,0.28)]
                  backdrop-blur-2xl
                "
              >
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-[22px]
                    bg-gradient-to-br
                    from-violet-500/[0.08]
                    via-transparent
                    to-fuchsia-500/[0.05]
                  "
                />

                <button
                  type="button"
                  aria-label="Dismiss greeting"
                  onClick={() => setShowGreeting(false)}
                  className="
                    absolute
                    right-2.5
                    top-2.5
                    z-10
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    text-sm
                    text-white/40
                    transition-all
                    duration-200
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  ×
                </button>

                <div className="relative z-10 pr-5">
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
                      leading-relaxed
                      text-white/85
                    "
                  >
                    Hi 👋 Need some help?
                  </p>
                </div>

                <div
                  className="
                    absolute
                    -bottom-[7px]
                    right-8
                    h-4
                    w-4
                    rotate-45
                    border-r
                    border-b
                    border-white/10
                    bg-black/75
                  "
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =======================================================
            MAIN BUTTON
        ======================================================= */}

        <motion.button
          type="button"
          aria-label="Open AI Assistant"
          aria-expanded={open}
          onClick={handleOpen}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileHover={{
            scale: 1.045,
          }}
          whileTap={{
            scale: 0.94,
          }}
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            y: {
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: 0.25,
              ease: "easeOut",
            },
          }}
          className="
            relative
            flex
            h-[68px]
            w-[68px]
            sm:h-[78px]
            sm:w-[78px]
            items-center
            justify-center
            rounded-full
            outline-none
            focus-visible:ring-2
            focus-visible:ring-violet-400/70
          "
        >
          {/* =====================================================
              AMBIENT GLOW
          ===================================================== */}

          <motion.div
            animate={{
              scale: hovered ? [1, 1.15, 1] : [1, 1.06, 1],
              opacity: hovered
                ? [0.28, 0.5, 0.28]
                : [0.12, 0.28, 0.12],
            }}
            transition={{
              duration: hovered ? 1.6 : 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              inset-[-12px]
              rounded-full
              bg-violet-600/25
              blur-2xl
            "
          />

          {/* =====================================================
              OUTER RING
          ===================================================== */}

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-full
              border
              border-violet-400/25
            "
          />

          {/* =====================================================
              INNER RING
          ===================================================== */}

          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              pointer-events-none
              absolute
              inset-[4px]
              rounded-full
              border
              border-white/10
            "
          />

          {/* =====================================================
              GLASS CORE
          ===================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-[7px]
              rounded-full
              border
              border-white/[0.14]
              bg-black/55
              shadow-[inset_0_0_25px_rgba(139,92,246,0.16)]
              backdrop-blur-xl
            "
          />

          {/* =====================================================
              INNER LIGHT
          ===================================================== */}

          <motion.div
            animate={{
              opacity: hovered
                ? [0.25, 0.5, 0.25]
                : [0.12, 0.28, 0.12],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              inset-[11px]
              rounded-full
              bg-violet-500/20
              blur-xl
            "
          />

          {/* =====================================================
              ROBOT FACE CONTAINER
              IMPORTANT:
              Clips the face so nothing can extend outside circle.
          ===================================================== */}

          <div
            className="
              pointer-events-none
              relative
              z-10
              flex
              h-[50px]
              w-[50px]
              sm:h-[58px]
              sm:w-[58px]
              items-center
              justify-center
              overflow-hidden
              rounded-full
            "
          >
            <AnimatePresence mode="sync" initial={false}>
              <motion.img
                key={botState}
                src={botImages[botState]}
                alt="AI Assistant"
                draggable={false}
                initial={{
                  opacity: 0,
                  scale: 0.94,
                }}
                animate={{
                  opacity: 1,
                  scale: hovered ? 1.035 : 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.97,
                }}
                transition={{
                  opacity: {
                    duration: 0.28,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 0.32,
                    ease: "easeOut",
                  },
                }}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-contain
                  select-none
                  drop-shadow-[0_5px_14px_rgba(139,92,246,0.38)]
                "
                onError={() => {
                  console.error(
                    `Failed to load chatbot image: ${botImages[botState]}`,
                  );
                }}
              />
            </AnimatePresence>
          </div>

          {/* =====================================================
              ONLINE DOT
          ===================================================== */}

          <span
            className="
              absolute
              right-[3px]
              top-[4px]
              z-30
              h-[10px]
              w-[10px]
              sm:h-[11px]
              sm:w-[11px]
              rounded-full
              border-2
              border-black
              bg-emerald-400
              shadow-[0_0_10px_rgba(52,211,153,0.9)]
            "
          />

          {/* =====================================================
              ONLINE PULSE
          ===================================================== */}

          <motion.span
            animate={{
              scale: [1, 1.8],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="
              pointer-events-none
              absolute
              right-[3px]
              top-[4px]
              z-20
              h-[10px]
              w-[10px]
              sm:h-[11px]
              sm:w-[11px]
              rounded-full
              bg-emerald-400
            "
          />

          {/* =====================================================
              HOVER SHINE
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -80,
            }}
            animate={{
              opacity: hovered ? 1 : 0,
              x: hovered ? 80 : -80,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="
              pointer-events-none
              absolute
              inset-0
              z-20
              w-1/3
              rotate-12
              bg-white/15
              blur-md
            "
          />
        </motion.button>
      </div>
    </>
  );
}