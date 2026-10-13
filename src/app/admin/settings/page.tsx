"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Globe2,
  KeyRound,
  Languages,
  LockKeyhole,
  Mail,
  Palette,
  Plus,
  RefreshCw,
  Save,
  ShieldCheck,
  Sparkles,
  UserCircle2,
  UsersRound,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type SettingSection =
  | "account"
  | "roles"
  | "branding"
  | "security"
  | "audit"
  | "notifications";

type AdminProfile = {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  createdAt: string | null;
};

type AuditItem = {
  id: string;
  action: string;
  description: string;
  time: string;
  type: "security" | "content" | "account" | "system";
};

const sections: {
  id: SettingSection;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    id: "account",
    label: "Account & team",
    description: "Profile and workspace settings",
    icon: UserCircle2,
  },
  {
    id: "roles",
    label: "Roles & permissions",
    description: "Administrator access control",
    icon: UsersRound,
  },
  {
    id: "branding",
    label: "Branding & domains",
    description: "Workspace identity and domains",
    icon: Palette,
  },
  {
    id: "security",
    label: "Integrations & security",
    description: "Security and account protection",
    icon: ShieldCheck,
  },
  {
    id: "audit",
    label: "Audit log",
    description: "Recent administrator activity",
    icon: Activity,
  },
  {
    id: "notifications",
    label: "Notification preferences",
    description: "Control administrator alerts",
    icon: Bell,
  },
];

const auditItems: AuditItem[] = [
  {
    id: "1",
    action: "Security settings",
    description: "Security preferences were reviewed",
    time: "Today",
    type: "security",
  },
  {
    id: "2",
    action: "Administrator access",
    description: "Administrator permissions were checked",
    time: "Today",
    type: "account",
  },
  {
    id: "3",
    action: "Workspace settings",
    description: "Workspace configuration was viewed",
    time: "Yesterday",
    type: "system",
  },
  {
    id: "4",
    action: "Content management",
    description: "Content administration settings were accessed",
    time: "2 days ago",
    type: "content",
  },
];

const roleDescriptions: Record<string, string> = {
  "Super Admin":
    "Full control over administrators, permissions, settings and the entire admin system.",
  Admin:
    "Administrative access to pages explicitly granted by the Super Admin.",
  Editor:
    "Content management access to pages explicitly granted by the Super Admin.",
  Author:
    "Blog and content authoring access to pages explicitly granted by the Super Admin.",
  Analyst:
    "Analytics and reporting access to pages explicitly granted by the Super Admin.",
};

function getDisplayName(user: {
  email?: string | null;
  user_metadata?: Record<string, unknown>;
}) {
  const metadata = user.user_metadata ?? {};

  const possibleNames = [
    metadata.full_name,
    metadata.name,
    metadata.display_name,
  ];

  const name = possibleNames.find(
    (value) => typeof value === "string" && value.trim().length > 0,
  );

  if (typeof name === "string") {
    return name.trim();
  }

  if (user.email) {
    return user.email.split("@")[0];
  }

  return "Administrator";
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);

  if (parts.length === 0) {
    return "AD";
  }

  return parts.map((part) => part.charAt(0).toUpperCase()).join("");
}

function formatDate(value: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function SettingSectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] text-[var(--admin-purple)]">
        <Icon size={16} strokeWidth={1.8} />
      </div>

      <div>
        <h2 className="font-[Space_Grotesk] text-[15px] font-semibold text-[var(--admin-text)]">
          {title}
        </h2>

        <p className="mt-1 font-[Lexend] text-[10px] leading-5 text-[var(--admin-text-muted)]">
          {description}
        </p>
      </div>
    </div>
  );
}

