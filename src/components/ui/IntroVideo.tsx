"use client";

import { useEffect, useRef, useState } from "react";

interface IntroVideoProps {
  onFinish: () => void;
}

export default function IntroVideo({ onFinish }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [started, setStarted] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    setVideoSrc(
      mediaQuery.matches
        ? "/videos/mobileintro.mp4"
        : "/videos/web-intro.mp4"
    );

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

      // Fallback to muted playback
      try {
        video.muted = true;

        await video.play();

        setStarted(true);
      } catch (fallbackError) {
        console.error(
          "Muted intro video playback also failed:",
          fallbackError
        );

        onFinish();
      }
    }
  };

  const handleVideoError = (
    event: React.SyntheticEvent<HTMLVideoElement>
  ) => {
    const video = event.currentTarget;

    console.error("Intro video failed to load", {
      src: video.currentSrc,
      networkState: video.networkState,
      readyState: video.readyState,
      errorCode: video.error?.code ?? null,
    });

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
        <div className="pointer-events-none absolute z-50 text-lg text-white">
          Tap anywhere to start
        </div>
      )}

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