import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface VisitorPayload {
  sessionId: string;
  pathname: string;
  referrer: string | null;
  country: string | null;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as VisitorPayload;

    await prisma.visitorEvent.create({
      data: {
        sessionId: body.sessionId,
        pathname: body.pathname,
        referrer: body.referrer,
        country: body.country,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/visitor:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
