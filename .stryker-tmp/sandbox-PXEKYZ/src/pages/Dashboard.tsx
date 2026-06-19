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
import { useState, useMemo } from "react";
import { useCategoryStore } from "../stores/categoryStore";
import { useTransactionStore } from "../stores/transactionStore";
import { useUIStore } from "../stores/uiStore";
import YearMonthFilter from "../components/YearMonthFilter";
import PieChartCard from "../components/PieChartCard";
import MonthlyBarChartCard from "../components/MonthlyBarChartCard";
const MONTH_LABELS: Record<string, string> = stryMutAct_9fa48("929") ? {} : (stryCov_9fa48("929"), {
  "01": stryMutAct_9fa48("930") ? "" : (stryCov_9fa48("930"), "Jan"),
  "02": stryMutAct_9fa48("931") ? "" : (stryCov_9fa48("931"), "Feb"),
  "03": stryMutAct_9fa48("932") ? "" : (stryCov_9fa48("932"), "Mar"),
  "04": stryMutAct_9fa48("933") ? "" : (stryCov_9fa48("933"), "Apr"),
  "05": stryMutAct_9fa48("934") ? "" : (stryCov_9fa48("934"), "May"),
  "06": stryMutAct_9fa48("935") ? "" : (stryCov_9fa48("935"), "Jun"),
  "07": stryMutAct_9fa48("936") ? "" : (stryCov_9fa48("936"), "Jul"),
  "08": stryMutAct_9fa48("937") ? "" : (stryCov_9fa48("937"), "Aug"),
  "09": stryMutAct_9fa48("938") ? "" : (stryCov_9fa48("938"), "Sep"),
  "10": stryMutAct_9fa48("939") ? "" : (stryCov_9fa48("939"), "Oct"),
  "11": stryMutAct_9fa48("940") ? "" : (stryCov_9fa48("940"), "Nov"),
  "12": stryMutAct_9fa48("941") ? "" : (stryCov_9fa48("941"), "Dec")
});
export default function Dashboard() {
  if (stryMutAct_9fa48("942")) {
    {}
  } else {
    stryCov_9fa48("942");
    const cats = useCategoryStore(stryMutAct_9fa48("943") ? () => undefined : (stryCov_9fa48("943"), s => s.categories));
    const months = useTransactionStore(stryMutAct_9fa48("944") ? () => undefined : (stryCov_9fa48("944"), s => s.months));
    const txs = useMemo(stryMutAct_9fa48("945") ? () => undefined : (stryCov_9fa48("945"), () => Object.values(months).flatMap(stryMutAct_9fa48("946") ? () => undefined : (stryCov_9fa48("946"), m => m.transactions))), stryMutAct_9fa48("947") ? [] : (stryCov_9fa48("947"), [months]));
    const theme = useUIStore(stryMutAct_9fa48("948") ? () => undefined : (stryCov_9fa48("948"), s => s.theme));
    const isDark = useMemo(() => {
      if (stryMutAct_9fa48("949")) {
        {}
      } else {
        stryCov_9fa48("949");
        if (stryMutAct_9fa48("952") ? theme !== "dark" : stryMutAct_9fa48("951") ? false : stryMutAct_9fa48("950") ? true : (stryCov_9fa48("950", "951", "952"), theme === (stryMutAct_9fa48("953") ? "" : (stryCov_9fa48("953"), "dark")))) return stryMutAct_9fa48("954") ? false : (stryCov_9fa48("954"), true);
        if (stryMutAct_9fa48("957") ? theme !== "light" : stryMutAct_9fa48("956") ? false : stryMutAct_9fa48("955") ? true : (stryCov_9fa48("955", "956", "957"), theme === (stryMutAct_9fa48("958") ? "" : (stryCov_9fa48("958"), "light")))) return stryMutAct_9fa48("959") ? true : (stryCov_9fa48("959"), false);
        return window.matchMedia(stryMutAct_9fa48("960") ? "" : (stryCov_9fa48("960"), "(prefers-color-scheme: dark)")).matches;
      }
    }, stryMutAct_9fa48("961") ? [] : (stryCov_9fa48("961"), [theme]));
    const creditCatIds = useMemo(stryMutAct_9fa48("962") ? () => undefined : (stryCov_9fa48("962"), () => new Set(stryMutAct_9fa48("963") ? cats.map(c => c.id) : (stryCov_9fa48("963"), cats.filter(stryMutAct_9fa48("964") ? () => undefined : (stryCov_9fa48("964"), c => stryMutAct_9fa48("967") ? c.type !== "credit" : stryMutAct_9fa48("966") ? false : stryMutAct_9fa48("965") ? true : (stryCov_9fa48("965", "966", "967"), c.type === (stryMutAct_9fa48("968") ? "" : (stryCov_9fa48("968"), "credit"))))).map(stryMutAct_9fa48("969") ? () => undefined : (stryCov_9fa48("969"), c => c.id))))), stryMutAct_9fa48("970") ? [] : (stryCov_9fa48("970"), [cats]));
    const debitCatIds = useMemo(stryMutAct_9fa48("971") ? () => undefined : (stryCov_9fa48("971"), () => new Set(stryMutAct_9fa48("972") ? cats.map(c => c.id) : (stryCov_9fa48("972"), cats.filter(stryMutAct_9fa48("973") ? () => undefined : (stryCov_9fa48("973"), c => stryMutAct_9fa48("976") ? c.type === "credit" : stryMutAct_9fa48("975") ? false : stryMutAct_9fa48("974") ? true : (stryCov_9fa48("974", "975", "976"), c.type !== (stryMutAct_9fa48("977") ? "" : (stryCov_9fa48("977"), "credit"))))).map(stryMutAct_9fa48("978") ? () => undefined : (stryCov_9fa48("978"), c => c.id))))), stryMutAct_9fa48("979") ? [] : (stryCov_9fa48("979"), [cats]));
    const years = useMemo(() => {
      if (stryMutAct_9fa48("980")) {
        {}
      } else {
        stryCov_9fa48("980");
        const s = new Set(txs.map(stryMutAct_9fa48("981") ? () => undefined : (stryCov_9fa48("981"), t => stryMutAct_9fa48("982") ? t.date : (stryCov_9fa48("982"), t.date.slice(0, 4)))));
        return Array.from(s).toSorted();
      }
    }, stryMutAct_9fa48("983") ? [] : (stryCov_9fa48("983"), [txs]));
    const [selectedYear, setSelectedYear] = useState(stryMutAct_9fa48("984") ? () => undefined : (stryCov_9fa48("984"), () => stryMutAct_9fa48("987") ? years[years.length - 1] && String(new Date().getFullYear()) : stryMutAct_9fa48("986") ? false : stryMutAct_9fa48("985") ? true : (stryCov_9fa48("985", "986", "987"), years[stryMutAct_9fa48("988") ? years.length + 1 : (stryCov_9fa48("988"), years.length - 1)] || String(new Date().getFullYear()))));
    const monthsInYear = useMemo(() => {
      if (stryMutAct_9fa48("989")) {
        {}
      } else {
        stryCov_9fa48("989");
        const s = new Set<string>();
        for (const tx of txs) {
          if (stryMutAct_9fa48("990")) {
            {}
          } else {
            stryCov_9fa48("990");
            if (stryMutAct_9fa48("993") ? tx.date.endsWith(selectedYear) : stryMutAct_9fa48("992") ? false : stryMutAct_9fa48("991") ? true : (stryCov_9fa48("991", "992", "993"), tx.date.startsWith(selectedYear))) s.add(stryMutAct_9fa48("994") ? tx.date : (stryCov_9fa48("994"), tx.date.slice(0, 7)));
          }
        }
        return Array.from(s).toSorted();
      }
    }, stryMutAct_9fa48("995") ? [] : (stryCov_9fa48("995"), [txs, selectedYear]));
    const [selectedMonth, setSelectedMonth] = useState(stryMutAct_9fa48("996") ? "Stryker was here!" : (stryCov_9fa48("996"), ""));
    const [yearDebit, yearCredit, barData] = useMemo(() => {
      if (stryMutAct_9fa48("997")) {
        {}
      } else {
        stryCov_9fa48("997");
        const yearAgg = new Map<string, number>();
        let yearCred = 0;
        const barMap = new Map<string, {
          month: string;
          [cat: string]: number | string;
        }>();
        for (const tx of txs) {
          if (stryMutAct_9fa48("998")) {
            {}
          } else {
            stryCov_9fa48("998");
            if (stryMutAct_9fa48("1001") ? tx.date.slice(0, 4) === selectedYear : stryMutAct_9fa48("1000") ? false : stryMutAct_9fa48("999") ? true : (stryCov_9fa48("999", "1000", "1001"), (stryMutAct_9fa48("1002") ? tx.date : (stryCov_9fa48("1002"), tx.date.slice(0, 4))) !== selectedYear)) continue;
            const isDebit = debitCatIds.has(tx.categoryId);
            const isCredit = creditCatIds.has(tx.categoryId);
            if (stryMutAct_9fa48("1004") ? false : stryMutAct_9fa48("1003") ? true : (stryCov_9fa48("1003", "1004"), isDebit)) {
              if (stryMutAct_9fa48("1005")) {
                {}
              } else {
                stryCov_9fa48("1005");
                yearAgg.set(tx.categoryId, stryMutAct_9fa48("1006") ? (yearAgg.get(tx.categoryId) || 0) - tx.amount : (stryCov_9fa48("1006"), (stryMutAct_9fa48("1009") ? yearAgg.get(tx.categoryId) && 0 : stryMutAct_9fa48("1008") ? false : stryMutAct_9fa48("1007") ? true : (stryCov_9fa48("1007", "1008", "1009"), yearAgg.get(tx.categoryId) || 0)) + tx.amount));
              }
            }
            if (stryMutAct_9fa48("1011") ? false : stryMutAct_9fa48("1010") ? true : (stryCov_9fa48("1010", "1011"), isCredit)) {
              if (stryMutAct_9fa48("1012")) {
                {}
              } else {
                stryCov_9fa48("1012");
                stryMutAct_9fa48("1013") ? yearCred -= tx.amount : (stryCov_9fa48("1013"), yearCred += tx.amount);
              }
            }
            if (stryMutAct_9fa48("1015") ? false : stryMutAct_9fa48("1014") ? true : (stryCov_9fa48("1014", "1015"), isDebit)) {
              if (stryMutAct_9fa48("1016")) {
                {}
              } else {
                stryCov_9fa48("1016");
                const month = stryMutAct_9fa48("1017") ? tx.date : (stryCov_9fa48("1017"), tx.date.slice(5, 7));
                const catName = stryMutAct_9fa48("1018") ? cats.find(c => c.id === tx.categoryId)?.name && tx.categoryId : (stryCov_9fa48("1018"), (stryMutAct_9fa48("1019") ? cats.find(c => c.id === tx.categoryId).name : (stryCov_9fa48("1019"), cats.find(stryMutAct_9fa48("1020") ? () => undefined : (stryCov_9fa48("1020"), c => stryMutAct_9fa48("1023") ? c.id !== tx.categoryId : stryMutAct_9fa48("1022") ? false : stryMutAct_9fa48("1021") ? true : (stryCov_9fa48("1021", "1022", "1023"), c.id === tx.categoryId)))?.name)) ?? tx.categoryId);
                if (stryMutAct_9fa48("1026") ? false : stryMutAct_9fa48("1025") ? true : stryMutAct_9fa48("1024") ? barMap.has(month) : (stryCov_9fa48("1024", "1025", "1026"), !barMap.has(month))) barMap.set(month, {
                  month
                } as {
                  month: string;
                  [cat: string]: number | string;
                });
                const entry = barMap.get(month);
                if (stryMutAct_9fa48("1028") ? false : stryMutAct_9fa48("1027") ? true : (stryCov_9fa48("1027", "1028"), entry)) entry[catName] = stryMutAct_9fa48("1029") ? (entry[catName] as number || 0) - Math.round(tx.amount) : (stryCov_9fa48("1029"), (stryMutAct_9fa48("1032") ? entry[catName] as number && 0 : stryMutAct_9fa48("1031") ? false : stryMutAct_9fa48("1030") ? true : (stryCov_9fa48("1030", "1031", "1032"), entry[catName] as number || 0)) + Math.round(tx.amount));
              }
            }
          }
        }
        const yearDeb = Array.from(yearAgg.entries()).map(stryMutAct_9fa48("1033") ? () => undefined : (stryCov_9fa48("1033"), ([id, value]) => stryMutAct_9fa48("1034") ? {} : (stryCov_9fa48("1034"), {
          name: stryMutAct_9fa48("1035") ? cats.find(c => c.id === id)?.name && id : (stryCov_9fa48("1035"), (stryMutAct_9fa48("1036") ? cats.find(c => c.id === id).name : (stryCov_9fa48("1036"), cats.find(stryMutAct_9fa48("1037") ? () => undefined : (stryCov_9fa48("1037"), c => stryMutAct_9fa48("1040") ? c.id !== id : stryMutAct_9fa48("1039") ? false : stryMutAct_9fa48("1038") ? true : (stryCov_9fa48("1038", "1039", "1040"), c.id === id)))?.name)) ?? id),
          value: Math.round(value)
        }))).toSorted(stryMutAct_9fa48("1041") ? () => undefined : (stryCov_9fa48("1041"), (a, b) => stryMutAct_9fa48("1042") ? b.value + a.value : (stryCov_9fa48("1042"), b.value - a.value)));
        const bar = Array.from(barMap.values()).toSorted(stryMutAct_9fa48("1043") ? () => undefined : (stryCov_9fa48("1043"), (a, b) => String(a.month).localeCompare(String(b.month))));
        return [yearDeb, yearCred, bar] as const;
      }
    }, stryMutAct_9fa48("1044") ? [] : (stryCov_9fa48("1044"), [txs, cats, selectedYear, debitCatIds, creditCatIds]));
    const [monthDebit, monthCredit] = useMemo((): [Array<{
      name: string;
      value: number;
    }>, number] => {
      if (stryMutAct_9fa48("1045")) {
        {}
      } else {
        stryCov_9fa48("1045");
        if (stryMutAct_9fa48("1048") ? false : stryMutAct_9fa48("1047") ? true : stryMutAct_9fa48("1046") ? selectedMonth : (stryCov_9fa48("1046", "1047", "1048"), !selectedMonth)) return stryMutAct_9fa48("1049") ? [] : (stryCov_9fa48("1049"), [stryMutAct_9fa48("1050") ? ["Stryker was here"] : (stryCov_9fa48("1050"), []), 0]);
        const mDebit: {
          name: string;
          value: number;
        }[] = stryMutAct_9fa48("1051") ? ["Stryker was here"] : (stryCov_9fa48("1051"), []);
        let mCred = 0;
        for (const tx of txs) {
          if (stryMutAct_9fa48("1052")) {
            {}
          } else {
            stryCov_9fa48("1052");
            if (stryMutAct_9fa48("1055") ? tx.date.slice(0, 7) === selectedMonth : stryMutAct_9fa48("1054") ? false : stryMutAct_9fa48("1053") ? true : (stryCov_9fa48("1053", "1054", "1055"), (stryMutAct_9fa48("1056") ? tx.date : (stryCov_9fa48("1056"), tx.date.slice(0, 7))) !== selectedMonth)) continue;
            const isDebit = debitCatIds.has(tx.categoryId);
            const isCredit = creditCatIds.has(tx.categoryId);
            if (stryMutAct_9fa48("1058") ? false : stryMutAct_9fa48("1057") ? true : (stryCov_9fa48("1057", "1058"), isDebit)) {
              if (stryMutAct_9fa48("1059")) {
                {}
              } else {
                stryCov_9fa48("1059");
                const idx = mDebit.findIndex(stryMutAct_9fa48("1060") ? () => undefined : (stryCov_9fa48("1060"), d => stryMutAct_9fa48("1063") ? d.name !== tx.categoryId : stryMutAct_9fa48("1062") ? false : stryMutAct_9fa48("1061") ? true : (stryCov_9fa48("1061", "1062", "1063"), d.name === tx.categoryId)));
                if (stryMutAct_9fa48("1067") ? idx < 0 : stryMutAct_9fa48("1066") ? idx > 0 : stryMutAct_9fa48("1065") ? false : stryMutAct_9fa48("1064") ? true : (stryCov_9fa48("1064", "1065", "1066", "1067"), idx >= 0)) stryMutAct_9fa48("1068") ? mDebit[idx].value -= Math.round(tx.amount) : (stryCov_9fa48("1068"), mDebit[idx].value += Math.round(tx.amount));else mDebit.push(stryMutAct_9fa48("1069") ? {} : (stryCov_9fa48("1069"), {
                  name: tx.categoryId,
                  value: Math.round(tx.amount)
                }));
              }
            }
            if (stryMutAct_9fa48("1071") ? false : stryMutAct_9fa48("1070") ? true : (stryCov_9fa48("1070", "1071"), isCredit)) {
              if (stryMutAct_9fa48("1072")) {
                {}
              } else {
                stryCov_9fa48("1072");
                stryMutAct_9fa48("1073") ? mCred -= tx.amount : (stryCov_9fa48("1073"), mCred += tx.amount);
              }
            }
          }
        }
        const result = mDebit.map(stryMutAct_9fa48("1074") ? () => undefined : (stryCov_9fa48("1074"), d => stryMutAct_9fa48("1075") ? {} : (stryCov_9fa48("1075"), {
          name: stryMutAct_9fa48("1076") ? cats.find(c => c.id === d.name)?.name && d.name : (stryCov_9fa48("1076"), (stryMutAct_9fa48("1077") ? cats.find(c => c.id === d.name).name : (stryCov_9fa48("1077"), cats.find(stryMutAct_9fa48("1078") ? () => undefined : (stryCov_9fa48("1078"), c => stryMutAct_9fa48("1081") ? c.id !== d.name : stryMutAct_9fa48("1080") ? false : stryMutAct_9fa48("1079") ? true : (stryCov_9fa48("1079", "1080", "1081"), c.id === d.name)))?.name)) ?? d.name),
          value: d.value
        }))).toSorted(stryMutAct_9fa48("1082") ? () => undefined : (stryCov_9fa48("1082"), (a, b) => stryMutAct_9fa48("1083") ? b.value + a.value : (stryCov_9fa48("1083"), b.value - a.value)));
        return stryMutAct_9fa48("1084") ? [] : (stryCov_9fa48("1084"), [result, mCred]);
      }
    }, stryMutAct_9fa48("1085") ? [] : (stryCov_9fa48("1085"), [txs, cats, selectedMonth, debitCatIds, creditCatIds]));
    const totalYear = yearDebit.reduce(stryMutAct_9fa48("1086") ? () => undefined : (stryCov_9fa48("1086"), (s, d) => stryMutAct_9fa48("1087") ? s - d.value : (stryCov_9fa48("1087"), s + d.value)), 0);
    const totalMonth = monthDebit.reduce(stryMutAct_9fa48("1088") ? () => undefined : (stryCov_9fa48("1088"), (s, d) => stryMutAct_9fa48("1089") ? s - d.value : (stryCov_9fa48("1089"), s + d.value)), 0);
    const catNames = useMemo(() => {
      if (stryMutAct_9fa48("1090")) {
        {}
      } else {
        stryCov_9fa48("1090");
        const names = new Set<string>();
        for (const row of barData) {
          if (stryMutAct_9fa48("1091")) {
            {}
          } else {
            stryCov_9fa48("1091");
            for (const key of Object.keys(row)) {
              if (stryMutAct_9fa48("1092")) {
                {}
              } else {
                stryCov_9fa48("1092");
                if (stryMutAct_9fa48("1095") ? key === "month" : stryMutAct_9fa48("1094") ? false : stryMutAct_9fa48("1093") ? true : (stryCov_9fa48("1093", "1094", "1095"), key !== (stryMutAct_9fa48("1096") ? "" : (stryCov_9fa48("1096"), "month")))) names.add(key);
              }
            }
          }
        }
        return Array.from(names);
      }
    }, stryMutAct_9fa48("1097") ? [] : (stryCov_9fa48("1097"), [barData]));
    const fullBarData = useMemo(() => {
      if (stryMutAct_9fa48("1098")) {
        {}
      } else {
        stryCov_9fa48("1098");
        const existing = new Map(barData.map(stryMutAct_9fa48("1099") ? () => undefined : (stryCov_9fa48("1099"), d => stryMutAct_9fa48("1100") ? [] : (stryCov_9fa48("1100"), [d.month, d]))));
        return (stryMutAct_9fa48("1101") ? [] : (stryCov_9fa48("1101"), [stryMutAct_9fa48("1102") ? "" : (stryCov_9fa48("1102"), "01"), stryMutAct_9fa48("1103") ? "" : (stryCov_9fa48("1103"), "02"), stryMutAct_9fa48("1104") ? "" : (stryCov_9fa48("1104"), "03"), stryMutAct_9fa48("1105") ? "" : (stryCov_9fa48("1105"), "04"), stryMutAct_9fa48("1106") ? "" : (stryCov_9fa48("1106"), "05"), stryMutAct_9fa48("1107") ? "" : (stryCov_9fa48("1107"), "06"), stryMutAct_9fa48("1108") ? "" : (stryCov_9fa48("1108"), "07"), stryMutAct_9fa48("1109") ? "" : (stryCov_9fa48("1109"), "08"), stryMutAct_9fa48("1110") ? "" : (stryCov_9fa48("1110"), "09"), stryMutAct_9fa48("1111") ? "" : (stryCov_9fa48("1111"), "10"), stryMutAct_9fa48("1112") ? "" : (stryCov_9fa48("1112"), "11"), stryMutAct_9fa48("1113") ? "" : (stryCov_9fa48("1113"), "12")])).map(m => {
          if (stryMutAct_9fa48("1114")) {
            {}
          } else {
            stryCov_9fa48("1114");
            const entry = existing.get(m);
            if (stryMutAct_9fa48("1116") ? false : stryMutAct_9fa48("1115") ? true : (stryCov_9fa48("1115", "1116"), entry)) return stryMutAct_9fa48("1117") ? {} : (stryCov_9fa48("1117"), {
              ...entry,
              month: MONTH_LABELS[m]
            });
            const base: Record<string, string | number> = stryMutAct_9fa48("1118") ? {} : (stryCov_9fa48("1118"), {
              month: MONTH_LABELS[m]
            });
            for (const name of catNames) base[name] = 0;
            return base;
          }
        });
      }
    }, stryMutAct_9fa48("1119") ? [] : (stryCov_9fa48("1119"), [barData, catNames]));

    // Map category name -> color
    const catColorMap = useMemo(() => {
      if (stryMutAct_9fa48("1120")) {
        {}
      } else {
        stryCov_9fa48("1120");
        const m = new Map<string, string>();
        for (const cat of cats) {
          if (stryMutAct_9fa48("1121")) {
            {}
          } else {
            stryCov_9fa48("1121");
            if (stryMutAct_9fa48("1124") ? cat.type === "credit" : stryMutAct_9fa48("1123") ? false : stryMutAct_9fa48("1122") ? true : (stryCov_9fa48("1122", "1123", "1124"), cat.type !== (stryMutAct_9fa48("1125") ? "" : (stryCov_9fa48("1125"), "credit")))) m.set(cat.name, cat.color);
          }
        }
        return m;
      }
    }, stryMutAct_9fa48("1126") ? [] : (stryCov_9fa48("1126"), [cats]));
    return <div>
      <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">Dashboard</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">{txs.length} transactions loaded</p>

      <YearMonthFilter years={years} selectedYear={selectedYear} onYearChange={year => {
        if (stryMutAct_9fa48("1127")) {
          {}
        } else {
          stryCov_9fa48("1127");
          setSelectedYear(year);
          setSelectedMonth(stryMutAct_9fa48("1128") ? "Stryker was here!" : (stryCov_9fa48("1128"), ""));
        }
      }} monthsInYear={monthsInYear} selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PieChartCard title={selectedYear} data={yearDebit} total={totalYear} income={yearCredit} catColorMap={catColorMap} isDark={isDark} emptyText="No data" />
        <PieChartCard title={stryMutAct_9fa48("1131") ? selectedMonth && "Select a month" : stryMutAct_9fa48("1130") ? false : stryMutAct_9fa48("1129") ? true : (stryCov_9fa48("1129", "1130", "1131"), selectedMonth || (stryMutAct_9fa48("1132") ? "" : (stryCov_9fa48("1132"), "Select a month")))} data={monthDebit} total={totalMonth} income={monthCredit} catColorMap={catColorMap} isDark={isDark} emptyText="Select a month" />
      </div>

      <MonthlyBarChartCard year={selectedYear} data={fullBarData} catNames={catNames} catColorMap={catColorMap} isDark={isDark} />
    </div>;
  }
}