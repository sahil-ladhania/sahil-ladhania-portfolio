import { cn } from "@/lib/cn";

interface ProductLogoProps {
  src: string;
  alt: string;
  className?: string;
  size?: "sm" | "md";
}

const SIZE_CLASSES = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
} as const;

/** Monochrome logos — use foreground color so they track light/dark theme. */
const THEME_AWARE_LOGOS = new Set([
  "/logos/tbk-crm.svg",
  "/logos/custra.svg",
  "/logos/reachly.png",
  "/logos/ritli.png",
]);

interface ThemeAwareLogoProps {
  src: string;
  alt: string;
  className?: string;
}

function ThemeAwareLogo({ src, alt, className }: ThemeAwareLogoProps): React.ReactElement {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("bg-foreground", className)}
      style={{
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

export function ProductLogo({
  src,
  alt,
  className,
  size = "md",
}: ProductLogoProps): React.ReactElement {
  const isSvg = src.endsWith(".svg");
  const isThemeAware = THEME_AWARE_LOGOS.has(src);

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-glass-border bg-glass-bg",
        SIZE_CLASSES[size],
        isSvg && "p-1.5",
        className,
      )}
    >
      {isThemeAware ? (
        <ThemeAwareLogo src={src} alt={alt} className="h-full w-full" />
      ) : isSvg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-auto object-contain" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      )}
    </div>
  );
}
