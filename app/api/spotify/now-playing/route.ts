import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";
import type { ApiResponse } from "@/types/api.types";

export async function GET(): Promise<
  NextResponse<ApiResponse<{
    track: string;
    artist: string;
    isPlaying: boolean;
    url: string | null;
  } | null>>
> {
  try {
    const data = await getNowPlaying();
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: true, data: null });
  }
}
