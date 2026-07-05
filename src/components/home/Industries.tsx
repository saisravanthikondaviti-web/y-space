"use client";

import FadeUp from "../ui/FadeUp";
import IndustryCarousel from "../ui/IndustryCarousel";

const industries = [
  {
    icon: "🚀",
    title: "Startups",
    description:
      "Helping startups build strong digital foundations, launch faster, and accelerate growth with modern digital solutions.",
    color: "#616CFA",
  },
  {
    icon: "🏢",
    title: "Small & Medium Businesses",
    description:
      "Affordable branding, websites, and marketing strategies that generate leads and grow businesses.",
    color: "#F5B942",
  },
  {
    icon: "🏛️",
    title: "Corporate Organizations",
    description:
      "Enterprise-grade branding, digital transformation, and scalable marketing solutions.",
    color: "#E46ECC",
  },
  {
    icon: "🏠",
    title: "Real Estate Brands",
    description:
      "High-converting campaigns, premium branding, and property marketing that builds trust.",
    color: "#14B8A6",
  },
  {
    icon: "🎓",
    title: "Educational Institutions",
    description:
      "Creative campaigns that attract admissions, improve engagement, and build institutional credibility.",
    color: "#8B5CF6",
  },
  {
    icon: "🍔",
    title: "Food & Beverage",
    description:
      "Content and campaigns that increase visibility, customer engagement, and online orders.",
    color: "#F59E0B",
  },
  {
    icon: "👗",
    title: "Fashion & Lifestyle",
    description:
      "Luxury branding and social-first content that transforms followers into loyal customers.",
    color: "#EC4899",
  },
  {
    icon: "👤",
    title: "Personal Brands",
    description:
      "Helping creators, entrepreneurs, and professionals establish authority and build influence.",
    color: "#22C55E",
  },
  {
    icon: "🗳️",
    title: "Political Campaigns",
    description:
      "Strategic digital campaigns, outreach, and engagement that maximize public reach.",
    color: "#A855F7",
  },
  {
    icon: "🛕",
    title: "Devotional Organizations",
    description:
      "Meaningful storytelling and community-focused digital experiences that inspire audiences.",
    color: "#F97316",
  },
];

export default function Industries() {
  return (
    <section
      id="industries"
      data-scroll-section
      className="relative overflow-hidden py-28"
    >
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[#616CFA]/10 blur-[140px]" />

      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#E46ECC]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-12">
        {/* Heading */}
        <FadeUp>
          <div className="mx-auto mb-16 max-w-4xl text-center">
            {/* Section Label */}

            {/* Heading */}
            <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
                Industries We Serve
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              From startups to enterprises, we deliver digital
              solutions that strengthen brands, accelerate growth, and create
              meaningful customer experiences.
            </p>

            {/* Decorative Divider */}
            <div className="mx-auto mt-10 h-px w-52 bg-gradient-to-r from-transparent via-[#616CFA] to-transparent" />
          </div>
        </FadeUp>

        {/* Carousel */}
        <FadeUp>
          <IndustryCarousel industries={industries} />
        </FadeUp>
      </div>
    </section>
  );
}
