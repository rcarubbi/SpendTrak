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
interface ConfirmModalProps {
  show: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  variant?: "danger" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}
export default function ConfirmModal({
  show,
  title,
  message,
  confirmLabel = stryMutAct_9fa48("212") ? "" : (stryCov_9fa48("212"), "Confirm"),
  variant = stryMutAct_9fa48("213") ? "" : (stryCov_9fa48("213"), "danger"),
  onConfirm,
  onCancel
}: ConfirmModalProps) {
  if (stryMutAct_9fa48("214")) {
    {}
  } else {
    stryCov_9fa48("214");
    if (stryMutAct_9fa48("217") ? false : stryMutAct_9fa48("216") ? true : stryMutAct_9fa48("215") ? show : (stryCov_9fa48("215", "216", "217"), !show)) return null;
    const confirmBtn = (stryMutAct_9fa48("220") ? variant !== "danger" : stryMutAct_9fa48("219") ? false : stryMutAct_9fa48("218") ? true : (stryCov_9fa48("218", "219", "220"), variant === (stryMutAct_9fa48("221") ? "" : (stryCov_9fa48("221"), "danger")))) ? stryMutAct_9fa48("222") ? "" : (stryCov_9fa48("222"), "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700") : stryMutAct_9fa48("223") ? "" : (stryCov_9fa48("223"), "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700");
    return <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50" onClick={onCancel}>
      <div className="bg-surface/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-xl p-6 w-full max-w-md shadow-2xl" onClick={stryMutAct_9fa48("224") ? () => undefined : (stryCov_9fa48("224"), e => e.stopPropagation())}>
        <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{message}</p>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-lg text-sm cursor-pointer hover:bg-surface/40 dark:hover:bg-gray-600 transition-all">
            Cancel
          </button>
          <button onClick={onConfirm} className={stryMutAct_9fa48("225") ? `` : (stryCov_9fa48("225"), `flex-1 px-4 py-2 text-white rounded-lg text-sm font-semibold cursor-pointer transition-all shadow-sm hover:shadow-md active:scale-95 ${confirmBtn}`)}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>;
  }
}