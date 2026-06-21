"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  LayoutDashboard,
  Search,
  Bookmark,
  Bell,
  MessageCircle,
  Settings,
  UserCircle,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const sidebarIcons = [
  LayoutDashboard,
  Search,
  Bookmark,
  Bell,
  MessageCircle,
];

const bottomIcons = [Settings, UserCircle];

function DashboardInner() {
  const params = useSearchParams();
  const name = params.get("name") ?? "there";

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "var(--background)" }}
    >
      {/* ── Sidebar ── */}
      <aside
        className="hidden sm:flex flex-col items-center py-5 gap-4 w-[60px] shrink-0"
        style={{
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
        }}
      >
        {/* Logo mark */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
          style={{ backgroundColor: "var(--primary)" }}
        >
          <span className="font-black text-xs" style={{ color: "var(--primary-foreground)" }}>NP</span>
        </div>

        {/* Top icons */}
        <div className="flex flex-col items-center gap-3 flex-1">
          {sidebarIcons.map((Icon, i) => (
            <div
              key={i}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                color: i === 0 ? "var(--primary)" : "var(--muted-foreground)",
                background: i === 0 ? "rgba(0,201,177,0.1)" : "transparent",
              }}
            >
              <Icon size={17} />
            </div>
          ))}
        </div>

        {/* Bottom icons */}
        <div className="flex flex-col items-center gap-3">
          {bottomIcons.map((Icon, i) => (
            <div
              key={i}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ color: "var(--muted-foreground)" }}
            >
              <Icon size={17} />
            </div>
          ))}
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Top bar */}
        <header
          className="flex items-center justify-between px-5 sm:px-8 h-14 shrink-0"
          style={{
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            Welcome back,{" "}
            <span style={{ color: "var(--primary)" }}>{name}</span>
          </p>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              {name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content — centered placeholder */}
        <main className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <LayoutDashboard
            size={52}
            style={{ color: "var(--muted-foreground)", opacity: 0.35 }}
          />
          <p className="text-xl font-semibold" style={{ color: "var(--muted-foreground)" }}>
            Dashboard will be here
          </p>
          <p className="text-sm max-w-xs" style={{ color: "var(--muted-foreground)", opacity: 0.7 }}>
            Your personalised opportunity feed is coming soon.
          </p>
        </main>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardInner />
    </Suspense>
  );
}
