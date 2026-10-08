"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Eye,
  History,
  Mail,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Shield,
  Trash2,
  UsersRound,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type UserStatus = "Active" | "Suspended" | "Invited";
type AdminRole = "Super Admin" | "Admin" | "Editor" | "Author" | "Analyst";
type AdminTab = "Administrators" | "Access Requests" | "Roles" | "History";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  lastLogin: string | null;
  createdAt: string;
  emailConfirmed: boolean;
  providers: string[];
  pageCount: number;
  pageNames: string[];
};

type AccessRequest = {
  id: string;
  requesterId: string | null;
  name: string;
  email: string;
  requestedRole: Exclude<AdminRole, "Super Admin">;
  requestedRoleKey: string;
  requestedPages: string[];
  reason: string;
  requestedAt: string;
  reviewedAt: string | null;
  reviewNotes: string;
  status: "Pending" | "Approved" | "Rejected";
  alreadyAdministrator: boolean;
};

type RoleDefinition = {
  name: AdminRole;
  description: string;
  defaultPages: string[];
};

type AuditItem = {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
};

const PAGE_OPTIONS = [
  "Dashboard",
  "Users",
  "Content",
  "Blogs",
  "Services",
  "Apps & Products",
  "API Hub",
  "Media Library",
  "Analytics",
  "Marketing",
  "Notifications",
  "Settings",
];

const ROLE_OPTIONS: AdminRole[] = [
  "Super Admin",
  "Admin",
  "Editor",
  "Author",
  "Analyst",
];

const roleDefinitions: RoleDefinition[] = [
  {
    name: "Super Admin",
    description: "Full control over the VAI SPACE administration system.",
    defaultPages: PAGE_OPTIONS,
  },
  {
    name: "Admin",
    description: "Operational administration with explicitly assigned pages.",
    defaultPages: ["Dashboard", "Users"],
  },
  {
    name: "Editor",
    description: "Content-focused access controlled by the Super Admin.",
    defaultPages: ["Dashboard", "Content", "Blogs", "Media Library"],
  },
  {
    name: "Author",
    description: "Create and manage assigned content areas.",
    defaultPages: ["Dashboard", "Blogs"],
  },
  {
    name: "Analyst",
    description: "Reporting and analytics access only.",
    defaultPages: ["Dashboard", "Analytics"],
  },
];

const mockHistory: AuditItem[] = [
  {
    id: "history-001",
    actor: "Super Admin",
    action: "Changed role",
    target: "Editor → Author",
    time: "2026-10-07T11:20:00+05:30",
  },
  {
    id: "history-002",
    actor: "Super Admin",
    action: "Granted page access",
    target: "Blogs, Media Library",
    time: "2026-10-07T10:42:00+05:30",
  },
  {
    id: "history-003",
    actor: "Super Admin",
    action: "Approved access request",
    target: "Content Team",
    time: "2026-10-06T16:05:00+05:30",
  },
];

