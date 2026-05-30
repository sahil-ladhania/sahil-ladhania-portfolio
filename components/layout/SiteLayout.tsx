"use client";

import { SideNav } from "@/components/layout/SideNav";
import { MobileNav } from "@/components/layout/MobileNav";
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
      <MobileNav />
      <SideNav />
      <main className="lg:pl-72 pb-32">{children}</main>
      <SiteFooter />
      <AgentChat />
      <CommandPalette contact={contact} />
    </AgentChatProvider>
  );
}
