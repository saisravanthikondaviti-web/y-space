"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  {
    value: 8,
    suffix: "+",
    label: "Years of Experience",
  },
  {
    value: 90,
    suffix: "+",
    label: "Projects Delivered",
  },
  {
    value: 3,
    suffix: "+",
    label: "Countries",
  },
  {
    value: 94,
    suffix: "%",
    label: "Client Retention",
  },
];

function Counter({
  value,
  suffix,
  start,
}: {
  value: number;
  suffix: string;
  start: boolean;
}) {
  const [count, setCount] = useState(0);

  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!start) return;

    const controls = animate(motionValue, value, {
      duration: 2,
      ease: "easeOut",

      onUpdate(latest) {
        setCount(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [start, value, motionValue]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section
      id="stats"
      className="
        w-full
        px-6
        pb-24
        md:px-16
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
        "
      >
        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-white/[0.08]
            bg-white/[0.035]
            shadow-[0_8px_40px_rgba(0,0,0,0.2)]
            backdrop-blur-xl
          "
        >
          <motion.div
            className="
              grid
              grid-cols-2
              md:grid-cols-4
            "
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.5,
            }}
            variants={{
              hidden: {},

              show: {
                transition: {
                  staggerChildren: 0.25,
                },
              },
            }}
          >
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                stat={stat}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: {
    value: number;
    suffix: string;
    label: string;
  };

  index: number;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <motion.div
      onViewportEnter={() => setVisible(true)}
      variants={{
        hidden: {
          opacity: 0,
          y: 40,
        },

        show: {
          opacity: 1,
          y: 0,

          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        },
      }}
      className={`
        relative
        flex
        flex-col
        items-center
        justify-center
        py-14

        ${index !== stats.length - 1 ? "md:border-r md:border-white/10" : ""}

        ${index < 2 ? "border-b border-white/10 md:border-b-0" : ""}
      `}
    >
      <h3
        className="
          bg-gradient-to-r
          from-[#616CFA]
          to-[#E46ECC]
          bg-clip-text
          text-5xl
          font-bold
          text-transparent
          md:text-6xl
        "
      >
        <Counter
          value={stat.value}
          suffix={stat.suffix}
          start={visible}
        />
      </h3>

      <p
        className="
          mt-3
          text-center
          text-sm
          text-gray-400
          md:text-base
        "
      >
        {stat.label}
      </p>
    </motion.div>
  );
}