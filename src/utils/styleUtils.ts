import type { Category, Transaction } from "../types";

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function catStyleTag(cats: Category[]): string {
  return cats.map(cat => {
    const r = parseInt(cat.color.slice(1, 3), 16);
    const g = parseInt(cat.color.slice(3, 5), 16);
    const b = parseInt(cat.color.slice(5, 7), 16);
    return `.ag-row-cat-${cat.id}{background-color:rgba(${r},${g},${b},0.12)!important}`;
  }).join("");
}

export function rowClassRules(cats: Category[]): Record<string, (params: { data: unknown }) => boolean> {
  const rules: Record<string, (params: { data: unknown }) => boolean> = {};
  for (const cat of cats) {
    rules[`ag-row-cat-${cat.id}`] = (params) => (params.data as Transaction)?.categoryId === cat.id;
  }
  return rules;
}

export function extractKeyword(desc: string): string {
  const words = desc.split(/\s+/);
  const stopWords = new Set(["ON", "THE", "AND", "FOR", "WITH", "LIMITED", "LTD", "LIMIT", "UK"]);
  let kw = words.find(w => w.length > 3 && !stopWords.has(w.toUpperCase()));
  if (!kw) kw = words[0];
  return kw.toUpperCase();
}
