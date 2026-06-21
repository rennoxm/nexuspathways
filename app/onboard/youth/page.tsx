"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Info,
  Clock,
  CheckCircle2,
  PiggyBank,
  TrendingDown,
  TrendingUp,
  FileText,
  Wallet,
  Rocket,
} from "lucide-react";
import { africanCountries, africanPhoneCodes } from "@/lib/data/african-countries";

// ─── Pathway data ───────────────────────────────────────────────────────────

const iconMap: Record<string, React.ElementType> = {
  PiggyBank, TrendingDown, TrendingUp, FileText, Wallet, Rocket,
};

const pathways = [
  {
    id: "financial",
    title: "Secure the Bag",
    subtitle: "Financial Literacy — Build wealth, ditch debt, understand your money",
    varKey: "scholarship",
    topics: [
      { id: "budget",       label: "Budget & Spend Tracking",         icon: "PiggyBank" },
      { id: "debt",         label: "Debt Management",                  icon: "TrendingDown" },
      { id: "investing",    label: "Investing & Stock Markets",        icon: "TrendingUp" },
      { id: "taxes",        label: "Taxes, Legal & Compliance",        icon: "FileText" },
      { id: "crypto",       label: "Digital Banking & Crypto",         icon: "Wallet" },
      { id: "entrepreneur", label: "Entrepreneurship & Fundraising",   icon: "Rocket" },
    ],
  },
];

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  firstName: string;
  surname: string;
  dob: string;
  idNumber: string;
  country: string;
  city: string;
  phoneCode: string;
  phone: string;
  email: string;
  gender: string;
  guardianEmail: string;
  guardianConsent: boolean;
  selectedTopics: string[];
}

