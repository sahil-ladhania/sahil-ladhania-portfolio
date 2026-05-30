import { cn } from "@/lib/cn";

interface DividerProps {
  subtle?: boolean;
  className?: string;
}

export function Divider({
  subtle = false,
  className,
}: DividerProps): React.ReactElement {
  return (
    <hr
      className={cn(
        "border-0 border-t",
        subtle ? "border-border/50" : "border-border",
        className,
      )}
    />
  );
}
