"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { opportunities } from "@/lib/data/opportunities";
import { OpportunityCard } from "@/components/opportunities/OpportunityCard";
import { useInView } from "@/hooks/useInView";

const featured = opportunities.slice(0, 4);
const cardDelays = [0, 80, 160, 240];

export function FeaturedOpps() {
  const { ref: headerRef, inView: headerIn } = useInView(0.2);
  const { ref: gridRef, inView: gridIn } = useInView(0.1);

  return (
    <section className="w-full py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 anim-slide-up ${headerIn ? "inview" : ""}`}
        >
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Latest Listings
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Featured opportunities
            </h2>
            <p className="text-sm text-muted-foreground">
              Handpicked from our trusted network of organisations.
            </p>
          </div>
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            Browse all <ArrowRight size={14} />
          </Link>
        </div>

        {/* Card grid */}
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {featured.map((opp, i) => (
            <div
              key={opp.id}
              className={`anim-slide-up ${gridIn ? "inview" : ""}`}
              style={{ animationDelay: `${cardDelays[i] ?? 0}ms` }}
            >
              <OpportunityCard opportunity={opp} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
