"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  PenLine,
  Sparkles,
  Package,
  Braces,
  Image,
  BarChart3,
  Megaphone,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

const navigation = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Content",
    href: "/admin/content",
    icon: FileText,
  },
  {
    label: "Blogs",
    href: "/admin/blogs",
    icon: PenLine,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: Sparkles,
  },
  {
    label: "Apps & Products",
    href: "/admin/apps-products",
    icon: Package,
  },
  {
    label: "API Hub",
    href: "/admin/api-hub",
    icon: Braces,
  },
  {
    label: "Media Library",
    href: "/admin/media",
    icon: Image,
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    label: "Marketing",
    href: "/admin/marketing",
    icon: Megaphone,
  },
  {
    label: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

function getDisplayName(user: User | null) {
  if (!user) {
    return "Admin";
  }

  const metadata = user.user_metadata ?? {};

  const name =
    metadata.full_name ||
    metadata.name ||
    metadata.display_name ||
    metadata.username;

  if (typeof name === "string" && name.trim()) {
    return name.trim();
  }

  if (user.email) {
    return user.email.split("@")[0];
  }

  return "Admin";
}

function getInitials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "AD";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (mounted) {
        setUser(currentUser);
      }
    }

    void loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) {
          setUser(session?.user ?? null);
        }
      },
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  const displayName = getDisplayName(user);
  const initials = getInitials(displayName);

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[250px] border-r border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)] lg:block">
      {/* Logo */}
      <div className="flex h-[80px] items-center justify-between border-b border-[var(--admin-border)] px-6">
        <Link
          href="/admin/dashboard"
          className="group flex items-center gap-3"
        >
          <div className="font-[Space_Grotesk] text-[16px] font-semibold tracking-[0.2em]">
            <span className="text-[var(--admin-text)]">
              VAI
            </span>{" "}
            <span className="text-[#8b7cff]">
              SPACE
            </span>
          </div>

          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#8b7cff]/40" />

            <span className="relative h-2.5 w-2.5 rounded-full bg-[#9b7cff] shadow-[0_0_16px_rgba(155,124,255,0.9)]" />
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-5 scrollbar-none">
        <div className="space-y-0.5">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" &&
                pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex h-[43px] items-center gap-3 rounded-xl px-4 font-[Lexend] text-[12px] transition-all duration-200 ${
                  active
                    ? "bg-[var(--admin-surface-3)] text-[var(--admin-text)]"
                    : "text-[var(--admin-text-secondary)] hover:bg-[var(--admin-hover)] hover:text-[var(--admin-text)]"
                }`}
              >
                {/* Active indicator */}
                {active && (
                  <span className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-[#7367ff] to-[#b477ff] shadow-[0_0_12px_rgba(115,103,255,0.7)]" />
                )}

                <Icon
                  size={17}
                  strokeWidth={1.7}
                  className={`shrink-0 transition-colors ${
                    active
                      ? "text-[#8b83ff]"
                      : "text-[var(--admin-icon)] group-hover:text-[#8b83ff]"
                  }`}
                />

                <span className="flex-1">
                  {item.label}
                </span>

                {/* Notification indicator */}
                {item.label === "Notifications" && (
                  <span className="h-2 w-2 rounded-full bg-[#9b7cff] shadow-[0_0_10px_rgba(155,124,255,0.8)]" />
                )}

                {/* Active arrow */}
                {active && (
                  <ChevronRight
                    size={15}
                    className="text-[#7167d9]"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Profile */}
      <div className="border-t border-[var(--admin-border)] p-4">
        <div className="flex items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-3 py-3">
          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#766cff]/40 bg-[#1d193c] font-[Space_Grotesk] text-[13px] font-semibold text-white shadow-[0_0_20px_rgba(118,108,255,0.12)]">
            {initials}
          </div>

          {/* User details */}
          <div className="min-w-0 flex-1">
            <p className="truncate font-[Lexend] text-[13px] font-medium text-[var(--admin-text)]">
              {displayName}
            </p>

            <p className="truncate font-[Lexend] text-[11px] text-[var(--admin-text-muted)]">
              {user?.email ?? "Platform Admin"}
            </p>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            className="rounded-lg p-2 text-[var(--admin-icon)] transition hover:bg-[var(--admin-hover)] hover:text-[var(--admin-text)]"
          >
            <LogOut
              size={17}
              strokeWidth={1.7}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}