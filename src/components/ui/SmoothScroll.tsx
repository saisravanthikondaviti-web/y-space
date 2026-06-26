"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export let lenis: Lenis | null = null;

export default function SmoothScroll() {
  useEffect(() => {
    lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}