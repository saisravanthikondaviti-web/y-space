"use client";

import { motion } from "framer-motion";

const story = [
  {
    title: "A simple belief",
    text: "VAI SPACE. is a founder-led creative and technology driven hub built on one belief Every iconic brand begins with a clear vision.",
  },
  {
    title: "Since 2017",
    text: "We’ve worked across branding, marketing, design, and film making helping businesses refine how they are seen and remembered.",
  },
  {
    title: "Not an agency",
    text: "VAI SPACE was never meant to be another agency. We create impact, not just deliver services.",
  },
  {
    title: "A creative system",
    text: "Where strategy, creativity, and execution work together as one powerful ecosystem.",
  },
];

export default function Story() {
  return (
    <section
      id="story"
      data-scroll-section
      className="
        relative
        min-h-screen
        flex
        items-center
        py-20
        px-6
        lg:px-12
        bg-black
        overflow-hidden
      "
    >
      {/* Background Glow */}

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            top-1/3
            left-1/4
            w-[500px]
            h-[500px]
            bg-[#616CFA]/10
            blur-[160px]
            rounded-full
          "
        />

        <div
          className="
            absolute
            bottom-1/4
            right-1/4
            w-[500px]
            h-[500px]
            bg-[#E46ECC]/10
            blur-[80px] md:blur-[120px]
            rounded-full
          "
        />
      </div>

      <div
        className="
          relative
          max-w-6xl
          mx-auto
          grid
          lg:grid-cols-2
          gap-12
          lg:gap-16
          w-full
        "
      >
        {/* LEFT COLUMN */}

        <div>
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="
              text-[#E46ECC]
              uppercase
              tracking-[0.35em]
              text-xs
              md:text-sm
            "
          >
            Our Story
          </motion.p>

          <motion.h2
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="
              mt-4
              text-4xl
              md:text-5xl
              font-bold
              leading-tight
              text-white
            "
          >
            Built on{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#616CFA]
                to-[#E46ECC]
                bg-clip-text
                text-transparent
              "
            >
              Intent
            </span>{" "}
            Not by Chance
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            className="
              mt-6
              max-w-xl
              text-base
              lg:text-lg
              leading-relaxed
              text-zinc-400
            "
          >
            Every iconic brand starts with a vision. At VAI SPACE, we believe
            design must create meaning—not just visuals. We elevate businesses
            through purposeful strategy, sharp clarity, and high-impact digital
            experiences built with absolute intention.
          </motion.p>

          {/* VIDEO */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="
              mt-8
              relative
              w-full
              aspect-video
              max-h-[280px]
              rounded-2xl
              overflow-hidden
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              shadow-[0_0_70px_rgba(0,0,0,0.6)]
            "
          >
            <video
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
              "
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/videos/roadmap.mp4" type="video/mp4" />
            </video>

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/40
                via-transparent
                to-transparent
              "
            />
          </motion.div>
        </div>

        {/* RIGHT TIMELINE */}

        <div
          className="
    relative
    border-l
    border-white/10
    pl-8
    lg:pl-10

    mt-16
    lg:mt-28
  "
        >
          {story.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.15,
              }}
              className="
                mb-8
                relative
              "
            >
              {/* Dot */}

              <div
                className="
                  absolute
                  -left-[22px]
                  top-2
                  w-3
                  h-3
                  rounded-full
                  bg-gradient-to-r
                  from-[#616CFA]
                  to-[#E46ECC]
                  shadow-[0_0_20px_rgba(97,108,250,0.6)]
                "
              />

              <h3
                className="
                  text-white
                  text-lg
                  font-semibold
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-2
                  text-zinc-400
                  text-sm
                  lg:text-base
                  leading-relaxed
                "
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
