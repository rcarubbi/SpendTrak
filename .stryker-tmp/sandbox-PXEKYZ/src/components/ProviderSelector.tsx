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
import type { UploadProvider } from "../providers/types";
interface ProviderSelectorProps {
  selectedProvider: string;
  providers: UploadProvider[];
  onChange: (value: string) => void;
}
export default function ProviderSelector({
  selectedProvider,
  providers,
  onChange
}: ProviderSelectorProps) {
  if (stryMutAct_9fa48("647")) {
    {}
  } else {
    stryCov_9fa48("647");
    return <select value={selectedProvider} onChange={stryMutAct_9fa48("648") ? () => undefined : (stryCov_9fa48("648"), e => onChange(e.target.value))} className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all">
      <option value="auto" className="bg-surface-solid dark:bg-gray-800">Auto-detect</option>
      {providers.map(stryMutAct_9fa48("649") ? () => undefined : (stryCov_9fa48("649"), p => <option key={p.id} value={p.id} className="bg-surface-solid dark:bg-gray-800">{p.name}</option>))}
    </select>;
  }
}