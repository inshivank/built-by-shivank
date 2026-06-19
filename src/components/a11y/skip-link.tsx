import { cn } from "@/lib/utils";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50",
        "rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground",
        "ring-2 ring-ring ring-offset-2 ring-offset-background",
      )}
    >
      Skip to main content
    </a>
  );
}
