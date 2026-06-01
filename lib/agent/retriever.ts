import { prisma } from "@/lib/prisma";
import { embedText } from "@/lib/agent/embeddings";

export interface RetrievedChunk {
  id: string;
  content: string;
  source: string;
  chunkIndex: number;
  score: number;
}

export async function retrieveContext(
  query: string,
  limit = 8,
): Promise<RetrievedChunk[]> {
  const embedding = await embedText(query);
  const vectorString = `[${embedding.join(",")}]`;

  const results = await prisma.$queryRaw<
    {
      id: string;
      content: string;
      metadata: { source?: string; chunkIndex?: number } | null;
      score: number;
    }[]
  >`
    SELECT
      id,
      content,
      metadata,
      1 - (embedding <=> ${vectorString}::vector) AS score
    FROM knowledge_chunks
    WHERE source_type = 'agent'
      AND embedding IS NOT NULL
    ORDER BY embedding <=> ${vectorString}::vector
    LIMIT ${limit}
  `;

  return results.map((row) => ({
    id: row.id,
    content: row.content,
    source: row.metadata?.source ?? "unknown",
    chunkIndex: row.metadata?.chunkIndex ?? 0,
    score: Number(row.score),
  }));
}
