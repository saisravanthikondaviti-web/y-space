"use client";

import { useEffect, useRef } from "react";
import { lenis } from "./SmoothScroll";

export default function SectionNavigator() {
  const currentSection = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    // Track current section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentSection.current = Array.from(sections).indexOf(entry.target);
          }
        });
      },
      {
        threshold: 0.6,
      },
    );

    sections.forEach((section) => observer.observe(section));

    // Mouse wheel
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;

      e.preventDefault();

      if (Math.abs(e.deltaY) < 30) return;

      if (e.deltaY > 0) {
        const next = currentSection.current + 1;

        if (next < sections.length) {
          isScrolling.current = true;

          lenis?.scrollTo(sections[next]);

          setTimeout(() => {
            isScrolling.current = false;
          }, 1200);
        }
      } else {
        const prev = currentSection.current - 1;

        if (prev >= 0) {
          isScrolling.current = true;

          lenis?.scrollTo(sections[prev]);

          setTimeout(() => {
            isScrolling.current = false;
          }, 1200);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
