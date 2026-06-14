import { create } from "zustand";
import type { MonthData, Transaction, Category } from "../types";
import * as fs from "../utils/fileSystem";

function cacheKey(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, "0")}`;
}

export interface DuplicateGroup {
  key: string;
  txs: Transaction[];
  sources: string[];
}

interface TransactionState {
  months: Record<string, MonthData>;
  loaded: boolean;
  init: () => Promise<void>;
  loadMonthData: (year: number, month: number) => MonthData | null;
  saveMonthData: (data: MonthData) => Promise<void>;
  deleteTransaction: (year: number, month: number, txId: string) => Promise<void>;
  updateTransaction: (txId: string, updates: Partial<Transaction>) => Promise<void>;
  reclassifyAll: (categories: Category[]) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  months: {},
  loaded: false,

  init: async () => {
    const months = await fs.listAllMonthData();
    const map: Record<string, MonthData> = {};
    for (const m of months) {
      map[cacheKey(m.year, m.month)] = m;
    }
    set({ months: map, loaded: true });
  },

  loadMonthData: (year, month) => {
    return get().months[cacheKey(year, month)] ?? null;
  },

  saveMonthData: async (data) => {
    const key = cacheKey(data.year, data.month);
    const state = get();
    const existing = state.months[key];
    const existingTxs = existing?.transactions ?? [];

    const byId = new Map<string, Transaction>();
    for (const tx of existingTxs) byId.set(tx.id, tx);
    for (const tx of data.transactions) byId.set(tx.id, tx);

    const monthData: MonthData = {
      year: data.year,
      month: data.month,
      transactions: Array.from(byId.values()),
      uploadedAt: data.uploadedAt || new Date().toISOString(),
    };

    await fs.writeMonthData(monthData);
    set((s) => ({ months: { ...s.months, [key]: monthData } }));
  },

  deleteTransaction: async (year, month, txId) => {
    const key = cacheKey(year, month);
    const state = get();
    const data = state.months[key];
    if (!data) return;
    const updated: MonthData = {
      ...data,
      transactions: data.transactions.filter((t) => t.id !== txId),
    };
    await fs.writeMonthData(updated);
    set((s) => ({ months: { ...s.months, [key]: updated } }));
  },

  updateTransaction: async (txId, updates) => {
    const state = get();
    const newMonths = { ...state.months };
    let changed = false;

    for (const [key, monthData] of Object.entries(newMonths)) {
      const idx = monthData.transactions.findIndex((t) => t.id === txId);
      if (idx === -1) continue;
      const newTxs = [...monthData.transactions];
      newTxs[idx] = { ...newTxs[idx], ...updates };
      newMonths[key] = { ...monthData, transactions: newTxs };
      await fs.writeMonthData(newMonths[key]);
      changed = true;
      break;
    }

    if (changed) set({ months: newMonths });
  },

  reclassifyAll: async (categories) => {
    const state = get();
    const newMonths = { ...state.months };
    let anyChanged = false;

    for (const [key, monthData] of Object.entries(newMonths)) {
      let changed = false;
      const newTxs = monthData.transactions.map((tx) => {
        if (tx.manual) return tx;
        const newId = classifyByKeywords(tx.description, categories);
        if (newId !== tx.categoryId) {
          changed = true;
          return { ...tx, categoryId: newId };
        }
        return tx;
      });

      if (changed) {
        anyChanged = true;
        const updated: MonthData = { ...monthData, transactions: newTxs };
        newMonths[key] = updated;
        await fs.writeMonthData(updated);
      }
    }

    if (anyChanged) set({ months: newMonths });
  },
}));

function classifyByKeywords(description: string, categories: Category[]): string {
  const upper = description.toUpperCase();
  for (const cat of categories) {
    if (cat.keywords.some((k) => upper.includes(k.toUpperCase()))) {
      return cat.id;
    }
  }
  return "outros";
}

export function getAllTransactions(): Transaction[] {
  const months = useTransactionStore.getState().months;
  const keys = Object.keys(months).sort();
  const txs: Transaction[] = [];
  for (const key of keys) {
    txs.push(...months[key].transactions);
  }
  return txs;
}

export function getUnclassifiedTransactions(): Transaction[] {
  return getAllTransactions().filter((tx) => tx.categoryId === "outros");
}

export function getLoadedMonths(): string[] {
  return Object.keys(useTransactionStore.getState().months).sort();
}

export function loadMonthData(year: number, month: number): MonthData | null {
  return useTransactionStore.getState().loadMonthData(year, month);
}

export function getPossibleDuplicates(): DuplicateGroup[] {
  const groups = new Map<string, Transaction[]>();
  for (const tx of getAllTransactions()) {
    const key = `${tx.date}|${tx.description.toUpperCase()}|${tx.amount}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(tx);
  }

  return Array.from(groups.entries())
    .filter(([, txs]) => {
      const sources = new Set(txs.map((t) => t.source));
      return sources.size > 1 || txs.length > 1;
    })
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, txs]) => ({
      key,
      txs,
      sources: [...new Set(txs.map((t) => t.source))],
    }));
}
