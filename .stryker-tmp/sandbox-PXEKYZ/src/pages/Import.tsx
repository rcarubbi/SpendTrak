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
import { useCallback, useMemo, useState } from "react";
import { useCategoryStore } from "../stores/categoryStore";
import { classify } from "../utils/classify";
import { useTransactionStore } from "../stores/transactionStore";
import { toastSuccess, toastError } from "../stores/toastStore";
import type { Transaction } from "../types";
import { getProviders, detectProvider } from "../providers";
import type { UploadProvider } from "../providers/types";
import { catStyleTag, rowClassRules } from "../utils/styleUtils";
import ProviderSelector from "../components/ProviderSelector";
import FileDropZone from "../components/FileDropZone";
import UploadStatusBanner from "../components/UploadStatusBanner";
import PreviewSection from "../components/PreviewSection";
import DebugSection from "../components/DebugSection";
import ConfirmModal from "../components/ConfirmModal";
export default function Import() {
  if (stryMutAct_9fa48("1133")) {
    {}
  } else {
    stryCov_9fa48("1133");
    const [selectedProvider, setSelectedProvider] = useState(stryMutAct_9fa48("1134") ? "" : (stryCov_9fa48("1134"), "auto"));
    const [pending, setPending] = useState<{
      transactions: Transaction[];
      months: string[];
      total: number;
      provider: string;
      debug: string;
    } | null>(null);
    const [status, setStatus] = useState(stryMutAct_9fa48("1135") ? "Stryker was here!" : (stryCov_9fa48("1135"), ""));
    const [loading, setLoading] = useState(stryMutAct_9fa48("1136") ? true : (stryCov_9fa48("1136"), false));
    const [debug, setDebug] = useState(stryMutAct_9fa48("1137") ? "Stryker was here!" : (stryCov_9fa48("1137"), ""));
    const [dragging, setDragging] = useState(stryMutAct_9fa48("1138") ? true : (stryCov_9fa48("1138"), false));
    const [showConfirm, setShowConfirm] = useState(stryMutAct_9fa48("1139") ? true : (stryCov_9fa48("1139"), false));
    const cats = useCategoryStore(stryMutAct_9fa48("1140") ? () => undefined : (stryCov_9fa48("1140"), s => s.categories));
    const months = useTransactionStore(stryMutAct_9fa48("1141") ? () => undefined : (stryCov_9fa48("1141"), s => s.months));
    const saveMonthData = useTransactionStore(stryMutAct_9fa48("1142") ? () => undefined : (stryCov_9fa48("1142"), s => s.saveMonthData));
    const providers = getProviders();
    const processFiles = useCallback(async (files: FileList) => {
      if (stryMutAct_9fa48("1143")) {
        {}
      } else {
        stryCov_9fa48("1143");
        if (stryMutAct_9fa48("1146") ? files.length !== 0 : stryMutAct_9fa48("1145") ? false : stryMutAct_9fa48("1144") ? true : (stryCov_9fa48("1144", "1145", "1146"), files.length === 0)) return;
        if (stryMutAct_9fa48("1149") ? cats.length !== 0 : stryMutAct_9fa48("1148") ? false : stryMutAct_9fa48("1147") ? true : (stryCov_9fa48("1147", "1148", "1149"), cats.length === 0)) {
          if (stryMutAct_9fa48("1150")) {
            {}
          } else {
            stryCov_9fa48("1150");
            setStatus(stryMutAct_9fa48("1151") ? "" : (stryCov_9fa48("1151"), "Categories not loaded yet. Please wait and try again."));
            setLoading(stryMutAct_9fa48("1152") ? true : (stryCov_9fa48("1152"), false));
            return;
          }
        }
        setStatus(stryMutAct_9fa48("1153") ? `` : (stryCov_9fa48("1153"), `Reading ${files.length} file(s)...`));
        setLoading(stryMutAct_9fa48("1154") ? false : (stryCov_9fa48("1154"), true));
        setDebug(stryMutAct_9fa48("1155") ? "Stryker was here!" : (stryCov_9fa48("1155"), ""));
        setPending(null);
        const allTxs: Transaction[] = stryMutAct_9fa48("1156") ? ["Stryker was here"] : (stryCov_9fa48("1156"), []);
        const allMonths = new Set<string>();
        let totalDebit = 0;
        const debugLogs: string[] = stryMutAct_9fa48("1157") ? ["Stryker was here"] : (stryCov_9fa48("1157"), []);
        let providerName = stryMutAct_9fa48("1158") ? "Stryker was here!" : (stryCov_9fa48("1158"), "");
        let hasError = stryMutAct_9fa48("1159") ? true : (stryCov_9fa48("1159"), false);
        for (let i = 0; stryMutAct_9fa48("1162") ? i >= files.length : stryMutAct_9fa48("1161") ? i <= files.length : stryMutAct_9fa48("1160") ? false : (stryCov_9fa48("1160", "1161", "1162"), i < files.length); stryMutAct_9fa48("1163") ? i-- : (stryCov_9fa48("1163"), i++)) {
          if (stryMutAct_9fa48("1164")) {
            {}
          } else {
            stryCov_9fa48("1164");
            const file = files[i];
            setStatus(stryMutAct_9fa48("1165") ? `` : (stryCov_9fa48("1165"), `Processing ${file.name} (${stryMutAct_9fa48("1166") ? i - 1 : (stryCov_9fa48("1166"), i + 1)}/${files.length})...`));
            let provider: UploadProvider | undefined;
            if (stryMutAct_9fa48("1169") ? selectedProvider !== "auto" : stryMutAct_9fa48("1168") ? false : stryMutAct_9fa48("1167") ? true : (stryCov_9fa48("1167", "1168", "1169"), selectedProvider === (stryMutAct_9fa48("1170") ? "" : (stryCov_9fa48("1170"), "auto")))) {
              if (stryMutAct_9fa48("1171")) {
                {}
              } else {
                stryCov_9fa48("1171");
                provider = detectProvider(file.name);
                if (stryMutAct_9fa48("1174") ? false : stryMutAct_9fa48("1173") ? true : stryMutAct_9fa48("1172") ? provider : (stryCov_9fa48("1172", "1173", "1174"), !provider)) {
                  if (stryMutAct_9fa48("1175")) {
                    {}
                  } else {
                    stryCov_9fa48("1175");
                    setStatus(stryMutAct_9fa48("1176") ? `` : (stryCov_9fa48("1176"), `No provider found for "${file.name}"`));
                    hasError = stryMutAct_9fa48("1177") ? false : (stryCov_9fa48("1177"), true);
                    continue;
                  }
                }
              }
            } else {
              if (stryMutAct_9fa48("1178")) {
                {}
              } else {
                stryCov_9fa48("1178");
                provider = providers.find(stryMutAct_9fa48("1179") ? () => undefined : (stryCov_9fa48("1179"), p => stryMutAct_9fa48("1182") ? p.id !== selectedProvider : stryMutAct_9fa48("1181") ? false : stryMutAct_9fa48("1180") ? true : (stryCov_9fa48("1180", "1181", "1182"), p.id === selectedProvider)));
                if (stryMutAct_9fa48("1185") ? false : stryMutAct_9fa48("1184") ? true : stryMutAct_9fa48("1183") ? provider : (stryCov_9fa48("1183", "1184", "1185"), !provider)) {
                  if (stryMutAct_9fa48("1186")) {
                    {}
                  } else {
                    stryCov_9fa48("1186");
                    setStatus(stryMutAct_9fa48("1187") ? "" : (stryCov_9fa48("1187"), "Invalid provider"));
                    hasError = stryMutAct_9fa48("1188") ? false : (stryCov_9fa48("1188"), true);
                    continue;
                  }
                }
              }
            }
            providerName = provider.name;
            try {
              if (stryMutAct_9fa48("1189")) {
                {}
              } else {
                stryCov_9fa48("1189");
                const result = await provider.parse(file);
                const creditCatIds = new Set(stryMutAct_9fa48("1190") ? cats.map(c => c.id) : (stryCov_9fa48("1190"), cats.filter(stryMutAct_9fa48("1191") ? () => undefined : (stryCov_9fa48("1191"), c => stryMutAct_9fa48("1194") ? c.type !== "credit" : stryMutAct_9fa48("1193") ? false : stryMutAct_9fa48("1192") ? true : (stryCov_9fa48("1192", "1193", "1194"), c.type === (stryMutAct_9fa48("1195") ? "" : (stryCov_9fa48("1195"), "credit"))))).map(stryMutAct_9fa48("1196") ? () => undefined : (stryCov_9fa48("1196"), c => c.id))));
                const txs = result.transactions.map(stryMutAct_9fa48("1197") ? () => undefined : (stryCov_9fa48("1197"), tx => stryMutAct_9fa48("1198") ? {} : (stryCov_9fa48("1198"), {
                  ...tx,
                  categoryId: classify(tx.description, cats),
                  source: file.name
                })));
                const debitTotal = txs.reduce(stryMutAct_9fa48("1199") ? () => undefined : (stryCov_9fa48("1199"), (s, t) => creditCatIds.has(t.categoryId) ? s : stryMutAct_9fa48("1200") ? s - t.amount : (stryCov_9fa48("1200"), s + t.amount)), 0);
                allTxs.push(...txs);
                for (const m of result.months) allMonths.add(m);
                stryMutAct_9fa48("1201") ? totalDebit -= debitTotal : (stryCov_9fa48("1201"), totalDebit += debitTotal);
                if (stryMutAct_9fa48("1203") ? false : stryMutAct_9fa48("1202") ? true : (stryCov_9fa48("1202", "1203"), result.debug)) debugLogs.push(stryMutAct_9fa48("1204") ? `` : (stryCov_9fa48("1204"), `--- ${file.name} ---\n${result.debug}`));
              }
            } catch (err) {
              if (stryMutAct_9fa48("1205")) {
                {}
              } else {
                stryCov_9fa48("1205");
                setStatus(stryMutAct_9fa48("1206") ? `` : (stryCov_9fa48("1206"), `Error in ${file.name}: ${err instanceof Error ? err.message : String(err)}`));
                hasError = stryMutAct_9fa48("1207") ? false : (stryCov_9fa48("1207"), true);
              }
            }
          }
        }
        if (stryMutAct_9fa48("1211") ? allTxs.length <= 0 : stryMutAct_9fa48("1210") ? allTxs.length >= 0 : stryMutAct_9fa48("1209") ? false : stryMutAct_9fa48("1208") ? true : (stryCov_9fa48("1208", "1209", "1210", "1211"), allTxs.length > 0)) {
          if (stryMutAct_9fa48("1212")) {
            {}
          } else {
            stryCov_9fa48("1212");
            setPending(stryMutAct_9fa48("1213") ? {} : (stryCov_9fa48("1213"), {
              transactions: allTxs,
              months: stryMutAct_9fa48("1214") ? Array.from(allMonths) : (stryCov_9fa48("1214"), Array.from(allMonths).sort()),
              total: totalDebit,
              provider: providerName,
              debug: debugLogs.join(stryMutAct_9fa48("1215") ? "" : (stryCov_9fa48("1215"), "\n\n"))
            }));
            setStatus(stryMutAct_9fa48("1216") ? "Stryker was here!" : (stryCov_9fa48("1216"), ""));
          }
        } else if (stryMutAct_9fa48("1219") ? false : stryMutAct_9fa48("1218") ? true : stryMutAct_9fa48("1217") ? hasError : (stryCov_9fa48("1217", "1218", "1219"), !hasError)) {
          if (stryMutAct_9fa48("1220")) {
            {}
          } else {
            stryCov_9fa48("1220");
            setStatus(stryMutAct_9fa48("1221") ? "" : (stryCov_9fa48("1221"), "No transactions found in selected files."));
          }
        }
        setLoading(stryMutAct_9fa48("1222") ? true : (stryCov_9fa48("1222"), false));
        setDragging(stryMutAct_9fa48("1223") ? true : (stryCov_9fa48("1223"), false));
      }
    }, stryMutAct_9fa48("1224") ? [] : (stryCov_9fa48("1224"), [selectedProvider, cats, providers]));
    const handleDragOver = useCallback((e: React.DragEvent) => {
      if (stryMutAct_9fa48("1225")) {
        {}
      } else {
        stryCov_9fa48("1225");
        e.preventDefault();
        e.stopPropagation();
        setDragging(stryMutAct_9fa48("1226") ? false : (stryCov_9fa48("1226"), true));
      }
    }, stryMutAct_9fa48("1227") ? ["Stryker was here"] : (stryCov_9fa48("1227"), []));
    const handleDragLeave = useCallback((e: React.DragEvent) => {
      if (stryMutAct_9fa48("1228")) {
        {}
      } else {
        stryCov_9fa48("1228");
        e.preventDefault();
        e.stopPropagation();
        setDragging(stryMutAct_9fa48("1229") ? true : (stryCov_9fa48("1229"), false));
      }
    }, stryMutAct_9fa48("1230") ? ["Stryker was here"] : (stryCov_9fa48("1230"), []));
    const handleDrop = useCallback((e: React.DragEvent) => {
      if (stryMutAct_9fa48("1231")) {
        {}
      } else {
        stryCov_9fa48("1231");
        e.preventDefault();
        e.stopPropagation();
        setDragging(stryMutAct_9fa48("1232") ? true : (stryCov_9fa48("1232"), false));
        if (stryMutAct_9fa48("1236") ? e.dataTransfer.files.length <= 0 : stryMutAct_9fa48("1235") ? e.dataTransfer.files.length >= 0 : stryMutAct_9fa48("1234") ? false : stryMutAct_9fa48("1233") ? true : (stryCov_9fa48("1233", "1234", "1235", "1236"), e.dataTransfer.files.length > 0)) processFiles(e.dataTransfer.files);
      }
    }, stryMutAct_9fa48("1237") ? [] : (stryCov_9fa48("1237"), [processFiles]));
    const handleConfirm = useCallback(async () => {
      if (stryMutAct_9fa48("1238")) {
        {}
      } else {
        stryCov_9fa48("1238");
        if (stryMutAct_9fa48("1241") ? false : stryMutAct_9fa48("1240") ? true : stryMutAct_9fa48("1239") ? pending : (stryCov_9fa48("1239", "1240", "1241"), !pending)) return;
        setStatus(stryMutAct_9fa48("1242") ? "" : (stryCov_9fa48("1242"), "Saving..."));
        try {
          if (stryMutAct_9fa48("1243")) {
            {}
          } else {
            stryCov_9fa48("1243");
            const byMonth = new Map<string, Transaction[]>();
            for (const tx of pending.transactions) {
              if (stryMutAct_9fa48("1244")) {
                {}
              } else {
                stryCov_9fa48("1244");
                const key = stryMutAct_9fa48("1245") ? tx.date : (stryCov_9fa48("1245"), tx.date.slice(0, 7));
                if (stryMutAct_9fa48("1248") ? false : stryMutAct_9fa48("1247") ? true : stryMutAct_9fa48("1246") ? byMonth.has(key) : (stryCov_9fa48("1246", "1247", "1248"), !byMonth.has(key))) byMonth.set(key, stryMutAct_9fa48("1249") ? ["Stryker was here"] : (stryCov_9fa48("1249"), []));
                byMonth.get(key)!.push(tx);
              }
            }
            for (const [key, monthTxs] of byMonth) {
              if (stryMutAct_9fa48("1250")) {
                {}
              } else {
                stryCov_9fa48("1250");
                const [yearStr, monthStr] = key.split(stryMutAct_9fa48("1251") ? "" : (stryCov_9fa48("1251"), "-"));
                await saveMonthData(stryMutAct_9fa48("1252") ? {} : (stryCov_9fa48("1252"), {
                  year: parseInt(yearStr),
                  month: parseInt(monthStr),
                  transactions: monthTxs,
                  uploadedAt: new Date().toISOString()
                }));
              }
            }
            const msg = stryMutAct_9fa48("1253") ? `` : (stryCov_9fa48("1253"), `Imported ${pending.transactions.length} transactions across ${byMonth.size} months via ${pending.provider}`);
            setStatus(msg);
            toastSuccess(msg);
            setDebug(pending.debug);
            setPending(null);
          }
        } catch (err) {
          if (stryMutAct_9fa48("1254")) {
            {}
          } else {
            stryCov_9fa48("1254");
            const msg = stryMutAct_9fa48("1255") ? `` : (stryCov_9fa48("1255"), `Error saving: ${err instanceof Error ? err.message : String(err)}`);
            setStatus(msg);
            toastError(msg, err instanceof Error ? err.stack : String(err));
          }
        }
      }
    }, stryMutAct_9fa48("1256") ? [] : (stryCov_9fa48("1256"), [pending, saveMonthData]));
    const handleCancel = () => {
      if (stryMutAct_9fa48("1257")) {
        {}
      } else {
        stryCov_9fa48("1257");
        setShowConfirm(stryMutAct_9fa48("1258") ? false : (stryCov_9fa48("1258"), true));
      }
    };
    const handleConfirmDiscard = () => {
      if (stryMutAct_9fa48("1259")) {
        {}
      } else {
        stryCov_9fa48("1259");
        setPending(null);
        setStatus(stryMutAct_9fa48("1260") ? "Stryker was here!" : (stryCov_9fa48("1260"), ""));
        setDebug(stryMutAct_9fa48("1261") ? "Stryker was here!" : (stryCov_9fa48("1261"), ""));
        setShowConfirm(stryMutAct_9fa48("1262") ? true : (stryCov_9fa48("1262"), false));
      }
    };
    const allTxs = useMemo(stryMutAct_9fa48("1263") ? () => undefined : (stryCov_9fa48("1263"), () => Object.values(months).flatMap(stryMutAct_9fa48("1264") ? () => undefined : (stryCov_9fa48("1264"), m => m.transactions))), stryMutAct_9fa48("1265") ? [] : (stryCov_9fa48("1265"), [months]));
    const creditCatIds = useMemo(stryMutAct_9fa48("1266") ? () => undefined : (stryCov_9fa48("1266"), () => new Set(stryMutAct_9fa48("1267") ? cats.map(c => c.id) : (stryCov_9fa48("1267"), cats.filter(stryMutAct_9fa48("1268") ? () => undefined : (stryCov_9fa48("1268"), c => stryMutAct_9fa48("1271") ? c.type !== "credit" : stryMutAct_9fa48("1270") ? false : stryMutAct_9fa48("1269") ? true : (stryCov_9fa48("1269", "1270", "1271"), c.type === (stryMutAct_9fa48("1272") ? "" : (stryCov_9fa48("1272"), "credit"))))).map(stryMutAct_9fa48("1273") ? () => undefined : (stryCov_9fa48("1273"), c => c.id))))), stryMutAct_9fa48("1274") ? [] : (stryCov_9fa48("1274"), [cats]));
    const debitTotal = useMemo(stryMutAct_9fa48("1275") ? () => undefined : (stryCov_9fa48("1275"), () => allTxs.reduce(stryMutAct_9fa48("1276") ? () => undefined : (stryCov_9fa48("1276"), (s, t) => creditCatIds.has(t.categoryId) ? s : stryMutAct_9fa48("1277") ? s - t.amount : (stryCov_9fa48("1277"), s + t.amount)), 0)), stryMutAct_9fa48("1278") ? [] : (stryCov_9fa48("1278"), [allTxs, creditCatIds]));
    const tagStyle = useMemo(stryMutAct_9fa48("1279") ? () => undefined : (stryCov_9fa48("1279"), () => catStyleTag(cats)), stryMutAct_9fa48("1280") ? [] : (stryCov_9fa48("1280"), [cats]));
    const uploadRowClassRules = useMemo(stryMutAct_9fa48("1281") ? () => undefined : (stryCov_9fa48("1281"), () => rowClassRules(cats)), stryMutAct_9fa48("1282") ? [] : (stryCov_9fa48("1282"), [cats]));
    const pendingDuplicates = useMemo(() => {
      if (stryMutAct_9fa48("1283")) {
        {}
      } else {
        stryCov_9fa48("1283");
        if (stryMutAct_9fa48("1286") ? false : stryMutAct_9fa48("1285") ? true : stryMutAct_9fa48("1284") ? pending : (stryCov_9fa48("1284", "1285", "1286"), !pending)) return stryMutAct_9fa48("1287") ? ["Stryker was here"] : (stryCov_9fa48("1287"), []);
        const existingTxs = Object.values(months).flatMap(stryMutAct_9fa48("1288") ? () => undefined : (stryCov_9fa48("1288"), m => m.transactions));
        const existingKeys = new Set(existingTxs.map(stryMutAct_9fa48("1289") ? () => undefined : (stryCov_9fa48("1289"), tx => stryMutAct_9fa48("1290") ? `` : (stryCov_9fa48("1290"), `${tx.date}|${stryMutAct_9fa48("1291") ? tx.description.toLowerCase() : (stryCov_9fa48("1291"), tx.description.toUpperCase())}|${tx.amount}`))));
        return stryMutAct_9fa48("1292") ? pending.transactions : (stryCov_9fa48("1292"), pending.transactions.filter(stryMutAct_9fa48("1293") ? () => undefined : (stryCov_9fa48("1293"), tx => existingKeys.has(stryMutAct_9fa48("1294") ? `` : (stryCov_9fa48("1294"), `${tx.date}|${stryMutAct_9fa48("1295") ? tx.description.toLowerCase() : (stryCov_9fa48("1295"), tx.description.toUpperCase())}|${tx.amount}`)))));
      }
    }, stryMutAct_9fa48("1296") ? [] : (stryCov_9fa48("1296"), [pending, months]));
    return <div className="flex flex-col flex-1 overflow-auto gap-6">
      <style>{tagStyle}</style>

      {/* Page header (bare — matches Statement/Categories/Classify pattern) */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Import</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Upload bank statements (CSV, PDF) to track your spending
          </p>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{allTxs.length} transactions</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Total: £{debitTotal.toLocaleString()}</div>
        </div>
      </div>

      {/* Provider + Drop zone card */}
      <div className="bg-surface/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 rounded-xl shadow-sm p-4 md:p-5">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Provider</span>
          <ProviderSelector selectedProvider={selectedProvider} providers={providers} onChange={setSelectedProvider} />
        </div>
        <FileDropZone dragging={dragging} providers={providers} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onFilesSelected={processFiles} />
      </div>

      {/* Status */}
      <UploadStatusBanner status={status} loading={loading} />

      {/* Preview */}
      <PreviewSection pending={pending} pendingDuplicates={pendingDuplicates} rowClassRules={uploadRowClassRules} onConfirm={handleConfirm} onCancel={handleCancel} />

      {/* Debug */}
      <DebugSection debug={debug} />

      <ConfirmModal show={showConfirm} title="Discard preview?" message="This will discard all parsed transactions. You can re-upload files later." confirmLabel="Discard" variant="danger" onConfirm={handleConfirmDiscard} onCancel={stryMutAct_9fa48("1297") ? () => undefined : (stryCov_9fa48("1297"), () => setShowConfirm(stryMutAct_9fa48("1298") ? true : (stryCov_9fa48("1298"), false)))} />
    </div>;
  }
}