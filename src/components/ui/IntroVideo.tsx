"use client";

import { useEffect, useRef, useState } from "react";

interface IntroVideoProps {
  onFinish: () => void;
}

export default function IntroVideo({ onFinish }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [started, setStarted] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  /*
  |--------------------------------------------------------------------------
  | SELECT DESKTOP / MOBILE VIDEO
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateVideoSource = () => {
      setVideoSrc(
        mediaQuery.matches
          ? "/videos/mobileintro.mp4"
          : "/videos/web-intro.mp4"
      );
    };

    updateVideoSource();

    mediaQuery.addEventListener("change", updateVideoSource);

    return () => {
      mediaQuery.removeEventListener("change", updateVideoSource);
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | SAFETY FALLBACK
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!videoSrc) return;

    const timer = window.setTimeout(() => {
      onFinish();
    }, 15000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [videoSrc, onFinish]);

  /*
  |--------------------------------------------------------------------------
  | START VIDEO
  |--------------------------------------------------------------------------
  */

  const handleStart = async () => {
    const video = videoRef.current;

    if (!video || started) return;

    try {
      /*
      User interaction allows Safari/browser
      to play video with sound.
      */

      video.muted = false;
      video.volume = 1;

      await video.play();

      setStarted(true);
    } catch {
      /*
      Fallback to muted playback
      */

      try {
        video.muted = true;

        await video.play();

        setStarted(true);
      } catch {
        onFinish();
      }
    }
  };

  /*
  |--------------------------------------------------------------------------
  | VIDEO ERROR
  |--------------------------------------------------------------------------
  */

  const handleVideoError = () => {
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
      {/* START MESSAGE */}

      {!started && (
        <div
          className="
            pointer-events-none
            absolute
            z-10
            text-center
            text-sm
            text-white/80
            sm:text-base
          "
        >
          Tap anywhere to start
        </div>
      )}

      {/* VIDEO */}

      {videoSrc && (
        <video
          key={videoSrc}
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          onEnded={onFinish}
          onError={handleVideoError}
        />
      )}
    </div>
  );
}