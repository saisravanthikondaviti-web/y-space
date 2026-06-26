"use client";

import { motion } from "framer-motion";

const items = [
  {
    title: "Branding",
    text: "Not about looking good. About being remembered.",
    image: "/images/philosophy/philosophy-1.avif",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Marketing",
    text: "Not about doing more. About doing what matters.",
    image: "/images/philosophy/philosophy-2.jpg",
    span: "",
  },
  {
    title: "Growth",
    text: "Not everything. Only what drives impact.",
    image: "/images/philosophy/philosophy-3.jpg",
    span: "",
  },
  {
  title: "Success",
  text: "Not accidental. It is designed with intent.",
  image: "/images/philosophy/philosophy-4.jpg",
  span: "",
}
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative py-28 px-6 overflow-hidden">

      {/* background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-[#616CFA]/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8E96FF]">
            Philosophy
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
            A System of{" "}
            <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
              Thinking
            </span>
          </h2>
        </motion.div>

        {/* BENTO GRID */}
        <div className="grid md:grid-cols-4 md:auto-rows-[200px] gap-4">

          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-3xl group border border-white/10 ${item.span}`}
            >

              {/* image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-700"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition" />

              {/* content */}
              <div className="relative h-full p-6 flex flex-col justify-end">

                <span className="text-[#8E96FF] text-sm uppercase tracking-wide">
                  {item.title}
                </span>

                <p className="text-white text-lg font-medium mt-2 leading-snug">
                  {item.text}
                </p>

              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}