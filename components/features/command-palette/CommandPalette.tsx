"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useAgentChat } from "@/components/features/agent-chat/AgentChatProvider";
import { getCvDownloadUrl } from "@/components/shared/DownloadCvButton";
import { cn } from "@/lib/cn";
import type { SiteContact } from "@/types/content.types";

interface CommandPaletteProps {
  contact: SiteContact;
}

const NAV_ITEMS = [
  { label: "Go to About", href: "#about" },
  { label: "Go to Products", href: "#products" },
  { label: "Go to Now", href: "#now" },
  { label: "Go to Experience", href: "#zyntohouse" },
  { label: "Go to Contact", href: "#contact" },
];

export function CommandPalette({ contact }: CommandPaletteProps): React.ReactElement | null {
  const [open, setOpen] = useState<boolean>(false);
  const { toggleTheme } = useTheme();
  const { openChat } = useAgentChat();

  const scrollTo = useCallback((href: string): void => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const copyEmail = async (): Promise<void> => {
    await navigator.clipboard.writeText(contact.email);
    setOpen(false);
  };

  const downloadCv = (): void => {
    const a = document.createElement("a");
    a.href = getCvDownloadUrl();
    a.download = "sahil-ladhania-cv.pdf";
    a.click();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 pt-[20vh] backdrop-blur-sm">
      <Command
        className="w-full max-w-lg overflow-hidden rounded-lg border border-border bg-background shadow-lg"
        label="Command palette"
      >
        <Command.Input
          placeholder="Type a command..."
          className="w-full border-b border-border bg-transparent px-4 py-3 text-sm outline-none"
        />
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="px-4 py-6 text-sm text-foreground-muted">
            No results.
          </Command.Empty>

          <Command.Group heading="Navigate" className="px-2 py-1 text-xs text-foreground-subtle">
            {NAV_ITEMS.map((item) => (
              <Command.Item
                key={item.href}
                value={item.label}
                onSelect={() => scrollTo(item.href)}
                className={cn(
                  "cursor-pointer rounded-md px-3 py-2 text-sm text-foreground",
                  "aria-selected:bg-accent-muted aria-selected:text-accent",
                )}
              >
                {item.label}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Actions" className="mt-2 px-2 py-1 text-xs text-foreground-subtle">
            <Command.Item
              value="Ask my agent"
              onSelect={() => {
                openChat();
                setOpen(false);
              }}
              className="cursor-pointer rounded-md px-3 py-2 text-sm aria-selected:bg-accent-muted"
            >
              Ask my agent
            </Command.Item>
            <Command.Item
              value="Copy email"
              onSelect={() => void copyEmail()}
              className="cursor-pointer rounded-md px-3 py-2 text-sm aria-selected:bg-accent-muted"
            >
              Copy email
            </Command.Item>
            <Command.Item
              value="Book a call"
              onSelect={() => {
                window.open(contact.calUrl, "_blank");
                setOpen(false);
              }}
              className="cursor-pointer rounded-md px-3 py-2 text-sm aria-selected:bg-accent-muted"
            >
              Book a call
            </Command.Item>
            <Command.Item
              value="Open GitHub"
              onSelect={() => {
                window.open(contact.github, "_blank");
                setOpen(false);
              }}
              className="cursor-pointer rounded-md px-3 py-2 text-sm aria-selected:bg-accent-muted"
            >
              Open GitHub
            </Command.Item>
            <Command.Item
              value="Open LinkedIn"
              onSelect={() => {
                window.open(contact.linkedin, "_blank");
                setOpen(false);
              }}
              className="cursor-pointer rounded-md px-3 py-2 text-sm aria-selected:bg-accent-muted"
            >
              Open LinkedIn
            </Command.Item>
            <Command.Item
              value="Download CV"
              onSelect={downloadCv}
              className="cursor-pointer rounded-md px-3 py-2 text-sm aria-selected:bg-accent-muted"
            >
              Download CV
            </Command.Item>
            <Command.Item
              value="Toggle theme"
              onSelect={() => {
                toggleTheme();
                setOpen(false);
              }}
              className="cursor-pointer rounded-md px-3 py-2 text-sm aria-selected:bg-accent-muted"
            >
              Toggle light/dark
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
      <button
        type="button"
        className="fixed inset-0 -z-10"
        onClick={() => setOpen(false)}
        aria-label="Close command palette"
      />
    </div>
  );
}
