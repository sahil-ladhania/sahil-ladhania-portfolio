"use client";

import { TimezoneClock } from "@/components/features/timezone-clock/TimezoneClock";
import { Link } from "@/components/ui/Link";

export function SiteFooter(): React.ReactElement {
  return (
    <footer className="border-t border-border py-12 lg:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 md:px-8">
        <TimezoneClock />
        <Link href="#hero" variant="nav">
          Back to top
        </Link>
        <p className="font-mono text-xs text-foreground-subtle">
          Built with Next.js, deployed on Vercel.
        </p>
      </div>
    </footer>
  );
}
