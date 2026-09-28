"use client";

import { useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  X,
  Mail,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type User = {
  id: number;
  name: string;
  role: string;
  status: "Active" | "Suspended" | "Invited";
  lastLogin: string;
};

const demoUsers: User[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Admin",
    status: "Active",
    lastLogin: "Today, 09:12",
  },
  {
    id: 2,
    name: "Nisha Reddy",
    role: "Editor",
    status: "Active",
    lastLogin: "Today, 08:44",
  },
  {
    id: 3,
    name: "Maya Kumar",
    role: "Author",
    status: "Active",
    lastLogin: "Yesterday",
  },
  {
    id: 4,
    name: "Vivek Rao",
    role: "Analyst",
    status: "Suspended",
    lastLogin: "18 Sep 2026",
  },
];

const roles = ["Admin", "Editor", "Author", "Analyst"];

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(demoUsers);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [period, setPeriod] = useState("Last 30 days");

  const [refreshing, setRefreshing] = useState(false);

  const [showInviteModal, setShowInviteModal] = useState(false);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Editor");

  const [inviting, setInviting] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        user.name.toLowerCase().includes(searchValue) ||
        user.role.toLowerCase().includes(searchValue) ||
        user.status.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "All statuses" || user.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [users, search, status]);

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
          result.error || "Unable to send the invitation."
        );
      }

      const invitedName = cleanEmail.split("@")[0];

      setUsers((currentUsers) => [
        ...currentUsers,
        {
          id: Date.now(),
          name: invitedName,
          role,
          status: "Invited",
          lastLogin: "Never",
        },
      ]);

      setInviteSuccess(`Invitation sent to ${cleanEmail}.`);
      setEmail("");
    } catch (error) {
      setInviteError(
        error instanceof Error
          ? error.message
          : "Unable to send the invitation."
      );
    } finally {
      setInviting(false);
    }
  }

  function handleRefresh() {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 700);
  }

  return (
    <>
      <main className="min-h-[calc(100vh-78px)] bg-[var(--admin-bg)] px-6 py-7 text-[var(--admin-text)] transition-colors duration-300 lg:px-9">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-2 font-[Space_Grotesk] text-[9px] font-medium uppercase tracking-[0.24em] text-[var(--admin-purple)]">
              VAI SPACE
            </div>

            <h1 className="font-[Space_Grotesk] text-[31px] font-semibold leading-none tracking-[-0.035em] text-[var(--admin-text)]">
              Users
            </h1>

            <p className="mt-2 font-[Lexend] text-[12px] leading-5 text-[var(--admin-text-secondary)]">
              Manage team roles, permissions and workspace access.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:pt-5">
            <button
              type="button"
              onClick={handleRefresh}
              className="
                admin-button
                flex h-[38px] items-center gap-1.5
                rounded-xl
                px-3
                font-[Lexend] text-[11px] font-medium
                transition-all
                hover:-translate-y-px
              "
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
              className="
                flex h-[38px] items-center gap-1.5
                rounded-xl
                bg-[var(--admin-purple)]
                px-3.5
                font-[Lexend] text-[11px] font-medium
                text-white
                shadow-[0_8px_24px_rgba(113,103,255,0.18)]
                transition-all
                hover:-translate-y-px
                hover:bg-[var(--admin-purple-light)]
                hover:shadow-[0_10px_28px_rgba(113,103,255,0.25)]
              "
            >
              <Plus size={15} strokeWidth={2} />
              Invite user
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
          {/* Search */}
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
              placeholder="Search users..."
              className="
                h-[40px] w-full rounded-xl
                border border-[var(--admin-border)]
                bg-[var(--admin-input)]
                pl-9 pr-3
                font-[Lexend] text-[11px]
                text-[var(--admin-text)]
                outline-none
                shadow-sm
                transition-all
                placeholder:text-[var(--admin-text-muted)]
                hover:border-[var(--admin-border-strong)]
                focus:border-[var(--admin-purple)]
                focus:ring-2
                focus:ring-[var(--admin-purple)]/10
              "
            />
          </div>

          {/* Status */}
          <div className="relative w-full sm:w-[145px]">
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="
                h-[40px] w-full appearance-none rounded-xl
                border border-[var(--admin-border)]
                bg-[var(--admin-input)]
                px-3 pr-8
                font-[Lexend] text-[11px]
                text-[var(--admin-text-secondary)]
                outline-none
                shadow-sm
                transition-all
                hover:border-[var(--admin-border-strong)]
                focus:border-[var(--admin-purple)]
                focus:ring-2
                focus:ring-[var(--admin-purple)]/10
              "
            >
              <option>All statuses</option>
              <option>Active</option>
              <option>Invited</option>
              <option>Suspended</option>
            </select>

            <ChevronDown
              size={14}
              strokeWidth={1.8}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--admin-icon)]"
            />
          </div>

          {/* Period */}
          <div className="relative w-full sm:w-[145px]">
            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="
                h-[40px] w-full appearance-none rounded-xl
                border border-[var(--admin-border)]
                bg-[var(--admin-input)]
                px-3 pr-8
                font-[Lexend] text-[11px]
                text-[var(--admin-text-secondary)]
                outline-none
                shadow-sm
                transition-all
                hover:border-[var(--admin-border-strong)]
                focus:border-[var(--admin-purple)]
                focus:ring-2
                focus:ring-[var(--admin-purple)]/10
              "
            >
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
              <option>All time</option>
            </select>

            <ChevronDown
              size={14}
              strokeWidth={1.8}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--admin-icon)]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="admin-card mt-5 overflow-hidden rounded-2xl border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse">
              <thead>
                <tr className="border-b border-[var(--admin-border)] bg-[var(--admin-surface-2)]">
                  <th className="px-4 py-3.5 text-left font-[Lexend] text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--admin-text-muted)]">
                    User
                  </th>

                  <th className="px-4 py-3.5 text-left font-[Lexend] text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--admin-text-muted)]">
                    Role
                  </th>

                  <th className="px-4 py-3.5 text-left font-[Lexend] text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--admin-text-muted)]">
                    Status
                  </th>

                  <th className="px-4 py-3.5 text-left font-[Lexend] text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--admin-text-muted)]">
                    Last Login
                  </th>

                  <th className="px-4 py-3.5 text-right font-[Lexend] text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--admin-text-muted)]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="
                      border-b border-[var(--admin-border)]
                      transition-colors
                      last:border-b-0
                      hover:bg-[var(--admin-hover)]
                    "
                  >
                    {/* User */}
                    <td className="px-4 py-[18px]">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--admin-border-strong)] bg-[var(--admin-surface-3)] font-[Space_Grotesk] text-[10px] font-semibold text-[var(--admin-purple)]">
                          {user.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>

                        <span className="font-[Lexend] text-[13px] font-medium text-[var(--admin-text)]">
                          {user.name}
                        </span>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-[18px]">
                      <span className="inline-flex min-w-[58px] justify-center rounded-full border border-[var(--admin-border)] bg-[var(--admin-surface-3)] px-2.5 py-[5px] font-[Lexend] text-[10px] font-medium text-[var(--admin-text-secondary)]">
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-[18px]">
                      <span
                        className={`
                          inline-flex items-center gap-1.5
                          font-[Lexend] text-[11px] font-medium
                          ${
                            user.status === "Active"
                              ? "text-emerald-600 dark:text-emerald-300"
                              : user.status === "Invited"
                                ? "text-[var(--admin-purple)]"
                                : "text-amber-600 dark:text-amber-300"
                          }
                        `}
                      >
                        <span
                          className={`
                            h-1.5 w-1.5 rounded-full
                            ${
                              user.status === "Active"
                                ? "bg-emerald-500"
                                : user.status === "Invited"
                                  ? "bg-[var(--admin-purple)]"
                                  : "bg-amber-500"
                            }
                          `}
                        />

                        {user.status}
                      </span>
                    </td>

                    {/* Last Login */}
                    <td className="px-4 py-[18px]">
                      <span className="font-[Lexend] text-[12px] text-[var(--admin-text-secondary)]">
                        {user.lastLogin}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-[18px]">
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          title={`Edit ${user.name}`}
                          className="
                            admin-button
                            flex h-[34px] w-[34px]
                            items-center justify-center
                            rounded-lg
                            transition-all
                            hover:border-[var(--admin-purple)]
                            hover:text-[var(--admin-purple)]
                          "
                        >
                          <Pencil size={15} strokeWidth={1.8} />
                        </button>

                        <button
                          type="button"
                          title={`Delete ${user.name}`}
                          className="
                            admin-button
                            flex h-[34px] w-[34px]
                            items-center justify-center
                            rounded-lg
                            transition-all
                            hover:border-red-400/40
                            hover:bg-red-500/[0.06]
                            hover:text-red-500
                          "
                        >
                          <Trash2 size={15} strokeWidth={1.8} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-14 text-center font-[Lexend] text-[12px] text-[var(--admin-text-muted)]"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-3 font-[Lexend] text-[10px] leading-4 text-[var(--admin-text-muted)]">
          User management is connected to the VAI SPACE invitation system.
        </p>
      </main>

      {/* Invite User Modal */}
      {showInviteModal && (
        <div
          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            bg-black/50
            px-4
            backdrop-blur-md
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeInviteModal();
            }
          }}
        >
          <div
            className="
              admin-modal
              w-full max-w-[850px]
              overflow-hidden
              rounded-2xl
              border
              shadow-[0_30px_100px_rgba(0,0,0,0.22)]
            "
          >
            {/* Modal Header */}
            <div className="flex h-[82px] items-center justify-between border-b border-[var(--admin-border)] px-6">
              <div>
                <h2 className="font-[Space_Grotesk] text-[19px] font-semibold tracking-[-0.02em] text-[var(--admin-text)]">
                  Invite user
                </h2>

                <p className="mt-1 font-[Lexend] text-[10px] text-[var(--admin-text-muted)]">
                  Add a new member to your workspace.
                </p>
              </div>

              <button
                type="button"
                onClick={closeInviteModal}
                disabled={inviting}
                className="
                  admin-button
                  flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  transition-all
                  hover:text-[var(--admin-text)]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <X size={20} strokeWidth={1.8} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleInvite}>
              <div className="px-6 py-6">
                <p className="mb-5 font-[Lexend] text-[12px] leading-5 text-[var(--admin-text-secondary)]">
                  Send an invitation to join VAI SPACE.
                </p>

                {/* Email */}
                <div>
                  <label
                    htmlFor="invite-email"
                    className="mb-2 block font-[Lexend] text-[11px] font-medium text-[var(--admin-text)]"
                  >
                    Email address
                    <span className="ml-1 text-[var(--admin-purple)]">
                      *
                    </span>
                  </label>

                  <input
                    id="invite-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter user's email address"
                    autoComplete="email"
                    autoFocus
                    disabled={inviting}
                    className="
                      h-[50px] w-full rounded-xl
                      border border-[var(--admin-border-strong)]
                      bg-[var(--admin-input)]
                      px-3.5
                      font-[Lexend] text-[12px]
                      text-[var(--admin-text)]
                      outline-none
                      transition-all
                      placeholder:text-[var(--admin-text-muted)]
                      focus:border-[var(--admin-purple)]
                      focus:ring-2
                      focus:ring-[var(--admin-purple)]/10
                      disabled:opacity-50
                    "
                  />
                </div>

                {/* Role + Status */}
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Role */}
                  <div>
                    <label
                      htmlFor="invite-role"
                      className="mb-2 block font-[Lexend] text-[11px] font-medium text-[var(--admin-text)]"
                    >
                      Category / role
                    </label>

                    <div className="relative">
                      <select
                        id="invite-role"
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                        disabled={inviting}
                        className="
                          h-[48px] w-full appearance-none rounded-xl
                          border border-[var(--admin-border-strong)]
                          bg-[var(--admin-input)]
                          px-3.5 pr-10
                          font-[Lexend] text-[12px]
                          text-[var(--admin-text)]
                          outline-none
                          transition-all
                          focus:border-[var(--admin-purple)]
                          focus:ring-2
                          focus:ring-[var(--admin-purple)]/10
                          disabled:opacity-50
                        "
                      >
                        <option value="">Select a category</option>

                        {roles.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={16}
                        strokeWidth={1.8}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-icon)]"
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label
                      htmlFor="invite-status"
                      className="mb-2 block font-[Lexend] text-[11px] font-medium text-[var(--admin-text)]"
                    >
                      Status
                    </label>

                    <div className="relative">
                      <select
                        id="invite-status"
                        defaultValue="Active"
                        disabled
                        className="
                          h-[48px] w-full appearance-none rounded-xl
                          border border-[var(--admin-border)]
                          bg-[var(--admin-surface-3)]
                          px-3.5 pr-10
                          font-[Lexend] text-[12px]
                          text-[var(--admin-text-secondary)]
                          outline-none
                          opacity-90
                        "
                      >
                        <option value="Active">Active</option>
                      </select>

                      <ChevronDown
                        size={16}
                        strokeWidth={1.8}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-icon)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="mt-5">
                  <label
                    htmlFor="invite-notes"
                    className="mb-2 block font-[Lexend] text-[11px] font-medium text-[var(--admin-text)]"
                  >
                    Notes
                  </label>

                  <textarea
                    id="invite-notes"
                    placeholder="Optional invitation details"
                    disabled={inviting}
                    rows={3}
                    className="
                      w-full resize-none rounded-xl
                      border border-[var(--admin-border-strong)]
                      bg-[var(--admin-input)]
                      px-3.5 py-3
                      font-[Lexend] text-[12px]
                      leading-5
                      text-[var(--admin-text)]
                      outline-none
                      transition-all
                      placeholder:text-[var(--admin-text-muted)]
                      focus:border-[var(--admin-purple)]
                      focus:ring-2
                      focus:ring-[var(--admin-purple)]/10
                      disabled:opacity-50
                    "
                  />
                </div>

                {/* Error */}
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

                {/* Success */}
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

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 border-t border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-6 py-4">
                <button
                  type="button"
                  onClick={closeInviteModal}
                  disabled={inviting}
                  className="
                    admin-button
                    h-[42px]
                    rounded-xl
                    px-4
                    font-[Lexend] text-[11px] font-medium
                    transition-all
                    hover:text-[var(--admin-text)]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={inviting || !email.trim()}
                  className="
                    flex h-[42px] items-center gap-2
                    rounded-xl
                    bg-[var(--admin-purple)]
                    px-5
                    font-[Lexend] text-[11px] font-medium
                    text-white
                    shadow-[0_8px_22px_rgba(113,103,255,0.18)]
                    transition-all
                    hover:bg-[var(--admin-purple-light)]
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
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