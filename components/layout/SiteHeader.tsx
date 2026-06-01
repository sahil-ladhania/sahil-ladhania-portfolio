"use client";

import { useMemo } from "react";
import {
  IconFileTypePdf,
  IconHammer,
  IconHome2,
  IconLayoutGrid,
  IconMail,
  IconUserCircle,
  IconWand,
} from "@tabler/icons-react";
import { FloatingDock } from "@/components/aceternity/floating-dock";
import type { FloatingDockItem } from "@/components/aceternity/floating-dock.types";
import { getCvDownloadUrl } from "@/components/shared/DownloadCvButton";
import { NAV_ITEMS } from "@/lib/nav-items";

const DOCK_ICON = "h-full w-full";

const NAV_ICONS: Record<string, React.ReactNode> = {
  About: <IconUserCircle className={DOCK_ICON} stroke={1.75} />,
  Products: <IconLayoutGrid className={DOCK_ICON} stroke={1.75} />,
  "In progress": <IconHammer className={DOCK_ICON} stroke={1.75} />,
  Experience: <IconWand className={DOCK_ICON} stroke={1.75} />,
  Contact: <IconMail className={DOCK_ICON} stroke={1.75} />,
};

export function SiteHeader(): React.ReactElement {
  const dockItems = useMemo((): FloatingDockItem[] => {
    return [
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
    ];
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-30 -translate-x-1/2 overflow-visible">
      <div className="pointer-events-auto overflow-visible">
        <FloatingDock items={dockItems} mobileClassName="hidden" />
      </div>
    </div>
  );
}
