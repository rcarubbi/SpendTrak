// @ts-nocheck
import { describe, it, expect } from "vitest";
import { catStyleTag, rowClassRules } from "../styleUtils";
import type { Category, Transaction } from "../../types";

const cats: Category[] = [
  { id: "food", name: "Food", color: "#ef4444", type: "debit", keywords: [] },
  { id: "transport", name: "Transport", color: "#3b82f6", type: "debit", keywords: [] },
];

describe("catStyleTag", { tags: ["unit"] }, () => {
  it("generates CSS rules for each category", () => {
    const css = catStyleTag(cats);
    expect(css).toContain(".ag-row-cat-food");
    expect(css).toContain(".ag-row-cat-transport");
  });

  it("includes light and dark variants", () => {
    const css = catStyleTag(cats);
    expect(css).toContain("background-color:rgba(239,68,68,0.12)!important");
    expect(css).toContain(".dark .ag-row-cat-food");
    expect(css).toContain("background-color:rgba(239,68,68,0.25)!important");
  });

  it("handles empty categories", () => {
    expect(catStyleTag([])).toBe("");
  });
});

describe("rowClassRules", () => {
  it("returns rule for each category", () => {
    const rules = rowClassRules(cats);
    expect(Object.keys(rules)).toEqual(["ag-row-cat-food", "ag-row-cat-transport"]);
  });

  it("returns true when categoryId matches", () => {
    const rules = rowClassRules(cats);
    const tx = { categoryId: "food" } as Transaction;
    expect(rules["ag-row-cat-food"]({ data: tx })).toBe(true);
    expect(rules["ag-row-cat-transport"]({ data: tx })).toBe(false);
  });

  it("handles empty categories", () => {
    expect(rowClassRules([])).toEqual({});
  });
});
