"use client";

import { useChat } from "@ai-sdk/react";
import { IconSparkles } from "@tabler/icons-react";
import { TextStreamChatTransport, type UIMessage } from "ai";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { useAgentChat } from "@/components/features/agent-chat/AgentChatProvider";
import { cn } from "@/lib/cn";

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

const SUGGESTED_PROMPTS = [
  "What is Sahil currently building?",
  "Tell me about TBK Villas and his role there",
  "What projects has he shipped and what stack does he use?",
  "How can I hire him or book a discovery call?",
] as const;

function ChatMessageBody({
  role,
  text,
}: {
  role: UIMessage["role"];
  text: string;
}): React.ReactElement {
  if (role === "user") {
    return <>{text}</>;
  }

  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="mb-2 list-disc space-y-1 pl-5">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-2 list-decimal space-y-3 pl-5">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed [&>ul]:mt-2 [&>ul]:mb-0">{children}</li>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2"
          >
            {children}
          </a>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

export function AgentChat(): React.ReactElement {
  const { isOpen, openChat, closeChat } = useAgentChat();
  const [triggerHovered, setTriggerHovered] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = (): void => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  };

  const transport = useMemo(
    () => new TextStreamChatTransport({ api: "/api/agent" }),
    [],
  );

  const { messages, sendMessage, status, error, clearError } = useChat({
    transport,
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

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

  const handleSuggestedPrompt = (prompt: string): void => {
    if (isLoading) {
      return;
    }

    clearError();
    void sendMessage({ text: prompt });
  };

  const showSuggestedPrompts = messages.length === 0 && !isLoading;

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
          className={cn(
            "fixed top-5 right-6 z-50 flex h-11 w-11 items-center justify-center overflow-visible rounded-full",
            "bg-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-3xl backdrop-saturate-150",
            "transition-colors hover:bg-white/15 [&_svg]:stroke-current",
          )}
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
          <IconSparkles className="h-5 w-5" stroke={1.75} aria-hidden="true" />
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
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
              aria-label="Close chat sidebar"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border-strong bg-background shadow-[var(--glass-shadow)]"
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
                {showSuggestedPrompts ? (
                  <div className="space-y-4">
                    <p className="text-sm text-foreground-muted">
                      Ask about my work, projects, or what I&apos;m building.
                    </p>
                    <div className="flex flex-col gap-3">
                      {SUGGESTED_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => handleSuggestedPrompt(prompt)}
                          className={cn(
                            "w-fit cursor-pointer border-0 bg-transparent p-0 text-left text-sm text-foreground-muted",
                            "underline decoration-dotted decoration-foreground-subtle underline-offset-4",
                            "transition-colors hover:text-foreground hover:decoration-foreground-muted",
                          )}
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm",
                      msg.role === "user"
                        ? "ml-8 bg-background-subtle text-foreground"
                        : "mr-8 border border-border bg-background-subtle text-foreground-muted",
                    )}
                  >
                    <ChatMessageBody role={msg.role} text={getMessageText(msg)} />
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
                <div className="flex items-end gap-2 rounded-lg border border-border-strong bg-background-subtle px-4 py-3">
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                    placeholder="Ask my agent anything..."
                    aria-label="Ask Sahil's agent"
                    className="max-h-40 min-h-5 flex-1 resize-none overflow-y-auto bg-transparent text-sm leading-5 text-foreground placeholder:text-foreground-subtle focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="shrink-0 pb-0.5 text-accent hover:text-accent-hover disabled:opacity-50"
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
