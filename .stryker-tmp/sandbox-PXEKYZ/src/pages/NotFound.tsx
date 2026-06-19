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
import { Link, useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
export default function NotFound() {
  if (stryMutAct_9fa48("1299")) {
    {}
  } else {
    stryCov_9fa48("1299");
    const navigate = useNavigate();
    const handleClick = (e: React.MouseEvent) => {
      if (stryMutAct_9fa48("1300")) {
        {}
      } else {
        stryCov_9fa48("1300");
        if (stryMutAct_9fa48("1303") ? typeof document.startViewTransition === "function" : stryMutAct_9fa48("1302") ? false : stryMutAct_9fa48("1301") ? true : (stryCov_9fa48("1301", "1302", "1303"), typeof document.startViewTransition !== (stryMutAct_9fa48("1304") ? "" : (stryCov_9fa48("1304"), "function")))) return;
        e.preventDefault();
        document.documentElement.classList.remove(stryMutAct_9fa48("1305") ? "" : (stryCov_9fa48("1305"), "nav-forward"), stryMutAct_9fa48("1306") ? "" : (stryCov_9fa48("1306"), "nav-back"));
        document.documentElement.classList.add(stryMutAct_9fa48("1307") ? "" : (stryCov_9fa48("1307"), "nav-forward"));
        const vt = document.startViewTransition(() => {
          if (stryMutAct_9fa48("1308")) {
            {}
          } else {
            stryCov_9fa48("1308");
            flushSync(stryMutAct_9fa48("1309") ? () => undefined : (stryCov_9fa48("1309"), () => navigate(stryMutAct_9fa48("1310") ? "" : (stryCov_9fa48("1310"), "/"))));
          }
        });
        vt.finished.finally(() => {
          if (stryMutAct_9fa48("1311")) {
            {}
          } else {
            stryCov_9fa48("1311");
            document.documentElement.classList.remove(stryMutAct_9fa48("1312") ? "" : (stryCov_9fa48("1312"), "nav-forward"), stryMutAct_9fa48("1313") ? "" : (stryCov_9fa48("1313"), "nav-back"));
          }
        });
      }
    };
    return <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-surface/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-2xl shadow-black/5">
        <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600">404</h1>
        <p className="text-gray-500 dark:text-gray-400">Page not found</p>
        <Link to="/" onClick={handleClick} className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 no-underline shadow-md hover:shadow-lg active:scale-95">
          Back to Dashboard
        </Link>
      </div>
    </div>;
  }
}