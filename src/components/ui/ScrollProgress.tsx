"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="
        fixed
        top-0
        left-0
        right-0
        h-[3px]
        z-[99999]
        origin-left
        bg-gradient-to-r
        from-[#616CFA]
        to-[#E46ECC]
        will-change-transform
      "
      style={{
        scaleX: scrollYProgress,
      }}
    />
  );
}