"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileKey2,
  LoaderCircle,
  Mail,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type RoleKey = "ADMIN" | "EDITOR" | "AUTHOR" | "ANALYST";

type RoleOption = {
  key: RoleKey;
  name: string;
  description: string;
};

type PageOption = {
  key: string;
  name: string;
  description: string;
};

const ROLE_OPTIONS: RoleOption[] = [
  {
    key: "ADMIN",
    name: "Admin",
    description:
      "Administrative access to pages explicitly granted by the Super Admin.",
  },
  {
    key: "EDITOR",
    name: "Editor",
    description:
      "Content management access to pages explicitly granted by the Super Admin.",
  },
  {
    key: "AUTHOR",
    name: "Author",
    description:
      "Blog and content authoring access to pages explicitly granted by the Super Admin.",
  },
  {
    key: "ANALYST",
    name: "Analyst",
    description:
      "Analytics and reporting access to pages explicitly granted by the Super Admin.",
  },
];

const PAGE_OPTIONS: PageOption[] = [
  {
    key: "dashboard",
    name: "Dashboard",
    description: "Overview",
  },
  {
    key: "users",
    name: "Users",
    description: "Administration",
  },
  {
    key: "content",
    name: "Content",
    description: "Website content",
  },
  {
    key: "blogs",
    name: "Blogs",
    description: "Publishing",
  },
  {
    key: "services",
    name: "Services",
    description: "Management",
  },
  {
    key: "apps-products",
    name: "Apps & Products",
    description: "Applications",
  },
  {
    key: "api-hub",
    name: "API Hub",
    description: "Integrations",
  },
  {
    key: "media",
    name: "Media Library",
    description: "Assets",
  },
  {
    key: "analytics",
    name: "Analytics",
    description: "Reports",
  },
  {
    key: "marketing",
    name: "Marketing",
    description: "Campaigns",
  },
  {
    key: "notifications",
    name: "Notifications",
    description: "Alerts",
  },
  {
    key: "settings",
    name: "Settings",
    description: "Configuration",
  },
];

function IconBox({
  children,
  size = "normal",
}: {
  children: React.ReactNode;
  size?: "normal" | "small";
}) {
  return (
    <div
      className={
        size === "small"
          ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--admin-border)] bg-white/[0.025]"
          : "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--admin-border)] bg-white/[0.025]"
      }
    >
      {children}
    </div>
  );
}

