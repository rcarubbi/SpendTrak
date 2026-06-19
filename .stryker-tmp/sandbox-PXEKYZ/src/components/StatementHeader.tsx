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
interface StatementHeaderProps {
  dupGroupsLength: number;
  debitTotal: number;
  creditTotal: number;
}
export default function StatementHeader({
  dupGroupsLength,
  debitTotal,
  creditTotal
}: StatementHeaderProps) {
  if (stryMutAct_9fa48("663")) {
    {}
  } else {
    stryCov_9fa48("663");
    return <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Statement</h1>
        {stryMutAct_9fa48("666") ? dupGroupsLength > 0 || <span className="text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-700/50">
            {dupGroupsLength} duplicate group(s)
          </span> : stryMutAct_9fa48("665") ? false : stryMutAct_9fa48("664") ? true : (stryCov_9fa48("664", "665", "666"), (stryMutAct_9fa48("669") ? dupGroupsLength <= 0 : stryMutAct_9fa48("668") ? dupGroupsLength >= 0 : stryMutAct_9fa48("667") ? true : (stryCov_9fa48("667", "668", "669"), dupGroupsLength > 0)) && <span className="text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-700/50">
            {dupGroupsLength} duplicate group(s)
          </span>)}
      </div>
      <div className="flex items-center gap-4 px-4 py-2 rounded-xl bg-surface/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 shadow-sm">
        <div className="text-sm">
          <span className="text-gray-500 dark:text-gray-400">Expenses: </span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">£{debitTotal.toLocaleString()}</span>
        </div>
        {stryMutAct_9fa48("672") ? creditTotal > 0 || <>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Income: </span>
              <span className="font-semibold text-green-600 dark:text-green-400">£{Math.round(creditTotal).toLocaleString()}</span>
            </div>
          </> : stryMutAct_9fa48("671") ? false : stryMutAct_9fa48("670") ? true : (stryCov_9fa48("670", "671", "672"), (stryMutAct_9fa48("675") ? creditTotal <= 0 : stryMutAct_9fa48("674") ? creditTotal >= 0 : stryMutAct_9fa48("673") ? true : (stryCov_9fa48("673", "674", "675"), creditTotal > 0)) && <>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Income: </span>
              <span className="font-semibold text-green-600 dark:text-green-400">£{Math.round(creditTotal).toLocaleString()}</span>
            </div>
          </>)}
      </div>
    </div>;
  }
}