import fs from "fs";
import path from "path";

import matter from "gray-matter";

import type {
  AboutContent,
  CurrentlyBuilding,
  Post,
  Project,
  SiteMeta,
  ZyntohouseContent,
} from "@/types/content.types";

const CONTENT_DIR = path.join(process.cwd(), "content");

interface ParsedMarkdown {
  data: Record<string, unknown>;
  content: string;
}

function readMarkdown(relativePath: string): ParsedMarkdown {
  const filePath = path.join(CONTENT_DIR, relativePath);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return { data, content: content.trim() };
}

function readMarkdownDir(relativeDir: string): ParsedMarkdown[] {
  const dirPath = path.join(CONTENT_DIR, relativeDir);

  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".md"))
    .map((file) => readMarkdown(path.join(relativeDir, file)));
}

function extractSection(body: string, heading: string): string {
  const regex = new RegExp(
    `## ${heading}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`,
    "i",
  );
  const match = body.match(regex);

  return match?.[1]?.trim() ?? "";
}

function parseProject(data: Record<string, unknown>, body: string): Project {
  return {
    slug: String(data.slug),
    name: String(data.name),
    role: String(data.role),
    outcomeLine: String(data.outcomeLine),
    techStack: (data.techStack as string[]) ?? [],
    problem: extractSection(body, "Problem"),
    solution: extractSection(body, "Solution"),
    result: extractSection(body, "Result"),
    links: data.links as Project["links"],
    hasArchitectureDiagram: Boolean(data.hasArchitectureDiagram),
    expandInWork: data.expandInWork !== false,
    order: Number(data.order),
  };
}

export function getSiteMeta(): SiteMeta {
  const { data } = readMarkdown("site.md");

  return {
    hero: data.hero as SiteMeta["hero"],
    contact: data.contact as SiteMeta["contact"],
    proof: data.proof as SiteMeta["proof"],
  };
}

export function getAboutContent(): AboutContent {
  const { data, content } = readMarkdown("about.md");

  return {
    body: content,
    highlights: (data.highlights as string[]) ?? [],
    techStack: (data.techStack as string[]) ?? [],
  };
}

export function getProjects(): Project[] {
  return readMarkdownDir("projects")
    .map(({ data, content }) => parseProject(data, content))
    .sort((a, b) => a.order - b.order);
}

export function getZyntohouseContent(): {
  content: ZyntohouseContent;
  body: string;
} {
  const { data, content } = readMarkdown("zyntohouse.md");

  return {
    content: {
      tagline: String(data.tagline),
      proofPoints: (data.proofPoints as string[]) ?? [],
      services: (data.services as string[]) ?? [],
      clientTypes: (data.clientTypes as string[]) ?? [],
    },
    body: content,
  };
}

export function getPosts(): Post[] {
  return readMarkdownDir("posts")
    .map(({ data, content }) => ({
      id: String(data.id),
      title: String(data.title),
      body: content,
      platform: data.platform as Post["platform"],
      publishedAt: String(data.publishedAt),
      url: data.url ? String(data.url) : undefined,
    }))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getCurrentlyBuilding(): CurrentlyBuilding[] {
  const { data } = readMarkdown("site.md");

  return (data.currentlyBuilding as CurrentlyBuilding[]) ?? [];
}
