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
const THEME_KEY = stryMutAct_9fa48("2330") ? "" : (stryCov_9fa48("2330"), "theme:v1");
type Theme = "light" | "dark" | "system";
interface UIState {
  theme: Theme;
  sidebarOpen: boolean;
  searchQuery: string;
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSearchQuery: (query: string) => void;
}
function readStorage(key: string): string | null {
  if (stryMutAct_9fa48("2331")) {
    {}
  } else {
    stryCov_9fa48("2331");
    try {
      if (stryMutAct_9fa48("2332")) {
        {}
      } else {
        stryCov_9fa48("2332");
        return localStorage.getItem(key);
      }
    } catch {
      if (stryMutAct_9fa48("2333")) {
        {}
      } else {
        stryCov_9fa48("2333");
        return null;
      }
    }
  }
}
function writeStorage(key: string, value: string): void {
  if (stryMutAct_9fa48("2334")) {
    {}
  } else {
    stryCov_9fa48("2334");
    try {
      if (stryMutAct_9fa48("2335")) {
        {}
      } else {
        stryCov_9fa48("2335");
        localStorage.setItem(key, value);
      }
    } catch {/* quota exceeded or denied */}
  }
}
function migrateLegacyTheme(): void {
  if (stryMutAct_9fa48("2336")) {
    {}
  } else {
    stryCov_9fa48("2336");
    try {
      if (stryMutAct_9fa48("2337")) {
        {}
      } else {
        stryCov_9fa48("2337");
        const legacy = localStorage.getItem(stryMutAct_9fa48("2338") ? "" : (stryCov_9fa48("2338"), "theme"));
        if (stryMutAct_9fa48("2341") ? legacy || !localStorage.getItem(THEME_KEY) : stryMutAct_9fa48("2340") ? false : stryMutAct_9fa48("2339") ? true : (stryCov_9fa48("2339", "2340", "2341"), legacy && (stryMutAct_9fa48("2342") ? localStorage.getItem(THEME_KEY) : (stryCov_9fa48("2342"), !localStorage.getItem(THEME_KEY))))) {
          if (stryMutAct_9fa48("2343")) {
            {}
          } else {
            stryCov_9fa48("2343");
            writeStorage(THEME_KEY, legacy);
            localStorage.removeItem(stryMutAct_9fa48("2344") ? "" : (stryCov_9fa48("2344"), "theme"));
          }
        }
      }
    } catch {/* skip migration */}
  }
}
function getInitialTheme(): Theme {
  if (stryMutAct_9fa48("2345")) {
    {}
  } else {
    stryCov_9fa48("2345");
    migrateLegacyTheme();
    const stored = readStorage(THEME_KEY) as Theme | null;
    return stryMutAct_9fa48("2346") ? stored && "system" : (stryCov_9fa48("2346"), stored ?? (stryMutAct_9fa48("2347") ? "" : (stryCov_9fa48("2347"), "system")));
  }
}
function applyTheme(theme: Theme): void {
  if (stryMutAct_9fa48("2348")) {
    {}
  } else {
    stryCov_9fa48("2348");
    const dark = stryMutAct_9fa48("2351") ? theme === "dark" && theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches : stryMutAct_9fa48("2350") ? false : stryMutAct_9fa48("2349") ? true : (stryCov_9fa48("2349", "2350", "2351"), (stryMutAct_9fa48("2353") ? theme !== "dark" : stryMutAct_9fa48("2352") ? false : (stryCov_9fa48("2352", "2353"), theme === (stryMutAct_9fa48("2354") ? "" : (stryCov_9fa48("2354"), "dark")))) || (stryMutAct_9fa48("2356") ? theme === "system" || window.matchMedia("(prefers-color-scheme: dark)").matches : stryMutAct_9fa48("2355") ? false : (stryCov_9fa48("2355", "2356"), (stryMutAct_9fa48("2358") ? theme !== "system" : stryMutAct_9fa48("2357") ? true : (stryCov_9fa48("2357", "2358"), theme === (stryMutAct_9fa48("2359") ? "" : (stryCov_9fa48("2359"), "system")))) && window.matchMedia(stryMutAct_9fa48("2360") ? "" : (stryCov_9fa48("2360"), "(prefers-color-scheme: dark)")).matches)));
    document.documentElement.classList.toggle(stryMutAct_9fa48("2361") ? "" : (stryCov_9fa48("2361"), "dark"), dark);
  }
}
export const useUIStore = create<UIState>(stryMutAct_9fa48("2362") ? () => undefined : (stryCov_9fa48("2362"), set => stryMutAct_9fa48("2363") ? {} : (stryCov_9fa48("2363"), {
  theme: getInitialTheme(),
  sidebarOpen: stryMutAct_9fa48("2364") ? true : (stryCov_9fa48("2364"), false),
  searchQuery: stryMutAct_9fa48("2365") ? "Stryker was here!" : (stryCov_9fa48("2365"), ""),
  setTheme: theme => {
    if (stryMutAct_9fa48("2366")) {
      {}
    } else {
      stryCov_9fa48("2366");
      writeStorage(THEME_KEY, theme);
      applyTheme(theme);
      set(stryMutAct_9fa48("2367") ? {} : (stryCov_9fa48("2367"), {
        theme
      }));
    }
  },
  toggleSidebar: stryMutAct_9fa48("2368") ? () => undefined : (stryCov_9fa48("2368"), () => set(stryMutAct_9fa48("2369") ? () => undefined : (stryCov_9fa48("2369"), s => stryMutAct_9fa48("2370") ? {} : (stryCov_9fa48("2370"), {
    sidebarOpen: stryMutAct_9fa48("2371") ? s.sidebarOpen : (stryCov_9fa48("2371"), !s.sidebarOpen)
  })))),
  setSearchQuery: stryMutAct_9fa48("2372") ? () => undefined : (stryCov_9fa48("2372"), searchQuery => set(stryMutAct_9fa48("2373") ? {} : (stryCov_9fa48("2373"), {
    searchQuery
  })))
})));
applyTheme(getInitialTheme());

// Listen for system theme changes when in "system" mode
const mediaQuery = window.matchMedia(stryMutAct_9fa48("2374") ? "" : (stryCov_9fa48("2374"), "(prefers-color-scheme: dark)"));
const controller = new AbortController();
mediaQuery.addEventListener(stryMutAct_9fa48("2375") ? "" : (stryCov_9fa48("2375"), "change"), () => {
  if (stryMutAct_9fa48("2376")) {
    {}
  } else {
    stryCov_9fa48("2376");
    const current = useUIStore.getState().theme;
    if (stryMutAct_9fa48("2379") ? current !== "system" : stryMutAct_9fa48("2378") ? false : stryMutAct_9fa48("2377") ? true : (stryCov_9fa48("2377", "2378", "2379"), current === (stryMutAct_9fa48("2380") ? "" : (stryCov_9fa48("2380"), "system")))) applyTheme(stryMutAct_9fa48("2381") ? "" : (stryCov_9fa48("2381"), "system"));
  }
}, stryMutAct_9fa48("2382") ? {} : (stryCov_9fa48("2382"), {
  signal: controller.signal
}));

// Cleanup on HMR
if (stryMutAct_9fa48("2384") ? false : stryMutAct_9fa48("2383") ? true : (stryCov_9fa48("2383", "2384"), import.meta.hot)) {
  if (stryMutAct_9fa48("2385")) {
    {}
  } else {
    stryCov_9fa48("2385");
    import.meta.hot.dispose(stryMutAct_9fa48("2386") ? () => undefined : (stryCov_9fa48("2386"), () => controller.abort()));
  }
}