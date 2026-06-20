import { type Opportunity } from "@/lib/data/opportunities";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const categoryAccents: Record<string, { label: string; border: string; text: string; bg: string }> = {
  "Scholarship":            { label: "Scholarship",            bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.3)",  text: "#60A5FA" },
  "Entry-Level Job":        { label: "Entry-Level Job",        bg: "rgba(0,201,177,0.1)",   border: "rgba(0,201,177,0.3)",   text: "#00C9B1" },
  "Cohort Training":        { label: "Cohort Training",        bg: "rgba(168,85,247,0.1)",  border: "rgba(168,85,247,0.3)",  text: "#C084FC" },
  "Grant & Funding":        { label: "Grant & Funding",        bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.3)",  text: "#FCD34D" },
  "Fellowship":             { label: "Fellowship",             bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.3)",   text: "#FCA5A5" },
  "Volunteer & Internship": { label: "Volunteer & Internship", bg: "rgba(34,197,94,0.1)",   border: "rgba(34,197,94,0.3)",   text: "#86EFAC" },
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
  const accent = categoryAccents[category] ?? categoryAccents["Entry-Level Job"];
  const days = daysLeft(deadline);
  const urgent = days <= 14 && days >= 0;

  return (
    <div
      className="group flex flex-col gap-4 p-5 rounded-2xl card-hover"
      style={{
        background: "var(--surface)",
        border: "1px solid rgba(0,201,177,0.12)",
      }}
    >
      {/* Category tag */}
      <span
        className="inline-flex w-fit text-xs font-semibold px-2.5 py-1 rounded-full"
        style={{ background: accent.bg, border: `1px solid ${accent.border}`, color: accent.text }}
      >
        {category}
      </span>

      {/* Title + org */}
      <div className="flex flex-col gap-1">
        <h3
          className="font-semibold leading-snug text-base transition-colors group-hover:opacity-80"
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

      {/* Meta */}
      <div className="flex flex-wrap gap-2 mt-auto">
        <span
          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg"
          style={{ border: "1px solid rgba(0,201,177,0.15)", color: "var(--muted-foreground)" }}
        >
          <MapPin size={11} style={{ color: "var(--primary)" }} />
          {workType} · {location}
        </span>

        <span
          className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg"
          style={
            isPaid
              ? { border: "1px solid rgba(0,201,177,0.3)", color: "#00C9B1", background: "rgba(0,201,177,0.08)" }
              : { border: "1px solid rgba(0,201,177,0.1)", color: "var(--muted-foreground)" }
          }
        >
          {isPaid ? "Paid" : "Unpaid"}
        </span>

        <span
          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg"
          style={
            urgent
              ? { border: "1px solid rgba(239,68,68,0.3)", color: "#FCA5A5", background: "rgba(239,68,68,0.08)" }
              : { border: "1px solid rgba(0,201,177,0.1)", color: "var(--muted-foreground)" }
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
