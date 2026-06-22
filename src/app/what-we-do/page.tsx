"use client";

import { motion } from "framer-motion";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

const outcomes = [
  {
    title: "Stronger Positioning",
    description:
      "Define a unique space in the market and become the obvious choice.",
  },
  {
    title: "Brand Recognition",
    description:
      "Build consistency across every customer touchpoint and interaction.",
  },
  {
    title: "Better Conversion",
    description:
      "Transform attention into meaningful actions and measurable growth.",
  },
  {
    title: "Long-Term Growth",
    description:
      "Create systems that scale beyond individual campaigns or launches.",
  },
];

type Service = {
  title: string;
  video: string;
  description: string;
  items: string[];
  details: Record<string, string>;
};

const services: Service[] = [
  {
    title: "Branding",
    video: "/videos/Brand.mp4",
    description:
      "We help businesses create meaningful identities that communicate who they are and what they stand for.",
    items: [
      "Brand Identity",
      "Brand Auditing",
      "Brand Strategy",
      "Brand Positioning",
      "Visual Identity Systems",
      "Brand Guidelines",
    ],
    details: {
      "Brand Identity":
        "A brand is more than a logo. It's how people recognize you, remember you, and trust you.",
      "Brand Auditing":
        "Evaluate your current brand presence, strengths, weaknesses, and opportunities.",
      "Brand Strategy":
        "Develop a roadmap that aligns your brand with business goals and audience expectations.",
      "Brand Positioning":
        "Define a unique space in the market that sets you apart from competitors.",
      "Visual Identity Systems":
        "Create a cohesive visual language that reflects your brand's personality and values.",
      "Brand Guidelines":
        "Document the rules and standards for using your brand assets to ensure consistency across all touchpoints.",
    },
  },
  {
    title: "Design & Creative",
    video: "/videos/creative.mp4",
    description:
      "We create visual experiences that help businesses look professional, consistent, and memorable.",
    items: [
      "Social Media Creatives",
      "Marketing Collateral Design",
      "Corporate Design",
      "Ad Creatives",
      "Design That Communicates",
    ],
    details: {
      "Social Media Creatives":
        "Crafting eye-catching visuals for social media platforms that engage your audience and enhance your brand presence.",
      "Corporate Design":
        "Developing professional designs for corporate materials such as annual reports, business cards, and internal communications.",
      "Marketing Collateral Design":
        "Designing brochures, flyers, and presentations that effectively communicate your brand's message and value proposition.",
      "Ad Creatives":
        "Creating impactful ad creatives that capture attention and drive conversions across various advertising channels.",
      "Design That Communicates":
        "We create visually compelling designs that strengthen brand perception and support marketing objectives.",
        },
  },
  {
    title: "Digital Marketing",
    video: "/videos/growth.mp4",
    description:
      "Our marketing approach combines creativity with strategy to build awareness, engagement, and growth.",
    items: [
      "Performance Marketing",
      "Search Engine Optimisation (SEO)",
      "Social Media Marketing (SMM)",
      "Social Media Management",
      "Google & META Ads",
      "Influencer & Collaboration Marketing",
      "Analytics & Reporting",
      "Content Strategy",
      "Campaign Planning",
      "Audience Research",
    ],
    details: {
      "Performance Marketing":
        "We focus on data-driven strategies to maximize the effectiveness of your marketing investments.",
      "Search Engine Optimisation (SEO)":
        "Improve your website's visibility in search engine results to attract more organic traffic.",
      "Social Media Marketing (SMM)":
        "Engage with your audience on social media platforms to build brand awareness and drive conversions.",
      "Social Media Management":
        "Manage and optimize your social media presence to maintain a consistent brand voice and strategy.",
      "Google & META Ads":
        "Create targeted advertising campaigns across Google and META platforms to reach your ideal customers.",
      "Influencer & Collaboration Marketing":
        "Partner with influencers and other brands to expand your reach and build credibility.",
      "Analytics & Reporting":
        "Track and analyze the performance of your marketing efforts to make informed decisions and optimize results.",
      "Content Strategy":
        "Develop a content plan that aligns with your brand values and resonates with your target audience.",
      "Campaign Planning":
        "Design and execute marketing campaigns that achieve specific business objectives.",
      "Audience Research":
        "Understand your target audience's needs, preferences, and behaviors to create more effective marketing strategies.",
    },
  },
  {
    title: "Website Design & Development",
    video: "/videos/digital.mp4",
    description:
      "We design and develop websites that are visually refined, user-focused, and performance-driven.",
    items: [
      "Development",
      "E-Commerce",
      "CMS Management",
      "Design",
      "Optimization",
      "Security & Maintenance",
      "Business Websites",
      "Landing Pages",
      "UI/UX Design",
      "WordPress Development",
      "Conversion-Focused Experiences",
    ],
    details: {
      Development:
        "We build custom websites and web applications tailored to your business needs and objectives.",
      "E-Commerce":
        "Create online stores that provide seamless shopping experiences and drive sales.",
      "CMS Management":
        "Implement and manage content management systems to allow easy updates and scalability.",
      Design:
        "Craft visually appealing and user-friendly designs that reflect your brand identity.",
      Optimization:
        "Ensure your website performs well with fast load times, responsive design, and SEO best practices.",
      "Security & Maintenance":
        "Provide ongoing support to keep your website secure, up-to-date, and running smoothly.",
      "Business Websites":
        "Create professional websites that represent your brand and drive business growth.",
      "Landing Pages":
        "Design and develop high-converting landing pages for marketing campaigns and product launches.",
      "UI/UX Design":
        "Focus on creating intuitive user interfaces and seamless user experiences to enhance engagement and satisfaction.",
      "WordPress Development":
        "Specialize in WordPress development to create customizable and scalable websites that meet your specific needs.",
      "Conversion-Focused Experiences":
        "Design and develop websites with a focus on driving conversions and achieving your business goals.",
    },
  },
  {
    title: "Video Production",
    video: "/videos/motion.mp4",
    description:
      "We create compelling visual content designed to engage, educate, and inspire.",
    items: [
      "Video Editing Services",
      "Promotional Videos",
      "Social Media Video Content",
      "Corporate Videos",
      "Motion Graphics & Reels",
    ],
    details: {
      "Video Editing Services":
        "We provide professional video editing services to enhance the quality and impact of your video content.",
      "Promotional Videos":
        "Create engaging promotional videos to showcase your products or services.",
      "Social Media Video Content":
        "Develop short-form videos optimized for social media platforms.",
      "Corporate Videos":
        "Produce professional corporate videos for internal communications and external marketing.",
      "Motion Graphics & Reels":
        "Design dynamic motion graphics and short-form reels to capture attention and convey messages effectively.",
    },
  },
];

