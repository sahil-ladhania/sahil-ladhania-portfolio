import { prisma } from "@/lib/prisma";
import { embedText } from "@/lib/rag/chunker";

interface SearchResult {
  id: string;
  content: string;
  sourceType: string;
  sourceId: string;
  title: string;
  score: number;
}

export async function searchKnowledge(
  query: string,
  limit = 5,
): Promise<SearchResult[]> {
  const embedding = await embedText(query);
  const vectorString = `[${embedding.join(",")}]`;

  const results = await prisma.$queryRaw<SearchResult[]>`
    SELECT
      id,
      content,
      source_type AS "sourceType",
      source_id AS "sourceId",
      title,
      1 - (embedding <=> ${vectorString}::vector) AS score
    FROM knowledge_chunks
    WHERE embedding IS NOT NULL
      AND 1 - (embedding <=> ${vectorString}::vector) > 0.5
    ORDER BY embedding <=> ${vectorString}::vector
    LIMIT ${limit}
  `;

  return results;
}
