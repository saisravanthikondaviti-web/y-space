"use client";

import Image from "next/image";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:px-8 md:grid-cols-3">

        {/* LEFT */}
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/yspacelogo.png"
              alt="VAI SPACE"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
          </div>

          <p className="mt-5 text-base leading-8 text-zinc-400">
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
          <h4 className="text-sm uppercase tracking-[0.25em] text-white/60">
            Contact Us
          </h4>

          <div className="mt-5 space-y-3 text-base text-zinc-400">
            <p>
              Phone: +91 99597 49993
            </p>

            <p>
              Email: hello@vaispace.in
            </p>

            <p>
              Location: Visakhapatnam, India
            </p>
          </div>
        </div>


        {/* RIGHT */}
        <div>
          <p className="text-base leading-7 text-zinc-500">
            Let&apos;s build something meaningful together.
          </p>

          <div className="mt-6 flex items-center gap-6">
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


      {/* COPYRIGHT */}
      <div className="mt-8 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl justify-center py-3">
          <p className="text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} VAI SPACE. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}