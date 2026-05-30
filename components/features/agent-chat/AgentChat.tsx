"use client";

import { useState, useRef, useEffect } from "react";
import { useAgentChat } from "@/components/features/agent-chat/AgentChatProvider";
import { cn } from "@/lib/cn";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AgentChat(): React.ReactElement {
  const { isOpen, openChat, closeChat } = useAgentChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const sendMessage = async (): Promise<void> => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);
    openChat();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Chat failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantText,
          };
          return updated;
        });
      }
    } catch {
      setError("Agent unavailable. Try contact links instead.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-40 w-full max-w-xl -translate-x-1/2 px-4">
      {isOpen && (
        <div className="mb-3 max-h-[60vh] overflow-y-auto rounded-lg border border-glass-border bg-glass-bg p-4 backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-xs text-accent">Sahil&apos;s agent</p>
            <button
              type="button"
              onClick={closeChat}
              className="text-foreground-subtle hover:text-accent"
              aria-label="Minimize chat"
            >
              −
            </button>
          </div>
          <div className="space-y-3">
            {messages.length === 0 && (
              <p className="text-sm text-foreground-muted">
                Ask about my work, projects, or what I&apos;m into.
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                className={cn(
                  "rounded-md px-3 py-2 text-sm",
                  msg.role === "user"
                    ? "ml-8 bg-background-subtle text-foreground"
                    : "mr-8 bg-glass-bg text-foreground-muted",
                )}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <p className="text-sm text-foreground-subtle">Thinking...</p>
            )}
            {error && <p className="text-sm text-error">{error}</p>}
            <div ref={bottomRef} />
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void sendMessage();
        }}
        className="flex items-center gap-2 rounded-lg border border-glass-border bg-glass-bg px-4 py-3 shadow-sm backdrop-blur-xl dark:shadow-none"
      >
        <span className="text-accent" aria-hidden="true">
          ✦
        </span>
        <input
          type="text"
          value={input}
          onFocus={openChat}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask my agent anything..."
          aria-label="Ask Sahil's agent"
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="text-accent hover:text-accent-hover disabled:opacity-50"
          aria-label="Send message"
        >
          ↑
        </button>
      </form>
    </div>
  );
}
