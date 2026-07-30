import type { Metadata } from "next";
import HubClient from "./HubClient";

export const metadata: Metadata = {
  title: "Hub | VAI SPACE",
  description:
    "Explore the VAI SPACE Hub for resources, tools, ideas, and updates that help ambitious businesses grow smarter and faster.",
};

export default function HubPage() {
  return <HubClient />;
}