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
import { useState } from "react";
import { useCategoryStore } from "../stores/categoryStore";
import { toastSuccess, toastError } from "../stores/toastStore";
interface KeywordModalProps {
  show: boolean;
  categoryId: string;
  onClose: () => void;
}
export default function KeywordModal({
  show,
  categoryId,
  onClose
}: KeywordModalProps) {
  if (stryMutAct_9fa48("400")) {
    {}
  } else {
    stryCov_9fa48("400");
    const cats = useCategoryStore(stryMutAct_9fa48("401") ? () => undefined : (stryCov_9fa48("401"), s => s.categories));
    const updateCategory = useCategoryStore(stryMutAct_9fa48("402") ? () => undefined : (stryCov_9fa48("402"), s => s.updateCategory));
    const [keyword, setKeyword] = useState(stryMutAct_9fa48("403") ? "Stryker was here!" : (stryCov_9fa48("403"), ""));
    if (stryMutAct_9fa48("406") ? false : stryMutAct_9fa48("405") ? true : stryMutAct_9fa48("404") ? show : (stryCov_9fa48("404", "405", "406"), !show)) return null;
    const handleSave = async () => {
      if (stryMutAct_9fa48("407")) {
        {}
      } else {
        stryCov_9fa48("407");
        if (stryMutAct_9fa48("410") ? false : stryMutAct_9fa48("409") ? true : stryMutAct_9fa48("408") ? keyword.trim() : (stryCov_9fa48("408", "409", "410"), !(stryMutAct_9fa48("411") ? keyword : (stryCov_9fa48("411"), keyword.trim())))) return;
        const cat = cats.find(stryMutAct_9fa48("412") ? () => undefined : (stryCov_9fa48("412"), c => stryMutAct_9fa48("415") ? c.id !== categoryId : stryMutAct_9fa48("414") ? false : stryMutAct_9fa48("413") ? true : (stryCov_9fa48("413", "414", "415"), c.id === categoryId)));
        if (stryMutAct_9fa48("418") ? false : stryMutAct_9fa48("417") ? true : stryMutAct_9fa48("416") ? cat : (stryCov_9fa48("416", "417", "418"), !cat)) {
          if (stryMutAct_9fa48("419")) {
            {}
          } else {
            stryCov_9fa48("419");
            toastError(stryMutAct_9fa48("420") ? "" : (stryCov_9fa48("420"), "Category not found"));
            return;
          }
        }
        const kw = stryMutAct_9fa48("421") ? keyword.toLowerCase() : (stryCov_9fa48("421"), keyword.toUpperCase());
        if (stryMutAct_9fa48("423") ? false : stryMutAct_9fa48("422") ? true : (stryCov_9fa48("422", "423"), cat.keywords.includes(kw))) {
          if (stryMutAct_9fa48("424")) {
            {}
          } else {
            stryCov_9fa48("424");
            toastError(stryMutAct_9fa48("425") ? `` : (stryCov_9fa48("425"), `Keyword "${kw}" already exists in this category.`));
            return;
          }
        }
        await updateCategory(categoryId, stryMutAct_9fa48("426") ? {} : (stryCov_9fa48("426"), {
          keywords: stryMutAct_9fa48("427") ? [] : (stryCov_9fa48("427"), [...cat.keywords, kw])
        }));
        toastSuccess(stryMutAct_9fa48("428") ? `` : (stryCov_9fa48("428"), `Keyword "${kw}" added`));
        setKeyword(stryMutAct_9fa48("429") ? "Stryker was here!" : (stryCov_9fa48("429"), ""));
        onClose();
      }
    };
    return <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-surface/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-xl p-6 w-full max-w-md shadow-2xl" onClick={stryMutAct_9fa48("430") ? () => undefined : (stryCov_9fa48("430"), e => e.stopPropagation())}>
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Add Keyword</h2>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">
              Keyword (will be uppercased)
            </label>
            <input id="keyword-input-modal" name="keyword" type="text" value={keyword} onChange={stryMutAct_9fa48("431") ? () => undefined : (stryCov_9fa48("431"), e => setKeyword(e.target.value))} placeholder="e.g. MERCADO, UBER, NETFLIX" className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all placeholder:text-gray-400" onKeyDown={stryMutAct_9fa48("432") ? () => undefined : (stryCov_9fa48("432"), e => stryMutAct_9fa48("435") ? e.key === "Enter" || handleSave() : stryMutAct_9fa48("434") ? false : stryMutAct_9fa48("433") ? true : (stryCov_9fa48("433", "434", "435"), (stryMutAct_9fa48("437") ? e.key !== "Enter" : stryMutAct_9fa48("436") ? true : (stryCov_9fa48("436", "437"), e.key === (stryMutAct_9fa48("438") ? "" : (stryCov_9fa48("438"), "Enter")))) && handleSave()))} autoFocus />
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-lg text-sm cursor-pointer hover:bg-surface/40 dark:hover:bg-gray-600 transition-all">
              Cancel
            </button>
            <button onClick={handleSave} className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-semibold cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all shadow-sm hover:shadow-md active:scale-95">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>;
  }
}