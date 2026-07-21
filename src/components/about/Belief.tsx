"use client";

import { motion } from "framer-motion";

const beliefs = [
  {
    number: "01",
    title: "Understanding",
    description:
      "Every project begins with learning the business, not designing for it.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Clear positioning creates stronger decisions and stronger brands.",
  },
  {
    number: "03",
    title: "Clarity",
    description: "The right message matters more than more marketing.",
  },
  {
    number: "04",
    title: "Growth",
    description: "When strategy leads, design and marketing perform better.",
  },
];

export default function Belief() {
  return (
    <section
      id="belief"
      data-scroll-section
      className="relative py-20 lg:py-24 px-6 lg:px-8 overflow-hidden bg-black"
    >
      {/* background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#616CFA]/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-[#E46ECC]/10 blur-[180px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#E46ECC] uppercase tracking-[0.35em] text-sm">
            Our Approach
          </p>

          <h2 className="mt-4 text-5xl md:text-6xl font-bold leading-[1.05] text-white">
            Every Decision Starts With{" "}
            <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
              Belief
            </span>
          </h2>

          <p className="mt-5 text-zinc-400 text-lg leading-relaxed max-w-lg">
            Before visuals, we define direction. Before direction, we understand
            the business. Everything else is execution.
          </p>

          {/* expanded narrative blocks */}
          <div className="mt-8 space-y-5">
            <div>
              <h3 className="text-white text-sm font-semibold tracking-wide">
                • Deep Research First
              </h3>
              <p className="text-zinc-500 text-sm mt-1">
                We don’t jump into design.
                <br /> We analyze users, markets, and positioning before
                anything else.
              </p>
            </div>

            <div>
              <h3 className="text-white text-sm font-semibold tracking-wide">
                • Strategy Over Decoration
              </h3>
              <p className="text-zinc-500 text-sm mt-1">
                Design only works when it has direction. Strategy drives every
                visual decision.
              </p>
            </div>

            <div>
              <h3 className="text-white text-sm font-semibold tracking-wide">
                • Systems, Not One-Offs
              </h3>
              <p className="text-zinc-500 text-sm mt-1">
                We build scalable brand and product systems that grow with the
                business.
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT ORBIT */}
        {/* RIGHT */}
        <div className="relative flex items-center justify-center">
          {/* ---------------- Desktop Orbit ---------------- */}
          <div className="relative hidden lg:flex h-[560px] items-center justify-center">
            {/* orbit ring */}
            <div className="absolute w-[460px] h-[460px] rounded-full border border-white/10" />

            <motion.div
              className="absolute w-[430px] h-[430px]"
              animate={{ rotate: 360 }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {beliefs.map((item, index) => {
                const angle = (index / beliefs.length) * 2 * Math.PI;
                const radius = 215; // Adjust the radius as needed

                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                return (
                  <motion.div
                    key={item.number}
                    className="
              absolute
              w-52 h-52
              rounded-full
              backdrop-blur-2xl
              bg-white/5
              border border-white/10
              flex flex-col items-center justify-center
              text-center
              px-5
              shadow-[0_0_60px_rgba(0,0,0,0.5)]
            "
                    style={{
                      left: "50%",
                      top: "50%",
                      x,
                      y,
                      translateX: "-50%",
                      translateY: "-50%",
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#616CFA]/10 to-[#E46ECC]/10 blur-2xl" />

                    <motion.div
                      className="relative z-10"
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 28,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <p className="text-white/30 text-3xl font-bold">
                        {item.number}
                      </p>

                      <h3 className="text-white text-base font-semibold mt-1">
                        {item.title}
                      </h3>

                      <p className="text-zinc-300 text-xs mt-2 leading-relaxed px-2">
                        {item.description}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* ---------------- Mobile Timeline ---------------- */}
          <div className="relative flex lg:hidden w-full max-w-md mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-[#616CFA] via-white/20 to-[#E46ECC]" />

            <div className="space-y-10 w-full">
              {beliefs.map((item, index) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.1,
                  }}
                  className="relative flex gap-5"
                >
                  {/* Orb */}
                  <div className="relative z-10 mt-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#616CFA] to-[#E46ECC] flex items-center justify-center shadow-[0_0_25px_rgba(97,108,250,.4)]">
                      <span className="text-white text-xs font-semibold">
                        {item.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
                    <h3 className="text-white font-semibold text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
