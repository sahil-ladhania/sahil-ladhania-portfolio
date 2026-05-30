import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover dark:text-accent-950",
  secondary:
    "border border-border bg-glass-bg text-foreground hover:border-border-strong",
  ghost: "text-foreground-muted hover:text-accent",
  link: "text-accent underline-offset-4 hover:underline p-0",
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps): React.ReactElement {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
