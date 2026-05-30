import NextLink from "next/link";
import { cn } from "@/lib/cn";

type LinkVariant = "default" | "nav" | "external";

interface LinkProps {
  href: string;
  variant?: LinkVariant;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const variants: Record<LinkVariant, string> = {
  default: "text-accent hover:text-accent-hover transition-colors",
  nav: "text-foreground-muted hover:text-accent transition-colors text-sm",
  external: "text-accent hover:text-accent-hover inline-flex items-center gap-1",
};

export function Link({
  href,
  variant = "default",
  className,
  children,
  onClick,
}: LinkProps): React.ReactElement {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const classes = cn(variants[variant], className);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onClick={onClick}
      >
        {children}
        {variant === "external" ? <span aria-hidden="true">↗</span> : null}
      </a>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes} onClick={onClick}>
      {children}
    </NextLink>
  );
}
