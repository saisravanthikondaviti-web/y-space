"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminAccessGuard from "@/components/admin/AdminAccessGuard";

export default function AdminShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const isStandalonePage =
    pathname === "/admin/login" ||
    pathname === "/admin/signup" ||
    pathname === "/admin/access-request" ||
    pathname === "/admin/reset-password";

  if (isStandalonePage) {
    return <>{children}</>;
  }

  return (
    <div className="admin-dashboard min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text)] transition-colors duration-300">
      <AdminSidebar />

      <div className="min-h-screen lg:pl-[250px]">
        <AdminHeader />

        <main className="min-h-[calc(100vh-78px)] bg-[var(--admin-bg)] text-[var(--admin-text)] transition-colors duration-300">
          <AdminAccessGuard>
            {children}
          </AdminAccessGuard>
        </main>
      </div>
    </div>
  );
}