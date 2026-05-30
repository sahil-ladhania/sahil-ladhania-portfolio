"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { ApiResponse } from "@/types/api.types";

interface NowPlaying {
  track: string;
  artist: string;
  isPlaying: boolean;
  url: string | null;
}

export function SpotifyWidget({ className }: { className?: string }): React.ReactElement | null {
  const [track, setTrack] = useState<NowPlaying | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async (): Promise<void> => {
      try {
        const res = await fetch("/api/spotify/now-playing");
        const json = (await res.json()) as ApiResponse<NowPlaying | null>;
        if (json.success && json.data) {
          setTrack(json.data);
        }
      } catch {
        setTrack(null);
      }
    };

    void fetchNowPlaying();
    const id = setInterval(() => void fetchNowPlaying(), 30_000);
    return () => clearInterval(id);
  }, []);

  if (!track?.track) {
    return null;
  }

  return (
    <div className={cn("font-mono text-xs text-foreground-subtle", className)}>
      {track.isPlaying ? "Listening to" : "Last played"} ·{" "}
      {track.url ? (
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover"
        >
          {track.track} — {track.artist}
        </a>
      ) : (
        <span>
          {track.track} — {track.artist}
        </span>
      )}
    </div>
  );
}
