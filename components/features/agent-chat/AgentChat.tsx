"use client";

import { useChat } from "@ai-sdk/react";
import { IconSparkles } from "@tabler/icons-react";
import { TextStreamChatTransport, type UIMessage } from "ai";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { useAgentChat } from "@/components/features/agent-chat/AgentChatProvider";
import { cn } from "@/lib/cn";

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function AgentChat(): React.ReactElement {
  const { isOpen, openChat, closeChat } = useAgentChat();
  const [triggerHovered, setTriggerHovered] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () => new TextStreamChatTransport({ api: "/api/agent" }),
    [],
  );

  const { messages, sendMessage, status, error, clearError } = useChat({
    transport,
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    return undefined;
  }, [isOpen]);

  const handleSubmit = (event?: { preventDefault?: () => void }): void => {
    event?.preventDefault?.();
    const trimmed = input.trim();
    if (!trimmed || isLoading) {
      return;
    }

    clearError();
    void sendMessage({ text: trimmed });
    setInput("");
  };

  const errorMessage =
    error?.message === "Failed to fetch"
      ? "Agent unavailable. Try contact links instead."
      : error?.message;

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={openChat}
          onMouseEnter={() => setTriggerHovered(true)}
          onMouseLeave={() => setTriggerHovered(false)}
          className="fixed top-5 right-6 z-40 flex h-11 w-11 items-center justify-center overflow-visible rounded-full border border-border-strong bg-glass-bg/75 shadow-[0_8px_32px_rgba(8,74,58,0.12)] backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-white/50 transition-colors hover:border-accent/40 hover:bg-accent-muted/30 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:ring-white/10"
          aria-label="Ask my agent anything"
        >
          <AnimatePresence>
            {triggerHovered && (
              <motion.span
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 4 }}
                transition={{ duration: 0.15 }}
                className="pointer-events-none absolute top-1/2 right-[calc(100%+0.75rem)] w-max max-w-[11rem] -translate-y-1/2 rounded-md border border-border-strong bg-glass-bg/90 px-2.5 py-1.5 text-center text-xs font-medium text-foreground shadow-md backdrop-blur-xl"
              >
                Ask my agent anything
              </motion.span>
            )}
          </AnimatePresence>
          <IconSparkles className="h-5 w-5 text-accent" stroke={1.75} aria-hidden="true" />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeChat}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
              aria-label="Close chat sidebar"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-lg"
              aria-label="Agent chat"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                  <p className="font-mono text-xs text-accent">Sahil&apos;s agent</p>
                  <p className="text-sm text-foreground-muted">
                    Ask about my work, projects, or stack.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeChat}
                  className="rounded-md px-2 py-1 text-foreground-subtle transition-colors hover:text-accent"
                  aria-label="Close chat"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                {messages.length === 0 && (
                  <p className="text-sm text-foreground-muted">
                    Ask about my work, projects, or what I&apos;m into.
                  </p>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm",
                      msg.role === "user"
                        ? "ml-8 bg-background-subtle text-foreground"
                        : "mr-8 bg-glass-bg text-foreground-muted",
                    )}
                  >
                    {getMessageText(msg)}
                  </div>
                ))}
                {isLoading && (
                  <p className="text-sm text-foreground-subtle">Thinking...</p>
                )}
                {errorMessage && (
                  <p className="text-sm text-error">{errorMessage}</p>
                )}
                <div ref={bottomRef} />
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="border-t border-border px-5 py-4"
              >
                <div className="flex items-center gap-2 rounded-lg border border-glass-border bg-glass-bg px-4 py-3 backdrop-blur-xl">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask my agent anything..."
                    aria-label="Ask Sahil's agent"
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="text-accent hover:text-accent-hover disabled:opacity-50"
                    aria-label="Send message"
                  >
                    ↑
                  </button>
                </div>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
