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
import { useState, useMemo, useCallback } from "react";
import { useCategoryStore } from "../stores/categoryStore";
import { useTransactionStore, getLoadedMonths, loadMonthData, getPossibleDuplicates } from "../stores/transactionStore";
import { useUIStore } from "../stores/uiStore";
import { toastSuccess, toastError } from "../stores/toastStore";
import type { Transaction } from "../types";
import DataGrid from "../components/DataGrid";
import FilterBar from "../components/FilterBar";
import DuplicatePanel from "../components/DuplicatePanel";
import ReclassifyModal from "../components/ReclassifyModal";
import type { ColDef } from "ag-grid-community";
import { catStyleTag, rowClassRules } from "../utils/styleUtils";
import { extractKeyword, matchKeyword } from "../utils/classify";
import EditableDescriptionCell from "../components/EditableDescriptionCell";
import CategorySelectCell from "../components/CategorySelectCell";
import TransactionTypeCell from "../components/TransactionTypeCell";
import StatementHeader from "../components/StatementHeader";
export default function Statement() {
  if (stryMutAct_9fa48("1314")) {
    {}
  } else {
    stryCov_9fa48("1314");
    const search = useUIStore(stryMutAct_9fa48("1315") ? () => undefined : (stryCov_9fa48("1315"), s => s.searchQuery));
    const setSearch = useUIStore(stryMutAct_9fa48("1316") ? () => undefined : (stryCov_9fa48("1316"), s => s.setSearchQuery));
    const [catFilter, setCatFilter] = useState(stryMutAct_9fa48("1317") ? "" : (stryCov_9fa48("1317"), "all"));
    const [monthFilter, setMonthFilter] = useState(stryMutAct_9fa48("1318") ? "" : (stryCov_9fa48("1318"), "all"));
    const [showDuplicates, setShowDuplicates] = useState(stryMutAct_9fa48("1319") ? true : (stryCov_9fa48("1319"), false));
    const [pendingReclass, setPendingReclass] = useState<{
      tx: Transaction;
      newCategoryId: string;
    } | null>(null);
    const [customKeyword, setCustomKeyword] = useState(stryMutAct_9fa48("1320") ? "Stryker was here!" : (stryCov_9fa48("1320"), ""));
    const [saveKeywordRule, setSaveKeywordRule] = useState(stryMutAct_9fa48("1321") ? false : (stryCov_9fa48("1321"), true));
    const cats = useCategoryStore(stryMutAct_9fa48("1322") ? () => undefined : (stryCov_9fa48("1322"), s => s.categories));
    const months = useTransactionStore(stryMutAct_9fa48("1323") ? () => undefined : (stryCov_9fa48("1323"), s => s.months));
    const loaded = useTransactionStore(stryMutAct_9fa48("1324") ? () => undefined : (stryCov_9fa48("1324"), s => s.loaded));
    const saveMonthData = useTransactionStore(stryMutAct_9fa48("1325") ? () => undefined : (stryCov_9fa48("1325"), s => s.saveMonthData));
    const deleteTx = useTransactionStore(stryMutAct_9fa48("1326") ? () => undefined : (stryCov_9fa48("1326"), s => s.deleteTransaction));
    const updateCategory = useCategoryStore(stryMutAct_9fa48("1327") ? () => undefined : (stryCov_9fa48("1327"), s => s.updateCategory));
    const txs = useMemo(stryMutAct_9fa48("1328") ? () => undefined : (stryCov_9fa48("1328"), () => Object.values(months).flatMap(stryMutAct_9fa48("1329") ? () => undefined : (stryCov_9fa48("1329"), m => m.transactions))), stryMutAct_9fa48("1330") ? [] : (stryCov_9fa48("1330"), [months]));
    const dupGroups = useMemo(stryMutAct_9fa48("1331") ? () => undefined : (stryCov_9fa48("1331"), () => getPossibleDuplicates(txs)), stryMutAct_9fa48("1332") ? [] : (stryCov_9fa48("1332"), [txs]));
    const creditCatIds = useMemo(stryMutAct_9fa48("1333") ? () => undefined : (stryCov_9fa48("1333"), () => new Set(stryMutAct_9fa48("1334") ? cats.map(c => c.id) : (stryCov_9fa48("1334"), cats.filter(stryMutAct_9fa48("1335") ? () => undefined : (stryCov_9fa48("1335"), c => stryMutAct_9fa48("1338") ? c.type !== "credit" : stryMutAct_9fa48("1337") ? false : stryMutAct_9fa48("1336") ? true : (stryCov_9fa48("1336", "1337", "1338"), c.type === (stryMutAct_9fa48("1339") ? "" : (stryCov_9fa48("1339"), "credit"))))).map(stryMutAct_9fa48("1340") ? () => undefined : (stryCov_9fa48("1340"), c => c.id))))), stryMutAct_9fa48("1341") ? [] : (stryCov_9fa48("1341"), [cats]));
    const debitCatIds = useMemo(stryMutAct_9fa48("1342") ? () => undefined : (stryCov_9fa48("1342"), () => new Set(stryMutAct_9fa48("1343") ? cats.map(c => c.id) : (stryCov_9fa48("1343"), cats.filter(stryMutAct_9fa48("1344") ? () => undefined : (stryCov_9fa48("1344"), c => stryMutAct_9fa48("1347") ? c.type === "credit" : stryMutAct_9fa48("1346") ? false : stryMutAct_9fa48("1345") ? true : (stryCov_9fa48("1345", "1346", "1347"), c.type !== (stryMutAct_9fa48("1348") ? "" : (stryCov_9fa48("1348"), "credit"))))).map(stryMutAct_9fa48("1349") ? () => undefined : (stryCov_9fa48("1349"), c => c.id))))), stryMutAct_9fa48("1350") ? [] : (stryCov_9fa48("1350"), [cats]));
    const loadedMonths = useMemo(stryMutAct_9fa48("1351") ? () => undefined : (stryCov_9fa48("1351"), () => Object.keys(months).toSorted()), stryMutAct_9fa48("1352") ? [] : (stryCov_9fa48("1352"), [months]));
    const handleMergeDuplicates = useCallback(async (groupTxs: Transaction[]) => {
      if (stryMutAct_9fa48("1353")) {
        {}
      } else {
        stryCov_9fa48("1353");
        const [, ...rest] = groupTxs;
        let count = 0;
        for (const tx of rest) {
          if (stryMutAct_9fa48("1354")) {
            {}
          } else {
            stryCov_9fa48("1354");
            for (const monthKey of getLoadedMonths()) {
              if (stryMutAct_9fa48("1355")) {
                {}
              } else {
                stryCov_9fa48("1355");
                const [year, month] = monthKey.split(stryMutAct_9fa48("1356") ? "" : (stryCov_9fa48("1356"), "-")).map(Number);
                const existing = loadMonthData(year, month);
                if (stryMutAct_9fa48("1360") ? existing.transactions.some(t => t.id === tx.id) : stryMutAct_9fa48("1359") ? existing?.transactions.every(t => t.id === tx.id) : stryMutAct_9fa48("1358") ? false : stryMutAct_9fa48("1357") ? true : (stryCov_9fa48("1357", "1358", "1359", "1360"), existing?.transactions.some(stryMutAct_9fa48("1361") ? () => undefined : (stryCov_9fa48("1361"), t => stryMutAct_9fa48("1364") ? t.id !== tx.id : stryMutAct_9fa48("1363") ? false : stryMutAct_9fa48("1362") ? true : (stryCov_9fa48("1362", "1363", "1364"), t.id === tx.id))))) {
                  if (stryMutAct_9fa48("1365")) {
                    {}
                  } else {
                    stryCov_9fa48("1365");
                    try {
                      if (stryMutAct_9fa48("1366")) {
                        {}
                      } else {
                        stryCov_9fa48("1366");
                        await deleteTx(year, month, tx.id);
                        stryMutAct_9fa48("1367") ? count-- : (stryCov_9fa48("1367"), count++);
                      }
                    } catch {/* toast handled in store */}
                    break;
                  }
                }
              }
            }
          }
        }
        if (stryMutAct_9fa48("1371") ? count <= 0 : stryMutAct_9fa48("1370") ? count >= 0 : stryMutAct_9fa48("1369") ? false : stryMutAct_9fa48("1368") ? true : (stryCov_9fa48("1368", "1369", "1370", "1371"), count > 0)) toastSuccess(stryMutAct_9fa48("1372") ? `` : (stryCov_9fa48("1372"), `Merged ${count} duplicate(s)`));
      }
    }, stryMutAct_9fa48("1373") ? [] : (stryCov_9fa48("1373"), [deleteTx]));
    const handleDelete = useCallback(async (txId: string) => {
      if (stryMutAct_9fa48("1374")) {
        {}
      } else {
        stryCov_9fa48("1374");
        for (const monthKey of getLoadedMonths()) {
          if (stryMutAct_9fa48("1375")) {
            {}
          } else {
            stryCov_9fa48("1375");
            const [year, month] = monthKey.split(stryMutAct_9fa48("1376") ? "" : (stryCov_9fa48("1376"), "-")).map(Number);
            const existing = loadMonthData(year, month);
            if (stryMutAct_9fa48("1380") ? existing.transactions.some(t => t.id === txId) : stryMutAct_9fa48("1379") ? existing?.transactions.every(t => t.id === txId) : stryMutAct_9fa48("1378") ? false : stryMutAct_9fa48("1377") ? true : (stryCov_9fa48("1377", "1378", "1379", "1380"), existing?.transactions.some(stryMutAct_9fa48("1381") ? () => undefined : (stryCov_9fa48("1381"), t => stryMutAct_9fa48("1384") ? t.id !== txId : stryMutAct_9fa48("1383") ? false : stryMutAct_9fa48("1382") ? true : (stryCov_9fa48("1382", "1383", "1384"), t.id === txId))))) {
              if (stryMutAct_9fa48("1385")) {
                {}
              } else {
                stryCov_9fa48("1385");
                try {
                  if (stryMutAct_9fa48("1386")) {
                    {}
                  } else {
                    stryCov_9fa48("1386");
                    await deleteTx(year, month, txId);
                    toastSuccess(stryMutAct_9fa48("1387") ? "" : (stryCov_9fa48("1387"), "Transaction deleted"));
                  }
                } catch {/* toast handled in store */}
                break;
              }
            }
          }
        }
      }
    }, stryMutAct_9fa48("1388") ? [] : (stryCov_9fa48("1388"), [deleteTx]));
    const handleReclassify = useCallback(async (tx: Transaction, newCategoryId: string, kwOverride: string, shouldSaveKeyword: boolean) => {
      if (stryMutAct_9fa48("1389")) {
        {}
      } else {
        stryCov_9fa48("1389");
        const oldCat = cats.find(stryMutAct_9fa48("1390") ? () => undefined : (stryCov_9fa48("1390"), c => stryMutAct_9fa48("1393") ? c.id !== tx.categoryId : stryMutAct_9fa48("1392") ? false : stryMutAct_9fa48("1391") ? true : (stryCov_9fa48("1391", "1392", "1393"), c.id === tx.categoryId)));
        const newCat = cats.find(stryMutAct_9fa48("1394") ? () => undefined : (stryCov_9fa48("1394"), c => stryMutAct_9fa48("1397") ? c.id !== newCategoryId : stryMutAct_9fa48("1396") ? false : stryMutAct_9fa48("1395") ? true : (stryCov_9fa48("1395", "1396", "1397"), c.id === newCategoryId)));
        if (stryMutAct_9fa48("1400") ? !oldCat && !newCat : stryMutAct_9fa48("1399") ? false : stryMutAct_9fa48("1398") ? true : (stryCov_9fa48("1398", "1399", "1400"), (stryMutAct_9fa48("1401") ? oldCat : (stryCov_9fa48("1401"), !oldCat)) || (stryMutAct_9fa48("1402") ? newCat : (stryCov_9fa48("1402"), !newCat)))) {
          if (stryMutAct_9fa48("1403")) {
            {}
          } else {
            stryCov_9fa48("1403");
            toastError(stryMutAct_9fa48("1404") ? "" : (stryCov_9fa48("1404"), "Category not found"));
            return;
          }
        }
        const monthKey = stryMutAct_9fa48("1405") ? tx.date : (stryCov_9fa48("1405"), tx.date.slice(0, 7));
        const [year, month] = monthKey.split(stryMutAct_9fa48("1406") ? "" : (stryCov_9fa48("1406"), "-")).map(Number);
        const existing = loadMonthData(year, month);
        if (stryMutAct_9fa48("1409") ? false : stryMutAct_9fa48("1408") ? true : stryMutAct_9fa48("1407") ? existing : (stryCov_9fa48("1407", "1408", "1409"), !existing)) {
          if (stryMutAct_9fa48("1410")) {
            {}
          } else {
            stryCov_9fa48("1410");
            toastError(stryMutAct_9fa48("1411") ? "" : (stryCov_9fa48("1411"), "Transaction data not found"));
            return;
          }
        }
        try {
          if (stryMutAct_9fa48("1412")) {
            {}
          } else {
            stryCov_9fa48("1412");
            // Only manage keywords if shouldSaveKeyword is true
            if (stryMutAct_9fa48("1414") ? false : stryMutAct_9fa48("1413") ? true : (stryCov_9fa48("1413", "1414"), shouldSaveKeyword)) {
              if (stryMutAct_9fa48("1415")) {
                {}
              } else {
                stryCov_9fa48("1415");
                const matching = stryMutAct_9fa48("1416") ? oldCat.keywords : (stryCov_9fa48("1416"), oldCat.keywords.filter(stryMutAct_9fa48("1417") ? () => undefined : (stryCov_9fa48("1417"), k => matchKeyword(tx.description, k))));

                // Remove keywords from old category
                if (stryMutAct_9fa48("1421") ? matching.length <= 0 : stryMutAct_9fa48("1420") ? matching.length >= 0 : stryMutAct_9fa48("1419") ? false : stryMutAct_9fa48("1418") ? true : (stryCov_9fa48("1418", "1419", "1420", "1421"), matching.length > 0)) {
                  if (stryMutAct_9fa48("1422")) {
                    {}
                  } else {
                    stryCov_9fa48("1422");
                    const removedKeywords = stryMutAct_9fa48("1423") ? oldCat.keywords : (stryCov_9fa48("1423"), oldCat.keywords.filter(stryMutAct_9fa48("1424") ? () => undefined : (stryCov_9fa48("1424"), k => stryMutAct_9fa48("1425") ? matching.includes(k) : (stryCov_9fa48("1425"), !matching.includes(k)))));
                    await updateCategory(oldCat.id, stryMutAct_9fa48("1426") ? {} : (stryCov_9fa48("1426"), {
                      keywords: removedKeywords
                    }));
                  }
                }

                // Add keyword to new category
                const keyword = stryMutAct_9fa48("1429") ? kwOverride && extractKeyword(tx.description) : stryMutAct_9fa48("1428") ? false : stryMutAct_9fa48("1427") ? true : (stryCov_9fa48("1427", "1428", "1429"), kwOverride || extractKeyword(tx.description));
                if (stryMutAct_9fa48("1431") ? false : stryMutAct_9fa48("1430") ? true : (stryCov_9fa48("1430", "1431"), keyword)) {
                  if (stryMutAct_9fa48("1432")) {
                    {}
                  } else {
                    stryCov_9fa48("1432");
                    const kw = stryMutAct_9fa48("1433") ? keyword.toLowerCase() : (stryCov_9fa48("1433"), keyword.toUpperCase());
                    const existingNormalized = newCat.keywords.map(stryMutAct_9fa48("1434") ? () => undefined : (stryCov_9fa48("1434"), k => stryMutAct_9fa48("1435") ? k.toLowerCase() : (stryCov_9fa48("1435"), k.toUpperCase())));
                    if (stryMutAct_9fa48("1438") ? false : stryMutAct_9fa48("1437") ? true : stryMutAct_9fa48("1436") ? existingNormalized.includes(kw) : (stryCov_9fa48("1436", "1437", "1438"), !existingNormalized.includes(kw))) {
                      if (stryMutAct_9fa48("1439")) {
                        {}
                      } else {
                        stryCov_9fa48("1439");
                        await updateCategory(newCat.id, stryMutAct_9fa48("1440") ? {} : (stryCov_9fa48("1440"), {
                          keywords: stryMutAct_9fa48("1441") ? [] : (stryCov_9fa48("1441"), [...newCat.keywords, kw])
                        }));
                      }
                    }
                  }
                }
              }
            }

            // Save transaction
            const updatedTx = stryMutAct_9fa48("1442") ? {} : (stryCov_9fa48("1442"), {
              ...tx,
              categoryId: newCategoryId,
              manual: stryMutAct_9fa48("1443") ? false : (stryCov_9fa48("1443"), true)
            });
            await saveMonthData(stryMutAct_9fa48("1444") ? {} : (stryCov_9fa48("1444"), {
              year,
              month,
              transactions: stryMutAct_9fa48("1445") ? [] : (stryCov_9fa48("1445"), [updatedTx]),
              uploadedAt: existing.uploadedAt
            }));
            toastSuccess(stryMutAct_9fa48("1446") ? `` : (stryCov_9fa48("1446"), `Reclassified to ${newCat.name}`));
          }
        } catch (error) {
          if (stryMutAct_9fa48("1447")) {
            {}
          } else {
            stryCov_9fa48("1447");
            if (stryMutAct_9fa48("1449") ? false : stryMutAct_9fa48("1448") ? true : (stryCov_9fa48("1448", "1449"), shouldSaveKeyword)) {
              if (stryMutAct_9fa48("1450")) {
                {}
              } else {
                stryCov_9fa48("1450");
                try {
                  if (stryMutAct_9fa48("1451")) {
                    {}
                  } else {
                    stryCov_9fa48("1451");
                    await updateCategory(oldCat.id, stryMutAct_9fa48("1452") ? {} : (stryCov_9fa48("1452"), {
                      keywords: oldCat.keywords
                    }));
                    await updateCategory(newCat.id, stryMutAct_9fa48("1453") ? {} : (stryCov_9fa48("1453"), {
                      keywords: newCat.keywords
                    }));
                  }
                } catch {
                  // rollback failed — no recovery possible
                }
              }
            }
            toastError(stryMutAct_9fa48("1454") ? `` : (stryCov_9fa48("1454"), `Failed to reclassify transaction`), error instanceof Error ? error.stack : String(error));
            throw error;
          }
        }
      }
    }, stryMutAct_9fa48("1455") ? [] : (stryCov_9fa48("1455"), [cats, updateCategory, saveMonthData]));
    const handleReclassifyTrigger = useCallback((tx: Transaction, newCategoryId: string) => {
      if (stryMutAct_9fa48("1456")) {
        {}
      } else {
        stryCov_9fa48("1456");
        setPendingReclass(stryMutAct_9fa48("1457") ? {} : (stryCov_9fa48("1457"), {
          tx,
          newCategoryId
        }));
        setCustomKeyword(stryMutAct_9fa48("1458") ? "Stryker was here!" : (stryCov_9fa48("1458"), ""));
      }
    }, stryMutAct_9fa48("1459") ? ["Stryker was here"] : (stryCov_9fa48("1459"), []));
    const confirmReclassify = useCallback(async () => {
      if (stryMutAct_9fa48("1460")) {
        {}
      } else {
        stryCov_9fa48("1460");
        if (stryMutAct_9fa48("1463") ? false : stryMutAct_9fa48("1462") ? true : stryMutAct_9fa48("1461") ? pendingReclass : (stryCov_9fa48("1461", "1462", "1463"), !pendingReclass)) return;
        try {
          if (stryMutAct_9fa48("1464")) {
            {}
          } else {
            stryCov_9fa48("1464");
            await handleReclassify(pendingReclass.tx, pendingReclass.newCategoryId, customKeyword, saveKeywordRule);
            setPendingReclass(null);
            setCustomKeyword(stryMutAct_9fa48("1465") ? "Stryker was here!" : (stryCov_9fa48("1465"), ""));
            setSaveKeywordRule(stryMutAct_9fa48("1466") ? false : (stryCov_9fa48("1466"), true));
          }
        } catch {
          // Modal stays open for retry
        }
      }
    }, stryMutAct_9fa48("1467") ? [] : (stryCov_9fa48("1467"), [pendingReclass, customKeyword, saveKeywordRule, handleReclassify]));
    const filtered = useMemo(() => {
      if (stryMutAct_9fa48("1468")) {
        {}
      } else {
        stryCov_9fa48("1468");
        let result = stryMutAct_9fa48("1469") ? [] : (stryCov_9fa48("1469"), [...txs]);
        if (stryMutAct_9fa48("1471") ? false : stryMutAct_9fa48("1470") ? true : (stryCov_9fa48("1470", "1471"), search)) {
          if (stryMutAct_9fa48("1472")) {
            {}
          } else {
            stryCov_9fa48("1472");
            const q = stryMutAct_9fa48("1473") ? search.toLowerCase() : (stryCov_9fa48("1473"), search.toUpperCase());
            result = stryMutAct_9fa48("1474") ? result : (stryCov_9fa48("1474"), result.filter(stryMutAct_9fa48("1475") ? () => undefined : (stryCov_9fa48("1475"), tx => stryMutAct_9fa48("1476") ? tx.description.toLowerCase().includes(q) : (stryCov_9fa48("1476"), tx.description.toUpperCase().includes(q)))));
          }
        }
        if (stryMutAct_9fa48("1479") ? catFilter === "all" : stryMutAct_9fa48("1478") ? false : stryMutAct_9fa48("1477") ? true : (stryCov_9fa48("1477", "1478", "1479"), catFilter !== (stryMutAct_9fa48("1480") ? "" : (stryCov_9fa48("1480"), "all")))) {
          if (stryMutAct_9fa48("1481")) {
            {}
          } else {
            stryCov_9fa48("1481");
            result = stryMutAct_9fa48("1482") ? result : (stryCov_9fa48("1482"), result.filter(stryMutAct_9fa48("1483") ? () => undefined : (stryCov_9fa48("1483"), tx => stryMutAct_9fa48("1486") ? tx.categoryId !== catFilter : stryMutAct_9fa48("1485") ? false : stryMutAct_9fa48("1484") ? true : (stryCov_9fa48("1484", "1485", "1486"), tx.categoryId === catFilter))));
          }
        }
        if (stryMutAct_9fa48("1489") ? monthFilter === "all" : stryMutAct_9fa48("1488") ? false : stryMutAct_9fa48("1487") ? true : (stryCov_9fa48("1487", "1488", "1489"), monthFilter !== (stryMutAct_9fa48("1490") ? "" : (stryCov_9fa48("1490"), "all")))) {
          if (stryMutAct_9fa48("1491")) {
            {}
          } else {
            stryCov_9fa48("1491");
            result = stryMutAct_9fa48("1492") ? result : (stryCov_9fa48("1492"), result.filter(stryMutAct_9fa48("1493") ? () => undefined : (stryCov_9fa48("1493"), tx => stryMutAct_9fa48("1494") ? tx.date.endsWith(monthFilter) : (stryCov_9fa48("1494"), tx.date.startsWith(monthFilter)))));
          }
        }
        return result;
      }
    }, stryMutAct_9fa48("1495") ? [] : (stryCov_9fa48("1495"), [txs, search, catFilter, monthFilter]));
    const debitTotal = useMemo(stryMutAct_9fa48("1496") ? () => undefined : (stryCov_9fa48("1496"), () => filtered.reduce(stryMutAct_9fa48("1497") ? () => undefined : (stryCov_9fa48("1497"), (s, t) => debitCatIds.has(t.categoryId) ? stryMutAct_9fa48("1498") ? s - t.amount : (stryCov_9fa48("1498"), s + t.amount) : s), 0)), stryMutAct_9fa48("1499") ? [] : (stryCov_9fa48("1499"), [filtered, debitCatIds]));
    const creditTotal = useMemo(stryMutAct_9fa48("1500") ? () => undefined : (stryCov_9fa48("1500"), () => filtered.reduce(stryMutAct_9fa48("1501") ? () => undefined : (stryCov_9fa48("1501"), (s, t) => creditCatIds.has(t.categoryId) ? stryMutAct_9fa48("1502") ? s - t.amount : (stryCov_9fa48("1502"), s + t.amount) : s), 0)), stryMutAct_9fa48("1503") ? [] : (stryCov_9fa48("1503"), [filtered, creditCatIds]));
    const tagStyle = useMemo(stryMutAct_9fa48("1504") ? () => undefined : (stryCov_9fa48("1504"), () => catStyleTag(cats)), stryMutAct_9fa48("1505") ? [] : (stryCov_9fa48("1505"), [cats]));
    const rowRules = useMemo(stryMutAct_9fa48("1506") ? () => undefined : (stryCov_9fa48("1506"), () => rowClassRules(cats)), stryMutAct_9fa48("1507") ? [] : (stryCov_9fa48("1507"), [cats]));
    const autoKeyword = pendingReclass ? extractKeyword(pendingReclass.tx.description) : stryMutAct_9fa48("1508") ? "Stryker was here!" : (stryCov_9fa48("1508"), "");
    const handleEditDescription = useCallback(async (tx: Transaction, newDesc: string) => {
      if (stryMutAct_9fa48("1509")) {
        {}
      } else {
        stryCov_9fa48("1509");
        if (stryMutAct_9fa48("1512") ? newDesc === tx.description && !newDesc.trim() : stryMutAct_9fa48("1511") ? false : stryMutAct_9fa48("1510") ? true : (stryCov_9fa48("1510", "1511", "1512"), (stryMutAct_9fa48("1514") ? newDesc !== tx.description : stryMutAct_9fa48("1513") ? false : (stryCov_9fa48("1513", "1514"), newDesc === tx.description)) || (stryMutAct_9fa48("1515") ? newDesc.trim() : (stryCov_9fa48("1515"), !(stryMutAct_9fa48("1516") ? newDesc : (stryCov_9fa48("1516"), newDesc.trim())))))) return;
        const monthKey = stryMutAct_9fa48("1517") ? tx.date : (stryCov_9fa48("1517"), tx.date.slice(0, 7));
        const [year, month] = monthKey.split(stryMutAct_9fa48("1518") ? "" : (stryCov_9fa48("1518"), "-")).map(Number);
        const existing = loadMonthData(year, month);
        if (stryMutAct_9fa48("1521") ? false : stryMutAct_9fa48("1520") ? true : stryMutAct_9fa48("1519") ? existing : (stryCov_9fa48("1519", "1520", "1521"), !existing)) {
          if (stryMutAct_9fa48("1522")) {
            {}
          } else {
            stryCov_9fa48("1522");
            toastError(stryMutAct_9fa48("1523") ? "" : (stryCov_9fa48("1523"), "Transaction data not found"));
            return;
          }
        }
        try {
          if (stryMutAct_9fa48("1524")) {
            {}
          } else {
            stryCov_9fa48("1524");
            const updatedTx = stryMutAct_9fa48("1525") ? {} : (stryCov_9fa48("1525"), {
              ...tx,
              description: stryMutAct_9fa48("1526") ? newDesc : (stryCov_9fa48("1526"), newDesc.trim())
            });
            await saveMonthData(stryMutAct_9fa48("1527") ? {} : (stryCov_9fa48("1527"), {
              year,
              month,
              transactions: stryMutAct_9fa48("1528") ? [] : (stryCov_9fa48("1528"), [updatedTx]),
              uploadedAt: existing.uploadedAt
            }));
            toastSuccess(stryMutAct_9fa48("1529") ? "" : (stryCov_9fa48("1529"), "Description updated"));
          }
        } catch (err) {
          if (stryMutAct_9fa48("1530")) {
            {}
          } else {
            stryCov_9fa48("1530");
            toastError(stryMutAct_9fa48("1531") ? "" : (stryCov_9fa48("1531"), "Failed to update description"), err instanceof Error ? err.stack : String(err));
          }
        }
      }
    }, stryMutAct_9fa48("1532") ? [] : (stryCov_9fa48("1532"), [saveMonthData]));
    const mainColDefs: ColDef[] = useMemo(stryMutAct_9fa48("1533") ? () => undefined : (stryCov_9fa48("1533"), () => stryMutAct_9fa48("1534") ? [] : (stryCov_9fa48("1534"), [stryMutAct_9fa48("1535") ? {} : (stryCov_9fa48("1535"), {
      field: stryMutAct_9fa48("1536") ? "" : (stryCov_9fa48("1536"), "date"),
      headerName: stryMutAct_9fa48("1537") ? "" : (stryCov_9fa48("1537"), "Data"),
      width: 110
    }), stryMutAct_9fa48("1538") ? {} : (stryCov_9fa48("1538"), {
      field: stryMutAct_9fa48("1539") ? "" : (stryCov_9fa48("1539"), "description"),
      headerName: stryMutAct_9fa48("1540") ? "" : (stryCov_9fa48("1540"), "Description"),
      flex: 2,
      minWidth: 200,
      cellRenderer: stryMutAct_9fa48("1541") ? () => undefined : (stryCov_9fa48("1541"), (p: {
        data: Transaction;
      }) => <EditableDescriptionCell data={p.data} onEdit={handleEditDescription} />)
    }), stryMutAct_9fa48("1542") ? {} : (stryCov_9fa48("1542"), {
      field: stryMutAct_9fa48("1543") ? "" : (stryCov_9fa48("1543"), "amount"),
      headerName: stryMutAct_9fa48("1544") ? "" : (stryCov_9fa48("1544"), "Amount"),
      width: 100,
      type: stryMutAct_9fa48("1545") ? "" : (stryCov_9fa48("1545"), "rightAligned"),
      valueFormatter: stryMutAct_9fa48("1546") ? () => undefined : (stryCov_9fa48("1546"), p => stryMutAct_9fa48("1547") ? `` : (stryCov_9fa48("1547"), `£${stryMutAct_9fa48("1548") ? p.value?.toFixed(2) && "0.00" : (stryCov_9fa48("1548"), (stryMutAct_9fa48("1549") ? p.value.toFixed(2) : (stryCov_9fa48("1549"), p.value?.toFixed(2))) ?? (stryMutAct_9fa48("1550") ? "" : (stryCov_9fa48("1550"), "0.00")))}`))
    }), stryMutAct_9fa48("1551") ? {} : (stryCov_9fa48("1551"), {
      field: stryMutAct_9fa48("1552") ? "" : (stryCov_9fa48("1552"), "categoryId"),
      headerName: stryMutAct_9fa48("1553") ? "" : (stryCov_9fa48("1553"), "Category"),
      width: 160,
      cellRenderer: stryMutAct_9fa48("1554") ? () => undefined : (stryCov_9fa48("1554"), (p: {
        data: Transaction;
      }) => <CategorySelectCell data={p.data} categories={cats} onReclassify={handleReclassifyTrigger} />)
    }), stryMutAct_9fa48("1555") ? {} : (stryCov_9fa48("1555"), {
      field: stryMutAct_9fa48("1556") ? "" : (stryCov_9fa48("1556"), "categoryId"),
      headerName: stryMutAct_9fa48("1557") ? "" : (stryCov_9fa48("1557"), "Type"),
      width: 90,
      cellRenderer: stryMutAct_9fa48("1558") ? () => undefined : (stryCov_9fa48("1558"), (p: {
        data: Transaction;
      }) => <TransactionTypeCell categoryId={p.data.categoryId} creditCatIds={creditCatIds} />)
    }), stryMutAct_9fa48("1559") ? {} : (stryCov_9fa48("1559"), {
      field: stryMutAct_9fa48("1560") ? "" : (stryCov_9fa48("1560"), "source"),
      headerName: stryMutAct_9fa48("1561") ? "" : (stryCov_9fa48("1561"), "File"),
      width: 150
    })])), stryMutAct_9fa48("1562") ? [] : (stryCov_9fa48("1562"), [cats, creditCatIds, handleEditDescription, handleReclassifyTrigger]));
    return <div className="flex flex-col flex-1 overflow-auto">
      <style>{tagStyle}</style>
      <StatementHeader dupGroupsLength={dupGroups.length} debitTotal={debitTotal} creditTotal={creditTotal} />

      <FilterBar search={search} onSearchChange={setSearch} monthFilter={monthFilter} onMonthFilterChange={setMonthFilter} loadedMonths={loadedMonths} catFilter={catFilter} onCatFilterChange={setCatFilter} cats={cats} showDuplicates={showDuplicates} onToggleDuplicates={stryMutAct_9fa48("1563") ? () => undefined : (stryCov_9fa48("1563"), () => setShowDuplicates(stryMutAct_9fa48("1564") ? () => undefined : (stryCov_9fa48("1564"), d => stryMutAct_9fa48("1565") ? d : (stryCov_9fa48("1565"), !d))))} dupCount={dupGroups.length} />

      {showDuplicates ? <DuplicatePanel groups={dupGroups} onMerge={handleMergeDuplicates} onDelete={handleDelete} rowClassRules={rowRules} /> : <DataGrid rows={filtered} colDefs={mainColDefs} exportFilename="full-statement" rowClassRules={rowRules} loading={stryMutAct_9fa48("1566") ? loaded : (stryCov_9fa48("1566"), !loaded)} fillHeight />}

      {stryMutAct_9fa48("1569") ? !showDuplicates && filtered.length === 0 || <p className="text-center text-gray-400 dark:text-white mt-8">No transactions found</p> : stryMutAct_9fa48("1568") ? false : stryMutAct_9fa48("1567") ? true : (stryCov_9fa48("1567", "1568", "1569"), (stryMutAct_9fa48("1571") ? !showDuplicates || filtered.length === 0 : stryMutAct_9fa48("1570") ? true : (stryCov_9fa48("1570", "1571"), (stryMutAct_9fa48("1572") ? showDuplicates : (stryCov_9fa48("1572"), !showDuplicates)) && (stryMutAct_9fa48("1574") ? filtered.length !== 0 : stryMutAct_9fa48("1573") ? true : (stryCov_9fa48("1573", "1574"), filtered.length === 0)))) && <p className="text-center text-gray-400 dark:text-white mt-8">No transactions found</p>)}

      {stryMutAct_9fa48("1577") ? pendingReclass || <ReclassifyModal tx={pendingReclass.tx} newCategoryId={pendingReclass.newCategoryId} customKeyword={customKeyword} onCustomKeywordChange={setCustomKeyword} autoKeyword={autoKeyword} saveKeyword={saveKeywordRule} onSaveKeywordChange={setSaveKeywordRule} onConfirm={confirmReclassify} onCancel={() => {
        setPendingReclass(null);
        setCustomKeyword("");
        setSaveKeywordRule(true);
      }} /> : stryMutAct_9fa48("1576") ? false : stryMutAct_9fa48("1575") ? true : (stryCov_9fa48("1575", "1576", "1577"), pendingReclass && <ReclassifyModal tx={pendingReclass.tx} newCategoryId={pendingReclass.newCategoryId} customKeyword={customKeyword} onCustomKeywordChange={setCustomKeyword} autoKeyword={autoKeyword} saveKeyword={saveKeywordRule} onSaveKeywordChange={setSaveKeywordRule} onConfirm={confirmReclassify} onCancel={() => {
        if (stryMutAct_9fa48("1578")) {
          {}
        } else {
          stryCov_9fa48("1578");
          setPendingReclass(null);
          setCustomKeyword(stryMutAct_9fa48("1579") ? "Stryker was here!" : (stryCov_9fa48("1579"), ""));
          setSaveKeywordRule(stryMutAct_9fa48("1580") ? false : (stryCov_9fa48("1580"), true));
        }
      }} />)}
    </div>;
  }
}