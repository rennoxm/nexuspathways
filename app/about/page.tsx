import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Target, Eye, Users, Globe } from "lucide-react";

const sdgGoals = [
  { num: "SDG 1", label: "No Poverty" },
  { num: "SDG 4", label: "Quality Education" },
  { num: "SDG 8", label: "Decent Work & Economic Growth" },
  { num: "SDG 10", label: "Reduced Inequalities" },
  { num: "SDG 17", label: "Partnerships for the Goals" },
];

const values = [
  {
    icon: Target,
    title: "Trust",
    body: "Every opportunity on Nexus Pathways is manually vetted. We don't list anything we wouldn't recommend to our own community.",
  },
  {
    icon: Users,
    title: "Inclusion",
    body: "We serve both skilled and unskilled youth. You don't need a CV or a degree to find something valuable here.",
  },
  {
    icon: Globe,
    title: "Collaboration",
    body: "We work hand-in-hand with grassroots organisations, government bodies, and the private sector to create real impact.",
  },
  {
    icon: Eye,
    title: "Transparency",
    body: "We show you everything up front — deadlines, pay, location, and links. No hidden information, no gatekeeping.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  About Us
                </p>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                  Built for Africa's youth. By people who believe in them.
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Nexus Pathways is an opportunity matching platform that connects skilled and unskilled African youth with trusted opportunities in financial literacy, entry-level jobs, career readiness, internships, volunteering, mental health, and nutrition.
                </p>
              </div>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                <Image
                  src="/photo-1755040803517-dd1b6b8f543b.jpg"
                  alt="Two young Africans in conversation outdoors"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4 p-8 rounded-2xl border border-border bg-surface">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Our Mission</p>
              <p className="text-lg font-semibold text-foreground leading-snug">
                To work together with grassroots organisations, the government, and private sectors to guarantee the success of the SDG goals and overall youth development.
              </p>
            </div>
            <div className="flex flex-col gap-4 p-8 rounded-2xl border border-border bg-surface">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Our Vision</p>
              <p className="text-lg font-semibold text-foreground leading-snug">
                Promoting the holistic wellbeing of African youth by matching them with trusted and decent opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col gap-2 mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">What We Stand For</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Our values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="flex flex-col gap-4 p-6 rounded-xl border border-border bg-card">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-semibold text-foreground">{v.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{v.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SDG alignment */}
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col gap-2 mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">UN Sustainable Development Goals</p>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Advancing global goals through local action</h2>
              <p className="text-sm text-muted-foreground max-w-xl">
                Our work directly contributes to five of the United Nations' 17 Sustainable Development Goals.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {sdgGoals.map((g) => (
                <div
                  key={g.num}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-sm"
                >
                  <span className="font-bold text-primary">{g.num}</span>
                  <span className="text-muted-foreground">{g.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold text-foreground">Ready to get started?</h3>
              <p className="text-sm text-muted-foreground">Join thousands of young Africans already finding their path.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/opportunities" className="btn-outline text-sm font-semibold px-5 py-2.5 rounded-lg">
                Browse Opportunities
              </Link>
              <Link href="/onboard/youth" className="btn-primary text-sm font-semibold px-5 py-2.5 rounded-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
