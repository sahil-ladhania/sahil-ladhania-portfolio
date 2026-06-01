import fs from "fs";
import path from "path";

import matter from "gray-matter";

import type {
  AboutContent,
  CurrentlyBuilding,
  HeroTerminalContent,
  Post,
  ProductThinkingSection,
  Project,
  SiteMeta,
  TooltipRegistry,
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

function parseProductThinking(body: string): {
  intro: string;
  sections: ProductThinkingSection[];
} {
  const raw = extractSection(body, "Product Thinking");

  if (!raw) {
    return { intro: "", sections: [] };
  }

  const headingPattern = /^### (.+)$/gm;
  const matches = [...raw.matchAll(headingPattern)];

  if (matches.length === 0) {
    return { intro: raw.trim(), sections: [] };
  }

  const intro = raw.slice(0, matches[0].index).trim();
  const sections = matches.map((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? raw.length;

    return {
      title: match[1].trim(),
      body: raw.slice(start, end).trim(),
    };
  });

  return { intro, sections };
}

function parseProject(data: Record<string, unknown>, body: string): Project {
  const productThinking = parseProductThinking(body);

  return {
    slug: String(data.slug),
    name: String(data.name),
    logo: String(data.logo ?? ""),
    role: String(data.role),
    outcomeLine: String(data.outcomeLine),
    techStack: (data.techStack as string[]) ?? [],
    contentVariant:
      data.contentVariant === "curiosity" ? "curiosity" : "case-study",
    about: extractSection(body, "About"),
    highlights: (data.highlights as string[]) ?? [],
    problem: extractSection(body, "Problem"),
    solution: extractSection(body, "Solution"),
    result: extractSection(body, "Result"),
    links: data.links as Project["links"],
    hasArchitectureDiagram: Boolean(data.hasArchitectureDiagram),
    expandInWork: data.expandInWork !== false,
    showResult: data.showResult !== false,
    showProductThinking: data.showProductThinking !== false,
    productThinkingIntro: productThinking.intro,
    productThinkingSections: productThinking.sections,
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
      logo: String(data.logo ?? "/logos/zyntohouse.png"),
      websiteUrl: String(data.websiteUrl),
      calUrl: String(data.calUrl),
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

export function getHeroTerminalContent(): HeroTerminalContent {
  const { data } = readMarkdown("hero-terminal.md");
  const sequences =
    (data.sequences as { command: string; output: string[] }[]) ?? [];

  const commands = sequences.map((s) => s.command);
  const outputs: Record<number, string[]> = {};

  sequences.forEach((s, index) => {
    outputs[index] = s.output;
  });

  return {
    username: String(data.username ?? "sahil"),
    shell: String(data.shell ?? "zsh"),
    typingSpeed: Number(data.typingSpeed ?? 45),
    delayBetweenCommands: Number(data.delayBetweenCommands ?? 600),
    initialDelay: Number(data.initialDelay ?? 800),
    enableSound: data.enableSound !== false,
    commands,
    outputs,
  };
}

export function getTooltips(): TooltipRegistry {
  const { data } = readMarkdown("tooltips.md");
  return (data.tooltips as TooltipRegistry) ?? {};
}

export { getProofClientTooltipId } from "@/lib/tooltips";
