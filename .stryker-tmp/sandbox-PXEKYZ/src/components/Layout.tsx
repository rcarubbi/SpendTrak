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
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { Toaster } from "react-hot-toast";
import { useUIStore } from "../stores/uiStore";
import { DashboardIcon, StatementIcon, CategoriesIcon, ClassifyIcon, UploadIcon, SunIcon, MoonIcon, MonitorIcon, MenuIcon, CloseIcon, SearchIcon, LogoIcon } from "./Icons";
const links = stryMutAct_9fa48("439") ? [] : (stryCov_9fa48("439"), [stryMutAct_9fa48("440") ? {} : (stryCov_9fa48("440"), {
  path: stryMutAct_9fa48("441") ? "" : (stryCov_9fa48("441"), "/"),
  label: stryMutAct_9fa48("442") ? "" : (stryCov_9fa48("442"), "Dashboard"),
  icon: DashboardIcon
}), stryMutAct_9fa48("443") ? {} : (stryCov_9fa48("443"), {
  path: stryMutAct_9fa48("444") ? "" : (stryCov_9fa48("444"), "/statement"),
  label: stryMutAct_9fa48("445") ? "" : (stryCov_9fa48("445"), "Statement"),
  icon: StatementIcon
}), stryMutAct_9fa48("446") ? {} : (stryCov_9fa48("446"), {
  path: stryMutAct_9fa48("447") ? "" : (stryCov_9fa48("447"), "/categories"),
  label: stryMutAct_9fa48("448") ? "" : (stryCov_9fa48("448"), "Categories"),
  icon: CategoriesIcon
}), stryMutAct_9fa48("449") ? {} : (stryCov_9fa48("449"), {
  path: stryMutAct_9fa48("450") ? "" : (stryCov_9fa48("450"), "/classify"),
  label: stryMutAct_9fa48("451") ? "" : (stryCov_9fa48("451"), "Classify"),
  icon: ClassifyIcon
}), stryMutAct_9fa48("452") ? {} : (stryCov_9fa48("452"), {
  path: stryMutAct_9fa48("453") ? "" : (stryCov_9fa48("453"), "/import"),
  label: stryMutAct_9fa48("454") ? "" : (stryCov_9fa48("454"), "Import"),
  icon: UploadIcon
})]);
export default function Layout({
  children
}: {
  children: ReactNode;
}) {
  if (stryMutAct_9fa48("455")) {
    {}
  } else {
    stryCov_9fa48("455");
    const sidebarOpen = useUIStore(stryMutAct_9fa48("456") ? () => undefined : (stryCov_9fa48("456"), s => s.sidebarOpen));
    const toggleSidebar = useUIStore(stryMutAct_9fa48("457") ? () => undefined : (stryCov_9fa48("457"), s => s.toggleSidebar));
    const theme = useUIStore(stryMutAct_9fa48("458") ? () => undefined : (stryCov_9fa48("458"), s => s.theme));
    const setTheme = useUIStore(stryMutAct_9fa48("459") ? () => undefined : (stryCov_9fa48("459"), s => s.setTheme));
    const searchQuery = useUIStore(stryMutAct_9fa48("460") ? () => undefined : (stryCov_9fa48("460"), s => s.searchQuery));
    const setSearchQuery = useUIStore(stryMutAct_9fa48("461") ? () => undefined : (stryCov_9fa48("461"), s => s.setSearchQuery));
    const navigate = useNavigate();
    const location = useLocation();
    const [input, setInput] = useState(searchQuery);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (stryMutAct_9fa48("462")) {
        {}
      } else {
        stryCov_9fa48("462");
        const val = e.target.value;
        setInput(val);
        if (stryMutAct_9fa48("464") ? false : stryMutAct_9fa48("463") ? true : (stryCov_9fa48("463", "464"), debounceRef.current)) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          if (stryMutAct_9fa48("465")) {
            {}
          } else {
            stryCov_9fa48("465");
            setSearchQuery(val);
            if (stryMutAct_9fa48("468") ? location.pathname === "/statement" : stryMutAct_9fa48("467") ? false : stryMutAct_9fa48("466") ? true : (stryCov_9fa48("466", "467", "468"), location.pathname !== (stryMutAct_9fa48("469") ? "" : (stryCov_9fa48("469"), "/statement")))) {
              if (stryMutAct_9fa48("470")) {
                {}
              } else {
                stryCov_9fa48("470");
                if (stryMutAct_9fa48("473") ? typeof document.startViewTransition !== "function" : stryMutAct_9fa48("472") ? false : stryMutAct_9fa48("471") ? true : (stryCov_9fa48("471", "472", "473"), typeof document.startViewTransition === (stryMutAct_9fa48("474") ? "" : (stryCov_9fa48("474"), "function")))) {
                  if (stryMutAct_9fa48("475")) {
                    {}
                  } else {
                    stryCov_9fa48("475");
                    document.documentElement.classList.remove(stryMutAct_9fa48("476") ? "" : (stryCov_9fa48("476"), "nav-forward"), stryMutAct_9fa48("477") ? "" : (stryCov_9fa48("477"), "nav-back"));
                    document.documentElement.classList.add(stryMutAct_9fa48("478") ? "" : (stryCov_9fa48("478"), "nav-forward"));
                    const vt = document.startViewTransition(() => {
                      if (stryMutAct_9fa48("479")) {
                        {}
                      } else {
                        stryCov_9fa48("479");
                        flushSync(stryMutAct_9fa48("480") ? () => undefined : (stryCov_9fa48("480"), () => navigate(stryMutAct_9fa48("481") ? "" : (stryCov_9fa48("481"), "/statement"))));
                      }
                    });
                    vt.finished.finally(() => {
                      if (stryMutAct_9fa48("482")) {
                        {}
                      } else {
                        stryCov_9fa48("482");
                        document.documentElement.classList.remove(stryMutAct_9fa48("483") ? "" : (stryCov_9fa48("483"), "nav-forward"), stryMutAct_9fa48("484") ? "" : (stryCov_9fa48("484"), "nav-back"));
                      }
                    });
                  }
                } else {
                  if (stryMutAct_9fa48("485")) {
                    {}
                  } else {
                    stryCov_9fa48("485");
                    navigate(stryMutAct_9fa48("486") ? "" : (stryCov_9fa48("486"), "/statement"));
                  }
                }
              }
            }
          }
        }, 200);
      }
    };
    const cycleTheme = () => {
      if (stryMutAct_9fa48("487")) {
        {}
      } else {
        stryCov_9fa48("487");
        const next: Record<string, "light" | "dark" | "system"> = stryMutAct_9fa48("488") ? {} : (stryCov_9fa48("488"), {
          light: stryMutAct_9fa48("489") ? "" : (stryCov_9fa48("489"), "dark"),
          dark: stryMutAct_9fa48("490") ? "" : (stryCov_9fa48("490"), "system"),
          system: stryMutAct_9fa48("491") ? "" : (stryCov_9fa48("491"), "light")
        });
        setTheme(next[theme]);
      }
    };
    const ThemeIcon = (stryMutAct_9fa48("494") ? theme !== "dark" : stryMutAct_9fa48("493") ? false : stryMutAct_9fa48("492") ? true : (stryCov_9fa48("492", "493", "494"), theme === (stryMutAct_9fa48("495") ? "" : (stryCov_9fa48("495"), "dark")))) ? MoonIcon : (stryMutAct_9fa48("498") ? theme !== "light" : stryMutAct_9fa48("497") ? false : stryMutAct_9fa48("496") ? true : (stryCov_9fa48("496", "497", "498"), theme === (stryMutAct_9fa48("499") ? "" : (stryCov_9fa48("499"), "light")))) ? SunIcon : MonitorIcon;
    return <div className="h-screen bg-surface/40 dark:bg-gray-950 font-sans transition-colors duration-300 flex md:gap-2">
      {/* Mobile overlay */}
      {stryMutAct_9fa48("502") ? sidebarOpen || <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 md:hidden" onClick={toggleSidebar} aria-hidden="true" /> : stryMutAct_9fa48("501") ? false : stryMutAct_9fa48("500") ? true : (stryCov_9fa48("500", "501", "502"), sidebarOpen && <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 md:hidden" onClick={toggleSidebar} aria-hidden="true" />)}

      {/* Sidebar */}
      <nav aria-label="Main navigation" className={stryMutAct_9fa48("503") ? `` : (stryCov_9fa48("503"), `fixed md:static z-20 w-64 h-screen md:h-[calc(100vh-0.5rem)] bg-surface/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-white/30 dark:border-gray-700/30 md:rounded-br-2xl md:mb-2 shadow-2xl shadow-black/5 transition-transform duration-300 ease-out flex flex-col overflow-y-auto ${sidebarOpen ? stryMutAct_9fa48("504") ? "" : (stryCov_9fa48("504"), "translate-x-0") : stryMutAct_9fa48("505") ? "" : (stryCov_9fa48("505"), "-translate-x-full")} md:translate-x-0`)}>
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
              <LogoIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">SpendTrak</span>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors" aria-label="Close menu">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <div className="px-3 py-2 flex flex-col gap-0.5">
          {links.map(stryMutAct_9fa48("506") ? () => undefined : (stryCov_9fa48("506"), ({
            path,
            label,
            icon: Icon
          }) => <NavLink key={path} to={path} end={stryMutAct_9fa48("509") ? path !== "/" : stryMutAct_9fa48("508") ? false : stryMutAct_9fa48("507") ? true : (stryCov_9fa48("507", "508", "509"), path === (stryMutAct_9fa48("510") ? "" : (stryCov_9fa48("510"), "/")))} className={stryMutAct_9fa48("511") ? () => undefined : (stryCov_9fa48("511"), ({
            isActive
          }) => stryMutAct_9fa48("512") ? `` : (stryCov_9fa48("512"), `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 no-underline ${isActive ? stryMutAct_9fa48("513") ? "" : (stryCov_9fa48("513"), "bg-surface/90 dark:bg-white/10 shadow-sm border-l-[3px] border-blue-500 text-blue-700 dark:text-blue-400 -ml-[1px]") : stryMutAct_9fa48("514") ? "" : (stryCov_9fa48("514"), "text-gray-600 dark:text-gray-400 hover:bg-surface/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200 border-l-[3px] border-transparent -ml-[1px]")}`))} onClick={e => {
            if (stryMutAct_9fa48("515")) {
              {}
            } else {
              stryCov_9fa48("515");
              if (stryMutAct_9fa48("519") ? window.innerWidth >= 768 : stryMutAct_9fa48("518") ? window.innerWidth <= 768 : stryMutAct_9fa48("517") ? false : stryMutAct_9fa48("516") ? true : (stryCov_9fa48("516", "517", "518", "519"), window.innerWidth < 768)) toggleSidebar();
              if (stryMutAct_9fa48("522") ? typeof document.startViewTransition === "function" : stryMutAct_9fa48("521") ? false : stryMutAct_9fa48("520") ? true : (stryCov_9fa48("520", "521", "522"), typeof document.startViewTransition !== (stryMutAct_9fa48("523") ? "" : (stryCov_9fa48("523"), "function")))) return;
              e.preventDefault();
              document.documentElement.classList.remove(stryMutAct_9fa48("524") ? "" : (stryCov_9fa48("524"), "nav-forward"), stryMutAct_9fa48("525") ? "" : (stryCov_9fa48("525"), "nav-back"));
              document.documentElement.classList.add(stryMutAct_9fa48("526") ? "" : (stryCov_9fa48("526"), "nav-forward"));
              const vt = document.startViewTransition(() => {
                if (stryMutAct_9fa48("527")) {
                  {}
                } else {
                  stryCov_9fa48("527");
                  flushSync(stryMutAct_9fa48("528") ? () => undefined : (stryCov_9fa48("528"), () => navigate(path)));
                }
              });
              vt.finished.finally(() => {
                if (stryMutAct_9fa48("529")) {
                  {}
                } else {
                  stryCov_9fa48("529");
                  document.documentElement.classList.remove(stryMutAct_9fa48("530") ? "" : (stryCov_9fa48("530"), "nav-forward"), stryMutAct_9fa48("531") ? "" : (stryCov_9fa48("531"), "nav-back"));
                }
              });
            }
          }}>
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </NavLink>))}
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
        <header className="sticky top-0 z-10 bg-surface/60 dark:bg-gray-800/60 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/30 shadow-sm rounded-bl-2xl">
          <div className="flex items-center gap-3 px-4 py-2.5">
            <button onClick={toggleSidebar} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer md:hidden shrink-0 transition-colors" aria-label="Open menu">
              <MenuIcon className="w-5 h-5" />
            </button>

            <div className="relative flex-1 max-w-md ml-auto">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input id="header-search" name="headerSearch" value={input} onChange={handleSearchChange} placeholder="Search transactions..." aria-label="Search transactions" className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all placeholder:text-gray-400" />
            </div>

            <button onClick={cycleTheme} className="relative p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 cursor-pointer shrink-0 transition-all hover:scale-110 active:scale-95" aria-label={stryMutAct_9fa48("532") ? `` : (stryCov_9fa48("532"), `Theme: ${theme}`)}>
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
    </div>;
  }
}