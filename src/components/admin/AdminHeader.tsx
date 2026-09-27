"use client";

import { Bell, Search } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-white/[0.06] bg-black/60 px-6 backdrop-blur-xl lg:px-10">
      {/* Search */}
      <div className="hidden items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 md:flex md:w-[280px]">
        <Search size={16} className="text-white/30" />

        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent font-[Lexend] text-[12px] text-white outline-none placeholder:text-white/25"
        />
      </div>

      {/* Mobile title */}
      <div className="md:hidden">
        <div className="font-[Space_Grotesk] text-lg font-semibold tracking-[0.15em] text-white">
          VAI
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button className="relative text-white/45 transition hover:text-white">
          <Bell size={19} strokeWidth={1.7} />

          <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-[#E46ECC] shadow-[0_0_8px_#E46ECC]" />
        </button>

        <div className="h-7 w-px bg-white/[0.08]" />

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#616CFA]/30 bg-[#616CFA]/10 font-[Space_Grotesk] text-sm text-white">
            A
          </div>

          <div className="hidden sm:block">
            <div className="font-[Lexend] text-[11px] text-white">
              Admin
            </div>

            <div className="font-[Lexend] text-[9px] text-white/30">
              Administrator
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}