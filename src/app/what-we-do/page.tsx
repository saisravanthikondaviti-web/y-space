"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SectionNavigator from "@/components/ui/SectionNavigator";

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
  slug: string;
  title: string;
  image: string;
  description: string;
  items: string[];
  details: Record<string, string>;
};

const services: Service[] = [
  {
    slug: "branding",
    title: "Branding",
    image: "/images/whatwedo/cbranding.png",
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
    slug: "performance-marketing",
    title: "Performance Marketing",
    image: "/images/whatwedo/cperform.png",
    description:
      "Our marketing approach combines creativity with strategy to build awareness, engagement, and growth.",
    items: [
      "Google & META Ads",
      "Lead Generation",
      "Conversion Optimization",
      "Funnel System",
      "Analytics & Reporting",
      "Whatsapp Marketing",
    ],
    details: {
      "Google & META Ads":
        "Launch highly targeted ad campaigns across Google and META platforms to generate qualified traffic, leads, and measurable business growth.",

      "Lead Generation":
        "Build scalable lead generation systems that consistently attract high-intent prospects and convert them into potential customers.",

      "Conversion Optimization":
        "Optimize landing pages, ad creatives, and user journeys to improve conversion rates and maximize your return on ad spend.",

      "Funnel System":
        "Design and automate high-converting sales funnels that guide prospects from awareness to purchase with minimal friction.",

      "Analytics & Reporting":
        "Monitor campaign performance with detailed analytics and actionable reports to identify opportunities and improve marketing results.",

      "Whatsapp Marketing":
        "Engage customers through personalized WhatsApp campaigns, automated messaging, and timely follow-ups that drive higher conversions.",
    },
  },
  {
    slug: "design-creative",
    title: "Design & Creative",
    image: "/images/whatwedo/cdc.png",
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
    slug: "digital-marketing",
    title: "Digital Marketing",
    image: "/images/whatwedo/cdigim.png",
    description:
      "Our marketing approach combines creativity with strategy to build awareness, engagement, and growth.",
    items: [
      "Search Engine Optimisation (SEO)",
      "Social Media Marketing (SMM)",
      "Social Media Management",
      "Influencer & Collaboration Marketing",
      "Content Strategy",
      "Campaign Planning",
    ],
    details: {
      "Search Engine Optimisation (SEO)":
        "Improve your website's visibility in search engine results to attract more organic traffic.",
      "Social Media Marketing (SMM)":
        "Engage with your audience on social media platforms to build brand awareness and drive conversions.",
      "Social Media Management":
        "Manage and optimize your social media presence to maintain a consistent brand voice and strategy.",
      "Influencer & Collaboration Marketing":
        "Partner with influencers and other brands to expand your reach and build credibility.",
      "Content Strategy":
        "Develop a content plan that aligns with your brand values and resonates with your target audience.",
      "Campaign Planning":
        "Design and execute marketing campaigns that achieve specific business objectives.",
      },
  },
  {
    slug: "web-development",
    title: "Website Design & Development",
    image: "/images/whatwedo/cwebdev.png",
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
    slug: "video-production",
    title: "Video Production",
    image: "/images/whatwedo/video-production.png",
    description:
      "We create compelling visual content designed to engage, educate, and inspire.",
    items: [
      "Ad Shoots",
      "Product Videos",
      "Corporate Videos",
      "Promotional Videos",
      "Motion Graphics & Reels",
      "Video Editing Services",
    ],
    details: {
      "Ad Shoots":
        "Create high-impact advertising videos designed to showcase your brand, products, and services.",
      "Product Videos":
        "Built to enhance brand perception, customer engagement, and sales performance.",
      "Corporate Videos":
        "Produce engaging promotional content that highlights your business offerings with clarity and creativity.",
      "Promotional Videos":
        "Create engaging promotional videos to showcase your products or services.",
      "Motion Graphics & Reels":
        "Design dynamic motion graphics and short-form reels to capture attention and convey messages effectively.",
      "Video Editing Services":
        "We provide professional video editing services to enhance the quality and impact of your video content.",
    },
  },
];

