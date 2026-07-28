"use client";

import { useEffect, useState } from "react";
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

  const handleNavClick = (href: string) => {
    setMenuOpen(false);

    if (pathname === href) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
        setMenuOpen(false);
      } else {
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
      className={`
        fixed top-0 left-0 z-50 w-full
        border-b border-white/10
        bg-black/40 backdrop-blur-xl
        transition-transform duration-500
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <nav
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-5
          py-1.5
          sm:px-6
          md:py-2
        "
      >
        {/* Logo */}

        <Link
          href="/"
          onClick={() => handleNavClick("/")}
          className="flex items-center"
        >
          <Image
            src="/images/hlogo.png"
            alt="VAI SPACE Logo"
            width={150}
            height={50}
            priority
            className="
              h-auto
              w-35
              sm:w-35
              md:w-40
              lg:w-48
              xl:w-52
            "
          />
        </Link>

        {/* Desktop Navigation */}

        <ul
          className="
            hidden
            items-center
            gap-8
            text-sm
            font-[Lexend]
            text-gray-200
            md:flex
          "
        >
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
          className="
            hidden
            rounded-full
            bg-gradient-to-r
            from-indigo-500
            to-fuchsia-500
            px-5
            py-2
            text-sm
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-105
            md:inline-flex
          "
        >
          Let&apos;s Talk
        </Link>

        {/* Mobile Menu Button */}

        <button
          className="
            flex
            items-center
            justify-center
            text-white
            md:hidden
          "
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <X size={22} strokeWidth={2} />
          ) : (
            <Menu size={22} strokeWidth={2} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}

      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          md:hidden
          ${menuOpen ? "max-h-[450px]" : "max-h-0"}
        `}
      >
        <div
          className="
            border-t
            border-white/10
            bg-[#080808]/95
            backdrop-blur-xl
          "
        >
          <div
            className="
              flex
              flex-col
              px-5
              py-4
            "
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="
                  border-b
                  border-white/5
                  py-3
                  text-sm
                  text-white
                  transition
                  hover:text-indigo-400
                "
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => handleNavClick("/contact")}
              className="
                mt-4
                rounded-full
                bg-gradient-to-r
                from-indigo-500
                to-fuchsia-500
                py-2.5
                text-center
                text-sm
                font-semibold
                text-white
              "
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}