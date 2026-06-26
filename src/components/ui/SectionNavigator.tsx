"use client";

import { useEffect, useRef } from "react";
import { lenis } from "./SmoothScroll";

export default function SectionNavigator() {
  const currentSection = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    console.log("✅ SectionNavigator Mounted");

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-section]")
    );

    console.log("Sections Found:", sections.length);

    sections.forEach((section, index) => {
      console.log(index, section.id);
    });

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentSection.current = sections.indexOf(
              entry.target as HTMLElement
            );
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sections.forEach((section) => observer.observe(section));

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
        duration: 1.2,
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 1300);
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return null;
}