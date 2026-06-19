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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
interface MonthlyBarChartCardProps {
  year: string;
  data: Record<string, string | number>[];
  catNames: string[];
  catColorMap: Map<string, string>;
  isDark: boolean;
}
export default function MonthlyBarChartCard({
  year,
  data,
  catNames,
  catColorMap,
  isDark
}: MonthlyBarChartCardProps) {
  if (stryMutAct_9fa48("533")) {
    {}
  } else {
    stryCov_9fa48("533");
    return <div className="bg-surface-solid dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-xs">
      <p className="text-lg font-semibold mb-4 dark:text-gray-100">Monthly expenses — {year}</p>
      {(stryMutAct_9fa48("536") ? data.length > 0 || catNames.length > 0 : stryMutAct_9fa48("535") ? false : stryMutAct_9fa48("534") ? true : (stryCov_9fa48("534", "535", "536"), (stryMutAct_9fa48("539") ? data.length <= 0 : stryMutAct_9fa48("538") ? data.length >= 0 : stryMutAct_9fa48("537") ? true : (stryCov_9fa48("537", "538", "539"), data.length > 0)) && (stryMutAct_9fa48("542") ? catNames.length <= 0 : stryMutAct_9fa48("541") ? catNames.length >= 0 : stryMutAct_9fa48("540") ? true : (stryCov_9fa48("540", "541", "542"), catNames.length > 0)))) ? <ResponsiveContainer width="100%" height={380}>
          <BarChart data={data} margin={stryMutAct_9fa48("543") ? {} : (stryCov_9fa48("543"), {
          top: 10,
          right: 20,
          left: 0,
          bottom: 0
        })}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? stryMutAct_9fa48("544") ? "" : (stryCov_9fa48("544"), "#374151") : stryMutAct_9fa48("545") ? "" : (stryCov_9fa48("545"), "#e5e7eb")} />
            <XAxis dataKey="month" tick={stryMutAct_9fa48("546") ? {} : (stryCov_9fa48("546"), {
            fontSize: 12
          })} stroke={isDark ? stryMutAct_9fa48("547") ? "" : (stryCov_9fa48("547"), "#6b7280") : stryMutAct_9fa48("548") ? "" : (stryCov_9fa48("548"), "#9ca3af")} />
            <YAxis tick={stryMutAct_9fa48("549") ? {} : (stryCov_9fa48("549"), {
            fontSize: 12
          })} stroke={isDark ? stryMutAct_9fa48("550") ? "" : (stryCov_9fa48("550"), "#6b7280") : stryMutAct_9fa48("551") ? "" : (stryCov_9fa48("551"), "#9ca3af")} tickFormatter={stryMutAct_9fa48("552") ? () => undefined : (stryCov_9fa48("552"), (v: unknown) => stryMutAct_9fa48("553") ? `` : (stryCov_9fa48("553"), `£${Number(v)}`))} />
            <Tooltip contentStyle={isDark ? stryMutAct_9fa48("554") ? {} : (stryCov_9fa48("554"), {
            backgroundColor: stryMutAct_9fa48("555") ? "" : (stryCov_9fa48("555"), "#1f2937"),
            border: stryMutAct_9fa48("556") ? "" : (stryCov_9fa48("556"), "1px solid #374151"),
            color: stryMutAct_9fa48("557") ? "" : (stryCov_9fa48("557"), "#d1d5db")
          }) : undefined} formatter={stryMutAct_9fa48("558") ? () => undefined : (stryCov_9fa48("558"), (v: unknown) => stryMutAct_9fa48("559") ? `` : (stryCov_9fa48("559"), `£${(stryMutAct_9fa48("562") ? Number(v) && 0 : stryMutAct_9fa48("561") ? false : stryMutAct_9fa48("560") ? true : (stryCov_9fa48("560", "561", "562"), Number(v) || 0)).toLocaleString()}`))} />
            <Legend wrapperStyle={stryMutAct_9fa48("563") ? {} : (stryCov_9fa48("563"), {
            fontSize: 12
          })} />
            {catNames.map(stryMutAct_9fa48("564") ? () => undefined : (stryCov_9fa48("564"), name => <Bar key={name} dataKey={name} stackId="a" fill={stryMutAct_9fa48("565") ? catColorMap.get(name) && "#6b7280" : (stryCov_9fa48("565"), catColorMap.get(name) ?? (stryMutAct_9fa48("566") ? "" : (stryCov_9fa48("566"), "#6b7280")))} />))}
          </BarChart>
        </ResponsiveContainer> : <p className="text-gray-400 py-8 text-center">Sem dados</p>}
    </div>;
  }
}