function BackgroundFX() {
  return (
    <>
      <ScrollProgress />
      <SmoothScroll />
      <CustomCursor />
      <SectionNavigator />
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
      <section
        data-scroll-section
        id="hero"
        className="flex min-h-screen items-center justify-center px-6 pt-40 pb-28 md:px-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-5xl flex-col items-center text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/60 backdrop-blur-xl">
            Strategy • Design • Technology • Growth
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl xl:text-6xl">
            We help ambitious brands
            <span className="mt-2 block bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
              become impossible to ignore.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/60 md:text-xl">
            Through strategy, branding, design, technology, and marketing,{" "}
            <br /> we build connected digital experiences that strengthen
            perception,
            <br /> create trust, and drive meaningful growth.
          </p>
        </motion.div>
      </section>

      {/* PHILOSOPHY */}
      <section
        data-scroll-section
        id="philosophy"
        className="px-6 md:px-16 py-20"
      >
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
      <section
        data-scroll-section
        id="outcomes"
        className="px-6 md:px-16 py-32"
      >
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
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
              Services we offer...
            </span>
          </h2>
          <div className="mx-auto mt-10 h-px w-72 bg-gradient-to-r from-transparent via-[#616CFA] to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl space-y-28">
          {services.map((service) => (
            <div
              id={service.slug}
              key={service.title}
              className="scroll-mt-32 grid items-center gap-16 lg:grid-cols-[320px_minmax(0,1fr)]"
            >
              {/* Sticky Left */}
              <div className="lg:sticky lg:top-32 h-fit">
                <h2 className="text-3xl md:text-4xl font-bold">
                  {service.title}
                </h2>

                {/* Circular Video */}
                <div className="mt-8">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border border-white/10 bg-white/5">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="mt-5 text-white/60 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Right */}
              <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <motion.div
                  className="flex w-max gap-6"
                  animate={{
                    x: ["0%", "-50%"],
                  }}
                  transition={{
                    duration: 80,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {[...service.items, ...service.items].map((item, index) => (
                    <motion.div
                      key={`${item}-${index}`}
                      whileHover={{
                        y: -6,
                        scale: 1.02,
                      }}
                      transition={{ duration: 0.25 }}
                      className="h-[240px] w-[300px] flex-shrink-0 rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl hover:border-[#616CFA]/40 hover:bg-white/[0.05]"
                    >
                      <div className="h-1 w-14 rounded-full bg-gradient-to-r from-[#616CFA] to-[#E46ECC]" />

                      <h3 className="mt-6 text-xl font-semibold">{item}</h3>

                      <p className="mt-4 text-sm leading-7 text-white/60">
                        {service.details[item] ||
                          "Crafted with strategy, creativity, and precision to help businesses build stronger brands and create lasting impact."}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
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
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left Content */}
            <div className="max-w-3xl">
              <span className="text-sm uppercase tracking-[0.2em] text-white/40">
                Let's Build
              </span>

              <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
                Your next stage of growth
                <span className="block bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
                  starts with VAISPACE.
                </span>
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-white/60">
                Whether you're launching, scaling, or repositioning, we create
                the systems that move brands forward.
              </p>

              <Link
                href="/contact"
                className="mt-10 inline-flex items-center rounded-full bg-gradient-to-r from-[#616CFA] to-[#E46ECC] px-8 py-4 font-medium transition-all duration-300 hover:scale-105"
              >
                Start a Project →
              </Link>
            </div>

            {/* Right Illustration */}
            <div className="relative hidden justify-center lg:flex">
              {/* Glow */}
              <div className="absolute h-[380px] w-[380px] rounded-full bg-gradient-to-r from-[#616CFA]/25 to-[#E46ECC]/25 blur-[120px]" />

              <img
                src="/images/graphpic.png"
                alt="Digital Agency Illustration"
                className="
        relative
        z-10
        w-full
        max-w-[480px]
        object-contain
        transition-transform
        duration-700
        hover:scale-105
      "
              />
            </div>
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
