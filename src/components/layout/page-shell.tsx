import { cn } from "@/lib/utils";

type PageShellProps = React.ComponentProps<"main">;

export function PageShell({ className, children, ...props }: PageShellProps) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={cn("relative flex min-h-dvh flex-col bg-background", className)}
      {...props}
    >
      {children}
    </main>
  );
}
