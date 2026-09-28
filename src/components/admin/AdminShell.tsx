"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  // Auth pages should NOT have sidebar/header
  const isAuthPage =
    pathname === "/admin/login" ||
    pathname === "/admin/signup";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="admin-dashboard min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text)] transition-colors duration-300">
      <AdminSidebar />

      <div className="min-h-screen lg:pl-[250px]">
        <AdminHeader />

        <main className="min-h-[calc(100vh-78px)] bg-[var(--admin-bg)] text-[var(--admin-text)] transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}