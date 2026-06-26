"use client";

import FadeUp from "../ui/FadeUp";
import Link from "next/link";

const projects = [
  {
    category: "Branding & Strategy",
    title: "Building Distinct Digital Identities",
    description:
      "Creating memorable brand experiences that connect with audiences and establish long-term recognition.",
    image: "/images/portfolio/branding.jpg",
  },
  {
    category: "Web Development",
    title: "High-Performance Digital Platforms",
    description:
      "Modern websites engineered for speed, scalability, and exceptional user experiences.",
    image: "/images/portfolio/webdev.png",
  },
  {
    category: "Digital Marketing",
    title: "Growth-Focused Marketing Campaigns",
    description:
      "Data-driven campaigns designed to increase visibility, engagement, and measurable results.",
    image: "/images/portfolio/marketing.jpg",
  },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      data-scroll-section
      className="flex h-screen items-center"
    >
      <div className="mx-auto max-w-7xl px-8">
        {/* Header */}
        <FadeUp>
          <div className="mb-8">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
              Featured Projects
            </p>

            <h2 className="max-w-3xl text-3xl font-bold md:text-4xl xl:text-5xl">
              Transforming Ideas Into
              <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
                {" "}
                Digital Success Stories
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
              A showcase of strategic, creative, and technology-driven solutions
              crafted to help brands grow and thrive in the digital landscape.
            </p>
          </div>
        </FadeUp>

        {/* Projects Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <FadeUp key={project.title}>
              <Link
                href="/portfolio"
                className="
                  group
                  relative
                  flex
                  h-[340px]
                  flex-col
                  justify-between
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-black/30
                  p-8
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-white/20
                "
              >
                {/* Background Image */}
                <div
                  className="
    absolute
    inset-0
    bg-cover
    bg-center
    transition-transform
    duration-700
    group-hover:scale-110
  "
                  style={{
                    backgroundImage: `url(${project.image})`,
                  }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/15" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

                {/* Indigo / Orchid Glow */}
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
                  <div
                    className={`
      absolute
      -top-10
      -right-10
      h-40
      w-40
      rounded-full
      blur-3xl
      ${index % 2 === 0 ? "bg-[#616CFA]/20" : "bg-[#E46ECC]/20"}
    `}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <span className="text-sm font-medium text-white/50">
                      0{index + 1}
                    </span>

                    <div className="mt-5 h-px w-14 bg-white/20" />
                  </div>

                  <div>
                    <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/60">
                      {project.category}
                    </p>

                    <h3 className="mb-4 text-2xl font-semibold text-white">
                      {project.title}
                    </h3>

                    <p className="leading-relaxed text-zinc-300">
                      {project.description}
                    </p>
                  </div>

                  <div
                    className="
      flex
      items-center
      text-sm
      text-white/70
      transition-all
      duration-300
      group-hover:text-white
    "
                  >
                    View Project
                    <span className="ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeUp>
          <div className="mt-8 flex justify-center">
            <Link
              href="/portfolio"
              className="
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                px-8
                py-4
                text-sm
                font-medium
                transition-all
                duration-300
                hover:border-[#616CFA]/30
                hover:bg-white/[0.05]
              "
            >
              Explore Full Portfolio
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
