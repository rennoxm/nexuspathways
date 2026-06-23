"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X, ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { SignInModal } from "@/components/auth/SignInModal";
import { useAuth, logout } from "@/lib/auth";

const navLinks = [
  { label: "Opportunities", href: "/opportunities" },
  { label: "About", href: "/about" },
  { label: "Partner With Us", href: "/partner" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, name, role } = useAuth();

  // Listen for cards requesting the sign-in modal to open
  useEffect(() => {
    const handler = () => setSignInOpen(true);
    window.addEventListener("nexus:open-signin", handler);
    return () => window.removeEventListener("nexus:open-signin", handler);
  }, []);

  // Close avatar dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dashboardHref = role === "partner"
    ? `/dashboard/partner?org=${encodeURIComponent(name)}`
    : `/dashboard?name=${encodeURIComponent(name)}`;

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full backdrop-blur-md"
        style={{
          background: "var(--navbar-bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <span className="font-black text-sm tracking-tight leading-none" style={{ color: "var(--primary-foreground)" }}>
                NP
              </span>
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ color: "var(--foreground)" }}>
              Nexus<span style={{ color: "var(--primary)" }}>Pathways</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  color: pathname === link.href ? "var(--primary)" : "var(--muted-foreground)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {isLoggedIn ? (
              /* ── Avatar chip (logged in) ── */
              <div ref={avatarRef} className="relative">
                <button
                  onClick={() => setAvatarOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                    background: avatarOpen ? "var(--surface)" : "transparent",
                  }}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                  >
                    {name.charAt(0).toUpperCase()}
                  </span>
                  <span>{name}</span>
                  <ChevronDown size={13} style={{ color: "var(--muted-foreground)" }} />
                </button>

                {/* Dropdown */}
                {avatarOpen && (
                  <div
                    className="absolute right-0 top-[calc(100%+8px)] w-48 rounded-xl overflow-hidden shadow-lg z-50"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  >
                    <Link
                      href={dashboardHref}
                      onClick={() => setAvatarOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5"
                      style={{ color: "var(--foreground)" }}
                    >
                      <LayoutDashboard size={14} style={{ color: "var(--primary)" }} />
                      Dashboard
                    </Link>
                    <div style={{ height: "1px", background: "var(--border)" }} />
                    <button
                      onClick={() => { logout(); setAvatarOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── Sign In / Get Started (logged out) ── */
              <>
                <button
                  onClick={() => setSignInOpen(true)}
                  className="text-sm font-medium px-3 py-1.5 transition-colors cursor-pointer"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Sign In
                </button>
                <Link
                  href="/onboard/youth"
                  className="btn-primary text-sm px-4 py-2 rounded-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
              style={{
                border: "1px solid var(--border)",
                color: "var(--muted-foreground)",
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            className="md:hidden px-4 pb-4 pt-3 flex flex-col gap-3"
            style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium py-1.5 transition-colors"
                style={{ color: pathname === link.href ? "var(--primary)" : "var(--muted-foreground)" }}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex gap-3 pt-2" style={{ borderTop: "1px solid var(--border)" }}>
              {isLoggedIn ? (
                <Link
                  href={dashboardHref}
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary text-sm flex-1 text-center py-2 rounded-lg"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setSignInOpen(true);
                    }}
                    className="text-sm font-medium flex-1 text-center py-2 rounded-lg border cursor-pointer"
                    style={{ color: "var(--muted-foreground)", borderColor: "var(--border)" }}
                  >
                    Sign In
                  </button>
                  <Link
                    href="/onboard/youth"
                    onClick={() => setMenuOpen(false)}
                    className="btn-primary text-sm flex-1 text-center py-2 rounded-lg"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
      <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
    </>
  );
}
