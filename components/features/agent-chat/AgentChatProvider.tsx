"use client";

import { createContext, useCallback, useContext, useState } from "react";

interface AgentChatContextValue {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

const AgentChatContext = createContext<AgentChatContextValue | null>(null);

export function AgentChatProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openChat = useCallback((): void => setIsOpen(true), []);
  const closeChat = useCallback((): void => setIsOpen(false), []);
  const toggleChat = useCallback((): void => setIsOpen((v) => !v), []);

  return (
    <AgentChatContext.Provider value={{ isOpen, openChat, closeChat, toggleChat }}>
      {children}
    </AgentChatContext.Provider>
  );
}

export function useAgentChat(): AgentChatContextValue {
  const ctx = useContext(AgentChatContext);
  if (!ctx) {
    throw new Error("useAgentChat must be used within AgentChatProvider");
  }
  return ctx;
}
