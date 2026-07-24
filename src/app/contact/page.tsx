"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !projectType || !message) {
      alert("Please fill in all the fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          projectType,
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send.");
      }

      // ==========================
      // WhatsApp Redirect
      // Replace with your number
      // Example: 919876543210
      // ==========================
      const whatsappNumber = "919959749993";

      const whatsappMessage = `Hello VAISPACE,

I'd like to discuss a project.

Name: ${name}
Email: ${email}
Project Type: ${projectType}

Project Details:
${message}`;

      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          whatsappMessage,
        )}`,
        "_blank",
      );

      alert("Message sent successfully!");

      setName("");
      setEmail("");
      setProjectType("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              <span
                className="
    bg-gradient-to-r
    from-[#616CFA]
    to-[#E46ECC]
    bg-clip-text
    text-transparent
  "
              >
                Meaningful
              </span>
            </h2>

            <p className="mt-6 text-white/50 leading-relaxed max-w-md">
              Whether you're launching a new business, repositioning an existing
              brand, or looking to strengthen your digital presence, we'd love
              to hear your story.
            </p>

            <p className="mt-5 text-white/60 font-medium">
              Every successful brand starts with clarity. Let’s build yours.
            </p>

            <div className="mt-10">
              <p className="text-white/40 uppercase text-xs tracking-widest">
                Reach Us Through
              </p>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#616CFA] transition"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#616CFA] transition"
              />

              <input
                type="text"
                placeholder="Project Type (Branding, Website, Marketing...)"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#616CFA] transition"
              />

              <textarea
                rows={5}
                placeholder="Tell us about your project..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#616CFA] resize-none transition"
              />

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#616CFA] to-[#E46ECC] text-white font-medium transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>

            <p className="mt-6 text-xs text-white/40 text-center">
              We usually respond within 24–48 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
