"use client";

import FadeUp from "../ui/FadeUp";
import Link from "next/link";

const services = [
  {
    slug: "branding",
    title: "Branding",
    description:
      "Building memorable brand identities that create trust, recognition, and lasting impressions.",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Strategic campaigns designed to increase visibility, engagement, and customer acquisition.",
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    description:
      "Data-driven marketing focused on measurable growth, conversions, and return on investment.",
  },
  {
    slug: "design-creative",
    title: "Creative Production",
    description:
      "High-quality creative assets that elevate brand storytelling across digital platforms.",
  },
  {
    slug: "video-production",
    title: "Video Production",
    description:
      "Engaging video content crafted to communicate ideas, products, and brand narratives.",
  },
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "Modern, responsive, and high-performance websites built for growth and scalability.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      data-scroll-section
      className="relative py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 space-y-8">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500 sm:text-sm">
          Services
        </p>

        <div className="space-y-3">
          <FadeUp>
            <h2 className="max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl xl:text-5xl">
              Designed
              <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
                {" "}
                For Digital Growth
              </span>
            </h2>
          </FadeUp>

          <FadeUp>
            <p className="max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg lg:max-w-6xl">
              We deliver branding, marketing, creative production, and
              technology solutions that help businesses grow with confidence.
            </p>
          </FadeUp>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <FadeUp key={service.title}>
              <Link href={`/services?service=${service.slug}`} prefetch={false}>
                <div
                  className="
      group
      relative
      flex
      h-full
      flex-col
      overflow-hidden
      rounded-xl
      border
      border-white/15
      bg-zinc-900/80
      backdrop-blur-xl
      p-3.5 lg:p-4
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
                    <div className="absolute -left-10 top-0 h-28 w-28 rounded-full bg-[#616CFA]/10 blur-3xl" />
                    <div className="absolute -right-10 bottom-0 h-28 w-28 rounded-full bg-[#E46ECC]/10 blur-3xl" />
                  </div>

                  {/* Top */}
                  <div className="relative mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-medium tracking-wider text-zinc-400">
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
        mb-2
        h-px
        w-10
        bg-zinc-700
        transition-all
        duration-500
        group-hover:w-16
        group-hover:bg-gradient-to-r
        group-hover:from-[#616CFA]
        group-hover:to-[#E46ECC]
      "
                  />

                  {/* Content */}
                  <div className="relative flex-1">
                    <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">
                      {service.title}
                    </h3>

                    <p className="text-[11px] leading-5 text-zinc-400 sm:text-sm">
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div
                    className="
        relative
        mt-5
        flex
        items-center
        text-zinc-500
        transition-all
        duration-300
        group-hover:text-[#616CFA]
      "
                  >
                    <span className="text-[13px]">Learn More</span>

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
