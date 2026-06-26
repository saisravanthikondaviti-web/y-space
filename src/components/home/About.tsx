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
    <section
      id="about"
      data-scroll-section
      className="relative flex h-screen items-center overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-[#616CFA]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#E46ECC]/10 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 max-w-4xl">
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
        <div className="grid h-full items-center gap-10 lg:grid-cols-2">
          {/* Image */}
          <FadeUp>
            <div className="relative h-[360px] xl:h-[400px] overflow-hidden rounded-3xl border border-white/10">
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
                VAI SPACE is a creative and technology-driven agency dedicated
                to helping businesses build powerful digital identities and
                meaningful customer experiences. We collaborate with startups,
                enterprises, and growing brands to transform ideas into engaging
                digital solutions that create long-term value.
              </p>
            </FadeUp>

            <div className="my-6 h-px bg-white/10" />

            <FadeUp>
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">
                Our Mission
              </p>

              <p className="leading-relaxed text-zinc-400">
                We combine creativity, innovation, and execution to deliver
                digital solutions that create measurable business impact.
              </p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
