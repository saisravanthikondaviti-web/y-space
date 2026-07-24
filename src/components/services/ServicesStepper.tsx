"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "./data";

export default function ServicesStepper() {
  const searchParams = useSearchParams();

  const serviceSlug = searchParams.get("service");

  const [activeIndex, setActiveIndex] = useState(0);

  const service = services[activeIndex];

  // Open service based on URL
  useEffect(() => {
    if (!serviceSlug) return;

    const index = services.findIndex((item) => item.slug === serviceSlug);

    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [serviceSlug]);

  const nextService = () => {
    setActiveIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const previousService = () => {
    setActiveIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  return (
    <section
      className="
        min-h-[85vh]
        flex
        items-center
        justify-center
        px-4
        sm:px-6
        py-10
      "
    >
      <div className="w-full max-w-6xl">
        {/* Service Title */}

        <AnimatePresence mode="wait">
          <motion.h2
            key={service.slug}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              mt-25
              mb-8
              text-center
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              leading-tight
              bg-gradient-to-r
              from-[#616CFA]
              to-[#E46ECC]
              bg-clip-text
              text-transparent
            "
          >
            {service.title}
          </motion.h2>
        </AnimatePresence>

        {/* Service Items */}

        <AnimatePresence mode="wait">
          <motion.div
            key={service.slug}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-4
            "
          >
            {service.items.map((item: string, index: number) => (
              <motion.div
                key={item}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.06,
                }}
                className="
                    group
                    relative
                    min-h-[140px]
                    rounded-xl
                    border
                    border-white/15
                    bg-white/[0.04]
                    p-5
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#616CFA]/60
                    hover:bg-white/[0.08]
                  "
              >
                <div
                  className="
                      mb-5
                      h-[3px]
                      w-12
                      rounded-full
                      bg-gradient-to-r
                      from-[#616CFA]
                      to-[#E46ECC]
                    "
                />

                <h3
                  className="
                      text-base
                      sm:text-lg
                      font-semibold
                      text-white
                      mb-2
                    "
                >
                  {item}
                </h3>

                <p
                  className="
                      text-xs
                      sm:text-sm
                      leading-relaxed
                      text-white/50
                    "
                >
                  Create impactful solutions with strategic thinking and
                  creative execution.
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}

        <div
          className="
            mt-8
            flex
            justify-center
            gap-4
          "
        >
          <button
            onClick={() => window.history.back()}
            className="
    rounded-full
    border
    border-white/20
    px-6
    py-2.5
    text-sm
    text-white
    transition
    hover:bg-white/10
  "
          >
            Back
          </button>

          <button
            onClick={nextService}
            className="
              rounded-full
              bg-gradient-to-r
              from-[#616CFA]
              to-[#E46ECC]
              px-8
              py-2.5
              text-sm
              text-white
              shadow-lg
              shadow-[#616CFA]/20
              transition
              hover:scale-105
            "
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
