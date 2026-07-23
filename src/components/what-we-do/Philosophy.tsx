"use client";

import { motion, type Variants } from "framer-motion";

const philosophy = [
  {
    number: "01",
    color: "#616CFA",
    title: "Understand",
    description:
      "We learn the business, audience, and market before making decisions.",
  },
  {
    number: "02",
    color: "#E46ECC",
    title: "Simplify",
    description:
      "We remove complexity and create clarity through strategy and design.",
  },
  {
    number: "03",
    color: "#616CFA",
    title: "Grow",
    description:
      "Every solution is built to create measurable long-term growth.",
  },
];

const cardContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Philosophy() {
  return (
    <section
      data-scroll-section
      id="philosophy"
      className="
        px-6
        py-16

        sm:px-8
        sm:py-20

        md:px-16
        md:py-24
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div
          className="
            mb-6

            sm:mb-12

            md:mb-16
          "
        >
          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-white/40

              sm:text-xs
              sm:tracking-[0.3em]

              md:text-sm
            "
          >
            What Drives Our Work
          </span>


          <h2
            className="
              mt-3
              max-w-xs
              text-2xl
              font-bold
              leading-tight
              tracking-tight

              sm:max-w-xl
              sm:text-4xl

              md:max-w-5xl
              md:text-5xl
            "
          >
            Every project begins with

            <span
              className="
                ml-2
                bg-gradient-to-r
                from-[#616CFA]
                to-[#E46ECC]
                bg-clip-text
                text-transparent
              "
            >
              understanding,
            </span>

            <span>
              {" "}before execution.
            </span>

          </h2>
        </div>


        {/* Cards */}
        <motion.div
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once:false,
            amount:0.25,
          }}
          className="
            grid
            gap-3

            sm:gap-6

            md:grid-cols-3
          "
        >

          {philosophy.map((item)=>(
            <motion.div

              key={item.title}

              variants={cardAnimation}

              whileHover={{
                y:-8,
                borderColor:"rgba(97,108,250,0.35)",
              }}

              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-3
                backdrop-blur-xl
                transition-all
                duration-300

                sm:rounded-3xl
                sm:p-7

                md:p-8
              "
            >

              <span
                className="
                  text-[11px]
                  font-medium

                  sm:text-sm
                "

                style={{
                  color:item.color
                }}
              >
                {item.number}
              </span>


              <h3
                className="
                  mt-3
                  text-lg
                  font-semibold

                  sm:mt-4
                  sm:text-2xl
                "
              >
                {item.title}
              </h3>


              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-white/60

                  sm:mt-3
                  sm:text-base
                  sm:leading-7
                "
              >
                {item.description}
              </p>


            </motion.div>
          ))}

        </motion.div>

      </div>
    </section>
  );
}