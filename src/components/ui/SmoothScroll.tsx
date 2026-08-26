"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export let lenis: Lenis | null = null;

export default function SmoothScroll() {
  useEffect(() => {
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) {
      return;
    }

    lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis?.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);

      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}