export default function AdminAccessRequestForm() {
  const [email, setEmail] = useState("");

  const [requestedRole, setRequestedRole] =
    useState<RoleKey>("AUTHOR");

  const [selectedPages, setSelectedPages] = useState<string[]>([
    "blogs",
  ]);

  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const selectedRole = useMemo(
    () =>
      ROLE_OPTIONS.find(
        (role) => role.key === requestedRole,
      ),
    [requestedRole],
  );

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (!mounted) return;

        if (userError || !user) {
          setError(
            "You must be signed in before requesting administrator access.",
          );
          setLoading(false);
          return;
        }

        setEmail(user.email ?? "");
        setLoading(false);
      } catch (err) {
        console.error(
          "Failed to load access-request user:",
          err,
        );

        if (mounted) {
          setError(
            "Unable to load your account information. Please try again.",
          );
          setLoading(false);
        }
      }
    }

    void loadUser();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!success) return;

    const timer = window.setTimeout(() => {
      setSuccess(false);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [success]);

  function togglePage(pageKey: string) {
    setSelectedPages((current) =>
      current.includes(pageKey)
        ? current.filter((key) => key !== pageKey)
        : [...current, pageKey],
    );
  }

  async function submitRequest(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    if (!email) {
      setError("Your account email could not be detected.");
      return;
    }

    if (selectedPages.length === 0) {
      setError("Please select at least one page.");
      return;
    }

    if (!reason.trim()) {
      setError("Please explain why you need administrator access.");
      return;
    }

    if (reason.trim().length > 500) {
      setError("Your reason cannot exceed 500 characters.");
      return;
    }

    setSubmitting(true);

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        setError(
          "Your session has expired. Please sign in again.",
        );
        return;
      }

      const response = await fetch(
        "/api/admin/access-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            requestedRole,
            requestedPages: selectedPages,
            reason: reason.trim(),
          }),
        },
      );

      const responseText = await response.text();

      let result: {
        success?: boolean;
        error?: string;
        message?: string;
      } = {};

      try {
        result = JSON.parse(responseText);
      } catch {
        console.error(
          "Access request API returned invalid JSON:",
          responseText.slice(0, 500),
        );
      }

      if (!response.ok || !result.success) {
        setError(
          result.error ||
            "Unable to submit your administrator access request.",
        );
        return;
      }

      setSuccess(true);
      setReason("");
    } catch (err) {
      console.error(
        "Administrator access request failed:",
        err,
      );

      setError(
        "Something went wrong while submitting your request. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="flex h-screen items-center justify-center bg-[var(--admin-bg)]">
        <div className="flex items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] px-5 py-3">
          <LoaderCircle
            size={16}
            className="animate-spin text-[var(--admin-purple)]"
          />

          <span className="font-[Lexend] text-[10px] text-[var(--admin-text-secondary)]">
            Loading your account...
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex h-screen items-center justify-center overflow-hidden bg-[var(--admin-bg)] px-4 py-5 text-[var(--admin-text)] sm:px-6">
      {/* =========================================================
          PREMIUM BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-320px] h-[600px] w-[850px] -translate-x-1/2 rounded-full bg-[var(--admin-purple)]/[0.055] blur-[150px]" />

        <div className="absolute bottom-[-350px] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/[0.018] blur-[150px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,90,255,0.025),transparent_55%)]" />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* =========================================================
          CENTERED WRAPPER
      ========================================================= */}

      <div className="relative flex h-full max-h-[760px] w-full max-w-[1160px] flex-col">
        {/* BRAND */}

        <div className="mb-4 flex shrink-0 items-center justify-center">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)]">
              <ShieldCheck
                size={15}
                strokeWidth={1.6}
                className="text-[var(--admin-purple)]"
              />

              <span className="absolute right-[4px] top-[4px] h-1 w-1 rounded-full bg-[var(--admin-purple)] shadow-[0_0_8px_rgba(120,90,255,0.8)]" />
            </div>

            <p className="font-[Space_Grotesk] text-[8px] font-medium uppercase tracking-[0.32em] text-[var(--admin-text-muted)]">
              VAI SPACE
              <span className="mx-2 text-[var(--admin-purple)]/60">
                /
              </span>
              ADMINISTRATION
            </p>
          </div>
        </div>

        {/* =========================================================
            MAIN CARD
        ========================================================= */}

        <div className="relative min-h-0 flex-1 overflow-hidden rounded-[22px] border border-[var(--admin-border)] bg-[var(--admin-surface)] shadow-[0_35px_100px_rgba(0,0,0,0.42)]">
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[55%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--admin-purple)]/45 to-transparent" />

          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[55%] -translate-x-1/2 bg-[var(--admin-purple)]/[0.025] blur-[50px]" />

          <div className="relative flex h-full min-h-0 flex-col">
            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="flex shrink-0 items-center justify-between border-b border-[var(--admin-border)] px-6 py-4 sm:px-8">
              <div>
                <p className="font-[Space_Grotesk] text-[9px] font-medium uppercase tracking-[0.24em] text-[var(--admin-purple)]">
                  Access Control
                </p>

                <h1 className="mt-1 font-[Space_Grotesk] text-[23px] font-semibold tracking-tight sm:text-[25px]">
                  Request Administrator Access
                </h1>

                <p className="mt-1 hidden font-[Lexend] text-[10px] leading-5 text-[var(--admin-text-muted)] sm:block">
                  Request a role and the specific areas you need access to.
                </p>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-[var(--admin-border)] bg-white/[0.018] px-3 py-1.5 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />

                <span className="font-[Lexend] text-[8px] font-medium uppercase tracking-[0.14em] text-[var(--admin-text-muted)]">
                  Secure Request
                </span>
              </div>
            </div>

            {/* ALERTS */}

            {(success || error) && (
              <div className="shrink-0 px-6 pt-4 sm:px-8">
                {success && (
                  <div className="flex items-center gap-3 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.045] px-4 py-2.5">
                    <CheckCircle2
                      size={15}
                      className="shrink-0 text-emerald-300"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="font-[Lexend] text-[10px] font-medium text-emerald-200">
                        Access request submitted
                      </p>

                      <p className="mt-0.5 font-[Lexend] text-[9px] text-emerald-200/55">
                        Your request is waiting for Super Admin review.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSuccess(false)}
                      className="text-emerald-200/50 transition hover:text-emerald-100"
                      aria-label="Dismiss"
                    >
                      <X size={13} />
                    </button>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-3 rounded-xl border border-red-400/15 bg-red-400/[0.04] px-4 py-2.5">
                    <AlertCircle
                      size={15}
                      className="shrink-0 text-red-300"
                    />

                    <p className="min-w-0 flex-1 font-[Lexend] text-[9px] text-red-200">
                      {error}
                    </p>

                    <button
                      type="button"
                      onClick={() => setError("")}
                      className="text-red-200/50 transition hover:text-red-100"
                      aria-label="Dismiss"
                    >
                      <X size={13} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* =====================================================
                FORM
            ===================================================== */}

            <form
              onSubmit={submitRequest}
              className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[0.86fr_1.14fr]"
            >
              {/* ===================================================
                  LEFT COLUMN
              =================================================== */}

              <div className="flex min-h-0 flex-col border-b border-[var(--admin-border)] p-6 sm:p-7 lg:border-b-0 lg:border-r lg:p-8">
                {/* ACCOUNT */}

                <div className="mb-6">
                  <div className="mb-3 flex items-center gap-3">
                    <IconBox size="small">
                      <Mail
                        size={14}
                        strokeWidth={1.6}
                        className="text-[var(--admin-purple)]"
                      />
                    </IconBox>

                    <div>
                      <p className="font-[Space_Grotesk] text-[13px] font-semibold">
                        Account
                      </p>

                      <p className="font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
                        Signed-in account
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-black/[0.12] px-3.5 py-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--admin-purple)]/[0.07]">
                      <Check
                        size={13}
                        className="text-emerald-300"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-[Lexend] text-[11px] font-medium text-[var(--admin-text-secondary)]">
                        {email}
                      </p>

                      <p className="mt-0.5 font-[Lexend] text-[8px] font-medium text-emerald-300/70">
                        Verified session
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6 h-px bg-[var(--admin-border)]" />

                {/* ROLE */}

                <div className="mb-5">
                  <div className="mb-3 flex items-center gap-3">
                    <IconBox size="small">
                      <FileKey2
                        size={14}
                        strokeWidth={1.6}
                        className="text-[var(--admin-purple)]"
                      />
                    </IconBox>

                    <div>
                      <p className="font-[Space_Grotesk] text-[13px] font-semibold">
                        Requested Role
                      </p>

                      <p className="font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
                        Choose your intended responsibility
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      value={requestedRole}
                      onChange={(event) =>
                        setRequestedRole(
                          event.target.value as RoleKey,
                        )
                      }
                      className="h-11 w-full appearance-none rounded-xl border border-[var(--admin-border)] bg-black/[0.13] px-3.5 pr-10 font-[Lexend] text-[11px] font-medium text-[var(--admin-text)] outline-none transition hover:border-[var(--admin-purple)]/20 focus:border-[var(--admin-purple)]/45 focus:ring-2 focus:ring-[var(--admin-purple)]/[0.05]"
                    >
                      {ROLE_OPTIONS.map((role) => (
                        <option
                          key={role.key}
                          value={role.key}
                          className="bg-black"
                        >
                          {role.name}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={13}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]"
                    />
                  </div>

                  {selectedRole && (
                    <p className="mt-2.5 px-1 font-[Lexend] text-[9px] leading-5 text-[var(--admin-text-muted)]">
                      {selectedRole.description}
                    </p>
                  )}
                </div>

                {/* REASON */}

                <div className="min-h-0 flex-1">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IconBox size="small">
                        <Clock3
                          size={14}
                          strokeWidth={1.6}
                          className="text-[var(--admin-purple)]"
                        />
                      </IconBox>

                      <div>
                        <p className="font-[Space_Grotesk] text-[13px] font-semibold">
                          Request Reason
                        </p>

                        <p className="font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
                          Tell us what you need access for
                        </p>
                      </div>
                    </div>

                    <span className="font-[Lexend] text-[8px] tabular-nums text-[var(--admin-text-muted)]">
                      {reason.length}/500
                    </span>
                  </div>

                  <textarea
                    value={reason}
                    onChange={(event) =>
                      setReason(
                        event.target.value.slice(0, 500),
                      )
                    }
                    maxLength={500}
                    placeholder="Explain why you need administrator access..."
                    className="h-[105px] w-full resize-none rounded-xl border border-[var(--admin-border)] bg-black/[0.13] px-3.5 py-3 font-[Lexend] text-[10px] leading-5 text-[var(--admin-text)] outline-none transition placeholder:text-[var(--admin-text-muted)] hover:border-[var(--admin-purple)]/15 focus:border-[var(--admin-purple)]/45 focus:ring-2 focus:ring-[var(--admin-purple)]/[0.05]"
                  />
                </div>

                {/* SECURITY */}

                <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-[var(--admin-purple)]/10 bg-[var(--admin-purple)]/[0.025] px-3 py-2.5">
                  <ShieldCheck
                    size={13}
                    className="shrink-0 text-[var(--admin-purple)]"
                  />

                  <p className="font-[Lexend] text-[9px] leading-4 text-[var(--admin-text-muted)]">
                    Final role, page permissions and account status
                    are controlled by the Super Admin.
                  </p>
                </div>
              </div>

              {/* ===================================================
                  RIGHT COLUMN
              =================================================== */}

              <div className="flex min-h-0 flex-col p-6 sm:p-7 lg:p-8">
                {/* PAGE HEADER */}

                <div className="mb-5 flex shrink-0 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconBox size="small">
                      <Sparkles
                        size={14}
                        strokeWidth={1.6}
                        className="text-[var(--admin-purple)]"
                      />
                    </IconBox>

                    <div>
                      <p className="font-[Space_Grotesk] text-[13px] font-semibold">
                        Page Permissions
                      </p>

                      <p className="font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
                        Select the areas you need
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-[var(--admin-purple)]/15 bg-[var(--admin-purple)]/[0.055] px-2.5 py-1.5">
                    <span className="font-[Lexend] text-[9px] font-medium text-[var(--admin-purple)]">
                      {selectedPages.length}
                      <span className="mx-0.5 text-[var(--admin-purple)]/35">
                        /
                      </span>
                      {PAGE_OPTIONS.length}
                    </span>
                  </div>
                </div>

                {/* PAGE LIST */}

                <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                  <div className="grid grid-cols-2 gap-2">
                    {PAGE_OPTIONS.map((page) => {
                      const selected = selectedPages.includes(
                        page.key,
                      );

                      return (
                        <button
                          key={page.key}
                          type="button"
                          onClick={() =>
                            togglePage(page.key)
                          }
                          aria-pressed={selected}
                          className={`group relative flex min-h-[64px] items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all duration-200 ${
                            selected
                              ? "border-[var(--admin-purple)]/35 bg-[var(--admin-purple)]/[0.055]"
                              : "border-[var(--admin-border)] bg-white/[0.012] hover:border-[var(--admin-purple)]/18 hover:bg-white/[0.02]"
                          }`}
                        >
                          <span
                            className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border transition ${
                              selected
                                ? "border-[var(--admin-purple)] bg-[var(--admin-purple)]"
                                : "border-[var(--admin-border)] bg-transparent"
                            }`}
                          >
                            {selected && (
                              <Check
                                size={11}
                                strokeWidth={2.5}
                                className="text-white"
                              />
                            )}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span
                              className={`block truncate font-[Lexend] text-[10px] font-medium ${
                                selected
                                  ? "text-[var(--admin-text)]"
                                  : "text-[var(--admin-text-secondary)]"
                              }`}
                            >
                              {page.name}
                            </span>

                            <span className="mt-0.5 block truncate font-[Lexend] text-[8px] text-[var(--admin-text-muted)]">
                              {page.description}
                            </span>
                          </span>

                          {selected && (
                            <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--admin-purple)] shadow-[0_0_7px_rgba(120,90,255,0.8)]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SUBMIT */}

                <div className="mt-5 shrink-0">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group flex h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--admin-purple)] font-[Lexend] text-[11px] font-medium text-white shadow-[0_10px_35px_rgba(120,90,255,0.18)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_14px_42px_rgba(120,90,255,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <LoaderCircle
                          size={14}
                          className="animate-spin"
                        />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <Send
                          size={13}
                          strokeWidth={1.8}
                        />
                        Submit Access Request
                        <span className="ml-0.5 transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </>
                    )}
                  </button>

                  <div className="mt-2.5 flex items-center justify-center gap-1.5">
                    <Clock3
                      size={9}
                      className="text-[var(--admin-text-muted)]"
                    />

                    <span className="font-[Lexend] text-[8px] text-[var(--admin-text-muted)]">
                      Reviewed manually by the Super Admin
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* FOOTER */}

        <div className="flex shrink-0 items-center justify-center pt-3">
          <p className="font-[Lexend] text-[8px] tracking-[0.12em] text-[var(--admin-text-muted)]">
            VAI SPACE
            <span className="mx-2 opacity-30">•</span>
            SECURE
            <span className="mx-2 opacity-30">•</span>
            CONTROLLED
            <span className="mx-2 opacity-30">•</span>
            AUDITED
          </p>
        </div>
      </div>
    </main>
  );
}