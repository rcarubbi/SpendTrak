import { create } from "zustand";

const THEME_KEY = "theme:v1";

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
  try { return localStorage.getItem(key); } catch { return null; }
}

function writeStorage(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* quota exceeded or denied */ }
}

function migrateLegacyTheme(): void {
  try {
    const legacy = localStorage.getItem("theme");
    if (legacy && !localStorage.getItem(THEME_KEY)) {
      writeStorage(THEME_KEY, legacy);
      localStorage.removeItem("theme");
    }
  } catch { /* skip migration */ }
}

function getInitialTheme(): Theme {
  migrateLegacyTheme();
  const stored = readStorage(THEME_KEY) as Theme | null;
  return stored ?? "system";
}

function applyTheme(theme: Theme): void {
  const dark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}

export const useUIStore = create<UIState>((set) => ({
  theme: getInitialTheme(),
  sidebarOpen: false,
  searchQuery: "",

  setTheme: (theme) => {
    writeStorage(THEME_KEY, theme);
    applyTheme(theme);
    set({ theme });
  },

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));

applyTheme(getInitialTheme());

// Listen for system theme changes when in "system" mode
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const controller = new AbortController();
mediaQuery.addEventListener("change", () => {
  const current = useUIStore.getState().theme;
  if (current === "system") applyTheme("system");
}, { signal: controller.signal });

// Cleanup on HMR
if (import.meta.hot) {
  import.meta.hot.dispose(() => controller.abort());
}
