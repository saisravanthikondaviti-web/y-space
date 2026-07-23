"use client";

interface IndustryCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export default function IndustryCard({
  icon,
  title,
  description,
  color,
}: IndustryCardProps) {
  return (
    <div
      className="
        group
        relative
        h-[260px]
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-gradient-to-b
        from-white/[0.05]
        to-white/[0.02]
        backdrop-blur-xl
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-white/20
      "
    >
      {/* Glow */}
      <div
        className="absolute -top-14 -right-14 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `${color}30`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-5">
        {/* Icon */}
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            border
            text-xl
            transition-all
            duration-500
            group-hover:scale-105
          "
          style={{
            borderColor: `${color}70`,
            backgroundColor: `${color}18`,
          }}
        >
          {icon}
        </div>

        {/* Title */}
        <h3 className="mt-4 text-xl font-semibold leading-tight text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-[13px] leading-[1.35rem] text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
}
