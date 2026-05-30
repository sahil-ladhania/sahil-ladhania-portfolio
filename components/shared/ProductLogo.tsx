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

export function ProductLogo({
  src,
  alt,
  className,
  size = "md",
}: ProductLogoProps): React.ReactElement {
  const isSvg = src.endsWith(".svg");

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-glass-border bg-glass-bg",
        SIZE_CLASSES[size],
        isSvg && "text-foreground p-1.5",
        className,
      )}
    >
      {isSvg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-auto object-contain" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      )}
    </div>
  );
}
