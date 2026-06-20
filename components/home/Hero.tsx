import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, MapPin } from "lucide-react";

export function Hero() {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: copy ── */}
          <div className="flex flex-col gap-7">
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold leading-[1.1] tracking-tight text-foreground">
              Find your next{" "}
              <span style={{ color: "var(--primary)" }}>opportunity.</span>
              <br />
              Build your future.
            </h1>

            {/* Sub */}
            <p className="text-base sm:text-lg leading-relaxed max-w-md" style={{ color: "var(--muted-foreground)" }}>
              We match African youth with vetted scholarships, jobs, fellowships, grants, and training programmes — all in one place.
            </p>

            {/* Search bar */}
            <form
              action="/opportunities"
              method="GET"
              className="flex items-center gap-2 p-1.5 rounded-xl border bg-surface w-full max-w-[480px]"
              style={{ borderColor: "rgba(0,201,177,0.25)" }}
            >
              <div className="flex items-center gap-2.5 flex-1 px-2">
                <Search size={15} style={{ color: "var(--muted-foreground)" }} className="shrink-0" />
                <input
                  type="text"
                  name="q"
                  placeholder="Scholarship, job, fellowship..."
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: "var(--foreground)" }}
                />
              </div>
              <button
                type="submit"
                className="btn-primary text-sm px-5 py-2.5 rounded-lg shrink-0"
              >
                Search
              </button>
            </form>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-1">
              {[
                { value: "500+", label: "Listings" },
                { value: "40+", label: "Partner Orgs" },
                { value: "6", label: "Categories" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: image ── */}
          <div
            className="relative w-full aspect-[4/5] max-h-[540px] rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(0,201,177,0.2)" }}
          >
            <Image
              src="/photo-1747774999354-c24aabc57775.jpg"
              alt="Three young Africans"
              fill
              className="object-cover object-top"
              priority
            />
            {/* Dark overlay so the card below is readable */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,16,28,0.85) 0%, transparent 50%)" }} />

            {/* Floating info card */}
            <div
              className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-3 rounded-xl"
              style={{
                background: "rgba(6,16,28,0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(0,201,177,0.2)",
              }}
            >
              <div>
                <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
                  Updated weekly
                </p>
                <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  13 new listings this week
                </p>
              </div>
              <Link
                href="/opportunities"
                className="inline-flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: "var(--primary)" }}
              >
                Browse all <ArrowRight size={12} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
