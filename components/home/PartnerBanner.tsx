import Image from "next/image";
import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";

export function PartnerBanner() {
  return (
    <section className="w-full py-16" style={{ borderTop: "1px solid rgba(0,201,177,0.1)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: "var(--surface)",
            border: "1px solid rgba(0,201,177,0.2)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image panel */}
            <div className="relative h-64 lg:h-auto min-h-[300px]">
              <Image
                src="/photo-1770283553885-bad1d6f7acd7.jpg"
                alt="Young African woman, confident and purposeful"
                fill
                className="object-cover object-center"
              />
              {/* Teal tint overlay instead of plain dark */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(0,201,177,0.25) 0%, rgba(6,16,28,0.5) 100%)" }}
              />
            </div>

            {/* Copy panel */}
            <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(0,201,177,0.1)", border: "1px solid rgba(0,201,177,0.25)" }}
              >
                <Building2 size={20} style={{ color: "var(--primary)" }} />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
                  For Organisations
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug" style={{ color: "var(--foreground)" }}>
                  Partner with us to reach Africa's youth.
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  NGO, government body, or private company — list your opportunities and connect with motivated young people across the continent.
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {[
                  "List scholarships, jobs, internships, and grants",
                  "Reach a targeted, verified youth audience",
                  "Align with the UN SDG goals",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--muted-foreground)" }}>
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: "var(--primary)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div>
                <Link
                  href="/partner"
                  className="btn-primary inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl"
                >
                  Partner With Us <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
