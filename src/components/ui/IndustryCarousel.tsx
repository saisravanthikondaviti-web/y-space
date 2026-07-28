"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
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

export default function IndustryCarousel({
  industries,
}: Props) {
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
    [autoplay],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  const updateSelectedIndex = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(
      emblaApi.selectedScrollSnap(),
    );
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const frame = requestAnimationFrame(() => {
      updateSelectedIndex();
    });

    emblaApi.on(
      "select",
      updateSelectedIndex,
    );

    emblaApi.on(
      "reInit",
      updateSelectedIndex,
    );

    return () => {
      cancelAnimationFrame(frame);

      emblaApi.off(
        "select",
        updateSelectedIndex,
      );

      emblaApi.off(
        "reInit",
        updateSelectedIndex,
      );
    };
  }, [emblaApi, updateSelectedIndex]);

  return (
    <div className="relative mt-10">
      <div className="relative">

        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-20
            h-full
            w-12
            bg-gradient-to-r
            from-black/60
            to-transparent
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-20
            h-full
            w-12
            bg-gradient-to-l
            from-black/60
            to-transparent
          "
        />

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


      <div className="mt-12 flex justify-center">

        <div className="flex items-center gap-2 sm:hidden">
          {industries
            .slice(0, 3)
            .map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="
                  flex
                  items-center
                  justify-center
                  p-1
                "
              >
                <span
                  className={`
                    block
                    rounded-full
                    transition-all
                    duration-500
                    ${
                      selectedIndex === index
                        ? "h-2.5 w-2.5 bg-gradient-to-r from-[#616CFA] to-[#E46ECC] shadow-[0_0_10px_rgba(97,108,250,0.5)]"
                        : "h-2 w-2 bg-white/25"
                    }
                  `}
                />
              </button>
            ))}
        </div>


        <div
          className="
            hidden
            items-center
            justify-center
            gap-3
            sm:flex
          "
        >
          {industries.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className="
                group
                flex
                items-center
              "
              aria-label={`Go to slide ${index + 1}`}
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
    </div>
  );
}