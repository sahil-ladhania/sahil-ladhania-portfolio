const MAX_INPUT_LENGTH = 500;

const OFF_TOPIC_PATTERNS = [
  /\bweather\b/i,
  /\brecipe\b/i,
  /\bwho is the president\b/i,
  /\bwrite me a poem\b/i,
  /\bhomework\b/i,
  /\bsolve this leetcode\b/i,
  /\btranslate this\b/i,
  /\bcapital of\b/i,
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

  return OFF_TOPIC_PATTERNS.some((pattern) => pattern.test(normalized));
}
