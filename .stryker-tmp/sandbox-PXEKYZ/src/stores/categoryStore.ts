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
import type { Category, CategoryType } from "../types";
import * as fs from "../utils/fileSystem";
import { CATEGORY_IDS, KNOWN_CREDIT_IDS } from "../constants";
import { toastSuccess, toastError } from "./toastStore";
import { useTransactionStore } from "./transactionStore";
interface CategoryState {
  categories: Category[];
  loaded: boolean;
  init: () => Promise<void>;
  addCategory: (cat: Category) => Promise<void>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}
export const useCategoryStore = create<CategoryState>(stryMutAct_9fa48("2095") ? () => undefined : (stryCov_9fa48("2095"), (set, get) => stryMutAct_9fa48("2096") ? {} : (stryCov_9fa48("2096"), {
  categories: stryMutAct_9fa48("2097") ? ["Stryker was here"] : (stryCov_9fa48("2097"), []),
  loaded: stryMutAct_9fa48("2098") ? true : (stryCov_9fa48("2098"), false),
  init: async () => {
    if (stryMutAct_9fa48("2099")) {
      {}
    } else {
      stryCov_9fa48("2099");
      const fsData = await fs.readJSON(stryMutAct_9fa48("2100") ? "" : (stryCov_9fa48("2100"), "categories.json"));
      if (stryMutAct_9fa48("2103") ? fsData || Array.isArray(fsData) : stryMutAct_9fa48("2102") ? false : stryMutAct_9fa48("2101") ? true : (stryCov_9fa48("2101", "2102", "2103"), fsData && Array.isArray(fsData))) {
        if (stryMutAct_9fa48("2104")) {
          {}
        } else {
          stryCov_9fa48("2104");
          set(stryMutAct_9fa48("2105") ? {} : (stryCov_9fa48("2105"), {
            categories: migrateTypes(fsData as Category[]),
            loaded: stryMutAct_9fa48("2106") ? false : (stryCov_9fa48("2106"), true)
          }));
          return;
        }
      }
      try {
        if (stryMutAct_9fa48("2107")) {
          {}
        } else {
          stryCov_9fa48("2107");
          const res = await fetch(stryMutAct_9fa48("2108") ? "" : (stryCov_9fa48("2108"), "/data/categories.json"));
          const cats = migrateTypes((await res.json()) as Category[]);
          set(stryMutAct_9fa48("2109") ? {} : (stryCov_9fa48("2109"), {
            categories: cats,
            loaded: stryMutAct_9fa48("2110") ? false : (stryCov_9fa48("2110"), true)
          }));
          try {
            if (stryMutAct_9fa48("2111")) {
              {}
            } else {
              stryCov_9fa48("2111");
              await fs.writeJSON(stryMutAct_9fa48("2112") ? "" : (stryCov_9fa48("2112"), "categories.json"), cats);
            }
          } catch (err) {
            if (stryMutAct_9fa48("2113")) {
              {}
            } else {
              stryCov_9fa48("2113");
              console.error(stryMutAct_9fa48("2114") ? "" : (stryCov_9fa48("2114"), "categoryStore: write fallback categories failed"), err);
            }
          }
        }
      } catch {
        if (stryMutAct_9fa48("2115")) {
          {}
        } else {
          stryCov_9fa48("2115");
          set(stryMutAct_9fa48("2116") ? {} : (stryCov_9fa48("2116"), {
            loaded: stryMutAct_9fa48("2117") ? false : (stryCov_9fa48("2117"), true)
          }));
        }
      }
    }
  },
  addCategory: async cat => {
    if (stryMutAct_9fa48("2118")) {
      {}
    } else {
      stryCov_9fa48("2118");
      const next = stryMutAct_9fa48("2119") ? [] : (stryCov_9fa48("2119"), [...get().categories, cat]);
      set(stryMutAct_9fa48("2120") ? {} : (stryCov_9fa48("2120"), {
        categories: next
      }));
      try {
        if (stryMutAct_9fa48("2121")) {
          {}
        } else {
          stryCov_9fa48("2121");
          await fs.writeJSON(stryMutAct_9fa48("2122") ? "" : (stryCov_9fa48("2122"), "categories.json"), next);
          toastSuccess(stryMutAct_9fa48("2123") ? `` : (stryCov_9fa48("2123"), `Category "${cat.name}" created`));
        }
      } catch (err) {
        if (stryMutAct_9fa48("2124")) {
          {}
        } else {
          stryCov_9fa48("2124");
          toastError(stryMutAct_9fa48("2125") ? `` : (stryCov_9fa48("2125"), `Failed to save category "${cat.name}"`), err instanceof Error ? err.stack : String(err));
        }
      }
    }
  },
  updateCategory: async (id, updates) => {
    if (stryMutAct_9fa48("2126")) {
      {}
    } else {
      stryCov_9fa48("2126");
      const idx = get().categories.findIndex(stryMutAct_9fa48("2127") ? () => undefined : (stryCov_9fa48("2127"), c => stryMutAct_9fa48("2130") ? c.id !== id : stryMutAct_9fa48("2129") ? false : stryMutAct_9fa48("2128") ? true : (stryCov_9fa48("2128", "2129", "2130"), c.id === id)));
      if (stryMutAct_9fa48("2134") ? idx >= 0 : stryMutAct_9fa48("2133") ? idx <= 0 : stryMutAct_9fa48("2132") ? false : stryMutAct_9fa48("2131") ? true : (stryCov_9fa48("2131", "2132", "2133", "2134"), idx < 0)) {
        if (stryMutAct_9fa48("2135")) {
          {}
        } else {
          stryCov_9fa48("2135");
          toastError(stryMutAct_9fa48("2136") ? `` : (stryCov_9fa48("2136"), `Category "${id}" not found`));
          return;
        }
      }
      const oldCat = get().categories[idx];
      const keywordsChanged = stryMutAct_9fa48("2139") ? updates.keywords !== undefined || updates.keywords.length !== oldCat.keywords.length || updates.keywords.some((k, i) => k !== oldCat.keywords[i]) : stryMutAct_9fa48("2138") ? false : stryMutAct_9fa48("2137") ? true : (stryCov_9fa48("2137", "2138", "2139"), (stryMutAct_9fa48("2141") ? updates.keywords === undefined : stryMutAct_9fa48("2140") ? true : (stryCov_9fa48("2140", "2141"), updates.keywords !== undefined)) && (stryMutAct_9fa48("2143") ? updates.keywords.length !== oldCat.keywords.length && updates.keywords.some((k, i) => k !== oldCat.keywords[i]) : stryMutAct_9fa48("2142") ? true : (stryCov_9fa48("2142", "2143"), (stryMutAct_9fa48("2145") ? updates.keywords.length === oldCat.keywords.length : stryMutAct_9fa48("2144") ? false : (stryCov_9fa48("2144", "2145"), updates.keywords.length !== oldCat.keywords.length)) || (stryMutAct_9fa48("2146") ? updates.keywords.every((k, i) => k !== oldCat.keywords[i]) : (stryCov_9fa48("2146"), updates.keywords.some(stryMutAct_9fa48("2147") ? () => undefined : (stryCov_9fa48("2147"), (k, i) => stryMutAct_9fa48("2150") ? k === oldCat.keywords[i] : stryMutAct_9fa48("2149") ? false : stryMutAct_9fa48("2148") ? true : (stryCov_9fa48("2148", "2149", "2150"), k !== oldCat.keywords[i]))))))));
      const next = stryMutAct_9fa48("2151") ? [] : (stryCov_9fa48("2151"), [...get().categories]);
      next[idx] = stryMutAct_9fa48("2152") ? {} : (stryCov_9fa48("2152"), {
        ...next[idx],
        ...updates
      });
      set(stryMutAct_9fa48("2153") ? {} : (stryCov_9fa48("2153"), {
        categories: next
      }));
      try {
        if (stryMutAct_9fa48("2154")) {
          {}
        } else {
          stryCov_9fa48("2154");
          await fs.writeJSON(stryMutAct_9fa48("2155") ? "" : (stryCov_9fa48("2155"), "categories.json"), next);
        }
      } catch (err) {
        if (stryMutAct_9fa48("2156")) {
          {}
        } else {
          stryCov_9fa48("2156");
          toastError(stryMutAct_9fa48("2157") ? `` : (stryCov_9fa48("2157"), `Failed to save category "${next[idx].name}"`), err instanceof Error ? err.stack : String(err));
        }
      }
      if (stryMutAct_9fa48("2159") ? false : stryMutAct_9fa48("2158") ? true : (stryCov_9fa48("2158", "2159"), keywordsChanged)) {
        if (stryMutAct_9fa48("2160")) {
          {}
        } else {
          stryCov_9fa48("2160");
          useTransactionStore.getState().reclassifyAll(next).catch(err => {
            if (stryMutAct_9fa48("2161")) {
              {}
            } else {
              stryCov_9fa48("2161");
              toastError(stryMutAct_9fa48("2162") ? "" : (stryCov_9fa48("2162"), "Auto-reclassification failed"), err instanceof Error ? err.stack : String(err));
            }
          });
        }
      }
    }
  },
  deleteCategory: async id => {
    if (stryMutAct_9fa48("2163")) {
      {}
    } else {
      stryCov_9fa48("2163");
      if (stryMutAct_9fa48("2166") ? id !== CATEGORY_IDS.OTHER : stryMutAct_9fa48("2165") ? false : stryMutAct_9fa48("2164") ? true : (stryCov_9fa48("2164", "2165", "2166"), id === CATEGORY_IDS.OTHER)) return;
      const cat = get().categories.find(stryMutAct_9fa48("2167") ? () => undefined : (stryCov_9fa48("2167"), c => stryMutAct_9fa48("2170") ? c.id !== id : stryMutAct_9fa48("2169") ? false : stryMutAct_9fa48("2168") ? true : (stryCov_9fa48("2168", "2169", "2170"), c.id === id)));
      const next = stryMutAct_9fa48("2171") ? get().categories : (stryCov_9fa48("2171"), get().categories.filter(stryMutAct_9fa48("2172") ? () => undefined : (stryCov_9fa48("2172"), c => stryMutAct_9fa48("2175") ? c.id === id : stryMutAct_9fa48("2174") ? false : stryMutAct_9fa48("2173") ? true : (stryCov_9fa48("2173", "2174", "2175"), c.id !== id))));
      set(stryMutAct_9fa48("2176") ? {} : (stryCov_9fa48("2176"), {
        categories: next
      }));
      try {
        if (stryMutAct_9fa48("2177")) {
          {}
        } else {
          stryCov_9fa48("2177");
          await fs.writeJSON(stryMutAct_9fa48("2178") ? "" : (stryCov_9fa48("2178"), "categories.json"), next);
          toastSuccess(stryMutAct_9fa48("2179") ? `` : (stryCov_9fa48("2179"), `Category "${stryMutAct_9fa48("2180") ? cat?.name && id : (stryCov_9fa48("2180"), (stryMutAct_9fa48("2181") ? cat.name : (stryCov_9fa48("2181"), cat?.name)) ?? id)}" deleted`));
        }
      } catch (err) {
        if (stryMutAct_9fa48("2182")) {
          {}
        } else {
          stryCov_9fa48("2182");
          toastError(stryMutAct_9fa48("2183") ? `` : (stryCov_9fa48("2183"), `Failed to delete category "${stryMutAct_9fa48("2184") ? cat?.name && id : (stryCov_9fa48("2184"), (stryMutAct_9fa48("2185") ? cat.name : (stryCov_9fa48("2185"), cat?.name)) ?? id)}"`), err instanceof Error ? err.stack : String(err));
        }
      }
    }
  }
})));
function migrateTypes(cats: Category[]): Category[] {
  if (stryMutAct_9fa48("2186")) {
    {}
  } else {
    stryCov_9fa48("2186");
    return cats.map(cat => {
      if (stryMutAct_9fa48("2187")) {
        {}
      } else {
        stryCov_9fa48("2187");
        if (stryMutAct_9fa48("2189") ? false : stryMutAct_9fa48("2188") ? true : (stryCov_9fa48("2188", "2189"), cat.type)) return cat;
        return stryMutAct_9fa48("2190") ? {} : (stryCov_9fa48("2190"), {
          ...cat,
          type: (KNOWN_CREDIT_IDS.has(cat.id) ? "credit" : "debit") as CategoryType
        });
      }
    });
  }
}