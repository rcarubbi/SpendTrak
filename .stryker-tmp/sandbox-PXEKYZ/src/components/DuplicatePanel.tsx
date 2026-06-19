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
import type { DuplicateGroup } from "../stores/transactionStore";
import CategoryBadge from "./CategoryBadge";
import DataGrid from "./DataGrid";
interface DuplicatePanelProps {
  groups: DuplicateGroup[];
  onMerge: (txs: Transaction[]) => void;
  onDelete: (txId: string) => void;
  rowClassRules?: Record<string, (p: {
    data: unknown;
  }) => boolean>;
}
export default function DuplicatePanel({
  groups,
  onMerge,
  onDelete,
  rowClassRules
}: DuplicatePanelProps) {
  if (stryMutAct_9fa48("298")) {
    {}
  } else {
    stryCov_9fa48("298");
    if (stryMutAct_9fa48("301") ? groups.length !== 0 : stryMutAct_9fa48("300") ? false : stryMutAct_9fa48("299") ? true : (stryCov_9fa48("299", "300", "301"), groups.length === 0)) {
      if (stryMutAct_9fa48("302")) {
        {}
      } else {
        stryCov_9fa48("302");
        return <p className="text-center text-gray-400 dark:text-white mt-8">No duplicates found</p>;
      }
    }
    return <div className="flex flex-col gap-3">
      {groups.map(stryMutAct_9fa48("303") ? () => undefined : (stryCov_9fa48("303"), group => <div key={group.key} className="border border-amber-200 dark:border-amber-800 rounded-lg bg-amber-50 dark:bg-amber-900/20 overflow-hidden">
          <div className="px-3 py-2 bg-amber-100 dark:bg-amber-900/40 text-xs font-semibold text-amber-800 dark:text-amber-300 border-b border-amber-200 dark:border-amber-800 flex justify-between items-center">
            <span className="truncate">
              {group.txs[0].date} · {group.txs[0].description} · £{group.txs[0].amount.toFixed(2)}
            </span>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <span>{group.txs.length} entrada(s) · {group.sources.join(stryMutAct_9fa48("304") ? "" : (stryCov_9fa48("304"), ", "))}</span>
              <button onClick={stryMutAct_9fa48("305") ? () => undefined : (stryCov_9fa48("305"), () => onMerge(group.txs))} className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 font-bold text-xs cursor-pointer" title="Keep this one, remove duplicates">
                ✕ Manter esta
              </button>
            </div>
          </div>
          <div className="p-1">
            <DataGrid rows={group.txs} colDefs={stryMutAct_9fa48("306") ? [] : (stryCov_9fa48("306"), [stryMutAct_9fa48("307") ? {} : (stryCov_9fa48("307"), {
            field: stryMutAct_9fa48("308") ? "" : (stryCov_9fa48("308"), "source"),
            headerName: stryMutAct_9fa48("309") ? "" : (stryCov_9fa48("309"), "File"),
            width: 140
          }), stryMutAct_9fa48("310") ? {} : (stryCov_9fa48("310"), {
            field: stryMutAct_9fa48("311") ? "" : (stryCov_9fa48("311"), "account"),
            headerName: stryMutAct_9fa48("312") ? "" : (stryCov_9fa48("312"), "Account"),
            width: 120
          }), stryMutAct_9fa48("313") ? {} : (stryCov_9fa48("313"), {
            field: stryMutAct_9fa48("314") ? "" : (stryCov_9fa48("314"), "amount"),
            headerName: stryMutAct_9fa48("315") ? "" : (stryCov_9fa48("315"), "Amount"),
            width: 90,
            type: stryMutAct_9fa48("316") ? "" : (stryCov_9fa48("316"), "rightAligned"),
            valueFormatter: stryMutAct_9fa48("317") ? () => undefined : (stryCov_9fa48("317"), (p: {
              value?: number;
            }) => stryMutAct_9fa48("318") ? `` : (stryCov_9fa48("318"), `£${stryMutAct_9fa48("319") ? p.value?.toFixed(2) && "0.00" : (stryCov_9fa48("319"), (stryMutAct_9fa48("320") ? p.value.toFixed(2) : (stryCov_9fa48("320"), p.value?.toFixed(2))) ?? (stryMutAct_9fa48("321") ? "" : (stryCov_9fa48("321"), "0.00")))}`))
          }), stryMutAct_9fa48("322") ? {} : (stryCov_9fa48("322"), {
            field: stryMutAct_9fa48("323") ? "" : (stryCov_9fa48("323"), "categoryId"),
            headerName: stryMutAct_9fa48("324") ? "" : (stryCov_9fa48("324"), "Category"),
            width: 120,
            cellRenderer: stryMutAct_9fa48("325") ? () => undefined : (stryCov_9fa48("325"), (p: {
              value: string;
            }) => <CategoryBadge categoryId={p.value} />)
          }), stryMutAct_9fa48("326") ? {} : (stryCov_9fa48("326"), {
            headerName: stryMutAct_9fa48("327") ? "Stryker was here!" : (stryCov_9fa48("327"), ""),
            width: 80,
            sortable: stryMutAct_9fa48("328") ? true : (stryCov_9fa48("328"), false),
            filter: stryMutAct_9fa48("329") ? true : (stryCov_9fa48("329"), false),
            cellRenderer: stryMutAct_9fa48("330") ? () => undefined : (stryCov_9fa48("330"), (p: {
              data: Transaction;
            }) => <button onClick={stryMutAct_9fa48("331") ? () => undefined : (stryCov_9fa48("331"), () => onDelete(p.data.id))} className="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer">
                      Remove
                    </button>)
          })])} height={stryMutAct_9fa48("332") ? group.txs.length * 40 - 50 : (stryCov_9fa48("332"), (stryMutAct_9fa48("333") ? group.txs.length / 40 : (stryCov_9fa48("333"), group.txs.length * 40)) + 50)} exportFilename={stryMutAct_9fa48("334") ? `` : (stryCov_9fa48("334"), `duplicate-${group.txs[0].date}`)} rowClassRules={rowClassRules} />
          </div>
        </div>))}
    </div>;
  }
}