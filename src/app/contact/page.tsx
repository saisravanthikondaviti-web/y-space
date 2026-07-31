import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact VAI SPACE | Let's Build Your Brand",
  description:
    "Ready to bring your vision to life? Contact VAI SPACE for branding, website development, AI solutions, digital marketing, and creative technology services tailored to your business goals.",
};
export default function ContactPage() {
  return <ContactClient />;
}