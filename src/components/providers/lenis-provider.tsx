"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { lenisOptions } from "@/lib/lenis";

type LenisProviderProps = {
  children: React.ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  const { prefersReducedMotion, isReady } = usePrefersReducedMotion();

  useEffect(() => {
    if (!isReady || prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis(lenisOptions);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [isReady, prefersReducedMotion]);

  return children;
}
