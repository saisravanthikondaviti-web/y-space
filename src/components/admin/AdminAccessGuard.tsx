"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LockKeyhole,
  LoaderCircle,
  ShieldAlert,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const PAGE_NAMES: Record<string, string> = {
  dashboard: "Dashboard",
  users: "Users",
  content: "Content",
  blogs: "Blogs",
  services: "Services",
  "apps-products": "Apps & Products",
  "api-hub": "API Hub",
  media: "Media Library",
  analytics: "Analytics",
  marketing: "Marketing",
  notifications: "Notifications",
  settings: "Settings",
};

function getPageKey(pathname: string) {
  const parts = pathname
    .replace(/^\/+|\/+$/g, "")
    .split("/");

  return parts[0] === "admin"
    ? parts[1] ?? null
    : null;
}

function isAccessRequestPage(pathname: string) {
  return pathname === "/admin/access-request";
}

function AccessDenied({
  pageName,
  reason,
}: {
  pageName: string;
  reason: string;
}) {
  const isUnauthorized = reason === "unauthorized";
  const isServerError = reason === "server_error";

  return (
    <main className="flex min-h-[calc(100vh-78px)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.28)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/[0.06] text-red-300">
          <ShieldAlert
            size={25}
            strokeWidth={1.7}
          />
        </div>

        <p className="mt-6 font-[Space_Grotesk] text-[9px] font-medium uppercase tracking-[0.28em] text-[var(--admin-purple)]">
          VAI SPACE / ACCESS CONTROL
        </p>

        <h1 className="mt-3 font-[Space_Grotesk] text-2xl font-semibold text-[var(--admin-text)]">
          {isUnauthorized
            ? "Authentication required"
            : "Access restricted"}
        </h1>

        <p className="mx-auto mt-3 max-w-md font-[Lexend] text-[12px] leading-6 text-[var(--admin-text-secondary)]">
          {isUnauthorized
            ? "Please sign in to access this area."
            : isServerError
              ? "We couldn't verify your administrator permissions right now. Please try again."
              : "Your administrator account does not currently have permission to access "}
          {!isUnauthorized && !isServerError && (
            <span className="text-[var(--admin-text)]">
              {pageName}.
            </span>
          )}
        </p>

        {!isUnauthorized && !isServerError && (
          <div className="mt-5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-4 py-3 text-left">
            <div className="flex items-start gap-3">
              <LockKeyhole
                size={15}
                className="mt-0.5 shrink-0 text-[var(--admin-purple)]"
              />

              <div>
                <p className="font-[Lexend] text-[10px] font-medium text-[var(--admin-text)]">
                  Permission required
                </p>

                <p className="mt-1 font-[Lexend] text-[9px] leading-5 text-[var(--admin-text-muted)]">
                  {reason === "not_active_admin"
                    ? "Your administrator account is not active."
                    : "Ask the Super Admin to grant this page in Users & Administration."}
                </p>
              </div>
            </div>
          </div>
        )}

        {reason === "not_active_admin" && (
          <Link
            href="/admin/access-request"
            className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-[var(--admin-purple)] px-5 font-[Lexend] text-[10px] font-medium text-white shadow-[0_10px_30px_rgba(120,90,255,0.2)] transition-all hover:brightness-110"
          >
            Request Administrator Access
          </Link>
        )}

        {isUnauthorized && (
          <Link
            href="/admin/login"
            className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-[var(--admin-purple)] px-5 font-[Lexend] text-[10px] font-medium text-white shadow-[0_10px_30px_rgba(120,90,255,0.2)] transition-all hover:brightness-110"
          >
            Go to Login
          </Link>
        )}
      </div>
    </main>
  );
}

export default function AdminAccessGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [state, setState] = useState<
    "checking" | "allowed" | "denied"
  >("checking");

  const [reason, setReason] =
    useState("no_page_access");

  const pageKey = useMemo(
    () => getPageKey(pathname),
    [pathname],
  );

  const pageName = pageKey
    ? PAGE_NAMES[pageKey] ?? "this page"
    : "this page";

  useEffect(() => {
    let cancelled = false;

    async function checkAccess() {
      /*
       * Non-admin routes are not handled by
       * this guard.
       */
      if (!pathname.startsWith("/admin/")) {
        if (!cancelled) {
          setState("allowed");
        }

        return;
      }

      /*
       * Login and signup must always be accessible.
       */
      if (
        pathname === "/admin/login" ||
        pathname === "/admin/signup"
      ) {
        if (!cancelled) {
          setState("allowed");
        }

        return;
      }

      /*
       * Access request is intentionally available
       * to authenticated normal users.
       *
       * It does NOT require admin permissions.
       */
      if (isAccessRequestPage(pathname)) {
        setState("checking");

        try {
          const {
            data: { session },
            error: sessionError,
          } = await supabase.auth.getSession();

          if (cancelled) {
            return;
          }

          if (
            sessionError ||
            !session?.access_token
          ) {
            setReason("unauthorized");
            setState("denied");
            return;
          }

          setState("allowed");
        } catch (error) {
          console.error(
            "Access request authentication check failed:",
            error,
          );

          if (!cancelled) {
            setReason("server_error");
            setState("denied");
          }
        }

        return;
      }

      /*
       * Unknown /admin route.
       */
      if (!pageKey) {
        if (!cancelled) {
          setState("allowed");
        }

        return;
      }

      setState("checking");

      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (
          sessionError ||
          !session?.access_token
        ) {
          if (!cancelled) {
            setReason("unauthorized");
            setState("denied");
          }

          return;
        }

        const response = await fetch(
          `/api/admin/access-check?page=${encodeURIComponent(
            pageKey,
          )}`,
          {
            method: "GET",
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          },
        );

        /*
         * Read text first so an unexpected HTML
         * response doesn't cause:
         *
         * Unexpected token '<'
         */
        const responseText =
          await response.text();

        let result: {
          success?: boolean;
          allowed?: boolean;
          reason?: string;
          error?: string;
        } = {};

        try {
          result = JSON.parse(
            responseText,
          );
        } catch {
          console.error(
            "Admin access API returned a non-JSON response:",
            responseText.slice(0, 500),
          );

          if (!cancelled) {
            setReason("server_error");
            setState("denied");
          }

          return;
        }

        if (cancelled) {
          return;
        }

        if (
          response.ok &&
          result.allowed === true
        ) {
          setState("allowed");
          return;
        }

        setReason(
          result.reason ||
            "no_page_access",
        );

        setState("denied");
      } catch (error) {
        console.error(
          "Admin page permission check failed:",
          error,
        );

        if (!cancelled) {
          setReason("server_error");
          setState("denied");
        }
      }
    }

    void checkAccess();

    return () => {
      cancelled = true;
    };
  }, [pageKey, pathname]);

  if (state === "checking") {
    return (
      <main className="flex min-h-[calc(100vh-78px)] items-center justify-center px-6">
        <div className="flex items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] px-5 py-3">
          <LoaderCircle
            size={16}
            className="animate-spin text-[var(--admin-purple)]"
          />

          <span className="font-[Lexend] text-[10px] text-[var(--admin-text-secondary)]">
            Verifying page access...
          </span>
        </div>
      </main>
    );
  }

  if (state === "denied") {
    return (
      <AccessDenied
        pageName={pageName}
        reason={reason}
      />
    );
  }

  return <>{children}</>;
}