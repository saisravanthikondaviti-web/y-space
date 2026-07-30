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
      target="_blank"
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
        width={40}
        height={40}
        style={{
          width: "32px",
          height: "auto",
        }}
        className="object-contain"
      />
    </a>
  );
}