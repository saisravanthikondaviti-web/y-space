"use client";

import { useRef, useState, useEffect } from "react";

interface IntroVideoProps {
  onFinish: () => void;
}

export default function IntroVideo({ onFinish }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 📱 Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleStart = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setStarted(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center cursor-pointer"
      onClick={handleStart}
    >
      {/* Tap text */}
      {!started && (
        <div className="absolute z-50 text-white text-lg">
          Tap anywhere to start
        </div>
      )}

      <video
        ref={videoRef}
        src={
          isMobile
            ? "/videos/introvideomob.mp4"   // 📱 mobile video
            : "/videos/IntroVideo.mp4"          // 💻 desktop video
        }
        playsInline
        muted
        className="w-full h-full object-cover"
        onEnded={onFinish}
      />
    </div>
  );
}