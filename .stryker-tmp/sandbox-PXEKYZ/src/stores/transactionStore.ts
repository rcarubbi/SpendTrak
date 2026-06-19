// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { create } from "zustand";
import type { MonthData, Transaction, Category } from "../types";
import * as fs from "../utils/fileSystem";
import { classify } from "../utils/classify";
import { toastError } from "./toastStore";
function cacheKey(year: number, month: number): string {
  if (stryMutAct_9fa48("2211")) {
    {}
  } else {
    stryCov_9fa48("2211");
    return stryMutAct_9fa48("2212") ? `` : (stryCov_9fa48("2212"), `${year}-${String(month).padStart(2, stryMutAct_9fa48("2213") ? "" : (stryCov_9fa48("2213"), "0"))}`);
  }
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
  reclassifyAll: (categories: Category[], onProgress?: (done: number, total: number) => void) => Promise<void>;
}
export const useTransactionStore = create<TransactionState>(stryMutAct_9fa48("2214") ? () => undefined : (stryCov_9fa48("2214"), (set, get) => stryMutAct_9fa48("2215") ? {} : (stryCov_9fa48("2215"), {
  months: {},
  loaded: stryMutAct_9fa48("2216") ? true : (stryCov_9fa48("2216"), false),
  init: async () => {
    if (stryMutAct_9fa48("2217")) {
      {}
    } else {
      stryCov_9fa48("2217");
      const months = await fs.listAllMonthData();
      const map: Record<string, MonthData> = {};
      for (const m of months) {
        if (stryMutAct_9fa48("2218")) {
          {}
        } else {
          stryCov_9fa48("2218");
          map[cacheKey(m.year, m.month)] = m;
        }
      }
      set(stryMutAct_9fa48("2219") ? {} : (stryCov_9fa48("2219"), {
        months: map,
        loaded: stryMutAct_9fa48("2220") ? false : (stryCov_9fa48("2220"), true)
      }));
    }
  },
  loadMonthData: (year, month) => {
    if (stryMutAct_9fa48("2221")) {
      {}
    } else {
      stryCov_9fa48("2221");
      return stryMutAct_9fa48("2222") ? get().months[cacheKey(year, month)] && null : (stryCov_9fa48("2222"), get().months[cacheKey(year, month)] ?? null);
    }
  },
  saveMonthData: async data => {
    if (stryMutAct_9fa48("2223")) {
      {}
    } else {
      stryCov_9fa48("2223");
      const key = cacheKey(data.year, data.month);
      const state = get();
      const existing = state.months[key];
      const existingTxs = stryMutAct_9fa48("2224") ? existing?.transactions && [] : (stryCov_9fa48("2224"), (stryMutAct_9fa48("2225") ? existing.transactions : (stryCov_9fa48("2225"), existing?.transactions)) ?? (stryMutAct_9fa48("2226") ? ["Stryker was here"] : (stryCov_9fa48("2226"), [])));
      const byId = new Map<string, Transaction>();
      for (const tx of existingTxs) byId.set(tx.id, tx);
      for (const tx of data.transactions) byId.set(tx.id, tx);
      const monthData: MonthData = stryMutAct_9fa48("2227") ? {} : (stryCov_9fa48("2227"), {
        year: data.year,
        month: data.month,
        transactions: Array.from(byId.values()),
        uploadedAt: stryMutAct_9fa48("2230") ? data.uploadedAt && new Date().toISOString() : stryMutAct_9fa48("2229") ? false : stryMutAct_9fa48("2228") ? true : (stryCov_9fa48("2228", "2229", "2230"), data.uploadedAt || new Date().toISOString())
      });
      try {
        if (stryMutAct_9fa48("2231")) {
          {}
        } else {
          stryCov_9fa48("2231");
          await fs.writeMonthData(monthData);
        }
      } catch (err) {
        if (stryMutAct_9fa48("2232")) {
          {}
        } else {
          stryCov_9fa48("2232");
          toastError(stryMutAct_9fa48("2233") ? `` : (stryCov_9fa48("2233"), `Failed to save ${data.year}-${String(data.month).padStart(2, stryMutAct_9fa48("2234") ? "" : (stryCov_9fa48("2234"), "0"))} data`), err instanceof Error ? err.stack : String(err));
          throw err;
        }
      }
      set(stryMutAct_9fa48("2235") ? () => undefined : (stryCov_9fa48("2235"), s => stryMutAct_9fa48("2236") ? {} : (stryCov_9fa48("2236"), {
        months: stryMutAct_9fa48("2237") ? {} : (stryCov_9fa48("2237"), {
          ...s.months,
          [key]: monthData
        })
      })));
    }
  },
  deleteTransaction: async (year, month, txId) => {
    if (stryMutAct_9fa48("2238")) {
      {}
    } else {
      stryCov_9fa48("2238");
      const key = cacheKey(year, month);
      const state = get();
      const data = state.months[key];
      if (stryMutAct_9fa48("2241") ? false : stryMutAct_9fa48("2240") ? true : stryMutAct_9fa48("2239") ? data : (stryCov_9fa48("2239", "2240", "2241"), !data)) return;
      const updated: MonthData = stryMutAct_9fa48("2242") ? {} : (stryCov_9fa48("2242"), {
        ...data,
        transactions: stryMutAct_9fa48("2243") ? data.transactions : (stryCov_9fa48("2243"), data.transactions.filter(stryMutAct_9fa48("2244") ? () => undefined : (stryCov_9fa48("2244"), t => stryMutAct_9fa48("2247") ? t.id === txId : stryMutAct_9fa48("2246") ? false : stryMutAct_9fa48("2245") ? true : (stryCov_9fa48("2245", "2246", "2247"), t.id !== txId))))
      });
      try {
        if (stryMutAct_9fa48("2248")) {
          {}
        } else {
          stryCov_9fa48("2248");
          await fs.writeMonthData(updated);
        }
      } catch (err) {
        if (stryMutAct_9fa48("2249")) {
          {}
        } else {
          stryCov_9fa48("2249");
          toastError(stryMutAct_9fa48("2250") ? `` : (stryCov_9fa48("2250"), `Failed to delete transaction`), err instanceof Error ? err.stack : String(err));
          throw err;
        }
      }
      set(stryMutAct_9fa48("2251") ? () => undefined : (stryCov_9fa48("2251"), s => stryMutAct_9fa48("2252") ? {} : (stryCov_9fa48("2252"), {
        months: stryMutAct_9fa48("2253") ? {} : (stryCov_9fa48("2253"), {
          ...s.months,
          [key]: updated
        })
      })));
    }
  },
  updateTransaction: async (txId, updates) => {
    if (stryMutAct_9fa48("2254")) {
      {}
    } else {
      stryCov_9fa48("2254");
      const state = get();
      const newMonths = stryMutAct_9fa48("2255") ? {} : (stryCov_9fa48("2255"), {
        ...state.months
      });
      let changed = stryMutAct_9fa48("2256") ? true : (stryCov_9fa48("2256"), false);
      for (const [key, monthData] of Object.entries(newMonths)) {
        if (stryMutAct_9fa48("2257")) {
          {}
        } else {
          stryCov_9fa48("2257");
          const idx = monthData.transactions.findIndex(stryMutAct_9fa48("2258") ? () => undefined : (stryCov_9fa48("2258"), t => stryMutAct_9fa48("2261") ? t.id !== txId : stryMutAct_9fa48("2260") ? false : stryMutAct_9fa48("2259") ? true : (stryCov_9fa48("2259", "2260", "2261"), t.id === txId)));
          if (stryMutAct_9fa48("2264") ? idx !== -1 : stryMutAct_9fa48("2263") ? false : stryMutAct_9fa48("2262") ? true : (stryCov_9fa48("2262", "2263", "2264"), idx === (stryMutAct_9fa48("2265") ? +1 : (stryCov_9fa48("2265"), -1)))) continue;
          const newTxs = stryMutAct_9fa48("2266") ? [] : (stryCov_9fa48("2266"), [...monthData.transactions]);
          newTxs[idx] = stryMutAct_9fa48("2267") ? {} : (stryCov_9fa48("2267"), {
            ...newTxs[idx],
            ...updates
          });
          newMonths[key] = stryMutAct_9fa48("2268") ? {} : (stryCov_9fa48("2268"), {
            ...monthData,
            transactions: newTxs
          });
          try {
            if (stryMutAct_9fa48("2269")) {
              {}
            } else {
              stryCov_9fa48("2269");
              await fs.writeMonthData(newMonths[key]);
            }
          } catch (err) {
            if (stryMutAct_9fa48("2270")) {
              {}
            } else {
              stryCov_9fa48("2270");
              toastError(stryMutAct_9fa48("2271") ? `` : (stryCov_9fa48("2271"), `Failed to update transaction`), err instanceof Error ? err.stack : String(err));
              throw err;
            }
          }
          changed = stryMutAct_9fa48("2272") ? false : (stryCov_9fa48("2272"), true);
          break;
        }
      }
      if (stryMutAct_9fa48("2274") ? false : stryMutAct_9fa48("2273") ? true : (stryCov_9fa48("2273", "2274"), changed)) set(stryMutAct_9fa48("2275") ? {} : (stryCov_9fa48("2275"), {
        months: newMonths
      }));
    }
  },
  reclassifyAll: async (categories, onProgress) => {
    if (stryMutAct_9fa48("2276")) {
      {}
    } else {
      stryCov_9fa48("2276");
      const state = get();
      const entries = Object.entries(state.months);
      const total = entries.reduce(stryMutAct_9fa48("2277") ? () => undefined : (stryCov_9fa48("2277"), (s, [, m]) => stryMutAct_9fa48("2278") ? s - m.transactions.length : (stryCov_9fa48("2278"), s + m.transactions.length)), 0);
      let processed = 0;
      for (const [key, monthData] of entries) {
        if (stryMutAct_9fa48("2279")) {
          {}
        } else {
          stryCov_9fa48("2279");
          let changed = stryMutAct_9fa48("2280") ? true : (stryCov_9fa48("2280"), false);
          const newTxs = monthData.transactions.map(tx => {
            if (stryMutAct_9fa48("2281")) {
              {}
            } else {
              stryCov_9fa48("2281");
              const newId = classify(tx.description, categories);
              stryMutAct_9fa48("2282") ? processed-- : (stryCov_9fa48("2282"), processed++);
              stryMutAct_9fa48("2283") ? onProgress(processed, total) : (stryCov_9fa48("2283"), onProgress?.(processed, total));
              if (stryMutAct_9fa48("2286") ? newId === tx.categoryId : stryMutAct_9fa48("2285") ? false : stryMutAct_9fa48("2284") ? true : (stryCov_9fa48("2284", "2285", "2286"), newId !== tx.categoryId)) {
                if (stryMutAct_9fa48("2287")) {
                  {}
                } else {
                  stryCov_9fa48("2287");
                  changed = stryMutAct_9fa48("2288") ? false : (stryCov_9fa48("2288"), true);
                  return stryMutAct_9fa48("2289") ? {} : (stryCov_9fa48("2289"), {
                    ...tx,
                    categoryId: newId,
                    manual: stryMutAct_9fa48("2290") ? true : (stryCov_9fa48("2290"), false)
                  });
                }
              }
              return tx;
            }
          });
          if (stryMutAct_9fa48("2292") ? false : stryMutAct_9fa48("2291") ? true : (stryCov_9fa48("2291", "2292"), changed)) {
            if (stryMutAct_9fa48("2293")) {
              {}
            } else {
              stryCov_9fa48("2293");
              const updated: MonthData = stryMutAct_9fa48("2294") ? {} : (stryCov_9fa48("2294"), {
                ...monthData,
                transactions: newTxs
              });
              try {
                if (stryMutAct_9fa48("2295")) {
                  {}
                } else {
                  stryCov_9fa48("2295");
                  await fs.writeMonthData(updated);
                }
              } catch (err) {
                if (stryMutAct_9fa48("2296")) {
                  {}
                } else {
                  stryCov_9fa48("2296");
                  toastError(stryMutAct_9fa48("2297") ? `` : (stryCov_9fa48("2297"), `Failed to save reclassified data for ${key}`), err instanceof Error ? err.stack : String(err));
                  throw err;
                }
              }
              set(stryMutAct_9fa48("2298") ? () => undefined : (stryCov_9fa48("2298"), s => stryMutAct_9fa48("2299") ? {} : (stryCov_9fa48("2299"), {
                months: stryMutAct_9fa48("2300") ? {} : (stryCov_9fa48("2300"), {
                  ...s.months,
                  [key]: updated
                })
              })));
            }
          }
        }
      }
    }
  }
})));
export function getLoadedMonths(): string[] {
  if (stryMutAct_9fa48("2301")) {
    {}
  } else {
    stryCov_9fa48("2301");
    return stryMutAct_9fa48("2302") ? Object.keys(useTransactionStore.getState().months) : (stryCov_9fa48("2302"), Object.keys(useTransactionStore.getState().months).sort());
  }
}
export function loadMonthData(year: number, month: number): MonthData | null {
  if (stryMutAct_9fa48("2303")) {
    {}
  } else {
    stryCov_9fa48("2303");
    return useTransactionStore.getState().loadMonthData(year, month);
  }
}
export function getPossibleDuplicates(transactions: Transaction[]): DuplicateGroup[] {
  if (stryMutAct_9fa48("2304")) {
    {}
  } else {
    stryCov_9fa48("2304");
    const groups = new Map<string, Transaction[]>();
    for (const tx of transactions) {
      if (stryMutAct_9fa48("2305")) {
        {}
      } else {
        stryCov_9fa48("2305");
        const key = stryMutAct_9fa48("2306") ? `` : (stryCov_9fa48("2306"), `${tx.date}|${stryMutAct_9fa48("2307") ? tx.description.toLowerCase() : (stryCov_9fa48("2307"), tx.description.toUpperCase())}|${tx.amount}`);
        if (stryMutAct_9fa48("2310") ? false : stryMutAct_9fa48("2309") ? true : stryMutAct_9fa48("2308") ? groups.has(key) : (stryCov_9fa48("2308", "2309", "2310"), !groups.has(key))) groups.set(key, stryMutAct_9fa48("2311") ? ["Stryker was here"] : (stryCov_9fa48("2311"), []));
        groups.get(key)!.push(tx);
      }
    }
    return stryMutAct_9fa48("2313") ? Array.from(groups.entries()).sort((a, b) => a[0].localeCompare(b[0])).map(([key, txs]) => ({
      key,
      txs,
      sources: [...new Set(txs.map(t => t.source))]
    })) : stryMutAct_9fa48("2312") ? Array.from(groups.entries()).filter(([, txs]) => {
      const sources = new Set(txs.map(t => t.source));
      return sources.size > 1 || txs.length > 1;
    }).map(([key, txs]) => ({
      key,
      txs,
      sources: [...new Set(txs.map(t => t.source))]
    })) : (stryCov_9fa48("2312", "2313"), Array.from(groups.entries()).filter(([, txs]) => {
      if (stryMutAct_9fa48("2314")) {
        {}
      } else {
        stryCov_9fa48("2314");
        const sources = new Set(txs.map(stryMutAct_9fa48("2315") ? () => undefined : (stryCov_9fa48("2315"), t => t.source)));
        return stryMutAct_9fa48("2318") ? sources.size > 1 && txs.length > 1 : stryMutAct_9fa48("2317") ? false : stryMutAct_9fa48("2316") ? true : (stryCov_9fa48("2316", "2317", "2318"), (stryMutAct_9fa48("2321") ? sources.size <= 1 : stryMutAct_9fa48("2320") ? sources.size >= 1 : stryMutAct_9fa48("2319") ? false : (stryCov_9fa48("2319", "2320", "2321"), sources.size > 1)) || (stryMutAct_9fa48("2324") ? txs.length <= 1 : stryMutAct_9fa48("2323") ? txs.length >= 1 : stryMutAct_9fa48("2322") ? false : (stryCov_9fa48("2322", "2323", "2324"), txs.length > 1)));
      }
    }).sort(stryMutAct_9fa48("2325") ? () => undefined : (stryCov_9fa48("2325"), (a, b) => a[0].localeCompare(b[0]))).map(stryMutAct_9fa48("2326") ? () => undefined : (stryCov_9fa48("2326"), ([key, txs]) => stryMutAct_9fa48("2327") ? {} : (stryCov_9fa48("2327"), {
      key,
      txs,
      sources: stryMutAct_9fa48("2328") ? [] : (stryCov_9fa48("2328"), [...new Set(txs.map(stryMutAct_9fa48("2329") ? () => undefined : (stryCov_9fa48("2329"), t => t.source)))])
    }))));
  }
}