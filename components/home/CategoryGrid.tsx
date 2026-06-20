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

export function CategoryGrid() {
  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Explore Categories
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              What are you looking for?
            </h2>
          </div>
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            View all opportunities <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryMeta.map((cat) => {
            const Icon = iconMap[cat.icon];
            const href = `/opportunities?category=${encodeURIComponent(cat.label)}`;

            return (
              <Link
                key={cat.label}
                href={href}
                className="group flex flex-col gap-4 p-5 rounded-xl border border-border bg-card card-hover"
              >
                {/* Icon + count */}
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
                    {cat.count} open
                  </span>
                </div>

                {/* Label + description */}
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors mt-auto">
                  Explore <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
