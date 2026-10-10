
"use client";

const particles = [
  { left: "8%", top: "18%", delay: "0s", duration: "8s" },
  { left: "18%", top: "72%", delay: "1s", duration: "10s" },
  { left: "27%", top: "35%", delay: "2s", duration: "7s" },
  { left: "36%", top: "82%", delay: "0.5s", duration: "11s" },
  { left: "45%", top: "22%", delay: "3s", duration: "9s" },
  { left: "54%", top: "64%", delay: "1.5s", duration: "10s" },
  { left: "63%", top: "30%", delay: "4s", duration: "8s" },
  { left: "72%", top: "78%", delay: "2.5s", duration: "12s" },
  { left: "81%", top: "16%", delay: "1s", duration: "9s" },
  { left: "91%", top: "55%", delay: "3.5s", duration: "10s" },
  { left: "12%", top: "48%", delay: "2s", duration: "11s" },
  { left: "23%", top: "90%", delay: "4s", duration: "8s" },
  { left: "34%", top: "12%", delay: "1.5s", duration: "10s" },
  { left: "48%", top: "91%", delay: "3s", duration: "9s" },
  { left: "58%", top: "45%", delay: "0.5s", duration: "11s" },
  { left: "68%", top: "10%", delay: "2.5s", duration: "10s" },
  { left: "77%", top: "62%", delay: "4s", duration: "8s" },
  { left: "86%", top: "36%", delay: "1s", duration: "12s" },
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
          className="hero-particle absolute h-[3px] w-[3px] rounded-full bg-white/80"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}

      <style jsx>{`
        .hero-particle {
          animation-name: heroFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }

        @keyframes heroFloat {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0.35;
          }

          25% {
            transform: translate3d(6px, -8px, 0);
            opacity: 0.85;
          }

          50% {
            transform: translate3d(-4px, -14px, 0);
            opacity: 0.55;
          }

          75% {
            transform: translate3d(-7px, -5px, 0);
            opacity: 0.9;
          }

          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.35;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-particle {
            animation: none;
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

