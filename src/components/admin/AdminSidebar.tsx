"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  FileText,
  Briefcase,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Users",
    icon: Users,
  },
  {
    label: "Content",
    icon: FileText,
  },
  {
    label: "Services",
    icon: Briefcase,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[250px] border-r border-white/[0.06] bg-black/70 px-5 py-6 backdrop-blur-xl lg:flex lg:flex-col">
      {/* Logo */}
      <div className="mb-12 px-3">
        <div className="font-[Space_Grotesk] text-xl font-semibold tracking-[0.18em] text-white">
          VAI
        </div>

        <div className="mt-1 font-[Lexend] text-[9px] tracking-[0.5em] text-white/40">
          SPACE
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 }}
              className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                item.active
                  ? "bg-[#616CFA]/10 text-white"
                  : "text-white/45 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <Icon
                size={18}
                strokeWidth={1.7}
                className={
                  item.active
                    ? "text-[#616CFA]"
                    : "text-white/40 group-hover:text-[#616CFA]"
                }
              />

              <span className="font-[Lexend] text-[13px]">
                {item.label}
              </span>

              {item.active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#616CFA] shadow-[0_0_10px_#616CFA]" />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Logout */}
      <button className="group flex items-center gap-3 rounded-xl px-4 py-3 text-white/35 transition hover:bg-white/[0.04] hover:text-white">
        <LogOut
          size={18}
          strokeWidth={1.7}
          className="group-hover:text-[#E46ECC]"
        />

        <span className="font-[Lexend] text-[13px]">
          Logout
        </span>
      </button>
    </aside>
  );
}