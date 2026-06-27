"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
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

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-[Lexend] text-gray-200">
          <li>
            <Link href="/what-we-do" className="transition hover:text-white">
              WHAT WE DO
            </Link>
          </li>

          <li>
            <Link href="/about" className="transition hover:text-white">
              ABOUT
            </Link>
          </li>

          <li>
            <Link href="/team" className="transition hover:text-white">
              TEAM
            </Link>
          </li>

          <li>
            <Link href="/blogs" className="transition hover:text-white">
              BLOG
            </Link>
          </li>

          <li>
            <Link href="/contact" className="transition hover:text-white">
              CONTACT
            </Link>
          </li>
        </ul>

        {/* CTA Button */}
        <Link
  href="/contact"
  className="rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:brightness-110 hover:shadow-[0_0_35px_rgba(99,102,241,0.45)]"
>
  Let's Talk
</Link>
      </nav>
    </header>
  );
}
