import type { ReactNode } from "react";
import CustomCursor from "@/components/ui/CustomCursor";
import AdminShell from "@/components/admin/AdminShell";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="admin-shell min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text)] transition-colors duration-300 cursor-none">
      <CustomCursor />
      <AdminShell>{children}</AdminShell>
    </div>
  );
}