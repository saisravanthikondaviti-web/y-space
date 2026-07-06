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
  className="relative flex h-screen items-start overflow-hidden pt-24"
>
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-[#616CFA]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#E46ECC]/10 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-5 max-w-3xl">
          <FadeUp>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
              About VAISPACE
            </p>
          </FadeUp>

          <FadeUp>
           <h2 className="text-3xl font-bold leading-[1.05] text-white md:text-[2.5rem] xl:text-[3rem]">
              Building Modern Brands Through
              <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
                {" "}
                Strategy, Creativity & Technology
              </span>
            </h2>
          </FadeUp>
        </div>

        {/* Main Section */}
        <div className="grid items-center gap-6 lg:grid-cols-2">
          {/* Image */}
          <FadeUp>
            <div className="relative h-[260px] md:h-[300px] xl:h-[340px] overflow-hidden rounded-3xl border border-white/10">
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
                <p className="mb-2 text-sm uppercase tracking-[0.3em] text-zinc-300">
                  Our Vision
                </p>

                <h3 className="max-w-xs text-xl font-semibold text-white lg:text-2xl">
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

              <h3 className="mb-3 text-xl font-bold text-white lg:text-2xl">
                A Creative Partner For Ambitious Brands
              </h3>

              <p className="mb-4 text-sm leading-6 text-zinc-400">
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

              <p className="text-sm leading-6 text-zinc-400">
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
