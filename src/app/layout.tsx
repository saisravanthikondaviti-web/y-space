import type { Metadata } from "next";
import { Space_Grotesk, Lexend } from "next/font/google";
import "./globals.css";
import GlobalParticles from "@/components/ui/GlobalParticles";
import ChatLauncher from "@/components/chatbot/ChatLauncher";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const bodyFont = Lexend({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "VAI SPACE | Creative Growth Organization",
  description:
    "VAI SPACE helps ambitious brands scale through strategy, branding, digital marketing, performance marketing, creative production and technology.",

  keywords: [
    "Digital Marketing Agency",
    "Branding Agency",
    "Creative Agency",
    "Web Development",
    "Performance Marketing",
    "VAI SPACE",
  ],

  authors: [{ name: "VAI SPACE" }],

  // ✅ FIXED FAVICON (force refresh)
  icons: {
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico?v=2",
    apple: "/favicon.ico?v=2",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-black">
        {children}

        <GlobalParticles />
        <ChatLauncher />
      </body>
    </html>
  );
}