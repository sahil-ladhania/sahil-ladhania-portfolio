export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  logo: string;
  role: string;
  outcomeLine: string;
  techStack: string[];
  problem: string;
  solution: string;
  result: string;
  links?: ProjectLink[];
  hasArchitectureDiagram: boolean;
  expandInWork: boolean;
  order: number;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  platform: "linkedin" | "twitter" | "blog" | "other";
  publishedAt: string;
  url?: string;
}

export type CurrentlyBuildingStatus = "building-now" | "in-progress";

export interface CurrentlyBuilding {
  name: string;
  status: CurrentlyBuildingStatus;
  description: string;
  techStack: string[];
  logo?: string;
}

export interface ZyntohouseContent {
  logo: string;
  tagline: string;
  proofPoints: string[];
  services: string[];
  clientTypes: string[];
}

export interface SiteHero {
  greeting: string;
  oneLiner: string;
  subtext: string;
}

export interface SiteContact {
  email: string;
  calUrl: string;
  linkedin: string;
  github: string;
}

export interface SiteProof {
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  clients: string[];
}

export interface SiteMeta {
  hero: SiteHero;
  contact: SiteContact;
  proof: SiteProof;
}

export interface AboutContent {
  body: string;
  highlights: string[];
  techStack: string[];
}

export interface TooltipDefinition {
  label: string;
  body: string;
  href?: string;
}

export type TooltipRegistry = Record<string, TooltipDefinition>;

export interface HeroTerminalSequence {
  command: string;
  output: string[];
}

export interface HeroTerminalContent {
  username: string;
  shell: string;
  typingSpeed: number;
  delayBetweenCommands: number;
  initialDelay: number;
  enableSound: boolean;
  commands: string[];
  outputs: Record<number, string[]>;
}
