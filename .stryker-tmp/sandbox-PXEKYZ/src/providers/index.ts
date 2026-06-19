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
import type { UploadProvider } from "./types";
import { BarclaysCsvProvider } from "./barclays-csv";
import { BarclaysPdfProvider } from "./barclays-pdf";
const providers: UploadProvider[] = stryMutAct_9fa48("2091") ? [] : (stryCov_9fa48("2091"), [new BarclaysCsvProvider(), new BarclaysPdfProvider()]);
export function getProviders(): UploadProvider[] {
  if (stryMutAct_9fa48("2092")) {
    {}
  } else {
    stryCov_9fa48("2092");
    return providers;
  }
}
export function detectProvider(fileName: string): UploadProvider | undefined {
  if (stryMutAct_9fa48("2093")) {
    {}
  } else {
    stryCov_9fa48("2093");
    return providers.find(stryMutAct_9fa48("2094") ? () => undefined : (stryCov_9fa48("2094"), p => p.detectByExtension(fileName)));
  }
}