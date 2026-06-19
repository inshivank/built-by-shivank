import { cn } from "@/lib/utils";

type StackProps = React.ComponentProps<"div"> & {
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
};

const gapClasses = {
  xs: "gap-2",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
} as const;

export function Stack({ gap = "md", className, ...props }: StackProps) {
  return (
    <div className={cn("flex flex-col", gapClasses[gap], className)} {...props} />
  );
}
