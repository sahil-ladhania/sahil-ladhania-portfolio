import { NextResponse } from "next/server";

import { handleAgentChat } from "@/lib/agent/chat";
import { getClientIp, checkRateLimit } from "@/lib/agent/rate-limit";

export const runtime = "nodejs";

interface AgentRequestBody {
  messages?: unknown[];
}

export async function POST(request: Request): Promise<Response> {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
        },
        {
          status: 429,
          headers: rateLimit.retryAfterSeconds
            ? { "Retry-After": String(rateLimit.retryAfterSeconds) }
            : undefined,
        },
      );
    }

    const body = (await request.json()) as AgentRequestBody;

    if (!body.messages?.length) {
      return NextResponse.json(
        { success: false, error: "Messages required" },
        { status: 400 },
      );
    }

    return await handleAgentChat(body.messages);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Agent failed";
    console.error("POST /api/agent:", message);
    return NextResponse.json(
      { success: false, error: "Agent temporarily unavailable" },
      { status: 500 },
    );
  }
}
