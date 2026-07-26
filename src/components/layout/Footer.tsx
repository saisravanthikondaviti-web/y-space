"use client";

import SocialIcon from "./SocialIcon";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* ================= LEFT ================= */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/images/yspacelogo.png"
              alt="VAI SPACE"
              className="h-9 w-9 object-contain"
            />
          </div>

          <p className="mt-5 text-zinc-400 leading-8 text-base">
            Where Strategy Meets Storytelling.
            <br />
            We don't help brands make noise.
            <br />
            We help them stand out.
            <br />
            <span className="text-white font-medium">
              Build Your Space. Own Your Market.
            </span>
          </p>
        </div>


        {/* ================= CENTER ================= */}
        <div>
          <h4 className="uppercase tracking-[0.25em] text-white/60 text-sm">
            Contact Us
          </h4>

          <div className="mt-5 space-y-3 text-zinc-400 text-base">
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


        {/* ================= RIGHT ================= */}
        <div>
          <p className="text-zinc-500 text-base leading-7">
            Let's build something meaningful together.
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
              href="https://www.linkedin.com/company/vaispace/ "
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


      {/* ================= COPYRIGHT ================= */}
      <div className="mt-8 border-t border-white/10">
        <div className="mx-auto max-w-7xl py-3 flex justify-center">
          <p className="text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} VAI SPACE. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}