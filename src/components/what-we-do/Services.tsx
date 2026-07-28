"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { services } from "./data";


interface Service {
  title: string;
  description: string;
  image: string;
  slug: string;
}


interface ServiceCardProps {
  service: Service;
  index: number;
  onClick: () => void;
}


function ServiceCard({
  service,
  index,
  onClick,
}: ServiceCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{
        y: -8,
      }}
      className="
        group
        relative
        cursor-pointer
        min-h-[260px]
        sm:min-h-[300px]
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        p-5
        sm:p-6
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-[#616CFA]/40
        hover:bg-white/[0.06]
      "
    >
      <div className="flex items-start justify-between">

        <div
          className="
            h-1
            w-10
            rounded-full
            bg-gradient-to-r
            from-[#616CFA]
            to-[#E46ECC]
          "
        />

        <Image
          src={service.image}
          alt={service.title}
          width={70}
          height={70}
          className="
            h-16
            w-16
            object-contain
            transition-transform
            duration-300
            group-hover:scale-110
          "
        />

      </div>


      <div className="mt-8">

        <h3
          className="
            text-lg
            font-bold
            text-white
            sm:text-xl
          "
        >
          {service.title}
        </h3>


        <p
          className="
            mt-3
            text-xs
            leading-5
            text-white/60
            sm:text-sm
            sm:leading-6
          "
        >
          {service.description}
        </p>

      </div>


      <span
        className="
          absolute
          bottom-4
          right-5
          text-base
          font-bold
          text-white/20
        "
      >
        {String(index + 1).padStart(2, "0")}
      </span>


      <div
        className="
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          bg-[#616CFA]/20
          blur-3xl
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

    </motion.div>
  );
}



export default function Services() {

  const router = useRouter();


  const [page, setPage] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [paused, setPaused] = useState(false);


  const cardsPerPage = 4;

  const totalPages = Math.ceil(
    services.length / cardsPerPage,
  );


  const visibleServices = services.slice(
    page * cardsPerPage,
    page * cardsPerPage + cardsPerPage,
  );


  useEffect(() => {

    if (paused) return;


    const timer = setInterval(() => {

      setMobileIndex((prev) =>
        prev === services.length - 1
          ? 0
          : prev + 1,
      );

    }, 3500);


    return () => clearInterval(timer);

  }, [paused]);


  const previousPage = () => {
    setPage((prev) =>
      prev === 0
        ? totalPages - 1
        : prev - 1,
    );
  };


  const nextPage = () => {
    setPage((prev) =>
      prev === totalPages - 1
        ? 0
        : prev + 1,
    );
  };


  const previousMobile = () => {
    setMobileIndex((prev) =>
      prev === 0
        ? services.length - 1
        : prev - 1,
    );
  };


  const nextMobile = () => {
    setMobileIndex((prev) =>
      prev === services.length - 1
        ? 0
        : prev + 1,
    );
  };


  return (
    <section
      data-scroll-section
      id="services"
      className="
        flex
        min-h-screen
        items-center
        px-5
        py-16
        sm:px-8
        md:px-16
      "
    >

      <div className="w-full">


        <div
          className="
            mx-auto
            mb-10
            max-w-3xl
            text-center
          "
        >

          <h2
            className="
              text-3xl
              font-bold
              text-white
              sm:text-4xl
              lg:text-5xl
            "
          >
            Services{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#616CFA]
                to-[#E46ECC]
                bg-clip-text
                text-transparent
              "
            >
              we offer...
            </span>

          </h2>

        </div>



        {/* MOBILE */}

        <div
          className="md:hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >

          <AnimatePresence mode="wait">

            <motion.div
              key={mobileIndex}
              initial={{
                x: "100%",
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: "-100%",
                opacity: 0,
              }}
            >

              <ServiceCard
                service={services[mobileIndex]}
                index={mobileIndex}
                onClick={() =>
                  router.push(
                    `/services?service=${services[mobileIndex].slug}`,
                  )
                }
              />

            </motion.div>

          </AnimatePresence>


          <div className="mt-6 flex justify-center gap-5">

            <button onClick={previousMobile}>
              <ChevronLeft />
            </button>


            <button onClick={nextMobile}>
              <ChevronRight />
            </button>

          </div>

        </div>



        {/* DESKTOP */}

        <div
          className="
            hidden
            md:flex
            mx-auto
            max-w-7xl
            items-center
            gap-5
          "
        >

          <button onClick={previousPage}>
            <ChevronLeft />
          </button>


          <div
            className="
              grid
              flex-1
              grid-cols-4
              gap-5
            "
          >

            {visibleServices.map((service, index) => (

              <ServiceCard
                key={service.title}
                service={service}
                index={
                  page * cardsPerPage + index
                }
                onClick={() =>
                  router.push(
                    `/services?service=${service.slug}`,
                  )
                }
              />

            ))}

          </div>


          <button onClick={nextPage}>
            <ChevronRight />
          </button>


        </div>


      </div>

    </section>
  );
}