function formatDate(value: string | null) {
  if (!value) return "Never";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Unknown";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatShortDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Unknown";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getInitials(name: string, email: string) {
  const source = name.trim() || email.split("@")[0] || "U";
  const parts = source.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return source.slice(0, 2).toUpperCase();
}

function roleDescription(role: string) {
  return (
    roleDefinitions.find((item) => item.name === role)?.description ??
    "Access is controlled by the Super Admin."
  );
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [period, setPeriod] = useState("Last 30 days");
  const [tab, setTab] = useState<AdminTab>("Administrators");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminRole>("Editor");
  const [inviting, setInviting] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState("");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAccessPanel, setShowAccessPanel] = useState(false);
  const [accessRole, setAccessRole] = useState<AdminRole>("Editor");
  const [selectedPages, setSelectedPages] = useState<string[]>([
    "Dashboard",
    "Blogs",
  ]);
  const [workStart, setWorkStart] = useState("09:00");
  const [workEnd, setWorkEnd] = useState("18:00");
  const [accessStatus, setAccessStatus] = useState<UserStatus>("Active");
  const [accessSaved, setAccessSaved] = useState(false);
  const [accessLoading, setAccessLoading] = useState(false);
  const [accessSaving, setAccessSaving] = useState(false);
  const [accessError, setAccessError] = useState("");

  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [requestSearch, setRequestSearch] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestActionId, setRequestActionId] = useState<string | null>(null);
  const [requestError, setRequestError] = useState("");

  const [now] = useState(() => Date.now());

  const loadUsers = useCallback(async (showRefreshState = false) => {
    if (showRefreshState) setRefreshing(true);
    else setLoading(true);

    setError("");

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw new Error("Unable to read your login session.");
      }

      if (!session?.access_token) {
        throw new Error(
          "Your login session has expired. Please sign in again.",
        );
      }

      const response = await fetch("/api/admin/administrators", {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to load users.");
      }

      const administrators = Array.isArray(result.administrators)
        ? result.administrators
        : [];

      const mappedUsers: User[] = administrators.map((admin: {
        id: string;
        name: string;
        email: string | null;
        status: string;
        role: { name?: string; key?: string } | null;
        lastLogin: string | null;
        createdAt: string;
        user?: { email?: string | null; email_confirmed_at?: string | null } | null;
        pages?: Array<{ name?: string; page_key?: string }>;
      }) => {
        const normalizedRole =
          admin.role?.name === "Super Admin" || admin.role?.key === "SUPER_ADMIN"
            ? "Super Admin"
            : admin.role?.name === "Admin" || admin.role?.key === "ADMIN"
              ? "Admin"
              : admin.role?.name === "Editor" || admin.role?.key === "EDITOR"
                ? "Editor"
                : admin.role?.name === "Author" || admin.role?.key === "AUTHOR"
                  ? "Author"
                  : "Analyst";

        const normalizedStatus: UserStatus =
          admin.status === "suspended"
            ? "Suspended"
            : admin.status === "invited"
              ? "Invited"
              : "Active";

        const pageNames = Array.isArray(admin.pages)
          ? admin.pages
              .map((page) => page.name ?? page.page_key ?? "")
              .filter(Boolean)
          : [];

        return {
          id: admin.id,
          name: admin.name || admin.email || "Administrator",
          email: admin.email || admin.user?.email || "",
          role: normalizedRole,
          status: normalizedStatus,
          lastLogin: admin.lastLogin ?? null,
          createdAt: admin.createdAt,
          emailConfirmed: Boolean(admin.user?.email_confirmed_at),
          providers: [],
          pageCount: pageNames.length,
          pageNames,
        };
      });

      setUsers(mappedUsers);
    } catch (loadError) {
      console.error("Users loading error:", loadError);
      setUsers([]);
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load users.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const loadRequests = useCallback(async () => {
    setRequestLoading(true);
    setRequestError("");

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        throw new Error("Your login session has expired. Please sign in again.");
      }

      const response = await fetch("/api/admin/access-requests", {
        method: "GET",
        cache: "no-store",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to load access requests.");
      }

      const mappedRequests: AccessRequest[] = (
        Array.isArray(result.requests) ? result.requests : []
      ).map((request: {
        id: string;
        requesterId?: string | null;
        name?: string;
        email?: string;
        requestedRole?: string;
        requestedRoleKey?: string;
        requestedPages?: Array<{ name?: string }>;
        reason?: string;
        createdAt: string;
        reviewedAt?: string | null;
        reviewNotes?: string;
        status?: string;
        alreadyAdministrator?: boolean;
      }) => ({
        id: request.id,
        requesterId: request.requesterId ?? null,
        name: request.name || request.email || "User",
        email: request.email || "",
        requestedRole: (
          ["Admin", "Editor", "Author", "Analyst"].includes(
            request.requestedRole || "",
          )
            ? request.requestedRole
            : "Admin"
        ) as Exclude<AdminRole, "Super Admin">,
        requestedRoleKey: request.requestedRoleKey || "ADMIN",
        requestedPages: Array.isArray(request.requestedPages)
          ? request.requestedPages
              .map((page) => page.name ?? "")
              .filter(Boolean)
          : [],
        reason: request.reason || "",
        requestedAt: request.createdAt,
        reviewedAt: request.reviewedAt ?? null,
        reviewNotes: request.reviewNotes || "",
        status:
          request.status === "Approved" || request.status === "Rejected"
            ? request.status
            : "Pending",
        alreadyAdministrator: Boolean(request.alreadyAdministrator),
      }));

      setRequests(mappedRequests);
    } catch (loadError) {
      console.error("Access requests loading error:", loadError);
      setRequests([]);
      setRequestError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load access requests.",
      );
    } finally {
      setRequestLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadUsers();
      void loadRequests();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadUsers, loadRequests]);

  const filteredUsers = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    let periodStart: number | null = null;

    if (period === "Last 7 days") {
      periodStart = now - 7 * 24 * 60 * 60 * 1000;
    }

    if (period === "Last 30 days") {
      periodStart = now - 30 * 24 * 60 * 60 * 1000;
    }

    if (period === "Last 90 days") {
      periodStart = now - 90 * 24 * 60 * 60 * 1000;
    }

    return users.filter((user) => {
      const matchesSearch =
        !searchValue ||
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.role.toLowerCase().includes(searchValue) ||
        user.status.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "All statuses" || user.status === status;

      const lastLoginTime = user.lastLogin
        ? new Date(user.lastLogin).getTime()
        : null;

      const matchesPeriod =
        period === "All time" ||
        periodStart === null ||
        lastLoginTime === null ||
        lastLoginTime >= periodStart;

      return matchesSearch && matchesStatus && matchesPeriod;
    });
  }, [users, search, status, period, now]);

  const administrators = users.filter(
    (user) =>
      user.role === "Admin" ||
      user.role === "Editor" ||
      user.role === "Author" ||
      user.role === "Analyst" ||
      user.role === "Super Admin",
  );

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending",
  );

  const activeAdmins = administrators.filter(
    (user) => user.status === "Active",
  );

  const suspendedAdmins = administrators.filter(
    (user) => user.status === "Suspended",
  );

  const filteredRequests = requests.filter((request) => {
    const value = requestSearch.toLowerCase().trim();

    return (
      !value ||
      request.name.toLowerCase().includes(value) ||
      request.email.toLowerCase().includes(value) ||
      request.requestedRole.toLowerCase().includes(value)
    );
  });

  function openInviteModal() {
    setEmail("");
    setRole("Editor");
    setInviteError("");
    setInviteSuccess("");
    setShowInviteModal(true);
  }

  function closeInviteModal() {
    if (inviting) return;

    setShowInviteModal(false);
    setInviteError("");
    setInviteSuccess("");
  }

  async function handleInvite(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setInviteError("Please enter an email address.");
      return;
    }

    if (!role) {
      setInviteError("Please select a role.");
      return;
    }

    setInviting(true);
    setInviteError("");
    setInviteSuccess("");

    try {
      const response = await fetch("/api/admin/invite-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          role,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to send the invitation.",
        );
      }

      setInviteSuccess(`Invitation sent to ${cleanEmail}.`);
      setEmail("");
      await loadUsers(true);
    } catch (inviteLoadError) {
      console.error("Invitation error:", inviteLoadError);

      setInviteError(
        inviteLoadError instanceof Error
          ? inviteLoadError.message
          : "Unable to send the invitation.",
      );
    } finally {
      setInviting(false);
    }
  }

  async function openAccessPanel(user: User) {
    setSelectedUser(user);
    setShowAccessPanel(true);
    setAccessLoading(true);
    setAccessError("");
    setAccessSaved(false);

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        throw new Error("Your login session has expired. Please sign in again.");
      }

      const response = await fetch(`/api/admin/administrators/${user.id}`, {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to load administrator access.");
      }

      const administrator = result.administrator;
      const loadedRole = ROLE_OPTIONS.includes(administrator?.role?.name as AdminRole)
        ? (administrator.role.name as AdminRole)
        : "Editor";

      setAccessRole(loadedRole);
      setAccessStatus(
        administrator?.status === "suspended"
          ? "Suspended"
          : administrator?.status === "invited"
            ? "Invited"
            : "Active",
      );

      if (loadedRole === "Super Admin") {
        setSelectedPages(PAGE_OPTIONS);
      } else {
        setSelectedPages(
          Array.isArray(administrator?.pages)
            ? administrator.pages.map((page: { name: string }) => page.name)
            : [],
        );
      }

      const workHours = Array.isArray(administrator?.workHours)
        ? administrator.workHours
        : [];

      const firstSchedule = workHours.find(
        (item: { is_enabled?: boolean }) => item.is_enabled !== false,
      );

      setWorkStart(firstSchedule?.start_time?.slice(0, 5) || "09:00");
      setWorkEnd(firstSchedule?.end_time?.slice(0, 5) || "18:00");
    } catch (loadError) {
      console.error("Administrator access loading error:", loadError);
      setAccessError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load administrator access.",
      );
    } finally {
      setAccessLoading(false);
    }
  }

  function closeAccessPanel() {
    setShowAccessPanel(false);
    setSelectedUser(null);
    setAccessSaved(false);
  }

  function togglePage(page: string) {
    if (accessRole === "Super Admin") return;

    setSelectedPages((current) =>
      current.includes(page)
        ? current.filter((item) => item !== page)
        : [...current, page],
    );
    setAccessSaved(false);
  }

  function handleRoleChange(nextRole: AdminRole) {
    setAccessRole(nextRole);

    if (nextRole === "Super Admin") {
      setSelectedPages(PAGE_OPTIONS);
    } else {
      const definition = roleDefinitions.find(
        (item) => item.name === nextRole,
      );
      setSelectedPages(definition?.defaultPages ?? ["Dashboard"]);
    }

    setAccessSaved(false);
  }

  async function saveAccess() {
    if (!selectedUser || accessSaving) return;

    setAccessSaving(true);
    setAccessError("");
    setAccessSaved(false);

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        throw new Error("Your login session has expired. Please sign in again.");
      }

      const response = await fetch(
        `/api/admin/administrators/${selectedUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            role: accessRole,
            status: accessStatus,
            pageKeys: PAGE_OPTIONS.filter((page) => selectedPages.includes(page)).map(
              (page) =>
                ({
                  Dashboard: "dashboard",
                  Users: "users",
                  Content: "content",
                  Blogs: "blogs",
                  Services: "services",
                  "Apps & Products": "apps-products",
                  "API Hub": "api-hub",
                  "Media Library": "media",
                  Analytics: "analytics",
                  Marketing: "marketing",
                  Notifications: "notifications",
                  Settings: "settings",
                } as Record<string, string>)[page],
            ),
            workStart,
            workEnd,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to save administrator access.");
      }

      setAccessSaved(true);
      await loadUsers(true);
    } catch (saveError) {
      console.error("Administrator access save error:", saveError);
      setAccessError(
        saveError instanceof Error
          ? saveError.message
          : "Unable to save administrator access.",
      );
    } finally {
      setAccessSaving(false);
    }
  }

  async function reviewRequest(
    requestId: string,
    action: "approve" | "reject",
  ) {
    if (requestActionId) return;

    setRequestActionId(requestId);
    setRequestError("");

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        throw new Error("Your login session has expired. Please sign in again.");
      }

      const selectedRequest = requests.find((item) => item.id === requestId);
      if (!selectedRequest) throw new Error("Access request not found.");

      const pageKeyMap: Record<string, string> = {
        Dashboard: "dashboard",
        Users: "users",
        Content: "content",
        Blogs: "blogs",
        Services: "services",
        "Apps & Products": "apps-products",
        "API Hub": "api-hub",
        "Media Library": "media",
        Analytics: "analytics",
        Marketing: "marketing",
        Notifications: "notifications",
        Settings: "settings",
      };

      const response = await fetch("/api/admin/access-requests", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          requestId,
          action,
          roleKey: selectedRequest.requestedRoleKey,
          pageKeys: selectedRequest.requestedPages
            .map((page) => pageKeyMap[page])
            .filter(Boolean),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to review access request.");
      }

      await loadRequests();

      if (action === "approve") {
        await loadUsers(true);
      }
    } catch (reviewError) {
      console.error("Access request review error:", reviewError);
      setRequestError(
        reviewError instanceof Error
          ? reviewError.message
          : "Unable to review access request.",
      );
    } finally {
      setRequestActionId(null);
    }
  }

  function approveRequest(requestId: string) {
    void reviewRequest(requestId, "approve");
  }

  function rejectRequest(requestId: string) {
    void reviewRequest(requestId, "reject");
  }

  return (
    <>
      <main className="min-h-[calc(100vh-78px)] bg-[var(--admin-bg)] px-6 py-7 text-[var(--admin-text)] transition-colors duration-300 lg:px-9">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-2 font-[Space_Grotesk] text-[9px] font-medium uppercase tracking-[0.24em] text-[var(--admin-purple)]">
              VAI SPACE
            </div>

            <h1 className="font-[Space_Grotesk] text-[31px] font-semibold leading-none tracking-[-0.035em]">
              Users & Administration
            </h1>

            <p className="mt-2 max-w-[560px] font-[Lexend] text-[12px] leading-5 text-[var(--admin-text-secondary)]">
              Manage administrators, roles, page access and workspace
              administration.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:pt-5">
            <button
              type="button"
              onClick={() => {
                void loadUsers(true);
                void loadRequests();
              }}
              disabled={refreshing || requestLoading}
              className="admin-button flex h-[38px] items-center gap-1.5 rounded-xl px-3 font-[Lexend] text-[11px] font-medium transition-all hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={14}
                strokeWidth={1.8}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={openInviteModal}
              className="flex h-[38px] items-center gap-1.5 rounded-xl bg-[var(--admin-purple)] px-3.5 font-[Lexend] text-[11px] font-medium text-white shadow-[0_8px_24px_rgba(113,103,255,0.18)] transition-all hover:-translate-y-px hover:bg-[var(--admin-purple-light)]"
            >
              <Plus size={15} strokeWidth={2} />
              Add Admin
            </button>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
          <StatCard
            label="Administrators"
            value={administrators.length}
            icon={<UsersRound size={17} strokeWidth={1.8} />}
          />
          <StatCard
            label="Pending Requests"
            value={pendingRequests.length}
            icon={<Clock3 size={17} strokeWidth={1.8} />}
          />
          <StatCard
            label="Active"
            value={activeAdmins.length}
            icon={<CheckCircle2 size={17} strokeWidth={1.8} />}
          />
          <StatCard
            label="Suspended"
            value={suspendedAdmins.length}
            icon={<Shield size={17} strokeWidth={1.8} />}
          />
        </div>

        <div className="mt-7 border-b border-[var(--admin-border)]">
          <div className="flex gap-6 overflow-x-auto">
            {(
              [
                "Administrators",
                "Access Requests",
                "Roles",
                "History",
              ] as AdminTab[]
            ).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`relative whitespace-nowrap pb-3 font-[Lexend] text-[11px] font-medium transition-colors ${
                  tab === item
                    ? "text-[var(--admin-text)]"
                    : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text-secondary)]"
                }`}
              >
                {item}
                {item === "Access Requests" &&
                  pendingRequests.length > 0 && (
                    <span className="ml-2 rounded-full bg-[var(--admin-purple)]/10 px-1.5 py-0.5 text-[9px] text-[var(--admin-purple)]">
                      {pendingRequests.length}
                    </span>
                  )}

                {tab === item && (
                  <span className="absolute inset-x-0 bottom-[-1px] h-px bg-[var(--admin-purple)]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {tab === "Administrators" && (
          <>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-[310px]">
                <Search
                  size={15}
                  strokeWidth={1.8}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-icon)]"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search administrators..."
                  className="h-[40px] w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-input)] pl-9 pr-3 font-[Lexend] text-[11px] text-[var(--admin-text)] outline-none transition-all placeholder:text-[var(--admin-text-muted)] hover:border-[var(--admin-border-strong)] focus:border-[var(--admin-purple)] focus:ring-2 focus:ring-[var(--admin-purple)]/10"
                />
              </div>

              <SelectFilter
                value={status}
                onChange={setStatus}
                options={[
                  "All statuses",
                  "Active",
                  "Invited",
                  "Suspended",
                ]}
              />

              <SelectFilter
                value={period}
                onChange={setPeriod}
                options={[
                  "Last 30 days",
                  "Last 7 days",
                  "Last 90 days",
                  "All time",
                ]}
              />
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-3 py-2.5">
                <AlertCircle
                  size={15}
                  className="mt-0.5 shrink-0 text-red-500"
                />
                <div>
                  <p className="font-[Lexend] text-[11px] font-medium text-red-600 dark:text-red-300">
                    Unable to load users
                  </p>
                  <p className="mt-0.5 font-[Lexend] text-[10px] leading-4 text-red-600/80 dark:text-red-300/80">
                    {error}
                  </p>
                </div>
              </div>
            )}

            <div className="admin-card mt-5 overflow-hidden rounded-2xl border shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--admin-border)] bg-[var(--admin-surface-2)]">
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Page Access</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead align="right">Actions</TableHead>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-16 text-center">
                          <RefreshCw
                            size={18}
                            className="mx-auto animate-spin text-[var(--admin-purple)]"
                          />
                          <p className="mt-3 font-[Lexend] text-[11px] text-[var(--admin-text-secondary)]">
                            Loading users...
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b border-[var(--admin-border)] transition-colors last:border-b-0 hover:bg-[var(--admin-hover)]"
                        >
                          <td className="px-4 py-[18px]">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--admin-border-strong)] bg-[var(--admin-surface-3)] font-[Space_Grotesk] text-[10px] font-semibold text-[var(--admin-purple)]">
                                {getInitials(user.name, user.email)}
                              </div>
                              <div className="min-w-0">
                                <p className="truncate font-[Lexend] text-[13px] font-medium">
                                  {user.name}
                                </p>
                                <p className="mt-0.5 truncate font-[Lexend] text-[10px] text-[var(--admin-text-muted)]">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-[18px]">
                            <span className="inline-flex rounded-full border border-[var(--admin-border)] bg-[var(--admin-surface-3)] px-2.5 py-[5px] font-[Lexend] text-[10px] font-medium text-[var(--admin-text-secondary)]">
                              {user.role}
                            </span>
                          </td>

                          <td className="px-4 py-[18px]">
                            <StatusBadge status={user.status} />
                          </td>

                          <td className="px-4 py-[18px]">
                            <span className="font-[Lexend] text-[12px] text-[var(--admin-text-secondary)]">
                              {formatDate(user.lastLogin)}
                            </span>
                          </td>

                          <td className="px-4 py-[18px]">
                            <span className="font-[Lexend] text-[11px] text-[var(--admin-text-secondary)]">
                              {user.role === "Super Admin"
                                ? "All pages"
                                : `${user.pageCount} / ${PAGE_OPTIONS.length} pages`}
                            </span>
                          </td>

                          <td className="px-4 py-[18px]">
                            <span className="font-[Lexend] text-[12px] text-[var(--admin-text-secondary)]">
                              {formatShortDate(user.createdAt)}
                            </span>
                          </td>

                          <td className="px-4 py-[18px]">
                            <div className="flex justify-end gap-1.5">
                              <button
                                type="button"
                                title={`Manage ${user.name}`}
                                onClick={() => openAccessPanel(user)}
                                className="admin-button flex h-[34px] items-center gap-1.5 rounded-lg px-2.5 font-[Lexend] text-[10px] transition-all hover:border-[var(--admin-purple)] hover:text-[var(--admin-purple)]"
                              >
                                <Pencil size={14} strokeWidth={1.8} />
                                Manage
                              </button>

                              <button
                                type="button"
                                title={`View ${user.name}`}
                                className="admin-button flex h-[34px] w-[34px] items-center justify-center rounded-lg transition-all hover:border-[var(--admin-purple)] hover:text-[var(--admin-purple)]"
                              >
                                <Eye size={15} strokeWidth={1.8} />
                              </button>

                              <button
                                type="button"
                                title={`Delete ${user.name}`}
                                className="admin-button flex h-[34px] w-[34px] items-center justify-center rounded-lg transition-all hover:border-red-400/40 hover:bg-red-500/[0.06] hover:text-red-500"
                              >
                                <Trash2 size={15} strokeWidth={1.8} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}

                    {!loading && filteredUsers.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-14 text-center font-[Lexend] text-[12px] text-[var(--admin-text-muted)]"
                        >
                          No administrators found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-3 font-[Lexend] text-[10px] leading-4 text-[var(--admin-text-muted)]">
              Administrator identity, roles, status, page access and last-login
              data are synchronized with the Super Admin control system.
            </p>
          </>
        )}

        {tab === "Access Requests" && (
          <section className="mt-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-[Space_Grotesk] text-[18px] font-semibold">
                  Access Requests
                </h2>
                <p className="mt-1 font-[Lexend] text-[11px] text-[var(--admin-text-muted)]">
                  Review requests before assigning administrator access.
                </p>
              </div>

              <div className="relative w-full sm:w-[280px]">
                <Search
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-icon)]"
                />
                <input
                  value={requestSearch}
                  onChange={(event) => setRequestSearch(event.target.value)}
                  placeholder="Search requests..."
                  className="h-[38px] w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-input)] pl-9 pr-3 font-[Lexend] text-[11px] outline-none focus:border-[var(--admin-purple)]"
                />
              </div>
            </div>

            {requestError && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-3 py-2.5">
                <AlertCircle size={15} className="mt-0.5 shrink-0 text-red-500" />
                <p className="font-[Lexend] text-[10px] leading-4 text-red-600 dark:text-red-300">
                  {requestError}
                </p>
              </div>
            )}

            <div className="mt-5 grid gap-3">
              {requestLoading ? (
                <div className="admin-card rounded-2xl border px-5 py-14 text-center">
                  <RefreshCw
                    size={18}
                    className="mx-auto animate-spin text-[var(--admin-purple)]"
                  />
                  <p className="mt-3 font-[Lexend] text-[11px] text-[var(--admin-text-muted)]">
                    Loading access requests...
                  </p>
                </div>
              ) : filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="admin-card rounded-2xl border p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--admin-border)] bg-[var(--admin-surface-3)] font-[Space_Grotesk] text-[11px] font-semibold text-[var(--admin-purple)]">
                        {getInitials(request.name, request.email)}
                      </div>

                      <div>
                        <p className="font-[Lexend] text-[13px] font-medium">
                          {request.name}
                        </p>
                        <p className="mt-0.5 font-[Lexend] text-[10px] text-[var(--admin-text-muted)]">
                          {request.email}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {request.requestedPages.map((page) => (
                            <span
                              key={page}
                              className="rounded-full border border-[var(--admin-border)] bg-[var(--admin-surface-3)] px-2 py-1 font-[Lexend] text-[9px] text-[var(--admin-text-secondary)]"
                            >
                              {page}
                            </span>
                          ))}
                        </div>
                        {request.reason && (
                          <p className="mt-3 max-w-[620px] font-[Lexend] text-[10px] leading-5 text-[var(--admin-text-muted)]">
                            {request.reason}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:min-w-[230px] lg:items-end">
                      <div className="text-left lg:text-right">
                        <p className="font-[Lexend] text-[10px] text-[var(--admin-text-muted)]">
                          Requested role
                        </p>
                        <p className="mt-1 font-[Space_Grotesk] text-[13px] font-semibold">
                          {request.requestedRole}
                        </p>
                        <p className="mt-1 font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
                          {formatDate(request.requestedAt)}
                        </p>
                      </div>

                      {request.status === "Pending" ? (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => rejectRequest(request.id)}
                            disabled={requestActionId === request.id}
                            className="admin-button h-[34px] rounded-lg px-3 font-[Lexend] text-[10px] font-medium hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {requestActionId === request.id ? "Processing..." : "Reject"}
                          </button>
                          <button
                            type="button"
                            onClick={() => approveRequest(request.id)}
                            disabled={requestActionId === request.id}
                            className="h-[34px] rounded-lg bg-[var(--admin-purple)] px-3 font-[Lexend] text-[10px] font-medium text-white hover:bg-[var(--admin-purple-light)] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {requestActionId === request.id ? "Processing..." : "Review / Accept"}
                          </button>
                        </div>
                      ) : (
                        <span className="font-[Lexend] text-[10px] text-[var(--admin-text-muted)]">
                          {request.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filteredRequests.length === 0 && (
                <div className="admin-card rounded-2xl border px-5 py-14 text-center">
                  <p className="font-[Lexend] text-[12px] text-[var(--admin-text-muted)]">
                    No access requests found.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {tab === "Roles" && (
          <section className="mt-5">
            <div>
              <h2 className="font-[Space_Grotesk] text-[18px] font-semibold">
                Roles
              </h2>
              <p className="mt-1 font-[Lexend] text-[11px] text-[var(--admin-text-muted)]">
                Roles describe responsibilities. Final page access is assigned
                separately by the Super Admin.
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {roleDefinitions.map((item) => (
                <div
                  key={item.name}
                  className="admin-card rounded-2xl border p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-[Space_Grotesk] text-[16px] font-semibold">
                        {item.name}
                      </h3>
                      <p className="mt-2 font-[Lexend] text-[10px] leading-5 text-[var(--admin-text-muted)]">
                        {item.description}
                      </p>
                    </div>

                    <Shield
                      size={17}
                      strokeWidth={1.7}
                      className="shrink-0 text-[var(--admin-purple)]"
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.defaultPages.map((page) => (
                      <span
                        key={page}
                        className="rounded-full border border-[var(--admin-border)] bg-[var(--admin-surface-3)] px-2 py-1 font-[Lexend] text-[9px] text-[var(--admin-text-secondary)]"
                      >
                        {page}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "History" && (
          <section className="mt-5">
            <div>
              <h2 className="font-[Space_Grotesk] text-[18px] font-semibold">
                Administration History
              </h2>
              <p className="mt-1 font-[Lexend] text-[11px] text-[var(--admin-text-muted)]">
                Administrative actions will eventually be stored in the audit
                history.
              </p>
            </div>

            <div className="admin-card mt-5 overflow-hidden rounded-2xl border shadow-sm">
              {mockHistory.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-4 px-5 py-4 ${
                    index !== mockHistory.length - 1
                      ? "border-b border-[var(--admin-border)]"
                      : ""
                  }`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-3)] text-[var(--admin-purple)]">
                    <History size={15} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <p className="font-[Lexend] text-[11px] font-medium">
                      {item.actor}{" "}
                      <span className="font-normal text-[var(--admin-text-muted)]">
                        {item.action}
                      </span>
                    </p>
                    <p className="mt-1 font-[Lexend] text-[10px] text-[var(--admin-text-secondary)]">
                      {item.target}
                    </p>
                    <p className="mt-1 font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
                      {formatDate(item.time)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {showAccessPanel && selectedUser && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-end bg-black/50 px-0 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeAccessPanel();
            }
          }}
        >
          <aside className="admin-modal h-full w-full max-w-[540px] overflow-y-auto border-l border-[var(--admin-border)] shadow-[-20px_0_80px_rgba(0,0,0,0.28)]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--admin-border)] bg-[var(--admin-bg)] px-6 py-5">
              <div>
                <div className="font-[Space_Grotesk] text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--admin-purple)]">
                  Administration
                </div>
                <h2 className="mt-1 font-[Space_Grotesk] text-[20px] font-semibold">
                  Admin Access
                </h2>
              </div>

              <button
                type="button"
                onClick={closeAccessPanel}
                className="admin-button flex h-9 w-9 items-center justify-center rounded-xl"
              >
                <X size={18} strokeWidth={1.8} />
              </button>
            </div>

            <div className="space-y-6 px-6 py-6">
              {accessLoading && (
                <div className="flex items-center gap-2 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-3 py-2.5">
                  <RefreshCw size={14} className="animate-spin text-[var(--admin-purple)]" />
                  <p className="font-[Lexend] text-[10px] text-[var(--admin-text-secondary)]">
                    Loading access configuration...
                  </p>
                </div>
              )}

              {accessError && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-3 py-2.5">
                  <AlertCircle size={15} className="mt-0.5 shrink-0 text-red-500" />
                  <p className="font-[Lexend] text-[10px] leading-4 text-red-600 dark:text-red-300">
                    {accessError}
                  </p>
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--admin-border-strong)] bg-[var(--admin-surface-3)] font-[Space_Grotesk] text-[12px] font-semibold text-[var(--admin-purple)]">
                  {getInitials(selectedUser.name, selectedUser.email)}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-[Lexend] text-[13px] font-medium">
                    {selectedUser.name}
                  </p>
                  <p className="mt-0.5 truncate font-[Lexend] text-[10px] text-[var(--admin-text-muted)]">
                    {selectedUser.email}
                  </p>
                </div>
              </div>

              <div>
                <FieldLabel>Role</FieldLabel>

                <div className="relative">
                  <select
                    value={accessRole}
                    onChange={(event) =>
                      handleRoleChange(event.target.value as AdminRole)
                    }
                    className="h-[46px] w-full appearance-none rounded-xl border border-[var(--admin-border-strong)] bg-[var(--admin-input)] px-3.5 pr-10 font-[Lexend] text-[11px] text-[var(--admin-text)] outline-none focus:border-[var(--admin-purple)]"
                  >
                    {ROLE_OPTIONS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-icon)]"
                  />
                </div>

                <p className="mt-2 font-[Lexend] text-[10px] leading-4 text-[var(--admin-text-muted)]">
                  {roleDescription(accessRole)}
                </p>
              </div>

              <div>
                <div className="flex items-end justify-between">
                  <div>
                    <FieldLabel>Page Access</FieldLabel>
                    <p className="mt-1 font-[Lexend] text-[10px] text-[var(--admin-text-muted)]">
                      Select only the pages this administrator needs.
                    </p>
                  </div>

                  {accessRole === "Super Admin" && (
                    <span className="font-[Lexend] text-[9px] text-[var(--admin-purple)]">
                      Full access
                    </span>
                  )}
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {PAGE_OPTIONS.map((page) => {
                    const checked = selectedPages.includes(page);

                    return (
                      <label
                        key={page}
                        className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-colors ${
                          checked
                            ? "border-[var(--admin-purple)]/35 bg-[var(--admin-purple)]/[0.06]"
                            : "border-[var(--admin-border)] bg-[var(--admin-surface-2)]"
                        } ${
                          accessRole === "Super Admin"
                            ? "cursor-not-allowed opacity-90"
                            : "hover:border-[var(--admin-border-strong)]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={accessRole === "Super Admin"}
                          onChange={() => togglePage(page)}
                          className="h-3.5 w-3.5 accent-[var(--admin-purple)]"
                        />
                        <span className="font-[Lexend] text-[10px] text-[var(--admin-text-secondary)]">
                          {page}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <FieldLabel>Work Hours</FieldLabel>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <TimeInput
                    label="Start"
                    value={workStart}
                    onChange={setWorkStart}
                  />
                  <TimeInput
                    label="End"
                    value={workEnd}
                    onChange={setWorkEnd}
                  />
                </div>
                <p className="mt-2 font-[Lexend] text-[10px] leading-4 text-[var(--admin-text-muted)]">
                  Working-hour enforcement will be connected in the security
                  phase.
                </p>
              </div>

              <div>
                <FieldLabel>Status</FieldLabel>

                <div className="relative mt-2">
                  <select
                    value={accessStatus}
                    onChange={(event) =>
                      setAccessStatus(event.target.value as UserStatus)
                    }
                    className="h-[46px] w-full appearance-none rounded-xl border border-[var(--admin-border-strong)] bg-[var(--admin-input)] px-3.5 pr-10 font-[Lexend] text-[11px] text-[var(--admin-text)] outline-none focus:border-[var(--admin-purple)]"
                  >
                    <option>Active</option>
                    <option>Invited</option>
                    <option>Suspended</option>
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-icon)]"
                  />
                </div>
              </div>

              {accessSaved && (
                <div className="flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2.5">
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 text-emerald-500"
                  />
                  <p className="font-[Lexend] text-[10px] leading-4 text-emerald-600 dark:text-emerald-300">
                    Access configuration saved successfully to Supabase.
                  </p>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 flex justify-end gap-2 border-t border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-6 py-4">
              <button
                type="button"
                onClick={closeAccessPanel}
                className="admin-button h-[40px] rounded-xl px-4 font-[Lexend] text-[10px] font-medium"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => void saveAccess()}
                disabled={accessSaving || accessLoading}
                className="h-[40px] rounded-xl bg-[var(--admin-purple)] px-5 font-[Lexend] text-[10px] font-medium text-white shadow-[0_8px_22px_rgba(113,103,255,0.18)] hover:bg-[var(--admin-purple-light)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {accessSaving ? "Saving..." : "Save Access"}
              </button>
            </div>
          </aside>
        </div>
      )}

      {showInviteModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeInviteModal();
            }
          }}
        >
          <div className="admin-modal w-full max-w-[700px] overflow-hidden rounded-2xl border shadow-[0_30px_100px_rgba(0,0,0,0.22)]">
            <div className="flex h-[82px] items-center justify-between border-b border-[var(--admin-border)] px-6">
              <div>
                <h2 className="font-[Space_Grotesk] text-[19px] font-semibold">
                  Add Administrator
                </h2>
                <p className="mt-1 font-[Lexend] text-[10px] text-[var(--admin-text-muted)]">
                  Invite a new administrator to VAI SPACE.
                </p>
              </div>

              <button
                type="button"
                onClick={closeInviteModal}
                disabled={inviting}
                className="admin-button flex h-10 w-10 items-center justify-center rounded-xl disabled:opacity-50"
              >
                <X size={20} strokeWidth={1.8} />
              </button>
            </div>

            <form onSubmit={handleInvite}>
              <div className="px-6 py-6">
                <div>
                  <FieldLabel>Email address</FieldLabel>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter administrator's email"
                    autoComplete="email"
                    autoFocus
                    disabled={inviting}
                    className="mt-2 h-[48px] w-full rounded-xl border border-[var(--admin-border-strong)] bg-[var(--admin-input)] px-3.5 font-[Lexend] text-[12px] outline-none placeholder:text-[var(--admin-text-muted)] focus:border-[var(--admin-purple)]"
                  />
                </div>

                <div className="mt-5">
                  <FieldLabel>Initial role</FieldLabel>

                  <div className="relative mt-2">
                    <select
                      value={role}
                      onChange={(event) =>
                        setRole(event.target.value as AdminRole)
                      }
                      disabled={inviting}
                      className="h-[48px] w-full appearance-none rounded-xl border border-[var(--admin-border-strong)] bg-[var(--admin-input)] px-3.5 pr-10 font-[Lexend] text-[12px] outline-none focus:border-[var(--admin-purple)]"
                    >
                      {ROLE_OPTIONS.filter(
                        (item) => item !== "Super Admin",
                      ).map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-icon)]"
                    />
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-3.5 py-3">
                  <p className="font-[Lexend] text-[10px] font-medium">
                    Important
                  </p>
                  <p className="mt-1 font-[Lexend] text-[9px] leading-4 text-[var(--admin-text-muted)]">
                    The role does not automatically grant every page. The
                    Super Admin will configure exact page access in the Admin
                    Access panel.
                  </p>
                </div>

                {inviteError && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-3 py-2.5">
                    <AlertCircle
                      size={15}
                      className="mt-0.5 shrink-0 text-red-500"
                    />
                    <p className="font-[Lexend] text-[11px] leading-4 text-red-600 dark:text-red-300">
                      {inviteError}
                    </p>
                  </div>
                )}

                {inviteSuccess && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2.5">
                    <CheckCircle2
                      size={15}
                      className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300"
                    />
                    <p className="font-[Lexend] text-[11px] leading-4 text-emerald-700 dark:text-emerald-200">
                      {inviteSuccess}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-6 py-4">
                <button
                  type="button"
                  onClick={closeInviteModal}
                  disabled={inviting}
                  className="admin-button h-[42px] rounded-xl px-4 font-[Lexend] text-[11px] font-medium disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={inviting || !email.trim()}
                  className="flex h-[42px] items-center gap-2 rounded-xl bg-[var(--admin-purple)] px-5 font-[Lexend] text-[11px] font-medium text-white shadow-[0_8px_22px_rgba(113,103,255,0.18)] hover:bg-[var(--admin-purple-light)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {inviting ? (
                    <>
                      <RefreshCw size={15} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail size={15} />
                      Send invitation
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="admin-card rounded-2xl border p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="font-[Lexend] text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--admin-text-muted)]">
          {label}
        </div>
        <div className="text-[var(--admin-purple)]">{icon}</div>
      </div>
      <div className="mt-3 font-[Space_Grotesk] text-[25px] font-semibold tracking-[-0.03em]">
        {value}
      </div>
    </div>
  );
}

