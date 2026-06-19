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
import type { Transaction, Category } from "../types";
interface CategorySelectCellProps {
  data: Transaction;
  categories: Category[];
  onReclassify: (tx: Transaction, newCategoryId: string) => void;
}
export default function CategorySelectCell({
  data,
  categories,
  onReclassify
}: CategorySelectCellProps) {
  if (stryMutAct_9fa48("182")) {
    {}
  } else {
    stryCov_9fa48("182");
    return <select id={stryMutAct_9fa48("183") ? `` : (stryCov_9fa48("183"), `category-select-${data.id}`)} name={stryMutAct_9fa48("184") ? `` : (stryCov_9fa48("184"), `category-${data.id}`)} value={data.categoryId} onChange={e => {
      if (stryMutAct_9fa48("185")) {
        {}
      } else {
        stryCov_9fa48("185");
        if (stryMutAct_9fa48("188") ? e.target.value === data.categoryId : stryMutAct_9fa48("187") ? false : stryMutAct_9fa48("186") ? true : (stryCov_9fa48("186", "187", "188"), e.target.value !== data.categoryId)) {
          if (stryMutAct_9fa48("189")) {
            {}
          } else {
            stryCov_9fa48("189");
            onReclassify(data, e.target.value);
            (e.target as HTMLSelectElement).value = data.categoryId;
          }
        }
      }
    }} className="text-xs border border-gray-300 dark:border-gray-600 rounded px-1 py-0.5 w-full bg-transparent" style={stryMutAct_9fa48("190") ? {} : (stryCov_9fa48("190"), {
      color: stryMutAct_9fa48("191") ? "" : (stryCov_9fa48("191"), "inherit")
    })} onClick={stryMutAct_9fa48("192") ? () => undefined : (stryCov_9fa48("192"), e => e.stopPropagation())}>
      {categories.map(stryMutAct_9fa48("193") ? () => undefined : (stryCov_9fa48("193"), c => <option key={c.id} value={c.id} className="bg-surface-solid dark:bg-gray-800 text-gray-900 dark:text-white">
          {c.name}
        </option>))}
    </select>;
  }
}