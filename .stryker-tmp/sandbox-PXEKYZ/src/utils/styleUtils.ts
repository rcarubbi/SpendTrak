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
import type { Category, Transaction } from "../types";
export function catStyleTag(cats: Category[]): string {
  if (stryMutAct_9fa48("2691")) {
    {}
  } else {
    stryCov_9fa48("2691");
    return cats.map(cat => {
      if (stryMutAct_9fa48("2692")) {
        {}
      } else {
        stryCov_9fa48("2692");
        const r = parseInt(stryMutAct_9fa48("2693") ? cat.color : (stryCov_9fa48("2693"), cat.color.slice(1, 3)), 16);
        const g = parseInt(stryMutAct_9fa48("2694") ? cat.color : (stryCov_9fa48("2694"), cat.color.slice(3, 5)), 16);
        const b = parseInt(stryMutAct_9fa48("2695") ? cat.color : (stryCov_9fa48("2695"), cat.color.slice(5, 7)), 16);
        const light = stryMutAct_9fa48("2696") ? `` : (stryCov_9fa48("2696"), `rgba(${r},${g},${b},0.12)`);
        const dark = stryMutAct_9fa48("2697") ? `` : (stryCov_9fa48("2697"), `rgba(${r},${g},${b},0.25)`);
        return stryMutAct_9fa48("2698") ? `` : (stryCov_9fa48("2698"), `.ag-row-cat-${cat.id}{background-color:${light}!important}.dark .ag-row-cat-${cat.id}{background-color:${dark}!important}`);
      }
    }).join(stryMutAct_9fa48("2699") ? "Stryker was here!" : (stryCov_9fa48("2699"), ""));
  }
}
export function rowClassRules(cats: Category[]): Record<string, (params: {
  data: unknown;
}) => boolean> {
  if (stryMutAct_9fa48("2700")) {
    {}
  } else {
    stryCov_9fa48("2700");
    const rules: Record<string, (params: {
      data: unknown;
    }) => boolean> = {};
    for (const cat of cats) {
      if (stryMutAct_9fa48("2701")) {
        {}
      } else {
        stryCov_9fa48("2701");
        rules[stryMutAct_9fa48("2702") ? `` : (stryCov_9fa48("2702"), `ag-row-cat-${cat.id}`)] = stryMutAct_9fa48("2703") ? () => undefined : (stryCov_9fa48("2703"), params => stryMutAct_9fa48("2706") ? (params.data as Transaction)?.categoryId !== cat.id : stryMutAct_9fa48("2705") ? false : stryMutAct_9fa48("2704") ? true : (stryCov_9fa48("2704", "2705", "2706"), (stryMutAct_9fa48("2707") ? (params.data as Transaction).categoryId : (stryCov_9fa48("2707"), (params.data as Transaction)?.categoryId)) === cat.id));
      }
    }
    return rules;
  }
}