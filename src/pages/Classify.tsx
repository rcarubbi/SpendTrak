import { useState, useMemo, useCallback } from "react";
import { useCategoryStore } from "../stores/categoryStore";
import { useTransactionStore } from "../stores/transactionStore";
import type { Transaction } from "../types";
import { extractKeyword } from "../utils/classify";

export default function Classify() {
  const cats = useCategoryStore((s) => s.categories);
  const months = useTransactionStore((s) => s.months);
  const doSaveMonthData = useTransactionStore((s) => s.saveMonthData);
  const updateCategory = useCategoryStore((s) => s.updateCategory);

  const [oneOff, setOneOff] = useState<Record<string, boolean>>({});
  const [showAll, setShowAll] = useState(false);
  const unknown = useMemo(
    () => Object.values(months).flatMap((m) => m.transactions).filter((tx) => tx.categoryId === "outros"),
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
    if (!cat) return;

    if (saveKeyword) {
      const keyword = extractKeyword(description);
      if (keyword && !cat.keywords.includes(keyword)) {
        await updateCategory(catId, { keywords: [...cat.keywords, keyword] });
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
  }, [byDesc, cats, updateCategory, doSaveMonthData]);

  if (unknown.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">Classificar</h1>
        <p className="text-gray-500 dark:text-gray-400">Nenhuma transação não classificada.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold dark:text-gray-100">Classificar ({unknown.length})</h1>
      </div>

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
                    type="checkbox"
                    checked={!isOneOff}
                    onChange={() => setOneOff((prev) => ({ ...prev, [desc]: !isOneOff }))}
                    className="w-3.5 h-3.5"
                  />
                  Auto
                </label>
              </div>
              <div className="flex gap-1 flex-wrap">
                {cats.filter((c) => c.id !== "outros" && c.id !== "receita").map((cat) => (
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
            Mostrar todas ({byDesc.length - LIMIT} restantes)
          </button>
        )}
      </div>
    </div>
  );
}
