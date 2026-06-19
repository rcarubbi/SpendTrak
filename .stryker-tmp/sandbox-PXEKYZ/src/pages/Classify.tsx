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
import { useTransactionStore } from "../stores/transactionStore";
import { toastSuccess, toastError } from "../stores/toastStore";
import type { Transaction } from "../types";
import { extractKeyword } from "../utils/classify";
import { CATEGORY_IDS } from "../constants";
import ClassifyHeader from "../components/ClassifyHeader";
import ClassifyCard from "../components/ClassifyCard";
export default function Classify() {
  if (stryMutAct_9fa48("805")) {
    {}
  } else {
    stryCov_9fa48("805");
    const cats = useCategoryStore(stryMutAct_9fa48("806") ? () => undefined : (stryCov_9fa48("806"), s => s.categories));
    const months = useTransactionStore(stryMutAct_9fa48("807") ? () => undefined : (stryCov_9fa48("807"), s => s.months));
    const doSaveMonthData = useTransactionStore(stryMutAct_9fa48("808") ? () => undefined : (stryCov_9fa48("808"), s => s.saveMonthData));
    const updateCategory = useCategoryStore(stryMutAct_9fa48("809") ? () => undefined : (stryCov_9fa48("809"), s => s.updateCategory));
    const [oneOff, setOneOff] = useState<Record<string, boolean>>({});
    const [customKeywords, setCustomKeywords] = useState<Record<string, string>>({});
    const [showAll, setShowAll] = useState(stryMutAct_9fa48("810") ? true : (stryCov_9fa48("810"), false));
    const unknown = useMemo(stryMutAct_9fa48("811") ? () => undefined : (stryCov_9fa48("811"), () => stryMutAct_9fa48("812") ? Object.values(months).flatMap(m => m.transactions) : (stryCov_9fa48("812"), Object.values(months).flatMap(stryMutAct_9fa48("813") ? () => undefined : (stryCov_9fa48("813"), m => m.transactions)).filter(stryMutAct_9fa48("814") ? () => undefined : (stryCov_9fa48("814"), tx => stryMutAct_9fa48("817") ? tx.categoryId !== CATEGORY_IDS.OTHER : stryMutAct_9fa48("816") ? false : stryMutAct_9fa48("815") ? true : (stryCov_9fa48("815", "816", "817"), tx.categoryId === CATEGORY_IDS.OTHER))))), stryMutAct_9fa48("818") ? [] : (stryCov_9fa48("818"), [months]));
    const byDesc = useMemo(() => {
      if (stryMutAct_9fa48("819")) {
        {}
      } else {
        stryCov_9fa48("819");
        const map = new Map<string, {
          txs: Transaction[];
          count: number;
          total: number;
        }>();
        for (const tx of unknown) {
          if (stryMutAct_9fa48("820")) {
            {}
          } else {
            stryCov_9fa48("820");
            const key = stryMutAct_9fa48("821") ? tx.description : (stryCov_9fa48("821"), tx.description.slice(0, 60));
            if (stryMutAct_9fa48("824") ? false : stryMutAct_9fa48("823") ? true : stryMutAct_9fa48("822") ? map.has(key) : (stryCov_9fa48("822", "823", "824"), !map.has(key))) map.set(key, stryMutAct_9fa48("825") ? {} : (stryCov_9fa48("825"), {
              txs: stryMutAct_9fa48("826") ? ["Stryker was here"] : (stryCov_9fa48("826"), []),
              count: 0,
              total: 0
            }));
            const entry = map.get(key)!;
            entry.txs.push(tx);
            stryMutAct_9fa48("827") ? entry.count-- : (stryCov_9fa48("827"), entry.count++);
            stryMutAct_9fa48("828") ? entry.total -= tx.amount : (stryCov_9fa48("828"), entry.total += tx.amount);
          }
        }
        return Array.from(map.entries()).toSorted(stryMutAct_9fa48("829") ? () => undefined : (stryCov_9fa48("829"), (a, b) => stryMutAct_9fa48("830") ? b[1].total + a[1].total : (stryCov_9fa48("830"), b[1].total - a[1].total)));
      }
    }, stryMutAct_9fa48("831") ? [] : (stryCov_9fa48("831"), [unknown]));
    const LIMIT = 50;
    const hasMore = stryMutAct_9fa48("835") ? byDesc.length <= LIMIT : stryMutAct_9fa48("834") ? byDesc.length >= LIMIT : stryMutAct_9fa48("833") ? false : stryMutAct_9fa48("832") ? true : (stryCov_9fa48("832", "833", "834", "835"), byDesc.length > LIMIT);
    const visible = showAll ? byDesc : stryMutAct_9fa48("836") ? byDesc : (stryCov_9fa48("836"), byDesc.slice(0, LIMIT));
    const classifyCats = useMemo(stryMutAct_9fa48("837") ? () => undefined : (stryCov_9fa48("837"), () => stryMutAct_9fa48("838") ? cats : (stryCov_9fa48("838"), cats.filter(stryMutAct_9fa48("839") ? () => undefined : (stryCov_9fa48("839"), c => stryMutAct_9fa48("842") ? c.id !== CATEGORY_IDS.OTHER || c.id !== CATEGORY_IDS.INCOME : stryMutAct_9fa48("841") ? false : stryMutAct_9fa48("840") ? true : (stryCov_9fa48("840", "841", "842"), (stryMutAct_9fa48("844") ? c.id === CATEGORY_IDS.OTHER : stryMutAct_9fa48("843") ? true : (stryCov_9fa48("843", "844"), c.id !== CATEGORY_IDS.OTHER)) && (stryMutAct_9fa48("846") ? c.id === CATEGORY_IDS.INCOME : stryMutAct_9fa48("845") ? true : (stryCov_9fa48("845", "846"), c.id !== CATEGORY_IDS.INCOME))))))), stryMutAct_9fa48("847") ? [] : (stryCov_9fa48("847"), [cats]));
    const handleClassify = useCallback(async (description: string, catId: string, saveKeyword: boolean) => {
      if (stryMutAct_9fa48("848")) {
        {}
      } else {
        stryCov_9fa48("848");
        const entry = byDesc.find(stryMutAct_9fa48("849") ? () => undefined : (stryCov_9fa48("849"), ([desc]) => stryMutAct_9fa48("852") ? desc !== description : stryMutAct_9fa48("851") ? false : stryMutAct_9fa48("850") ? true : (stryCov_9fa48("850", "851", "852"), desc === description)));
        if (stryMutAct_9fa48("855") ? !entry && !catId : stryMutAct_9fa48("854") ? false : stryMutAct_9fa48("853") ? true : (stryCov_9fa48("853", "854", "855"), (stryMutAct_9fa48("856") ? entry : (stryCov_9fa48("856"), !entry)) || (stryMutAct_9fa48("857") ? catId : (stryCov_9fa48("857"), !catId)))) return;
        const cat = cats.find(stryMutAct_9fa48("858") ? () => undefined : (stryCov_9fa48("858"), c => stryMutAct_9fa48("861") ? c.id !== catId : stryMutAct_9fa48("860") ? false : stryMutAct_9fa48("859") ? true : (stryCov_9fa48("859", "860", "861"), c.id === catId)));
        if (stryMutAct_9fa48("864") ? false : stryMutAct_9fa48("863") ? true : stryMutAct_9fa48("862") ? cat : (stryCov_9fa48("862", "863", "864"), !cat)) {
          if (stryMutAct_9fa48("865")) {
            {}
          } else {
            stryCov_9fa48("865");
            toastError(stryMutAct_9fa48("866") ? "" : (stryCov_9fa48("866"), "Category not found"));
            return;
          }
        }
        try {
          if (stryMutAct_9fa48("867")) {
            {}
          } else {
            stryCov_9fa48("867");
            if (stryMutAct_9fa48("869") ? false : stryMutAct_9fa48("868") ? true : (stryCov_9fa48("868", "869"), saveKeyword)) {
              if (stryMutAct_9fa48("870")) {
                {}
              } else {
                stryCov_9fa48("870");
                const kwOverride = stryMutAct_9fa48("873") ? customKeywords[description] && "" : stryMutAct_9fa48("872") ? false : stryMutAct_9fa48("871") ? true : (stryCov_9fa48("871", "872", "873"), customKeywords[description] || (stryMutAct_9fa48("874") ? "Stryker was here!" : (stryCov_9fa48("874"), "")));
                const keyword = stryMutAct_9fa48("877") ? kwOverride && extractKeyword(description) : stryMutAct_9fa48("876") ? false : stryMutAct_9fa48("875") ? true : (stryCov_9fa48("875", "876", "877"), kwOverride || extractKeyword(description));
                if (stryMutAct_9fa48("879") ? false : stryMutAct_9fa48("878") ? true : (stryCov_9fa48("878", "879"), keyword)) {
                  if (stryMutAct_9fa48("880")) {
                    {}
                  } else {
                    stryCov_9fa48("880");
                    const kw = stryMutAct_9fa48("881") ? keyword.toLowerCase() : (stryCov_9fa48("881"), keyword.toUpperCase());
                    const existingNormalized = cat.keywords.map(stryMutAct_9fa48("882") ? () => undefined : (stryCov_9fa48("882"), k => stryMutAct_9fa48("883") ? k.toLowerCase() : (stryCov_9fa48("883"), k.toUpperCase())));
                    if (stryMutAct_9fa48("886") ? false : stryMutAct_9fa48("885") ? true : stryMutAct_9fa48("884") ? existingNormalized.includes(kw) : (stryCov_9fa48("884", "885", "886"), !existingNormalized.includes(kw))) {
                      if (stryMutAct_9fa48("887")) {
                        {}
                      } else {
                        stryCov_9fa48("887");
                        await updateCategory(catId, stryMutAct_9fa48("888") ? {} : (stryCov_9fa48("888"), {
                          keywords: stryMutAct_9fa48("889") ? [] : (stryCov_9fa48("889"), [...cat.keywords, kw])
                        }));
                      }
                    }
                  }
                }
              }
            }
            const txsByMonth = new Map<string, Transaction[]>();
            for (const tx of entry[1].txs) {
              if (stryMutAct_9fa48("890")) {
                {}
              } else {
                stryCov_9fa48("890");
                const monthKey = stryMutAct_9fa48("891") ? tx.date : (stryCov_9fa48("891"), tx.date.slice(0, 7));
                if (stryMutAct_9fa48("894") ? false : stryMutAct_9fa48("893") ? true : stryMutAct_9fa48("892") ? txsByMonth.has(monthKey) : (stryCov_9fa48("892", "893", "894"), !txsByMonth.has(monthKey))) txsByMonth.set(monthKey, stryMutAct_9fa48("895") ? ["Stryker was here"] : (stryCov_9fa48("895"), []));
                txsByMonth.get(monthKey)!.push(stryMutAct_9fa48("896") ? {} : (stryCov_9fa48("896"), {
                  ...tx,
                  categoryId: catId
                }));
              }
            }
            for (const [monthKey, txs] of txsByMonth) {
              if (stryMutAct_9fa48("897")) {
                {}
              } else {
                stryCov_9fa48("897");
                const [y, m] = monthKey.split(stryMutAct_9fa48("898") ? "" : (stryCov_9fa48("898"), "-")).map(Number);
                await doSaveMonthData(stryMutAct_9fa48("899") ? {} : (stryCov_9fa48("899"), {
                  year: y,
                  month: m,
                  transactions: txs,
                  uploadedAt: new Date().toISOString()
                }));
              }
            }
            toastSuccess(stryMutAct_9fa48("900") ? `` : (stryCov_9fa48("900"), `Classified as ${cat.name}`));
          }
        } catch (err) {
          if (stryMutAct_9fa48("901")) {
            {}
          } else {
            stryCov_9fa48("901");
            toastError(stryMutAct_9fa48("902") ? `` : (stryCov_9fa48("902"), `Failed to classify as ${cat.name}`), err instanceof Error ? err.stack : String(err));
          }
        }
      }
    }, stryMutAct_9fa48("903") ? [] : (stryCov_9fa48("903"), [byDesc, cats, updateCategory, doSaveMonthData, customKeywords]));
    if (stryMutAct_9fa48("906") ? unknown.length !== 0 : stryMutAct_9fa48("905") ? false : stryMutAct_9fa48("904") ? true : (stryCov_9fa48("904", "905", "906"), unknown.length === 0)) {
      if (stryMutAct_9fa48("907")) {
        {}
      } else {
        stryCov_9fa48("907");
        return <div>
        <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">Classify</h1>
        <p className="text-gray-500 dark:text-gray-400">No unclassified transactions.</p>
      </div>;
      }
    }
    return <div>
      <ClassifyHeader unknownCount={unknown.length} />

      <div className="flex flex-col gap-2">
        {visible.map(stryMutAct_9fa48("908") ? () => undefined : (stryCov_9fa48("908"), ([desc, info]) => <ClassifyCard key={desc} desc={desc} count={info.count} total={info.total} isOneOff={stryMutAct_9fa48("909") ? oneOff[desc] && false : (stryCov_9fa48("909"), oneOff[desc] ?? (stryMutAct_9fa48("910") ? true : (stryCov_9fa48("910"), false)))} customKeyword={stryMutAct_9fa48("911") ? customKeywords[desc] && "" : (stryCov_9fa48("911"), customKeywords[desc] ?? (stryMutAct_9fa48("912") ? "Stryker was here!" : (stryCov_9fa48("912"), "")))} categories={classifyCats} onToggleOneOff={stryMutAct_9fa48("913") ? () => undefined : (stryCov_9fa48("913"), d => setOneOff(stryMutAct_9fa48("914") ? () => undefined : (stryCov_9fa48("914"), prev => stryMutAct_9fa48("915") ? {} : (stryCov_9fa48("915"), {
          ...prev,
          [d]: stryMutAct_9fa48("916") ? prev[d] : (stryCov_9fa48("916"), !prev[d])
        }))))} onKeywordChange={stryMutAct_9fa48("917") ? () => undefined : (stryCov_9fa48("917"), (d, v) => setCustomKeywords(stryMutAct_9fa48("918") ? () => undefined : (stryCov_9fa48("918"), prev => stryMutAct_9fa48("919") ? {} : (stryCov_9fa48("919"), {
          ...prev,
          [d]: v
        }))))} onClassify={handleClassify} />))}
        {stryMutAct_9fa48("922") ? hasMore && !showAll || <button onClick={() => setShowAll(true)} className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline">
            Show all ({byDesc.length - LIMIT} remaining)
          </button> : stryMutAct_9fa48("921") ? false : stryMutAct_9fa48("920") ? true : (stryCov_9fa48("920", "921", "922"), (stryMutAct_9fa48("924") ? hasMore || !showAll : stryMutAct_9fa48("923") ? true : (stryCov_9fa48("923", "924"), hasMore && (stryMutAct_9fa48("925") ? showAll : (stryCov_9fa48("925"), !showAll)))) && <button onClick={stryMutAct_9fa48("926") ? () => undefined : (stryCov_9fa48("926"), () => setShowAll(stryMutAct_9fa48("927") ? false : (stryCov_9fa48("927"), true)))} className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline">
            Show all ({stryMutAct_9fa48("928") ? byDesc.length + LIMIT : (stryCov_9fa48("928"), byDesc.length - LIMIT)} remaining)
          </button>)}
      </div>
    </div>;
  }
}