function BackgroundFX() {
  return (
    <>
      <ScrollProgress />
      <SmoothScroll />
      <CustomCursor />
      <Navbar />
      {/* Grid */}
      <div
        className="
          fixed inset-0 -z-30
          bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      {/* Gradient Orbs */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 150, -100, 0],
            y: [0, -100, 100, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-200px] left-[-100px] h-[500px] w-[500px] rounded-full bg-[#616CFA]/20 blur-[140px]"
        />

        <motion.div
          animate={{
            x: [0, -120, 120, 0],
            y: [0, 120, -80, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-250px] right-[-100px] h-[550px] w-[550px] rounded-full bg-[#E46ECC]/20 blur-[160px]"
        />
      </div>

      {/* Radial Glow */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)]" />
    </>
  );
}

export default function WhatWeDo() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <BackgroundFX />

      {/* HERO */}
      <section className="px-6 md:px-16 pt-60 pb-45">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60">
            Strategy • Design • Technology • Growth
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            We help ambitious brands
            <span className="block bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
              become impossible to ignore.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60">
            Through strategy, branding, design, technology, and marketing, we
            build connected systems that strengthen perception, create trust,
            and drive meaningful growth.
          </p>
        </motion.div>
      </section>

      {/* PHILOSOPHY */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-sm uppercase tracking-[0.25em] text-white/40">
              What Drives Our Work
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-bold max-w-3xl">
              Every project begins with understanding before execution.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <span className="text-[#616CFA] text-sm">01</span>
              <h3 className="mt-4 text-2xl font-semibold">Understand</h3>
              <p className="mt-3 text-white/60">
                We learn the business, audience, and market before making
                decisions.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <span className="text-[#E46ECC] text-sm">02</span>
              <h3 className="mt-4 text-2xl font-semibold">Simplify</h3>
              <p className="mt-3 text-white/60">
                We remove complexity and create clarity through strategy and
                design.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <span className="text-[#616CFA] text-sm">03</span>
              <h3 className="mt-4 text-2xl font-semibold">Grow</h3>
              <p className="mt-3 text-white/60">
                Every solution is built to create measurable long-term growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="px-6 md:px-16 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <span className="text-sm uppercase tracking-[0.25em] text-white/40">
              Outcomes
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-bold">
              What success looks like
            </h2>
          </div>

          <div className="relative">
            {/* Main Line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#616CFA] via-[#E46ECC] to-[#616CFA] lg:block" />

            <div className="space-y-20">
              {outcomes.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`relative grid lg:grid-cols-2 gap-10 items-center ${
                    index % 2 === 0 ? "" : "lg:[&>*:first-child]:order-2"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`${
                      index % 2 === 0
                        ? "lg:text-right lg:pr-24"
                        : "lg:text-left lg:pl-24"
                    }`}
                  >
                    <h3 className="text-3xl font-bold">{item.title}</h3>

                    <p className="mt-4 text-white/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Empty Side */}
                  <div />

                  {/* Center Node */}
                  <div className="absolute left-1/2 top-1/2 hidden lg:flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                    <div className="absolute h-20 w-20 rounded-full bg-[#616CFA]/20 blur-2xl" />

                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black text-lg font-bold">
                      0{index + 1}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 md:px-16 py-24">
        <div className="mx-auto max-w-7xl space-y-28">
          {services.map((service) => (
            <div
              key={service.title}
              className="grid gap-12 lg:grid-cols-[320px_1fr]"
            >
              {/* Sticky Left */}
              <div className="lg:sticky lg:top-32 h-fit">
                <h2 className="text-3xl md:text-4xl font-bold">
                  {service.title}
                </h2>

                {/* Circular Video */}
                <div className="mt-8">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border border-white/10 bg-white/5">
                    <video
                      src={service.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <p className="mt-5 text-white/60 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Right */}
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {service.items.map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{
                      y: -4,
                      scale: 1.01,
                    }}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all"
                  >
                    <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#616CFA] to-[#E46ECC]" />

                    <h3 className="mt-6 text-lg font-semibold">{item}</h3>

                    <p className="mt-3 text-sm leading-relaxed text-white/55">
                      {service.details?.[item] ||
                        "Crafted with strategy, creativity, and precision to support sustainable business growth."}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-10 md:p-16 backdrop-blur-xl"
        >
          <div className="absolute inset-0 opacity-30" />

          <div className="relative max-w-3xl">
            <span className="text-sm uppercase tracking-[0.2em] text-white/40">
              Let's Build
            </span>

            <h2 className="mt-5 text-4xl md:text-5xl font-bold leading-tight">
              Your next stage of growth
              <span className="block bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
                starts with vai space.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-white/60">
              Whether you're launching, scaling, or repositioning, we create the
              systems that move brands forward.
            </p>

            <button className="mt-10 rounded-full bg-gradient-to-r from-[#616CFA] to-[#E46ECC] px-8 py-4 font-medium transition-transform hover:scale-105">
              Start a Project
            </button>
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
