import { useState, useMemo, useCallback } from "react";
import { useCategoryStore } from "../stores/categoryStore";
import { useTransactionStore, getLoadedMonths, loadMonthData, getPossibleDuplicates } from "../stores/transactionStore";
import { useUIStore } from "../stores/uiStore";
import type { Transaction } from "../types";
import DataGrid from "../components/DataGrid";
import FilterBar from "../components/FilterBar";
import DuplicatePanel from "../components/DuplicatePanel";
import ReclassifyModal from "../components/ReclassifyModal";
import type { ColDef } from "ag-grid-community";
import { catStyleTag, rowClassRules } from "../utils/styleUtils";
import { extractKeyword, matchKeyword } from "../utils/classify";

export default function Statement() {
  const search = useUIStore((s) => s.searchQuery);
  const setSearch = useUIStore((s) => s.setSearchQuery);
  const [catFilter, setCatFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [showDuplicates, setShowDuplicates] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reclassProgress, setReclassProgress] = useState<{ done: number; total: number } | null>(null);
  const [pendingReclass, setPendingReclass] = useState<{ tx: Transaction; newCategoryId: string } | null>(null);
  const [customKeyword, setCustomKeyword] = useState("");
  const [saveKeywordRule, setSaveKeywordRule] = useState(true);

  const cats = useCategoryStore((s) => s.categories);
  const months = useTransactionStore((s) => s.months);
  const loaded = useTransactionStore((s) => s.loaded);
  const saveMonthData = useTransactionStore((s) => s.saveMonthData);
  const deleteTx = useTransactionStore((s) => s.deleteTransaction);
  const reclassifyAll = useTransactionStore((s) => s.reclassifyAll);
  const updateCategory = useCategoryStore((s) => s.updateCategory);

  const txs = useMemo(() => Object.values(months).flatMap((m) => m.transactions), [months]);
  const dupGroups = useMemo(() => getPossibleDuplicates(), [txs]);

  const creditCatIds = useMemo(() => new Set(cats.filter((c) => c.type === "credit").map((c) => c.id)), [cats]);
  const debitCatIds = useMemo(() => new Set(cats.filter((c) => c.type !== "credit").map((c) => c.id)), [cats]);

  const loadedMonths = useMemo(() => Object.keys(months).sort(), [months]);

  const debitTotal = useMemo(() => txs.reduce((s, t) => (debitCatIds.has(t.categoryId) ? s + t.amount : s), 0), [txs, debitCatIds]);
  const creditTotal = useMemo(() => txs.reduce((s, t) => (creditCatIds.has(t.categoryId) ? s + t.amount : s), 0), [txs, creditCatIds]);

  const handleMergeDuplicates = useCallback(async (groupTxs: Transaction[]) => {
    const [, ...rest] = groupTxs;
    for (const tx of rest) {
      for (const monthKey of getLoadedMonths()) {
        const [year, month] = monthKey.split("-").map(Number);
        const existing = loadMonthData(year, month);
        if (existing?.transactions.some((t) => t.id === tx.id)) {
          await deleteTx(year, month, tx.id);
          break;
        }
      }
    }
  }, [deleteTx]);

  const handleDelete = useCallback(async (txId: string) => {
    for (const monthKey of getLoadedMonths()) {
      const [year, month] = monthKey.split("-").map(Number);
      const existing = loadMonthData(year, month);
      if (existing?.transactions.some((t) => t.id === txId)) {
        await deleteTx(year, month, txId);
        break;
      }
    }
  }, [deleteTx]);

  const handleReclassify = useCallback(async (tx: Transaction, newCategoryId: string, kwOverride: string, shouldSaveKeyword: boolean) => {
    const oldCat = cats.find((c) => c.id === tx.categoryId);
    const newCat = cats.find((c) => c.id === newCategoryId);
    
    if (!oldCat || !newCat) {
      return;
    }

    const monthKey = tx.date.slice(0, 7);
    const [year, month] = monthKey.split("-").map(Number);
    const existing = loadMonthData(year, month);
    
    if (!existing) {
      return;
    }

    try {
      // Only manage keywords if shouldSaveKeyword is true
      if (shouldSaveKeyword) {
        const matching = oldCat.keywords.filter((k) => matchKeyword(tx.description, k));

        // Remove keywords from old category
        if (matching.length > 0) {
          const removedKeywords = oldCat.keywords.filter((k) => !matching.includes(k));
          await updateCategory(oldCat.id, { keywords: removedKeywords });
        }

        // Add keyword to new category
        const keyword = kwOverride || extractKeyword(tx.description);
        if (keyword) {
          const kw = keyword.toUpperCase();
          const existingNormalized = newCat.keywords.map((k) => k.toUpperCase());
          if (!existingNormalized.includes(kw)) {
            await updateCategory(newCat.id, { keywords: [...newCat.keywords, kw] });
          }
        }
      }

      // Save transaction
      const updatedTx = { ...tx, categoryId: newCategoryId, manual: true };
      await saveMonthData({ year, month, transactions: [updatedTx], uploadedAt: existing.uploadedAt });
    } catch (error) {
      if (shouldSaveKeyword) {
        try {
          await updateCategory(oldCat.id, { keywords: oldCat.keywords });
          await updateCategory(newCat.id, { keywords: newCat.keywords });
        } catch {
          // rollback failed — no recovery possible
        }
      }
      throw error;
    }
  }, [cats, updateCategory, saveMonthData]);

  const confirmReclassify = useCallback(async () => {
    if (!pendingReclass) return;
    try {
      await handleReclassify(pendingReclass.tx, pendingReclass.newCategoryId, customKeyword, saveKeywordRule);
      setPendingReclass(null);
      setCustomKeyword("");
      setSaveKeywordRule(true);
    } catch {
      // Modal stays open for retry
    }
  }, [pendingReclass, customKeyword, saveKeywordRule, handleReclassify]);

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
    } catch {
      // swallow — progress clears in finally
    } finally {
      setReclassProgress(null);
      setLoading(false);
    }
  }, []);

  const filtered = useMemo(() => {
    let result = [...txs];
    if (search) {
      const q = search.toUpperCase();
      result = result.filter((tx) => tx.description.toUpperCase().includes(q));
    }
    if (catFilter !== "all") {
      result = result.filter((tx) => tx.categoryId === catFilter);
    }
    if (monthFilter !== "all") {
      result = result.filter((tx) => tx.date.startsWith(monthFilter));
    }
    return result;
  }, [txs, search, catFilter, monthFilter]);

  const tagStyle = useMemo(() => catStyleTag(cats), [cats]);
  const rowRules = useMemo(() => rowClassRules(cats), [cats]);
  const autoKeyword = pendingReclass ? extractKeyword(pendingReclass.tx.description) : "";

  const handleEditDescription = useCallback(async (tx: Transaction, newDesc: string) => {
    if (newDesc === tx.description || !newDesc.trim()) return;
    const monthKey = tx.date.slice(0, 7);
    const [year, month] = monthKey.split("-").map(Number);
    const existing = loadMonthData(year, month);
    if (!existing) {
      return;
    }
    try {
      const updatedTx = { ...tx, description: newDesc.trim() };
      await saveMonthData({ year, month, transactions: [updatedTx], uploadedAt: existing.uploadedAt });
    } catch {
      // swallow — description update not critical
    }
  }, [saveMonthData]);

  const mainColDefs: ColDef[] = [
    { field: "date", headerName: "Data", width: 110 },
    {
      field: "description", headerName: "Description", flex: 2, minWidth: 200,
       cellRenderer: (p: { data: Transaction }) => (
         <input
           id={`description-input-${p.data.id}`}
           name={`description-${p.data.id}`}
           defaultValue={p.data.description}
           onBlur={(e) => handleEditDescription(p.data, e.target.value)}
           className="w-full bg-transparent border-none outline-none text-sm"
           style={{ color: "inherit" }}
            aria-label="Edit description"
           onClick={(e) => e.stopPropagation()}
         />
      ),
    },
    {
      field: "amount", headerName: "Amount", width: 100, type: "rightAligned",
      valueFormatter: (p) => `£${p.value?.toFixed(2) ?? "0.00"}`,
    },
    {
      field: "categoryId", headerName: "Category", width: 160,
       cellRenderer: (p: { data: Transaction }) => (
         <select
           id={`category-select-${p.data.id}`}
           name={`category-${p.data.id}`}
           value={p.data.categoryId}
           onChange={(e) => {
               if (e.target.value !== p.data.categoryId) {
                 setPendingReclass({ tx: p.data, newCategoryId: e.target.value });
                 setCustomKeyword("");
                 (e.target as HTMLSelectElement).value = p.data.categoryId;
             }
           }}
           className="text-xs border border-gray-300 dark:border-gray-600 rounded px-1 py-0.5 w-full bg-transparent"
           style={{ color: "inherit" }}
           onClick={(e) => e.stopPropagation()}
         >
          {cats.map((c) => (
            <option key={c.id} value={c.id} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              {c.name}
            </option>
          ))}
        </select>
      ),
    },
    {
      field: "categoryId", headerName: "Type", width: 90,
      cellRenderer: (p: { data: Transaction }) =>
        creditCatIds.has(p.data.categoryId)
          ? <span className="text-green-600 font-semibold text-xs">CREDIT</span>
          : <span className="text-red-600 font-semibold text-xs">DEBIT</span>,
    },
    { field: "source", headerName: "File", width: 150 },
  ];

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <style>{tagStyle}</style>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold dark:text-white">
          Statement
          {dupGroups.length > 0 && (
            <span className="text-sm font-normal text-amber-600 ml-3">
              {dupGroups.length} group(s) with possible duplicates
            </span>
          )}
        </h1>
        <div className="text-gray-500 dark:text-white text-sm text-right">
          <div>Expenses: £{debitTotal.toLocaleString()}</div>
          {creditTotal > 0 && <div className="text-green-600">Income: £{Math.round(creditTotal).toLocaleString()}</div>}
        </div>
      </div>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        monthFilter={monthFilter}
        onMonthFilterChange={setMonthFilter}
        loadedMonths={loadedMonths}
        catFilter={catFilter}
        onCatFilterChange={setCatFilter}
        cats={cats}
        showDuplicates={showDuplicates}
        onToggleDuplicates={() => setShowDuplicates((d) => !d)}
        dupCount={dupGroups.length}
        onReclassifyAll={handleReclassifyAll}
        reclassLoading={loading}
        reclassProgress={reclassProgress}
      />

      {showDuplicates ? (
        <DuplicatePanel
          groups={dupGroups}
          onMerge={handleMergeDuplicates}
          onDelete={handleDelete}
          rowClassRules={rowRules}
        />
      ) : (
        <DataGrid
          rows={filtered}
          colDefs={mainColDefs}
          exportFilename="full-statement"
          rowClassRules={rowRules}
          loading={loading || !loaded}
          fillHeight
        />
      )}

      {!showDuplicates && filtered.length === 0 && (
        <p className="text-center text-gray-400 dark:text-white mt-8">No transactions found</p>
      )}

      {pendingReclass && (
        <ReclassifyModal
          tx={pendingReclass.tx}
          newCategoryId={pendingReclass.newCategoryId}
          customKeyword={customKeyword}
          onCustomKeywordChange={setCustomKeyword}
          autoKeyword={autoKeyword}
          saveKeyword={saveKeywordRule}
          onSaveKeywordChange={setSaveKeywordRule}
          onConfirm={confirmReclassify}
          onCancel={() => { setPendingReclass(null); setCustomKeyword(""); setSaveKeywordRule(true); }}
        />
      )}
    </div>
  );
}
