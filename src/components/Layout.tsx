import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, type ReactNode } from "react";
import { useUIStore } from "../stores/uiStore";

const links: [string, string][] = [
  ["/", "Dashboard"],
  ["/statement", "Statement"],
  ["/categories", "Categories"],
  ["/classify", "Classify"],
  ["/upload", "Upload CSV"],
];

export default function Layout({ children }: { children: ReactNode }) {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const theme = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);
  const searchQuery = useUIStore((s) => s.searchQuery);
  const setSearchQuery = useUIStore((s) => s.setSearchQuery);
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState(searchQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchQuery(val);
      if (location.pathname !== "/statement") {
        navigate("/statement");
      }
    }, 200);
  };

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
        aria-label="Main navigation"
        className={`fixed md:static z-20 w-56 bg-slate-800 text-white py-5 shrink-0 min-h-screen transition-transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 mb-6">
          <h2 className="text-lg font-bold">Spending</h2>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-white cursor-pointer"
            aria-label="Close menu"
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
        <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 dark:text-gray-300 cursor-pointer md:hidden shrink-0"
            aria-label="Open menu"
          >
            ☰
          </button>
          <h2 className="font-bold text-gray-800 dark:text-gray-200 shrink-0 hidden md:block">Spending</h2>
          <input
            id="header-search"
            name="headerSearch"
            value={input}
            onChange={handleSearchChange}
            placeholder="Search transactions..."
            aria-label="Search transactions"
            className="flex-1 max-w-md px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={cycleTheme}
            className="text-lg cursor-pointer shrink-0 ml-auto"
            aria-label="Toggle theme"
          >
            {themeIcon}
          </button>
        </div>

        <div className="p-6 overflow-auto flex flex-col flex-1">{children}</div>
      </main>
    </div>
  );
}
