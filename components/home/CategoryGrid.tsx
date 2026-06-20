import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  Users,
  Banknote,
  Award,
  Heart,
  ArrowRight,
} from "lucide-react";
import { categoryMeta } from "@/lib/data/opportunities";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Briefcase,
  Users,
  Banknote,
  Award,
  Heart,
};

// Map category label to the CSS var keys defined in globals.css
const catVarKey: Record<string, string> = {
  "Scholarship":            "scholarship",
  "Entry-Level Job":        "job",
  "Cohort Training":        "training",
  "Grant & Funding":        "grant",
  "Fellowship":             "fellowship",
  "Volunteer & Internship": "volunteer",
};

export function CategoryGrid() {
  return (
    <section className="w-full py-16" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
              Explore Categories
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
              What are you looking for?
            </h2>
          </div>
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-1.5 text-sm font-semibold shrink-0 transition-opacity hover:opacity-80"
            style={{ color: "var(--primary)" }}
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryMeta.map((cat) => {
            const Icon = iconMap[cat.icon];
            const key = catVarKey[cat.label] ?? "job";
            const href = `/opportunities?category=${encodeURIComponent(cat.label)}`;

            return (
              <Link
                key={cat.label}
                href={href}
                className="group flex flex-col gap-4 p-6 rounded-2xl card-hover"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                {/* Icon + count row */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: `var(--cat-${key}-bg)`,
                      border: `1px solid var(--cat-${key}-border)`,
                    }}
                  >
                    <Icon size={20} style={{ color: `var(--cat-${key})` }} />
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: "var(--cat-job-bg)",
                      border: "1px solid var(--border)",
                      color: "var(--primary)",
                    }}
                  >
                    {cat.count} open
                  </span>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5">
                  <h3
                    className="font-semibold transition-colors"
                    style={{ color: "var(--foreground)" }}
                  >
                    {cat.label}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                    {cat.description}
                  </p>
                </div>

                {/* Arrow */}
                <div
                  className="flex items-center gap-1 text-xs font-semibold mt-auto"
                  style={{ color: `var(--cat-${key})` }}
                >
                  Explore
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
