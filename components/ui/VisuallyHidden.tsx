import { cn } from "@/lib/cn";

interface VisuallyHiddenProps {
  children: React.ReactNode;
}

export function VisuallyHidden({
  children,
}: VisuallyHiddenProps): React.ReactElement {
  return <span className="sr-only">{children}</span>;
}

interface SkeletonProps {
  variant?: "text" | "rect";
  className?: string;
}

export function Skeleton({
  variant = "rect",
  className,
}: SkeletonProps): React.ReactElement {
  return (
    <div
      className={cn(
        "animate-pulse rounded-sm bg-background-subtle",
        variant === "text" ? "h-4 w-full" : "h-24 w-full",
        className,
      )}
      aria-hidden="true"
    />
  );
}
