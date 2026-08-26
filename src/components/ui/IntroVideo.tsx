"use client";

import { useRef, useState, useEffect } from "react";

interface IntroVideoProps {
  onFinish: () => void;
}

export default function IntroVideo({ onFinish }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [started, setStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleStart = async () => {
    const video = videoRef.current;

    if (!video || started) return;

    try {
      // The user's tap/click allows us to request audible playback.
      video.muted = false;
      video.volume = 1;

      await video.play();

      setStarted(true);
    } catch (error) {
      console.error("Unable to play intro video with sound:", error);

      // Never leave the user trapped on a black screen.
      onFinish();
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        bg-black
        flex
        items-center
        justify-center
        cursor-pointer
      "
      onClick={handleStart}
    >
      {!started && (
        <div
          className="
            absolute
            z-50
            text-white
            text-lg
            pointer-events-none
          "
        >
          Tap anywhere to start
        </div>
      )}

      <video
        ref={videoRef}
        src={
          isMobile
            ? "/videos/mobileintro.mp4"
            : "/videos/web-intro.mp4"
        }
        playsInline
        preload="auto"
        className="
          w-full
          h-full
          object-cover
        "
        onEnded={onFinish}
      />
    </div>
  );
}