"use client";

import { useTheme } from "@/lib/theme";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className="w-9 h-9 rounded-lg flex items-center justify-center"
        style={{ border: "1px solid rgba(0,201,177,0.2)" }}
        aria-label="Toggle theme"
      >
        <span className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
      style={{
        border: "1px solid rgba(0,201,177,0.2)",
        color: "var(--muted-foreground)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--primary)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--primary)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,201,177,0.2)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--muted-foreground)";
      }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
