"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function TimezoneClock({ className }: { className?: string }): React.ReactElement {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const format = (): string => {
      return new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
    };

    setTime(format());
    const id = setInterval(() => setTime(format()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={cn("font-mono text-xs text-foreground-subtle", className)}>
      Bangalore · {time || "—:—"} IST
    </p>
  );
}
