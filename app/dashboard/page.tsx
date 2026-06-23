"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Search,
  Bookmark,
  Bell,
  MessageCircle,
  Settings,
  UserCircle,
  Globe,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const sidebarLinks = [
  { Icon: LayoutDashboard, label: "Overview", active: true },
  { Icon: Search, label: "Search" },
  { Icon: Bookmark, label: "Saved" },
  { Icon: Bell, label: "Alerts" },
  { Icon: MessageCircle, label: "Messages" },
];

const bottomLinks = [
  { Icon: Settings, label: "Settings" },
  { Icon: UserCircle, label: "Profile" },
];

function DashboardInner() {
  const params = useSearchParams();
  const name = params.get("name") ?? "Alex";

  // Mock application state
  const [applications] = useState([
    {
      id: 1,
      title: "Mastercard Foundation Scholars Program",
      category: "Scholarship",
      org: "African Leadership University",
      status: "Under Review",
      statusColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      date: "Applied 5 days ago",
    },
    {
      id: 2,
      title: "Software Engineer Internship",
      category: "Entry-Level Job",
      org: "Google Africa",
      status: "Shortlisted",
      statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      date: "Applied 2 weeks ago",
    },
    {
      id: 3,
      title: "ALX Software Engineering Programme",
      category: "Cohort Training",
      org: "ALX Africa",
      status: "Applied",
      statusColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
      date: "Applied 3 weeks ago",
    },
  ]);

  // Mock saved opportunities based on onboarding pathways
  const recommended = [
    {
      title: "Ecobank Fintech Fellowship",
      category: "Fellowship",
      pathway: "Financial Literacy",
      org: "Ecobank",
      badgeColor: "rgba(96, 165, 250, 0.12)",
      textColor: "#60A5FA",
    },
    {
      title: "WHO Nutrition Grant",
      category: "Grant & Funding",
      pathway: "Nutrition",
      org: "World Health Organization",
      badgeColor: "rgba(245, 158, 11, 0.12)",
      textColor: "#FCD34D",
    },
    {
      title: "Mental Health Advocacy Cohort",
      category: "Cohort Training",
      pathway: "Mental Health",
      org: "Youth Health Alliance",
      badgeColor: "rgba(168, 85, 247, 0.12)",
      textColor: "#C084FC",
    },
  ];

  // Profile completion items
  const [profileTasks, setProfileTasks] = useState([
    { id: 1, text: "Verify email address", done: true },
    { id: 2, text: "Select learning pathways", done: true },
    { id: 3, text: "Upload current CV/Resume", done: false },
    { id: 4, text: "Write professional bio", done: false },
  ]);

  const toggleTask = (taskId: number) => {
    setProfileTasks(tasks =>
      tasks.map(t => (t.id === taskId ? { ...t, done: !t.done } : t))
    );
  };

  const completedCount = profileTasks.filter(t => t.done).length;
  const strengthPercent = Math.round((completedCount / profileTasks.length) * 100);

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "var(--background)" }}
    >
      {/* ── Sidebar ── */}
      <aside
        className="hidden sm:flex flex-col items-center py-5 gap-6 w-[70px] shrink-0"
        style={{
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
        }}
      >
        {/* Logo mark */}
        <Link href="/">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <span className="font-black text-sm" style={{ color: "var(--primary-foreground)" }}>NP</span>
          </div>
        </Link>

        {/* Top icons */}
        <div className="flex flex-col items-center gap-4 flex-1">
          {sidebarLinks.map((item, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer group relative"
              style={{
                color: item.active ? "var(--primary)" : "var(--muted-foreground)",
                background: item.active ? "rgba(0,201,177,0.1)" : "transparent",
              }}
              title={item.label}
            >
              <item.Icon size={18} />
              {/* Tooltip */}
              <span className="absolute left-[80px] bg-slate-900 border border-slate-800 text-[11px] font-medium px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none text-white">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom icons */}
        <div className="flex flex-col items-center gap-4">
          {bottomLinks.map((item, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer group relative text-muted-foreground hover:text-foreground"
            >
              <item.Icon size={18} />
              <span className="absolute left-[80px] bg-slate-900 border border-slate-800 text-[11px] font-medium px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none text-white">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* ── Main Workspace ── */}
      <div className="flex flex-col flex-1 min-w-0 font-sans">

        {/* Top bar */}
        <header
          className="flex items-center justify-between px-6 sm:px-8 h-16 shrink-0"
          style={{
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="flex flex-col">
            <h1 className="text-base font-bold flex items-center gap-2" style={{ color: "var(--foreground)" }}>
              Welcome back, <span className="bg-gradient-to-r from-[var(--primary)] to-emerald-400 bg-clip-text text-transparent">{name}</span> 👋
            </h1>
            <p className="text-[11px] text-muted-foreground hidden sm:block">Here is an overview of your opportunity profile.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors border hover:bg-[rgba(0,201,177,0.08)]"
              style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
              title="Back to Website"
            >
              <Globe size={15} />
            </Link>
            <ThemeToggle />
            {/* User Avatar */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black border"
              style={{ 
                background: "var(--primary)", 
                color: "var(--primary-foreground)",
                borderColor: "rgba(0,201,177,0.25)"
              }}
            >
              {name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Main Content Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 max-w-7xl w-full mx-auto flex flex-col gap-8">
          
          {/* ── Stats widgets ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Stat 1: Applications */}
            <div className="p-5 rounded-2xl border bg-surface/50 backdrop-blur-md flex flex-col gap-2 relative overflow-hidden" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Applications</span>
                <Clock size={16} className="text-primary" />
              </div>
              <p className="text-3xl font-extrabold" style={{ color: "var(--foreground)" }}>{applications.length}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="text-emerald-500 font-semibold">1 active</span> under review process
              </p>
            </div>

            {/* Stat 2: Saved Items */}
            <div className="p-5 rounded-2xl border bg-surface/50 backdrop-blur-md flex flex-col gap-2 relative overflow-hidden" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Saved Items</span>
                <Bookmark size={16} className="text-blue-400" />
              </div>
              <p className="text-3xl font-extrabold" style={{ color: "var(--foreground)" }}>12</p>
              <p className="text-xs text-muted-foreground">Across your selected pathways</p>
            </div>

            {/* Stat 3: Profile strength */}
            <div className="p-5 rounded-2xl border bg-surface/50 backdrop-blur-md flex flex-col gap-2 relative overflow-hidden" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Profile Strength</span>
                <Sparkles size={16} className="text-amber-400" />
              </div>
              <p className="text-3xl font-extrabold" style={{ color: "var(--foreground)" }}>{strengthPercent}%</p>
              
              {/* Simple progress bar */}
              <div className="w-full h-1.5 rounded-full bg-border/20 mt-1">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-500" 
                  style={{ width: `${strengthPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* ── Main layout grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Left Col (2/3 width on desktop): Applications & recommendations */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Card: Active Applications */}
              <div className="rounded-2xl border bg-surface/50 backdrop-blur-sm overflow-hidden" style={{ borderColor: "var(--border)" }}>
                <div className="px-5 py-4 border-b flex items-center justify-between bg-surface/30" style={{ borderColor: "var(--border)" }}>
                  <h3 className="font-bold text-sm" style={{ color: "var(--foreground)" }}>Submitted Applications</h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    Track Status
                  </span>
                </div>
                
                <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                  {applications.map((app) => (
                    <div key={app.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface/30 transition-colors">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          {app.category}
                        </span>
                        <h4 className="font-semibold text-sm text-foreground">{app.title}</h4>
                        <p className="text-xs text-muted-foreground">{app.org} • <span className="italic">{app.date}</span></p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${app.statusColor}`}>
                          {app.status}
                        </span>
                        <Link href="/opportunities">
                          <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-border hover:border-primary transition-colors text-muted-foreground hover:text-primary cursor-pointer">
                            <ArrowUpRight size={14} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card: Saved / Recommended Opportunities */}
              <div className="rounded-2xl border bg-surface/50 backdrop-blur-sm overflow-hidden" style={{ borderColor: "var(--border)" }}>
                <div className="px-5 py-4 border-b flex items-center justify-between bg-surface/30" style={{ borderColor: "var(--border)" }}>
                  <h3 className="font-bold text-sm" style={{ color: "var(--foreground)" }}>Pathway Matches For You</h3>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Based on interests</span>
                </div>
                
                <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {recommended.map((rec, i) => (
                    <div 
                      key={i} 
                      className="p-4 rounded-xl border bg-surface/40 hover:bg-surface/80 transition-colors flex flex-col gap-3 justify-between"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span 
                            className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase"
                            style={{ background: rec.badgeColor, color: rec.textColor }}
                          >
                            {rec.pathway}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{rec.category}</span>
                        </div>
                        <h4 className="font-bold text-xs line-clamp-2 text-foreground" title={rec.title}>
                          {rec.title}
                        </h4>
                      </div>
                      
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-muted-foreground">{rec.org}</span>
                        <Link href="/opportunities">
                          <span className="text-[10px] font-bold text-primary flex items-center gap-0.5 hover:underline cursor-pointer">
                            Unlock <ArrowUpRight size={10} />
                          </span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Col (1/3 width on desktop): Checklist widget */}
            <div className="flex flex-col gap-6">
              
              {/* Profile strength / checklist task card */}
              <div className="p-5 rounded-2xl border bg-surface/50 backdrop-blur-sm flex flex-col gap-4" style={{ borderColor: "var(--border)" }}>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-sm" style={{ color: "var(--foreground)" }}>Profile Verification</h3>
                  <p className="text-xs text-muted-foreground">Complete these steps to optimize matching recommendation engines.</p>
                </div>

                <div className="flex flex-col gap-2.5">
                  {profileTasks.map((task) => (
                    <div 
                      key={task.id} 
                      onClick={() => toggleTask(task.id)}
                      className="flex items-center gap-3 p-2.5 rounded-xl border border-border/10 bg-surface/30 hover:bg-surface/70 cursor-pointer transition-colors select-none"
                    >
                      {task.done ? (
                        <CheckCircle2 size={16} className="text-primary shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-muted-foreground/50 shrink-0" />
                      )}
                      <span className={`text-xs ${task.done ? 'text-muted-foreground line-through font-normal' : 'text-foreground font-medium'}`}>
                        {task.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ height: "1px", background: "var(--border)" }} />

                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">{completedCount} of {profileTasks.length} complete</span>
                  <Link href="/opportunities">
                    <span className="text-primary font-semibold hover:underline cursor-pointer">Browse opportunities</span>
                  </Link>
                </div>
              </div>

              {/* Tips Banner */}
              <div className="p-5 rounded-2xl border bg-gradient-to-br from-primary/10 to-transparent flex flex-col gap-2.5 relative overflow-hidden" style={{ borderColor: "var(--border)" }}>
                <span className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full filter blur-xl pointer-events-none" />
                <h4 className="font-bold text-xs text-primary flex items-center gap-1.5">
                  <Sparkles size={12} /> Pro-Tip For Learners
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Submitting a guardian consent email speeds up review gating process for applicants under 18 years. Make sure to double check your onboarding details!
                </p>
              </div>

            </div>

          </div>

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
