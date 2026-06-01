"use client";
/**
 * Source: https://ui.aceternity.com/components/floating-dock
 * Registry: npx shadcn@latest add @aceternity/floating-dock
 *
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/cn";
import {
  glassDockIconHit,
  glassDockMobileShell,
  glassDockShell,
  glassDockTooltip,
} from "@/lib/glass-styles";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { useRef, useState } from "react";
import type { FloatingDockItem } from "@/components/aceternity/floating-dock.types";

export type { FloatingDockItem };

/** Subtle magnify — base 40px, peak 50px (was 80px). */
const ICON_SIZE_RANGE: number[] = [40, 50, 40];
const GLYPH_SIZE_RANGE: number[] = [20, 24, 20];

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}): React.ReactElement => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <DockItemTrigger
                  item={item}
                  className={cn(glassDockMobileShell, "h-10 w-10")}
                  iconClassName="h-4 w-4"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(glassDockMobileShell, "h-10 w-10")}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-white/80" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}): React.ReactElement => {
  const mouseX = useMotionValue<number>(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(glassDockShell, className)}
    >
      <div className="flex items-end gap-2 overflow-visible sm:gap-2.5">
        {items.map((item) => (
          <IconContainer mouseX={mouseX} key={item.title} {...item} />
        ))}
      </div>
    </motion.div>
  );
};

function DockItemTrigger({
  item,
  className,
  iconClassName,
  children,
}: {
  item: FloatingDockItem;
  className?: string;
  iconClassName?: string;
  children?: React.ReactNode;
}): React.ReactElement {
  const content = children ?? (
    <div className={iconClassName}>{item.icon}</div>
  );

  if (item.onClick) {
    return (
      <button type="button" onClick={item.onClick} className={className}>
        {content}
      </button>
    );
  }

  return (
    <a
      href={item.href ?? "#"}
      download={item.download}
      className={className}
    >
      {content}
    </a>
  );
}

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  download,
  onClick,
}: FloatingDockItem & {
  mouseX: MotionValue<number>;
}): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(
    distance,
    [-120, 0, 120],
    ICON_SIZE_RANGE,
  );
  const heightTransform = useTransform(
    distance,
    [-120, 0, 120],
    ICON_SIZE_RANGE,
  );

  const widthTransformIcon = useTransform(
    distance,
    [-120, 0, 120],
    GLYPH_SIZE_RANGE,
  );
  const heightTransformIcon = useTransform(
    distance,
    [-120, 0, 120],
    GLYPH_SIZE_RANGE,
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 180,
    damping: 16,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 180,
    damping: 16,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 180,
    damping: 16,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 180,
    damping: 16,
  });

  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div className="relative shrink-0 overflow-visible pb-0.5">
      <DockItemTrigger
        item={{ title, icon, href, download, onClick }}
        className="block overflow-visible"
      >
        <motion.div
          ref={ref}
          style={{ width, height }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={glassDockIconHit}
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 6, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 4, x: "-50%" }}
                transition={{ duration: 0.15 }}
                className={glassDockTooltip}
              >
                {title}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            style={{ width: widthIcon, height: heightIcon }}
            className="flex items-center justify-center"
          >
            {icon}
          </motion.div>
        </motion.div>
      </DockItemTrigger>
    </div>
  );
}
