import { cn } from "@/lib/cn";

type IconButtonVariant = "ghost" | "solid";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  "aria-label": string;
}

const variants: Record<IconButtonVariant, string> = {
  ghost: "text-foreground-muted hover:text-accent",
  solid: "bg-accent text-white hover:bg-accent-hover dark:text-accent-950",
};

export function IconButton({
  variant = "ghost",
  className,
  children,
  ...props
}: IconButtonProps): React.ReactElement {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
