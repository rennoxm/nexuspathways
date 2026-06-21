"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

// Individual animated stat — each gets its own scroll trigger + counter
function AnimatedStat({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const { ref, count } = useCountUp({ target, duration: 1400 });

  return (
    <div ref={(el) => { (ref as React.MutableRefObject<Element | null>).current = el; }} className="flex flex-col gap-0.5">
      <span
        className="text-2xl font-bold tabular-nums"
        style={{ color: "var(--primary)" }}
      >
        {count}{suffix}
      </span>
      <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
        {label}
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: copy ── */}
          <div className="flex flex-col gap-7">

            {/* Line 1 of headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold leading-[1.1] tracking-tight text-foreground">
              <span
                className="block anim-slide-up delay-0"
                style={{ animationFillMode: "both", animationDuration: "0.65s", animationTimingFunction: "cubic-bezier(0.22,1,0.36,1)", animationName: "slideUp" }}
              >
                Find your next{" "}
                <span style={{ color: "var(--primary)" }}>opportunity.</span>
              </span>
              <span
                className="block anim-slide-up"
                style={{ animationFillMode: "both", animationDuration: "0.65s", animationDelay: "110ms", animationTimingFunction: "cubic-bezier(0.22,1,0.36,1)", animationName: "slideUp" }}
              >
                Build your future.
              </span>
            </h1>

            {/* Sub */}
            <p
              className="text-base sm:text-lg leading-relaxed max-w-md anim-slide-up"
              style={{
                color: "var(--muted-foreground)",
                animationFillMode: "both",
                animationDuration: "0.65s",
                animationDelay: "220ms",
                animationTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                animationName: "slideUp",
              }}
            >
              We match African youth with vetted scholarships, jobs, fellowships, grants, and training programmes — all in one place.
            </p>

            {/* Search bar */}
            <form
              action="/opportunities"
              method="GET"
              className="flex items-center gap-2 p-1.5 rounded-xl border bg-surface w-full max-w-[480px] anim-slide-up"
              style={{
                borderColor: "rgba(0,201,177,0.25)",
                animationFillMode: "both",
                animationDuration: "0.65s",
                animationDelay: "310ms",
                animationTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                animationName: "slideUp",
              }}
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
                className="btn-primary btn-shimmer text-sm px-5 py-2.5 rounded-lg shrink-0"
              >
                Search
              </button>
            </form>

            {/* Stats — each runs its own counter */}
            <div
              className="flex items-center gap-8 pt-1 anim-slide-up"
              style={{
                animationFillMode: "both",
                animationDuration: "0.55s",
                animationDelay: "400ms",
                animationTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                animationName: "slideUp",
              }}
            >
              <AnimatedStat target={500} suffix="+" label="Listings" />
              <AnimatedStat target={40} suffix="+" label="Partner Orgs" />
              <AnimatedStat target={6} label="Categories" />
            </div>
          </div>

          {/* ── Right: image ── */}
          <div
            className="relative w-full aspect-[4/5] max-h-[540px] rounded-2xl overflow-hidden anim-hero-breathe"
            style={{ border: "1px solid rgba(0,201,177,0.2)" }}
          >
            <Image
              src="/photo-1747774999354-c24aabc57775.jpg"
              alt="Three young Africans"
              fill
              className="object-cover object-top"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,12,24,0.92) 0%, rgba(4,12,24,0.4) 45%, transparent 70%)" }} />

            {/* Floating card — springs up */}
            <div
              className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-3 rounded-xl anim-float-up"
              style={{
                background: "rgba(4, 12, 24, 0.82)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(0,201,177,0.25)",
              }}
            >
              <div>
                <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Updated weekly
                </p>
                <p className="text-sm font-bold" style={{ color: "#ffffff" }}>
                  13 new listings this week
                </p>
              </div>
              <Link
                href="/opportunities"
                className="inline-flex items-center gap-1.5 text-xs font-semibold shrink-0 ml-4"
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
