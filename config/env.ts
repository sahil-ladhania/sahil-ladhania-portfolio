import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1),

  OPENAI_API_KEY: z.string().startsWith("sk-"),

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
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahilladhania.com",
};

export const env = envSchema.parse(defaults);

export function isEnvConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.OPENAI_API_KEY);
}
