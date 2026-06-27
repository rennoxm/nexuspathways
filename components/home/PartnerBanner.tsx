"use client";

import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const bullets = [
  "List scholarships, jobs, internships, and grants",
  "Reach a targeted, verified youth audience",
  "Align with the UN SDG goals",
];

export function PartnerBanner() {
  const { ref: cardRef, inView } = useInView(0.15);

  return (
    <section className="w-full py-16" style={{ borderTop: "1px solid rgba(0,201,177,0.1)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={cardRef as React.RefObject<HTMLDivElement>}
          className={`relative overflow-hidden rounded-2xl anim-scale-in ${inView ? "inview" : ""}`}
          style={{
            background: "var(--surface)",
            border: "1px solid rgba(0,201,177,0.2)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Cool pure-CSS dashboard visual panel */}
            <div className="relative h-64 lg:h-auto min-h-[380px] bg-[#071324] overflow-hidden flex flex-col justify-center items-center p-6 border-b lg:border-b-0 lg:border-r border-primary/10 select-none">
              {/* Background abstract grid lines */}
              <div 
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
                  backgroundSize: "24px 24px"
                }}
              />

              {/* Glowing decorative blobs */}
              <div 
                className="absolute -top-20 -left-20 w-48 h-48 rounded-full blur-3xl opacity-20"
                style={{ background: "var(--primary)" }}
              />
              <div 
                className="absolute -bottom-24 -right-16 w-56 h-56 rounded-full blur-3xl opacity-15"
                style={{ background: "var(--accent)" }}
              />

              {/* Central Mock dashboard container */}
              <div className="relative w-full max-w-[320px] flex flex-col gap-3.5 z-10">
                
                {/* Float Card 1: Listing details */}
                <div 
                  className="rounded-xl p-4 border border-primary/20 backdrop-blur-md shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-banner-float-1"
                  style={{
                    background: "rgba(6,16,28,0.75)",
                  }}
                >
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-[9px] font-bold tracking-wider uppercase text-primary">Live Listing</span>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold">Cohort Training</span>
                  </div>
                  <h4 className="text-xs font-bold text-foreground mb-1">ALX Software Engineering</h4>
                  <p className="text-[10px] text-muted-foreground mb-3">Nairobi Intake · 28 Candidates</p>
                  
                  {/* Candidates mini list visual */}
                  <div className="flex items-center justify-between border-t border-primary/10 pt-2.5">
                    <div className="flex -space-x-1.5">
                      {["AY", "KM", "CO"].map((init, index) => (
                        <div 
                          key={init}
                          className="w-5 h-5 rounded-full border border-[#06101C] flex items-center justify-center text-[7px] font-extrabold text-[#06101C]"
                          style={{
                            background: index === 0 ? "var(--accent)" : index === 1 ? "var(--primary)" : "#C084FC"
                          }}
                        >
                          {init}
                        </div>
                      ))}
                      <div className="w-5 h-5 rounded-full border border-[#06101C] bg-[#112840] flex items-center justify-center text-[7px] text-muted-foreground font-bold">
                        +25
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-primary flex items-center gap-0.5">Evaluate Queue →</span>
                  </div>
                </div>

                {/* Float Card 2: Stats widget */}
                <div 
                  className="rounded-xl p-3.5 border border-primary/15 backdrop-blur-md shadow-md flex items-center justify-between gap-4 transform hover:-translate-y-1 transition-all duration-300 animate-banner-float-2"
                  style={{
                    background: "rgba(6,16,28,0.65)",
                  }}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold">Total Reach</span>
                    <span className="text-base font-black text-foreground">8,412 <span className="text-[9px] text-primary font-bold">+12%</span></span>
                  </div>
                  
                  {/* Custom CSS Mini Sparkline chart */}
                  <div className="flex items-end gap-1 h-7 w-20 shrink-0">
                    {[35, 55, 45, 70, 60, 85].map((h, i) => (
                      <div 
                        key={i} 
                        className="bg-primary/80 rounded-t-sm w-2 transition-all duration-350 hover:bg-primary"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Float Card 3: Status / Activity feed */}
                <div 
                  className="rounded-xl p-3 border border-primary/10 backdrop-blur-md shadow-sm flex items-center gap-3 transform hover:-translate-y-1 transition-all duration-300 animate-banner-float-3"
                  style={{
                    background: "rgba(6,16,28,0.5)",
                  }}
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-foreground font-bold">Listing approved by Nexus</span>
                    <span className="text-[7px] text-muted-foreground">Just now</span>
                  </div>
                </div>

              </div>

              {/* Self-contained CSS animations */}
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes bannerFloat {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-5px); }
                }
                .animate-banner-float-1 { animation: bannerFloat 6s ease-in-out infinite; }
                .animate-banner-float-2 { animation: bannerFloat 6s ease-in-out infinite 1.5s; }
                .animate-banner-float-3 { animation: bannerFloat 6s ease-in-out infinite 3s; }
              ` }} />
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
                  Partner with us to reach Africa&apos;s youth.
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  NGO, government body, or private company — list your opportunities and connect with motivated young people across the continent.
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {bullets.map((item, i) => (
                  <li
                    key={item}
                    className={`flex items-start gap-3 text-sm anim-slide-up ${inView ? "inview" : ""}`}
                    style={{
                      color: "var(--muted-foreground)",
                      animationDelay: `${250 + i * 80}ms`,
                    }}
                  >
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
                  className="btn-primary btn-shimmer inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl"
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
