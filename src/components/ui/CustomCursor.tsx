"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div
      className="
        pointer-events-none
        fixed
        z-[99999]
        h-[18px]
        w-[18px]
        rounded-full
        border
        border-[#616CFA]
        bg-[#616CFA]/20
      "
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        boxShadow: `
          0 0 20px #f867de,
          0 0 40px #fa61e3,
          0 0 80px #ed4dd8,
          0 0 120px rgb(234, 49, 191)
        `,
      }}
    />
  );
}