import fs from "fs";
import path from "path";

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getEncoding } from "js-tiktoken";

import { embedText } from "@/lib/agent/embeddings";
import { prisma } from "@/lib/prisma";

const AGENT_CONTENT_DIR = path.join(process.cwd(), "content", "agent");

const encoding = getEncoding("cl100k_base");

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
  lengthFunction: (text: string) => encoding.encode(text).length,
});

function listAgentMarkdownFiles(): string[] {
  if (!fs.existsSync(AGENT_CONTENT_DIR)) {
    return [];
  }

  return fs
    .readdirSync(AGENT_CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort();
}

async function deleteChunksForFile(filename: string): Promise<void> {
  const sourceId = filename.replace(/\.md$/, "");

  await prisma.$executeRaw`
    DELETE FROM knowledge_chunks
    WHERE source_type = 'agent'
      AND source_id = ${sourceId}
  `;
}

async function ingestFile(filename: string): Promise<number> {
  const filePath = path.join(AGENT_CONTENT_DIR, filename);
  const text = fs.readFileSync(filePath, "utf-8");
  const sourceId = filename.replace(/\.md$/, "");
  const chunks = await splitter.splitText(text);

  await deleteChunksForFile(filename);

  for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
    const chunk = chunks[chunkIndex] ?? "";
    const embedding = await embedText(chunk);
    const vectorString = `[${embedding.join(",")}]`;
    const metadata = JSON.stringify({ source: filename, chunkIndex });

    await prisma.$executeRaw`
      INSERT INTO knowledge_chunks (
        id,
        content,
        embedding,
        source_type,
        source_id,
        title,
        metadata,
        updated_at
      )
      VALUES (
        gen_random_uuid(),
        ${chunk},
        ${vectorString}::vector,
        'agent',
        ${sourceId},
        ${sourceId},
        ${metadata}::jsonb,
        NOW()
      )
    `;
  }

  console.log(`Ingesting ${filename}... ${chunks.length} chunks created`);
  return chunks.length;
}

export async function ingestAgentData(): Promise<void> {
  const files = listAgentMarkdownFiles();

  if (files.length === 0) {
    throw new Error("No markdown files found in content/agent/");
  }

  let totalChunks = 0;

  for (const file of files) {
    totalChunks += await ingestFile(file);
  }

  console.log(`Agent ingest complete: ${files.length} files, ${totalChunks} chunks.`);
}
