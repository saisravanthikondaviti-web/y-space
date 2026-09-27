"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export let lenis: Lenis | null = null;

export default function SmoothScroll() {
  useEffect(() => {
    // Disable Lenis on mobile, tablets, and touch devices.
    const mediaQuery = window.matchMedia(
      "(min-width: 1280px) and (pointer: fine)"
    );

    if (!mediaQuery.matches) {
      return;
    }

    // Prevent duplicate Lenis instances.
    if (lenis) {
      return;
    }

    const instance = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1,
    });

    lenis = instance;

    let animationFrameId = 0;

    const raf = (time: number) => {
      instance.raf(time);
      animationFrameId = window.requestAnimationFrame(raf);
    };

    animationFrameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(animationFrameId);

      instance.destroy();

      if (lenis === instance) {
        lenis = null;
      }
    };
  }, []);

  return null;
}