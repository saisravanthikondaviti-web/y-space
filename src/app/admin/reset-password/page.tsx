"use client";

import { FormEvent, useEffect, useState } from "react";
import { Check, KeyRound, LoaderCircle, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminResetPasswordPage() {
  const router = useRouter();

  const [checkingSession, setCheckingSession] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function checkRecoverySession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) {
          return;
        }

        setHasSession(Boolean(session));
      } catch (sessionError) {
        console.error(
          "Password recovery session check failed:",
          sessionError,
        );

        if (mounted) {
          setHasSession(false);
        }
      } finally {
        if (mounted) {
          setCheckingSession(false);
        }
      }
    }

    void checkRecoverySession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) {
        return;
      }

      if (event === "PASSWORD_RECOVERY") {
        setHasSession(Boolean(session));
        setCheckingSession(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!password) {
      setError("Enter your new password.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setSaving(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        throw updateError;
      }

      setSuccess(true);
      setPassword("");
      setConfirmPassword("");
    } catch (updateError) {
      console.error("Password reset failed:", updateError);

      setError(
        updateError instanceof Error
          ? updateError.message
          : "Unable to reset your password. Please request a new reset email.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--admin-bg)] px-6">
        <div className="flex items-center gap-3 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] px-6 py-4">
          <LoaderCircle
            size={17}
            className="animate-spin text-[var(--admin-purple)]"
          />

          <span className="font-[Lexend] text-[10px] text-[var(--admin-text-secondary)]">
            Verifying password recovery link...
          </span>
        </div>
      </main>
    );
  }

  if (!hasSession) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--admin-bg)] px-6 py-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--admin-purple)]/[0.045] blur-[140px]" />
        </div>

        <div className="relative w-full max-w-[500px] rounded-[24px] border border-[var(--admin-border)] bg-[var(--admin-surface)] p-8 text-center shadow-[0_35px_100px_rgba(0,0,0,0.4)] sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/[0.05] text-red-300">
            <KeyRound size={25} />
          </div>

          <p className="mt-6 font-[Lexend] text-[9px] font-medium uppercase tracking-[0.25em] text-[var(--admin-purple)]">
            VAI SPACE / PASSWORD RECOVERY
          </p>

          <h1 className="mt-3 font-[Space_Grotesk] text-2xl font-semibold text-[var(--admin-text)]">
            Recovery link unavailable
          </h1>

          <p className="mt-3 font-[Lexend] text-[10px] leading-6 text-[var(--admin-text-muted)]">
            This password recovery link has expired or is no longer valid.
            Please request a new password reset email from the admin login
            page.
          </p>

          <button
            type="button"
            onClick={() => router.push("/admin/login")}
            className="mt-7 inline-flex h-10 items-center justify-center rounded-xl bg-[var(--admin-purple)] px-5 font-[Lexend] text-[10px] font-medium text-white transition-all hover:brightness-110"
          >
            Go to Admin Login
          </button>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--admin-bg)] px-6 py-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--admin-purple)]/[0.045] blur-[140px]" />
        </div>

        <div className="relative w-full max-w-[500px] rounded-[24px] border border-[var(--admin-border)] bg-[var(--admin-surface)] p-8 text-center shadow-[0_35px_100px_rgba(0,0,0,0.4)] sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] text-emerald-300">
            <Check size={26} />
          </div>

          <p className="mt-6 font-[Lexend] text-[9px] font-medium uppercase tracking-[0.25em] text-[var(--admin-purple)]">
            VAI SPACE / SECURITY
          </p>

          <h1 className="mt-3 font-[Space_Grotesk] text-2xl font-semibold text-[var(--admin-text)]">
            Password updated
          </h1>

          <p className="mt-3 font-[Lexend] text-[10px] leading-6 text-[var(--admin-text-muted)]">
            Your password has been successfully updated. You can now sign in
            to the VAI SPACE admin panel using your new password.
          </p>

          <button
            type="button"
            onClick={() => router.push("/admin/login")}
            className="mt-7 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[var(--admin-purple)] px-5 font-[Lexend] text-[10px] font-medium text-white transition-all hover:brightness-110"
          >
            Continue to Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--admin-bg)] px-6 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--admin-purple)]/[0.045] blur-[140px]" />

        <div className="absolute left-[15%] top-[15%] h-32 w-32 rounded-full bg-indigo-500/[0.025] blur-[80px]" />

        <div className="absolute bottom-[10%] right-[15%] h-40 w-40 rounded-full bg-purple-500/[0.025] blur-[90px]" />
      </div>

      <div className="relative w-full max-w-[500px]">
        <div className="overflow-hidden rounded-[24px] border border-[var(--admin-border)] bg-[var(--admin-surface)] p-7 shadow-[0_35px_100px_rgba(0,0,0,0.4)] sm:p-10">
          <div className="mb-7 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] text-[var(--admin-purple)]">
              <ShieldCheck size={26} strokeWidth={1.5} />
            </div>
          </div>

          <div className="text-center">
            <p className="font-[Lexend] text-[9px] font-medium uppercase tracking-[0.25em] text-[var(--admin-purple)]">
              VAI SPACE / PASSWORD RECOVERY
            </p>

            <h1 className="mt-3 font-[Space_Grotesk] text-2xl font-semibold text-[var(--admin-text)]">
              Set a new password
            </h1>

            <p className="mx-auto mt-3 max-w-sm font-[Lexend] text-[10px] leading-6 text-[var(--admin-text-muted)]">
              Create a new password for your VAI SPACE administrator account.
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/[0.05] px-4 py-3">
              <p className="font-[Lexend] text-[10px] leading-5 text-red-200">
                {error}
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-4"
          >
            <div>
              <label
                htmlFor="new-password"
                className="mb-2 block font-[Lexend] text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--admin-text-muted)]"
              >
                New password
              </label>

              <input
                id="new-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                placeholder="Enter new password"
                className="h-11 w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-3 font-[Lexend] text-[10px] text-[var(--admin-text)] outline-none transition-colors placeholder:text-[var(--admin-text-muted)] focus:border-[var(--admin-purple)]/50"
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="mt-2 font-[Lexend] text-[9px] text-[var(--admin-purple)]"
              >
                {showPassword ? "Hide password" : "Show password"}
              </button>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="mb-2 block font-[Lexend] text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--admin-text-muted)]"
              >
                Confirm new password
              </label>

              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                autoComplete="new-password"
                placeholder="Confirm new password"
                className="h-11 w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-3 font-[Lexend] text-[10px] text-[var(--admin-text)] outline-none transition-colors placeholder:text-[var(--admin-text-muted)] focus:border-[var(--admin-purple)]/50"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((current) => !current)
                }
                className="mt-2 font-[Lexend] text-[9px] text-[var(--admin-purple)]"
              >
                {showConfirmPassword
                  ? "Hide password"
                  : "Show password"}
              </button>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--admin-purple)] font-[Lexend] text-[10px] font-medium text-white shadow-[0_12px_30px_rgba(120,90,255,0.2)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving && (
                <LoaderCircle size={14} className="animate-spin" />
              )}

              {saving ? "Updating password..." : "Update Password"}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center font-[Lexend] text-[8px] tracking-[0.12em] text-[var(--admin-text-muted)]">
          VAI SPACE
          <span className="mx-2 opacity-30">•</span>
          SECURE ACCOUNT RECOVERY
        </p>
      </div>
    </main>
  );
}