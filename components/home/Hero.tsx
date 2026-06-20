import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div className="flex flex-col gap-7">
            {/* Label pill */}
            <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-xs font-medium text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Trusted Opportunities for African Youth
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.08] tracking-tight text-foreground">
              Find your next{" "}
              <span className="text-primary">opportunity.</span>
              <br />
              Build your future.
            </h1>

            {/* Sub */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
              We match skilled and unskilled youth with vetted opportunities in scholarships, jobs, fellowships, grants, and more — all in one place.
            </p>

            {/* Search bar */}
            <form
              action="/opportunities"
              method="GET"
              className="flex items-center gap-2 p-1.5 rounded-xl border border-border bg-surface w-full max-w-md"
            >
              <div className="flex items-center gap-2 flex-1 px-2">
                <Search size={16} className="text-muted-foreground shrink-0" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search opportunities..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
              </div>
              <button
                type="submit"
                className="btn-primary text-sm font-semibold px-4 py-2 rounded-lg shrink-0"
              >
                Search
              </button>
            </form>

            {/* Stats row */}
            <div className="flex items-center gap-6 pt-1">
              {[
                { value: "500+", label: "Opportunities" },
                { value: "40+", label: "Partner Orgs" },
                { value: "6", label: "Categories" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="relative w-full aspect-[4/5] max-h-[520px] rounded-2xl overflow-hidden border border-border">
            <Image
              src="/photo-1747774999354-c24aabc57775.jpg"
              alt="Three young Africans, confident and ready"
              fill
              className="object-cover object-top"
              priority
            />
            {/* Subtle overlay to ground the image with the dark theme */}
            <div className="absolute inset-0 bg-[#070F1A]/20" />
            {/* Floating stat card */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-3 rounded-xl bg-[#070F1A]/80 backdrop-blur-sm border border-border">
              <div>
                <p className="text-xs text-muted-foreground">Active now</p>
                <p className="text-sm font-semibold text-foreground">13 new listings this week</p>
              </div>
              <Link
                href="/opportunities"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
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
