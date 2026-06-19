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
import type { Category } from "../types";
import { extractKeyword } from "../utils/classify";
import CategorySelectButton from "./CategorySelectButton";
interface ClassifyCardProps {
  desc: string;
  count: number;
  total: number;
  isOneOff: boolean;
  customKeyword: string;
  categories: Category[];
  onToggleOneOff: (desc: string) => void;
  onKeywordChange: (desc: string, value: string) => void;
  onClassify: (desc: string, catId: string, saveKeyword: boolean) => void;
}
export default function ClassifyCard({
  desc,
  count,
  total,
  isOneOff,
  customKeyword,
  categories,
  onToggleOneOff,
  onKeywordChange,
  onClassify
}: ClassifyCardProps) {
  if (stryMutAct_9fa48("194")) {
    {}
  } else {
    stryCov_9fa48("194");
    const autoKeyword = extractKeyword(desc);
    const showKeyword = stryMutAct_9fa48("195") ? isOneOff : (stryCov_9fa48("195"), !isOneOff);
    return <div className="bg-surface/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="p-4">
        {/* Description + stats */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <code className="text-xs text-gray-700 dark:text-gray-300 break-all leading-relaxed flex-1 min-w-0">
            {desc}
          </code>
          <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500 bg-gray-100/60 dark:bg-gray-700/60 backdrop-blur-sm px-2 py-1 rounded-lg border border-gray-200/50 dark:border-gray-600/30 whitespace-nowrap">
            {count}x · £{total.toFixed(2)}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/30 -mx-4 mb-3" />

        {/* Auto toggle + keyword row */}
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <label className="relative inline-flex items-center cursor-pointer select-none shrink-0">
            <input type="checkbox" className="sr-only peer" checked={stryMutAct_9fa48("196") ? isOneOff : (stryCov_9fa48("196"), !isOneOff)} onChange={stryMutAct_9fa48("197") ? () => undefined : (stryCov_9fa48("197"), () => onToggleOneOff(desc))} />
            <div className="w-8 h-4.5 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:after:translate-x-3.5 after:shadow-sm" />
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-medium">Auto (save rule)</span>
          </label>

          {stryMutAct_9fa48("200") ? showKeyword || <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0 font-medium">KW:</span>
              <input id={`keyword-input-${desc}`} name={`keyword-${desc}`} type="text" value={customKeyword} onChange={e => onKeywordChange(desc, e.target.value)} placeholder={autoKeyword || "e.g. MERCADO"} className="flex-1 min-w-0 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all placeholder:text-gray-400" />
            </div> : stryMutAct_9fa48("199") ? false : stryMutAct_9fa48("198") ? true : (stryCov_9fa48("198", "199", "200"), showKeyword && <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0 font-medium">KW:</span>
              <input id={stryMutAct_9fa48("201") ? `` : (stryCov_9fa48("201"), `keyword-input-${desc}`)} name={stryMutAct_9fa48("202") ? `` : (stryCov_9fa48("202"), `keyword-${desc}`)} type="text" value={customKeyword} onChange={stryMutAct_9fa48("203") ? () => undefined : (stryCov_9fa48("203"), e => onKeywordChange(desc, e.target.value))} placeholder={stryMutAct_9fa48("206") ? autoKeyword && "e.g. MERCADO" : stryMutAct_9fa48("205") ? false : stryMutAct_9fa48("204") ? true : (stryCov_9fa48("204", "205", "206"), autoKeyword || (stryMutAct_9fa48("207") ? "" : (stryCov_9fa48("207"), "e.g. MERCADO")))} className="flex-1 min-w-0 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all placeholder:text-gray-400" />
            </div>)}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/30 -mx-4 mb-3" />

        {/* Category buttons */}
        <div className="flex gap-1.5 flex-wrap">
          {categories.map(stryMutAct_9fa48("208") ? () => undefined : (stryCov_9fa48("208"), cat => <CategorySelectButton key={cat.id} name={cat.name} color={cat.color} onClick={stryMutAct_9fa48("209") ? () => undefined : (stryCov_9fa48("209"), () => onClassify(desc, cat.id, stryMutAct_9fa48("210") ? isOneOff : (stryCov_9fa48("210"), !isOneOff)))} />))}
        </div>
      </div>
    </div>;
  }
}