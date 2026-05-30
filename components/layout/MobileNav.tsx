"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Link } from "@/components/ui/Link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { DownloadCvButton } from "@/components/shared/DownloadCvButton";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Now", href: "#now" },
  { label: "Studio", href: "#zyntohouse" },
  { label: "Contact", href: "#contact" },
];

export function MobileNav(): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-glass-bg backdrop-blur-xl lg:hidden">
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="#hero" className="font-semibold text-foreground">
          Sahil Ladhania
        </Link>
        <div className="flex items-center gap-3">
          <DownloadCvButton variant="ghost" className="px-2 py-1 text-xs" />
          <ThemeToggle className="px-2 py-1" />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="text-sm text-foreground-muted"
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border px-6 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              variant="nav"
              className="block py-2"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
