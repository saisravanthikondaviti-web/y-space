"use client";

import { useEffect, useRef, useState } from "react";

interface IntroVideoProps {
  onFinish: () => void;
}

export default function IntroVideo({ onFinish }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      onFinish();
    }, 15000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [onFinish]);

  const handleStart = async () => {
    const video = videoRef.current;

    if (!video || started) return;

    try {
      video.muted = false;
      video.volume = 1;

      await video.play();

      setStarted(true);
    } catch (error) {
      console.error("Unable to play intro video:", error);
      onFinish();
    }
  };

  const handleVideoError = () => {
    console.error("Intro video failed to load.");
    onFinish();
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        cursor-pointer
        items-center
        justify-center
        bg-black
      "
      onClick={handleStart}
    >
      {!started && (
        <div
          className="
            pointer-events-none
            absolute
            z-50
            text-lg
            text-white
          "
        >
          Tap anywhere to start
        </div>
      )}

      <video
        ref={videoRef}
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
        onEnded={onFinish}
        onError={handleVideoError}
      >
        <source
          src="/videos/mobileintro.mp4"
          media="(max-width: 767px)"
          type="video/mp4"
        />

        <source
          src="/videos/web-intro.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}