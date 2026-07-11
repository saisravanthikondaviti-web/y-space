"use client";

import { useEffect, useRef } from "react";
import { lenis } from "./SmoothScroll";

export default function SectionNavigator() {
  const currentSection = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-section]")
    );

    if (!sections.length) return;

    const updateCurrentSection = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;

      let current = 0;

      sections.forEach((section, index) => {
        if (scrollY >= section.offsetTop) {
          current = index;
        }
      });

      currentSection.current = current;
    };

    updateCurrentSection();

    window.addEventListener("scroll", updateCurrentSection);

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;

      if (Math.abs(e.deltaY) < 30) return;

      e.preventDefault();

      let target = currentSection.current;

      if (e.deltaY > 0) {
        target++;
      } else {
        target--;
      }

      target = Math.max(0, Math.min(target, sections.length - 1));

      if (target === currentSection.current) return;

      isScrolling.current = true;

      lenis?.scrollTo(sections[target], {
        duration: 1.1,
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 1200);
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("scroll", updateCurrentSection);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return null;
}