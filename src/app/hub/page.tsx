import type { Metadata } from "next";
import HubClient from "./HubClient";

export const metadata: Metadata = {
  title: "Something Extraordinary Is Coming | VAI SPACE",
  description:
    "Our next big innovation is on the way. Stay connected with VAI SPACE as we prepare to launch exciting creative technology solutions designed to inspire, innovate, and transform digital experiences.",
};

export default function HubPage() {
  return <HubClient />;
}