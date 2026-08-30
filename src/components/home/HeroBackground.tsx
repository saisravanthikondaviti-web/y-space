"use client";

const particles = [
  { left: "8%", top: "18%", delay: "0s", duration: "5s" },
  { left: "18%", top: "72%", delay: "1s", duration: "6s" },
  { left: "27%", top: "35%", delay: "2s", duration: "4s" },
  { left: "36%", top: "82%", delay: "0.5s", duration: "7s" },
  { left: "45%", top: "22%", delay: "3s", duration: "5s" },
  { left: "54%", top: "64%", delay: "1.5s", duration: "6s" },
  { left: "63%", top: "30%", delay: "4s", duration: "5s" },
  { left: "72%", top: "78%", delay: "2.5s", duration: "7s" },
  { left: "81%", top: "16%", delay: "1s", duration: "5s" },
  { left: "91%", top: "55%", delay: "3.5s", duration: "6s" },
  { left: "12%", top: "48%", delay: "2s", duration: "7s" },
  { left: "23%", top: "90%", delay: "4s", duration: "5s" },
  { left: "34%", top: "12%", delay: "1.5s", duration: "6s" },
  { left: "48%", top: "91%", delay: "3s", duration: "5s" },
  { left: "58%", top: "45%", delay: "0.5s", duration: "7s" },
  { left: "68%", top: "10%", delay: "2.5s", duration: "6s" },
  { left: "77%", top: "62%", delay: "4s", duration: "5s" },
  { left: "86%", top: "36%", delay: "1s", duration: "7s" },
];

export default function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((particle, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white motion-safe:animate-pulse"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
}