import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  number: string;
  title: string;
  className?: string;
}

export function SectionHeading({
  number,
  title,
  className,
}: SectionHeadingProps): React.ReactElement {
  return (
    <h2
      className={cn(
        "mb-8 flex items-center gap-4 text-2xl font-semibold tracking-tight text-foreground",
        className,
      )}
    >
      <span className="font-mono text-sm text-accent">{number}</span>
      <span className="h-px flex-1 max-w-32 bg-border" aria-hidden="true" />
      <span>{title}</span>
    </h2>
  );
}
