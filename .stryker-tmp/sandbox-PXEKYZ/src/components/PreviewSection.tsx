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
import { useRef, useState, useEffect } from "react";
import type { Transaction } from "../types";
import type { ColDef } from "ag-grid-community";
import CategoryBadge from "./CategoryBadge";
import DataGrid from "./DataGrid";
const previewColDefs: ColDef[] = stryMutAct_9fa48("598") ? [] : (stryCov_9fa48("598"), [stryMutAct_9fa48("599") ? {} : (stryCov_9fa48("599"), {
  field: stryMutAct_9fa48("600") ? "" : (stryCov_9fa48("600"), "date"),
  headerName: stryMutAct_9fa48("601") ? "" : (stryCov_9fa48("601"), "Data"),
  width: 110
}), stryMutAct_9fa48("602") ? {} : (stryCov_9fa48("602"), {
  field: stryMutAct_9fa48("603") ? "" : (stryCov_9fa48("603"), "description"),
  headerName: stryMutAct_9fa48("604") ? "" : (stryCov_9fa48("604"), "Description"),
  flex: 2,
  minWidth: 200
}), stryMutAct_9fa48("605") ? {} : (stryCov_9fa48("605"), {
  field: stryMutAct_9fa48("606") ? "" : (stryCov_9fa48("606"), "amount"),
  headerName: stryMutAct_9fa48("607") ? "" : (stryCov_9fa48("607"), "Amount"),
  width: 100,
  type: stryMutAct_9fa48("608") ? "" : (stryCov_9fa48("608"), "rightAligned"),
  valueFormatter: stryMutAct_9fa48("609") ? () => undefined : (stryCov_9fa48("609"), p => stryMutAct_9fa48("610") ? `` : (stryCov_9fa48("610"), `£${stryMutAct_9fa48("611") ? p.value?.toFixed(2) && "0.00" : (stryCov_9fa48("611"), (stryMutAct_9fa48("612") ? p.value.toFixed(2) : (stryCov_9fa48("612"), p.value?.toFixed(2))) ?? (stryMutAct_9fa48("613") ? "" : (stryCov_9fa48("613"), "0.00")))}`))
}), stryMutAct_9fa48("614") ? {} : (stryCov_9fa48("614"), {
  field: stryMutAct_9fa48("615") ? "" : (stryCov_9fa48("615"), "categoryId"),
  headerName: stryMutAct_9fa48("616") ? "" : (stryCov_9fa48("616"), "Category"),
  width: 140,
  cellRenderer: stryMutAct_9fa48("617") ? () => undefined : (stryCov_9fa48("617"), (p: {
    value: string;
  }) => <CategoryBadge categoryId={p.value} />)
})]);
interface PreviewSectionProps {
  pending: {
    transactions: Transaction[];
    months: string[];
    total: number;
    provider: string;
    debug: string;
  } | null;
  pendingDuplicates: Transaction[];
  rowClassRules: Record<string, (params: {
    data: unknown;
  }) => boolean>;
  onConfirm: () => void;
  onCancel: () => void;
}
export default function PreviewSection({
  pending,
  pendingDuplicates,
  rowClassRules,
  onConfirm,
  onCancel
}: PreviewSectionProps) {
  if (stryMutAct_9fa48("618")) {
    {}
  } else {
    stryCov_9fa48("618");
    const gridRef = useRef<HTMLDivElement>(null);
    const [gridHeight, setGridHeight] = useState(340);
    useEffect(() => {
      if (stryMutAct_9fa48("619")) {
        {}
      } else {
        stryCov_9fa48("619");
        const calc = () => {
          if (stryMutAct_9fa48("620")) {
            {}
          } else {
            stryCov_9fa48("620");
            if (stryMutAct_9fa48("623") ? false : stryMutAct_9fa48("622") ? true : stryMutAct_9fa48("621") ? gridRef.current : (stryCov_9fa48("621", "622", "623"), !gridRef.current)) return;
            const rect = gridRef.current.getBoundingClientRect();
            setGridHeight(stryMutAct_9fa48("624") ? Math.min(100, Math.floor(window.innerHeight - rect.top - 124)) : (stryCov_9fa48("624"), Math.max(100, Math.floor(stryMutAct_9fa48("625") ? window.innerHeight - rect.top + 124 : (stryCov_9fa48("625"), (stryMutAct_9fa48("626") ? window.innerHeight + rect.top : (stryCov_9fa48("626"), window.innerHeight - rect.top)) - 124)))));
          }
        };
        calc();
        const ro = new ResizeObserver(calc);
        if (stryMutAct_9fa48("628") ? false : stryMutAct_9fa48("627") ? true : (stryCov_9fa48("627", "628"), gridRef.current)) ro.observe(gridRef.current);
        window.addEventListener(stryMutAct_9fa48("629") ? "" : (stryCov_9fa48("629"), "resize"), calc);
        return () => {
          if (stryMutAct_9fa48("630")) {
            {}
          } else {
            stryCov_9fa48("630");
            ro.disconnect();
            window.removeEventListener(stryMutAct_9fa48("631") ? "" : (stryCov_9fa48("631"), "resize"), calc);
          }
        };
      }
    }, stryMutAct_9fa48("632") ? [] : (stryCov_9fa48("632"), [pending]));
    if (stryMutAct_9fa48("635") ? false : stryMutAct_9fa48("634") ? true : stryMutAct_9fa48("633") ? pending : (stryCov_9fa48("633", "634", "635"), !pending)) return null;
    return <div className="bg-surface/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 md:p-5">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Preview
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {pending.transactions.length} transactions · {pending.months.length} months · {pending.provider}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={onCancel} className="px-4 py-2 border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg text-sm text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-surface/40 dark:hover:bg-gray-600 transition-all">
              Cancel
            </button>
            <button onClick={onConfirm} className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-semibold cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all shadow-sm hover:shadow-md active:scale-95">
              Import
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap mb-4">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">£{pending.total.toLocaleString()}</span>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          {pending.months.map(stryMutAct_9fa48("636") ? () => undefined : (stryCov_9fa48("636"), m => <span key={m} className="bg-blue-100/80 dark:bg-blue-900/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/30">{m}</span>))}
        </div>

        <div className="flex items-center gap-2 px-4 py-3 rounded-xl mb-4 text-sm font-medium bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 shadow-sm">
          ℹ Ready to import: {pending.transactions.length} transactions across {pending.months.length} months
        </div>

        {stryMutAct_9fa48("639") ? pendingDuplicates.length > 0 || <div className="flex items-center gap-2 px-4 py-3 rounded-xl mb-4 text-sm font-medium bg-amber-50/80 dark:bg-amber-900/30 backdrop-blur-sm border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 shadow-sm">
            ⚠ {pendingDuplicates.length} transaction(s) already exist in loaded data
          </div> : stryMutAct_9fa48("638") ? false : stryMutAct_9fa48("637") ? true : (stryCov_9fa48("637", "638", "639"), (stryMutAct_9fa48("642") ? pendingDuplicates.length <= 0 : stryMutAct_9fa48("641") ? pendingDuplicates.length >= 0 : stryMutAct_9fa48("640") ? true : (stryCov_9fa48("640", "641", "642"), pendingDuplicates.length > 0)) && <div className="flex items-center gap-2 px-4 py-3 rounded-xl mb-4 text-sm font-medium bg-amber-50/80 dark:bg-amber-900/30 backdrop-blur-sm border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 shadow-sm">
            ⚠ {pendingDuplicates.length} transaction(s) already exist in loaded data
          </div>)}
      </div>

      <div ref={gridRef} className="px-4 md:px-5 pb-4 md:pb-5">
        <DataGrid rows={pending.transactions} exportFilename={stryMutAct_9fa48("643") ? `` : (stryCov_9fa48("643"), `preview-${pending.provider.replace(stryMutAct_9fa48("645") ? /\S+/g : stryMutAct_9fa48("644") ? /\s/g : (stryCov_9fa48("644", "645"), /\s+/g), stryMutAct_9fa48("646") ? "" : (stryCov_9fa48("646"), "-"))}`)} colDefs={previewColDefs} height={gridHeight} rowClassRules={rowClassRules} />
      </div>
    </div>;
  }
}