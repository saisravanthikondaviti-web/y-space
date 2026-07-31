import type { Metadata } from "next";
import Script from "next/script";
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
  title: {
    default: "VAI SPACE | Creative Technology Hub",
    template: "%s | VAI SPACE",
  },

  description:
    "VAI SPACE helps ambitious brands scale through strategy, branding, digital marketing, performance marketing, creative production and technology.",

  metadataBase: new URL("https://vaispace.com"),

  keywords: [
    "Digital Marketing Agency",
    "Branding Agency",
    "Creative Agency",
    "Web Development",
    "Performance Marketing",
    "VAI SPACE",
  ],

  authors: [
    {
      name: "VAI SPACE",
    },
  ],

  openGraph: {
    title: "VAI SPACE",
    description:
      "VAI SPACE helps ambitious brands scale through strategy, branding, digital marketing, performance marketing, creative production and technology.",
    url: "https://vaispace.com",
    siteName: "VAI SPACE",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "VAI SPACE",
    description:
      "VAI SPACE helps ambitious brands scale through strategy, branding, digital marketing, performance marketing, creative production and technology.",
  },

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
      <head>
        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-022P31P0VY"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-022P31P0VY');
          `}
        </Script>
      </head>

      <body className="min-h-screen bg-black">
        {children}

        <GlobalParticles />
        <ChatLauncher />
      </body>
    </html>
  );
}