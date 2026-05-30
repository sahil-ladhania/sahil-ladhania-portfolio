import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "accent" | "muted";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  default: "border border-border text-foreground-muted",
  accent: "bg-accent-muted text-accent border border-transparent",
  muted: "bg-background-subtle text-foreground-subtle",
};

export function Badge({
  variant = "default",
  className,
  children,
}: BadgeProps): React.ReactElement {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 font-mono text-xs",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
