import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact | VAI SPACE",
  description:
    "Get in touch with VAI SPACE to discuss your next branding, marketing, website, or AI project. We'd love to help bring your ideas to life.",
};

export default function ContactPage() {
  return <ContactClient />;
}