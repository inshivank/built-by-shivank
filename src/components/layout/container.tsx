import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div"> & {
  as?: "div" | "section" | "main" | "header" | "footer";
  size?: "default" | "narrow" | "wide";
};

const sizeClasses = {
  default: "max-w-6xl",
  narrow: "max-w-3xl",
  wide: "max-w-7xl",
} as const;

export function Container({
  as: Component = "div",
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12",
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
