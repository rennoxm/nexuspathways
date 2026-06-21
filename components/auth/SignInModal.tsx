"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, User, Building2 } from "lucide-react";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"youth" | "partner">("youth");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!identifier.trim()) {
      setError(activeTab === "youth" ? "Please enter your name or email" : "Please enter your organization name or email");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    // Extract display name or organization name from email/text
    let nameVal = identifier.trim();
    if (nameVal.includes("@")) {
      nameVal = nameVal.split("@")[0];
    }
    // Capitalize first letter
    nameVal = nameVal.charAt(0).toUpperCase() + nameVal.slice(1);

    onClose();
    if (activeTab === "youth") {
      router.push(`/dashboard?name=${encodeURIComponent(nameVal)}`);
    } else {
      router.push(`/dashboard/partner?org=${encodeURIComponent(nameVal)}`);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1.5px solid var(--border)",
    background: "var(--background)",
    color: "var(--foreground)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.15s ease",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#06101C]/80 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div 
        className="relative w-full max-w-md overflow-hidden rounded-2xl border shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200"
        style={{ 
          background: "var(--surface)", 
          borderColor: "var(--border)" 
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
            Welcome Back
          </h2>
          <button 
            onClick={onClose}
            className="rounded-lg p-1.5 transition-colors hover:bg-white/5"
            style={{ color: "var(--muted-foreground)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Custom Tab Selector */}
        <div className="px-6 pb-4">
          <div 
            className="flex p-1 rounded-xl border"
            style={{ 
              background: "var(--background)",
              borderColor: "var(--border)"
            }}
          >
            <button
              onClick={() => {
                setActiveTab("youth");
                setError("");
              }}
              className="flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                background: activeTab === "youth" ? "var(--primary)" : "transparent",
                color: activeTab === "youth" ? "var(--primary-foreground)" : "var(--muted-foreground)",
              }}
            >
              <User size={14} />
              Youth
            </button>
            <button
              onClick={() => {
                setActiveTab("partner");
                setError("");
              }}
              className="flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                background: activeTab === "partner" ? "var(--primary)" : "transparent",
                color: activeTab === "partner" ? "var(--primary-foreground)" : "var(--muted-foreground)",
              }}
            >
              <Building2 size={14} />
              Partner
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-8 space-y-4">
          <div>
            <label 
              className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
              style={{ color: "var(--muted-foreground)" }}
            >
              {activeTab === "youth" ? "First Name or Email" : "Organization Name or Email"}
            </label>
            <input
              type="text"
              placeholder={activeTab === "youth" ? "e.g., Alex or alex@example.com" : "e.g., TechCorp or partner@techcorp.com"}
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                setError("");
              }}
              style={inputStyle}
              className="focus:border-[var(--primary)]"
            />
          </div>

          <div>
            <label 
              className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
              style={{ color: "var(--muted-foreground)" }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              style={inputStyle}
              className="focus:border-[var(--primary)]"
            />
          </div>

          {error && (
            <p className="text-xs font-medium" style={{ color: "var(--destructive)" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-primary w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all active:scale-[0.98] cursor-pointer mt-2"
          >
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
