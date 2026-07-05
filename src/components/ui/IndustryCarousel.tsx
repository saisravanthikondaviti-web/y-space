"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import IndustryCard from "./IndustryCard";

interface Industry {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface Props {
  industries: Industry[];
}

export default function IndustryCarousel({ industries }: Props) {
  const autoplay = Autoplay({
    delay: 2000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: true,
      dragFree: false,
    },
    [autoplay]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative mt-10">

      {/* Navigation */}
      <div className="absolute -top-16 right-0 z-30 flex gap-4">

        <button
          onClick={scrollPrev}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/40
            backdrop-blur-xl
            transition-all
            duration-300
            hover:scale-105
            hover:border-[#616CFA]/50
            hover:shadow-[0_0_25px_rgba(97,108,250,.35)]
          "
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>

        <button
          onClick={scrollNext}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/40
            backdrop-blur-xl
            transition-all
            duration-300
            hover:scale-105
            hover:border-[#E46ECC]/50
            hover:shadow-[0_0_25px_rgba(228,110,204,.35)]
          "
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>

      </div>

            {/* Carousel Wrapper */}
      <div className="relative">

        {/* Left Fade */}
        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-20
            h-full
            w-20
            bg-gradient-to-r
            from-black
            to-transparent
          "
        />

        {/* Right Fade */}
        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-20
            h-full
            w-20
            bg-gradient-to-l
            from-black
            to-transparent
          "
        />

        {/* Embla */}
        <div
          ref={emblaRef}
          className="overflow-hidden px-2"
        >
          <div className="flex">

            {industries.map((industry, index) => (
              <div
                key={industry.title}
                className="
                  min-w-0
                  flex-[0_0_100%]
                  px-2

                  sm:flex-[0_0_50%]

                  lg:flex-[0_0_33.333%]

                  xl:flex-[0_0_23%]

                  2xl:flex-[0_0_22%]
                "
              >
                <div
                  className={`
                    transition-all
                    duration-500
                    ${
                      selectedIndex === index
                        ? "scale-100 opacity-100"
                        : "scale-[0.96] opacity-80"
                    }
                  `}
                >
                  <IndustryCard {...industry} />
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-12 flex justify-center gap-3">

        {industries.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className="
              group
              flex
              items-center
            "
          >
            <div
              className={`
                h-[4px]
                rounded-full
                transition-all
                duration-500

                ${
                  selectedIndex === index
                    ? "w-16 bg-gradient-to-r from-[#616CFA] to-[#E46ECC]"
                    : "w-8 bg-white/15 group-hover:bg-white/30"
                }
              `}
            />
          </button>
        ))}

      </div>

    </div>
  );
}