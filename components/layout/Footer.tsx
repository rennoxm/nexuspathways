import Link from "next/link";
import { ExternalLink } from "lucide-react";

const footerLinks = {
  Opportunities: [
    { label: "Scholarships", href: "/opportunities?category=Scholarship" },
    { label: "Entry-Level Jobs", href: "/opportunities?category=Entry-Level+Job" },
    { label: "Cohort Trainings", href: "/opportunities?category=Cohort+Training" },
    { label: "Grants & Funding", href: "/opportunities?category=Grant+%26+Funding" },
    { label: "Fellowships", href: "/opportunities?category=Fellowship" },
    { label: "Volunteer & Internships", href: "/opportunities?category=Volunteer+%26+Internship" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Partner With Us", href: "/partner" }
  ]
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-[#070F1A] font-black text-sm tracking-tight leading-none">NP</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">
                Nexus<span className="text-primary">Pathways</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Promoting the holistic wellbeing of African youth by matching them with trusted and decent opportunities.
            </p>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-foreground">{group}</h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact col */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Contact</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground leading-relaxed">
              <li>Nairobi, Kenya · Pan-Africa</li>
              <li>info@nexuspathways.io</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Nexus Pathways. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Built by{" "}
            <a
              href="https://jumaportfolio.netlify.app/.com/FredJuma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-0.5"
            >
              Fred Juma <ExternalLink size={10} />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
