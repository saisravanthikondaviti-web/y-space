"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 backdrop-blur-md bg-black/40">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/yspacelogo.png"
            alt="Y SPACE Logo"
            width={45}
            height={45}
            priority
            style={{
              width: "auto",
              height: "auto",
            }}
          />

          <h2 className="text-[22px] font-bold tracking-wider">SPACE</h2>
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex gap-8 text-sm text-gray-200 font-[Lexend]">
          <li>
            <Link href="/what-we-do">WHAT WE DO</Link>
          </li>
          <li>
            <Link href="/about">ABOUT</Link>
          </li>
          <li>
            <Link href="/team">TEAM</Link>
          </li>
          <li>
            <Link href="/blogs">BLOG</Link>
          </li>
          <li>
            <Link href="/contact">CONTACT</Link>
          </li>
        </ul>

        {/* CTA */}
        <Link
          href="/auth"
          className="rounded-full bg-white px-5 py-2 text-black text-sm font-medium hover:scale-105 transition font-[Lexend]"
        >
          Let's Talk
        </Link>
      </nav>
    </header>
  );
}
