import { describe, it, expect, beforeEach, vi } from "vitest";
import { useUIStore } from "../uiStore";

describe("uiStore", { tags: ["unit"] }, () => {
beforeEach(() => {
  useUIStore.setState({ theme: "system", sidebarOpen: false, searchQuery: "" });
  localStorage.clear();
  document.documentElement.classList.remove("dark");
});

describe("uiStore", () => {
  it("starts with system theme by default", () => {
    const state = useUIStore.getState();
    expect(state.theme).toBe("system");
    expect(state.sidebarOpen).toBe(false);
    expect(state.searchQuery).toBe("");
  });

  it("setTheme updates theme and persists to localStorage", () => {
    useUIStore.getState().setTheme("dark");
    expect(useUIStore.getState().theme).toBe("dark");
    expect(localStorage.getItem("theme:v1")).toBe("dark");
  });

  it("setTheme applies dark class for dark theme", () => {
    useUIStore.getState().setTheme("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("setTheme removes dark class for light theme", () => {
    document.documentElement.classList.add("dark");
    useUIStore.getState().setTheme("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("toggleSidebar flips sidebarOpen", () => {
    expect(useUIStore.getState().sidebarOpen).toBe(false);
    useUIStore.getState().toggleSidebar();
    expect(useUIStore.getState().sidebarOpen).toBe(true);
    useUIStore.getState().toggleSidebar();
    expect(useUIStore.getState().sidebarOpen).toBe(false);
  });

  it("setSearchQuery updates search query", () => {
    useUIStore.getState().setSearchQuery("food");
    expect(useUIStore.getState().searchQuery).toBe("food");
  });

  it("restores theme from localStorage", async () => {
    localStorage.setItem("theme:v1", "light");
    vi.resetModules();
    const { useUIStore: freshStore } = await import("../uiStore");
    expect(freshStore.getState().theme).toBe("light");
  });

  it("migrates legacy theme key", async () => {
    localStorage.setItem("theme", "dark");
    vi.resetModules();
    const { useUIStore: freshStore } = await import("../uiStore");
    expect(freshStore.getState().theme).toBe("dark");
    expect(localStorage.getItem("theme:v1")).toBe("dark");
    expect(localStorage.getItem("theme")).toBeNull();
  });

  it("registers mediaQuery change listener on load", async () => {
    const addEventListener = vi.fn();
    const origMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      media: "(prefers-color-scheme: dark)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener,
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(() => false),
    });

    vi.resetModules();
    await import("../uiStore");

    expect(addEventListener).toHaveBeenCalledWith("change", expect.any(Function), expect.any(Object));
    window.matchMedia = origMatchMedia;
  });
});

})