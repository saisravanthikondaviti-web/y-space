"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "./data";

export default function Services() {
  const router = useRouter();

  const cardsPerPage = 4;

  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(services.length / cardsPerPage);

  const visibleServices = services.slice(
    page * cardsPerPage,
    page * cardsPerPage + cardsPerPage,
  );

  return (
    <section
      data-scroll-section
      id="services"
      className="px-6 py-24 md:px-16"
    >
      {/* Heading */}

      <div className="mx-auto mb-14 max-w-3xl text-center">
        <h2
          className="
            text-3xl
            font-bold
            leading-tight
            text-white
            md:text-4xl
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

        <div
          className="
            mx-auto
            mt-10
            h-px
            w-72
            bg-gradient-to-r
            from-transparent
            via-[#616CFA]
            to-transparent
          "
        />
      </div>


      {/* Cards Container */}

      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          gap-6
        "
      >

        {/* Left Navigation */}

        <button
          onClick={() =>
            setPage(page === 0 ? totalPages - 1 : page - 1)
          }
          className="
            hidden
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/5
            text-white
            transition
            hover:border-[#616CFA]
            hover:bg-[#616CFA]/20
            md:flex
          "
        >
          <ChevronLeft size={22} />
        </button>


        {/* Cards */}

        <div
          className="
            grid
            flex-1
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {visibleServices.map((service, index) => (

            <motion.div
              key={service.title}

              onClick={() =>
                router.push(`/services?service=${service.slug}`)
              }

              initial={{
                opacity: 0,
                y: 30,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}

              whileHover={{
                y: -8,
              }}

              className="
                group
                relative
                cursor-pointer
                h-[320px]
                overflow-hidden
                rounded-[24px]
                border
                border-white/10
                bg-white/[0.03]
                p-6
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-[#616CFA]/40
                hover:bg-white/[0.06]
              "
            >

              {/* Top */}

              <div
                className="
                  flex
                  items-start
                  justify-between
                "
              >

                <div
                  className="
                    h-1
                    w-12
                    rounded-full
                    bg-gradient-to-r
                    from-[#616CFA]
                    to-[#E46ECC]
                  "
                />

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                  "
                >

                  <Image
                    src={service.image}
                    alt={service.title}
                    width={25}
                    height={25}
                  />

                </div>

              </div>


              {/* Content */}

              <div className="mt-10">

                <h3
                  className="
                    text-xl
                    font-bold
                    text-white
                  "
                >
                  {service.title}
                </h3>


                <p
                  className="
                    mt-4
                    text-sm
                    leading-6
                    text-white/60
                  "
                >
                  {service.description}
                </p>

              </div>



              {/* Number */}

              <span
                className="
                  absolute
                  bottom-5
                  right-6
                  text-lg
                  font-bold
                  text-white/20
                "
              >
                {String(page * cardsPerPage + index + 1).padStart(
                  2,
                  "0"
                )}
              </span>



              {/* Glow */}

              <div
                className="
                  absolute
                  -right-12
                  -top-12
                  h-32
                  w-32
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

          ))}

        </div>



        {/* Right Navigation */}

        <button
          onClick={() =>
            setPage(page === totalPages - 1 ? 0 : page + 1)
          }
          className="
            hidden
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/5
            text-white
            transition
            hover:border-[#616CFA]
            hover:bg-[#616CFA]/20
            md:flex
          "
        >
          <ChevronRight size={22} />
        </button>


      </div>

    </section>
  );
}