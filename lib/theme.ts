/**
 * Lightweight module-level theme store — mirrors lib/auth.ts pattern.
 * No Context Provider, no next-themes, no script injection.
 * Reads from localStorage on mount; applies class to document.documentElement.
 */

import { useEffect, useState } from "react";

type Theme = "dark" | "light";
const STORAGE_KEY = "nexus_theme";
const DEFAULT: Theme = "dark";

// ── Module-level singleton ──────────────────────────────────────────────────
let _theme: Theme = DEFAULT;
const _subs = new Set<() => void>();

function notify() {
  _subs.forEach((fn) => fn());
}

function applyToDOM(t: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove("dark", "light");
  document.documentElement.classList.add(t);
}

/** Toggle between dark and light. Persists to localStorage. */
export function toggleTheme() {
  _theme = _theme === "dark" ? "light" : "dark";
  try { localStorage.setItem(STORAGE_KEY, _theme); } catch { /* ignore */ }
  applyToDOM(_theme);
  notify();
}

/** React hook — subscribes to theme changes. */
export function useTheme() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>(DEFAULT);

  useEffect(() => {
    // Read persisted preference on first mount
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === "dark" || stored === "light") {
        _theme = stored;
      }
    } catch { /* ignore */ }

    applyToDOM(_theme);
    setTheme(_theme);
    setMounted(true);

    const update = () => setTheme(_theme);
    _subs.add(update);
    return () => { _subs.delete(update); };
  }, []);

  return { theme: mounted ? theme : DEFAULT, toggleTheme };
}
