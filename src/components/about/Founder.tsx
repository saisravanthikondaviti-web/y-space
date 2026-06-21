"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Founder() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-[#616CFA]/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">

        {/* IMAGE CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full overflow-hidden border border-white/10 shadow-xl"
        >
          <Image
            src="/founder.png"
            alt="Founder"
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-10 text-4xl md:text-5xl font-bold text-white"
        >
          Built by a{" "}
          <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
            Founder
          </span>
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed"
        >
          VAI Space is not a layered agency system.
          It’s a direct extension of one vision — where strategy, design, and execution stay unified.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-lg md:text-xl text-gray-400"
        >
          No handoffs. No dilution. Just clarity and intent.
        </motion.p>

        {/* SIGNATURE LINE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-sm uppercase tracking-[0.3em] text-[#8E96FF]"
        >
          Founder-Led • Design-Driven • Strategy-Focused
        </motion.div>

      </div>
    </section>
  );
}