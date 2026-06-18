import { useState, useMemo, useCallback } from "react";
import { useCategoryStore } from "../stores/categoryStore";
import { useTransactionStore } from "../stores/transactionStore";
import type { Transaction } from "../types";
import { extractKeyword } from "../utils/classify";
import { CATEGORY_IDS } from "../constants";
import ClassifyHeader from "../components/ClassifyHeader";
import ClassifyCard from "../components/ClassifyCard";

export default function Classify() {
  const cats = useCategoryStore((s) => s.categories);
  const months = useTransactionStore((s) => s.months);
  const doSaveMonthData = useTransactionStore((s) => s.saveMonthData);
  const updateCategory = useCategoryStore((s) => s.updateCategory);
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

  const classifyCats = useMemo(
    () => cats.filter((c) => c.id !== CATEGORY_IDS.OTHER && c.id !== CATEGORY_IDS.INCOME),
    [cats]
  );

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
      <ClassifyHeader unknownCount={unknown.length} loading={loading} onReclassifyAll={handleReclassifyAll} />
      {loading && (
        <div className="flex items-center gap-2 mb-4 text-sm text-blue-700">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0" />
          {reclassProgress
            ? `Reclassifying... ${reclassProgress.done}/${reclassProgress.total}`
            : "Reclassifying transactions..."}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {visible.map(([desc, info]) => (
          <ClassifyCard
            key={desc}
            desc={desc}
            count={info.count}
            total={info.total}
            isOneOff={oneOff[desc] ?? false}
            customKeyword={customKeywords[desc] ?? ""}
            categories={classifyCats}
            onToggleOneOff={(d) => setOneOff((prev) => ({ ...prev, [d]: !prev[d] }))}
            onKeywordChange={(d, v) => setCustomKeywords((prev) => ({ ...prev, [d]: v }))}
            onClassify={handleClassify}
          />
        ))}
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
