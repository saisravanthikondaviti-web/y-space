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
    <section id="belief" className="relative py-32 px-6 lg:px-8 overflow-hidden bg-black">
      {/* background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#616CFA]/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-[#E46ECC]/10 blur-[180px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#E46ECC] uppercase tracking-[0.35em] text-sm">
            Our Approach
          </p>

          <h2 className="text-5xl md:text-6xl font-bold mt-6 leading-tight text-white">
            Every Decision Starts With{" "}
            <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
              Belief
            </span>
          </h2>

          <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-xl">
            Before visuals, we define direction. Before direction, we understand
            the business. Everything else is execution.
          </p>

          {/* expanded narrative blocks */}
          <div className="mt-10 space-y-6">
            <div>
              <h3 className="text-white text-sm font-semibold tracking-wide">
                • Deep Research First
              </h3>
              <p className="text-zinc-500 text-sm mt-1">
                We don’t jump into design. We analyze users, markets, and
                positioning before anything else.
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
        <div className="relative h-[620px] flex items-center justify-center">
          {/* orbit ring */}
          <div className="absolute w-[460px] h-[460px] rounded-full border border-white/10" />

          {/* rotating system */}
          <motion.div
            className="absolute w-[460px] h-[460px]"
            animate={{ rotate: 360 }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {beliefs.map((item, index) => {
              const angle = (index / beliefs.length) * 2 * Math.PI;
              const radius = 230;

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
                  {/* glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#616CFA]/10 to-[#E46ECC]/10 blur-2xl" />

                  {/* counter rotation wrapper (IMPORTANT FIX) */}
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
      </div>
    </section>
  );
}
