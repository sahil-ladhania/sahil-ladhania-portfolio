import { openai } from "@/lib/openai";

const EMBEDDING_MODEL = "text-embedding-ada-002";

export async function embedText(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
  });

  return response.data[0]?.embedding ?? [];
}

export { EMBEDDING_MODEL };
