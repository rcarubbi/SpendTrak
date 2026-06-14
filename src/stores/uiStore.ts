import { create } from "zustand";

type Theme = "light" | "dark" | "system";

interface UIState {
  theme: Theme;
  sidebarOpen: boolean;
  searchQuery: string;
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSearchQuery: (query: string) => void;
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem("theme") as Theme | null;
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
    localStorage.setItem("theme", theme);
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
