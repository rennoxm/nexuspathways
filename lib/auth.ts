/**
 * Lightweight module-level auth store.
 * No Context Provider needed — any client component calls useAuth() to subscribe.
 * State persists to localStorage so sign-in survives page refresh.
 */

import { useEffect, useState } from "react";

interface AuthState {
  loggedIn: boolean;
  name: string;
  role: "youth" | "partner" | "";
}

const STORAGE_KEY = "nexus_auth";

function readStorage(): AuthState {
  if (typeof window === "undefined") return { loggedIn: false, name: "", role: "" };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AuthState;
  } catch {
    // ignore
  }
  return { loggedIn: false, name: "", role: "" };
}

// Module-level singleton
let _state: AuthState = readStorage();
const _subs = new Set<() => void>();

function notify() {
  _subs.forEach((fn) => fn());
}

/** Sign the user in. Persists to localStorage and re-renders all subscribers. */
export function login(name: string, role: "youth" | "partner") {
  _state = { loggedIn: true, name, role };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(_state)); } catch { /* ignore */ }
  notify();
}

/** Sign the user out. Clears localStorage and re-renders all subscribers. */
export function logout() {
  _state = { loggedIn: false, name: "", role: "" };
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  notify();
}

/** React hook — subscribes this component to auth state changes. */
export function useAuth() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<AuthState>({ loggedIn: false, name: "", role: "" });

  useEffect(() => {
    // Sync with storage on first mount (handles page refresh)
    const stored = readStorage();
    _state = stored;
    setState(stored);
    setMounted(true);

    const update = () => setState({ ..._state });
    _subs.add(update);
    return () => { _subs.delete(update); };
  }, []);

  // Before mount, always return logged-out so SSR and initial client render match
  if (!mounted) return { isLoggedIn: false, name: "", role: "" as const };

  return {
    isLoggedIn: state.loggedIn,
    name: state.name,
    role: state.role,
  };
}
