"use client";

import { motion } from "framer-motion";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function ContactPage() {
  return (
    <main className="bg-black text-white min-h-screen">
        <ScrollProgress />
        <SmoothScroll />
        <CustomCursor />
        <Navbar />
      
      

      {/* CONTACT SECTION */}
      <section className="px-6 md:px-16 pt-32 pb-24">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT SIDE */}
<div>
  <p className="text-xs tracking-[0.3em] text-white/40 uppercase">
    Contact
  </p>

  <h2 className="mt-4 text-3xl md:text-4xl font-semibold leading-snug">
    Let’s Build Something{" "}
    <span className="text-white/60">Meaningful</span>
  </h2>

  <p className="mt-6 text-white/50 leading-relaxed max-w-md">
    Whether you're launching a new business, repositioning an existing brand,
    or looking to strengthen your digital presence, we'd love to hear your story.
  </p>

  <p className="mt-5 text-white/60 font-medium">
    Every successful brand starts with clarity. Let’s build yours.
  </p>

  {/* CONTACT INFO BLOCK */}
  <div className="mt-10 space-y-4 text-sm text-white/50">

    <div>
      <p className="text-white/40 uppercase text-xs tracking-widest">
        Reach Us Through
      </p>
    </div>

    <p>📧 Email: hello@vaispace.in</p>
    <p>📍 Location: Visakhapatnam, India</p>

  </div>

  <div className="mt-10 h-[2px] w-20 bg-gradient-to-r from-[#616CFA] to-[#E46ECC]" />
</div>

          {/* RIGHT SIDE - FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8"
          >

            <div className="grid gap-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30"
              />

              <input
                type="text"
                placeholder="Project Type (Branding, Website, Marketing...)"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30"
              />

              <textarea
                rows={5}
                placeholder="Tell us about your project..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 resize-none"
              />

              <button className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#616CFA] to-[#E46ECC] text-white font-medium hover:opacity-90 transition">
                Send Message
              </button>

            </div>

            <p className="mt-6 text-xs text-white/40 text-center">
              We usually respond within 24–48 hours
            </p>

          </motion.div>

        </div>
      </section>
        <Footer />
    </main>
  );
}