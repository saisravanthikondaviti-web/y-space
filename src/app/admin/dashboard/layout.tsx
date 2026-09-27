import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <AdminSidebar />

      <div className="lg:pl-[250px]">
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}