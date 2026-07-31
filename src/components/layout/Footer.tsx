"use client";

import { useState } from "react";
import Image from "next/image";
import SocialIcon from "./SocialIcon";
import Link from "next/link";

export default function Footer() {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <footer className="border-t border-white/10 py-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-3 lg:px-8">
        {/* LEFT */}
        <div>
          {/* Logo */}
          <div className="relative h-10 w-10">
            <Image
              src="/images/yspacelogo.png"
              alt="VAI SPACE"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>

          <p className="mt-4 text-sm leading-7 text-zinc-400">
            Where Strategy Meets Storytelling.
            <br />
            We don&apos;t help brands make noise.
            <br />
            We help them stand out.
            <br />
            <span className="font-medium text-white">
              Build Your Space. Own Your Market.
            </span>
          </p>
        </div>

        {/* CENTER */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.22em] text-white/60">
            Contact Us
          </h4>

          <div className="mt-3 space-y-2 text-sm text-zinc-400">
            <p>Phone: +91 99597 49993</p>
            <p>Email: hello@vaispace.com</p>
            <p>Location: Visakhapatnam, India</p>

            <div className="pt-3 space-y-2">
              <Link
                href="/pdfs/terms-and-conditions.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-white"
              >
                Terms & Conditions
              </Link>

            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div>
          <p className="text-sm leading-6 text-zinc-500">
            Let&apos;s build something meaningful together.
          </p>

          <div className="mt-4 flex items-center gap-5">
            <SocialIcon
              href="https://www.instagram.com/vaispaceofficial/"
              normal="/images/footer/instagram.png"
              hover="/images/footer/finsta.png"
              alt="Instagram"
            />

            <SocialIcon
              href="https://www.facebook.com/profile.php?id=61592134574057"
              normal="/images/footer/facebook.png"
              hover="/images/footer/ffacebook.png"
              alt="Facebook"
            />

            <SocialIcon
              href="https://x.com/vaispacehq"
              normal="/images/footer/twitter.png"
              hover="/images/footer/twitter-color.png"
              alt="LinkedIn"
            />

            <SocialIcon
              href="https://www.youtube.com/@vaispaceofficial"
              normal="/images/footer/youtube.png"
              hover="/images/footer/fyoutube.png"
              alt="YouTube"
            />

            <SocialIcon
              href="https://www.linkedin.com/company/vaispace/"
              normal="/images/footer/linkedin.png"
              hover="/images/footer/flinkedin.png"
              alt="LinkedIn"
            />
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-5 border-t border-white/10">
        <div className="mx-auto max-w-7xl py-3">
          <p className="text-center text-xs text-zinc-500">
            © {new Date().getFullYear()} VAI SPACE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
