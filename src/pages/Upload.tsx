import { useCallback, useMemo, useRef, useState } from "react";
import { useCategoryStore } from "../stores/categoryStore";
import { classify } from "../utils/classify";
import { useTransactionStore } from "../stores/transactionStore";
import type { Transaction } from "../types";
import CategoryBadge from "../components/CategoryBadge";
import DataGrid from "../components/DataGrid";
import type { ColDef } from "ag-grid-community";
import { getProviders, detectProvider } from "../providers";
import type { UploadProvider } from "../providers/types";
import { catStyleTag, rowClassRules } from "../utils/styleUtils";

export default function Upload() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedProvider, setSelectedProvider] = useState("auto");
  const [pending, setPending] = useState<{
    transactions: Transaction[];
    months: string[];
    total: number;
    provider: string;
    debug: string;
  } | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [debug, setDebug] = useState("");
  const [dragging, setDragging] = useState(false);

  const cats = useCategoryStore((s) => s.categories);
  const months = useTransactionStore((s) => s.months);
  const saveMonthData = useTransactionStore((s) => s.saveMonthData);

  const providers = getProviders();

  const processFiles = useCallback(async (files: FileList) => {
    if (files.length === 0) return;

    if (cats.length === 0) {
      setStatus("Categories not loaded yet. Please wait and try again.");
      setLoading(false);
      return;
    }

    setStatus(`Reading ${files.length} file(s)...`);
    setLoading(true);
    setDebug("");
    setPending(null);

    const allTxs: Transaction[] = [];
    const allMonths = new Set<string>();
    let totalDebit = 0;
    const debugLogs: string[] = [];
    let providerName = "";
    let hasError = false;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setStatus(`Processing ${file.name} (${i + 1}/${files.length})...`);

      let provider: UploadProvider | undefined;

      if (selectedProvider === "auto") {
        provider = detectProvider(file.name);
        if (!provider) {
          setStatus(`No provider found for "${file.name}"`);
          hasError = true;
          continue;
        }
      } else {
        provider = providers.find((p) => p.id === selectedProvider);
        if (!provider) {
          setStatus("Invalid provider");
          hasError = true;
          continue;
        }
      }

      providerName = provider.name;

      try {
        const result = await provider.parse(file);
        const creditCatIds = new Set(cats.filter((c) => c.type === "credit").map((c) => c.id));
        const txs = result.transactions.map((tx) => ({
          ...tx,
          categoryId: classify(tx.description, cats),
          source: file.name,
        }));
        const debitTotal = txs.reduce((s, t) => (creditCatIds.has(t.categoryId) ? s : s + t.amount), 0);

        allTxs.push(...txs);
        for (const m of result.months) allMonths.add(m);
        totalDebit += debitTotal;
        if (result.debug) debugLogs.push(`--- ${file.name} ---\n${result.debug}`);
      } catch (err) {
        setStatus(`Error in ${file.name}: ${err instanceof Error ? err.message : String(err)}`);
        hasError = true;
      }
    }

    if (allTxs.length > 0) {
      setPending({
        transactions: allTxs,
        months: Array.from(allMonths).sort(),
        total: totalDebit,
        provider: providerName,
        debug: debugLogs.join("\n\n"),
      });
      setStatus(`Ready to import: ${allTxs.length} transactions across ${allMonths.size} months`);
    } else if (!hasError) {
      setStatus("No transactions found in selected files.");
    }

    setLoading(false);
    setDragging(false);
    if (fileRef.current) fileRef.current.value = "";
  }, [selectedProvider, cats, providers]);

  const handleParse = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files);
  }, [processFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleConfirm = useCallback(async () => {
    if (!pending) return;

    setStatus("Saving...");

    try {
      const byMonth = new Map<string, Transaction[]>();
      for (const tx of pending.transactions) {
        const key = tx.date.slice(0, 7);
        if (!byMonth.has(key)) byMonth.set(key, []);
        byMonth.get(key)!.push(tx);
      }

      for (const [key, monthTxs] of byMonth) {
        const [yearStr, monthStr] = key.split("-");
        await saveMonthData({
          year: parseInt(yearStr),
          month: parseInt(monthStr),
          transactions: monthTxs,
          uploadedAt: new Date().toISOString(),
        });
      }

      setStatus(`Imported: ${pending.transactions.length} transactions across ${byMonth.size} months via ${pending.provider}`);
      setDebug(pending.debug);
      setPending(null);
    } catch (err) {
      setStatus(`Error saving: ${err instanceof Error ? err.message : String(err)}`);
    }
  }, [pending, saveMonthData]);

  const handleCancel = () => {
    if (!confirm("Discard preview?")) return;
    setPending(null);
    setStatus("");
    setDebug("");
  };

  const previewColDefs: ColDef[] = [
    { field: "date", headerName: "Data", width: 110 },
    { field: "description", headerName: "Description", flex: 2, minWidth: 200 },
    {
      field: "amount", headerName: "Amount", width: 100, type: "rightAligned",
      valueFormatter: (p) => `£${p.value?.toFixed(2) ?? "0.00"}`,
    },
    {
      field: "categoryId", headerName: "Category", width: 140,
      cellRenderer: (p: { value: string }) => <CategoryBadge categoryId={p.value} />,
    },
  ];

  const allTxs = useMemo(() => Object.values(months).flatMap((m) => m.transactions), [months]);

  const creditCatIds = useMemo(() => new Set(cats.filter((c) => c.type === "credit").map((c) => c.id)), [cats]);
  const debitTotal = useMemo(
    () => allTxs.reduce((s, t) => (creditCatIds.has(t.categoryId) ? s : s + t.amount), 0),
    [allTxs, creditCatIds]
  );

  const tagStyle = useMemo(() => catStyleTag(cats), [cats]);
  const uploadRowClassRules = useMemo(() => rowClassRules(cats), [cats]);

  const pendingDuplicates = useMemo(() => {
    if (!pending) return [];
    const existingTxs = Object.values(months).flatMap((m) => m.transactions);
    const existingKeys = new Set(
      existingTxs.map((tx) => `${tx.date}|${tx.description.toUpperCase()}|${tx.amount}`)
    );
    return pending.transactions.filter((tx) =>
      existingKeys.has(`${tx.date}|${tx.description.toUpperCase()}|${tx.amount}`)
    );
  }, [pending, months]);

  return (
    <div>
      <style>{tagStyle}</style>
      <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">Upload</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        {allTxs.length} transactions loaded · Total: £{debitTotal.toLocaleString()}
      </p>

      <div className="flex gap-3 items-center mb-4">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Provider:</label>
        <select
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
        >
          <option value="auto">Auto-detect</option>
          {providers.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <label
        className={`border-2 border-dashed rounded-xl p-10 text-center mb-6 block cursor-pointer transition-colors ${
          dragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-base text-gray-500 dark:text-gray-400 mb-3">
          {dragging ? "Drop files here" : "Drag files or click to select"}
        </p>
        <span className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
          Select files
        </span>
         <input
           id="file-upload"
           name="fileInput"
           ref={fileRef}
           type="file"
           multiple
           accept={providers.map((p) => p.accept).join(",")}
           onChange={handleParse}
           className="hidden"
         />
      </label>

      {status && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-lg mb-4 text-sm font-semibold ${
          status.startsWith("Error")
            ? "bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300"
            : status.startsWith("Imported") || status.startsWith("Saving")
            ? "bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300"
            : "bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300"
        }`}>
          {loading && <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />}
          {status}
        </div>
      )}

      {pending && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold dark:text-gray-100">
              Preview — {pending.transactions.length} transactions, {pending.months.length} months
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md text-sm text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors"
              >
                Confirm import
              </button>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mb-3">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">£{pending.total.toLocaleString()} in debits</span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            {pending.months.map((m) => (
              <span key={m} className="bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded text-xs font-medium dark:text-blue-200">{m}</span>
            ))}
          </div>

          {pendingDuplicates.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg mb-4 text-sm font-semibold bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
              ⚠ {pendingDuplicates.length} transaction(s) already exist in loaded data
            </div>
          )}

          <DataGrid
            rows={pending.transactions}
            exportFilename={`preview-${pending.provider.replace(/\s+/g, "-")}`}
            colDefs={previewColDefs}
            height={400}
            rowClassRules={uploadRowClassRules}
          />
        </div>
      )}

      {debug && (
        <details className="mb-4 text-xs text-gray-500 dark:text-gray-400">
          <summary className="cursor-pointer font-semibold">Debug</summary>
          <pre className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 max-h-40 overflow-auto whitespace-pre-wrap dark:text-gray-300">{debug}</pre>
        </details>
      )}
    </div>
  );
}
