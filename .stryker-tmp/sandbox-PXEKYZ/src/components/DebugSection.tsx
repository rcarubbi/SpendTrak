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
interface DebugSectionProps {
  debug: string;
}
export default function DebugSection({
  debug
}: DebugSectionProps) {
  if (stryMutAct_9fa48("294")) {
    {}
  } else {
    stryCov_9fa48("294");
    if (stryMutAct_9fa48("297") ? false : stryMutAct_9fa48("296") ? true : stryMutAct_9fa48("295") ? debug : (stryCov_9fa48("295", "296", "297"), !debug)) return null;
    return <details className="bg-surface/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 rounded-xl shadow-sm overflow-hidden group">
      <summary className="px-4 md:px-5 py-3 text-xs text-gray-500 dark:text-gray-400 cursor-pointer font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors select-none list-none flex items-center gap-2">
        <span className="text-gray-400 dark:text-gray-500 transition-transform group-open:rotate-90">▶</span>
        Debug
      </summary>
      <div className="px-4 md:px-5 pb-4">
        <pre className="p-3 bg-surface/40 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/30 max-h-40 overflow-auto whitespace-pre-wrap text-xs text-gray-600 dark:text-gray-400">{debug}</pre>
      </div>
    </details>;
  }
}