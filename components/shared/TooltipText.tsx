"use client";

import { Tooltip } from "@/components/aceternity/tooltip-card";
import { cn } from "@/lib/cn";
import type { TooltipDefinition } from "@/types/content.types";

const TOOLTIP_MARKER_REGEX = /\{\{([a-z0-9-]+)\}\}/g;

interface TooltipTermProps {
  tooltip: TooltipDefinition;
  className?: string;
}

export function TooltipTerm({
  tooltip,
  className,
}: TooltipTermProps): React.ReactElement {
  const triggerClassName = cn(
    "cursor-help border-b border-dotted border-accent/50 font-medium text-foreground transition-colors hover:border-accent hover:text-accent",
    className,
  );

  const content = tooltip.body;

  const trigger = tooltip.href ? (
    <a href={tooltip.href} className={triggerClassName}>
      {tooltip.label}
    </a>
  ) : (
    <span className={triggerClassName}>{tooltip.label}</span>
  );

  return <Tooltip content={content}>{trigger}</Tooltip>;
}

interface TooltipTextProps {
  text: string;
  tooltips: Record<string, TooltipDefinition>;
  className?: string;
}

export function TooltipText({
  text,
  tooltips,
  className,
}: TooltipTextProps): React.ReactElement {
  const parts = text.split(TOOLTIP_MARKER_REGEX);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          const tooltip = tooltips[part];
          if (!tooltip) {
            return <span key={`${part}-${index}`}>{part}</span>;
          }
          return <TooltipTerm key={`${part}-${index}`} tooltip={tooltip} />;
        }
        return <span key={`text-${index}`}>{part}</span>;
      })}
    </span>
  );
}

interface TooltipParagraphsProps {
  content: string;
  tooltips: Record<string, TooltipDefinition>;
  className?: string;
}

export function TooltipParagraphs({
  content,
  tooltips,
  className,
}: TooltipParagraphsProps): React.ReactElement {
  const paragraphs = content.split(/\n\n+/).filter(Boolean);

  return (
    <div className={cn("space-y-4", className)}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)}>
          <TooltipText text={paragraph} tooltips={tooltips} />
        </p>
      ))}
    </div>
  );
}
