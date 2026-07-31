"use client";

import Image from "next/image";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 lg:px-8 md:grid-cols-3">
        {/* LEFT */}
        <div>
          <Image
            src="/images/yspacelogo.png"
            alt="VAI SPACE"
            width={50}
            height={16}
            className="h-3.5 w-auto object-contain"
          />

          <p className="mt-3 text-sm leading-7 text-zinc-400">
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
              href="https://www.linkedin.com/company/vaispace/"
              normal="/images/footer/linkedin.png"
              hover="/images/footer/flinkedin.png"
              alt="LinkedIn"
            />

            <SocialIcon
              href="https://www.youtube.com/@vaispaceofficial"
              normal="/images/footer/youtube.png"
              hover="/images/footer/fyoutube.png"
              alt="YouTube"
            />
          </div>
        </div>
      </div>

      <div className="bg-red-600 text-white p-2 text-center font-bold">
  HOSTINGER TEST 12345
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
