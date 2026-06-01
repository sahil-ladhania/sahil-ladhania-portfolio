import type { UIMessage } from "ai";

interface LegacyMessage {
  role: string;
  content?: string;
  parts?: UIMessage["parts"];
  id?: string;
}

export function normalizeToUIMessages(messages: unknown[]): UIMessage[] {
  return messages.map((raw, index) => {
    const message = raw as LegacyMessage;

    if (message.parts && message.id) {
      return raw as UIMessage;
    }

    return {
      id: message.id ?? `msg-${index}`,
      role: message.role as UIMessage["role"],
      parts: [{ type: "text" as const, text: message.content ?? "" }],
    };
  });
}

export function extractLastUserQuery(messages: unknown[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i] as LegacyMessage & UIMessage;
    if (message.role !== "user") {
      continue;
    }

    if (typeof message.content === "string") {
      return message.content;
    }

    if (Array.isArray(message.parts)) {
      return message.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("");
    }
  }

  return "";
}
