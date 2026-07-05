"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const team = [
  {
    name: "Sravani",
    role: "Head of Digital Marketing",
    image: "/images/team/sravani.PNG",
  },
  {
    name: "Sravanthi",
    role: "Head of Web Development",
    image: "/images/team/sravanthi1.png",
  },
  {
    name: "xxxxxxx",
    role: "Head of Video Production",
    image: "/images/team/dummy.avif",
  },
];

export default function Philosophy() {
  return (
    <section
      id="team"
      data-scroll-section
      className="relative overflow-hidden px-6 py-28"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-[#616CFA]/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8E96FF]">
            Our Team
          </span>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-4xl">
            Meet the People Behind{" "}
            <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
              Vai Space
            </span>
          </h2>

          <div className="mx-auto mt-8 h-[2px] w-20 bg-gradient-to-r from-[#616CFA] to-[#E46ECC]" />
        </motion.div>

        {/* Team Grid */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
            >
              {/* Image */}
              <div className="relative h-[320px] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-white">
                  {member.name}
                </h3>

                <p className="mt-1 text-[15px] text-white/60">{member.role}</p>

                <div className="mt-5 h-[2px] w-12 bg-gradient-to-r from-[#616CFA] to-[#E46ECC] transition-all duration-500 group-hover:w-20" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
