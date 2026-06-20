import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CommunityCTA() {
  return (
    <section className="w-full py-16" style={{ borderTop: "1px solid rgba(0,201,177,0.1)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Image */}
          <div
            className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden order-2 lg:order-1"
            style={{ border: "1px solid rgba(0,201,177,0.15)" }}
          >
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
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
                Join the Community
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug" style={{ color: "var(--foreground)" }}>
                Get opportunities matched to you.
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                Create a free account and tell us what you're looking for. We'll surface the right programmes — no endless scrolling required.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {[
                "Personalised feed based on your skills and interests",
                "Deadline reminders so you never miss an application",
                "Community events and career readiness resources",
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

            <div className="flex items-center gap-4 pt-1">
              <Link
                href="/auth/signup"
                className="btn-primary inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl"
              >
                Join Free <ArrowRight size={14} />
              </Link>
              <Link
                href="/opportunities"
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: "var(--muted-foreground)" }}
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
