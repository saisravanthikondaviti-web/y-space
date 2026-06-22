"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

const team = [
  {
    name: "Vaikuntam",
    role: "Founder",
    image: "/images/team/vaikuntam.PNG",
  },
  {
    name: "Sravani",
    role: "Head of Digital Marketing",
    image: "/images/team/sravani.PNG",
  },
  {
    name: "Sravanthi",
    role: "Head of Web Development",
    image: "/images/team/sravanthi.jpeg", // fix filename
  },
];

export default function TeamPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <ScrollProgress />
      <SmoothScroll />
      <CustomCursor />
      <Navbar />

      <section className="px-6 md:px-16 pt-24 pb-32">
        <div className="mx-auto max-w-7xl">

          {/* INTRO */}
          <div className="max-w-2xl mb-16">
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase">
              Who We Are
            </p>

            <h2 className="mt-4 text-4xl md:text-5xl font-semibold">
              A team with
              <span className="text-white/60">
                {" "}big execution power
              </span>
            </h2>

            <p className="mt-6 text-white/50 leading-relaxed">
              We combine design, strategy, and engineering to build brands that
              don’t just look good — they perform.
            </p>

            <div className="mt-8 h-[2px] w-20 bg-gradient-to-r from-[#616CFA] to-[#E46ECC]" />
          </div>

          {/* TEAM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <motion.div
                key={member.name}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
              >
                {/* IMAGE */}
                <div className="relative h-[420px] w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold">
                    {member.name}
                  </h3>

                  <p className="mt-1 text-sm text-white/60">
                    {member.role}
                  </p>

                  <div className="mt-6 h-[2px] w-12 bg-gradient-to-r from-[#616CFA] to-[#E46ECC] transition-all duration-300 group-hover:w-20" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}