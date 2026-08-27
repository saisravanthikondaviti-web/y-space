"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import FadeUp from "../ui/FadeUp";

export default function About() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const element = videoContainerRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return;

    const video = videoRef.current;

    video.load();

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay may be blocked by the browser.
      }
    };

    playVideo();
  }, [shouldLoadVideo]);

  return (
    <section
      id="about"
      data-scroll-section
      className="relative flex min-h-screen items-center py-20 sm:py-24 lg:py-28"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-[#616CFA]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#E46ECC]/10 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 max-w-4xl lg:mb-14">
          <FadeUp>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
              About VAISPACE
            </p>
          </FadeUp>

          <FadeUp>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl xl:text-5xl">
              Building Modern Brands Through
              <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
                {" "}
                Strategy, Creativity &amp; Technology
              </span>
            </h2>
          </FadeUp>
        </div>

        {/* Main Section */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Image / Video */}
          <FadeUp>
            <div
              ref={videoContainerRef}
              className="relative h-[240px] overflow-hidden rounded-3xl border border-white/10 bg-black sm:h-[300px] md:h-[360px] lg:h-[420px]"
            >
              {/* Poster / fallback */}
              <Image
  src="/images/about-robo-poster.webp"
  alt="VAI SPACE digital innovation"
  fill
  sizes="(max-width: 1024px) 100vw, 50vw"
  className={`object-cover transition-opacity duration-700 ${
    videoReady ? "opacity-0" : "opacity-100"
  }`}
/>

              {/* Video */}
              {shouldLoadVideo && (
                <video
                  ref={videoRef}
                  src="/videos/about-robo.mp4"
                  muted
                  loop
                  playsInline
                  preload="none"
                  onCanPlay={() => setVideoReady(true)}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                    videoReady
                      ? "opacity-100 hover:scale-105"
                      : "opacity-0"
                  }`}
                />
              )}

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Text */}
              <div className="absolute bottom-6 left-6">
                <p className="mb-2 text-sm uppercase tracking-[0.3em] text-zinc-500">
                  Our Vision
                </p>

                <h3 className="max-w-xs text-lg text-white sm:text-xl lg:text-xl">
                  Creating Digital Experiences That Inspire Growth.
                </h3>
              </div>
            </div>
          </FadeUp>

          {/* Content */}
          <div>
            <FadeUp>
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">
                Who We Are
              </p>

              <h3 className="mb-4 text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                A Creative Partner For Ambitious Brands
              </h3>

              <p className="mb-6 text-sm leading-7 text-zinc-400 sm:text-base">
                As we continue to evolve, VAI SPACE is expanding beyond creative
                services into broader technology solutions, building a
                future-ready ecosystem where businesses can scale, innovate, and
                compete with confidence in a rapidly changing digital world.
              </p>
            </FadeUp>

            <div className="my-4 h-px bg-white/10" />

            <FadeUp>
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">
                Our Mission
              </p>

              <p className="text-sm leading-7 text-zinc-400 sm:text-base">
                We combine creativity, innovation, and execution to deliver
                digital solutions that create measurable business impact.
              </p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}