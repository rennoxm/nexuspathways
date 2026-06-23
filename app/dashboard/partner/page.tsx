"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  Bell,
  Settings,
  Building2,
  Globe,
  Plus,
  Check,
  X,
  TrendingUp,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const sidebarLinks = [
  { Icon: LayoutDashboard, label: "Overview", active: true },
  { Icon: Users, label: "Candidates" },
  { Icon: FileText, label: "Listings" },
  { Icon: BarChart2, label: "Analytics" },
  { Icon: Bell, label: "Notifications" },
];

const bottomLinks = [
  { Icon: Settings, label: "Settings" },
  { Icon: Building2, label: "Organization" },
];

function PartnerDashboardInner() {
  const params = useSearchParams();
  const org = params.get("org") ?? "Global Partners";

  // Listings state
  const [listings, setListings] = useState([
    { id: 1, title: "Tech Fellowship 2026", category: "Fellowship", applicants: 84, status: "Active" },
    { id: 2, title: "Data Science Bootcamp", category: "Cohort Training", applicants: 42, status: "Active" },
    { id: 3, title: "Youth Innovation Grant", category: "Grant & Funding", applicants: 32, status: "Active" },
  ]);

  // Applicants evaluation queue state
  const [applicants, setApplicants] = useState([
    { id: 1, name: "Amina Yusuf", opportunity: "Tech Fellowship 2026", date: "Yesterday", status: "Pending" },
    { id: 2, name: "Kofi Mensah", opportunity: "Data Science Bootcamp", date: "2 days ago", status: "Shortlisted" },
    { id: 3, name: "Chinedu Okafor", opportunity: "Tech Fellowship 2026", date: "3 days ago", status: "Pending" },
  ]);

  // Modal control states
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Scholarship");

  // Sum total applicants from all listings and applicants queue
  const totalApplicants = listings.reduce((sum, item) => sum + item.applicants, 0) + 
    applicants.filter(a => a.status === "Pending").length;

  // Evaluation actions
  const handleShortlist = (id: number) => {
    setApplicants(prev =>
      prev.map(app => (app.id === id ? { ...app, status: "Shortlisted" } : app))
    );
  };

  const handleDecline = (id: number) => {
    setApplicants(prev =>
      prev.map(app => (app.id === id ? { ...app, status: "Declined" } : app))
    );
  };

  // Add Listing form submit
  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newOpportunity = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      applicants: 0,
      status: "Active",
    };

    setListings(prev => [newOpportunity, ...prev]);
    setNewTitle("");
    setNewCategory("Scholarship");
    setShowModal(false);
  };

  return (
    <div
      className="flex min-h-screen relative"
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
              Welcome back, <span className="bg-gradient-to-r from-[var(--primary)] to-emerald-400 bg-clip-text text-transparent">{org}</span> 🏢
            </h1>
            <p className="text-[11px] text-muted-foreground hidden sm:block">Manage your listings, evaluate applicants, and track engagement metrics.</p>
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
            {/* Building avatar */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center border"
              style={{ background: "rgba(0,201,177,0.07)", borderColor: "rgba(0,201,177,0.2)" }}
            >
              <Building2 size={15} style={{ color: "var(--primary)" }} />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 max-w-7xl w-full mx-auto flex flex-col gap-8">
          
          {/* ── Stats Row ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            
            {/* Active Listings Stat */}
            <div className="p-5 rounded-2xl border bg-surface/50 backdrop-blur-md flex flex-col gap-2 relative overflow-hidden" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active Listings</span>
                <FileText size={16} className="text-primary" />
              </div>
              <p className="text-3xl font-extrabold" style={{ color: "var(--foreground)" }}>{listings.length}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                Across scholarship & cohort systems
              </p>
            </div>

            {/* Total Applicants Stat */}
            <div className="p-5 rounded-2xl border bg-surface/50 backdrop-blur-md flex flex-col gap-2 relative overflow-hidden" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Applicants</span>
                <Users size={16} className="text-blue-400" />
              </div>
              <p className="text-3xl font-extrabold" style={{ color: "var(--foreground)" }}>{totalApplicants}</p>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 font-semibold">+18 new</span> applicants this week
              </p>
            </div>

            {/* Reach/Views Stat */}
            <div className="p-5 rounded-2xl border bg-surface/50 backdrop-blur-md flex flex-col gap-2 relative overflow-hidden" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Monthly Reach</span>
                <TrendingUp size={16} className="text-emerald-400" />
              </div>
              <p className="text-3xl font-extrabold" style={{ color: "var(--foreground)" }}>8,420</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="text-emerald-500 font-semibold inline-flex items-center gap-0.5 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px]">
                  +12.4%
                </span>
                increase in page views
              </p>
            </div>

          </div>

          {/* ── Main Grid Content ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Left Column (2/3 width on desktop) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Listings Manager Panel */}
              <div className="rounded-2xl border bg-surface/50 backdrop-blur-sm overflow-hidden" style={{ borderColor: "var(--border)" }}>
                <div className="px-5 py-4 border-b flex items-center justify-between bg-surface/30" style={{ borderColor: "var(--border)" }}>
                  <h3 className="font-bold text-sm" style={{ color: "var(--foreground)" }}>Opportunity Listings</h3>
                  <button 
                    onClick={() => setShowModal(true)}
                    className="btn-primary text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={13} />
                    Add Opportunity
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b text-muted-foreground bg-surface/10" style={{ borderColor: "var(--border)" }}>
                        <th className="p-4 font-semibold">Opportunity Name</th>
                        <th className="p-4 font-semibold">Category</th>
                        <th className="p-4 font-semibold text-center">Applicants</th>
                        <th className="p-4 font-semibold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                      {listings.map((item) => (
                        <tr key={item.id} className="hover:bg-surface/20 transition-colors">
                          <td className="p-4 font-semibold text-foreground text-sm">{item.title}</td>
                          <td className="p-4 text-muted-foreground">{item.category}</td>
                          <td className="p-4 text-center font-medium text-foreground">{item.applicants}</td>
                          <td className="p-4 text-right">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Applicant Evaluation Queue */}
              <div className="rounded-2xl border bg-surface/50 backdrop-blur-sm overflow-hidden" style={{ borderColor: "var(--border)" }}>
                <div className="px-5 py-4 border-b flex items-center justify-between bg-surface/30" style={{ borderColor: "var(--border)" }}>
                  <h3 className="font-bold text-sm" style={{ color: "var(--foreground)" }}>Pending Applicant Evaluations</h3>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Needs Action</span>
                </div>

                <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                  {applicants.map((app) => (
                    <div key={app.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface/25 transition-colors">
                      <div className="flex flex-col gap-1">
                        <h4 className="font-bold text-sm text-foreground">{app.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          Applied for <span className="text-primary font-medium">{app.opportunity}</span> • <span className="italic">{app.date}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {app.status === "Pending" ? (
                          <>
                            <button 
                              onClick={() => handleDecline(app.id)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center border border-red-500/20 hover:bg-red-500/10 hover:border-red-500 transition-colors text-red-400 cursor-pointer"
                              title="Decline Candidate"
                            >
                              <X size={14} />
                            </button>
                            <button 
                              onClick={() => handleShortlist(app.id)}
                              className="px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1 hover:brightness-110 transition-all cursor-pointer"
                            >
                              <Check size={13} />
                              Shortlist
                            </button>
                          </>
                        ) : (
                          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                            app.status === "Shortlisted" 
                              ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" 
                              : "text-red-400 bg-red-400/10 border-red-400/20"
                          }`}>
                            {app.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (1/3 width on desktop) */}
            <div className="flex flex-col gap-6">
              
              {/* Pure-CSS Weekday Analytics Chart */}
              <div className="p-5 rounded-2xl border bg-surface/50 backdrop-blur-sm flex flex-col gap-5" style={{ borderColor: "var(--border)" }}>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-sm" style={{ color: "var(--foreground)" }}>Weekly Application Trends</h3>
                  <p className="text-xs text-muted-foreground">Submitted applications per day this week.</p>
                </div>

                {/* Graph bars container */}
                <div className="flex items-end justify-between h-32 px-2 pt-4 relative">
                  {/* Grid lines */}
                  <div className="absolute inset-x-0 top-0 border-t border-border/10 border-dashed" />
                  <div className="absolute inset-x-0 top-1/2 border-t border-border/10 border-dashed" />
                  <div className="absolute inset-x-0 bottom-0 border-b border-border/20" />

                  {/* Mon bar */}
                  <div className="flex flex-col items-center gap-2 w-[14%] group">
                    <span className="text-[9px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity font-bold">12</span>
                    <div className="w-full rounded-t-md bg-primary/40 hover:bg-primary transition-all duration-300 h-10" />
                    <span className="text-[10px] font-bold text-muted-foreground">M</span>
                  </div>

                  {/* Tue bar */}
                  <div className="flex flex-col items-center gap-2 w-[14%] group">
                    <span className="text-[9px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity font-bold">28</span>
                    <div className="w-full rounded-t-md bg-primary/60 hover:bg-primary transition-all duration-300 h-20" />
                    <span className="text-[10px] font-bold text-muted-foreground">T</span>
                  </div>

                  {/* Wed bar */}
                  <div className="flex flex-col items-center gap-2 w-[14%] group">
                    <span className="text-[9px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity font-bold">36</span>
                    <div className="w-full rounded-t-md bg-primary/80 hover:bg-primary transition-all duration-300 h-24" />
                    <span className="text-[10px] font-bold text-muted-foreground">W</span>
                  </div>

                  {/* Thu bar */}
                  <div className="flex flex-col items-center gap-2 w-[14%] group">
                    <span className="text-[9px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity font-bold">22</span>
                    <div className="w-full rounded-t-md bg-primary/50 hover:bg-primary transition-all duration-300 h-16" />
                    <span className="text-[10px] font-bold text-muted-foreground">T</span>
                  </div>

                  {/* Fri bar */}
                  <div className="flex flex-col items-center gap-2 w-[14%] group">
                    <span className="text-[9px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity font-bold">42</span>
                    <div className="w-full rounded-t-md bg-primary hover:brightness-110 transition-all duration-300 h-28" />
                    <span className="text-[10px] font-bold text-muted-foreground">F</span>
                  </div>
                </div>
              </div>

              {/* Recruitment Advice Panel */}
              <div className="p-5 rounded-2xl border bg-gradient-to-br from-primary/10 to-transparent flex flex-col gap-2.5 relative overflow-hidden" style={{ borderColor: "var(--border)" }}>
                <span className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full filter blur-xl pointer-events-none" />
                <h4 className="font-bold text-xs text-primary flex items-center gap-1.5">
                  ✨ Recruitment Tips
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Gating specific categories (Scholarships, Cohorts, Fellowships, Grants) ensures that only registered members apply. Keep applicant requirements clear to optimize responses.
                </p>
              </div>

            </div>

          </div>

        </main>
      </div>

      {/* ── Add Opportunity Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={() => setShowModal(false)}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <div 
            className="relative w-full max-w-md p-6 rounded-2xl border bg-surface shadow-2xl flex flex-col gap-4 animate-scale-up"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: "var(--border)" }}>
              <h3 className="font-bold text-base text-foreground">Create New Opportunity</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleAddListing} className="flex flex-col gap-4 text-xs font-semibold">
              <div className="flex flex-col gap-1.5">
                <label className="text-muted-foreground text-[10px] uppercase tracking-wider">Opportunity Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Mastercard Scholars Program 2026"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="p-2.5 rounded-xl border bg-surface/50 text-foreground outline-none border-border focus:border-primary transition-colors text-xs"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-muted-foreground text-[10px] uppercase tracking-wider">Category</label>
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="p-2.5 rounded-xl border bg-surface/50 text-foreground outline-none border-border focus:border-primary transition-colors text-xs"
                >
                  <option value="Scholarship">Scholarship</option>
                  <option value="Cohort Training">Cohort Training</option>
                  <option value="Fellowship">Fellowship</option>
                  <option value="Grant & Funding">Grant & Funding</option>
                  <option value="Entry-Level Job">Entry-Level Job</option>
                  <option value="Volunteer & Internship">Volunteer & Internship</option>
                </select>
              </div>

              <button 
                type="submit"
                className="btn-primary w-full py-2.5 rounded-xl text-xs font-semibold mt-2 cursor-pointer"
              >
                Publish Opportunity
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PartnerDashboardPage() {
  return (
    <Suspense>
      <PartnerDashboardInner />
    </Suspense>
  );
}
