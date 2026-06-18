import type { Category } from "../types";
import { UNCATEGORIZED_ID } from "../constants";

const STOP_WORDS = new Set(["ON", "THE", "AND", "FOR", "WITH", "LIMITED", "LTD", "LIMIT", "UK"]);

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function matchKeyword(text: string, keyword: string): boolean {
  const upperKeyword = keyword.toUpperCase();
  const upperText = text.toUpperCase();
  
  // Match keyword as a complete word, surrounded by:
  // - Non-word characters (spaces, underscores, punctuation)
  // - String boundaries (start/end)
  //
  // Examples:
  // - "WASABI" matches in "WASABI_161VICTORIA" ✓ (start + underscore)
  // - "WASABI" matches in "DEBIT WASABI_161" ✓ (space + underscore)
  // - "TFL" does NOT match in "NETFLIX" ✓ (no word boundary)
  // - "TFL" matches in "TFL_CARD" ✓ (start + underscore)
  // - "NETFLIX" does NOT match in "NETFLIX_TFL" ✓ (underscore blocks, needs non-word on both sides)
  
  const pattern = `(?:^|[\\W_])${escapeRegex(upperKeyword)}(?:[\\W_]|$)`;
  return new RegExp(pattern).test(upperText);
}

export function classify(description: string, categories: Category[]): string {
  for (const cat of categories) {
    if (cat.keywords.some((k) => matchKeyword(description, k))) {
      return cat.id;
    }
  }
  return UNCATEGORIZED_ID;
}

export function extractKeyword(desc: string): string {
  const words = desc.split(/\s+/);
  let kw = words.find((w) => w.length > 3 && !STOP_WORDS.has(w.toUpperCase()));
  if (!kw) kw = words[0];
  return kw.toUpperCase();
}
