"use client";

import { useRef, useState } from "react";

interface IntroVideoProps {
  onFinish: () => void;
}

export default function IntroVideo({ onFinish }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    if (videoRef.current) {
      videoRef.current.muted = false; // 🔊 enable sound
      videoRef.current.play();        // ▶ start video
      setStarted(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center cursor-pointer"
      onClick={handleStart} // 👈 tap anywhere
    >
      {/* Tap instruction (optional) */}
      {!started && (
        <div className="absolute z-50 text-white text-lg">
          Tap anywhere to start
        </div>
      )}

      <video
        ref={videoRef}
        src="/videos/IntroVideo.mp4"
        playsInline
        muted
        className="w-full h-full object-cover"
        onEnded={onFinish}
      />
    </div>
  );
}