function TableHead({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-4 py-3.5 text-${align} font-[Lexend] text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--admin-text-muted)]`}
    >
      {children}
    </th>
  );
}

function SelectFilter({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="relative w-full sm:w-[145px]">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[40px] w-full appearance-none rounded-xl border border-[var(--admin-border)] bg-[var(--admin-input)] px-3 pr-8 font-[Lexend] text-[11px] text-[var(--admin-text-secondary)] outline-none focus:border-[var(--admin-purple)]"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown
        size={14}
        strokeWidth={1.8}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--admin-icon)]"
      />
    </div>
  );
}

function StatusBadge({ status }: { status: UserStatus }) {
  const classes =
    status === "Active"
      ? "text-emerald-600 dark:text-emerald-300"
      : status === "Invited"
        ? "text-[var(--admin-purple)]"
        : "text-amber-600 dark:text-amber-300";

  const dot =
    status === "Active"
      ? "bg-emerald-500"
      : status === "Invited"
        ? "bg-[var(--admin-purple)]"
        : "bg-amber-500";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-[Lexend] text-[11px] font-medium ${classes}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block font-[Lexend] text-[11px] font-medium text-[var(--admin-text)]">
      {children}
    </label>
  );
}

function TimeInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
        {label}
      </span>
      <input
        type="time"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[44px] w-full rounded-xl border border-[var(--admin-border-strong)] bg-[var(--admin-input)] px-3 font-[Lexend] text-[11px] text-[var(--admin-text)] outline-none focus:border-[var(--admin-purple)]"
      />
    </label>
  );
}
