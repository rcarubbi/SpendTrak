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
import { LogoIcon } from "./Icons";
interface SetupScreenProps {
  onPickDir: () => void;
}
export default function SetupScreen({
  onPickDir
}: SetupScreenProps) {
  if (stryMutAct_9fa48("662")) {
    {}
  } else {
    stryCov_9fa48("662");
    return <div className="flex flex-col items-center justify-center min-h-screen bg-surface/40 dark:bg-gray-950 transition-colors duration-300">
      <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-surface/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-2xl shadow-black/5 max-w-md w-full mx-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
          <LogoIcon className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">SpendTrak</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center max-w-sm">
          No data folder configured or the previous folder no longer exists.
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-xs text-center -mt-3">
          Select the <code className="text-blue-500 dark:text-blue-400">data/</code> directory of your project.
        </p>
        <button onClick={onPickDir} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-95">
          Select data folder
        </button>
      </div>
    </div>;
  }
}