"use client";

import Image from "next/image";

export default function Founder() {
  return (
    <section className="py-40 px-8">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

        <div className="relative h-[600px] rounded-3xl overflow-hidden">

          <Image
            src="/founder.jpg"
            alt="Founder"
            fill
            className="object-cover"
          />

        </div>

        <div>

          <h2 className="text-5xl font-bold mb-10">
            Founder-Led.
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed">
            When you work with VAI Space,
            you're not passed through layers
            of teams and departments.
          </p>

          <p className="text-xl text-gray-300 mt-8">
            You work directly with the founder.
          </p>

          <p className="text-xl text-gray-300 mt-8">
            Someone who thinks like a founder,
            designs like a creator,
            and markets like a strategist.
          </p>

        </div>

      </div>
    </section>
  );
}