"use client";

import { useState } from "react";

interface Props {
  href: string;
  normal: string;
  hover: string;
  alt: string;
}

export default function SocialIcon({
  href,
  normal,
  hover,
  alt,
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="transition-all duration-300 hover:scale-110 hover:-translate-y-1"
    >
      <img
        src={hovered ? hover : normal}
        alt={alt}
        className="h-8 w-8 object-contain"
      />
    </a>
  );
}