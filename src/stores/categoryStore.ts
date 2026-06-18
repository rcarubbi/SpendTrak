import { create } from "zustand";
import type { Category, CategoryType } from "../types";
import * as fs from "../utils/fileSystem";
import { CATEGORY_IDS, KNOWN_CREDIT_IDS } from "../constants";

interface CategoryState {
  categories: Category[];
  loaded: boolean;
  init: () => Promise<void>;
  addCategory: (cat: Category) => Promise<void>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  loaded: false,

  init: async () => {
    const fsData = await fs.readJSON("categories.json");
    if (fsData && Array.isArray(fsData)) {
      set({ categories: migrateTypes(fsData as Category[]), loaded: true });
      return;
    }

    try {
      const res = await fetch("/data/categories.json");
      const cats = migrateTypes((await res.json()) as Category[]);
      set({ categories: cats, loaded: true });
      try {
        await fs.writeJSON("categories.json", cats);
      } catch (err) { console.error("categoryStore: write fallback categories failed", err); }
    } catch {
      set({ loaded: true });
    }
  },

  addCategory: async (cat) => {
    const next = [...get().categories, cat];
    set({ categories: next });
    await fs.writeJSON("categories.json", next).catch(() => {});
  },

  updateCategory: async (id, updates) => {
    const idx = get().categories.findIndex((c) => c.id === id);
    if (idx < 0) return;
    const next = [...get().categories];
    next[idx] = { ...next[idx], ...updates };
    set({ categories: next });
    await fs.writeJSON("categories.json", next).catch(() => {});
  },

  deleteCategory: async (id) => {
    if (id === CATEGORY_IDS.OTHER) return;
    const next = get().categories.filter((c) => c.id !== id);
    set({ categories: next });
    await fs.writeJSON("categories.json", next).catch(() => {});
  },
}));

function migrateTypes(cats: Category[]): Category[] {
  return cats.map((cat) => {
    if (cat.type) return cat;
    return { ...cat, type: (KNOWN_CREDIT_IDS.has(cat.id) ? "credit" : "debit") as CategoryType };
  });
}
