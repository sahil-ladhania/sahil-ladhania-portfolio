"use client";

import { useReducedMotion } from "framer-motion";

import { ProductLogo } from "@/components/shared/ProductLogo";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/content.types";

interface ProductMarqueeProps {
  projects: Project[];
  className?: string;
}

function MarqueeItem({ project }: { project: Project }): React.ReactElement {
  if (!project.logo) {
    return (
      <span className="shrink-0 font-mono text-sm text-white/50">{project.name}</span>
    );
  }

  return (
    <div className="group flex shrink-0 items-center gap-3 opacity-45 transition-opacity hover:opacity-90">
      <ProductLogo
        src={project.logo}
        alt={project.name}
        size="sm"
        className="border-0 bg-transparent shadow-none backdrop-blur-none"
      />
      <span className="font-mono text-sm text-white/60 transition-colors group-hover:text-white/90">
        {project.name}
      </span>
    </div>
  );
}

export function ProductMarquee({
  projects,
  className,
}: ProductMarqueeProps): React.ReactElement {
  const prefersReducedMotion = useReducedMotion();
  const items = projects.filter((project) => project.logo || project.name);

  if (items.length === 0) {
    return <></>;
  }

  if (prefersReducedMotion) {
    return (
      <Container className={className}>
        <p className="mb-4 text-center font-mono text-xs uppercase tracking-wider text-foreground-subtle">
          Built &amp; shipped
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {items.map((project) => (
            <MarqueeItem key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    );
  }

  const loop = [...items, ...items];

  return (
    <Container className={cn("product-marquee", className)}>
      <p className="mb-5 text-center font-mono text-xs uppercase tracking-wider text-foreground-subtle">
        Built &amp; shipped
      </p>
      <div className="product-marquee__viewport">
        <div className="product-marquee__track">
          {loop.map((project, index) => (
            <MarqueeItem key={`${project.slug}-${index}`} project={project} />
          ))}
        </div>
      </div>
    </Container>
  );
}
