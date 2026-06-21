"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

interface UseCountUpOptions {
  target: number;
  duration?: number; // ms
  suffix?: string;
}

export function useCountUp({ target, duration = 1400 }: UseCountUpOptions) {
  const { ref, inView } = useInView(0.2, true);
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    const animate = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, target, duration]);

  return { ref, count };
}
