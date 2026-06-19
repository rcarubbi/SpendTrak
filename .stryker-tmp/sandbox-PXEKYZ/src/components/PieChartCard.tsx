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
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
function renderLabel({
  name,
  percent
}: {
  name?: string;
  percent?: number;
}) {
  if (stryMutAct_9fa48("567")) {
    {}
  } else {
    stryCov_9fa48("567");
    return stryMutAct_9fa48("568") ? `` : (stryCov_9fa48("568"), `${stryMutAct_9fa48("569") ? name && "" : (stryCov_9fa48("569"), name ?? (stryMutAct_9fa48("570") ? "Stryker was here!" : (stryCov_9fa48("570"), "")))} ${(stryMutAct_9fa48("571") ? (percent ?? 0) / 100 : (stryCov_9fa48("571"), (stryMutAct_9fa48("572") ? percent && 0 : (stryCov_9fa48("572"), percent ?? 0)) * 100)).toFixed(0)}%`);
  }
}
interface PieChartCardProps {
  title: string;
  data: {
    name: string;
    value: number;
  }[];
  total: number;
  income: number;
  catColorMap: Map<string, string>;
  isDark: boolean;
  emptyText: string;
}
export default function PieChartCard({
  title,
  data,
  total,
  income,
  catColorMap,
  isDark,
  emptyText
}: PieChartCardProps) {
  if (stryMutAct_9fa48("573")) {
    {}
  } else {
    stryCov_9fa48("573");
    return <div className="bg-surface-solid dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-xs">
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg font-semibold dark:text-gray-100">{title}</p>
        <div className="text-right text-sm">
          {stryMutAct_9fa48("576") ? income > 0 || <p className="text-emerald-600 font-semibold">Income: £{Math.round(income).toLocaleString()}</p> : stryMutAct_9fa48("575") ? false : stryMutAct_9fa48("574") ? true : (stryCov_9fa48("574", "575", "576"), (stryMutAct_9fa48("579") ? income <= 0 : stryMutAct_9fa48("578") ? income >= 0 : stryMutAct_9fa48("577") ? true : (stryCov_9fa48("577", "578", "579"), income > 0)) && <p className="text-emerald-600 font-semibold">Income: £{Math.round(income).toLocaleString()}</p>)}
          <p className="text-gray-500">Expenses: £{total.toLocaleString()}</p>
        </div>
      </div>
      {(stryMutAct_9fa48("583") ? data.length <= 0 : stryMutAct_9fa48("582") ? data.length >= 0 : stryMutAct_9fa48("581") ? false : stryMutAct_9fa48("580") ? true : (stryCov_9fa48("580", "581", "582", "583"), data.length > 0)) ? <ResponsiveContainer width="100%" height={380}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={140} label={renderLabel} stroke={isDark ? stryMutAct_9fa48("584") ? "" : (stryCov_9fa48("584"), "#374151") : stryMutAct_9fa48("585") ? "" : (stryCov_9fa48("585"), "#fff")} strokeWidth={1}>
              {data.map(stryMutAct_9fa48("586") ? () => undefined : (stryCov_9fa48("586"), entry => <Cell key={entry.name} fill={stryMutAct_9fa48("587") ? catColorMap.get(entry.name) && "#6b7280" : (stryCov_9fa48("587"), catColorMap.get(entry.name) ?? (stryMutAct_9fa48("588") ? "" : (stryCov_9fa48("588"), "#6b7280")))} />))}
            </Pie>
            <Tooltip contentStyle={isDark ? stryMutAct_9fa48("589") ? {} : (stryCov_9fa48("589"), {
            backgroundColor: stryMutAct_9fa48("590") ? "" : (stryCov_9fa48("590"), "#1f2937"),
            border: stryMutAct_9fa48("591") ? "" : (stryCov_9fa48("591"), "1px solid #374151"),
            color: stryMutAct_9fa48("592") ? "" : (stryCov_9fa48("592"), "#d1d5db")
          }) : undefined} formatter={stryMutAct_9fa48("593") ? () => undefined : (stryCov_9fa48("593"), (v: unknown) => stryMutAct_9fa48("594") ? `` : (stryCov_9fa48("594"), `£${(stryMutAct_9fa48("597") ? Number(v) && 0 : stryMutAct_9fa48("596") ? false : stryMutAct_9fa48("595") ? true : (stryCov_9fa48("595", "596", "597"), Number(v) || 0)).toLocaleString()}`))} />
          </PieChart>
        </ResponsiveContainer> : <p className="text-gray-400 py-8 text-center">{emptyText}</p>}
    </div>;
  }
}