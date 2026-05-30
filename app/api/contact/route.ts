import { NextResponse } from "next/server";
import { z } from "zod";
import { resend } from "@/lib/resend";
import { env } from "@/config/env";
import type { ApiResponse } from "@/types/api.types";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  website: z.string().optional(),
});

export async function POST(request: Request): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const body = contactSchema.parse(await request.json());

    if (body.website) {
      return NextResponse.json({ success: false, error: "Invalid submission" }, { status: 400 });
    }

    await resend.emails.send({
      from: env.CONTACT_EMAIL_FROM,
      to: env.CONTACT_EMAIL_TO,
      replyTo: body.email,
      subject: `Portfolio contact from ${body.name}`,
      text: body.message,
    });

    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send";
    console.error("POST /api/contact:", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
