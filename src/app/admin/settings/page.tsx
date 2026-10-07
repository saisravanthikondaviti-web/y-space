"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  Bell,
  Check,
  ChevronRight,
  Globe,
  KeyRound,
  Palette,
  RefreshCw,
  Save,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";

type SettingSection =
  | "account"
  | "roles"
  | "branding"
  | "security"
  | "audit"
  | "notifications";

type ToggleProps = {
  enabled: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description: string;
};

const sections: {
  id: SettingSection;
  title: string;
  description: string;
}[] = [
  {
    id: "account",
    title: "Account & team",
    description:
      "Manage workspace information and administrator details.",
  },
  {
    id: "roles",
    title: "Roles & permissions",
    description:
      "Control access levels and workspace permissions.",
  },
  {
    id: "branding",
    title: "Branding & domains",
    description:
      "Manage your VAI SPACE identity, logo and domains.",
  },
  {
    id: "security",
    title: "Integrations & security",
    description:
      "Manage integrations, API access and security controls.",
  },
  {
    id: "audit",
    title: "Audit log",
    description:
      "Review important activity across your admin workspace.",
  },
  {
    id: "notifications",
    title: "Notification preferences",
    description:
      "Choose which events and alerts you want to receive.",
  },
];

function Toggle({
  enabled,
  onChange,
  label,
  description,
}: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-4 py-4">
      <div className="min-w-0">
        <p className="font-[Lexend] text-[12px] font-medium text-[var(--admin-text)]">
          {label}
        </p>

        <p className="mt-1 font-[Lexend] text-[11px] leading-5 text-[var(--admin-text-muted)]">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        aria-label={`Toggle ${label}`}
        className={`relative h-6 w-11 shrink-0 rounded-full border transition-all ${
          enabled
            ? "border-[#7167ff] bg-[#7167ff]"
            : "border-[var(--admin-border-strong)] bg-[var(--admin-surface-3)]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            enabled ? "translate-x-[22px]" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function SectionIcon({
  type,
}: {
  type: SettingSection;
}) {
  const icons = {
    account: Users,
    roles: ShieldCheck,
    branding: Palette,
    security: KeyRound,
    audit: Activity,
    notifications: Bell,
  };

  const Icon = icons[type];

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface-3)] text-[var(--admin-purple)]">
      <Icon size={16} strokeWidth={1.7} />
    </div>
  );
}

export default function AdminSettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingSection>("account");

  const [search, setSearch] = useState("");

  const [workspaceName, setWorkspaceName] =
    useState("VAI SPACE");

  const [workspaceEmail, setWorkspaceEmail] =
    useState("admin@vaispace.com");

  const [timezone, setTimezone] =
    useState("Asia/Kolkata");

  const [language, setLanguage] =
    useState("English");

  const [primaryDomain, setPrimaryDomain] =
    useState("vaispace.com");

  const [dashboardBranding, setDashboardBranding] =
    useState(true);

  const [twoFactor, setTwoFactor] =
    useState(false);

  const [loginAlerts, setLoginAlerts] =
    useState(true);

  const [sessionProtection, setSessionProtection] =
    useState(true);

  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [systemNotifications, setSystemNotifications] =
    useState(true);

  const [securityNotifications, setSecurityNotifications] =
    useState(true);

  const [userNotifications, setUserNotifications] =
    useState(true);

  const [marketingNotifications, setMarketingNotifications] =
    useState(false);

  const [saved, setSaved] = useState(false);

  const [showAddSettings, setShowAddSettings] =
    useState(false);

  const filteredSections = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return sections;
    }

    return sections.filter(
      (section) =>
        section.title.toLowerCase().includes(value) ||
        section.description.toLowerCase().includes(value),
    );
  }, [search]);

  function handleSave() {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2200);
  }

  function renderAccountSettings() {
    return (
      <div className="space-y-6">
        <div>
          <p className="font-[Lexend] text-[10px] uppercase tracking-[0.2em] text-[var(--admin-purple)]">
            Workspace
          </p>

          <h2 className="mt-2 font-[Space_Grotesk] text-[22px] font-semibold text-[var(--admin-text)]">
            Account & team
          </h2>

          <p className="mt-1 max-w-2xl font-[Lexend] text-[11px] leading-5 text-[var(--admin-text-muted)]">
            Manage the basic information associated with your VAI SPACE
            workspace and administrator account.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="font-[Lexend] text-[11px] font-medium text-[var(--admin-text-secondary)]">
              Workspace name
            </span>

            <input
              value={workspaceName}
              onChange={(event) =>
                setWorkspaceName(event.target.value)
              }
              className="h-11 w-full rounded-lg border px-3 font-[Lexend] text-[12px]"
            />
          </label>

          <label className="space-y-2">
            <span className="font-[Lexend] text-[11px] font-medium text-[var(--admin-text-secondary)]">
              Workspace email
            </span>

            <input
              type="email"
              value={workspaceEmail}
              onChange={(event) =>
                setWorkspaceEmail(event.target.value)
              }
              className="h-11 w-full rounded-lg border px-3 font-[Lexend] text-[12px]"
            />
          </label>

          <label className="space-y-2">
            <span className="font-[Lexend] text-[11px] font-medium text-[var(--admin-text-secondary)]">
              Timezone
            </span>

            <select
              value={timezone}
              onChange={(event) =>
                setTimezone(event.target.value)
              }
              className="h-11 w-full rounded-lg border px-3 font-[Lexend] text-[12px]"
            >
              <option value="Asia/Kolkata">
                India Standard Time — IST
              </option>
              <option value="Asia/Dubai">
                Gulf Standard Time — GST
              </option>
              <option value="Europe/London">
                Greenwich Mean Time — GMT
              </option>
              <option value="America/New_York">
                Eastern Time — ET
              </option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="font-[Lexend] text-[11px] font-medium text-[var(--admin-text-secondary)]">
              Language
            </span>

            <select
              value={language}
              onChange={(event) =>
                setLanguage(event.target.value)
              }
              className="h-11 w-full rounded-lg border px-3 font-[Lexend] text-[12px]"
            >
              <option>English</option>
              <option>Telugu</option>
              <option>Hindi</option>
            </select>
          </label>
        </div>

        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1d193c] text-[12px] font-semibold text-white">
              AS
            </div>

            <div>
              <p className="font-[Lexend] text-[12px] font-medium text-[var(--admin-text)]">
                Aarav Sharma
              </p>

              <p className="mt-1 font-[Lexend] text-[10px] text-[var(--admin-text-muted)]">
                Platform Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderRolesSettings() {
    const roles = [
      {
        name: "Admin",
        description:
          "Full access to the VAI SPACE admin workspace.",
        permissions:
          "Users · Content · Services · Settings",
      },
      {
        name: "Editor",
        description:
          "Manage website content and published materials.",
        permissions:
          "Content · Blogs · Media",
      },
      {
        name: "Author",
        description:
          "Create and manage assigned blog content.",
        permissions:
          "Blogs · Drafts · Media",
      },
      {
        name: "Analyst",
        description:
          "View reports and workspace analytics.",
        permissions:
          "Analytics · Reports",
      },
    ];

    return (
      <div className="space-y-6">
        <div>
          <p className="font-[Lexend] text-[10px] uppercase tracking-[0.2em] text-[var(--admin-purple)]">
            Access control
          </p>

          <h2 className="mt-2 font-[Space_Grotesk] text-[22px] font-semibold text-[var(--admin-text)]">
            Roles & permissions
          </h2>

          <p className="mt-1 font-[Lexend] text-[11px] leading-5 text-[var(--admin-text-muted)]">
            Define what each team role can access and manage.
          </p>
        </div>

        <div className="space-y-3">
          {roles.map((role) => (
            <div
              key={role.name}
              className="flex flex-col gap-4 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--admin-surface-3)] text-[var(--admin-purple)]">
                    <ShieldCheck size={15} />
                  </div>

                  <p className="font-[Lexend] text-[12px] font-semibold text-[var(--admin-text)]">
                    {role.name}
                  </p>
                </div>

                <p className="mt-2 font-[Lexend] text-[10px] leading-5 text-[var(--admin-text-muted)]">
                  {role.description}
                </p>
              </div>

              <div className="shrink-0">
                <p className="mb-2 font-[Lexend] text-[9px] uppercase tracking-[0.15em] text-[var(--admin-text-muted)]">
                  Access
                </p>

                <p className="font-[Lexend] text-[10px] text-[var(--admin-text-secondary)]">
                  {role.permissions}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderBrandingSettings() {
    return (
      <div className="space-y-6">
        <div>
          <p className="font-[Lexend] text-[10px] uppercase tracking-[0.2em] text-[var(--admin-purple)]">
            Brand identity
          </p>

          <h2 className="mt-2 font-[Space_Grotesk] text-[22px] font-semibold text-[var(--admin-text)]">
            Branding & domains
          </h2>

          <p className="mt-1 font-[Lexend] text-[11px] leading-5 text-[var(--admin-text-muted)]">
            Control how VAI SPACE appears throughout the admin
            workspace.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] p-5">
            <div className="flex h-14 items-center gap-3 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] px-4">
              <span className="font-[Space_Grotesk] text-[16px] font-semibold tracking-[0.18em] text-[var(--admin-text)]">
                VAI
              </span>

              <span className="font-[Space_Grotesk] text-[16px] font-semibold tracking-[0.18em] text-[var(--admin-purple)]">
                SPACE
              </span>

              <span className="ml-auto h-2.5 w-2.5 rounded-full bg-[#9b7cff] shadow-[0_0_14px_rgba(155,124,255,0.8)]" />
            </div>

            <p className="mt-3 font-[Lexend] text-[10px] text-[var(--admin-text-muted)]">
              Current admin workspace branding
            </p>
          </div>

          <label className="space-y-2">
            <span className="font-[Lexend] text-[11px] font-medium text-[var(--admin-text-secondary)]">
              Primary domain
            </span>

            <div className="relative">
              <Globe
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-icon)]"
              />

              <input
                value={primaryDomain}
                onChange={(event) =>
                  setPrimaryDomain(event.target.value)
                }
                className="h-11 w-full rounded-lg border pl-9 pr-3 font-[Lexend] text-[12px]"
              />
            </div>
          </label>
        </div>

        <Toggle
          enabled={dashboardBranding}
          onChange={setDashboardBranding}
          label="Use VAI SPACE branding"
          description="Apply the VAI SPACE identity across the administration interface."
        />
      </div>
    );
  }

  function renderSecuritySettings() {
    return (
      <div className="space-y-6">
        <div>
          <p className="font-[Lexend] text-[10px] uppercase tracking-[0.2em] text-[var(--admin-purple)]">
            Protection
          </p>

          <h2 className="mt-2 font-[Space_Grotesk] text-[22px] font-semibold text-[var(--admin-text)]">
            Integrations & security
          </h2>

          <p className="mt-1 font-[Lexend] text-[11px] leading-5 text-[var(--admin-text-muted)]">
            Manage connected services and administrator security
            controls.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--admin-surface-3)] text-[var(--admin-purple)]">
                <KeyRound size={16} />
              </div>

              <div>
                <p className="font-[Lexend] text-[12px] font-medium text-[var(--admin-text)]">
                  Supabase
                </p>

                <p className="mt-1 font-[Lexend] text-[10px] text-[var(--admin-success)]">
                  Connected
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--admin-surface-3)] text-[var(--admin-purple)]">
                <SlidersHorizontal size={16} />
              </div>

              <div>
                <p className="font-[Lexend] text-[12px] font-medium text-[var(--admin-text)]">
                  API access
                </p>

                <p className="mt-1 font-[Lexend] text-[10px] text-[var(--admin-text-muted)]">
                  Managed through API Hub
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Toggle
            enabled={twoFactor}
            onChange={setTwoFactor}
            label="Two-factor authentication"
            description="Require an additional verification step when administrators sign in."
          />

          <Toggle
            enabled={loginAlerts}
            onChange={setLoginAlerts}
            label="Login alerts"
            description="Notify administrators when a new login is detected."
          />

          <Toggle
            enabled={sessionProtection}
            onChange={setSessionProtection}
            label="Session protection"
            description="Apply additional controls to active administrator sessions."
          />
        </div>
      </div>
    );
  }

  function renderAuditSettings() {
    const activities = [
      {
        action: "Admin login",
        user: "Aarav Sharma",
        time: "Today, 09:12",
        type: "Security",
      },
      {
        action: "User invited",
        user: "Aarav Sharma",
        time: "Today, 08:51",
        type: "Users",
      },
      {
        action: "Settings updated",
        user: "Aarav Sharma",
        time: "Yesterday, 17:32",
        type: "Settings",
      },
      {
        action: "Content updated",
        user: "Nisha Reddy",
        time: "18 Sep 2026",
        type: "Content",
      },
    ];

    return (
      <div className="space-y-6">
        <div>
          <p className="font-[Lexend] text-[10px] uppercase tracking-[0.2em] text-[var(--admin-purple)]">
            Workspace activity
          </p>

          <h2 className="mt-2 font-[Space_Grotesk] text-[22px] font-semibold text-[var(--admin-text)]">
            Audit log
          </h2>

          <p className="mt-1 font-[Lexend] text-[11px] leading-5 text-[var(--admin-text-muted)]">
            Review important actions performed inside the admin
            workspace.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-[var(--admin-border)]">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr] border-b border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-4 py-3">
            <span className="font-[Lexend] text-[9px] uppercase tracking-[0.15em] text-[var(--admin-text-muted)]">
              Activity
            </span>

            <span className="font-[Lexend] text-[9px] uppercase tracking-[0.15em] text-[var(--admin-text-muted)]">
              User
            </span>

            <span className="font-[Lexend] text-[9px] uppercase tracking-[0.15em] text-[var(--admin-text-muted)]">
              Time
            </span>

            <span className="font-[Lexend] text-[9px] uppercase tracking-[0.15em] text-[var(--admin-text-muted)]">
              Type
            </span>
          </div>

          {activities.map((activity) => (
            <div
              key={`${activity.action}-${activity.time}`}
              className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr] border-b border-[var(--admin-border)] px-4 py-4 last:border-b-0"
            >
              <span className="font-[Lexend] text-[11px] font-medium text-[var(--admin-text)]">
                {activity.action}
              </span>

              <span className="font-[Lexend] text-[10px] text-[var(--admin-text-secondary)]">
                {activity.user}
              </span>

              <span className="font-[Lexend] text-[10px] text-[var(--admin-text-muted)]">
                {activity.time}
              </span>

              <span className="font-[Lexend] text-[10px] text-[var(--admin-purple)]">
                {activity.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderNotificationSettings() {
    return (
      <div className="space-y-6">
        <div>
          <p className="font-[Lexend] text-[10px] uppercase tracking-[0.2em] text-[var(--admin-purple)]">
            Alerts
          </p>

          <h2 className="mt-2 font-[Space_Grotesk] text-[22px] font-semibold text-[var(--admin-text)]">
            Notification preferences
          </h2>

          <p className="mt-1 font-[Lexend] text-[11px] leading-5 text-[var(--admin-text-muted)]">
            Choose which notifications should appear in your admin
            workspace.
          </p>
        </div>

        <div className="space-y-3">
          <Toggle
            enabled={emailNotifications}
            onChange={setEmailNotifications}
            label="Email notifications"
            description="Receive important workspace notifications by email."
          />

          <Toggle
            enabled={systemNotifications}
            onChange={setSystemNotifications}
            label="System notifications"
            description="Receive updates about platform and system activity."
          />

          <Toggle
            enabled={securityNotifications}
            onChange={setSecurityNotifications}
            label="Security notifications"
            description="Receive alerts about authentication and security events."
          />

          <Toggle
            enabled={userNotifications}
            onChange={setUserNotifications}
            label="User notifications"
            description="Receive updates when users are invited, changed or removed."
          />

          <Toggle
            enabled={marketingNotifications}
            onChange={setMarketingNotifications}
            label="Marketing notifications"
            description="Receive VAI SPACE product and marketing updates."
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
    <>
      <main className="min-h-[calc(100vh-78px)] bg-[var(--admin-bg)] px-6 py-8 text-[var(--admin-text)] lg:px-9">
        {/* =====================================================
            HEADER
            ===================================================== */}

        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-[Lexend] text-[9px] uppercase tracking-[0.2em] text-[var(--admin-purple)]">
                VAI SPACE
              </span>
            </div>

            <h1 className="font-[Space_Grotesk] text-[30px] font-semibold tracking-[-0.02em] text-[var(--admin-text)]">
              Settings
            </h1>

            <p className="mt-2 font-[Lexend] text-[12px] text-[var(--admin-text-muted)]">
              Manage your VAI SPACE workspace, access and preferences.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="admin-button flex h-11 items-center gap-2 rounded-lg px-4 font-[Lexend] text-[11px] font-medium"
            >
              <RefreshCw size={15} />
              Refresh
            </button>

            <button
              type="button"
              onClick={() => setShowAddSettings(true)}
              className="admin-primary-button flex h-11 items-center gap-2 rounded-lg px-4 font-[Lexend] text-[11px] font-medium"
            >
              <SlidersHorizontal size={15} />
              Add settings
            </button>
          </div>
        </div>

        {/* =====================================================
            SEARCH / FILTER
            ===================================================== */}

        <div className="mt-7 flex flex-col gap-3 md:flex-row">
          <div className="relative w-full md:max-w-[420px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-icon)]"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search settings..."
              className="admin-search h-11 w-full rounded-lg pl-10 pr-4 font-[Lexend] text-[12px]"
            />
          </div>
        </div>

        {/* =====================================================
            SETTINGS CONTENT
            ===================================================== */}

        <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(300px,0.75fr)_minmax(0,1.45fr)]">
          {/* LEFT */}
          <section className="admin-card h-fit rounded-xl p-4">
            <div className="mb-4 px-2">
              <p className="font-[Space_Grotesk] text-[15px] font-semibold text-[var(--admin-text)]">
                Workspace settings
              </p>

              <p className="mt-1 font-[Lexend] text-[10px] leading-5 text-[var(--admin-text-muted)]">
                Select a category to manage your workspace.
              </p>
            </div>

            <div className="space-y-1.5">
              {filteredSections.map((section) => {
                const active =
                  activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() =>
                      setActiveSection(section.id)
                    }
                    className={`group relative flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition-all ${
                      active
                        ? "border-[rgba(113,103,255,0.28)] bg-[rgba(113,103,255,0.08)]"
                        : "border-transparent hover:border-[var(--admin-border)] hover:bg-[var(--admin-hover)]"
                    }`}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-[#7167ff] to-[#b477ff]" />
                    )}

                    <SectionIcon type={section.id} />

                    <div className="min-w-0 flex-1">
                      <p className="font-[Lexend] text-[11px] font-medium text-[var(--admin-text)]">
                        {section.title}
                      </p>

                      <p className="mt-1 line-clamp-1 font-[Lexend] text-[9px] leading-4 text-[var(--admin-text-muted)]">
                        {section.description}
                      </p>
                    </div>

                    <ChevronRight
                      size={15}
                      className={`shrink-0 transition-transform ${
                        active
                          ? "translate-x-0 text-[var(--admin-purple)]"
                          : "text-[var(--admin-text-muted)] group-hover:translate-x-0.5"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </section>

          {/* RIGHT */}
          <section className="admin-card rounded-xl p-5 lg:p-6">
            {renderActiveSection()}

            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[var(--admin-border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-[Lexend] text-[10px] text-[var(--admin-text-muted)]">
                Changes are currently stored locally in this admin
                interface.
              </p>

              <button
                type="button"
                onClick={handleSave}
                className="admin-primary-button flex h-10 items-center justify-center gap-2 rounded-lg px-5 font-[Lexend] text-[11px] font-medium"
              >
                {saved ? (
                  <>
                    <Check size={15} />
                    Saved
                  </>
                ) : (
                  <>
                    <Save size={15} />
                    Save changes
                  </>
                )}
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* =======================================================
          ADD SETTINGS MODAL
          ======================================================= */}

      {showAddSettings && (
        <div
          className="admin-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              setShowAddSettings(false);
            }
          }}
        >
          <div className="admin-modal w-full max-w-[520px] rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(113,103,255,0.10)] text-[var(--admin-purple)]">
                  <SlidersHorizontal size={18} />
                </div>

                <h2 className="mt-4 font-[Space_Grotesk] text-[20px] font-semibold text-[var(--admin-text)]">
                  Add settings
                </h2>

                <p className="mt-1 font-[Lexend] text-[11px] leading-5 text-[var(--admin-text-muted)]">
                  Choose a settings category to configure.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddSettings(false)}
                className="rounded-lg p-2 text-[var(--admin-text-muted)] hover:bg-[var(--admin-hover)] hover:text-[var(--admin-text)]"
              >
                <X size={17} />
              </button>
            </div>

            <div className="mt-6 grid gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    setActiveSection(section.id);
                    setShowAddSettings(false);
                  }}
                  className="flex items-center gap-3 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-3 py-3 text-left hover:bg-[var(--admin-surface-3)]"
                >
                  <SectionIcon type={section.id} />

                  <div className="min-w-0 flex-1">
                    <p className="font-[Lexend] text-[11px] font-medium text-[var(--admin-text)]">
                      {section.title}
                    </p>

                    <p className="mt-1 font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
                      {section.description}
                    </p>
                  </div>

                  <ChevronRight
                    size={15}
                    className="text-[var(--admin-text-muted)]"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}