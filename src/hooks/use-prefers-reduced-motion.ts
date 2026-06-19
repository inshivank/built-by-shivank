"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

export function usePrefersReducedMotion() {
  const { matches, isReady } = useMediaQuery("(prefers-reduced-motion: reduce)");

  return {
    prefersReducedMotion: matches,
    isReady,
  };
}