type Step = 1 | 2 | 3;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getAge(dob: string): number | null {
  if (!dob) return null;
  const birth = new Date(dob);
  if (isNaN(birth.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
}

// ─── Shared input style helper ────────────────────────────────────────────────

const inputStyle = (error?: string): React.CSSProperties => ({
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  border: `1.5px solid ${error ? "rgba(239,68,68,0.6)" : "var(--border)"}`,
  background: "var(--background)",
  color: "var(--foreground)",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.15s ease",
  appearance: "none" as const,
});

// ─── Main component ──────────────────────────────────────────────────────────

export default function YouthOnboardPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>(1);
  const [blocked, setBlocked] = useState(false);    // under-15
  const [tooOld, setTooOld] = useState(false);       // over-35
  const [isMinor, setIsMinor] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<FormData>({
    firstName: "",
    surname: "",
    dob: "",
    idNumber: "",
    country: "",
    city: "",
    phoneCode: "+254",
    phone: "",
    email: "",
    gender: "",
    guardianEmail: "",
    guardianConsent: false,
    selectedTopics: [],
  });

  function update(field: keyof FormData, value: string | boolean | string[]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  }

  function handleDobChange(val: string) {
    update("dob", val);
    const age = getAge(val);
    if (age === null) return;
    if (age < 15) {
      setBlocked(true);
      setTooOld(false);
      setIsMinor(false);
    } else if (age > 35) {
      setTooOld(true);
      setBlocked(false);
      setIsMinor(false);
    } else {
      setBlocked(false);
      setTooOld(false);
      setIsMinor(age < 18);
    }
  }

  function toggleTopic(id: string) {
    setForm((prev) => {
      const current = prev.selectedTopics;
      const next = current.includes(id)
        ? current.filter((t) => t !== id)
        : [...current, id];
      return { ...prev, selectedTopics: next };
    });
    setErrors((prev) => { const e = { ...prev }; delete e.topics; return e; });
  }

  // ── Validation ───────────────────────────────────────────────────────────

  function validateStep1(): boolean {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.surname.trim()) e.surname = "Surname is required";
    if (!form.dob) e.dob = "Date of birth is required";
    if (!form.idNumber.trim()) e.idNumber = "ID or birth certificate number is required";
    if (!form.country) e.country = "Please select your country";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.gender) e.gender = "Please select your gender";
    if (isMinor) {
      if (!form.guardianEmail.trim()) e.guardianEmail = "Guardian email is required for minors";
      if (!form.guardianConsent) e.guardianConsent = "Please confirm your guardian is aware";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2(): boolean {
    if (form.selectedTopics.length === 0) {
      setErrors({ topics: "Please select at least one area of interest" });
      return false;
    }
    setErrors({});
    return true;
  }

  function handleNext() {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
  }

  function handleBack() {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  }

  function handleSubmit() {
    router.push(`/dashboard?name=${encodeURIComponent(form.firstName)}`);
  }

  // ─── Under-15 block screen ────────────────────────────────────────────────

  if (blocked) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: "var(--background)" }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
          style={{ background: "rgba(0,201,177,0.1)", border: "1px solid rgba(0,201,177,0.25)" }}
        >
          <Clock size={36} style={{ color: "var(--primary)" }} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
          You&apos;re a little early for this one.
        </h1>
        <p className="max-w-md text-base leading-relaxed mb-8" style={{ color: "var(--muted-foreground)" }}>
          Nexus Pathways is built for youth aged 15 and above. Come back when you&apos;re 15 — we&apos;ll still be here, and the opportunities will be even better.
        </p>
        <Link href="/" className="btn-primary px-6 py-3 rounded-xl text-sm">
          ← Back to Homepage
        </Link>
      </div>
    );
  }

  // ─── Over-35 block screen ─────────────────────────────────────────────────

  if (tooOld) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: "var(--background)" }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
          style={{ background: "rgba(0,201,177,0.08)", border: "1px solid rgba(0,201,177,0.2)" }}
        >
          <Clock size={36} style={{ color: "var(--primary)", opacity: 0.75 }} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
          Slightly late to this one.
        </h1>
        <p className="max-w-md text-base leading-relaxed mb-3" style={{ color: "var(--muted-foreground)" }}>
          Nexus Pathways is focused on youth aged 15–35. You&apos;re just a little past our target window, but your experience and wisdom are still incredibly valuable.
        </p>
        <p className="max-w-sm text-sm leading-relaxed mb-8" style={{ color: "var(--muted-foreground)", opacity: 0.75 }}>
          If you&apos;re looking to mentor, partner, or contribute — our partner programme might be the right fit.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/onboard/partner"
            className="btn-primary px-6 py-3 rounded-xl text-sm"
          >
            Explore Partnership
          </Link>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl text-sm font-medium transition-colors"
            style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6"
      style={{ background: "var(--background)" }}
    >
      <div className={`mx-auto w-full transition-all duration-300 ${step === 2 ? "max-w-4xl" : "max-w-2xl"}`}>

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
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2" style={{ color: "var(--foreground)" }}>
            Unlimited Opportunities,{" "}
            <span style={{ color: "var(--primary)" }}>No Gatekeeping.</span>
          </h1>
          <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: "var(--muted-foreground)" }}>
            Secure the bag — build wealth, manage debt, and understand your money. Choose the financial pathways that match your goals.
          </p>
        </div>

        {/* Stepper */}
        <Stepper step={step} />

        {/* Form card */}
        <div
          className="rounded-2xl p-6 sm:p-8 mt-6"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          {step === 1 && (
            <Step1
              form={form}
              errors={errors}
              isMinor={isMinor}
              update={update}
              handleDobChange={handleDobChange}
            />
          )}
          {step === 2 && (
            <Step2
              selectedTopics={form.selectedTopics}
              toggleTopic={toggleTopic}
              errors={errors}
            />
          )}
          {step === 3 && (
            <Step3
              form={form}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          )}

          {/* Navigation — shown on steps 1 and 2 */}
          {step !== 3 && (
            <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                  style={{ color: "var(--muted-foreground)", border: "1px solid var(--border)" }}
                >
                  <ChevronLeft size={15} /> Back
                </button>
              ) : (
                <Link
                  href="/"
                  className="text-sm font-medium"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  ← Back to site
                </Link>
              )}
              <button
                onClick={handleNext}
                className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm"
              >
                {step === 2 ? "Review" : "Next"} <ChevronRight size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Stepper ─────────────────────────────────────────────────────────────────

