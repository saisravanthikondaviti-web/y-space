"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

type Service = {
  name: string;
  image: string;
  position: string;
  size: string;
  duration: number;
  delay: number;
};

const services: Service[] = [
  {
    name: "AI Solutions",
    image: "/images/whatwedo/ai.jpg",
    position: "left-[8%] top-[12%]",
    size: "h-14 w-14",
    duration: 7,
    delay: 0,
  },
  {
    name: "Branding",
    image: "/images/whatwedo/branding_.png",
    position: "right-[8%] top-[8%]",
    size: "h-16 w-16",
    duration: 8,
    delay: 1,
  },
  {
    name: "Creative Design",
    image: "/images/whatwedo/create_design.png",
    position: "left-[0%] top-[44%]",
    size: "h-14 w-14",
    duration: 9,
    delay: 0.5,
  },
  {
    name: "Digital Marketing",
    image: "/images/whatwedo/digital_marketing.png",
    position: "right-[0%] top-[42%]",
    size: "h-16 w-16",
    duration: 7.5,
    delay: 1.5,
  },
  {
    name: "Web Development",
    image: "/images/whatwedo/web_development.png",
    position: "left-[13%] bottom-[8%]",
    size: "h-15 w-15",
    duration: 8.5,
    delay: 2,
  },
  {
    name: "Video Production",
    image: "/images/whatwedo/video_production.png",
    position: "right-[13%] bottom-[7%]",
    size: "h-16 w-16",
    duration: 9,
    delay: 1,
  },
  {
    name: "Performance",
    image: "/images/whatwedo/performance_marketing.png",
    position: "left-[39%] top-[0%]",
    size: "h-13 w-13",
    duration: 7,
    delay: 1.2,
  },
];

const sparks = Array.from({ length: 28 }, (_, index) => {
  const angle = (360 / 28) * index;
  const distance = 100 + (index % 4) * 18;

  return {
    id: index,
    angle,
    distance,
    size: index % 3 === 0 ? 3 : 2,
  };
});

