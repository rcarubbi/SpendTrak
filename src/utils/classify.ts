import type { Category } from "../types";
import { UNCATEGORIZED_ID } from "../constants";

const STOP_WORDS = new Set(["ON", "THE", "AND", "FOR", "WITH", "LIMITED", "LTD", "LIMIT", "UK"]);
const ESCAPE_RE = /[.*+?^${}()|[\]\\]/g;

function escapeRegex(s: string): string {
  return s.replace(ESCAPE_RE, "\\$&");
}

export function matchKeyword(text: string, keyword: string): boolean {
  const upperKeyword = keyword.toUpperCase();
  const upperText = text.toUpperCase();
  
  // Keyword must be preceded by a word boundary (start-of-string, space, underscore, punctuation).
  // No trailing boundary check — bank descriptions often concatenate fields without spaces
  // (e.g. "YOUR-MOVE" in "YOUR-MOVECOUK" should match).
  //
  // Leading boundary prevents false positives like "TFL" in "NETFLIX":
  //   "TFL" in "NETFLIX" is preceded by 'E' (word char) -> no match
  //
  // Examples:
  // - "YOUR-MOVE" matches in "YOUR-MOVECOUK"  ✓  (start + no trailing check)
  // - "WASABI"   matches in "DEBIT WASABI_161" ✓  (space before)
  // - "TFL"      does NOT match in "NETFLIX"   ✓  ('E' before TFL)
  // - "TFL"      matches in "TFL_CARD"         ✓  (start)
  
  const pattern = `(?:^|[\\W_])${escapeRegex(upperKeyword)}`;
  return new RegExp(pattern).test(upperText);
}

export function classify(description: string, categories: Category[]): string {
  for (const cat of categories) {
    if (cat.keywords?.some((k) => matchKeyword(description, k))) {
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
