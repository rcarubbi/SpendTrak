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
interface FilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  monthFilter: string;
  onMonthFilterChange: (val: string) => void;
  loadedMonths: string[];
  catFilter: string;
  onCatFilterChange: (val: string) => void;
  cats: Array<{
    id: string;
    name: string;
  }>;
  showDuplicates: boolean;
  onToggleDuplicates: () => void;
  dupCount: number;
}
export default function FilterBar({
  search,
  onSearchChange,
  monthFilter,
  onMonthFilterChange,
  loadedMonths,
  catFilter,
  onCatFilterChange,
  cats,
  showDuplicates,
  onToggleDuplicates,
  dupCount
}: FilterBarProps) {
  if (stryMutAct_9fa48("377")) {
    {}
  } else {
    stryCov_9fa48("377");
    return <div className="flex gap-3 mb-4 items-center flex-wrap">
      <input id="search-description" name="search" placeholder="Search description..." value={search} onChange={stryMutAct_9fa48("378") ? () => undefined : (stryCov_9fa48("378"), e => onSearchChange(e.target.value))} className="flex-1 min-w-[150px] px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-surface-solid dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 md:hidden" />
      <select id="month-filter" name="monthFilter" value={monthFilter} onChange={stryMutAct_9fa48("379") ? () => undefined : (stryCov_9fa48("379"), e => onMonthFilterChange(e.target.value))} className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-surface-solid dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
        <option value="all">All months</option>
        {loadedMonths.map(stryMutAct_9fa48("380") ? () => undefined : (stryCov_9fa48("380"), m => <option key={m} value={m}>{m}</option>))}
      </select>
      <select id="category-filter" name="catFilter" value={catFilter} onChange={stryMutAct_9fa48("381") ? () => undefined : (stryCov_9fa48("381"), e => onCatFilterChange(e.target.value))} className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-surface-solid dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
        <option value="all">All categories</option>
        {cats.map(stryMutAct_9fa48("382") ? () => undefined : (stryCov_9fa48("382"), c => <option key={c.id} value={c.id}>{c.name}</option>))}
      </select>
      <button onClick={onToggleDuplicates} className={stryMutAct_9fa48("383") ? `` : (stryCov_9fa48("383"), `px-3 py-2 rounded-md text-sm font-semibold border cursor-pointer transition-colors ${showDuplicates ? stryMutAct_9fa48("384") ? "" : (stryCov_9fa48("384"), "bg-amber-100 border-amber-300 text-amber-800") : stryMutAct_9fa48("385") ? "" : (stryCov_9fa48("385"), "bg-surface-solid dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-white hover:bg-surface/40 dark:hover:bg-gray-600")}`)}>
        {showDuplicates ? stryMutAct_9fa48("386") ? "" : (stryCov_9fa48("386"), "⇤ Show all") : stryMutAct_9fa48("387") ? `` : (stryCov_9fa48("387"), `⚠ Duplicates (${dupCount})`)}
      </button>
    </div>;
  }
}