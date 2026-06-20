"use client";

const lines = [
  "Branding is not about looking good.",
  "Marketing is not about doing more.",
  "Growth is not about doing everything.",
  "Success comes from doing the right things."
];

export default function Philosophy() {
  return (
    <section className="py-56 px-8 text-center">

      <div className="max-w-5xl mx-auto">

        {lines.map((line) => (
          <h2
            key={line}
            className="text-5xl md:text-7xl font-bold mb-20"
          >
            {line}
          </h2>
        ))}

      </div>

    </section>
  );
}