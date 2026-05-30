"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn, reducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface SectionProps {
  id?: string;
  className?: string;
  animate?: boolean;
  children: React.ReactNode;
}

export function Section({
  id,
  className,
  animate = true,
  children,
}: SectionProps): React.ReactElement {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedMotion : fadeIn;

  if (!animate) {
    return (
      <section id={id} className={cn("py-20 md:py-28 lg:py-32", className)}>
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
      className={cn("py-20 md:py-28 lg:py-32", className)}
    >
      {children}
    </motion.section>
  );
}
