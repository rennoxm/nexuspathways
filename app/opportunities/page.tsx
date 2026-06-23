"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OpportunityCard } from "@/components/opportunities/OpportunityCard";
import { opportunities, type OpportunityCategory, type WorkType } from "@/lib/data/opportunities";
import { SlidersHorizontal, X } from "lucide-react";

const categories: OpportunityCategory[] = [
  "Scholarship",
  "Entry-Level Job",
  "Cohort Training",
  "Grant & Funding",
  "Fellowship",
  "Volunteer & Internship",
];

const workTypes: WorkType[] = ["Remote", "Hybrid", "Onsite"];

function OpportunitiesInner() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | "">("");
  const [selectedWorkType, setSelectedWorkType] = useState<WorkType | "">("");
  const [paidFilter, setPaidFilter] = useState<"all" | "paid" | "unpaid">("all");

  // Synchronise state from URL search params on mount or navigation changes
  useEffect(() => {
    const q = searchParams.get("q");
    setSearchQuery(q || "");

    const cat = searchParams.get("category");
    if (cat) {
      const cleanCat = decodeURIComponent(cat.replace(/\+/g, " "));
      const matched = categories.find((c) => c.toLowerCase() === cleanCat.toLowerCase());
      setSelectedCategory(matched || "");
    } else {
      setSelectedCategory("");
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return opportunities.filter((opp) => {
      const matchesSearch =
        !searchQuery ||
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.organisation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = !selectedCategory || opp.category === selectedCategory;
      const matchesWorkType = !selectedWorkType || opp.workType === selectedWorkType;
      const matchesPaid =
        paidFilter === "all" ||
        (paidFilter === "paid" && opp.isPaid) ||
        (paidFilter === "unpaid" && !opp.isPaid);

      return matchesSearch && matchesCategory && matchesWorkType && matchesPaid;
    });
  }, [searchQuery, selectedCategory, selectedWorkType, paidFilter]);

  const hasFilters = selectedCategory || selectedWorkType || paidFilter !== "all" || searchQuery;

  function clearFilters() {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedWorkType("");
    setPaidFilter("all");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Page header */}
        <div className="border-b border-border bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Opportunities</h1>
              <p className="text-sm text-muted-foreground">
                {filtered.length} opportunity{filtered.length !== 1 ? "ies" : "y"} found
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by title, organisation, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as OpportunityCategory | "")}
              className="px-3 py-2.5 rounded-lg border border-border bg-surface text-sm text-foreground outline-none focus:border-primary transition-colors cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Work type */}
            <select
              value={selectedWorkType}
              onChange={(e) => setSelectedWorkType(e.target.value as WorkType | "")}
              className="px-3 py-2.5 rounded-lg border border-border bg-surface text-sm text-foreground outline-none focus:border-primary transition-colors cursor-pointer"
            >
              <option value="">All Work Types</option>
              {workTypes.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>

            {/* Paid filter */}
            <div className="flex items-center gap-1 p-1 rounded-lg border border-border bg-surface">
              {(["all", "paid", "unpaid"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setPaidFilter(opt)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                    paidFilter === opt
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Clear */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
              >
                <X size={13} /> Clear
              </button>
            )}
          </div>

          {/* Results */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((opp) => (
                <OpportunityCard key={opp.id} opportunity={opp} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
              <SlidersHorizontal size={32} className="text-muted-foreground" />
              <p className="font-semibold text-foreground">No results found</p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Try adjusting your filters or clearing the search to see all opportunities.
              </p>
              <button
                onClick={clearFilters}
                className="mt-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function OpportunitiesPage() {
  return (
    <Suspense>
      <OpportunitiesInner />
    </Suspense>
  );
}
