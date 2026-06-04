"use client";

import FadeUp from "../ui/FadeUp";
import Link from "next/link";

const services = [
  {
    title: "Branding",
    description:
      "Building memorable brand identities that create trust, recognition, and lasting impressions.",
  },
  {
    title: "Digital Marketing",
    description:
      "Strategic campaigns designed to increase visibility, engagement, and customer acquisition.",
  },
  {
    title: "Performance Marketing",
    description:
      "Data-driven marketing focused on measurable growth, conversions, and return on investment.",
  },
  {
    title: "Creative Production",
    description:
      "High-quality creative assets that elevate brand storytelling across digital platforms.",
  },
  {
    title: "Video Production",
    description:
      "Engaging video content crafted to communicate ideas, products, and brand narratives.",
  },
  {
    title: "Web Development",
    description:
      "Modern, responsive, and high-performance websites built for growth and scalability.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32">
      <div className="mx-auto max-w-7xl px-8">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
          Services
        </p>

        <FadeUp>
          <h2 className="max-w-3xl text-4xl font-bold md:text-5xl">
              Solutions Designed
              <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
                {" "}
                For Digital Growth
              </span>
            </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            From branding and marketing to creative production and technology,
            we help businesses build stronger digital experiences and
            sustainable growth.
          </p>
        </FadeUp>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <FadeUp key={service.title}>
              <Link href="/services">
                <div
                  className="
  group
  relative
  overflow-hidden
  rounded-2xl
  border
  border-white/15
  bg-zinc-900/80
  backdrop-blur-xl
  p-6
  shadow-[0_10px_30px_rgba(0,0,0,0.25)]
  transition-all
  duration-500
  hover:-translate-y-1
  hover:border-[#616CFA]/20
  hover:bg-zinc-900
  cursor-none
"
                >
                  {/* Glow */}
                  <div
                    className="
              absolute
              inset-0
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
                  >
                    <div className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-[#616CFA]/10 blur-3xl" />
                    <div className="absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-[#E46ECC]/10 blur-3xl" />
                  </div>

                  {/* Top */}
                  <div className="relative mb-5 flex items-center justify-between">
                    <span className="text-xs font-medium tracking-wider text-zinc-400">
                      0{index + 1}
                    </span>

                    <div
                      className="
                h-2
                w-2
                rounded-full
                bg-zinc-600
                transition-all
                duration-500
                group-hover:bg-[#616CFA]
              "
                    />
                  </div>

                  {/* Accent Line */}
                  <div
                    className="
              relative
              mb-5
              h-px
              w-12
              bg-zinc-700
              transition-all
              duration-500
              group-hover:w-20
              group-hover:bg-gradient-to-r
              group-hover:from-[#616CFA]
              group-hover:to-[#E46ECC]
            "
                  />

                  {/* Content */}
                  <div className="relative">
                    <h3
                      className="
                mb-3
                text-xl
                font-semibold
                text-white
                transition-colors
                duration-300
                group-hover:text-zinc-100
              "
                    >
                      {service.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-zinc-300">
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div
                    className="
              relative
              mt-6
              flex
              items-center
              text-zinc-500
              transition-all
              duration-300
              group-hover:text-[#616CFA]
            "
                  >
                    <span className="text-sm">Learn More</span>

                    <span
                      className="
                ml-2
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
