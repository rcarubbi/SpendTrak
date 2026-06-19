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
import type { Category, CategoryType } from "../types";
import { CATEGORY_IDS } from "../constants";
interface CategoryCardProps {
  cat: Category;
  editing: string | null;
  onStartEdit: (id: string) => void;
  onFinishEdit: (id: string, name: string) => void;
  onCancelEdit: () => void;
  onEditColor: (id: string, color: string) => void;
  onEditType: (id: string, type: CategoryType) => void;
  onDelete: (id: string) => void;
  onAddKeyword: (id: string) => void;
  onRemoveKeyword: (id: string, kw: string) => void;
}
export default function CategoryCard({
  cat,
  editing,
  onStartEdit,
  onFinishEdit,
  onCancelEdit,
  onEditColor,
  onEditType,
  onDelete,
  onAddKeyword,
  onRemoveKeyword
}: CategoryCardProps) {
  if (stryMutAct_9fa48("61")) {
    {}
  } else {
    stryCov_9fa48("61");
    return <div className="bg-surface/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="border-l-[3px] p-4" style={stryMutAct_9fa48("62") ? {} : (stryCov_9fa48("62"), {
        borderLeftColor: cat.color
      })}>
        {/* Header row */}
        <div className="flex items-center gap-2.5">
          <input id={stryMutAct_9fa48("63") ? `` : (stryCov_9fa48("63"), `color-input-${cat.id}`)} name={stryMutAct_9fa48("64") ? `` : (stryCov_9fa48("64"), `color-${cat.id}`)} type="color" value={cat.color} onChange={stryMutAct_9fa48("65") ? () => undefined : (stryCov_9fa48("65"), e => onEditColor(cat.id, e.target.value))} className="w-7 h-7 rounded-lg cursor-pointer border-0 p-0 shrink-0" />
          {(stryMutAct_9fa48("68") ? editing !== cat.id : stryMutAct_9fa48("67") ? false : stryMutAct_9fa48("66") ? true : (stryCov_9fa48("66", "67", "68"), editing === cat.id)) ? <input id={stryMutAct_9fa48("69") ? `` : (stryCov_9fa48("69"), `name-input-${cat.id}`)} name={stryMutAct_9fa48("70") ? `` : (stryCov_9fa48("70"), `name-${cat.id}`)} defaultValue={cat.name} onBlur={stryMutAct_9fa48("71") ? () => undefined : (stryCov_9fa48("71"), e => onFinishEdit(cat.id, e.target.value))} onKeyDown={stryMutAct_9fa48("72") ? () => undefined : (stryCov_9fa48("72"), e => stryMutAct_9fa48("75") ? e.key === "Enter" || onCancelEdit() : stryMutAct_9fa48("74") ? false : stryMutAct_9fa48("73") ? true : (stryCov_9fa48("73", "74", "75"), (stryMutAct_9fa48("77") ? e.key !== "Enter" : stryMutAct_9fa48("76") ? true : (stryCov_9fa48("76", "77"), e.key === (stryMutAct_9fa48("78") ? "" : (stryCov_9fa48("78"), "Enter")))) && onCancelEdit()))} autoFocus className="text-sm font-semibold border border-gray-300 dark:border-gray-600 bg-surface-solid dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-2 py-1 flex-1 min-w-0" /> : <span className="font-semibold text-sm cursor-pointer dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex-1 min-w-0 truncate" onClick={stryMutAct_9fa48("79") ? () => undefined : (stryCov_9fa48("79"), () => onStartEdit(cat.id))} title="Click to rename">
              {cat.name}
            </span>}
          <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0 hidden sm:inline">
            {cat.keywords.length} kw
          </span>
          {(stryMutAct_9fa48("82") ? cat.id === CATEGORY_IDS.OTHER : stryMutAct_9fa48("81") ? false : stryMutAct_9fa48("80") ? true : (stryCov_9fa48("80", "81", "82"), cat.id !== CATEGORY_IDS.OTHER)) ? <select id={stryMutAct_9fa48("83") ? `` : (stryCov_9fa48("83"), `type-select-${cat.id}`)} name={stryMutAct_9fa48("84") ? `` : (stryCov_9fa48("84"), `type-${cat.id}`)} value={cat.type} onChange={stryMutAct_9fa48("85") ? () => undefined : (stryCov_9fa48("85"), e => onEditType(cat.id, e.target.value as CategoryType))} className={stryMutAct_9fa48("86") ? `` : (stryCov_9fa48("86"), `text-xs rounded-full px-2.5 py-0.5 font-semibold border border-transparent cursor-pointer transition-colors shrink-0 ${(stryMutAct_9fa48("89") ? cat.type !== "credit" : stryMutAct_9fa48("88") ? false : stryMutAct_9fa48("87") ? true : (stryCov_9fa48("87", "88", "89"), cat.type === (stryMutAct_9fa48("90") ? "" : (stryCov_9fa48("90"), "credit")))) ? stryMutAct_9fa48("91") ? "" : (stryCov_9fa48("91"), "text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/50") : stryMutAct_9fa48("92") ? "" : (stryCov_9fa48("92"), "text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/50")}`)}>
              <option value="debit" className="bg-surface-solid dark:bg-gray-800 text-gray-900 dark:text-gray-100">DEBIT</option>
              <option value="credit" className="bg-surface-solid dark:bg-gray-800 text-gray-900 dark:text-gray-100">CREDIT</option>
            </select> : <span className={stryMutAct_9fa48("93") ? `` : (stryCov_9fa48("93"), `text-xs rounded-full px-2.5 py-0.5 font-semibold shrink-0 ${(stryMutAct_9fa48("96") ? cat.type !== "credit" : stryMutAct_9fa48("95") ? false : stryMutAct_9fa48("94") ? true : (stryCov_9fa48("94", "95", "96"), cat.type === (stryMutAct_9fa48("97") ? "" : (stryCov_9fa48("97"), "credit")))) ? stryMutAct_9fa48("98") ? "" : (stryCov_9fa48("98"), "text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/50") : stryMutAct_9fa48("99") ? "" : (stryCov_9fa48("99"), "text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/50")}`)}>
              {(stryMutAct_9fa48("102") ? cat.type !== "credit" : stryMutAct_9fa48("101") ? false : stryMutAct_9fa48("100") ? true : (stryCov_9fa48("100", "101", "102"), cat.type === (stryMutAct_9fa48("103") ? "" : (stryCov_9fa48("103"), "credit")))) ? stryMutAct_9fa48("104") ? "" : (stryCov_9fa48("104"), "CREDIT") : stryMutAct_9fa48("105") ? "" : (stryCov_9fa48("105"), "DEBIT")}
            </span>}
          {stryMutAct_9fa48("108") ? cat.id !== CATEGORY_IDS.OTHER || <button onClick={() => onDelete(cat.id)} className="text-xs text-red-400 hover:text-red-600 dark:hover:text-red-300 cursor-pointer transition-colors shrink-0 font-medium">
              Delete
            </button> : stryMutAct_9fa48("107") ? false : stryMutAct_9fa48("106") ? true : (stryCov_9fa48("106", "107", "108"), (stryMutAct_9fa48("110") ? cat.id === CATEGORY_IDS.OTHER : stryMutAct_9fa48("109") ? true : (stryCov_9fa48("109", "110"), cat.id !== CATEGORY_IDS.OTHER)) && <button onClick={stryMutAct_9fa48("111") ? () => undefined : (stryCov_9fa48("111"), () => onDelete(cat.id))} className="text-xs text-red-400 hover:text-red-600 dark:hover:text-red-300 cursor-pointer transition-colors shrink-0 font-medium">
              Delete
            </button>)}
        </div>

        {/* Keywords */}
        <div className="mt-3 flex flex-wrap gap-1.5 items-center">
          {cat.keywords.map(stryMutAct_9fa48("112") ? () => undefined : (stryCov_9fa48("112"), kw => <span key={kw} className="inline-flex items-center gap-1.5 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs dark:text-gray-200 border border-gray-200/50 dark:border-gray-600/30 hover:scale-105 transition-transform">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={stryMutAct_9fa48("113") ? {} : (stryCov_9fa48("113"), {
              background: cat.color
            })} />
              {kw}
              {stryMutAct_9fa48("116") ? cat.id !== CATEGORY_IDS.OTHER || <button onClick={() => onRemoveKeyword(cat.id, kw)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer text-sm leading-none p-0 border-0 bg-transparent">
                  ×
                </button> : stryMutAct_9fa48("115") ? false : stryMutAct_9fa48("114") ? true : (stryCov_9fa48("114", "115", "116"), (stryMutAct_9fa48("118") ? cat.id === CATEGORY_IDS.OTHER : stryMutAct_9fa48("117") ? true : (stryCov_9fa48("117", "118"), cat.id !== CATEGORY_IDS.OTHER)) && <button onClick={stryMutAct_9fa48("119") ? () => undefined : (stryCov_9fa48("119"), () => onRemoveKeyword(cat.id, kw))} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer text-sm leading-none p-0 border-0 bg-transparent">
                  ×
                </button>)}
            </span>))}
          {stryMutAct_9fa48("122") ? cat.id !== CATEGORY_IDS.OTHER || <button onClick={() => onAddKeyword(cat.id)} className="inline-flex items-center gap-1 border border-dashed border-gray-300 dark:border-gray-600 px-2.5 py-1 rounded-full text-xs cursor-pointer hover:bg-surface/40 dark:hover:bg-gray-700 transition-colors dark:text-gray-300">
              + Add
            </button> : stryMutAct_9fa48("121") ? false : stryMutAct_9fa48("120") ? true : (stryCov_9fa48("120", "121", "122"), (stryMutAct_9fa48("124") ? cat.id === CATEGORY_IDS.OTHER : stryMutAct_9fa48("123") ? true : (stryCov_9fa48("123", "124"), cat.id !== CATEGORY_IDS.OTHER)) && <button onClick={stryMutAct_9fa48("125") ? () => undefined : (stryCov_9fa48("125"), () => onAddKeyword(cat.id))} className="inline-flex items-center gap-1 border border-dashed border-gray-300 dark:border-gray-600 px-2.5 py-1 rounded-full text-xs cursor-pointer hover:bg-surface/40 dark:hover:bg-gray-700 transition-colors dark:text-gray-300">
              + Add
            </button>)}
        </div>
      </div>
    </div>;
  }
}