import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(): Promise<Response> {
  try {
    const chunkCount = await prisma.knowledgeChunk.count({
      where: { sourceType: "agent" },
    });

    return NextResponse.json({
      status: "online",
      grounded: "content/agent",
      chunks: chunkCount,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Health check failed";
    console.error("GET /api/agent/health:", message);
    return NextResponse.json(
      { status: "offline", error: "Agent temporarily unavailable" },
      { status: 500 },
    );
  }
}
