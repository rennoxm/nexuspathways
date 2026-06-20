import { type Opportunity } from "@/lib/data/opportunities";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const categoryColors: Record<string, string> = {
  "Scholarship": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Entry-Level Job": "bg-teal-500/10 text-teal-400 border-teal-500/20",
  "Cohort Training": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Grant & Funding": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Fellowship": "bg-rose-500/10 text-rose-400 border-rose-500/20",
  "Volunteer & Internship": "bg-green-500/10 text-green-400 border-green-500/20",
};

const lightCategoryColors: Record<string, string> = {
  "Scholarship": "bg-blue-50 text-blue-700 border-blue-200",
  "Entry-Level Job": "bg-teal-50 text-teal-700 border-teal-200",
  "Cohort Training": "bg-purple-50 text-purple-700 border-purple-200",
  "Grant & Funding": "bg-amber-50 text-amber-700 border-amber-200",
  "Fellowship": "bg-rose-50 text-rose-700 border-rose-200",
  "Volunteer & Internship": "bg-green-50 text-green-700 border-green-200",
};

function formatDeadline(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function isUrgent(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diff <= 14 && diff >= 0;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const { title, organisation, category, workType, deadline, isPaid, location, link, description } = opportunity;
  const urgent = isUrgent(deadline);

  return (
    <div className="group relative flex flex-col gap-4 p-5 rounded-xl border border-border bg-card card-hover">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <span
            className={`inline-flex w-fit text-xs font-medium px-2.5 py-0.5 rounded-full border ${categoryColors[category]}`}
          >
            {category}
          </span>
          <h3 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors text-base">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground font-medium">{organisation}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{description}</p>

      {/* Meta badges */}
      <div className="flex flex-wrap gap-2 mt-auto">
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border border-border text-muted-foreground">
          <MapPin size={11} />
          {workType} · {location}
        </span>
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border ${
            isPaid
              ? "border-teal-500/30 text-teal-400 bg-teal-500/5"
              : "border-border text-muted-foreground"
          }`}
        >
          {isPaid ? "Paid" : "Unpaid"}
        </span>
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border ${
            urgent
              ? "border-rose-500/30 text-rose-400 bg-rose-500/5"
              : "border-border text-muted-foreground"
          }`}
        >
          <Calendar size={11} />
          {urgent ? "Closing soon — " : ""}
          {formatDeadline(deadline)}
        </span>
      </div>

      {/* CTA */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary inline-flex items-center justify-center gap-2 w-full text-sm font-semibold py-2.5 rounded-lg mt-1"
      >
        View Opportunity
        <ExternalLink size={14} />
      </a>
    </div>
  );
}
