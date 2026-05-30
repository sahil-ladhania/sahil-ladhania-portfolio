"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn, reducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface SectionProps {
  id?: string;
  className?: string;
  animate?: boolean;
  surface?: "default" | "subtle";
  children: React.ReactNode;
}

const sectionClassName = "scroll-mt-20 py-20 md:py-28 lg:py-32";

export function Section({
  id,
  className,
  animate = true,
  surface = "default",
  children,
}: SectionProps): React.ReactElement {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedMotion : fadeIn;
  const surfaceClassName =
    surface === "subtle" ? "bg-background-subtle" : undefined;

  if (!animate) {
    return (
      <section
        id={id}
        className={cn(sectionClassName, surfaceClassName, className)}
      >
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={variants}
      className={cn(sectionClassName, surfaceClassName, className)}
    >
      {children}
    </motion.section>
  );
}
