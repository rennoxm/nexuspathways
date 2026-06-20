import { type Opportunity } from "@/lib/data/opportunities";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

// Maps category to the CSS var key defined in globals.css
const catVarKey: Record<string, string> = {
  "Scholarship":            "scholarship",
  "Entry-Level Job":        "job",
  "Cohort Training":        "training",
  "Grant & Funding":        "grant",
  "Fellowship":             "fellowship",
  "Volunteer & Internship": "volunteer",
};

function formatDeadline(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function daysLeft(dateStr: string): number {
  const date = new Date(dateStr);
  const now = new Date();
  return Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const { title, organisation, category, workType, deadline, isPaid, location, link, description } = opportunity;
  const key = catVarKey[category] ?? "job";
  const days = daysLeft(deadline);
  const urgent = days <= 14 && days >= 0;

  return (
    <div
      className="group flex flex-col gap-4 p-5 rounded-2xl card-hover"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Category tag */}
      <span
        className="inline-flex w-fit text-xs font-semibold px-2.5 py-1 rounded-full"
        style={{
          background: `var(--cat-${key}-bg)`,
          border: `1px solid var(--cat-${key}-border)`,
          color: `var(--cat-${key})`,
        }}
      >
        {category}
      </span>

      {/* Title + org */}
      <div className="flex flex-col gap-1">
        <h3
          className="font-semibold leading-snug text-base"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h3>
        <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
          {organisation}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--muted-foreground)" }}>
        {description}
      </p>

      {/* Meta badges */}
      <div className="flex flex-wrap gap-2 mt-auto">
        <span
          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg"
          style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}
        >
          <MapPin size={11} style={{ color: "var(--primary)" }} />
          {workType} · {location}
        </span>

        <span
          className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg"
          style={
            isPaid
              ? {
                  border: "1px solid var(--cat-job-border)",
                  color: "var(--cat-job)",
                  background: "var(--cat-job-bg)",
                }
              : { border: "1px solid var(--border)", color: "var(--muted-foreground)" }
          }
        >
          {isPaid ? "Paid" : "Unpaid"}
        </span>

        <span
          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg"
          style={
            urgent
              ? {
                  border: "1px solid var(--cat-fellowship-border)",
                  color: "var(--cat-fellowship)",
                  background: "var(--cat-fellowship-bg)",
                }
              : { border: "1px solid var(--border)", color: "var(--muted-foreground)" }
          }
        >
          <Calendar size={11} />
          {urgent ? `${days}d left` : formatDeadline(deadline)}
        </span>
      </div>

      {/* CTA */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary inline-flex items-center justify-center gap-2 w-full text-sm py-2.5 rounded-xl mt-1"
      >
        View Opportunity
        <ExternalLink size={13} />
      </a>
    </div>
  );
}
