"use client";

import { useMemo } from "react";
import {
  IconFileTypePdf,
  IconHome2,
  IconLayoutGrid,
  IconMail,
  IconMoon,
  IconSparkles,
  IconSun,
  IconUserCircle,
  IconWand,
} from "@tabler/icons-react";
import { FloatingDock } from "@/components/aceternity/floating-dock";
import type { FloatingDockItem } from "@/components/aceternity/floating-dock.types";
import { useTheme } from "@/components/theme/ThemeProvider";
import { getCvDownloadUrl } from "@/components/shared/DownloadCvButton";
import { NAV_ITEMS } from "@/lib/nav-items";

const DOCK_ICON = "h-full w-full";

const NAV_ICONS: Record<string, React.ReactNode> = {
  About: <IconUserCircle className={DOCK_ICON} stroke={1.75} />,
  Products: <IconLayoutGrid className={DOCK_ICON} stroke={1.75} />,
  Now: <IconSparkles className={DOCK_ICON} stroke={1.75} />,
  Experience: <IconWand className={DOCK_ICON} stroke={1.75} />,
  Contact: <IconMail className={DOCK_ICON} stroke={1.75} />,
};

export function SiteHeader(): React.ReactElement {
  const { theme, toggleTheme } = useTheme();

  const dockItems = useMemo((): FloatingDockItem[] => {
    const navItems: FloatingDockItem[] = [
      {
        title: "Home",
        icon: <IconHome2 className={DOCK_ICON} stroke={1.75} />,
        href: "#hero",
      },
      ...NAV_ITEMS.map((item) => ({
        title: item.label,
        icon: NAV_ICONS[item.label],
        href: item.href,
      })),
      {
        title: "Download CV",
        icon: <IconFileTypePdf className={DOCK_ICON} stroke={1.75} />,
        href: getCvDownloadUrl(),
        download: "sahil-ladhania-cv.pdf",
      },
      {
        title: theme === "light" ? "Dark mode" : "Light mode",
        icon:
          theme === "light" ? (
            <IconMoon className={DOCK_ICON} stroke={1.75} />
          ) : (
            <IconSun className={DOCK_ICON} stroke={1.75} />
          ),
        onClick: toggleTheme,
      },
    ];

    return navItems;
  }, [theme, toggleTheme]);

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-30 -translate-x-1/2 overflow-visible">
      <div className="pointer-events-auto overflow-visible">
        <FloatingDock items={dockItems} mobileClassName="hidden" />
      </div>
    </div>
  );
}
