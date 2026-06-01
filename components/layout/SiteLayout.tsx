"use client";

import { PageBackground } from "@/components/layout/PageBackground";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AgentChatProvider } from "@/components/features/agent-chat/AgentChatProvider";
import { AgentChat } from "@/components/features/agent-chat/AgentChat";
import { CommandPalette } from "@/components/features/command-palette/CommandPalette";
import type { SiteContact } from "@/types/content.types";

interface SiteLayoutProps {
  contact: SiteContact;
  children: React.ReactNode;
}

export function SiteLayout({
  contact,
  children,
}: SiteLayoutProps): React.ReactElement {
  return (
    <AgentChatProvider>
      <PageBackground />
      <SiteHeader />
      <main className="relative z-10 pb-32">{children}</main>
      <SiteFooter />
      <AgentChat contact={contact} />
      <CommandPalette contact={contact} />
    </AgentChatProvider>
  );
}
