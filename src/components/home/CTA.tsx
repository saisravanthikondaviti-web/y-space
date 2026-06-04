import FadeUp from "../ui/FadeUp";

export default function CTA() {
  return (
    <section className="py-40 text-center">

      <FadeUp>
        <h2 className="text-5xl md:text-6xl font-bold">
        Ready To Scale?
      </h2>
      </FadeUp>

      <p className="mt-8 text-zinc-400">
        Let's build something extraordinary.
      </p>

      <button
        className="
          mt-10
          rounded-full
          bg-white
          px-8
          py-4
          text-black
        "
      >
        Schedule Consultation
      </button>

    </section>
  );
}