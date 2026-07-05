import SocialIcon from "./SocialIcon";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-14">
      <div className="mx-auto max-w-7xl px-8 grid grid-cols-1 md:grid-cols-3 gap-14">
        {/* ================= LEFT ================= */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/images/yspacelogo.png"
              alt="VAI SPACE"
              className="h-8 w-8 object-contain"
            />

            <h3 className="text-2xl font-bold tracking-wide text-white">
              VAI SPACE
            </h3>
          </div>

          <p className="mt-6 text-zinc-400 leading-9 text-lg">
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

          <div className="mt-6 space-y-4 text-zinc-400 text-lg">
            <p>Phone: +91 9951737226</p>

            <p>Email: hello@vaispace.in</p>

            <p>Location: Visakhapatnam, India</p>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div>
          <p className="text-zinc-500 text-lg leading-relaxed">
            Let's build something meaningful together.
          </p>

          <div className="mt-8 flex items-center gap-7">
            <SocialIcon
              href="https://instagram.com"
              normal="/images/footer/instagram.png"
              hover="/images/footer/finsta.png"
              alt="Instagram"
            />

            <SocialIcon
              href="https://linkedin.com"
              normal="/images/footer/linkedin.png"
              hover="/images/footer/flinkedin.png"
              alt="LinkedIn"
            />

            <SocialIcon
              href="https://facebook.com"
              normal="/images/footer/facebook.png"
              hover="/images/footer/ffacebook.png"
              alt="Facebook"
            />

            <SocialIcon
              href="https://youtube.com"
              normal="/images/footer/youtube.png"
              hover="/images/footer/fyoutube.png"
              alt="YouTube"
            />
          </div>
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="mt-4 border-t border-white/10">
        <div className="mx-auto max-w-7xl py-2 flex justify-center">
          <p className="text-center text-xs sm:text-sm text-zinc-500">
            © {new Date().getFullYear()} VAI SPACE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
