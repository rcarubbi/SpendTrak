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
import { toastError } from "../stores/toastStore";
import type { CategoryType } from "../types";
interface CategoryFormModalProps {
  show: boolean;
  onClose: () => void;
}
export default function CategoryFormModal({
  show,
  onClose
}: CategoryFormModalProps) {
  if (stryMutAct_9fa48("126")) {
    {}
  } else {
    stryCov_9fa48("126");
    const cats = useCategoryStore(stryMutAct_9fa48("127") ? () => undefined : (stryCov_9fa48("127"), s => s.categories));
    const addCategory = useCategoryStore(stryMutAct_9fa48("128") ? () => undefined : (stryCov_9fa48("128"), s => s.addCategory));
    const [form, setForm] = useState(stryMutAct_9fa48("129") ? {} : (stryCov_9fa48("129"), {
      id: stryMutAct_9fa48("130") ? "Stryker was here!" : (stryCov_9fa48("130"), ""),
      name: stryMutAct_9fa48("131") ? "Stryker was here!" : (stryCov_9fa48("131"), ""),
      color: stryMutAct_9fa48("132") ? "" : (stryCov_9fa48("132"), "#6366f1"),
      type: "debit" as CategoryType
    }));
    if (stryMutAct_9fa48("135") ? false : stryMutAct_9fa48("134") ? true : stryMutAct_9fa48("133") ? show : (stryCov_9fa48("133", "134", "135"), !show)) return null;
    const handleCreate = async () => {
      if (stryMutAct_9fa48("136")) {
        {}
      } else {
        stryCov_9fa48("136");
        const id = stryMutAct_9fa48("138") ? form.id.toLowerCase().replace(/\s+/g, "_") : stryMutAct_9fa48("137") ? form.id.trim().toUpperCase().replace(/\s+/g, "_") : (stryCov_9fa48("137", "138"), form.id.trim().toLowerCase().replace(stryMutAct_9fa48("140") ? /\S+/g : stryMutAct_9fa48("139") ? /\s/g : (stryCov_9fa48("139", "140"), /\s+/g), stryMutAct_9fa48("141") ? "" : (stryCov_9fa48("141"), "_")));
        if (stryMutAct_9fa48("144") ? false : stryMutAct_9fa48("143") ? true : stryMutAct_9fa48("142") ? id : (stryCov_9fa48("142", "143", "144"), !id)) return;
        if (stryMutAct_9fa48("146") ? false : stryMutAct_9fa48("145") ? true : (stryCov_9fa48("145", "146"), cats.find(stryMutAct_9fa48("147") ? () => undefined : (stryCov_9fa48("147"), c => stryMutAct_9fa48("150") ? c.id !== id : stryMutAct_9fa48("149") ? false : stryMutAct_9fa48("148") ? true : (stryCov_9fa48("148", "149", "150"), c.id === id))))) {
          if (stryMutAct_9fa48("151")) {
            {}
          } else {
            stryCov_9fa48("151");
            toastError(stryMutAct_9fa48("152") ? "" : (stryCov_9fa48("152"), "A category with this ID already exists."));
            return;
          }
        }
        await addCategory(stryMutAct_9fa48("153") ? {} : (stryCov_9fa48("153"), {
          id,
          name: stryMutAct_9fa48("156") ? form.name && id : stryMutAct_9fa48("155") ? false : stryMutAct_9fa48("154") ? true : (stryCov_9fa48("154", "155", "156"), form.name || id),
          color: form.color,
          type: form.type,
          keywords: stryMutAct_9fa48("157") ? ["Stryker was here"] : (stryCov_9fa48("157"), [])
        }));
        setForm(stryMutAct_9fa48("158") ? {} : (stryCov_9fa48("158"), {
          id: stryMutAct_9fa48("159") ? "Stryker was here!" : (stryCov_9fa48("159"), ""),
          name: stryMutAct_9fa48("160") ? "Stryker was here!" : (stryCov_9fa48("160"), ""),
          color: stryMutAct_9fa48("161") ? "" : (stryCov_9fa48("161"), "#6366f1"),
          type: stryMutAct_9fa48("162") ? "" : (stryCov_9fa48("162"), "debit")
        }));
        onClose();
      }
    };
    return <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-surface/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-xl p-6 w-full max-w-md shadow-2xl" onClick={stryMutAct_9fa48("163") ? () => undefined : (stryCov_9fa48("163"), e => e.stopPropagation())}>
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">New Category</h2>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">ID</label>
            <input id="new-cat-id" name="categoryId" value={form.id} onChange={stryMutAct_9fa48("164") ? () => undefined : (stryCov_9fa48("164"), e => setForm(stryMutAct_9fa48("165") ? () => undefined : (stryCov_9fa48("165"), f => stryMutAct_9fa48("166") ? {} : (stryCov_9fa48("166"), {
              ...f,
              id: e.target.value
            }))))} placeholder="e.g. pets" className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all placeholder:text-gray-400" />
          </div>
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">Name</label>
            <input id="new-cat-name" name="categoryName" value={form.name} onChange={stryMutAct_9fa48("167") ? () => undefined : (stryCov_9fa48("167"), e => setForm(stryMutAct_9fa48("168") ? () => undefined : (stryCov_9fa48("168"), f => stryMutAct_9fa48("169") ? {} : (stryCov_9fa48("169"), {
              ...f,
              name: e.target.value
            }))))} placeholder="e.g. Pets" className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all placeholder:text-gray-400" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">Color</label>
              <input id="new-cat-color" name="categoryColor" type="color" value={form.color} onChange={stryMutAct_9fa48("170") ? () => undefined : (stryCov_9fa48("170"), e => setForm(stryMutAct_9fa48("171") ? () => undefined : (stryCov_9fa48("171"), f => stryMutAct_9fa48("172") ? {} : (stryCov_9fa48("172"), {
                ...f,
                color: e.target.value
              }))))} className="w-full h-10 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer p-0.5 bg-surface/80 dark:bg-gray-700/80" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">Type</label>
              <select id="new-cat-type" name="categoryType" value={form.type} onChange={stryMutAct_9fa48("173") ? () => undefined : (stryCov_9fa48("173"), e => setForm(stryMutAct_9fa48("174") ? () => undefined : (stryCov_9fa48("174"), f => stryMutAct_9fa48("175") ? {} : (stryCov_9fa48("175"), {
                ...f,
                type: e.target.value as CategoryType
              }))))} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all">
                <option value="debit" className="bg-surface-solid dark:bg-gray-800">Debit (expense)</option>
                <option value="credit" className="bg-surface-solid dark:bg-gray-800">Credit (income)</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-lg text-sm cursor-pointer hover:bg-surface/40 dark:hover:bg-gray-600 transition-all">
              Cancel
            </button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-semibold cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all shadow-sm hover:shadow-md active:scale-95">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>;
  }
}