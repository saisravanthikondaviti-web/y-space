import type { Metadata } from "next";
import { Space_Grotesk, Lexend } from "next/font/google";
import "./globals.css";
import Chatbot from "../components/chatbot/Chatbot";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const bodyFont = Lexend({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Y SPACE | Creative Growth Organization",
  description:
    "Y SPACE helps ambitious brands scale through strategy, branding, digital marketing, performance marketing, creative production and technology.",
  keywords: [
    "Digital Marketing Agency",
    "Branding Agency",
    "Creative Agency",
    "Web Development",
    "Performance Marketing",
    "Y SPACE",
  ],
  authors: [{ name: "Y SPACE" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Chatbot />
      </body>
    </html>
  );
}