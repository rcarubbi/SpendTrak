import { create } from "zustand";
import type { Budget } from "../types";
import * as fs from "../utils/fileSystem";

interface BudgetState {
  budgets: Record<string, Budget>;
  loaded: boolean;
  init: () => Promise<void>;
  setBudget: (categoryId: string, year: number, month: number, amount: number) => Promise<void>;
  removeBudget: (categoryId: string, year: number, month: number) => Promise<void>;
}

function budgetKey(categoryId: string, year: number, month: number): string {
  return `${categoryId}-${year}-${String(month).padStart(2, "0")}`;
}

export const useBudgetStore = create<BudgetState>((set, get) => ({
  budgets: {},
  loaded: false,

  init: async () => {
    try {
      const data = await fs.readJSON("budgets.json");
      if (data && Array.isArray(data)) {
        const map: Record<string, Budget> = {};
        for (const b of data as Budget[]) {
          map[budgetKey(b.categoryId, b.year, b.month)] = b;
        }
        set({ budgets: map, loaded: true });
        return;
      }
    } catch { /* noop */ }
    set({ loaded: true });
  },

  setBudget: async (categoryId, year, month, amount) => {
    const key = budgetKey(categoryId, year, month);
    const b: Budget = { categoryId, year, month, amount };
    const next = { ...get().budgets, [key]: b };
    set({ budgets: next });
    await fs.writeJSON("budgets.json", Object.values(next));
  },

  removeBudget: async (categoryId, year, month) => {
    const key = budgetKey(categoryId, year, month);
    const next = { ...get().budgets };
    delete next[key];
    set({ budgets: next });
    await fs.writeJSON("budgets.json", Object.values(next));
  },
}));
