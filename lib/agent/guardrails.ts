const MAX_INPUT_LENGTH = 500;

const ON_TOPIC_KEYWORDS = [
  "sahil",
  "ladhania",
  "zyntohouse",
  "tbk",
  "reachly",
  "yummmzo",
  "lulu",
  "custra",
  "project",
  "portfolio",
  "hire",
  "role",
  "job",
  "work",
  "stack",
  "langchain",
  "langgraph",
  "rag",
  "crm",
  "contact",
  "email",
  "linkedin",
  "cal.com",
  "availability",
  "client",
  "founder",
  "engineer",
  "ai",
  "full-stack",
  "fullstack",
  "typescript",
  "next.js",
  "nextjs",
  "build",
  "ship",
];

const OFF_TOPIC_PATTERNS = [
  /\bweather\b/i,
  /\brecipe\b/i,
  /\bwho is the president\b/i,
  /\bwrite me a poem\b/i,
  /\bhomework\b/i,
  /\bsolve this leetcode\b/i,
];

export const OFF_TOPIC_MESSAGE =
  "I'm only here to answer questions about Sahil and his work.";

export function trimUserInput(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length <= MAX_INPUT_LENGTH) {
    return trimmed;
  }
  return trimmed.slice(0, MAX_INPUT_LENGTH);
}

export function isOffTopic(query: string): boolean {
  const normalized = query.toLowerCase().trim();
  if (!normalized) {
    return false;
  }

  if (OFF_TOPIC_PATTERNS.some((pattern) => pattern.test(normalized))) {
    return true;
  }

  const hasOnTopicSignal = ON_TOPIC_KEYWORDS.some((keyword) =>
    normalized.includes(keyword),
  );

  if (hasOnTopicSignal) {
    return false;
  }

  const wordCount = normalized.split(/\s+/).length;
  if (wordCount <= 3) {
    return false;
  }

  return true;
}
