"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

const story = [
  {
    title: "A simple belief",
    text: "VAI Space is a founder-led creative studio built on one belief — great brands are not accidental.",
  },
  {
    title: "Not chance, but clarity",
    text: "They are shaped with clarity, consistency, and intention at every step of their journey.",
  },
  {
    title: "Since 2017",
    text: "We’ve worked across branding, marketing, design, and filmmaking — helping businesses refine how they are seen and remembered.",
  },
  {
    title: "Not an agency",
    text: "VAI Space was never meant to be another agency competing in the noise.",
  },
  {
    title: "A creative system",
    text: "It exists as a creative space where strategy, design, and execution move as one system.",
  },
];

export default function Story() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@splinetool/viewer@1.12.97/build/spline-viewer.js";
    script.type = "module";
    document.body.appendChild(script);
  }, []);

  return (
    <section className="relative py-40 px-6 lg:px-12 bg-black overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#616CFA]/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#E46ECC]/10 blur-[180px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-20">
        {/* LEFT */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#E46ECC] uppercase tracking-[0.35em] text-sm"
          >
            Our Story
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mt-6 leading-tight text-white"
          >
            Built on{" "}
            <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
              Intent
            </span>{" "}
            Not Chance
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-8 text-zinc-400 text-lg leading-relaxed max-w-md"
          >
            Every studio has a beginning. Ours started with a refusal to build
            meaningless design — and a commitment to build brands that feel
            alive.
          </motion.p>
          {/* CANVA EMBED */}
          <div className="mt-12 relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_70px_rgba(0,0,0,0.6)]">
            <iframe
              loading="lazy"
              className="absolute inset-0 w-full h-full"
              src="https://www.canva.com/design/DAHNJh1lPbY/myRa6S9zlempbzLqJMGjpw/watch?embed"
              allowFullScreen
            />

            {/* cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* RIGHT TIMELINE */}
        <div className="relative border-l border-white/10 pl-10">
          {story.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="mb-14 relative"
            >
              <div className="absolute -left-[22px] top-2 w-3 h-3 rounded-full bg-gradient-to-r from-[#616CFA] to-[#E46ECC] shadow-[0_0_20px_rgba(97,108,250,0.6)]" />

              <h3 className="text-white text-lg font-semibold">{item.title}</h3>

              <p className="mt-2 text-zinc-400 text-base leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
