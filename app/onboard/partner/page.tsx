"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, ChevronRight, Check, CheckCircle2 } from "lucide-react";

const supportCategories = [
  "Financial Literacy",
  "Entry-Level Jobs",
  "Scholarships",
  "Fellowships",
  "Grants & Funding",
  "Volunteer & Internships",
  "Other",
];

const inputStyle = (error?: string): React.CSSProperties => ({
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  border: `1.5px solid ${error ? "rgba(239,68,68,0.6)" : "var(--border)"}`,
  background: "var(--background)",
  color: "var(--foreground)",
  fontSize: "0.9rem",
  outline: "none",
  appearance: "none" as const,
});

interface PartnerForm {
  orgName: string;
  contactEmail: string;
  categories: string[];
  capacity: string;
  website: string;
  description: string;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{label}</label>
      {children}
      {error && <p className="text-xs" style={{ color: "rgba(239,68,68,0.9)" }}>{error}</p>}
    </div>
  );
}

export default function PartnerOnboardPage() {
  const [form, setForm] = useState<PartnerForm>({
    orgName: "",
    contactEmail: "",
    categories: [],
    capacity: "",
    website: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedOrg, setSubmittedOrg] = useState("");

  function update(field: keyof PartnerForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  }

  function toggleCategory(cat: string) {
    setForm((prev) => {
      const next = prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat];
      return { ...prev, categories: next };
    });
    setErrors((prev) => { const e = { ...prev }; delete e.categories; return e; });
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.orgName.trim()) e.orgName = "Organisation name is required";
    if (!form.contactEmail.trim()) e.contactEmail = "Contact email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) e.contactEmail = "Enter a valid email address";
    if (form.categories.length === 0) e.categories = "Please select at least one category";
    if (!form.capacity.trim()) e.capacity = "Please enter your capacity per cohort";
    else if (isNaN(Number(form.capacity)) || Number(form.capacity) < 1) e.capacity = "Enter a valid number";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (validate()) {
      setSubmittedOrg(form.orgName);
      setSubmitted(true);
    }
  }

  // ─── Success screen ───────────────────────────────────────────────────

  if (submitted) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: "var(--background)" }}
      >
        {/* Animated checkmark ring */}
        <div className="relative mb-8">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(0,201,177,0.1)",
              border: "2px solid rgba(0,201,177,0.3)",
              animation: "pulseRing 2s ease-out infinite",
            }}
          >
            <CheckCircle2 size={44} style={{ color: "var(--primary)" }} />
          </div>
          {[["top-0 -right-2","#00C9B1"],["top-2 -left-4","#3B82F6"],["-bottom-1 right-4","#00C9B1"]].map(([pos, color], i) => (
            <span
              key={i}
              className={`absolute ${pos} w-2.5 h-2.5 rounded-full`}
              style={{ backgroundColor: color, animation: `confettiBurst 0.6s ${i * 100}ms cubic-bezier(0.34,1.56,0.64,1) both` }}
            />
          ))}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: "var(--foreground)" }}>
          Application{" "}
          <span style={{ color: "var(--primary)" }}>received!</span>
        </h1>

        <p className="max-w-md text-base leading-relaxed mb-2" style={{ color: "var(--muted-foreground)" }}>
          Thanks for submitting, <strong style={{ color: "var(--foreground)" }}>{submittedOrg}</strong>. Our partnerships team reviews applications within 5 business days and will be in touch via the email you provided.
        </p>
        <p className="max-w-sm text-sm leading-relaxed mb-10" style={{ color: "var(--muted-foreground)", opacity: 0.7 }}>
          In the meantime, feel free to explore what Nexus Pathways offers.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <Link
            href={`/dashboard/partner?org=${encodeURIComponent(submittedOrg)}`}
            className="btn-primary btn-shimmer px-7 py-3 rounded-xl text-sm font-semibold"
          >
            Go to your Dashboard →
          </Link>
          <Link
            href="/"
            className="text-sm font-medium transition-colors"
            style={{ color: "var(--muted-foreground)" }}
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6" style={{ background: "var(--background)" }}>
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <span className="font-black text-xs" style={{ color: "var(--primary-foreground)" }}>NP</span>
            </div>
            <span className="font-bold" style={{ color: "var(--foreground)" }}>
              Nexus<span style={{ color: "var(--primary)" }}>Pathways</span>
            </span>
          </Link>

          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(0,201,177,0.1)", border: "1px solid rgba(0,201,177,0.25)" }}
          >
            <Building2 size={26} style={{ color: "var(--primary)" }} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2" style={{ color: "var(--foreground)" }}>
            Partner Onboarding
          </h1>
          <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: "var(--muted-foreground)" }}>
            Nexus Pathways collaborates with trusted, recognised partners to match youth aged 15–35 with decent opportunities for holistic growth. We&apos;d love your contribution.
          </p>
        </div>

        {/* Form card */}
        <div
          className="rounded-2xl p-6 sm:p-8 flex flex-col gap-6"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >

          <Field label="Organisation / Company Name *" error={errors.orgName}>
            <input
              style={inputStyle(errors.orgName)}
              placeholder="e.g. Amref Health Africa"
              value={form.orgName}
              onChange={(e) => update("orgName", e.target.value)}
            />
          </Field>

          <Field label="Contact Person's Email *" error={errors.contactEmail}>
            <input
              type="email"
              style={inputStyle(errors.contactEmail)}
              placeholder="contact@organisation.org"
              value={form.contactEmail}
              onChange={(e) => update("contactEmail", e.target.value)}
            />
          </Field>

          {/* Category multi-select chips */}
          <Field label="Category of Support *" error={errors.categories}>
            <div className="flex flex-wrap gap-2 mt-1">
              {supportCategories.map((cat) => {
                const selected = form.categories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150"
                    style={{
                      border: `1.5px solid ${selected ? "var(--primary)" : "var(--border)"}`,
                      background: selected ? "rgba(0,201,177,0.1)" : "transparent",
                      color: selected ? "var(--primary)" : "var(--muted-foreground)",
                    }}
                  >
                    {selected && <Check size={12} />}
                    {cat}
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="Youth Capacity per Cohort *" error={errors.capacity}>
            <input
              type="number"
              min="1"
              style={inputStyle(errors.capacity)}
              placeholder="e.g. 50"
              value={form.capacity}
              onChange={(e) => update("capacity", e.target.value)}
            />
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              How many youth can your organisation support per cohort?
            </p>
          </Field>

          <Field label="Website / Social Link (Optional)">
            <input
              type="url"
              style={inputStyle()}
              placeholder="https://yourorganisation.org"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
            />
          </Field>

          <Field label="Brief Description (Optional)">
            <textarea
              style={{ ...inputStyle(), height: "90px", resize: "none" as const, lineHeight: "1.5" }}
              placeholder="Tell us about your organisation in 2–3 sentences..."
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </Field>

          {/* Submit */}
          <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid var(--border)" }}>
            <Link
              href="/partner"
              className="text-sm font-medium"
              style={{ color: "var(--muted-foreground)" }}
            >
              ← Back
            </Link>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm"
            >
              Send Application <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "var(--muted-foreground)" }}>
          Our team will review your submission and reach out within 5 business days.
        </p>
      </div>
    </div>
  );
}
