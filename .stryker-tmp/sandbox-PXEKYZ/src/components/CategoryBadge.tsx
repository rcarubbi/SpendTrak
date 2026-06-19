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
import { useCategoryStore } from "../stores/categoryStore";
import { CATEGORY_IDS } from "../constants";
export default function CategoryBadge({
  categoryId
}: {
  categoryId: string;
}) {
  if (stryMutAct_9fa48("46")) {
    {}
  } else {
    stryCov_9fa48("46");
    const cats = useCategoryStore(stryMutAct_9fa48("47") ? () => undefined : (stryCov_9fa48("47"), s => s.categories));
    const cat = cats.find(stryMutAct_9fa48("48") ? () => undefined : (stryCov_9fa48("48"), c => stryMutAct_9fa48("51") ? c.id !== categoryId : stryMutAct_9fa48("50") ? false : stryMutAct_9fa48("49") ? true : (stryCov_9fa48("49", "50", "51"), c.id === categoryId)));
    const fallback = cats.find(stryMutAct_9fa48("52") ? () => undefined : (stryCov_9fa48("52"), c => stryMutAct_9fa48("55") ? c.id !== CATEGORY_IDS.OTHER : stryMutAct_9fa48("54") ? false : stryMutAct_9fa48("53") ? true : (stryCov_9fa48("53", "54", "55"), c.id === CATEGORY_IDS.OTHER)));
    const display = stryMutAct_9fa48("56") ? cat && fallback : (stryCov_9fa48("56"), cat ?? fallback);
    if (stryMutAct_9fa48("59") ? false : stryMutAct_9fa48("58") ? true : stryMutAct_9fa48("57") ? display : (stryCov_9fa48("57", "58", "59"), !display)) return null;
    return <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold text-white whitespace-nowrap shadow-sm" style={stryMutAct_9fa48("60") ? {} : (stryCov_9fa48("60"), {
      background: display.color
    })}>
      {display.name}
    </span>;
  }
}