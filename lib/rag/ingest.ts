import fs from "fs";
import path from "path";

import { prisma } from "@/lib/prisma";
import { chunkText, embedText } from "@/lib/rag/chunker";
import {
  getAboutContent,
  getPosts,
  getProjects,
  getZyntohouseContent,
} from "@/lib/content/loader";

interface IngestDocument {
  sourceType: string;
  sourceId: string;
  title: string;
  text: string;
}

async function upsertChunks(doc: IngestDocument): Promise<void> {
  const chunks = chunkText(doc.text);

  await prisma.$executeRaw`
    DELETE FROM knowledge_chunks
    WHERE source_type = ${doc.sourceType} AND source_id = ${doc.sourceId}
  `;

  for (const chunk of chunks) {
    const embedding = await embedText(chunk);
    const vectorString = `[${embedding.join(",")}]`;

    await prisma.$executeRaw`
      INSERT INTO knowledge_chunks (id, content, embedding, source_type, source_id, title, updated_at)
      VALUES (
        gen_random_uuid(),
        ${chunk},
        ${vectorString}::vector,
        ${doc.sourceType},
        ${doc.sourceId},
        ${doc.title},
        NOW()
      )
    `;
  }
}

function readTextFile(relativePath: string): string {
  const filePath = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(filePath)) return "";
  return fs.readFileSync(filePath, "utf-8");
}

export async function reindexAll(): Promise<void> {
  const docs: IngestDocument[] = [];

  const about = getAboutContent();
  docs.push({
    sourceType: "resume",
    sourceId: "about",
    title: "About Sahil",
    text: about.body,
  });

  const resume = readTextFile("content/resume.md");
  if (resume) {
    docs.push({
      sourceType: "resume",
      sourceId: "resume",
      title: "Resume",
      text: resume,
    });
  }

  for (const project of getProjects()) {
    docs.push({
      sourceType: "project",
      sourceId: project.slug,
      title: project.name,
      text: `${project.outcomeLine}\n\nProblem: ${project.problem}\n\nSolution: ${project.solution}\n\nResult: ${project.result}`,
    });
  }

  const zyntohouse = getZyntohouseContent();
  docs.push({
    sourceType: "project",
    sourceId: "zyntohouse",
    title: "Zyntohouse",
    text: `${zyntohouse.content.tagline}\n\n${zyntohouse.body}`,
  });

  for (const post of getPosts()) {
    docs.push({
      sourceType: "post",
      sourceId: post.id,
      title: post.title,
      text: post.body,
    });
  }

  const musicSnapshots = await prisma.musicSnapshot.findMany({
    take: 20,
    orderBy: { fetchedAt: "desc" },
  });

  for (const track of musicSnapshots) {
    docs.push({
      sourceType: "music",
      sourceId: track.spotifyId ?? track.id,
      title: `${track.trackName} — ${track.artist}`,
      text: `Sahil listens to ${track.trackName} by ${track.artist}${track.album ? ` from ${track.album}` : ""}.`,
    });
  }

  for (const doc of docs) {
    await upsertChunks(doc);
  }

  console.log(`Reindexed ${docs.length} documents.`);
}
