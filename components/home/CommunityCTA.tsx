import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CommunityCTA() {
  return (
    <section className="w-full py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-border order-2 lg:order-1">
            <Image
              src="/photo-1739292774739-ee38cd9a5735.jpg"
              alt="Two young people working together on a laptop"
              fill
              className="object-cover"
            />
          </div>

          {/* Copy */}
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Join the Community
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-snug">
                Get opportunities matched to you.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Create a free account and tell us what you're looking for. We'll surface the right scholarships, jobs, and programmes — no endless scrolling required.
              </p>
            </div>

            {/* Bullet points */}
            <ul className="flex flex-col gap-2.5">
              {[
                "Personalised opportunity feed based on your interests",
                "Deadline reminders so you never miss an application",
                "Access to community events and career readiness resources",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="/auth/signup"
                className="btn-primary inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg"
              >
                Join Free <ArrowRight size={14} />
              </Link>
              <Link
                href="/opportunities"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Browse first
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
