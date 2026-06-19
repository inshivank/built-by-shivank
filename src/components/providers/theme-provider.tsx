"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

import { themeStorageKey } from "@/config/theme";

const defaultThemeProps = {
  attribute: "class",
  defaultTheme: "dark",
  enableSystem: false,
  storageKey: themeStorageKey,
  enableColorScheme: true,
  disableTransitionOnChange: true,
} satisfies ThemeProviderProps;

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider {...defaultThemeProps} {...props}>
      {children}
    </NextThemesProvider>
  );
}
