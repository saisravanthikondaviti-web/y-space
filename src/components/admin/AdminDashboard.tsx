"use client";

import { motion } from "framer-motion";
import {
  Users,
  FileText,
  Briefcase,
  Activity,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "0",
    change: "No data yet",
    icon: Users,
  },
  {
    title: "Content",
    value: "0",
    change: "No data yet",
    icon: FileText,
  },
  {
    title: "Services",
    value: "0",
    change: "No data yet",
    icon: Briefcase,
  },
  {
    title: "Activity",
    value: "0",
    change: "No activity yet",
    icon: Activity,
  },
];

export default function AdminDashboard() {
  return (
    <main className="px-6 py-8 lg:px-10">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="mb-2 font-[Lexend] text-[10px] uppercase tracking-[0.35em] text-[#616CFA]">
          Administration
        </p>

        <h1 className="font-[Space_Grotesk] text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Dashboard
        </h1>

        <p className="mt-3 max-w-xl font-[Lexend] text-sm leading-6 text-white/35">
          Manage your VAI SPACE platform from one place.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.07 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-[#616CFA]/20"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#616CFA]/10 blur-3xl opacity-0 transition group-hover:opacity-100" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="font-[Lexend] text-[11px] text-white/35">
                    {stat.title}
                  </p>

                  <p className="mt-3 font-[Space_Grotesk] text-3xl font-semibold text-white">
                    {stat.value}
                  </p>

                  <p className="mt-2 font-[Lexend] text-[9px] text-white/25">
                    {stat.change}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#616CFA]/15 bg-[#616CFA]/10">
                  <Icon
                    size={18}
                    strokeWidth={1.6}
                    className="text-[#616CFA]"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom sections */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Activity */}
        <section className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-[Space_Grotesk] text-lg font-medium text-white">
                Recent Activity
              </h2>

              <p className="mt-1 font-[Lexend] text-[10px] text-white/25">
                Latest admin activity will appear here.
              </p>
            </div>

            <Activity
              size={18}
              strokeWidth={1.6}
              className="text-white/25"
            />
          </div>

          <div className="mt-8 flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-white/[0.06]">
            <p className="font-[Lexend] text-xs text-white/20">
              No activity yet
            </p>
          </div>
        </section>

        {/* Quick actions */}
        <section className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
          <h2 className="font-[Space_Grotesk] text-lg font-medium text-white">
            Quick Actions
          </h2>

          <p className="mt-1 font-[Lexend] text-[10px] text-white/25">
            Common administration actions.
          </p>

          <div className="mt-6 space-y-3">
            {["Manage Users", "Manage Content", "Manage Services"].map(
              (action) => (
                <button
                  key={action}
                  className="flex w-full items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-left transition hover:border-[#616CFA]/20 hover:bg-[#616CFA]/[0.04]"
                >
                  <span className="font-[Lexend] text-[11px] text-white/50">
                    {action}
                  </span>

                  <span className="text-white/20">→</span>
                </button>
              )
            )}
          </div>
        </section>
      </div>
    </main>
  );
}