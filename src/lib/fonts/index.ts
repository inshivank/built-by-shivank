import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
});

export const fonts = {
  inter,
  className: inter.variable,
} as const;
