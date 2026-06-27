import FadeUp from "../ui/FadeUp";
import Link from "next/link";


export default function CTA() {
  return (
    <section
      id="cta"
      data-scroll-section
      className="flex h-screen items-center justify-center text-center"
    >
      <div className="mx-auto max-w-3xl px-6">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold">
            Ready To Scale?
          </h2>
        </FadeUp>

        <p className="mx-auto mt-6 max-w-xl text-zinc-400">
          Let's build something extraordinary.
        </p>

        <Link href="/contact">
  <button
    className="
      mt-10
      rounded-full
      bg-gradient-to-r
      from-[#616CFA]
      to-[#E46ECC]
      px-8
      py-4
      font-medium
      text-white
      transition-all
      duration-300
      hover:scale-105
      hover:shadow-[0_0_35px_rgba(97,108,250,0.45)]
    "
  >
    Schedule Consultation
  </button>
</Link>
      </div>
    </section>
  );
}
