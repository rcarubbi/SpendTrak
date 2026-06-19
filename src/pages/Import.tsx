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
  const [showConfirm, setShowConfirm] = useState(false);

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
      setStatus("");
    } else if (!hasError) {
      setStatus("No transactions found in selected files.");
    }

    setLoading(false);
    setDragging(false);
  }, [selectedProvider, cats, providers]);

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

      const msg = `Imported ${pending.transactions.length} transactions across ${byMonth.size} months via ${pending.provider}`;
      setStatus(msg);
      toastSuccess(msg);
      setDebug(pending.debug);
      setPending(null);
    } catch (err) {
      const msg = `Error saving: ${err instanceof Error ? err.message : String(err)}`;
      setStatus(msg);
      toastError(msg, err instanceof Error ? err.stack : String(err));
    }
  }, [pending, saveMonthData]);

  const handleCancel = () => {
    setShowConfirm(true);
  };

  const handleConfirmDiscard = () => {
    setPending(null);
    setStatus("");
    setDebug("");
    setShowConfirm(false);
  };

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
    <div className="flex flex-col flex-1 overflow-auto gap-6">
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
          <ProviderSelector
            selectedProvider={selectedProvider}
            providers={providers}
            onChange={setSelectedProvider}
          />
        </div>
        <FileDropZone
          dragging={dragging}
          providers={providers}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onFilesSelected={processFiles}
        />
      </div>

      {/* Status */}
      <UploadStatusBanner status={status} loading={loading} />

      {/* Preview */}
      <PreviewSection
        pending={pending}
        pendingDuplicates={pendingDuplicates}
        rowClassRules={uploadRowClassRules}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      {/* Debug */}
      <DebugSection debug={debug} />

      <ConfirmModal
        show={showConfirm}
        title="Discard preview?"
        message="This will discard all parsed transactions. You can re-upload files later."
        confirmLabel="Discard"
        variant="danger"
        onConfirm={handleConfirmDiscard}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}
