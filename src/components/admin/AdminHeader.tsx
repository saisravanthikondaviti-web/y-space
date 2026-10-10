"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Moon,
  Sun,
  HelpCircle,
  Bell,
  X,
  ArrowRight,
  LayoutDashboard,
  Users,
  FileText,
  Briefcase,
  Settings,
  BellRing,
} from "lucide-react";

type SearchItem = {
  label: string;
  description: string;
  path: string;
  icon: React.ElementType;
};

const searchItems: SearchItem[] = [
  {
    label: "Dashboard",
    description: "Admin overview",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    description: "Manage users and roles",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Content",
    description: "Manage website content",
    path: "/admin/content",
    icon: FileText,
  },
  {
    label: "Services",
    description: "Manage VAI SPACE services",
    path: "/admin/services",
    icon: Briefcase,
  },
  {
    label: "Notifications",
    description: "View notifications",
    path: "/admin/notifications",
    icon: BellRing,
  },
  {
    label: "Settings",
    description: "Admin account settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

type AdminTheme = "dark" | "light";

function getInitialTheme(): AdminTheme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = localStorage.getItem("vai-admin-theme");

  return savedTheme === "light" ? "light" : "dark";
}

export default function AdminHeader() {
  const router = useRouter();

  const searchRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [theme, setTheme] = useState<AdminTheme>(getInitialTheme);

  const [showGuide, setShowGuide] = useState(false);

  /*
   * Apply the initial theme to the document.
   *
   * Theme state itself is initialized above, so there is no
   * synchronous setState call inside this effect.
   */
  useEffect(() => {
    document.documentElement.classList.toggle(
      "admin-light",
      theme === "light",
    );
  }, [theme]);

  /*
   * Close search results when clicking outside.
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /*
   * Theme toggle.
   */
  function toggleTheme() {
    const nextTheme: AdminTheme =
      theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);

    localStorage.setItem("vai-admin-theme", nextTheme);
  }

  const filteredSearchItems = searchItems.filter((item) => {
    const value = search.toLowerCase().trim();

    if (!value) return true;

    return (
      item.label.toLowerCase().includes(value) ||
      item.description.toLowerCase().includes(value)
    );
  });

  function openSearchItem(path: string) {
    setSearch("");
    setShowSearchResults(false);
    router.push(path);
  }

  function handleSearchKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Enter") {
      const firstResult = filteredSearchItems[0];

      if (firstResult) {
        openSearchItem(firstResult.path);
      }
    }

    if (event.key === "Escape") {
      setSearch("");
      setShowSearchResults(false);
    }
  }

  const controlClass = `
    flex h-11 w-11
    items-center justify-center
    rounded-xl
    border border-[var(--admin-border)]
    bg-[var(--admin-surface)]
    text-[var(--admin-icon)]
    shadow-sm
    transition-all duration-200
    hover:-translate-y-px
    hover:border-[var(--admin-border-strong)]
    hover:bg-[var(--admin-surface-3)]
    hover:text-[var(--admin-text)]
  `;

  return (
    <>
      <header
        className="
          sticky top-0 z-40
          flex h-[78px] items-center
          border-b border-[var(--admin-border)]
          bg-[var(--admin-bg)]/90
          px-5
          backdrop-blur-xl
          transition-colors duration-300
          lg:px-7
        "
      >
        {/* Search */}
        <div
          ref={searchRef}
          className="relative w-full max-w-[560px]"
        >
          <div className="relative">
            <Search
              size={17}
              strokeWidth={1.8}
              className="
                pointer-events-none
                absolute left-4 top-1/2
                -translate-y-1/2
                text-[var(--admin-icon)]
              "
            />

            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search VAI SPACE admin..."
              className="
                h-[50px] w-full
                rounded-xl
                border border-[var(--admin-border)]
                bg-[var(--admin-surface)]
                pl-11 pr-4
                font-[Lexend]
                text-[13px]
                text-[var(--admin-text)]
                outline-none
                shadow-sm
                transition-all duration-200
                placeholder:text-[var(--admin-text-muted)]
                hover:border-[var(--admin-border-strong)]
                focus:border-[var(--admin-purple)]
                focus:ring-2
                focus:ring-[var(--admin-purple)]/10
              "
            />
          </div>

          {/* Search results */}
          {showSearchResults && (
            <div
              className="
                admin-dropdown
                absolute left-0 right-0 top-[58px]
                overflow-hidden
                rounded-2xl
                border
                shadow-[0_20px_60px_rgba(0,0,0,0.16)]
              "
            >
              <div className="border-b border-[var(--admin-border)] px-4 py-3">
                <span className="font-[Lexend] text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--admin-text-muted)]">
                  Quick navigation
                </span>
              </div>

              <div className="max-h-[360px] overflow-y-auto p-2">
                {filteredSearchItems.length > 0 ? (
                  filteredSearchItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.path}
                        type="button"
                        onClick={() => openSearchItem(item.path)}
                        className="
                          group flex w-full items-center gap-3
                          rounded-xl
                          px-3 py-3
                          text-left
                          transition-colors
                          hover:bg-[var(--admin-hover)]
                        "
                      >
                        <div
                          className="
                            flex h-9 w-9 shrink-0
                            items-center justify-center
                            rounded-lg
                            border border-[var(--admin-border)]
                            bg-[var(--admin-surface-2)]
                            text-[var(--admin-icon)]
                            transition-colors
                            group-hover:border-[var(--admin-purple)]/30
                            group-hover:text-[var(--admin-purple)]
                          "
                        >
                          <Icon size={16} strokeWidth={1.7} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-[Lexend] text-[12px] font-medium text-[var(--admin-text)]">
                            {item.label}
                          </p>

                          <p className="mt-0.5 truncate font-[Lexend] text-[10px] text-[var(--admin-text-muted)]">
                            {item.description}
                          </p>
                        </div>

                        <ArrowRight
                          size={14}
                          className="
                            text-[var(--admin-text-muted)]
                            opacity-0
                            transition-all
                            group-hover:translate-x-0.5
                            group-hover:text-[var(--admin-purple)]
                            group-hover:opacity-100
                          "
                        />
                      </button>
                    );
                  })
                ) : (
                  <div className="px-4 py-8 text-center">
                    <Search
                      size={18}
                      className="mx-auto text-[var(--admin-text-muted)]"
                    />

                    <p className="mt-2 font-[Lexend] text-[11px] text-[var(--admin-text-secondary)]">
                      No results found
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right controls */}
        <div className="ml-auto flex items-center gap-2">
          {/* Theme */}
          <button
            type="button"
            onClick={toggleTheme}
            title={
              theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            aria-label={
              theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className={controlClass}
          >
            {theme === "dark" ? (
              <Sun size={17} strokeWidth={1.7} />
            ) : (
              <Moon size={17} strokeWidth={1.7} />
            )}
          </button>

          {/* Guide */}
          <button
            type="button"
            onClick={() => setShowGuide(true)}
            title="Admin guide"
            aria-label="Admin guide"
            className={controlClass}
          >
            <HelpCircle size={17} strokeWidth={1.7} />
          </button>

          {/* Notifications */}
          <button
            type="button"
            onClick={() => router.push("/admin/notifications")}
            title="Notifications"
            aria-label="Notifications"
            className={`${controlClass} relative`}
          >
            <Bell size={17} strokeWidth={1.7} />

            <span
              className="
                absolute right-2.5 top-2
                h-1.5 w-1.5
                rounded-full
                bg-[var(--admin-purple)]
                shadow-[0_0_10px_rgba(113,103,255,0.75)]
              "
            />
          </button>

          {/* Admin profile */}
          <button
            type="button"
            onClick={() => router.push("/admin/settings")}
            className="
              ml-1 flex h-11
              items-center gap-3
              rounded-xl
              border border-[var(--admin-border)]
              bg-[var(--admin-surface)]
              px-2.5 pr-3
              shadow-sm
              transition-all duration-200
              hover:-translate-y-px
              hover:border-[var(--admin-border-strong)]
              hover:bg-[var(--admin-surface-3)]
            "
          >
            <div className="hidden text-right sm:block">
              <p className="font-[Lexend] text-[11px] font-medium text-[var(--admin-text)]">
                Admin
              </p>

              <p className="mt-0.5 font-[Lexend] text-[8px] uppercase tracking-[0.12em] text-[var(--admin-text-muted)]">
                VAI SPACE
              </p>
            </div>

            <div
              className="
                flex h-8 w-8
                items-center justify-center
                rounded-full
                border border-[var(--admin-purple)]/30
                bg-[var(--admin-surface-3)]
                font-[Space_Grotesk]
                text-[10px]
                font-semibold
                text-[var(--admin-purple)]
              "
            >
              AS
            </div>
          </button>
        </div>
      </header>

      {/* Guide dialog */}
      {showGuide && (
        <div
          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            bg-black/45
            px-4
            backdrop-blur-md
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowGuide(false);
            }
          }}
        >
          <div
            className="
              admin-modal
              w-full max-w-[500px]
              overflow-hidden
              rounded-2xl
              border
              shadow-[0_30px_100px_rgba(0,0,0,0.2)]
            "
          >
            <div className="flex items-center justify-between border-b border-[var(--admin-border)] px-5 py-4">
              <div>
                <p className="font-[Lexend] text-[9px] uppercase tracking-[0.18em] text-[var(--admin-purple)]">
                  VAI SPACE
                </p>

                <h2 className="mt-1 font-[Space_Grotesk] text-[18px] font-semibold text-[var(--admin-text)]">
                  Admin Guide
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="
                  admin-button
                  flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  hover:text-[var(--admin-text)]
                "
              >
                <X size={17} strokeWidth={1.8} />
              </button>
            </div>

            <div className="space-y-4 px-5 py-5">
              <div>
                <h3 className="font-[Lexend] text-[12px] font-medium text-[var(--admin-text)]">
                  Dashboard
                </h3>

                <p className="mt-1 font-[Lexend] text-[11px] leading-5 text-[var(--admin-text-secondary)]">
                  View platform activity, statistics and quick
                  administration actions.
                </p>
              </div>

              <div>
                <h3 className="font-[Lexend] text-[12px] font-medium text-[var(--admin-text)]">
                  Users
                </h3>

                <p className="mt-1 font-[Lexend] text-[11px] leading-5 text-[var(--admin-text-secondary)]">
                  Manage workspace users, roles and invitations.
                </p>
              </div>

              <div>
                <h3 className="font-[Lexend] text-[12px] font-medium text-[var(--admin-text)]">
                  Theme
                </h3>

                <p className="mt-1 font-[Lexend] text-[11px] leading-5 text-[var(--admin-text-secondary)]">
                  Use the sun/moon control in the header to switch
                  between the VAI SPACE light and dark themes.
                </p>
              </div>
            </div>

            <div className="border-t border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-5 py-4">
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="
                  ml-auto flex h-9
                  items-center
                  rounded-lg
                  bg-[var(--admin-purple)]
                  px-4
                  font-[Lexend] text-[11px] font-medium
                  text-white
                  transition-all
                  hover:bg-[var(--admin-purple-light)]
                "
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}