function Stepper({ step }: { step: Step }) {
  const steps = ["Personal Details", "Choose Pathways", "Review & Submit"];
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = step > n;
        const active = step === n;
        return (
          <div key={label} className="flex items-center gap-0">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  background: done || active ? "var(--primary)" : "var(--muted)",
                  color: done || active ? "var(--primary-foreground)" : "var(--muted-foreground)",
                  border: active ? "2px solid var(--primary)" : "none",
                }}
              >
                {done ? <Check size={14} /> : n}
              </div>
              <span
                className="text-xs font-medium whitespace-nowrap hidden sm:block"
                style={{ color: active ? "var(--primary)" : "var(--muted-foreground)" }}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="h-px w-12 sm:w-20 mx-2 mb-4 transition-all duration-300"
                style={{ background: step > n ? "var(--primary)" : "var(--border)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1 — Personal Details ───────────────────────────────────────────────

function Step1({
  form,
  errors,
  isMinor,
  update,
  handleDobChange,
}: {
  form: FormData;
  errors: Record<string, string>;
  isMinor: boolean;
  update: (field: keyof FormData, value: string | boolean) => void;
  handleDobChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold mb-1" style={{ color: "var(--foreground)" }}>Personal Details</h2>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>All fields marked * are required.</p>
      </div>

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First Name *" error={errors.firstName}>
          <input
            style={inputStyle(errors.firstName)}
            placeholder="e.g. Amara"
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
          />
        </Field>
        <Field label="Surname *" error={errors.surname}>
          <input
            style={inputStyle(errors.surname)}
            placeholder="e.g. Osei"
            value={form.surname}
            onChange={(e) => update("surname", e.target.value)}
          />
        </Field>
      </div>

      {/* DOB + ID row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Date of Birth *" error={errors.dob}>
          <input
            type="date"
            style={inputStyle(errors.dob)}
            value={form.dob}
            onChange={(e) => handleDobChange(e.target.value)}
          />
        </Field>
        <Field label="ID / Birth Certificate No. *" error={errors.idNumber}>
          <input
            style={inputStyle(errors.idNumber)}
            placeholder="e.g. 30012345"
            value={form.idNumber}
            onChange={(e) => update("idNumber", e.target.value)}
          />
        </Field>
      </div>

      {/* Location row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Country *" error={errors.country}>
          <select
            style={inputStyle(errors.country)}
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
          >
            <option value="">Select your country</option>
            {africanCountries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="City *" error={errors.city}>
          <input
            style={inputStyle(errors.city)}
            placeholder="e.g. Nairobi"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
          />
        </Field>
      </div>

      {/* Phone */}
      <Field label="Phone Number *" error={errors.phone}>
        <div className="flex gap-2">
          <select
            style={{ ...inputStyle(), width: "auto", minWidth: "110px", flexShrink: 0 }}
            value={form.phoneCode}
            onChange={(e) => update("phoneCode", e.target.value)}
          >
            {africanPhoneCodes.map(({ code, country }) => (
              <option key={code} value={code}>{code} ({country})</option>
            ))}
          </select>
          <input
            type="tel"
            style={{ ...inputStyle(errors.phone), flex: 1 }}
            placeholder="700 000 000"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
      </Field>

      {/* Email — optional */}
      <Field label="Email (Optional)">
        <input
          type="email"
          style={inputStyle()}
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </Field>

      {/* Gender */}
      <Field label="Gender *" error={errors.gender}>
        <div className="flex flex-wrap gap-3">
          {["Male", "Female", "Non-binary", "Prefer not to say"].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => update("gender", g)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150"
              style={{
                border: `1.5px solid ${form.gender === g ? "var(--primary)" : "var(--border)"}`,
                background: form.gender === g ? "rgba(0,201,177,0.1)" : "transparent",
                color: form.gender === g ? "var(--primary)" : "var(--muted-foreground)",
              }}
            >
              {g}
            </button>
          ))}
        </div>
        {errors.gender && <p className="text-xs mt-1" style={{ color: "rgba(239,68,68,0.9)" }}>{errors.gender}</p>}
      </Field>

      {/* Under-18 guardian notice */}
      {isMinor && (
        <div
          className="flex flex-col gap-4 p-4 rounded-xl"
          style={{ background: "rgba(0,201,177,0.07)", border: "1px solid rgba(0,201,177,0.25)" }}
        >
          <div className="flex items-start gap-3">
            <Info size={16} style={{ color: "var(--primary)", marginTop: 2, flexShrink: 0 }} />
            <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
              You&apos;re joining as a minor (under 18). Please provide a parent or guardian&apos;s email below — they&apos;ll receive a brief consent notification.
            </p>
          </div>
          <Field label="Guardian / Parent Email *" error={errors.guardianEmail}>
            <input
              type="email"
              style={inputStyle(errors.guardianEmail)}
              placeholder="guardian@example.com"
              value={form.guardianEmail}
              onChange={(e) => update("guardianEmail", e.target.value)}
            />
          </Field>
          <label className="flex items-start gap-3 cursor-pointer">
            <div
              onClick={() => update("guardianConsent", !form.guardianConsent)}
              className="w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 cursor-pointer transition-all"
              style={{
                background: form.guardianConsent ? "var(--primary)" : "transparent",
                border: `1.5px solid ${errors.guardianConsent ? "rgba(239,68,68,0.6)" : form.guardianConsent ? "var(--primary)" : "var(--border)"}`,
              }}
            >
              {form.guardianConsent && <Check size={12} style={{ color: "var(--primary-foreground)" }} />}
            </div>
            <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              My guardian knows I&apos;m registering on Nexus Pathways.
            </span>
          </label>
          {errors.guardianConsent && (
            <p className="text-xs" style={{ color: "rgba(239,68,68,0.9)" }}>{errors.guardianConsent}</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Step 2 — Choose Pathways ─────────────────────────────────────────────────

function Step2({
  selectedTopics,
  toggleTopic,
  errors,
}: {
  selectedTopics: string[];
  toggleTopic: (id: string) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-lg font-bold mb-1" style={{ color: "var(--foreground)" }}>Choose Your Pathways</h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          Choose the opportunities and gigs that match your needs, expertise, and interests. Pick from as many sections as you like.
        </p>
        {errors.topics && (
          <p className="text-xs mt-2 font-medium" style={{ color: "rgba(239,68,68,0.9)" }}>
            {errors.topics}
          </p>
        )}
      </div>

      {pathways.map((pathway) => (
        <div key={pathway.id}>
          {/* Section header */}
          <div className="mb-4">
            <h3 className="font-bold text-base" style={{ color: `var(--cat-${pathway.varKey})` }}>
              {pathway.title}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
              {pathway.subtitle}
            </p>
          </div>

          {/* Topic cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pathway.topics.map((topic) => {
              const selected = selectedTopics.includes(topic.id);
              const Icon = iconMap[topic.icon];
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => toggleTopic(topic.id)}
                  className="relative flex flex-col gap-3 p-4 rounded-xl text-left transition-all duration-150"
                  style={{
                    background: selected
                      ? `var(--cat-${pathway.varKey}-bg)`
                      : "var(--background)",
                    border: `1.5px solid ${selected ? `var(--cat-${pathway.varKey}-border)` : "var(--border)"}`,
                  }}
                >
                  {/* Tick */}
                  {selected && (
                    <div
                      className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: `var(--cat-${pathway.varKey})` }}
                    >
                      <Check size={11} style={{ color: "var(--primary-foreground)" }} />
                    </div>
                  )}
                  {Icon && (
                    <Icon
                      size={20}
                      style={{ color: selected ? `var(--cat-${pathway.varKey})` : "var(--muted-foreground)" }}
                    />
                  )}
                  <span
                    className="text-sm font-medium leading-snug pr-5"
                    style={{ color: selected ? "var(--foreground)" : "var(--muted-foreground)" }}
                  >
                    {topic.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Divider between sections */}
          <div className="mt-6 h-px" style={{ background: "var(--border)" }} />
        </div>
      ))}
    </div>
  );
}

// ─── Step 3 — Review & Submit ─────────────────────────────────────────────────

function Step3({
  form,
  onBack,
  onSubmit,
}: {
  form: FormData;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const selectedByPathway = pathways.map((p) => ({
    ...p,
    selected: p.topics.filter((t) => form.selectedTopics.includes(t.id)),
  })).filter((p) => p.selected.length > 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold mb-1" style={{ color: "var(--foreground)" }}>Review & Submit</h2>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Double-check your info before submitting.</p>
      </div>

      {/* Personal summary */}
      <div
        className="rounded-xl p-5 flex flex-col gap-3"
        style={{ background: "var(--background)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Personal Details</h3>
          <button
            type="button"
            onClick={onBack}
            className="text-xs font-medium"
            style={{ color: "var(--primary)" }}
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {[
            ["Name", `${form.firstName} ${form.surname}`],
            ["Date of Birth", form.dob],
            ["Country", form.country],
            ["City", form.city],
            ["Phone", `${form.phoneCode} ${form.phone}`],
            ["Email", form.email || "Not provided"],
            ["Gender", form.gender],
          ].map(([k, v]) => (
            <div key={k}>
              <span style={{ color: "var(--muted-foreground)" }}>{k}: </span>
              <span style={{ color: "var(--foreground)" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pathway summary */}
      <div
        className="rounded-xl p-5 flex flex-col gap-4"
        style={{ background: "var(--background)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            Pathways Selected ({form.selectedTopics.length})
          </h3>
          <button
            type="button"
            onClick={() => { /* handled by parent back */ onBack(); onBack(); }}
            className="text-xs font-medium"
            style={{ color: "var(--primary)" }}
          >
            Edit
          </button>
        </div>
        {selectedByPathway.map((p) => (
          <div key={p.id}>
            <p className="text-xs font-bold mb-2" style={{ color: `var(--cat-${p.varKey})` }}>
              {p.title}
            </p>
            <div className="flex flex-wrap gap-2">
              {p.selected.map((t) => (
                <span
                  key={t.id}
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    background: `var(--cat-${p.varKey}-bg)`,
                    border: `1px solid var(--cat-${p.varKey}-border)`,
                    color: `var(--cat-${p.varKey})`,
                  }}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row gap-3 items-center pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl"
          style={{ color: "var(--muted-foreground)", border: "1px solid var(--border)" }}
        >
          <ChevronLeft size={15} /> Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="btn-primary flex-1 sm:flex-none px-8 py-3 rounded-xl text-sm"
        >
          Submit and start your growth era ✨
        </button>
      </div>
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs" style={{ color: "rgba(239,68,68,0.9)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
