"use client";

import { LayoutGroup, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";
import {
  glassTabActivePill,
  glassTabButtonActive,
  glassTabButtonInactive,
  glassTabList,
} from "@/lib/glass-styles";

export interface SegmentedTabOption<T extends string> {
  id: T;
  label: string;
}

interface SegmentedTabsProps<T extends string> {
  options: SegmentedTabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
}

const tabSpring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 18,
  mass: 0.7,
};

export function SegmentedTabs<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: SegmentedTabsProps<T>): React.ReactElement {
  const prefersReducedMotion = useReducedMotion();
  const pillTransition = prefersReducedMotion ? { duration: 0.01 } : tabSpring;
  const layoutGroupId = `segmented-tabs-${ariaLabel.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <LayoutGroup id={layoutGroupId}>
      <div role="tablist" aria-label={ariaLabel} className={glassTabList}>
        {options.map((option) => {
          const isActive = value === option.id;

          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(option.id)}
              className={cn(
                "relative rounded-md px-3 py-1.5 text-sm font-medium",
                isActive ? glassTabButtonActive : glassTabButtonInactive,
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId={`${layoutGroupId}-pill`}
                  className={glassTabActivePill}
                  transition={pillTransition}
                />
              ) : null}
              <span className="relative z-10">{option.label}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
