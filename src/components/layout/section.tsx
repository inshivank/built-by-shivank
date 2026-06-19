import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  spacing?: "default" | "compact" | "hero";
};

const spacingClasses = {
  compact: "py-12 md:py-16",
  default: "py-16 md:py-24",
  hero: "py-24 md:py-32 lg:py-40",
} as const;

export function Section({
  spacing = "default",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("relative w-full", spacingClasses[spacing], className)}
      {...props}
    />
  );
}
