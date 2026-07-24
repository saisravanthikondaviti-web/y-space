"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { services } from "./data";

export default function Services() {
  const router = useRouter();

  const [page, setPage] = useState(0);

  const cardsPerPage = 4;

  const totalPages = Math.ceil(services.length / cardsPerPage);

  const visibleServices = services.slice(
    page * cardsPerPage,
    page * cardsPerPage + cardsPerPage
  );


  const previousPage = () => {
    setPage(page === 0 ? totalPages - 1 : page - 1);
  };


  const nextPage = () => {
    setPage(page === totalPages - 1 ? 0 : page + 1);
  };


  return (
    <section
      data-scroll-section
      id="services"
      className="
        px-5
        py-16
        sm:px-8
        sm:py-20
        md:px-16
        md:py-24
      "
    >

      {/* Heading */}

      <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">

        <h2
          className="
            text-3xl
            font-bold
            leading-tight
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


        <div
          className="
            mx-auto
            mt-6
            h-px
            w-48
            sm:mt-10
            sm:w-72
            bg-gradient-to-r
            from-transparent
            via-[#616CFA]
            to-transparent
          "
        />

      </div>



      {/* Cards Wrapper */}

      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          gap-3
          sm:gap-5
        "
      >


        {/* Desktop Previous */}

        <button
          onClick={previousPage}
          className="
            hidden
            h-11
            w-11
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
          <ChevronLeft size={20}/>
        </button>



        {/* Cards */}

        <div
          className="
            grid
            flex-1
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {visibleServices.map((service,index)=>(

            <motion.div

              key={service.title}

              onClick={() =>
                router.push(`/services?service=${service.slug}`)
              }


              initial={{
                opacity:0,
                y:25
              }}

              animate={{
                opacity:1,
                y:0
              }}

              transition={{
                duration:.4,
                delay:index*.07
              }}

              whileHover={{
                y:-8
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
                    w-10
                    rounded-full
                    bg-gradient-to-r
                    from-[#616CFA]
                    to-[#E46ECC]
                  "
                />


                <div
                  className="
                    flex
                    h-12
                    w-12
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
                    width={22}
                    height={22}
                  />

                </div>

              </div>



              {/* Content */}

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



              {/* Number */}

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
                {String(page * cardsPerPage + index + 1).padStart(2,"0")}
              </span>



              {/* Glow */}

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

          ))}


        </div>



        {/* Desktop Next */}

        <button
          onClick={nextPage}
          className="
            hidden
            h-11
            w-11
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
          <ChevronRight size={20}/>
        </button>


      </div>



      {/* Mobile Navigation */}

      <div
        className="
          mt-6
          flex
          justify-center
          gap-4
          md:hidden
        "
      >

        <button
          onClick={previousPage}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/5
            text-white
          "
        >
          <ChevronLeft size={18}/>
        </button>


        <button
          onClick={nextPage}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-gradient-to-r
            from-[#616CFA]
            to-[#E46ECC]
            text-white
          "
        >
          <ChevronRight size={18}/>
        </button>

      </div>


    </section>
  );
}