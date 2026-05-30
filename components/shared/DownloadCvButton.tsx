import { cn } from "@/lib/cn";

interface DownloadCvButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

const CV_PATH = "/cv/sahil-ladhania-cv.pdf";

const variantClasses = {
  primary:
    "bg-accent text-white hover:bg-accent-hover dark:text-accent-950",
  secondary:
    "border border-border bg-glass-bg text-foreground hover:border-border-strong",
  ghost: "text-foreground-muted hover:text-accent",
};

export function DownloadCvButton({
  variant = "secondary",
  className,
}: DownloadCvButtonProps): React.ReactElement {
  return (
    <a
      href={CV_PATH}
      download="sahil-ladhania-cv.pdf"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
        variantClasses[variant],
        className,
      )}
    >
      Download CV
    </a>
  );
}

export function getCvDownloadUrl(): string {
  return CV_PATH;
}
