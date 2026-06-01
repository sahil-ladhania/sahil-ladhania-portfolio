import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

import { buildSystemPrompt } from "@/lib/agent/prompt";
import {
  isOffTopic,
  OFF_TOPIC_MESSAGE,
  trimUserInput,
} from "@/lib/agent/guardrails";
import {
  extractLastUserQuery,
  normalizeToUIMessages,
} from "@/lib/agent/messages";
import { retrieveContext } from "@/lib/agent/retriever";
import { env } from "@/config/env";

const openaiProvider = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function handleAgentChat(
  messages: unknown[],
): Promise<Response> {
  const rawQuery = extractLastUserQuery(messages);
  const query = trimUserInput(rawQuery);

  if (!query) {
    return new Response(
      JSON.stringify({ success: false, error: "Message required" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  if (isOffTopic(query)) {
    return new Response(OFF_TOPIC_MESSAGE, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const chunks = await retrieveContext(query);
  const systemPrompt = buildSystemPrompt(chunks);

  const uiMessages = normalizeToUIMessages(messages);
  const modelMessages = await convertToModelMessages(uiMessages);

  const result = streamText({
    model: openaiProvider("gpt-4o-mini"),
    maxOutputTokens: 600,
    temperature: 0.2,
    system: systemPrompt,
    messages: modelMessages,
  });

  return result.toTextStreamResponse();
}
