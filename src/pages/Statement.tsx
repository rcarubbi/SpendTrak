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
  const search = useUIStore((s) => s.searchQuery);
  const setSearch = useUIStore((s) => s.setSearchQuery);
  const [catFilter, setCatFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [showDuplicates, setShowDuplicates] = useState(false);
  const [pendingReclass, setPendingReclass] = useState<{ tx: Transaction; newCategoryId: string } | null>(null);
  const [customKeyword, setCustomKeyword] = useState("");
  const [saveKeywordRule, setSaveKeywordRule] = useState(true);

  const cats = useCategoryStore((s) => s.categories);
  const months = useTransactionStore((s) => s.months);
  const loaded = useTransactionStore((s) => s.loaded);
  const saveMonthData = useTransactionStore((s) => s.saveMonthData);
  const deleteTx = useTransactionStore((s) => s.deleteTransaction);
  const updateCategory = useCategoryStore((s) => s.updateCategory);

  const txs = useMemo(() => Object.values(months).flatMap((m) => m.transactions), [months]);
  const dupGroups = useMemo(() => getPossibleDuplicates(txs), [txs]);

  const creditCatIds = useMemo(() => new Set(cats.filter((c) => c.type === "credit").map((c) => c.id)), [cats]);
  const debitCatIds = useMemo(() => new Set(cats.filter((c) => c.type !== "credit").map((c) => c.id)), [cats]);

  const loadedMonths = useMemo(() => Object.keys(months).toSorted(), [months]);

  const handleMergeDuplicates = useCallback(async (groupTxs: Transaction[]) => {
    const [, ...rest] = groupTxs;
    let count = 0;
    for (const tx of rest) {
      for (const monthKey of getLoadedMonths()) {
        const [year, month] = monthKey.split("-").map(Number);
        const existing = loadMonthData(year, month);
        if (existing?.transactions.some((t) => t.id === tx.id)) {
          try {
            await deleteTx(year, month, tx.id);
            count++;
          } catch { /* toast handled in store */ }
          break;
        }
      }
    }
    if (count > 0) toastSuccess(`Merged ${count} duplicate(s)`);
  }, [deleteTx]);

  const handleDelete = useCallback(async (txId: string) => {
    for (const monthKey of getLoadedMonths()) {
      const [year, month] = monthKey.split("-").map(Number);
      const existing = loadMonthData(year, month);
      if (existing?.transactions.some((t) => t.id === txId)) {
        try {
          await deleteTx(year, month, txId);
          toastSuccess("Transaction deleted");
        } catch { /* toast handled in store */ }
        break;
      }
    }
  }, [deleteTx]);

  const handleReclassify = useCallback(async (tx: Transaction, newCategoryId: string, kwOverride: string, shouldSaveKeyword: boolean) => {
    const oldCat = cats.find((c) => c.id === tx.categoryId);
    const newCat = cats.find((c) => c.id === newCategoryId);
    
    if (!oldCat || !newCat) {
      toastError("Category not found");
      return;
    }

    const monthKey = tx.date.slice(0, 7);
    const [year, month] = monthKey.split("-").map(Number);
    const existing = loadMonthData(year, month);
    
    if (!existing) {
      toastError("Transaction data not found");
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
      toastSuccess(`Reclassified to ${newCat.name}`);
    } catch (error) {
      if (shouldSaveKeyword) {
        try {
          await updateCategory(oldCat.id, { keywords: oldCat.keywords });
          await updateCategory(newCat.id, { keywords: newCat.keywords });
        } catch {
          // rollback failed — no recovery possible
        }
      }
      toastError(`Failed to reclassify transaction`, error instanceof Error ? error.stack : String(error));
      throw error;
    }
  }, [cats, updateCategory, saveMonthData]);

  const handleReclassifyTrigger = useCallback((tx: Transaction, newCategoryId: string) => {
    setPendingReclass({ tx, newCategoryId });
    setCustomKeyword("");
  }, []);

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

  const debitTotal = useMemo(() => filtered.reduce((s, t) => (debitCatIds.has(t.categoryId) ? s + t.amount : s), 0), [filtered, debitCatIds]);
  const creditTotal = useMemo(() => filtered.reduce((s, t) => (creditCatIds.has(t.categoryId) ? s + t.amount : s), 0), [filtered, creditCatIds]);

  const tagStyle = useMemo(() => catStyleTag(cats), [cats]);
  const rowRules = useMemo(() => rowClassRules(cats), [cats]);
  const autoKeyword = pendingReclass ? extractKeyword(pendingReclass.tx.description) : "";

  const handleEditDescription = useCallback(async (tx: Transaction, newDesc: string) => {
    if (newDesc === tx.description || !newDesc.trim()) return;
    const monthKey = tx.date.slice(0, 7);
    const [year, month] = monthKey.split("-").map(Number);
    const existing = loadMonthData(year, month);
    if (!existing) {
      toastError("Transaction data not found");
      return;
    }
    try {
      const updatedTx = { ...tx, description: newDesc.trim() };
      await saveMonthData({ year, month, transactions: [updatedTx], uploadedAt: existing.uploadedAt });
      toastSuccess("Description updated");
    } catch (err) {
      toastError("Failed to update description", err instanceof Error ? err.stack : String(err));
    }
  }, [saveMonthData]);

  const mainColDefs: ColDef[] = useMemo(() => [
    { field: "date", headerName: "Data", width: 110 },
    {
      field: "description", headerName: "Description", flex: 2, minWidth: 200,
      cellRenderer: (p: { data: Transaction }) => (
        <EditableDescriptionCell data={p.data} onEdit={handleEditDescription} />
      ),
    },
    {
      field: "amount", headerName: "Amount", width: 100, type: "rightAligned",
      valueFormatter: (p) => `£${p.value?.toFixed(2) ?? "0.00"}`,
    },
    {
      field: "categoryId", headerName: "Category", width: 160,
      cellRenderer: (p: { data: Transaction }) => (
        <CategorySelectCell data={p.data} categories={cats} onReclassify={handleReclassifyTrigger} />
      ),
    },
    {
      field: "categoryId", headerName: "Type", width: 90,
      cellRenderer: (p: { data: Transaction }) => (
        <TransactionTypeCell categoryId={p.data.categoryId} creditCatIds={creditCatIds} />
      ),
    },
    { field: "source", headerName: "File", width: 150 },
  ], [cats, creditCatIds, handleEditDescription, handleReclassifyTrigger]);

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <style>{tagStyle}</style>
      <StatementHeader
        dupGroupsLength={dupGroups.length}
        debitTotal={debitTotal}
        creditTotal={creditTotal}
      />

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
          loading={!loaded}
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
