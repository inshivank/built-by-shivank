import { AppProviders } from "@/components/providers/app-providers";
import { ThemeScript } from "@/components/providers/theme-script";
import { SkipLink } from "@/components/a11y/skip-link";
import { Navigation } from "@/components/layout/navigation";
import { metadata, viewport } from "@/config/metadata";
import { fonts } from "@/lib/fonts";
import "./globals.css";

export { metadata, viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fonts.className} h-full`}>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full">
        <AppProviders>
          <SkipLink />
          <Navigation />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
