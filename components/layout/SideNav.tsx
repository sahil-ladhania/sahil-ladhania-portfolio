"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Link } from "@/components/ui/Link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { DownloadCvButton } from "@/components/shared/DownloadCvButton";
import { TimezoneClock } from "@/components/features/timezone-clock/TimezoneClock";
import { SpotifyWidget } from "@/components/features/spotify-widget/SpotifyWidget";

const NAV_ITEMS = [
  { label: "About", href: "#about", number: "01." },
  { label: "Work", href: "#work", number: "02." },
  { label: "Now", href: "#now", number: "03." },
  { label: "Studio", href: "#zyntohouse", number: "04." },
  { label: "Contact", href: "#contact", number: "05." },
];

export function SideNav(): React.ReactElement {
  const [active, setActive] = useState<string>("#about");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => item.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:flex-col lg:justify-between lg:border-r lg:border-border lg:px-8 lg:py-12">
      <div>
        <Link href="#hero" className="block">
          <p className="text-lg font-semibold text-foreground">Sahil Ladhania</p>
          <p className="mt-1 font-mono text-xs text-foreground-subtle">
            AI & Full-Stack Engineer
          </p>
        </Link>

        <nav className="mt-12 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              variant="nav"
              className={cn(
                "flex items-center gap-3 py-1",
                active === item.href && "text-accent",
              )}
            >
              <span className="font-mono text-xs">{item.number}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-8">
          <DownloadCvButton className="w-full text-center" />
        </div>
      </div>

      <div className="space-y-4">
        <ThemeToggle />
        <TimezoneClock />
        <SpotifyWidget />
        <p className="font-mono text-xs text-foreground-subtle">
          © {new Date().getFullYear()} Sahil Ladhania
        </p>
      </div>
    </aside>
  );
}
