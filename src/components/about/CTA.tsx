export default function CTA() {
  return (
    <section id="cta" className="relative py-40 px-6 overflow-hidden">

      {/* background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-[#616CFA]/10 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT TEXT BLOCK */}
          <div>

            <p className="text-xs uppercase tracking-[0.3em] text-[#8E96FF]">
              Work With Us
            </p>

            <h2 className="mt-6 text-5xl md:text-7xl font-bold text-white leading-tight">
              Build Something
              <br />
              That Actually{" "}
              <span className="bg-gradient-to-r from-[#616CFA] to-[#E46ECC] bg-clip-text text-transparent">
                Matters
              </span>
            </h2>

            <p className="mt-8 text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
              We don’t just design websites. We shape direction, clarity, and identity for brands that want to grow with intention.
            </p>

          </div>

          {/* RIGHT ACTION BLOCK */}
          <div className="flex flex-col lg:items-end space-y-6">

            {/* IMAGE */}
            <div className="relative w-full h-[320px] rounded-3xl overflow-hidden border border-white/10 group">
              <img
                src="/images/cta.jpg"
                alt="Creative work preview"
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-700"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* optional label */}
              <div className="absolute bottom-4 left-4 text-white text-sm tracking-wide">
                Let us build something that matters for your brand.
              </div>
            </div>

            {/* CTA TEXT */}
            <p className="text-gray-400 text-lg text-right">
              No templates. No noise. Just focused execution.
            </p>

            {/* BUTTON */}
            <button className="px-12 py-5 rounded-full bg-gradient-to-r from-[#616CFA] to-[#E46ECC] text-white font-medium text-lg hover:scale-105 transition-transform duration-300 shadow-lg">
              Start a Project →
            </button>

            <p className="text-sm text-gray-500 text-right">
              Response within 24–48 hours
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}