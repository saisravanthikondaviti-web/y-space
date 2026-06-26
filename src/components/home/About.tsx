"use client";

import Image from "next/image";
import FadeUp from "../ui/FadeUp";

const values = [
  {
    title: "Innovation",
    description:
      "Leveraging modern technology and creative thinking to build future-ready digital experiences.",
  },
  {
    title: "Excellence",
    description:
      "Delivering exceptional quality through thoughtful design, precision, and attention to detail.",
  },
  {
    title: "Impact",
    description:
      "Creating meaningful solutions that strengthen brands, engage audiences, and drive growth.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-14 md:py-16">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-[#616CFA]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#E46ECC]/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 max-w-4xl">
          <FadeUp>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
              About VAISPACE
            </p>
          </FadeUp>

          <FadeUp>
            <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl">
              Building Modern Brands Through
              <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
                {" "}
                Strategy, Creativity & Technology
              </span>
            </h2>
          </FadeUp>
        </div>

        {/* Main Section */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <FadeUp>
            <div className="relative h-[420px] overflow-hidden rounded-3xl border border-white/10">
              <video
                src="/videos/about-robo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover brightness-100 transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-8 left-8">
                <p className="mb-2 text-sm uppercase tracking-[0.3em] text-zinc-300">
                  Our Vision
                </p>

                <h3 className="max-w-sm text-2xl font-semibold text-white">
                  Creating Digital Experiences That Inspire Growth.
                </h3>
              </div>
            </div>
          </FadeUp>

          {/* Content */}
          <div>
            <FadeUp>
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">
                Who We Are
              </p>

              <h3 className="mb-6 text-3xl font-bold text-white">
                A Creative Partner For Ambitious Brands
              </h3>

              <p className="mb-6 leading-relaxed text-zinc-400">
                VAI SPACE is a creative and technology-driven agency dedicated to
                helping businesses build powerful digital identities and
                meaningful customer experiences. We collaborate with startups,
                enterprises, and growing brands to transform ideas into engaging
                digital solutions that create long-term value.
              </p>

              <p className="leading-relaxed text-zinc-400">
                By combining branding, marketing, design, content creation, and
                development, we help organizations establish a stronger presence
                in an increasingly competitive digital landscape.
              </p>
            </FadeUp>

            <div className="my-10 h-px bg-white/10" />

            <FadeUp>
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">
                Our Mission
              </p>

              <p className="leading-relaxed text-zinc-400">
                Our mission is to empower brands through thoughtful design,
                innovative technology, and strategic execution. Every project is
                approached with a commitment to quality, creativity, and
                measurable business impact.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-24">
          <FadeUp>
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">
                Core Values
              </p>

              <h3 className="text-3xl font-bold text-white md:text-4xl">
                Principles That Guide Everything We Do
              </h3>
            </div>
          </FadeUp>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <FadeUp key={value.title}>
                <div
                  className="
                    group
                    h-full
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.02]
                    p-8
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#616CFA]/40
                    hover:bg-white/[0.04]
                  "
                >
                  <div className="mb-6 h-1.5 w-12 rounded-full bg-[#E46ECC] transition-all duration-300 group-hover:bg-[#616CFA]" />

                  <h4 className="mb-4 text-xl font-semibold text-white">
                    {value.title}
                  </h4>

                  <p className="leading-relaxed text-zinc-400">
                    {value.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
