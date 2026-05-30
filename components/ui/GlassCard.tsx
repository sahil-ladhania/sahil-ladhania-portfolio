import { cn } from "@/lib/cn";

interface GlassCardProps {
  className?: string;
  flat?: boolean;
  children: React.ReactNode;
}

export function GlassCard({
  className,
  flat = false,
  children,
}: GlassCardProps): React.ReactElement {
  return (
    <div
      className={cn(
        "rounded-lg border border-glass-border bg-glass-bg p-6 shadow-sm dark:shadow-none",
        !flat && "backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
