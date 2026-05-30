"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/cn";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps): React.ReactElement {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className={cn(
        "rounded-md border border-border px-3 py-1.5 text-sm text-foreground-muted transition-colors hover:text-accent",
        className,
      )}
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
