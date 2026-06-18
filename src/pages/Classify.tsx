import { useState, useMemo, useCallback } from "react";
import { useCategoryStore } from "../stores/categoryStore";
import { useTransactionStore } from "../stores/transactionStore";
import type { Transaction } from "../types";
import { extractKeyword } from "../utils/classify";
import { CATEGORY_IDS } from "../constants";

export default function Classify() {
  const cats = useCategoryStore((s) => s.categories);
  const months = useTransactionStore((s) => s.months);
  const doSaveMonthData = useTransactionStore((s) => s.saveMonthData);
  const updateCategory = useCategoryStore((s) => s.updateCategory);
  const reclassifyAll = useTransactionStore((s) => s.reclassifyAll);

  const [oneOff, setOneOff] = useState<Record<string, boolean>>({});
  const [customKeywords, setCustomKeywords] = useState<Record<string, string>>({});
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reclassProgress, setReclassProgress] = useState<{ done: number; total: number } | null>(null);
  const unknown = useMemo(
    () => Object.values(months).flatMap((m) => m.transactions).filter((tx) => tx.categoryId === CATEGORY_IDS.OTHER),
    [months]
  );

  const byDesc = useMemo(() => {
    const map = new Map<string, { txs: Transaction[]; count: number; total: number }>();
    for (const tx of unknown) {
      const key = tx.description.slice(0, 60);
      if (!map.has(key)) map.set(key, { txs: [], count: 0, total: 0 });
      const entry = map.get(key)!;
      entry.txs.push(tx);
      entry.count++;
      entry.total += tx.amount;
    }
    return Array.from(map.entries()).sort((a, b) => b[1].total - a[1].total);
  }, [unknown]);

  const LIMIT = 50;
  const hasMore = byDesc.length > LIMIT;
  const visible = showAll ? byDesc : byDesc.slice(0, LIMIT);

  const handleClassify = useCallback(async (description: string, catId: string, saveKeyword: boolean) => {
    const entry = byDesc.find(([desc]) => desc === description);
    if (!entry || !catId) return;

    const cat = cats.find((c) => c.id === catId);
    if (!cat) {
      return;
    }

    try {
      if (saveKeyword) {
        const kwOverride = customKeywords[description] || "";
        const keyword = kwOverride || extractKeyword(description);
        if (keyword) {
          const kw = keyword.toUpperCase();
          const existingNormalized = cat.keywords.map((k) => k.toUpperCase());
          if (!existingNormalized.includes(kw)) {
            await updateCategory(catId, { keywords: [...cat.keywords, kw] });
          }
        }
      }

      const txsByMonth = new Map<string, Transaction[]>();
      for (const tx of entry[1].txs) {
        const monthKey = tx.date.slice(0, 7);
        if (!txsByMonth.has(monthKey)) txsByMonth.set(monthKey, []);
        txsByMonth.get(monthKey)!.push({ ...tx, categoryId: catId });
      }

      for (const [monthKey, txs] of txsByMonth) {
        const [y, m] = monthKey.split("-").map(Number);
        await doSaveMonthData({ year: y, month: m, transactions: txs, uploadedAt: new Date().toISOString() });
      }
    } catch {
      // swallow — error notification not critical for UX
    }
  }, [byDesc, cats, updateCategory, doSaveMonthData, customKeywords]);

  const handleReclassifyAll = useCallback(async () => {
    const store = useTransactionStore.getState();
    const reclassify = store.reclassifyAll;
    const categories = useCategoryStore.getState().categories;
    
    setLoading(true);
    setReclassProgress({ done: 0, total: 0 });
    try {
      await reclassify(categories, (done, total) => {
        setReclassProgress({ done, total });
      });
      setOneOff({});
      setCustomKeywords({});
    } catch {
      // swallow — progress indicator already clears in finally
    } finally {
      setReclassProgress(null);
      setLoading(false);
    }
  }, []);

  if (unknown.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">Classify</h1>
        <p className="text-gray-500 dark:text-gray-400">No unclassified transactions.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold dark:text-gray-100">Classify ({unknown.length})</h1>
        <button
          onClick={handleReclassifyAll}
          disabled={loading}
          className="px-3 py-2 rounded-md text-sm font-semibold border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer disabled:opacity-50"
        >
          Reclassify all
        </button>
      </div>
      {loading && (
        <div className="flex items-center gap-2 mb-4 text-sm text-blue-700">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0" />
          {reclassProgress
            ? `Reclassifying... ${reclassProgress.done}/${reclassProgress.total}`
            : "Reclassifying transactions..."}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {visible.map(([desc, info]) => {
          const isOneOff = oneOff[desc] ?? false;
          return (
            <div key={desc} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800">
              <div className="flex items-start mb-2 gap-2">
                <div className="flex-1 min-w-0">
                  <code className="text-xs text-gray-700 dark:text-gray-300 break-all">{desc}</code>
                  <span className="text-gray-400 dark:text-gray-500 text-xs ml-2 whitespace-nowrap">
                    {info.count}x · £{info.total.toFixed(2)}
                  </span>
                </div>
                <label className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap shrink-0 cursor-pointer select-none">
                  <input
                    id={`auto-checkbox-${desc}`}
                    name={`auto-${desc}`}
                    type="checkbox"
                    checked={!isOneOff}
                    onChange={() => setOneOff((prev) => ({ ...prev, [desc]: !prev[desc] }))}
                    className="w-3.5 h-3.5"
                  />
                  Auto (save rule)
                </label>
               </div>
               {!isOneOff && (
                 <>
                   <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Keyword (used to classify similar)</label>
                   <input
                     id={`keyword-input-${desc}`}
                     name={`keyword-${desc}`}
                     type="text"
                     value={customKeywords[desc] ?? ""}
                     onChange={(e) => setCustomKeywords((prev) => ({ ...prev, [desc]: e.target.value }))}
                     placeholder={extractKeyword(desc) || "e.g. MERCADO"}
                     className="w-full mb-2 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
                   />
                 </>
               )}
              <div className="flex gap-1 flex-wrap">
                {cats.filter((c) => c.id !== CATEGORY_IDS.OTHER && c.id !== CATEGORY_IDS.INCOME).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleClassify(desc, cat.id, !isOneOff)}
                    className="px-2.5 py-1 rounded text-xs font-semibold cursor-pointer border transition-colors hover:text-white"
                    style={{
                      borderColor: cat.color,
                      color: cat.color,
                      background: "white",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = cat.color)}
                    onMouseOut={(e) => (e.currentTarget.style.background = "white")}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
        {hasMore && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline"
          >
            Show all ({byDesc.length - LIMIT} remaining)
          </button>
        )}
      </div>
    </div>
  );
}
