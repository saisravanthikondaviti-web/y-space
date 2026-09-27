import type { ReactNode } from "react";
import CustomCursor from "@/components/ui/CustomCursor";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen cursor-none bg-black text-white">
      <CustomCursor />
      {children}
    </div>
  );
}