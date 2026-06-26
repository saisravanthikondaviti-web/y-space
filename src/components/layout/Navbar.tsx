"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  User,
  LogOut,
  Heart,
  Clock3,
  Bookmark,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setLoggedIn(!!user);
      setUser(user);
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session?.user);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  function handleProtectedNavigation(path: string) {
    if (!loggedIn) {
      router.push("/auth");
      return;
    }

    router.push(path);
  }

  async function logout() {
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
  }

  const username =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";

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
            <button
              onClick={() => handleProtectedNavigation("/what-we-do")}
              className="hover:text-white transition"
            >
              WHAT WE DO
            </button>
          </li>

          <li>
            <button
              onClick={() => handleProtectedNavigation("/about")}
              className="hover:text-white transition"
            >
              ABOUT
            </button>
          </li>

          <li>
            <button
              onClick={() => handleProtectedNavigation("/team")}
              className="hover:text-white transition"
            >
              TEAM
            </button>
          </li>

          <li>
            <button
              onClick={() => handleProtectedNavigation("/blogs")}
              className="hover:text-white transition"
            >
              BLOG
            </button>
          </li>

          <li>
            <button
              onClick={() => handleProtectedNavigation("/contact")}
              className="hover:text-white transition"
            >
              CONTACT
            </button>
          </li>
        </ul>

        {/* Right Side */}
        {!loggedIn ? (
          <Link
            href="/auth"
            className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:scale-105"
          >
            Let's Talk
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <User size={18} />
              </div>

              <span className="hidden md:block font-medium">{username}</span>

              <ChevronDown
                size={18}
                className={`transition ${open ? "rotate-180" : ""}`}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-4 w-80 overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f0f]/95 backdrop-blur-xl shadow-2xl">
                {/* Header */}
                <div className="border-b border-white/10 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
                      <User size={24} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">{username}</h3>

                      <p className="text-sm text-gray-400 break-all">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu */}
                <div className="p-3">
                  <button
                    onClick={() => router.push("/profile")}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-white/5"
                  >
                    <User size={18} />
                    My Profile
                  </button>

                  <div className="my-3 border-t border-white/10" />

                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
