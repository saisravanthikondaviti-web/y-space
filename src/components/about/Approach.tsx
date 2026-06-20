"use client";

import { motion } from "framer-motion";

const steps = [
  "STRATEGY",
  "STORY",
  "DESIGN",
  "GROWTH"
];

export default function Approach() {
  return (
    <section className="py-40 px-8">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

        <div className="flex flex-col gap-6">

          {steps.map((step,index) => (
            <motion.div
              key={step}
              initial={{ opacity:0,x:-50 }}
              whileInView={{ opacity:1,x:0 }}
              transition={{ delay:index*.2 }}
              className="text-5xl font-bold"
            >
              {step}
            </motion.div>
          ))}

        </div>

        <div>

          <h2 className="text-5xl font-bold mb-10">
            Every Brand Has A Story.
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed">
            Most businesses don't struggle because
            they lack potential.
            They struggle because the market doesn't
            see their value.
            That's why every project begins with
            understanding before execution.
          </p>

        </div>

      </div>
    </section>
  );
}