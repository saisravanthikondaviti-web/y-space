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
      className="relative flex min-h-screen items-center py-20 sm:py-24 lg:py-28"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-[#616CFA]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#E46ECC]/10 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 max-w-4xl lg:mb-14">
          <FadeUp>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
              About VAISPACE
            </p>
          </FadeUp>

          <FadeUp>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl xl:text-5xl">
              Building Modern Brands Through
              <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
                {" "}
                Strategy, Creativity & Technology
              </span>
            </h2>
          </FadeUp>
        </div>

        {/* Main Section */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Image */}
          <FadeUp>
            <div className="relative h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px] overflow-hidden rounded-3xl border border-white/10">
              <video
                src="/videos/about-robo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover brightness-100 transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-6 left-6">
                <p className="mb-2 text-sm uppercase tracking-[0.3em] text-zinc-500">
                  Our Vision
                </p>

                <h3 className="max-w-xs text-lg text-white sm:text-xl lg:text-xl">
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

              <h3 className="mb-4 text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                A Creative Partner For Ambitious Brands
              </h3>

              <p className="mb-6 text-sm leading-7 text-zinc-400 sm:text-base">
                As we continue to evolve, VAI SPACE is expanding beyond creative
                services into broader technology solutions, building a
                future-ready ecosystem where businesses can scale, innovate, and
                compete with confidence in a rapidly changing digital world.
              </p>
            </FadeUp>

            <div className="my-4 h-px bg-white/10" />

            <FadeUp>
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">
                Our Mission
              </p>

              <p className="text-sm leading-7 text-zinc-400 sm:text-base">
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
