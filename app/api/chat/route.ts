import { NextResponse } from "next/server";
import { streamChatResponse } from "@/lib/rag/chat";

interface ChatRequestBody {
  messages: { role: "user" | "assistant"; content: string }[];
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as ChatRequestBody;

    if (!body.messages?.length) {
      return NextResponse.json(
        { success: false, error: "Messages required" },
        { status: 400 },
      );
    }

    const stream = await streamChatResponse(body.messages);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Chat failed";
    console.error("POST /api/chat:", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
