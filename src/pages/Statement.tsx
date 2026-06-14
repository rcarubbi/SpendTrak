import { useState, useMemo, useCallback } from "react";
import { useCategoryStore } from "../stores/categoryStore";
import { useTransactionStore, getLoadedMonths, loadMonthData } from "../stores/transactionStore";
import { useUIStore } from "../stores/uiStore";
import type { Transaction } from "../types";
import CategoryBadge from "../components/CategoryBadge";
import DataGrid from "../components/DataGrid";
import type { ColDef } from "ag-grid-community";
import { catStyleTag, rowClassRules } from "../utils/styleUtils";

export default function Statement() {
  const search = useUIStore((s) => s.searchQuery);
  const setSearch = useUIStore((s) => s.setSearchQuery);
  const [catFilter, setCatFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [showDuplicates, setShowDuplicates] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingReclass, setPendingReclass] = useState<{ tx: Transaction; newCategoryId: string } | null>(null);
  const [modalSaveKeyword, setModalSaveKeyword] = useState(false);

  const cats = useCategoryStore((s) => s.categories);
  const months = useTransactionStore((s) => s.months);
  const saveMonthData = useTransactionStore((s) => s.saveMonthData);
  const deleteTx = useTransactionStore((s) => s.deleteTransaction);
  const reclassifyAll = useTransactionStore((s) => s.reclassifyAll);
  const updateCategory = useCategoryStore((s) => s.updateCategory);

  const txs = useMemo(() => Object.values(months).flatMap((m) => m.transactions), [months]);
  const dupGroups = useMemo(() => {
    const groups = new Map<string, Transaction[]>();
    for (const tx of txs) {
      const key = `${tx.date}|${tx.description.toUpperCase()}|${tx.amount}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(tx);
    }
    return Array.from(groups.entries())
      .filter(([, g]) => {
        const sources = new Set(g.map((t) => t.source));
        return sources.size > 1 || g.length > 1;
      })
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([key, g]) => ({
        key,
        txs: g,
        sources: [...new Set(g.map((t) => t.source))],
      }));
  }, [txs]);

  const creditCatIds = useMemo(() => new Set(cats.filter((c) => c.type === "credit").map((c) => c.id)), [cats]);
  const debitCatIds = useMemo(() => new Set(cats.filter((c) => c.type !== "credit").map((c) => c.id)), [cats]);

  const loadedMonths = useMemo(() => Object.keys(months).sort(), [months]);

  const debitTotal = useMemo(() => txs.reduce((s, t) => (debitCatIds.has(t.categoryId) ? s + t.amount : s), 0), [txs, debitCatIds]);
  const creditTotal = useMemo(() => txs.reduce((s, t) => (creditCatIds.has(t.categoryId) ? s + t.amount : s), 0), [txs, creditCatIds]);

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

  const handleReclassify = useCallback(async (tx: Transaction, newCategoryId: string, saveKw: boolean) => {
    if (saveKw) {
      const oldCat = cats.find((c) => c.id === tx.categoryId);
      const newCat = cats.find((c) => c.id === newCategoryId);
      if (oldCat && newCat) {
        const matching = oldCat.keywords.filter((k) => tx.description.toUpperCase().includes(k.toUpperCase()));
        if (matching.length > 0) {
          await updateCategory(oldCat.id, { keywords: oldCat.keywords.filter((k) => !matching.includes(k)) });
        }
        const words = tx.description.split(/\s+/);
        const stopWords = new Set(["ON", "THE", "AND", "FOR", "WITH", "LIMITED", "LTD", "LIMIT", "UK"]);
        let keyword = words.find((w) => w.length > 3 && !stopWords.has(w.toUpperCase()));
        if (!keyword) keyword = words[0];
        if (keyword) {
          const kw = keyword.toUpperCase();
          if (!newCat.keywords.some((k) => k.toUpperCase() === kw)) {
            await updateCategory(newCat.id, { keywords: [...newCat.keywords, kw] });
          }
        }
      }
    }
    const updatedTx = { ...tx, categoryId: newCategoryId, manual: true };
    const monthKey = tx.date.slice(0, 7);
    const [year, month] = monthKey.split("-").map(Number);
    const existing = loadMonthData(year, month);
    if (existing) {
      await saveMonthData({ year, month, transactions: [updatedTx], uploadedAt: existing.uploadedAt });
    }
  }, [cats, updateCategory, saveMonthData]);

  const confirmReclassify = useCallback(async () => {
    if (!pendingReclass) return;
    await handleReclassify(pendingReclass.tx, pendingReclass.newCategoryId, modalSaveKeyword);
    setPendingReclass(null);
  }, [pendingReclass, modalSaveKeyword, handleReclassify]);

  const handleReclassifyAll = useCallback(async () => {
    setLoading(true);
    await reclassifyAll(cats);
    setLoading(false);
  }, [cats, reclassifyAll]);

  const filtered = useMemo(() => {
    let result = [...txs];
    if (search) {
      const q = search.toUpperCase();
      result = result.filter((tx) => tx.description.includes(q));
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

  const mainColDefs: ColDef[] = [
    { field: "date", headerName: "Data", width: 110 },
    { field: "description", headerName: "Descrição", flex: 2, minWidth: 200 },
    {
      field: "amount", headerName: "Valor", width: 100, type: "rightAligned",
      valueFormatter: (p) => `£${p.value?.toFixed(2) ?? "0.00"}`,
    },
    {
      field: "categoryId", headerName: "Categoria", width: 160,
      cellRenderer: (p: { data: Transaction }) => (
        <select
          value={p.data.categoryId}
          onChange={(e) => {
            if (e.target.value !== p.data.categoryId) {
              setPendingReclass({ tx: p.data, newCategoryId: e.target.value });
              (e.target as HTMLSelectElement).value = p.data.categoryId;
            }
          }}
          className="text-xs border border-gray-300 rounded px-1 py-0.5 w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      ),
    },
    {
      field: "categoryId", headerName: "Tipo", width: 90,
      cellRenderer: (p: { data: Transaction }) =>
        creditCatIds.has(p.data.categoryId)
          ? <span className="text-green-600 font-semibold text-xs">CRÉDITO</span>
          : <span className="text-red-600 font-semibold text-xs">DÉBITO</span>,
    },
    { field: "source", headerName: "Arquivo", width: 150 },
  ];

  return (
    <div>
      <style>{tagStyle}</style>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold dark:text-gray-100">
          Extrato
          {dupGroups.length > 0 && (
            <span className="text-sm font-normal text-amber-600 ml-3">
              {dupGroups.length} grupo(s) com possíveis duplicatas
            </span>
          )}
        </h1>
        <div className="text-gray-500 text-sm text-right">
          <div>Despesas: £{debitTotal.toLocaleString()}</div>
          {creditTotal > 0 && <div className="text-green-600">Receita: £{Math.round(creditTotal).toLocaleString()}</div>}
        </div>
      </div>

      <div className="flex gap-3 mb-4 items-center flex-wrap">
        <input
          placeholder="Buscar descrição..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[150px] px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">Todos meses</option>
          {loadedMonths.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">Todas categorias</option>
          {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button
          onClick={() => setShowDuplicates((d) => !d)}
          className={`px-3 py-2 rounded-md text-sm font-semibold border cursor-pointer transition-colors ${
            showDuplicates
              ? "bg-amber-100 border-amber-300 text-amber-800"
              : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
          }`}
        >
          {showDuplicates ? "⇤ Ver todas" : `⚠ Duplicatas (${dupGroups.length})`}
        </button>
        <button
          onClick={handleReclassifyAll}
          disabled={loading}
          className="px-3 py-2 rounded-md text-sm font-semibold border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer disabled:opacity-50"
        >
          Reclassificar tudo
        </button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 mb-4 text-sm text-blue-700">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          Reclassificando transações...
        </div>
      )}

      {showDuplicates ? (
        <div className="flex flex-col gap-3">
          {dupGroups.length === 0 && (
            <p className="text-center text-gray-400 mt-8">Nenhuma duplicata encontrada</p>
          )}
          {dupGroups.map((group) => (
            <div key={group.key} className="border border-amber-200 rounded-lg bg-amber-50 overflow-hidden">
              <div className="px-3 py-2 bg-amber-100 text-xs font-semibold text-amber-800 border-b border-amber-200 flex justify-between">
                <span>
                  {group.txs[0].date} · {group.txs[0].description} · £{group.txs[0].amount.toFixed(2)}
                </span>
                <span>{group.txs.length} entrada(s) · {group.sources.join(", ")}</span>
              </div>
              <div className="p-1">
                <DataGrid
                  rows={group.txs}
                  colDefs={[
                    { field: "source", headerName: "Arquivo", width: 140 },
                    { field: "account", headerName: "Conta", width: 120 },
                    {
                      field: "amount", headerName: "Valor", width: 90, type: "rightAligned",
                      valueFormatter: (p) => `£${p.value?.toFixed(2) ?? "0.00"}`,
                    },
                    {
                      field: "categoryId", headerName: "Categoria", width: 120,
                      cellRenderer: (p: { value: string }) => <CategoryBadge categoryId={p.value} />,
                    },
                    {
                      headerName: "", width: 80, sortable: false, filter: false,
                      cellRenderer: (p: { data: Transaction }) => (
                        <button
                          onClick={() => handleDelete(p.data.id)}
                          className="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer"
                        >
                          Remover
                        </button>
                      ),
                    },
                  ]}
                  height={group.txs.length * 40 + 50}
                  exportFilename={`duplicata-${group.txs[0].date}`}
                  rowClassRules={rowRules}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <DataGrid
          rows={filtered}
          colDefs={mainColDefs}
          height={Math.max(200, Math.min(600, filtered.length * 36 + 50))}
          exportFilename="extrato-completo"
          rowClassRules={rowRules}
        />
      )}

      {!showDuplicates && filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-8">Nenhuma transação encontrada</p>
      )}

      {pendingReclass && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setPendingReclass(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-2 dark:text-gray-100">Reclassificar transação</h3>
            <p className="text-sm text-gray-500 mb-1">{pendingReclass.tx.date}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 font-medium">{pendingReclass.tx.description.slice(0, 100)}</p>
            <div className="flex items-center gap-2 mb-4">
              <CategoryBadge categoryId={pendingReclass.tx.categoryId} />
              <span className="text-gray-400">→</span>
              <CategoryBadge categoryId={pendingReclass.newCategoryId} />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-4 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={modalSaveKeyword}
                onChange={(e) => setModalSaveKeyword(e.target.checked)}
                className="accent-blue-600"
              />
              Salvar regra (auto-classificar futuros)
            </label>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setPendingReclass(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmReclassify}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
