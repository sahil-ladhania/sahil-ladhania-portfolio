import { cn } from "@/lib/cn";
import { glassSurfaceSoft, glassSurfaceSoftHover } from "@/lib/glass-styles";

type IconButtonVariant = "ghost" | "solid";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  "aria-label": string;
}

const variants: Record<IconButtonVariant, string> = {
  ghost: "text-white/70 hover:text-white",
  solid: cn(glassSurfaceSoft, glassSurfaceSoftHover, "text-white"),
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
