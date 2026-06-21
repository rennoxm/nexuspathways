import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle, ArrowRight } from "lucide-react";

const benefits = [
  "List scholarships, jobs, fellowships, grants, internships, and trainings",
  "Reach a targeted audience of motivated African youth",
  "Your opportunity goes live within 48 hours of submission",
  "Advance your organisation's social impact mandate",
  "Align with UN SDG goals through measurable youth engagement",
];

const partnerTypes = [
  { label: "Grassroots NGOs", desc: "Community-based organisations running local programmes" },
  { label: "Government Agencies", desc: "Ministries and public bodies with youth-facing mandates" },
  { label: "Private Companies", desc: "Corporates offering internships, jobs, and CSR initiatives" },
  { label: "International Bodies", desc: "UN agencies, development banks, and global foundations" },
];

export default function PartnerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Partner With Us
                </p>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                  Provide youth-centred opportunities that matter.
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Partner with Nexus Pathways to connect your organisation with thousands of skilled and unskilled young Africans actively seeking trusted opportunities.
                </p>
              </div>
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-border">
                <Image
                  src="/photo-1758876203420-1ed6db481d4f.jpg"
                  alt="Two colleagues reviewing work together"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Who we work with */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col gap-2 mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Who We Work With</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Open to all organisations that serve youth
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {partnerTypes.map((pt) => (
              <div key={pt.label} className="flex flex-col gap-2 p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground">{pt.label}</h3>
                <p className="text-sm text-muted-foreground">{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits + form */}
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Benefits */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">Why Partner</p>
                  <h2 className="text-2xl font-bold text-foreground tracking-tight">What you get</h2>
                </div>
                <ul className="flex flex-col gap-3">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle size={17} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-5 rounded-xl border border-border bg-surface text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground block mb-1">Currently free for approved partners.</strong>
                  During our MVP phase, listing opportunities on Nexus Pathways is free for all vetted organisations. This will be reviewed as we scale.
                </div>
              </div>

              {/* CTA card — links to dedicated onboarding form */}
              <div
                className="flex flex-col gap-6 p-8 rounded-2xl"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
                    Ready to partner?
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                    Fill out the partner onboarding form to tell us about your organisation and the opportunities you&apos;d like to list. Our team will review your application within 5 business days.
                  </p>
                </div>
                <ul className="flex flex-col gap-2">
                  {["Takes less than 5 minutes", "Free for approved partners during MVP", "Go live within 48 hours of approval"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                      <CheckCircle size={14} style={{ color: "var(--primary)", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/onboard/partner"
                  className="btn-primary inline-flex items-center justify-center gap-2 w-full text-sm font-semibold py-3 rounded-xl"
                >
                  Start Partner Application <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
