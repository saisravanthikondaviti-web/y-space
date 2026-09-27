"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AdminOrb } from "./AdminOrb";

type AdminAuthProps = {
  mode: "login" | "signup";
};

export function AdminAuth({ mode }: AdminAuthProps) {
  const isLogin = mode === "login";

  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    // Authentication will be connected after the UI is complete.
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT — VAI SPACE */}
        <section className="relative hidden overflow-hidden lg:flex">
          {/* Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(97,108,250,0.08),transparent_45%)]" />

          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:70px_70px]" />

          <div className="relative z-10 flex w-full items-center justify-center">
            <AdminOrb />
          </div>

          <div className="absolute bottom-10 left-10 text-xs tracking-[0.25em] text-white/30">
            VAI SPACE / ADMIN
          </div>
        </section>

        {/* RIGHT — AUTH */}
        <section className="relative flex min-h-screen items-center justify-center border-l border-white/[0.06] px-6 py-12 sm:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(228,110,204,0.05),transparent_35%)]" />

          <div className="relative z-10 w-full max-w-md">
            {/* Mobile branding */}
            <div className="mb-14 lg:hidden">
              <p className="font-[Space_Grotesk] text-xl font-semibold tracking-[0.22em]">
                VAI
              </p>
              <p className="mt-1 text-[9px] tracking-[0.45em] text-white/40">
                SPACE ADMIN
              </p>
            </div>

            <div className="mb-10">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#8b93ff]">
                {isLogin ? "Admin access" : "New administrator"}
              </p>

              <h1 className="font-[Space_Grotesk] text-4xl font-semibold tracking-tight sm:text-5xl">
                {isLogin ? "Welcome back." : "Create access."}
              </h1>

              <p className="mt-4 max-w-sm font-[Lexend] text-sm leading-7 text-white/45">
                {isLogin
                  ? "Enter your administrator credentials to access the VAI SPACE control room."
                  : "Create an administrator account for the VAI SPACE control room."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-[Lexend] text-xs text-white/50"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="h-13 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 font-[Lexend] text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#616CFA]/60 focus:bg-white/[0.05]"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-[Lexend] text-xs text-white/50"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="admin@vaispace.com"
                  className="h-13 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 font-[Lexend] text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#616CFA]/60 focus:bg-white/[0.05]"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block font-[Lexend] text-xs text-white/50"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="h-13 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 font-[Lexend] text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#616CFA]/60 focus:bg-white/[0.05]"
                />
              </div>

              {!isLogin && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block font-[Lexend] text-xs text-white/50"
                  >
                    Confirm password
                  </label>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="h-13 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 font-[Lexend] text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#616CFA]/60 focus:bg-white/[0.05]"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group relative mt-3 h-13 w-full overflow-hidden rounded-xl bg-white text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10">
                  {loading
                    ? "Please wait..."
                    : isLogin
                      ? "Sign in"
                      : "Create account"}
                </span>

                <span className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-[#616CFA] to-[#E46ECC] transition-all duration-500 group-hover:w-full" />
              </button>
            </form>

            <div className="mt-8 text-center font-[Lexend] text-xs text-white/35">
              {isLogin ? (
                <>
                  Don&apos;t have an admin account?{" "}
                  <Link
                    href="/admin/signup"
                    className="text-white/70 transition hover:text-white"
                  >
                    Create account
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link
                    href="/admin/login"
                    className="text-white/70 transition hover:text-white"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}