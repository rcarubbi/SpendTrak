import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import { useUIStore } from "../stores/uiStore";

const links: [string, string][] = [
  ["/", "Dashboard"],
  ["/statement", "Extrato"],
  ["/categories", "Categorias"],
  ["/classify", "Classificar"],
  ["/upload", "Upload CSV"],
];

export default function Layout({ children }: { children: ReactNode }) {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const theme = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);

  const cycleTheme = () => {
    const next: Record<string, "light" | "dark" | "system"> = {
      light: "dark",
      dark: "system",
      system: "light",
    };
    setTheme(next[theme]);
  };

  const themeIcon =
    theme === "dark" ? "🌙" : theme === "light" ? "☀️" : "🖥";

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-10 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed md:static z-20 w-56 bg-slate-800 text-white py-5 shrink-0 min-h-screen transition-transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 mb-6">
          <h2 className="text-lg font-bold">Gastos</h2>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-white cursor-pointer"
            aria-label="Fechar menu"
          >
            ×
          </button>
        </div>
        {links.map(([path, label]) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }: { isActive: boolean }) =>
              `block px-5 py-2.5 text-sm border-l-3 no-underline transition-colors ${
                isActive
                  ? "text-white bg-slate-700 font-semibold border-l-blue-500"
                  : "text-slate-400 border-l-transparent hover:text-slate-200"
              }`
            }
            onClick={() => {
              if (window.innerWidth < 768) toggleSidebar();
            }}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 md:hidden">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 dark:text-gray-300 cursor-pointer"
            aria-label="Abrir menu"
          >
            ☰
          </button>
          <h2 className="font-bold text-gray-800 dark:text-gray-200">Gastos</h2>
          <button
            onClick={cycleTheme}
            className="text-lg cursor-pointer"
            aria-label="Alternar tema"
          >
            {themeIcon}
          </button>
        </div>

        <div className="p-6 overflow-auto">{children}</div>
      </main>

      {/* Theme toggle (desktop) */}
      <button
        onClick={cycleTheme}
        className="fixed bottom-4 right-4 z-30 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-lg cursor-pointer hover:shadow-xl transition-shadow"
        aria-label="Alternar tema"
      >
        {themeIcon}
      </button>
    </div>
  );
}
