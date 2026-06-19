"use client";

import { LenisProvider } from "@/components/providers/lenis-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <LenisProvider>{children}</LenisProvider>
    </ThemeProvider>
  );
}
