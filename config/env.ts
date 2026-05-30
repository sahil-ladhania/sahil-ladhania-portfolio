import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1),

  OPENAI_API_KEY: z.string().startsWith("sk-"),

  RESEND_API_KEY: z.string().startsWith("re_"),
  CONTACT_EMAIL_TO: z.string().email(),
  CONTACT_EMAIL_FROM: z.string().email(),

  SPOTIFY_CLIENT_ID: z.string().min(1),
  SPOTIFY_CLIENT_SECRET: z.string().min(1),
  SPOTIFY_REFRESH_TOKEN: z.string().min(1),

  CRON_SECRET: z.string().min(16).optional(),

  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default("https://sahilladhania.com"),
});

const defaults = {
  NODE_ENV: (process.env.NODE_ENV as "development" | "production" | "test") ?? "development",
  DATABASE_URL: process.env.DATABASE_URL ?? "postgresql://localhost:5432/portfolio",
  DIRECT_URL: process.env.DIRECT_URL ?? "postgresql://localhost:5432/portfolio",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "sk-build-placeholder",
  RESEND_API_KEY: process.env.RESEND_API_KEY ?? "re_build_placeholder",
  CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO ?? "hello@sahilladhania.com",
  CONTACT_EMAIL_FROM: process.env.CONTACT_EMAIL_FROM ?? "onboarding@resend.dev",
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID ?? "placeholder",
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET ?? "placeholder",
  SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN ?? "placeholder",
  CRON_SECRET: process.env.CRON_SECRET,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahilladhania.com",
};

export const env = envSchema.parse(defaults);

export function isEnvConfigured(): boolean {
  return Boolean(
    process.env.DATABASE_URL &&
      process.env.OPENAI_API_KEY &&
      process.env.RESEND_API_KEY,
  );
}