export function AdminOrb() {
  const [active, setActive] = useState(false);
  const [burst, setBurst] = useState(false);

  function handleOrbClick() {
    setBurst(false);

    requestAnimationFrame(() => {
      setBurst(true);
    });

    window.setTimeout(() => {
      setBurst(false);
    }, 900);
  }

  return (
    <div
      className="relative flex h-[520px] w-[520px] max-w-[90vw] items-center justify-center"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {/* =========================================================
          AMBIENT BACKGROUND GLOW
      ========================================================== */}

      <motion.div
        className="pointer-events-none absolute h-[360px] w-[360px] rounded-full bg-[#616CFA]/10 blur-[100px]"
        animate={{
          scale: active ? 1.25 : 1,
          opacity: active ? 0.85 : 0.45,
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      <motion.div
        className="pointer-events-none absolute h-[280px] w-[280px] rounded-full bg-[#E46ECC]/10 blur-[100px]"
        animate={{
          scale: active ? 1.3 : 1,
          opacity: active ? 0.7 : 0.3,
        }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />

      {/* =========================================================
          ORBIT RINGS
      ========================================================== */}

      <motion.div
        className="pointer-events-none absolute h-[430px] w-[430px] rounded-full border border-white/[0.035]"
        animate={{
          rotate: 360,
          scale: active ? 1.025 : 1,
        }}
        transition={{
          rotate: {
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 0.6,
          },
        }}
      />

      <motion.div
        className="pointer-events-none absolute h-[370px] w-[370px] rounded-full border border-[#616CFA]/10"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* =========================================================
          SERVICE ORBS
      ========================================================== */}

      {services.map((service) => (
        <motion.div
          key={service.name}
          className={`absolute ${service.position} z-20`}
          animate={{
            y: [0, -7, 0, 6, 0],
            x: [0, 3, 0, -3, 0],
          }}
          transition={{
            duration: service.duration,
            delay: service.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="group relative">
            {/* Service glow */}
            <div className="absolute inset-0 rounded-full bg-[#616CFA]/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

            <motion.div
              whileHover={{
                scale: 1.18,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
              className={`relative ${service.size} overflow-hidden rounded-full border border-white/10 bg-white/[0.045] p-1.5 shadow-[0_0_30px_rgba(97,108,250,0.08)] backdrop-blur-xl transition-all duration-500 group-hover:border-[#616CFA]/60 group-hover:shadow-[0_0_35px_rgba(97,108,250,0.25)]`}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="64px"
                  className="object-cover opacity-75 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#616CFA]/20" />
              </div>
            </motion.div>

            {/* Service label */}
            <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/80 px-3 py-1.5 text-[9px] tracking-[0.12em] text-white/70 opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:translate-y-1 group-hover:opacity-100">
              {service.name}
            </div>
          </div>
        </motion.div>
      ))}

      {/* =========================================================
          MAIN ORB
      ========================================================== */}

      <motion.button
        type="button"
        aria-label="VAI SPACE admin access"
        onClick={handleOrbClick}
        className="group relative z-30 flex h-[230px] w-[230px] items-center justify-center rounded-full outline-none"
        whileHover={{
          scale: 1.035,
        }}
        whileTap={{
          scale: 0.97,
        }}
      >
        {/* Outer glow */}
        <motion.div
          className="pointer-events-none absolute -inset-8 rounded-full bg-[#616CFA]/10 blur-[45px]"
          animate={{
            opacity: active ? 0.9 : 0.45,
            scale: active ? 1.15 : 1,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Outer glass shell */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/15 bg-white/[0.025] backdrop-blur-2xl"
          animate={{
            boxShadow: active
              ? "0 0 60px rgba(97,108,250,0.25), inset 0 0 45px rgba(228,110,204,0.08)"
              : "0 0 35px rgba(97,108,250,0.08), inset 0 0 30px rgba(255,255,255,0.02)",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Inner energy surface */}
        <div className="absolute inset-[9px] overflow-hidden rounded-full bg-[radial-gradient(circle_at_32%_25%,rgba(228,110,204,0.16),transparent_30%),radial-gradient(circle_at_68%_72%,rgba(97,108,250,0.2),transparent_42%),rgba(5,5,8,0.88)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.45)_100%)]" />
        </div>

        {/* Rotating energy ring */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-full"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: active ? 4 : 9,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(97,108,250,0.8) 40deg, transparent 85deg, transparent 180deg, rgba(228,110,204,0.7) 230deg, transparent 280deg)",
            maskImage:
              "radial-gradient(circle, transparent 68%, black 69%, black 72%, transparent 73%)",
            WebkitMaskImage:
              "radial-gradient(circle, transparent 68%, black 69%, black 72%, transparent 73%)",
          }}
        />

        {/* Logo glow */}
        <motion.div
          className="absolute h-28 w-28 rounded-full bg-[#616CFA]/15 blur-3xl"
          animate={{
            scale: active ? 1.35 : 1,
            opacity: active ? 1 : 0.55,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* VAI SPACE text */}
        <motion.div
          className="relative z-10 select-none text-center"
          animate={{
            scale: active ? 1.04 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-[Space_Grotesk] text-[42px] font-semibold leading-none tracking-[0.18em] text-white">
            VAI
          </div>

          <div className="mt-2 font-[Lexend] text-[12px] font-medium tracking-[0.55em] text-white/55">
            SPACE
          </div>
        </motion.div>

        {/* Highlight */}
        <div className="pointer-events-none absolute left-[22%] top-[15%] h-[28%] w-[22%] rotate-[-35deg] rounded-full bg-white/10 blur-md" />

        {/* =====================================================
            CLICK SPARKS
        ====================================================== */}

        {burst &&
          sparks.map((spark) => {
            const radians = (spark.angle * Math.PI) / 180;
            const x = Math.cos(radians) * spark.distance;
            const y = Math.sin(radians) * spark.distance;

            return (
              <motion.span
                key={spark.id}
                className="pointer-events-none absolute left-1/2 top-1/2 z-50 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                style={{
                  width: spark.size,
                  height: spark.size,
                }}
                initial={{
                  x: "-50%",
                  y: "-50%",
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  x,
                  y,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 0.7 + (spark.id % 4) * 0.06,
                  ease: "easeOut",
                }}
              />
            );
          })}

        {/* Click ripple */}
        {burst && (
          <motion.span
            className="pointer-events-none absolute inset-0 z-40 rounded-full border border-white/60"
            initial={{
              scale: 0.85,
              opacity: 0.9,
            }}
            animate={{
              scale: 1.5,
              opacity: 0,
            }}
            transition={{
              duration: 0.75,
              ease: "easeOut",
            }}
          />
        )}
      </motion.button>

      {/* =========================================================
          SMALL AMBIENT PARTICLES
      ========================================================== */}

      <motion.span
        className="absolute left-[25%] top-[25%] h-1 w-1 rounded-full bg-white/40"
        animate={{
          opacity: [0.2, 0.8, 0.2],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />

      <motion.span
        className="absolute bottom-[25%] right-[26%] h-1 w-1 rounded-full bg-[#E46ECC]/60"
        animate={{
          opacity: [0.2, 0.8, 0.2],
          scale: [1, 1.6, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1,
        }}
      />

      <motion.span
        className="absolute right-[25%] top-[30%] h-1 w-1 rounded-full bg-[#616CFA]/70"
        animate={{
          opacity: [0.2, 0.9, 0.2],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: 0.5,
        }}
      />
    </div>
  );
}