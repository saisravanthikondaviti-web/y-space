import Link from "next/link";

export default function CTA() {
  return (
    <section id="cta" data-scroll-section className="relative px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden border border-white/5 bg-[#090912]">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(97,108,250,0.15),transparent_60%)]" />

          {/* LEFT CONTENT */}
          <div className="relative z-20 px-8 pt-10 pb-16 md:px-14 lg:pt-12 lg:pb-20">
            <div className="max-w-[620px]">
              <p className="text-xs uppercase tracking-[0.35em] text-[#7B86FF]">
                WORK WITH US
              </p>

              <h2 className="mt-8 text-6xl font-bold leading-[0.95] text-white md:text-6xl">
                Build{" "}
                <span className="bg-gradient-to-r from-[#7C7CFF] to-[#EA70D8] bg-clip-text text-transparent">
                  Something
                </span>
                <br />
                That Actually
                <br />
                <span className="bg-gradient-to-r from-[#7C7CFF] to-[#EA70D8] bg-clip-text text-transparent">
                  Matters
                </span>
              </h2>

              <p className="mt-10 max-w-md text-xl leading-relaxed text-white/85">
                We don't just design.
                <br />
                We shape direction, clarity and identity
                <br />
                for brands that want to grow with intention.
              </p>

              {/* CTA BOX */}
              {/* CTA BOX */}
              <div className="relative z-20 mt-14 flex w-full max-w-md flex-col items-center bg-black/35 p-8 backdrop-blur-md">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#616CFA] to-[#E46ECC] px-10 py-4 text-xl font-medium text-white transition-all duration-300 hover:scale-105"
                >
                  Start a Project
                </Link>

                <p className="mt-5 text-center text-sm text-gray-400">
                  Response within 24 – 48 hours
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT ILLUSTRATION */}
          <img
            src="/images/aboutcta.png"
            alt="Creative Illustration"
            className="
              pointer-events-none
              absolute
              right-0
              bottom-16
              z-10
              h-[200px]
              md:h-[440px]
              lg:h-[560px]
              xl:h-[620px]
              w-[1000px]
              object-contain
            "
          />
        </div>
      </div>
    </section>
  );
}
