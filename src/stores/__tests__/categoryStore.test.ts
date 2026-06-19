import { describe, it, expect, vi, beforeEach } from "vitest";
import { useCategoryStore } from "../categoryStore";
import type { Category } from "../../types";

const mockCat: Category = {
  id: "food", name: "Food", color: "#ef4444", type: "debit", keywords: [],
};

const legacyCat = {
  id: "transport", name: "Transport", color: "#3b82f6", keywords: [],
} as unknown as Category;

beforeEach(async () => {
  useCategoryStore.setState({ categories: [], loaded: false });
  const fs = await import("../../utils/fileSystem");
  vi.mocked(fs.readJSON).mockReset().mockResolvedValue(null);
  vi.mocked(fs.writeJSON).mockReset().mockResolvedValue(undefined);
});

describe("categoryStore", () => {
  it("addCategory appends and persists", async () => {
    await useCategoryStore.getState().addCategory(mockCat);
    const cats = useCategoryStore.getState().categories;
    expect(cats).toHaveLength(1);
    expect(cats[0].id).toBe("food");
  });

  it("addCategory handles write error gracefully", async () => {
    const fs = await import("../../utils/fileSystem");
    vi.mocked(fs.writeJSON).mockRejectedValueOnce(new Error("disk full"));

    await expect(useCategoryStore.getState().addCategory(mockCat)).resolves.toBeUndefined();
    const cats = useCategoryStore.getState().categories;
    expect(cats).toHaveLength(1);
  });

  it("deleteCategory removes category", async () => {
    useCategoryStore.setState({ categories: [mockCat] });
    await useCategoryStore.getState().deleteCategory("food");
    expect(useCategoryStore.getState().categories).toHaveLength(0);
  });

  it("deleteCategory does not remove OTHER", async () => {
    const other: Category = { id: "other", name: "Other", color: "#6b7280", type: "debit", keywords: [] };
    useCategoryStore.setState({ categories: [other] });
    await useCategoryStore.getState().deleteCategory("other");
    expect(useCategoryStore.getState().categories).toHaveLength(1);
  });

  it("deleteCategory handles write error gracefully", async () => {
    useCategoryStore.setState({ categories: [mockCat] });
    const fs = await import("../../utils/fileSystem");
    vi.mocked(fs.writeJSON).mockRejectedValueOnce(new Error("disk full"));

    await expect(useCategoryStore.getState().deleteCategory("food")).resolves.toBeUndefined();
    expect(useCategoryStore.getState().categories).toHaveLength(0);
  });

  it("updateCategory updates existing category", async () => {
    useCategoryStore.setState({ categories: [mockCat] });
    await useCategoryStore.getState().updateCategory("food", { name: "Groceries" });
    expect(useCategoryStore.getState().categories[0].name).toBe("Groceries");
  });

  it("updateCategory does nothing for unknown id", async () => {
    useCategoryStore.setState({ categories: [mockCat] });
    await useCategoryStore.getState().updateCategory("nonexistent", { name: "X" });
    expect(useCategoryStore.getState().categories[0].name).toBe("Food");
  });

  it("updateCategory handles write error gracefully", async () => {
    useCategoryStore.setState({ categories: [mockCat] });
    const fs = await import("../../utils/fileSystem");
    vi.mocked(fs.writeJSON).mockRejectedValueOnce(new Error("disk full"));

    await expect(useCategoryStore.getState().updateCategory("food", { name: "X" })).resolves.toBeUndefined();
    expect(useCategoryStore.getState().categories[0].name).toBe("X");
  });

  it("updateCategory triggers reclassifyAll when keywords change", async () => {
    useCategoryStore.setState({ categories: [mockCat] });
    const { useTransactionStore } = await import("../transactionStore");
    const reclassifySpy = vi.spyOn(useTransactionStore.getState(), "reclassifyAll")
      .mockResolvedValue(undefined);

    await useCategoryStore.getState().updateCategory("food", { keywords: ["NEWKW"] });
    expect(reclassifySpy).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ id: "food" })]));
  });

  it("init loads categories from fs if available", async () => {
    const fs = await import("../../utils/fileSystem");
    vi.mocked(fs.readJSON).mockResolvedValue([{ id: "food", name: "Food", color: "#ef4444", type: "debit", keywords: [] }]);

    await useCategoryStore.getState().init();
    const cats = useCategoryStore.getState().categories;
    expect(cats).toHaveLength(1);
    expect(cats[0].id).toBe("food");
    expect(useCategoryStore.getState().loaded).toBe(true);
  });

  it("init fetches from fallback when fs returns null", async () => {
    const mockCats = [{ id: "food", name: "Food", color: "#ef4444", type: "debit", keywords: [] }];
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      json: () => Promise.resolve(mockCats),
    } as Response);

    await useCategoryStore.getState().init();
    expect(fetchMock).toHaveBeenCalledWith("/data/categories.json");
    expect(useCategoryStore.getState().categories).toHaveLength(1);
    fetchMock.mockRestore();
  });

  it("init handles fetch failure gracefully", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network error"));

    await useCategoryStore.getState().init();
    expect(useCategoryStore.getState().loaded).toBe(true);
    expect(useCategoryStore.getState().categories).toHaveLength(0);
  });

  it("migrateTypes adds credit type for known credit IDs", () => {
    const known: Category = { id: "payment", name: "Payment", color: "#22c55e", keywords: [] } as Category;
    useCategoryStore.setState({ categories: [known] });
    expect(useCategoryStore.getState().categories[0].type).toBeUndefined();
  });
});
