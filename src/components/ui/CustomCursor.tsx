"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 1280px) and (pointer: fine)"
    );

    const updateDevice = () => {
      setIsDesktop(mediaQuery.matches);
    };

    updateDevice();

    mediaQuery.addEventListener("change", updateDevice);

    return () => {
      mediaQuery.removeEventListener("change", updateDevice);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let animationFrameId = 0;
    let mouseX = -100;
    let mouseY = -100;

    const move = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (animationFrameId) return;

      animationFrameId = window.requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform =
            `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        }

        animationFrameId = 0;
      });
    };

    window.addEventListener("mousemove", move, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-[99999]
        h-[18px]
        w-[18px]
        rounded-full
        border
        border-[#616CFA]
        bg-[#616CFA]/20
        will-change-transform
      "
      style={{
        transform: "translate3d(-100px, -100px, 0)",
        boxShadow: `
          0 0 20px #f867de,
          0 0 40px #fa61e3,
          0 0 80px #ed4dd8
        `,
      }}
    />
  );
}