import { cn } from "@/lib/cn";
import {
  glassPrimaryButton,
  glassSecondaryButton,
} from "@/lib/glass-styles";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: glassPrimaryButton,
  secondary: glassSecondaryButton,
  ghost:
    "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white",
  link: "inline-flex text-sm font-medium text-white underline-offset-4 transition-colors hover:underline p-0",
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps): React.ReactElement {
  return (
    <button
      className={cn(variants[variant], "disabled:opacity-50", className)}
      {...props}
    >
      {children}
    </button>
  );
}
