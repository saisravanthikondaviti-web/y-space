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
      dragFree: true,
    },
    [autoplay],
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
    [emblaApi],
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
      <div
        className="
          absolute
          -top-16
          right-0
          z-30
          hidden
          gap-4
          sm:flex
        "
      >
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
            hover:scale-110
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
            hover:scale-110
            hover:border-[#E46ECC]/50
            hover:shadow-[0_0_25px_rgba(228,110,204,.35)]
          "
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Left Animated Black Shade */}
        {/* <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-20
            h-full
            w-24
            bg-gradient-to-r
            from-black
            via-black/80
            to-transparent
            opacity-90
            animate-[pulse_4s_ease-in-out_infinite]
            sm:w-32
            lg:w-44
          "
        /> */}

        {/* Right Animated Black Shade */}
        {/* <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-20
            h-full
            w-24
            bg-gradient-to-l
            from-black
            via-black/80
            to-transparent
            opacity-90
            animate-[pulse_4s_ease-in-out_infinite]
            sm:w-32
            lg:w-44
          "
        /> */}

        {/* Embla Viewport */}
        <div
          ref={emblaRef}
          className="
            overflow-hidden

            -mx-6
            px-6

            sm:-mx-10
            sm:px-10

            lg:-mx-16
            lg:px-16

            xl:-mx-20
            xl:px-20
          "
        >
          <div className="flex">
            {industries.map((industry, index) => (
              <div
                key={industry.title}
                className="
                  min-w-0
                  px-3

                  flex-[0_0_88%]

                  sm:flex-[0_0_55%]

                  md:flex-[0_0_45%]

                  lg:flex-[0_0_36%]

                  xl:flex-[0_0_30%]

                  2xl:flex-[0_0_27%]
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

      {/* Progress Indicators */}
      <div
        className="
          mt-12
          hidden
          justify-center
          gap-2
          overflow-hidden
          px-4
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
          >
            <div
              className={`
                h-[4px]
                rounded-full
                transition-all
                duration-500

                ${
                  selectedIndex === index
                    ? "w-10 sm:w-16 bg-gradient-to-r from-[#616CFA] to-[#E46ECC]"
                    : "w-5 sm:w-8 bg-white/15 group-hover:bg-white/30"
                }
              `}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
