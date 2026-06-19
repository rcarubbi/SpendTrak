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
interface UploadStatusBannerProps {
  status: string;
  loading: boolean;
}
export default function UploadStatusBanner({
  status,
  loading
}: UploadStatusBannerProps) {
  if (stryMutAct_9fa48("677")) {
    {}
  } else {
    stryCov_9fa48("677");
    if (stryMutAct_9fa48("680") ? false : stryMutAct_9fa48("679") ? true : stryMutAct_9fa48("678") ? status : (stryCov_9fa48("678", "679", "680"), !status)) return null;
    const isError = stryMutAct_9fa48("681") ? status.endsWith("Error") : (stryCov_9fa48("681"), status.startsWith(stryMutAct_9fa48("682") ? "" : (stryCov_9fa48("682"), "Error")));
    const isSuccess = stryMutAct_9fa48("683") ? status.endsWith("Imported") : (stryCov_9fa48("683"), status.startsWith(stryMutAct_9fa48("684") ? "" : (stryCov_9fa48("684"), "Imported")));
    const isSaving = stryMutAct_9fa48("685") ? status.endsWith("Saving") : (stryCov_9fa48("685"), status.startsWith(stryMutAct_9fa48("686") ? "" : (stryCov_9fa48("686"), "Saving")));
    return <div className={stryMutAct_9fa48("687") ? `` : (stryCov_9fa48("687"), `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium backdrop-blur-sm border shadow-sm ${isError ? stryMutAct_9fa48("688") ? "" : (stryCov_9fa48("688"), "bg-red-50/80 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300") : isSuccess ? stryMutAct_9fa48("689") ? "" : (stryCov_9fa48("689"), "bg-green-50/80 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300") : stryMutAct_9fa48("690") ? "" : (stryCov_9fa48("690"), "bg-blue-50/80 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300")}`)}>
      {stryMutAct_9fa48("693") ? loading || <div className={`w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0 ${isSaving ? "text-green-500" : "text-blue-500"}`} /> : stryMutAct_9fa48("692") ? false : stryMutAct_9fa48("691") ? true : (stryCov_9fa48("691", "692", "693"), loading && <div className={stryMutAct_9fa48("694") ? `` : (stryCov_9fa48("694"), `w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0 ${isSaving ? stryMutAct_9fa48("695") ? "" : (stryCov_9fa48("695"), "text-green-500") : stryMutAct_9fa48("696") ? "" : (stryCov_9fa48("696"), "text-blue-500")}`)} />)}
      {stryMutAct_9fa48("699") ? !loading || (isError ? "⚠" : isSuccess ? "✓" : "ℹ") : stryMutAct_9fa48("698") ? false : stryMutAct_9fa48("697") ? true : (stryCov_9fa48("697", "698", "699"), (stryMutAct_9fa48("700") ? loading : (stryCov_9fa48("700"), !loading)) && (isError ? stryMutAct_9fa48("701") ? "" : (stryCov_9fa48("701"), "⚠") : isSuccess ? stryMutAct_9fa48("702") ? "" : (stryCov_9fa48("702"), "✓") : stryMutAct_9fa48("703") ? "" : (stryCov_9fa48("703"), "ℹ")))}
      <span className="flex-1 min-w-0">{status}</span>
    </div>;
  }
}