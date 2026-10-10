"use client";

import {
  ArrowLeft,
  BarChart3,
  BellRing,
  Braces,
  Clock3,
  FileText,
  Image,
  Megaphone,
  Package,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

type IconName =
  | "FileText"
  | "Sparkles"
  | "Package"
  | "Braces"
  | "Image"
  | "BarChart3"
  | "Megaphone";

type AdminComingSoonProps = {
  title: string;
  description: string;
  icon: IconName;
};

const ICONS = {
  FileText,
  Sparkles,
  Package,
  Braces,
  Image,
  BarChart3,
  Megaphone,
};

export default function AdminComingSoon({
  title,
  description,
  icon,
}: AdminComingSoonProps) {
  const Icon = ICONS[icon];

  return (
    <main className="relative flex min-h-[calc(100vh-78px)] items-center justify-center overflow-hidden bg-[var(--admin-bg)] px-6 py-12 text-[var(--admin-text)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--admin-purple)]/[0.045] blur-[140px]" />

        <div className="absolute left-[15%] top-[15%] h-32 w-32 rounded-full bg-indigo-500/[0.025] blur-[80px]" />

        <div className="absolute bottom-[10%] right-[15%] h-40 w-40 rounded-full bg-purple-500/[0.025] blur-[90px]" />

        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative w-full max-w-[620px]">
        <div className="relative overflow-hidden rounded-[24px] border border-[var(--admin-border)] bg-[var(--admin-surface)] px-7 py-10 shadow-[0_35px_100px_rgba(0,0,0,0.38)] sm:px-12 sm:py-14">
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[55%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--admin-purple)]/60 to-transparent" />

          <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-[55%] -translate-x-1/2 bg-[var(--admin-purple)]/[0.035] blur-[45px]" />

          <div className="relative text-center">
            <div className="relative mx-auto mb-7 flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border border-[var(--admin-border)] bg-[var(--admin-surface-2)] shadow-[0_15px_45px_rgba(0,0,0,0.25)]">
              <div className="absolute inset-2 rounded-[15px] border border-[var(--admin-purple)]/10" />

              <Icon
                size={27}
                strokeWidth={1.45}
                className="text-[var(--admin-purple)]"
              />

              <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-[var(--admin-purple)] shadow-[0_0_10px_rgba(120,90,255,0.8)]" />
            </div>

            <div className="mb-3 flex items-center justify-center gap-2">
              <Sparkles
                size={11}
                className="text-[var(--admin-purple)]"
              />

              <p className="font-[Space_Grotesk] text-[9px] font-medium uppercase tracking-[0.28em] text-[var(--admin-purple)]">
                VAI SPACE / IN DEVELOPMENT
              </p>

              <Sparkles
                size={11}
                className="text-[var(--admin-purple)]"
              />
            </div>

            <h1 className="font-[Space_Grotesk] text-[28px] font-semibold tracking-tight sm:text-[32px]">
              {title}
            </h1>

            <p className="mx-auto mt-4 max-w-[470px] font-[Lexend] text-[11px] leading-6 text-[var(--admin-text-secondary)] sm:text-[12px]">
              {description}
            </p>

            <div className="mx-auto mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--admin-purple)]/15 bg-[var(--admin-purple)]/[0.045] px-4 py-2">
              <Clock3
                size={13}
                className="text-[var(--admin-purple)]"
              />

              <span className="font-[Lexend] text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--admin-text-secondary)]">
                Coming Soon
              </span>
            </div>

            <div className="mx-auto my-8 h-px w-full max-w-[380px] bg-[var(--admin-border)]" />

            <div className="mx-auto flex max-w-[390px] items-start gap-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-4 py-3.5 text-left">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[var(--admin-border)] bg-white/[0.02]">
                <BellRing
                  size={13}
                  className="text-[var(--admin-purple)]"
                />
              </div>

              <div>
                <p className="font-[Lexend] text-[10px] font-medium text-[var(--admin-text)]">
                  This workspace is being prepared
                </p>

                <p className="mt-1 font-[Lexend] text-[9px] leading-4 text-[var(--admin-text-muted)]">
                  The {title.toLowerCase()} module will become
                  available here once development is complete.
                </p>
              </div>
            </div>

            <Link
              href="/admin/dashboard"
              className="group mt-7 inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--admin-border)] bg-white/[0.015] px-5 font-[Lexend] text-[10px] font-medium text-[var(--admin-text-secondary)] transition-all hover:border-[var(--admin-purple)]/25 hover:bg-[var(--admin-purple)]/[0.035] hover:text-[var(--admin-text)]"
            >
              <ArrowLeft
                size={13}
                className="transition-transform group-hover:-translate-x-0.5"
              />

              Back to Dashboard
            </Link>
          </div>
        </div>

        <p className="mt-4 text-center font-[Lexend] text-[8px] tracking-[0.12em] text-[var(--admin-text-muted)]">
          VAI SPACE
          <span className="mx-2 opacity-30">•</span>
          BUILDING THE FUTURE
        </p>
      </div>
    </main>
  );
}