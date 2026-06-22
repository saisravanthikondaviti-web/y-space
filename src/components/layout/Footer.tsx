export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16">

      <div className="mx-auto max-w-7xl px-8 grid gap-12 md:grid-cols-3">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3">
            {/* Replace src with your actual logo path */}
            <img
              src="/images/yspacelogo.png"
              alt="VAI SPACE Logo"
              className="h-8 w-8 object-contain"
            />
            <h3 className="font-bold text-lg tracking-wide">VAI SPACE</h3>
          </div>

          <p className="mt-4 text-zinc-400 leading-relaxed">
            Where Strategy Meets Storytelling.<br />
            We don't help brands make noise.<br />
            We help them stand out.<br />
            <span className="text-white/70 font-medium">
              Build Your Space. Own Your Market.
            </span>
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-sm uppercase tracking-widest text-white/60">
            Contact Us
          </h4>

          <div className="mt-4 space-y-2 text-zinc-400">
            <p>Phone: +91 9951737226</p>
            <p>Email: hello@vaispace.in</p>
            <p>Location: Visakhapatnam, India</p>
            <p>Instagram: @vaispace</p>
          </div>
        </div>

        {/* EMPTY / FUTURE USE */}
        <div className="text-zinc-500">
          <p className="text-sm">
            Let’s build something meaningful together.
          </p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="mt-12 border-t border-white/10 pt-6">
        <div className="mx-auto max-w-7xl px-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} VAI SPACE. All rights reserved.</p>
          
        </div>
      </div>

    </footer>
  );
}