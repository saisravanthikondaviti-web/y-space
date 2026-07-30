import type { Metadata } from "next";
import WhatWeDoClient from "./WhatWeDoClient";

export const metadata: Metadata = {
  title: "What We Do | VAI SPACE",
  description:
    "Discover how VAI SPACE combines strategy, creativity, technology, and marketing to build unforgettable brands and scalable digital experiences.",
};

export default function WhatWeDoPage() {
  return <WhatWeDoClient />;
}