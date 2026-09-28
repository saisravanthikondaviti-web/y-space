import { Bell } from "lucide-react";

export default function AdminNotificationsPage() {
  return (
    <main className="min-h-[calc(100vh-78px)] bg-[var(--admin-bg)] px-6 py-8 text-[var(--admin-text)] transition-colors duration-300 lg:px-9">
      <div className="mb-2 flex items-center gap-2">
        <Bell
          size={17}
          className="text-[var(--admin-purple)]"
        />

        <span className="font-[Lexend] text-[9px] uppercase tracking-[0.2em] text-[var(--admin-purple)]">
          VAI SPACE
        </span>
      </div>

      <h1 className="font-[Space_Grotesk] text-[30px] font-semibold text-[var(--admin-text)]">
        Notifications
      </h1>

      <p className="mt-2 font-[Lexend] text-[12px] text-[var(--admin-text-secondary)]">
        Notifications and system activity will appear here.
      </p>

      <div className="admin-card mt-8 rounded-xl border p-8 text-center">
        <Bell
          size={25}
          className="mx-auto text-[var(--admin-purple)]"
        />

        <p className="mt-3 font-[Lexend] text-[12px] text-[var(--admin-text-muted)]">
          No new notifications
        </p>
      </div>
    </main>
  );
}