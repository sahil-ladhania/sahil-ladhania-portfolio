import { cn } from "@/lib/cn";
import {
  glassPrimaryButton,
  glassSecondaryButton,
} from "@/lib/glass-styles";

interface DownloadCvButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

const CV_PATH = "/cv/sahil-ladhania-cv.pdf";

const variantClasses = {
  primary: glassPrimaryButton,
  secondary: glassSecondaryButton,
  ghost: "text-white/70 hover:text-white",
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
        variant === "ghost"
          ? "inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors"
          : undefined,
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
