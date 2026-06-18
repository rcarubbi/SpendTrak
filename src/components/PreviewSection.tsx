import type { Transaction } from "../types";
import type { ColDef } from "ag-grid-community";
import CategoryBadge from "./CategoryBadge";
import DataGrid from "./DataGrid";

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

interface PreviewSectionProps {
  pending: {
    transactions: Transaction[];
    months: string[];
    total: number;
    provider: string;
    debug: string;
  } | null;
  pendingDuplicates: Transaction[];
  rowClassRules: Record<string, (params: { data: unknown }) => boolean>;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function PreviewSection({ pending, pendingDuplicates, rowClassRules, onConfirm, onCancel }: PreviewSectionProps) {
  if (!pending) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold dark:text-gray-100">
          Preview — {pending.transactions.length} transactions, {pending.months.length} months
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md text-sm text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
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
        rowClassRules={rowClassRules}
      />
    </div>
  );
}
