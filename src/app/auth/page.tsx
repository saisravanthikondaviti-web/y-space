"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import { motion } from "framer-motion";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (!isLogin) {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        alert("Account created successfully. Please check your email.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollProgress />
      <SmoothScroll />
      <CustomCursor />

      <main className="min-h-screen bg-black text-white flex">
        {/* LEFT SIDE */}
        <section className="hidden lg:flex flex-1 relative overflow-hidden">
          <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#616CFA]/20 blur-[180px]" />
          <div className="absolute bottom-[-120px] right-[-120px] h-[500px] w-[500px] rounded-full bg-[#E46ECC]/20 blur-[180px]" />

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 flex flex-col justify-center px-24 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.6em] text-white/30">
              VAI SPACE
            </span>

            <h1
              className="mt-10 text-7xl leading-[1.05] font-bold"
              style={{ fontFamily: "Made Tommy" }}
            >
              Designing the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#616CFA] to-[#E46ECC]">
                Future of Creativity
              </span>
            </h1>

            <p className="mt-8 text-lg text-white/50 leading-relaxed">
              A space where ideas evolve into experiences, and creators shape
              the next digital culture.
            </p>

            <div className="mt-12 h-[1px] w-24 bg-white/20" />

            <p className="mt-6 text-sm tracking-[0.3em] uppercase text-white/40">
              Built for thinkers • Designed for creators
            </p>
          </div>

          <div
            className="absolute bottom-[-60px] right-[-20px] text-[18rem] font-black text-white/[0.02]"
            style={{ fontFamily: "Made Tommy" }}
          >
            V
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="relative flex flex-1 items-center justify-center px-8 lg:px-20">
          {/* Glow */}
          <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-[#616CFA]/10 blur-[140px]" />
          <div className="absolute bottom-20 left-10 h-72 w-72 rounded-full bg-[#E46ECC]/10 blur-[140px]" />

          {/* Floating text */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 9, repeat: Infinity }}
            className="absolute top-[14%] right-[10%] text-white/[0.04] text-2xl font-light"
          >
            Innovation
          </motion.div>

          <motion.div
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 11, repeat: Infinity }}
            className="absolute bottom-[16%] left-[6%] text-white/[0.04] text-xl font-light"
          >
            Creativity
          </motion.div>

          {/* FORM WRAPPER */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-md"
          >
            {/* Tabs */}
            <div className="mb-8 flex gap-10 border-b border-white/10">
              <button
                onClick={() => setIsLogin(true)}
                className={`relative pb-3 text-xs tracking-[0.3em] uppercase transition ${
                  isLogin ? "text-white" : "text-white/30"
                }`}
              >
                Login
                {isLogin && (
                  <motion.div
                    layoutId="authTab"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#616CFA] to-[#E46ECC]"
                  />
                )}
              </button>

              <button
                onClick={() => setIsLogin(false)}
                className={`relative pb-3 text-xs tracking-[0.3em] uppercase transition ${
                  !isLogin ? "text-white" : "text-white/30"
                }`}
              >
                Sign Up
                {!isLogin && (
                  <motion.div
                    layoutId="authTab"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#616CFA] to-[#E46ECC]"
                  />
                )}
              </button>
            </div>

            {/* CARD */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl px-8 py-10 shadow-[0_0_120px_rgba(0,0,0,0.6)]">
              {/* Heading */}
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <h2
                  className="text-3xl font-semibold tracking-tight"
                  style={{ fontFamily: "Made Tommy" }}
                >
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h2>

                <p className="mt-2 text-sm text-white/40 leading-relaxed">
                  {isLogin
                    ? "Continue your creative journey inside VAI SPACE."
                    : "Join VAI SPACE and start building your creative identity."}
                </p>
              </motion.div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {!isLogin && (
                  <Input
                    label="Full Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}

                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {!isLogin && (
                  <Input
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                )}

                {error && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="
                    mt-6 w-full
                    rounded-xl
                    bg-gradient-to-r from-[#616CFA] to-[#E46ECC]
                    py-3.5
                    text-xs uppercase tracking-[0.3em]
                    font-medium
                    transition
                    hover:opacity-90
                    active:scale-[0.99]
                    shadow-[0_10px_40px_rgba(97,108,250,0.25)]
                  "
                >
                  {loading
                    ? "Please Wait..."
                    : isLogin
                      ? "Continue"
                      : "Create Account"}
                </button>
              </form>

              {/* FOOTER */}
              <div className="mt-7 text-center text-xs text-white/35">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-white hover:text-[#616CFA] transition"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}

/* INPUT COMPONENT */
function Input({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.3em] text-white/30">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        required
        className="
          mt-2 w-full
          rounded-lg
          bg-white/[0.02]
          border border-white/10
          px-4 py-3
          text-sm text-white
          outline-none
          transition
          focus:border-white/30
          focus:bg-white/[0.04]
          focus:shadow-[0_0_30px_rgba(97,108,250,0.15)]
        "
      />
    </div>
  );
}
