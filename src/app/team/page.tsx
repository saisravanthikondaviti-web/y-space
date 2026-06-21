"use client";

import { motion } from "framer-motion";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

const team = [
  {
    name: "Aarav Mehta",
    role: "Creative Director",
    description:
      "Leads brand storytelling, visual direction, and creative strategy.",
  },
  {
    name: "Sanya Iyer",
    role: "Brand Strategist",
    description: "Defines positioning, messaging systems, and brand clarity.",
  },
  {
    name: "Rohan Kapoor",
    role: "Lead Designer",
    description: "Crafts visual identities, interfaces, and design systems.",
  },
  {
    name: "Ishita Verma",
    role: "Digital Marketing Head",
    description: "Drives performance campaigns and audience growth strategies.",
  },
  {
    name: "Dev Malhotra",
    role: "Full Stack Developer",
    description: "Builds fast, scalable, and conversion-focused web systems.",
  },
  {
    name: "Neha Singh",
    role: "Video Producer",
    description: "Creates cinematic brand films and social-first content.",
  },
];

export default function TeamPage() {
  return (
    
    <main className="bg-black text-white min-h-screen">
        <ScrollProgress />
        <SmoothScroll />
        <CustomCursor />
        <Navbar />
      {/* HERO */}
      <section className="px-6 md:px-16 py-28 text-center">
        <h1 className="text-5xl md:text-7xl font-bold">
          Our{" "}
          <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
            Team
          </span>
        </h1>

        <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg">
          A focused group of strategists, designers, and engineers building
          scalable digital experiences.
        </p>
      </section>

      {/* CONTENT */}
      <section className="px-6 md:px-16 pb-32">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[380px_1fr] gap-16">
          {/* LEFT STICKY INTRO */}
          <div className="lg:sticky lg:top-28 h-fit">
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase">
              Who We Are
            </p>

            <h2 className="text-3xl md:text-4xl font-semibold mt-4">
              A small team with
              <span className="text-white/60"> big execution power</span>
            </h2>

            <p className="mt-6 text-white/50 leading-relaxed">
              We combine design, strategy, and engineering to build brands that
              don’t just look good — they perform.
            </p>

            <div className="mt-8 h-[2px] w-20 bg-gradient-to-r from-[#616CFA] to-[#E46ECC]" />
          </div>

          {/* RIGHT GRID */}
          <div className="grid md:grid-cols-2 gap-6">
            {team.map((member) => (
              <motion.div
                key={member.name}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden"
              >
                {/* IMAGE */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={member.image || "/images/avatar-placeholder.jpg"}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>

                  <p className="text-sm text-white/60 mt-1">{member.role}</p>

                  <p className="mt-4 text-sm text-white/50 leading-relaxed">
                    {member.description}
                  </p>

                  {/* hover accent */}
                  <div className="mt-6 h-[2px] w-10 bg-gradient-to-r from-[#616CFA] to-[#E46ECC] transition-all group-hover:w-16" />
                </div>
              </motion.div>
            ))}
          </div>
          <Footer />
        </div>
      </section>
    </main>
  );
}
