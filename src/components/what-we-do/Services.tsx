"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { services } from "./data";

export default function Services() {
  return (
    <section
      data-scroll-section
      id="services"
      className="px-6 py-24 md:px-16"
    >
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

            {/* Sticky Service Info */}
            <div className="h-fit lg:sticky lg:top-32">

              <h2 className="text-3xl font-bold md:text-4xl">
                {service.title}
              </h2>


              {/* Image */}
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


              <p className="mt-5 leading-relaxed text-white/60">
                {service.description}
              </p>

            </div>



            {/* Moving Cards */}
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">

              <motion.div
                className="flex w-max gap-6"
                animate={{
                  x:["0%","-50%"],
                }}
                transition={{
                  duration:80,
                  repeat:Infinity,
                  ease:"linear",
                }}
              >

                {[...service.items,...service.items].map(
                  (item,index)=>(
                    <motion.div
                      key={`${item}-${index}`}
                      whileHover={{
                        y:-6,
                        scale:1.02,
                      }}
                      transition={{
                        duration:0.25,
                      }}
                      className="
                      h-[240px]
                      w-[300px]
                      flex-shrink-0
                      rounded-3xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      p-7
                      backdrop-blur-xl
                      hover:border-[#616CFA]/40
                      hover:bg-white/[0.05]
                      "
                    >

                      <div className="h-1 w-14 rounded-full bg-gradient-to-r from-[#616CFA] to-[#E46ECC]" />


                      <h3 className="mt-6 text-xl font-semibold">
                        {item}
                      </h3>


                      <p className="mt-4 text-sm leading-7 text-white/60">
                        {service.details[item] ||
                          "Crafted with strategy, creativity, and precision to help businesses build stronger brands and create lasting impact."
                        }
                      </p>


                    </motion.div>
                  )
                )}

              </motion.div>

            </div>

          </div>
        ))}
      </div>

    </section>
  );
}