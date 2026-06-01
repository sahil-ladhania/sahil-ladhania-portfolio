import fs from "fs";
import path from "path";

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getEncoding } from "js-tiktoken";

import {
  getAboutContent,
  getCurrentlyBuilding,
  getProjects,
  getSiteMeta,
  getZyntohouseContent,
} from "@/lib/content/loader";
import { embedText } from "@/lib/agent/embeddings";
import { prisma } from "@/lib/prisma";
import type { Project } from "@/types/content.types";

const AGENT_CONTENT_DIR = path.join(process.cwd(), "content", "agent");

const encoding = getEncoding("cl100k_base");

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 400,
  chunkOverlap: 60,
  lengthFunction: (text: string) => encoding.encode(text).length,
});

interface AgentDocument {
  sourceId: string;
  title: string;
  text: string;
}

function listAgentMarkdownFiles(): string[] {
  if (!fs.existsSync(AGENT_CONTENT_DIR)) {
    return [];
  }

  return fs
    .readdirSync(AGENT_CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort();
}

function readTextFile(relativePath: string): string {
  const filePath = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(filePath)) {
    return "";
  }

  return fs.readFileSync(filePath, "utf-8");
}

function formatProjectDocument(project: Project): string {
  const lines = [
    `# ${project.name}`,
    `Slug: ${project.slug}`,
    `Role: ${project.role}`,
    `Outcome: ${project.outcomeLine}`,
    `Status: ${project.showResult ? "shipped" : "in progress"}`,
    `Tech stack: ${project.techStack.join(", ")}`,
  ];

  if (project.links?.length) {
    lines.push(
      `Live links: ${project.links.map((link) => `${link.label} ${link.href}`).join(", ")}`,
    );
  }

  if (project.about) {
    lines.push(`About: ${project.about}`);
  }

  if (project.problem) {
    lines.push(`Problem: ${project.problem}`);
  }

  if (project.solution) {
    lines.push(`Solution: ${project.solution}`);
  }

  if (project.result) {
    lines.push(`Result: ${project.result}`);
  }

  if (project.highlights.length > 0) {
    lines.push(
      "Highlights:",
      ...project.highlights.map((item) => `- ${item}`),
    );
  }

  if (project.productThinkingIntro || project.productThinkingSections.length > 0) {
    lines.push("Product thinking:");
    if (project.productThinkingIntro) {
      lines.push(project.productThinkingIntro);
    }
    for (const section of project.productThinkingSections) {
      lines.push(`${section.title}: ${section.body}`);
    }
  }

  return lines.join("\n\n");
}

function buildPortfolioDocuments(): AgentDocument[] {
  const docs: AgentDocument[] = [];
  const site = getSiteMeta();
  const about = getAboutContent();
  const zyntohouse = getZyntohouseContent();
  const building = getCurrentlyBuilding();

  docs.push({
    sourceId: "portfolio:site",
    title: "Site overview",
    text: [
      "Hero greeting and positioning:",
      site.hero.greeting,
      site.hero.oneLiner,
      site.hero.subtext,
      "",
      "Contact:",
      `Email: ${site.contact.email}`,
      `Cal.com: ${site.contact.calUrl}`,
      `LinkedIn: ${site.contact.linkedin}`,
      `GitHub: ${site.contact.github}`,
    ].join("\n"),
  });

  if (building.length > 0) {
    docs.push({
      sourceId: "portfolio:currently-building",
      title: "Currently building",
      text: building
        .map(
          (item) =>
            `${item.name} (${item.status}): ${item.description}\nStack: ${item.techStack.join(", ")}`,
        )
        .join("\n\n"),
    });
  }

  docs.push({
    sourceId: "portfolio:about",
    title: "About Sahil",
    text: [
      about.body,
      "",
      "Highlights:",
      ...about.highlights.map((item) => `- ${item}`),
      "",
      `Skills: ${about.techStack.join(", ")}`,
    ].join("\n"),
  });

  const resume = readTextFile("content/resume.md");
  if (resume) {
    docs.push({
      sourceId: "portfolio:resume",
      title: "Resume",
      text: resume,
    });
  }

  docs.push({
    sourceId: "portfolio:zyntohouse",
    title: "Zyntohouse experience",
    text: [
      `Role: ${zyntohouse.content.role}`,
      `Timeline: ${zyntohouse.content.startDate} to ${zyntohouse.content.endDate}`,
      zyntohouse.content.tagline,
      "",
      zyntohouse.body,
      "",
      "Proof points:",
      ...zyntohouse.content.proofPoints.map((item) => `- ${item}`),
      "",
      "Services:",
      ...zyntohouse.content.services.map((item) => `- ${item}`),
      "",
      "Client types:",
      ...zyntohouse.content.clientTypes.map((item) => `- ${item}`),
      "",
      `Tech stack: ${zyntohouse.content.techStack.join(", ")}`,
      `Website: ${zyntohouse.content.websiteUrl}`,
      `Discovery call: ${zyntohouse.content.calUrl}`,
    ].join("\n"),
  });

  for (const project of getProjects()) {
    docs.push({
      sourceId: `portfolio:project:${project.slug}`,
      title: project.name,
      text: formatProjectDocument(project),
    });
  }

  return docs;
}

function buildAgentMarkdownDocuments(): AgentDocument[] {
  return listAgentMarkdownFiles().map((filename) => {
    const filePath = path.join(AGENT_CONTENT_DIR, filename);
    const text = fs.readFileSync(filePath, "utf-8");
    const sourceId = filename.replace(/\.md$/, "");

    return {
      sourceId: `agent:${sourceId}`,
      title: sourceId,
      text,
    };
  });
}

async function ingestDocument(doc: AgentDocument): Promise<number> {
  const chunks = await splitter.splitText(doc.text);

  for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
    const chunk = chunks[chunkIndex] ?? "";
    const embedding = await embedText(chunk);
    const vectorString = `[${embedding.join(",")}]`;
    const metadata = JSON.stringify({
      source: doc.sourceId,
      title: doc.title,
      chunkIndex,
    });

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
        ${doc.sourceId},
        ${doc.title},
        ${metadata}::jsonb,
        NOW()
      )
    `;
  }

  console.log(`Ingesting ${doc.sourceId}... ${chunks.length} chunks created`);
  return chunks.length;
}

export async function ingestAgentData(): Promise<void> {
  await prisma.$executeRaw`
    DELETE FROM knowledge_chunks
    WHERE source_type = 'agent'
  `;

  const documents = [
    ...buildPortfolioDocuments(),
    ...buildAgentMarkdownDocuments(),
  ];

  if (documents.length === 0) {
    throw new Error("No agent documents found to ingest");
  }

  let totalChunks = 0;

  for (const doc of documents) {
    totalChunks += await ingestDocument(doc);
  }

  console.log(
    `Agent ingest complete: ${documents.length} documents, ${totalChunks} chunks.`,
  );
}