function Toggle({
  enabled,
  onChange,
  label,
  description,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className="flex w-full items-center justify-between gap-4 border-b border-[var(--admin-border)] py-4 text-left last:border-b-0"
    >
      <div className="min-w-0">
        <p className="font-[Lexend] text-[11px] font-medium text-[var(--admin-text)]">
          {label}
        </p>

        <p className="mt-1 max-w-xl font-[Lexend] text-[9px] leading-5 text-[var(--admin-text-muted)]">
          {description}
        </p>
      </div>

      <span
        className={`relative h-5 w-9 shrink-0 rounded-full border transition-all ${
          enabled
            ? "border-[var(--admin-purple)] bg-[var(--admin-purple)]"
            : "border-[var(--admin-border)] bg-[var(--admin-surface-2)]"
        }`}
      >
        <span
          className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white transition-all ${
            enabled ? "left-[18px]" : "left-[3px]"
          }`}
        />
      </span>
    </button>
  );
}

export default function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingSection>("account");

  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState("");

  const [workspaceName, setWorkspaceName] = useState("VAI SPACE");
  const [workspaceEmail, setWorkspaceEmail] = useState("");

  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [language, setLanguage] = useState("English");
  const [primaryDomain, setPrimaryDomain] = useState("vaispace.com");

  const [autoSaveBranding, setAutoSaveBranding] = useState(true);
  const [showBrandBadge, setShowBrandBadge] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionProtection, setSessionProtection] = useState(true);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [securityNotifications, setSecurityNotifications] = useState(true);
  const [contentNotifications, setContentNotifications] = useState(true);
  const [systemNotifications, setSystemNotifications] = useState(true);

  const [saved, setSaved] = useState(false);
  const [showAddSettings, setShowAddSettings] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

  const initials = getInitials(adminProfile?.name ?? "Administrator");

  async function loadProfile() {
    setLoadingProfile(true);
    setProfileError("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        setAdminProfile(null);
        setProfileError("You are not currently signed in.");
        return;
      }

      const displayName = getDisplayName(user);

      let roleName = "User";
      let status = "Active";
      let createdAt: string | null = user.created_at ?? null;

      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select(
          `
            user_id,
            status,
            created_at,
            admin_roles (
              role_key,
              role_name
            )
          `,
        )
        .eq("user_id", user.id)
        .maybeSingle();

      if (!adminError && adminData) {
        status = adminData.status ?? "Active";
        createdAt = adminData.created_at ?? createdAt;

        const role = Array.isArray(adminData.admin_roles)
          ? adminData.admin_roles[0]
          : adminData.admin_roles;

        if (
          role &&
          typeof role === "object" &&
          "role_name" in role &&
          typeof role.role_name === "string"
        ) {
          roleName = role.role_name;
        }
      }

      setAdminProfile({
        id: user.id,
        email: user.email ?? "",
        name: displayName,
        role: roleName,
        status,
        createdAt,
      });

      setWorkspaceEmail(user.email ?? "");
    } catch (error) {
      console.error("Failed to load admin profile:", error);

      setProfileError(
        "We couldn't load your account details. Please refresh and try again.",
      );
    } finally {
      setLoadingProfile(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadProfile();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  async function handleRefresh() {
    setRefreshing(true);
    setSaved(false);

    await loadProfile();

    window.setTimeout(() => {
      setRefreshing(false);
    }, 400);
  }

  function handleSave() {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  async function handleResetPassword() {
    setResetLoading(true);
    setResetMessage("");
    setResetError("");

    try {
      const email = adminProfile?.email;

      if (!email) {
        throw new Error("Unable to determine your registered email address.");
      }

      const redirectTo = `${window.location.origin}/admin/reset-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        throw error;
      }

      setResetMessage(
        "Password reset instructions have been sent to your registered email address.",
      );
    } catch (error) {
      console.error("Password reset request failed:", error);

      setResetError(
        error instanceof Error
          ? error.message
          : "Unable to send the password reset email. Please try again.",
      );
    } finally {
      setResetLoading(false);
    }
  }

  function renderAccountSettings() {
    return (
      <div className="space-y-6">
        <SettingSectionHeader
          icon={UserCircle2}
          title="Account & team"
          description="Manage your logged-in account and workspace information."
        />

        {profileError && (
          <div className="flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.05] px-4 py-3">
            <CircleHelp size={15} className="mt-0.5 shrink-0 text-red-300" />

            <p className="font-[Lexend] text-[10px] leading-5 text-red-200">
              {profileError}
            </p>
          </div>
        )}

        {/* Logged-in account */}
        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)]">
          <div className="border-b border-[var(--admin-border)] px-5 py-5">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] font-[Space_Grotesk] text-sm font-semibold text-[var(--admin-purple)] shadow-[0_0_30px_rgba(120,90,255,0.08)]">
                  {loadingProfile ? "..." : initials}
                </div>

                <div className="min-w-0">
                  <p className="font-[Space_Grotesk] text-[16px] font-semibold text-[var(--admin-text)]">
                    {loadingProfile
                      ? "Loading account..."
                      : (adminProfile?.name ?? "Administrator")}
                  </p>

                  <p className="mt-1 flex items-center gap-1.5 truncate font-[Lexend] text-[10px] text-[var(--admin-text-muted)]">
                    <Mail size={11} />

                    {loadingProfile
                      ? "Loading..."
                      : adminProfile?.email || "No email available"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[var(--admin-purple)]/20 bg-[var(--admin-purple)]/[0.07] px-3 py-1.5 font-[Lexend] text-[9px] font-medium text-[var(--admin-purple)]">
                  {adminProfile?.role ?? "User"}
                </span>

                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 font-[Lexend] text-[9px] font-medium text-emerald-300">
                  {adminProfile?.status ?? "Active"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-[Lexend] text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">
                Display name
              </label>

              <input
                type="text"
                value={adminProfile?.name ?? ""}
                readOnly
                className="h-10 w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-3 font-[Lexend] text-[10px] text-[var(--admin-text)] outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-[Lexend] text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">
                Email address
              </label>

              <input
                type="email"
                value={adminProfile?.email ?? ""}
                readOnly
                className="h-10 w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-3 font-[Lexend] text-[10px] text-[var(--admin-text)] outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-[Lexend] text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">
                Administrator role
              </label>

              <input
                type="text"
                value={adminProfile?.role ?? "User"}
                readOnly
                className="h-10 w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-3 font-[Lexend] text-[10px] text-[var(--admin-text)] outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-[Lexend] text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">
                Account created
              </label>

              <input
                type="text"
                value={formatDate(adminProfile?.createdAt ?? null)}
                readOnly
                className="h-10 w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-3 font-[Lexend] text-[10px] text-[var(--admin-text)] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Workspace */}
        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)]">
          <div className="border-b border-[var(--admin-border)] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] text-[var(--admin-purple)]">
                <Sparkles size={16} />
              </div>

              <div>
                <h3 className="font-[Space_Grotesk] text-[13px] font-semibold text-[var(--admin-text)]">
                  Workspace information
                </h3>

                <p className="mt-1 font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
                  General workspace information used throughout the admin area.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-[Lexend] text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">
                Workspace name
              </label>

              <input
                type="text"
                value={workspaceName}
                onChange={(event) => setWorkspaceName(event.target.value)}
                className="h-10 w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-3 font-[Lexend] text-[10px] text-[var(--admin-text)] outline-none transition-colors focus:border-[var(--admin-purple)]/50"
              />
            </div>

            <div>
              <label className="mb-2 block font-[Lexend] text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">
                Workspace email
              </label>

              <input
                type="email"
                value={workspaceEmail}
                onChange={(event) => setWorkspaceEmail(event.target.value)}
                className="h-10 w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-3 font-[Lexend] text-[10px] text-[var(--admin-text)] outline-none transition-colors focus:border-[var(--admin-purple)]/50"
              />
            </div>

            <div>
              <label className="mb-2 block font-[Lexend] text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">
                Timezone
              </label>

              <div className="relative">
                <Clock3
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]"
                />

                <select
                  value={timezone}
                  onChange={(event) => setTimezone(event.target.value)}
                  className="h-10 w-full appearance-none rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] pl-9 pr-9 font-[Lexend] text-[10px] text-[var(--admin-text)] outline-none transition-colors focus:border-[var(--admin-purple)]/50"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Europe/London">Europe/London</option>
                </select>

                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-[Lexend] text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">
                Language
              </label>

              <div className="relative">
                <Languages
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]"
                />

                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="h-10 w-full appearance-none rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] pl-9 pr-9 font-[Lexend] text-[10px] text-[var(--admin-text)] outline-none transition-colors focus:border-[var(--admin-purple)]/50"
                >
                  <option value="English">English</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Hindi">Hindi</option>
                </select>

                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Password Recovery */}
        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)]">
          <div className="border-b border-[var(--admin-border)] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] text-[var(--admin-purple)]">
                <KeyRound size={16} />
              </div>

              <div>
                <h3 className="font-[Space_Grotesk] text-[13px] font-semibold text-[var(--admin-text)]">
                  Password recovery
                </h3>

                <p className="mt-1 font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
                  Reset your account password securely through your registered
                  email.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5">
            {resetMessage && (
              <div className="mb-4 flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] px-4 py-3">
                <Check size={15} className="mt-0.5 shrink-0 text-emerald-300" />

                <p className="font-[Lexend] text-[10px] leading-5 text-emerald-200">
                  {resetMessage}
                </p>
              </div>
            )}

            {resetError && (
              <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.05] px-4 py-3">
                <CircleHelp
                  size={15}
                  className="mt-0.5 shrink-0 text-red-300"
                />

                <p className="font-[Lexend] text-[10px] leading-5 text-red-200">
                  {resetError}
                </p>
              </div>
            )}

            <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--admin-purple)]/15 bg-[var(--admin-purple)]/[0.05] text-[var(--admin-purple)]">
                  <Mail size={15} />
                </div>

                <div className="min-w-0">
                  <p className="font-[Lexend] text-[10px] font-medium text-[var(--admin-text)]">
                    Reset using your registered email
                  </p>

                  <p className="mt-1 font-[Lexend] text-[9px] leading-5 text-[var(--admin-text-muted)]">
                    A secure password reset link will be sent to your registered
                    administrator email address.
                  </p>

                  <p className="mt-2 truncate font-[Lexend] text-[9px] text-[var(--admin-purple)]">
                    {adminProfile?.email || "Loading email..."}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => void handleResetPassword()}
              disabled={resetLoading || !adminProfile?.email}
              className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[var(--admin-purple)] px-5 font-[Lexend] text-[10px] font-medium text-white shadow-[0_10px_30px_rgba(120,90,255,0.18)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resetLoading ? (
                <RefreshCw size={13} className="animate-spin" />
              ) : (
                <KeyRound size={13} />
              )}

              {resetLoading ? "Sending..." : "Reset Password"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderRolesSettings() {
    const currentRole = adminProfile?.role ?? "User";

    return (
      <div className="space-y-6">
        <SettingSectionHeader
          icon={UsersRound}
          title="Roles & permissions"
          description="Review the role assigned to your account and how administrator access is controlled."
        />

        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-[Lexend] text-[9px] uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">
                Current role
              </p>

              <h3 className="mt-2 font-[Space_Grotesk] text-xl font-semibold text-[var(--admin-text)]">
                {currentRole}
              </h3>

              <p className="mt-2 max-w-2xl font-[Lexend] text-[10px] leading-5 text-[var(--admin-text-muted)]">
                {roleDescriptions[currentRole] ??
                  "Your administrator permissions are controlled by the Super Admin."}
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--admin-purple)]/20 bg-[var(--admin-purple)]/[0.06] text-[var(--admin-purple)]">
              <ShieldCheck size={21} />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(roleDescriptions).map(([role, description]) => {
            const active = role === currentRole;

            return (
              <div
                key={role}
                className={`rounded-2xl border p-5 transition-all ${
                  active
                    ? "border-[var(--admin-purple)]/35 bg-[var(--admin-purple)]/[0.05]"
                    : "border-[var(--admin-border)] bg-[var(--admin-surface)]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-[Space_Grotesk] text-[13px] font-semibold text-[var(--admin-text)]">
                      {role}
                    </h3>

                    <p className="mt-2 font-[Lexend] text-[9px] leading-5 text-[var(--admin-text-muted)]">
                      {description}
                    </p>
                  </div>

                  {active && (
                    <span className="rounded-full border border-[var(--admin-purple)]/20 bg-[var(--admin-purple)]/[0.08] px-2.5 py-1 font-[Lexend] text-[8px] font-medium text-[var(--admin-purple)]">
                      Current
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5">
          <div className="flex items-start gap-3">
            <LockKeyhole
              size={16}
              className="mt-0.5 shrink-0 text-[var(--admin-purple)]"
            />

            <div>
              <p className="font-[Lexend] text-[10px] font-medium text-[var(--admin-text)]">
                Page-level permissions
              </p>

              <p className="mt-1 font-[Lexend] text-[9px] leading-5 text-[var(--admin-text-muted)]">
                Your access to Dashboard, Users, Blogs and other admin pages is
                assigned individually by the Super Admin.
              </p>

              <Link
                href="/admin/users"
                className="mt-4 inline-flex h-9 items-center justify-center rounded-lg border border-[var(--admin-border)] px-4 font-[Lexend] text-[9px] font-medium text-[var(--admin-text-secondary)] transition-all hover:border-[var(--admin-purple)]/40 hover:text-[var(--admin-text)]"
              >
                Open Users & Administration
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderBrandingSettings() {
    return (
      <div className="space-y-6">
        <SettingSectionHeader
          icon={Palette}
          title="Branding & domains"
          description="Manage the workspace identity and primary domain configuration."
        />

        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)]">
          <div className="grid gap-4 p-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-[Lexend] text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">
                Primary domain
              </label>

              <div className="relative">
                <Globe2
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]"
                />

                <input
                  type="text"
                  value={primaryDomain}
                  onChange={(event) => setPrimaryDomain(event.target.value)}
                  className="h-10 w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] pl-9 pr-3 font-[Lexend] text-[10px] text-[var(--admin-text)] outline-none transition-colors focus:border-[var(--admin-purple)]/50"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-[Lexend] text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">
                Workspace identity
              </label>

              <input
                type="text"
                value={workspaceName}
                onChange={(event) => setWorkspaceName(event.target.value)}
                className="h-10 w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-3 font-[Lexend] text-[10px] text-[var(--admin-text)] outline-none transition-colors focus:border-[var(--admin-purple)]/50"
              />
            </div>
          </div>

          <div className="border-t border-[var(--admin-border)] px-5">
            <Toggle
              enabled={autoSaveBranding}
              onChange={setAutoSaveBranding}
              label="Automatic branding updates"
              description="Keep supported workspace branding changes synchronized automatically."
            />

            <Toggle
              enabled={showBrandBadge}
              onChange={setShowBrandBadge}
              label="Show VAI SPACE brand badge"
              description="Display the VAI SPACE identity within supported admin experiences."
            />

            <Toggle
              enabled={maintenanceMode}
              onChange={setMaintenanceMode}
              label="Maintenance mode"
              description="Keep this disabled unless the website is intentionally being placed into maintenance mode."
            />
          </div>
        </div>
      </div>
    );
  }

  function renderSecuritySettings() {
    return (
      <div className="space-y-6">
        <SettingSectionHeader
          icon={ShieldCheck}
          title="Integrations & security"
          description="Review account protection and security-related administrator preferences."
        />

        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)]">
          <div className="flex items-center justify-between gap-4 border-b border-[var(--admin-border)] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300">
                <Check size={16} />
              </div>

              <div>
                <p className="font-[Lexend] text-[10px] font-medium text-[var(--admin-text)]">
                  Supabase authentication
                </p>

                <p className="mt-1 font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
                  Authentication is connected to the current VAI SPACE account.
                </p>
              </div>
            </div>

            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-2.5 py-1 font-[Lexend] text-[8px] font-medium text-emerald-300">
              Connected
            </span>
          </div>

          <div className="px-5">
            <Toggle
              enabled={twoFactorEnabled}
              onChange={setTwoFactorEnabled}
              label="Two-factor authentication"
              description="Enable an additional authentication step for administrator sign-in."
            />

            <Toggle
              enabled={loginAlerts}
              onChange={setLoginAlerts}
              label="Login alerts"
              description="Receive alerts when a new administrator login is detected."
            />

            <Toggle
              enabled={sessionProtection}
              onChange={setSessionProtection}
              label="Session protection"
              description="Use the platform's authentication controls to help protect administrator sessions."
            />
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5">
          <div className="flex items-start gap-3">
            <KeyRound
              size={16}
              className="mt-0.5 shrink-0 text-[var(--admin-purple)]"
            />

            <div>
              <p className="font-[Lexend] text-[10px] font-medium text-[var(--admin-text)]">
                Password recovery
              </p>

              <p className="mt-1 font-[Lexend] text-[9px] leading-5 text-[var(--admin-text-muted)]">
                Password recovery is handled through Supabase email
                authentication. No password, PIN or passkey is stored here.
              </p>

              <button
                type="button"
                onClick={() => setActiveSection("account")}
                className="mt-4 inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[var(--admin-border)] px-4 font-[Lexend] text-[9px] font-medium text-[var(--admin-text-secondary)] transition-all hover:border-[var(--admin-purple)]/40 hover:text-[var(--admin-text)]"
              >
                <KeyRound size={12} />
                Password Recovery
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderAuditSettings() {
    return (
      <div className="space-y-6">
        <SettingSectionHeader
          icon={Activity}
          title="Audit log"
          description="Review recent activity related to your administrator account."
        />

        <div className="overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)]">
          <div className="border-b border-[var(--admin-border)] px-5 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-[Lexend] text-[10px] font-medium text-[var(--admin-text)]">
                  Recent activity
                </p>

                <p className="mt-1 font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
                  Security and administrator activity associated with this
                  workspace.
                </p>
              </div>

              <Activity size={17} className="text-[var(--admin-purple)]" />
            </div>
          </div>

          <div>
            {auditItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 border-b border-[var(--admin-border)] px-5 py-4 last:border-b-0"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface-2)] text-[var(--admin-purple)]">
                  {item.type === "security" ? (
                    <ShieldCheck size={14} />
                  ) : item.type === "account" ? (
                    <UserCircle2 size={14} />
                  ) : (
                    <Activity size={14} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <p className="font-[Lexend] text-[10px] font-medium text-[var(--admin-text)]">
                      {item.action}
                    </p>

                    <span className="font-[Lexend] text-[8px] text-[var(--admin-text-muted)]">
                      {item.time}
                    </span>
                  </div>

                  <p className="mt-1 font-[Lexend] text-[9px] leading-5 text-[var(--admin-text-muted)]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderNotificationSettings() {
    return (
      <div className="space-y-6">
        <SettingSectionHeader
          icon={Bell}
          title="Notification preferences"
          description="Choose which administrator notifications should be enabled."
        />

        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] px-5">
          <Toggle
            enabled={emailNotifications}
            onChange={setEmailNotifications}
            label="Email notifications"
            description="Receive supported administrator notifications through email."
          />

          <Toggle
            enabled={securityNotifications}
            onChange={setSecurityNotifications}
            label="Security notifications"
            description="Receive alerts related to account access and security activity."
          />

          <Toggle
            enabled={contentNotifications}
            onChange={setContentNotifications}
            label="Content notifications"
            description="Receive notifications related to blogs and content management."
          />

          <Toggle
            enabled={systemNotifications}
            onChange={setSystemNotifications}
            label="System notifications"
            description="Receive important updates about the VAI SPACE admin system."
          />
        </div>
      </div>
    );
  }

  function renderActiveSection() {
    switch (activeSection) {
      case "account":
        return renderAccountSettings();

      case "roles":
        return renderRolesSettings();

      case "branding":
        return renderBrandingSettings();

      case "security":
        return renderSecuritySettings();

      case "audit":
        return renderAuditSettings();

      case "notifications":
        return renderNotificationSettings();

      default:
        return renderAccountSettings();
    }
  }

  return (
    <div className="min-h-[calc(100vh-78px)] bg-[var(--admin-bg)] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1450px]">
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Sparkles size={13} className="text-[var(--admin-purple)]" />

              <span className="font-[Lexend] text-[9px] font-medium uppercase tracking-[0.25em] text-[var(--admin-purple)]">
                VAI SPACE / SETTINGS
              </span>
            </div>

            <h1 className="font-[Space_Grotesk] text-2xl font-semibold tracking-tight text-[var(--admin-text)] sm:text-3xl">
              Settings
            </h1>

            <p className="mt-2 max-w-2xl font-[Lexend] text-[10px] leading-5 text-[var(--admin-text-muted)] sm:text-[11px]">
              Manage your administrator account, workspace configuration,
              security preferences and notification settings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void handleRefresh()}
              disabled={refreshing}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3.5 font-[Lexend] text-[9px] font-medium text-[var(--admin-text-secondary)] transition-all hover:border-[var(--admin-purple)]/30 hover:text-[var(--admin-text)] disabled:opacity-60"
            >
              <RefreshCw
                size={13}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[var(--admin-purple)] px-4 font-[Lexend] text-[9px] font-medium text-white shadow-[0_10px_30px_rgba(120,90,255,0.15)] transition-all hover:brightness-110"
            >
              {saved ? <Check size={13} /> : <Save size={13} />}
              {saved ? "Saved" : "Save changes"}
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-2 lg:sticky lg:top-24">
            <div className="mb-2 px-3 py-2">
              <p className="font-[Lexend] text-[8px] font-medium uppercase tracking-[0.2em] text-[var(--admin-text-muted)]">
                Configuration
              </p>
            </div>

            <div className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const active = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all ${
                      active
                        ? "bg-[var(--admin-purple)]/[0.09] text-[var(--admin-text)]"
                        : "text-[var(--admin-text-secondary)] hover:bg-[var(--admin-surface-2)] hover:text-[var(--admin-text)]"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                        active
                          ? "border-[var(--admin-purple)]/20 bg-[var(--admin-purple)]/[0.08] text-[var(--admin-purple)]"
                          : "border-[var(--admin-border)] bg-[var(--admin-surface-2)] text-[var(--admin-text-muted)]"
                      }`}
                    >
                      <Icon size={14} strokeWidth={1.8} />
                    </span>

                    <span className="min-w-0">
                      <span className="block font-[Lexend] text-[10px] font-medium">
                        {section.label}
                      </span>

                      <span className="mt-0.5 block truncate font-[Lexend] text-[8px] text-[var(--admin-text-muted)]">
                        {section.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 border-t border-[var(--admin-border)] pt-3">
              <button
                type="button"
                onClick={() => setShowAddSettings(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--admin-border)] px-3 py-3 font-[Lexend] text-[9px] font-medium text-[var(--admin-text-muted)] transition-all hover:border-[var(--admin-purple)]/30 hover:text-[var(--admin-text)]"
              >
                <Plus size={13} />
                Add settings
              </button>
            </div>
          </aside>

          <main className="min-w-0">{renderActiveSection()}</main>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-[var(--admin-border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-[Lexend] text-[8px] leading-5 text-[var(--admin-text-muted)]">
            Account credentials are securely managed by Supabase Authentication.
          </p>

          <div className="flex items-center gap-2 font-[Lexend] text-[8px] text-[var(--admin-text-muted)]">
            <Globe2 size={11} />
            {timezone}
          </div>
        </div>
      </div>

      {showAddSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
            <div className="flex items-start justify-between gap-4 border-b border-[var(--admin-border)] px-5 py-4">
              <div>
                <p className="font-[Lexend] text-[8px] font-medium uppercase tracking-[0.2em] text-[var(--admin-purple)]">
                  VAI SPACE
                </p>

                <h2 className="mt-1 font-[Space_Grotesk] text-[16px] font-semibold text-[var(--admin-text)]">
                  Add settings
                </h2>

                <p className="mt-1 font-[Lexend] text-[9px] leading-5 text-[var(--admin-text-muted)]">
                  Additional workspace settings can be introduced here as the
                  admin system grows.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddSettings(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--admin-border)] text-[var(--admin-text-muted)] transition-all hover:text-[var(--admin-text)]"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-2 p-5">
              <button
                type="button"
                onClick={() => {
                  setShowAddSettings(false);
                  setActiveSection("account");
                }}
                className="flex w-full items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] p-3 text-left transition-all hover:border-[var(--admin-purple)]/30"
              >
                <UserCircle2 size={15} className="text-[var(--admin-purple)]" />

                <span>
                  <span className="block font-[Lexend] text-[10px] font-medium text-[var(--admin-text)]">
                    Account settings
                  </span>

                  <span className="mt-0.5 block font-[Lexend] text-[8px] text-[var(--admin-text-muted)]">
                    Profile and workspace information
                  </span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowAddSettings(false);
                  setActiveSection("security");
                }}
                className="flex w-full items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] p-3 text-left transition-all hover:border-[var(--admin-purple)]/30"
              >
                <ShieldCheck size={15} className="text-[var(--admin-purple)]" />

                <span>
                  <span className="block font-[Lexend] text-[10px] font-medium text-[var(--admin-text)]">
                    Security settings
                  </span>

                  <span className="mt-0.5 block font-[Lexend] text-[8px] text-[var(--admin-text-muted)]">
                    Authentication and security controls
                  </span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowAddSettings(false);
                  setActiveSection("notifications");
                }}
                className="flex w-full items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] p-3 text-left transition-all hover:border-[var(--admin-purple)]/30"
              >
                <Bell size={15} className="text-[var(--admin-purple)]" />

                <span>
                  <span className="block font-[Lexend] text-[10px] font-medium text-[var(--admin-text)]">
                    Notification settings
                  </span>

                  <span className="mt-0.5 block font-[Lexend] text-[8px] text-[var(--admin-text-muted)]">
                    Administrator notification preferences
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
