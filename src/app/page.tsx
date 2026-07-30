import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Creative Growth Organization",
  description:
    "VAI SPACE empowers ambitious brands through branding, digital marketing, web development, AI solutions, creative production, and strategic growth.",
};

export default function Home() {
  return <HomeClient />;
}