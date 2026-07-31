import type { Metadata } from "next";
import WhatWeDoClient from "./WhatWeDoClient";

export const metadata: Metadata = {
  title: "What We Do | Creative Digital Services | VAI SPACE",
  description:
    "Explore VAI SPACE's creative digital services, including branding, website development, AI-powered solutions, UI/UX design, digital marketing, SEO, and custom technology built for modern businesses.",
};

export default function WhatWeDoPage() {
  return <WhatWeDoClient />;
}