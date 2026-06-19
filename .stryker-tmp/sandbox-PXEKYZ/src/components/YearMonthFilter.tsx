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
interface YearMonthFilterProps {
  years: string[];
  selectedYear: string;
  onYearChange: (year: string) => void;
  monthsInYear: string[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}
export default function YearMonthFilter({
  years,
  selectedYear,
  onYearChange,
  monthsInYear,
  selectedMonth,
  onMonthChange
}: YearMonthFilterProps) {
  if (stryMutAct_9fa48("704")) {
    {}
  } else {
    stryCov_9fa48("704");
    return <div className="flex gap-3 items-center mb-6">
      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Year:</label>
      <select value={selectedYear} onChange={stryMutAct_9fa48("705") ? () => undefined : (stryCov_9fa48("705"), e => onYearChange(e.target.value))} className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-surface-solid dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm">
        {years.map(stryMutAct_9fa48("706") ? () => undefined : (stryCov_9fa48("706"), y => <option key={y} value={y}>{y}</option>))}
      </select>
      <label className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-2">Month:</label>
      <select value={selectedMonth} onChange={stryMutAct_9fa48("707") ? () => undefined : (stryCov_9fa48("707"), e => onMonthChange(e.target.value))} className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-surface-solid dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm">
        <option value="">-- Select a Month --</option>
        {monthsInYear.map(stryMutAct_9fa48("708") ? () => undefined : (stryCov_9fa48("708"), m => <option key={m} value={m}>{m}</option>))}
      </select>
    </div>;
  }
}