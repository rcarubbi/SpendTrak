import { useRef, useState, useEffect } from "react";
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
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridHeight, setGridHeight] = useState(400);

  useEffect(() => {
    const calc = () => {
      if (!gridRef.current) return;
      const rect = gridRef.current.getBoundingClientRect();
      setGridHeight(Math.max(100, Math.floor(window.innerHeight - rect.top - 24)));
    };

    calc();
    const ro = new ResizeObserver(calc);
    if (gridRef.current) ro.observe(gridRef.current);
    window.addEventListener("resize", calc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, [pending]);

  if (!pending) return null;

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 md:p-5">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Preview
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {pending.transactions.length} transactions · {pending.months.length} months · {pending.provider}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg text-sm text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-semibold cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              Import
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap mb-4">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">£{pending.total.toLocaleString()}</span>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          {pending.months.map((m) => (
            <span key={m} className="bg-blue-100/80 dark:bg-blue-900/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/30">{m}</span>
          ))}
        </div>

        <div className="flex items-center gap-2 px-4 py-3 rounded-xl mb-4 text-sm font-medium bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 shadow-sm">
          ℹ Ready to import: {pending.transactions.length} transactions across {pending.months.length} months
        </div>

        {pendingDuplicates.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl mb-4 text-sm font-medium bg-amber-50/80 dark:bg-amber-900/30 backdrop-blur-sm border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 shadow-sm">
            ⚠ {pendingDuplicates.length} transaction(s) already exist in loaded data
          </div>
        )}
      </div>

      <div ref={gridRef} className="px-4 md:px-5 pb-4 md:pb-5">
        <DataGrid
          rows={pending.transactions}
          exportFilename={`preview-${pending.provider.replace(/\s+/g, "-")}`}
          colDefs={previewColDefs}
          height={gridHeight}
          rowClassRules={rowClassRules}
        />
      </div>
    </div>
  );
}
