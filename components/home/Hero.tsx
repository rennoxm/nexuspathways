"use client";

import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

// Individual animated stat — each gets its own scroll trigger + counter
function AnimatedStat({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const { ref, count } = useCountUp({ target, duration: 1400 });

  return (
    <div 
      ref={(el) => { (ref as React.MutableRefObject<Element | null>).current = el; }} 
      className="flex flex-col gap-0.5 items-center text-center animate-pulse-subtle"
    >
      <span
        className="text-2xl sm:text-3xl font-extrabold tabular-nums"
        style={{ color: "var(--primary)" }}
      >
        {count}{suffix}
      </span>
      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-16 lg:py-24 border-b border-border/40 bg-background">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/photo-1747774999354-c24aabc57775.jpg"
          alt="African youth background"
          fill
          priority
          className="object-cover opacity-20 dark:opacity-30 filter blur-[10px] scale-[1.08] transition-all duration-700"
        />
        {/* Radial vignette fade for smooth bleeding into the background */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, transparent 15%, var(--background) 100%)"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.12] tracking-tight max-w-4xl mb-6">
          <span
            className="block anim-slide-up"
            style={{ 
              animationFillMode: "both", 
              animationDuration: "0.65s", 
              animationDelay: "100ms", 
              animationName: "slideUp" 
            }}
          >
            Find your next{" "}
            <span className="bg-gradient-to-r from-[var(--primary)] via-emerald-400 to-teal-300 bg-clip-text text-transparent drop-shadow-sm">
              opportunity.
            </span>
          </span>
          <span
            className="block anim-slide-up mt-1.5"
            style={{ 
              animationFillMode: "both", 
              animationDuration: "0.65s", 
              animationDelay: "180ms", 
              animationName: "slideUp" 
            }}
          >
            Build your future.
          </span>
        </h1>

        {/* Sub-text */}
        <p
          className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl text-muted-foreground mb-10 anim-slide-up"
          style={{
            animationFillMode: "both",
            animationDuration: "0.65s",
            animationDelay: "260ms",
            animationName: "slideUp",
          }}
        >
          We match African youth with vetted scholarships, jobs, fellowships, grants, and training programmes — all in one place.
        </p>

        {/* Centered Search Bar */}
        <form
          action="/opportunities"
          method="GET"
          className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl border bg-surface/40 backdrop-blur-xl w-full max-w-[620px] mb-14 shadow-2xl anim-slide-up hover:border-[var(--primary)]/45 transition-all duration-300"
          style={{
            borderColor: "rgba(0, 201, 177, 0.2)",
            animationFillMode: "both",
            animationDuration: "0.65s",
            animationDelay: "340ms",
            animationName: "slideUp",
          }}
        >
          <div className="flex items-center gap-2.5 w-full px-3 py-1.5 sm:py-0">
            <Search size={16} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              name="q"
              placeholder="Search scholarships, jobs, fellowships..."
              className="flex-1 bg-transparent text-sm outline-none w-full"
              style={{ color: "var(--foreground)" }}
            />
          </div>
          <button
            type="submit"
            className="btn-primary btn-shimmer text-sm px-6 py-2.5 rounded-xl shrink-0 w-full sm:w-auto shadow-md cursor-pointer"
          >
            Search Opportunities
          </button>
        </form>

        {/* Centered Stats */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 pt-2 mb-16 anim-slide-up border border-border/10 bg-surface/10 backdrop-blur-md px-8 sm:px-12 py-4 rounded-2xl"
          style={{
            animationFillMode: "both",
            animationDuration: "0.55s",
            animationDelay: "420ms",
            animationName: "slideUp",
          }}
        >
          <AnimatedStat target={500} suffix="+" label="Listings" />
          <div className="hidden sm:block w-px h-8 bg-border/20" />
          <AnimatedStat target={40} suffix="+" label="Partner Orgs" />
          <div className="hidden sm:block w-px h-8 bg-border/20" />
          <AnimatedStat target={6} label="Categories" />
        </div>

        {/* Scroll Indicator */}
        <div
          className="animate-bounce flex flex-col items-center gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors duration-200 mt-2 select-none"
          onClick={() => {
            const nextSec = document.getElementById("categories");
            if (nextSec) {
              nextSec.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <span className="text-[10px] font-bold tracking-widest uppercase">Explore</span>
          <ChevronDown size={14} />
        </div>

      </div>
    </section>
  );
}
