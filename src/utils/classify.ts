import type { Category } from "../types";

const STOP_WORDS = new Set(["ON", "THE", "AND", "FOR", "WITH", "LIMITED", "LTD", "LIMIT", "UK"]);

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function matchKeyword(text: string, keyword: string): boolean {
  return new RegExp(`\\b${escapeRegex(keyword.toUpperCase())}\\b`).test(text.toUpperCase());
}

export function classify(description: string, categories: Category[]): string {
  const upper = description.toUpperCase();
  for (const cat of categories) {
    if (cat.keywords.some((k) => matchKeyword(upper, k))) {
      return cat.id;
    }
  }
  return "outros";
}

export function extractKeyword(desc: string): string {
  const words = desc.split(/\s+/);
  let kw = words.find((w) => w.length > 3 && !STOP_WORDS.has(w.toUpperCase()));
  if (!kw) kw = words[0];
  return kw.toUpperCase();
}
