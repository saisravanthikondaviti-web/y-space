"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";


export default function Navbar() {
  const [user, setUser] = useState<null | {
    name: string;
    email: string;
  }>(null);

  const [openAuth, setOpenAuth] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // fake login (replace with real auth later)
  const handleLogin = () => {
    setUser({
      name: "Sai Sravanthi",
      email: "sai@email.com",
    });
    setOpenAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
    setDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 backdrop-blur-md bg-black/40">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/yspacelogo.png"
            alt="Y SPACE Logo"
            width={48}
            height={48}
          />
          <h2 className="text-[22px] font-bold tracking-wider">Y SPACE</h2>
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex gap-8 text-sm text-gray-200">
          <li><Link href="/what-we-do">WHAT WE DO</Link></li>
          <li><Link href="/about">ABOUT</Link></li>
          <li><Link href="/team">TEAM</Link></li>
          <li><Link href="/blog">BLOG</Link></li>
          <li><Link href="/contact">CONTACT</Link></li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* If NOT logged in */}
          {!user && (
            <button
              onClick={() => setOpenAuth(true)}
              className="rounded-full bg-white px-5 py-2 text-black text-sm font-medium hover:scale-105 transition"
            >
              Sign In
            </button>
          )}

          {/* If logged in */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-white text-black font-bold flex items-center justify-center"
              >
                {user.name.charAt(0)}
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-black border border-white/10 rounded-xl p-4 shadow-lg">
                  <p className="text-white font-semibold">{user.name}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>

                  <button
                    onClick={handleLogout}
                    className="mt-4 w-full text-left text-red-400 hover:text-red-300 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* AUTH MODAL */}
{openAuth && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md">
    
    {/* Glass Card */}
    <div className="relative w-[380px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.6)] p-6">

      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#616CFA]/20 to-[#E46ECC]/20 blur-3xl opacity-30"></div>

      <div className="relative z-10">
        
        <h2 className="text-white text-2xl font-semibold text-center">
          Welcome Back
        </h2>

        <p className="text-gray-400 text-sm text-center mt-1">
          Login or create your account
        </p>

        <div className="mt-6 space-y-3">
          <input
            type="text"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#616CFA] to-[#E46ECC] text-white font-medium hover:opacity-90 transition"
          >
            Continue
          </button>

          <button
            onClick={() => setOpenAuth(false)}
            className="w-full text-gray-400 text-sm hover:text-white transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </header>
  );
}