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
import type { Transaction } from "../types";
import CategoryBadge from "./CategoryBadge";
interface ReclassifyModalProps {
  tx: Transaction;
  newCategoryId: string;
  customKeyword: string;
  onCustomKeywordChange: (val: string) => void;
  autoKeyword: string;
  saveKeyword: boolean;
  onSaveKeywordChange: (val: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}
export default function ReclassifyModal({
  tx,
  newCategoryId,
  customKeyword,
  onCustomKeywordChange,
  autoKeyword,
  saveKeyword,
  onSaveKeywordChange,
  onConfirm,
  onCancel
}: ReclassifyModalProps) {
  if (stryMutAct_9fa48("650")) {
    {}
  } else {
    stryCov_9fa48("650");
    return <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50" onClick={onCancel}>
      <div className="bg-surface/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-xl p-6 w-full max-w-md shadow-2xl" onClick={stryMutAct_9fa48("651") ? () => undefined : (stryCov_9fa48("651"), e => e.stopPropagation())}>
        <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">Reclassify transaction</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{tx.date}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 font-medium">{stryMutAct_9fa48("652") ? tx.description : (stryCov_9fa48("652"), tx.description.slice(0, 100))}</p>
        <div className="flex items-center gap-2 mb-4">
          <CategoryBadge categoryId={tx.categoryId} />
          <span className="text-gray-400 dark:text-gray-500">→</span>
          <CategoryBadge categoryId={newCategoryId} />
        </div>
        <div className="mb-4">
          <label className="relative inline-flex items-center cursor-pointer select-none mb-3">
            <input id="save-keyword-checkbox" name="saveKeyword" type="checkbox" checked={saveKeyword} onChange={stryMutAct_9fa48("653") ? () => undefined : (stryCov_9fa48("653"), e => onSaveKeywordChange(e.target.checked))} className="sr-only peer" />
            <div className="w-8 h-4.5 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:after:translate-x-3.5 after:shadow-sm" />
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-medium">Save rule for future classifications</span>
          </label>
          {stryMutAct_9fa48("656") ? saveKeyword || <>
              <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">
                Keyword (leave empty to auto-extract)
              </label>
              <input id="custom-keyword" name="keyword" type="text" value={customKeyword} onChange={e => onCustomKeywordChange(e.target.value)} placeholder={autoKeyword || "e.g. MERCADO"} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all placeholder:text-gray-400" />
            </> : stryMutAct_9fa48("655") ? false : stryMutAct_9fa48("654") ? true : (stryCov_9fa48("654", "655", "656"), saveKeyword && <>
              <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">
                Keyword (leave empty to auto-extract)
              </label>
              <input id="custom-keyword" name="keyword" type="text" value={customKeyword} onChange={stryMutAct_9fa48("657") ? () => undefined : (stryCov_9fa48("657"), e => onCustomKeywordChange(e.target.value))} placeholder={stryMutAct_9fa48("660") ? autoKeyword && "e.g. MERCADO" : stryMutAct_9fa48("659") ? false : stryMutAct_9fa48("658") ? true : (stryCov_9fa48("658", "659", "660"), autoKeyword || (stryMutAct_9fa48("661") ? "" : (stryCov_9fa48("661"), "e.g. MERCADO")))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all placeholder:text-gray-400" />
            </>)}
        </div>
        <div className="flex gap-2 justify-end">
          <button onClick={onCancel} className="px-4 py-2 border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-lg text-sm cursor-pointer hover:bg-surface/40 dark:hover:bg-gray-600 transition-all">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-semibold cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all shadow-sm hover:shadow-md active:scale-95">
            Confirm
          </button>
        </div>
      </div>
    </div>;
  }
}