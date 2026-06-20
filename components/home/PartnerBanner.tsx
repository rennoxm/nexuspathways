import Image from "next/image";
import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";

export function PartnerBanner() {
  return (
    <section className="w-full py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image panel */}
            <div className="relative h-64 lg:h-auto min-h-[280px]">
              <Image
                src="/photo-1770283553885-bad1d6f7acd7.jpg"
                alt="Young African woman, confident and purposeful"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[#070F1A]/40" />
            </div>

            {/* Copy panel */}
            <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Building2 size={20} className="text-primary" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  For Organisations
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-snug">
                  Partner with us to reach Africa's youth.
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Whether you're a grassroots NGO, a government agency, or a private company — list your opportunities on Nexus Pathways and connect with motivated, talented young people across the continent.
                </p>
              </div>

              <ul className="flex flex-col gap-2.5">
                {[
                  "List scholarships, jobs, internships, and grants",
                  "Reach a targeted, verified youth audience",
                  "Align your organisation with the UN SDG goals",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <Link
                  href="/partner"
                  className="btn-primary inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg"
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
