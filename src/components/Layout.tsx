import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { Toaster } from "react-hot-toast";
import { useUIStore } from "../stores/uiStore";
import {
  DashboardIcon, StatementIcon, CategoriesIcon, ClassifyIcon, UploadIcon,
  SunIcon, MoonIcon, MonitorIcon, MenuIcon, CloseIcon, SearchIcon, LogoIcon,
} from "./Icons";

const links = [
  { path: "/", label: "Dashboard", icon: DashboardIcon },
  { path: "/statement", label: "Statement", icon: StatementIcon },
  { path: "/categories", label: "Categories", icon: CategoriesIcon },
  { path: "/classify", label: "Classify", icon: ClassifyIcon },
  { path: "/import", label: "Import", icon: UploadIcon },
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
        if (typeof document.startViewTransition === "function") {
          document.documentElement.classList.remove("nav-forward", "nav-back");
          document.documentElement.classList.add("nav-forward");
          const vt = document.startViewTransition(() => {
            flushSync(() => navigate("/statement"));
          });
          vt.finished.finally(() => {
            document.documentElement.classList.remove("nav-forward", "nav-back");
          });
        } else {
          navigate("/statement");
        }
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

  const ThemeIcon = theme === "dark" ? MoonIcon : theme === "light" ? SunIcon : MonitorIcon;
  return (
    <div className="h-screen bg-surface/40 dark:bg-gray-950 font-sans transition-colors duration-300 flex md:gap-2">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <nav
        aria-label="Main navigation"
        className={`fixed md:static z-20 w-64 h-screen md:h-[calc(100vh-0.5rem)] bg-surface/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-white/30 dark:border-gray-700/30 md:rounded-br-2xl md:mb-2 shadow-2xl shadow-black/5 transition-transform duration-300 ease-out flex flex-col overflow-y-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
              <LogoIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">SpendTrak</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors"
            aria-label="Close menu"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <div className="px-3 py-2 flex flex-col gap-0.5">
          {links.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 no-underline ${
                  isActive
                    ? "bg-surface/90 dark:bg-white/10 shadow-sm border-l-[3px] border-blue-500 text-blue-700 dark:text-blue-400 -ml-[1px]"
                    : "text-gray-600 dark:text-gray-400 hover:bg-surface/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200 border-l-[3px] border-transparent -ml-[1px]"
                }`
              }
              onClick={(e) => {
                if (window.innerWidth < 768) toggleSidebar();
                if (typeof document.startViewTransition !== "function") return;
                e.preventDefault();
                document.documentElement.classList.remove("nav-forward", "nav-back");
                document.documentElement.classList.add("nav-forward");
                const vt = document.startViewTransition(() => {
                  flushSync(() => navigate(path));
                });
                vt.finished.finally(() => {
                  document.documentElement.classList.remove("nav-forward", "nav-back");
                });
              }}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </div>

        {/* Spacer + footer */}
        <div className="flex-1" />
        <div className="px-5 py-4 text-xs text-gray-400 dark:text-gray-500 border-t border-gray-200/50 dark:border-gray-700/30 shrink-0">
          SpendTrak · Track your spending
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header         className="sticky top-0 z-10 bg-surface/60 dark:bg-gray-800/60 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/30 shadow-sm rounded-bl-2xl">
          <div className="flex items-center gap-3 px-4 py-2.5">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer md:hidden shrink-0 transition-colors"
              aria-label="Open menu"
            >
              <MenuIcon className="w-5 h-5" />
            </button>

            <div className="relative flex-1 max-w-md ml-auto">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                id="header-search"
                name="headerSearch"
                value={input}
                onChange={handleSearchChange}
                placeholder="Search transactions..."
                aria-label="Search transactions"
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all placeholder:text-gray-400"
              />
            </div>

            <button
              onClick={cycleTheme}
              className="relative p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 cursor-pointer shrink-0 transition-all hover:scale-110 active:scale-95"
              aria-label={`Theme: ${theme}`}
            >
              <ThemeIcon className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col min-h-0 p-4 md:p-8 overflow-y-auto">
          {children}
        </div>
      </main>

      <Toaster position="top-right" />
    </div>
  );
}
