import { env } from "@/config/env";

interface SpotifyTokenResponse {
  access_token: string;
}

interface SpotifyNowPlayingResponse {
  item?: {
    name: string;
    external_urls: { spotify: string };
    artists: { name: string }[];
  };
  is_playing: boolean;
}

export async function getSpotifyAccessToken(): Promise<string> {
  const credentials = Buffer.from(
    `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`,
  ).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: env.SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!res.ok) {
    throw new Error("Spotify token refresh failed");
  }

  const data = (await res.json()) as SpotifyTokenResponse;
  return data.access_token;
}

export async function getNowPlaying(): Promise<{
  track: string;
  artist: string;
  isPlaying: boolean;
  url: string | null;
} | null> {
  try {
    const token = await getSpotifyAccessToken();
    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 30 },
      },
    );

    if (res.status === 204 || !res.ok) {
      return null;
    }

    const data = (await res.json()) as SpotifyNowPlayingResponse;
    if (!data.item) return null;

    return {
      track: data.item.name,
      artist: data.item.artists.map((a) => a.name).join(", "),
      isPlaying: data.is_playing,
      url: data.item.external_urls.spotify,
    };
  } catch {
    return null;
  }
}
