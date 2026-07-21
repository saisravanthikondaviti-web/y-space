"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const navLinks = [
    { href: "/what-we-do", label: "WHAT WE DO" },
    { href: "/about", label: "ABOUT" },
    { href: "/hub", label: "HUB" },
    { href: "/blogs", label: "BLOG" },
    { href: "/contact", label: "CONTACT" },
  ];

  // Handle same page navigation
  const handleNavClick = (href: string) => {
    setMenuOpen(false);

    if (pathname === href) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Hide/show navbar on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at top
      if (currentScrollY < 50) {
        setShowNavbar(true);
      }

      // Scrolling down
      else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
        setMenuOpen(false);
      }

      // Scrolling up
      else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => handleNavClick("/")}
        >
          <Image
            src="/images/hlogo.png"
            alt="VAI SPACE Logo"
            width={150}
            height={50}
            priority
            className="h-8 md:h-9 lg:h-10 w-auto"
          />
        </Link>


        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-[Lexend] text-gray-200">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>


        {/* Desktop CTA */}
        <Link
          href="/contact"
          onClick={() => handleNavClick("/contact")}
          className="hidden md:inline-flex rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:brightness-110 hover:shadow-[0_0_35px_rgba(99,102,241,0.45)]"
        >
          Let's Talk
        </Link>


        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </nav>


      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="border-t border-white/10 bg-[#080808]/95 backdrop-blur-xl">

          <div className="flex flex-col px-6 py-6">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="border-b border-white/5 py-4 text-white transition hover:text-indigo-400"
              >
                {link.label}
              </Link>
            ))}


            <Link
              href="/contact"
              onClick={() => handleNavClick("/contact")}
              className="mt-6 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 py-3 text-center font-semibold text-white transition hover:scale-[1.02]"
            >
              Let's Talk
            </Link>

          </div>

        </div>
      </div>

    </header>
  );
}