"use client";

import { useState } from "react";
import Image from "next/image";

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
      className="
        transition-all
        duration-300
        hover:scale-110
        hover:-translate-y-1
      "
    >
      <Image
        src={hovered ? hover : normal}
        alt={alt}
        width={32}
        height={32}
        className="h-8 w-8 object-contain"
      />
    </a>
  );
}