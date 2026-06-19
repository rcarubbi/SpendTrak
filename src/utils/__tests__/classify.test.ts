import { describe, it, expect } from "vitest";
import { matchKeyword, classify, extractKeyword } from "../classify";
import type { Category } from "../../types";

describe("matchKeyword", { tags: ["unit"] }, () => {
  it("matches keyword at start of string", () => {
    expect(matchKeyword("TFL CARD PAYMENT", "TFL")).toBe(true);
  });

  it("matches keyword after space", () => {
    expect(matchKeyword("DEBIT MERCADO LISBON", "MERCADO")).toBe(true);
  });

  it("matches keyword after underscore", () => {
    expect(matchKeyword("DEBIT WASABI_161", "WASABI")).toBe(true);
  });

  it("does not match partial word (TFL in NETFLIX)", () => {
    expect(matchKeyword("NETFLIX", "TFL")).toBe(false);
  });

  it("matches concatenated keyword at start", () => {
    expect(matchKeyword("YOUR-MOVECOUK", "YOUR-MOVE")).toBe(true);
  });

  it("is case insensitive", () => {
    expect(matchKeyword("debit mercado lisbon", "MERCADO")).toBe(true);
    expect(matchKeyword("DEBIT MERCADO LISBON", "mercado")).toBe(true);
  });

  it("matches keyword with regex special chars", () => {
    expect(matchKeyword("AMAZON.CO.UK", "AMAZON.CO.UK")).toBe(true);
  });
});

describe("classify", () => {
  const cats: Category[] = [
    { id: "food", name: "Food", color: "#ef4444", type: "debit", keywords: ["MERCADO", "UBER EATS"] },
    { id: "transport", name: "Transport", color: "#3b82f6", type: "debit", keywords: ["TFL", "UBER"] },
  ];

  it("returns category id when keyword matches", () => {
    expect(classify("DEBIT MERCADO LISBON", cats)).toBe("food");
  });

  it("returns uncategorized when no match", () => {
    expect(classify("SOME RANDOM SHOP", cats)).toBe("other");
  });

  it("matches first matching category", () => {
    expect(classify("UBER RIDE", cats)).toBe("transport");
  });

  it("handles empty categories", () => {
    expect(classify("DEBIT MERCADO", [])).toBe("other");
  });
});

describe("extractKeyword", () => {
  it("returns first word longer than 3 chars (skips short words)", () => {
    expect(extractKeyword("A ON MERCADO LISBON")).toBe("MERCADO");
  });

  it("skips stop words", () => {
    expect(extractKeyword("THE AMAZON PURCHASE")).toBe("AMAZON");
  });

  it("falls back to first word if none longer than 3", () => {
    expect(extractKeyword("ON IT")).toBe("ON");
  });

  it("uppercases the result", () => {
    expect(extractKeyword("a on mercado")).toBe("MERCADO");
  });
});
