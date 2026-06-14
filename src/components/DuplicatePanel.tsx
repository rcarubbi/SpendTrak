import type { Transaction } from "../types";
import type { DuplicateGroup } from "../stores/transactionStore";
import CategoryBadge from "./CategoryBadge";
import DataGrid from "./DataGrid";

interface DuplicatePanelProps {
  groups: DuplicateGroup[];
  onMerge: (txs: Transaction[]) => void;
  onDelete: (txId: string) => void;
  rowClassRules?: Record<string, (p: { data: unknown }) => boolean>;
}

export default function DuplicatePanel({ groups, onMerge, onDelete, rowClassRules }: DuplicatePanelProps) {
  if (groups.length === 0) {
    return <p className="text-center text-gray-400 dark:text-white mt-8">Nenhuma duplicata encontrada</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {groups.map((group) => (
        <div key={group.key} className="border border-amber-200 dark:border-amber-800 rounded-lg bg-amber-50 dark:bg-amber-900/20 overflow-hidden">
          <div className="px-3 py-2 bg-amber-100 dark:bg-amber-900/40 text-xs font-semibold text-amber-800 dark:text-amber-300 border-b border-amber-200 dark:border-amber-800 flex justify-between items-center">
            <span className="truncate">
              {group.txs[0].date} · {group.txs[0].description} · £{group.txs[0].amount.toFixed(2)}
            </span>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <span>{group.txs.length} entrada(s) · {group.sources.join(", ")}</span>
              <button
                onClick={() => onMerge(group.txs)}
                className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 font-bold text-xs cursor-pointer"
                title="Manter esta, remover duplicatas"
              >
                ✕ Manter esta
              </button>
            </div>
          </div>
          <div className="p-1">
            <DataGrid
              rows={group.txs}
              colDefs={[
                { field: "source", headerName: "Arquivo", width: 140 },
                { field: "account", headerName: "Conta", width: 120 },
                {
                  field: "amount", headerName: "Valor", width: 90, type: "rightAligned",
                  valueFormatter: (p: { value?: number }) => `£${p.value?.toFixed(2) ?? "0.00"}`,
                },
                {
                  field: "categoryId", headerName: "Categoria", width: 120,
                  cellRenderer: (p: { value: string }) => <CategoryBadge categoryId={p.value} />,
                },
                {
                  headerName: "", width: 80, sortable: false, filter: false,
                  cellRenderer: (p: { data: Transaction }) => (
                    <button
                      onClick={() => onDelete(p.data.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer"
                    >
                      Remover
                    </button>
                  ),
                },
              ]}
              height={group.txs.length * 40 + 50}
              exportFilename={`duplicata-${group.txs[0].date}`}
              rowClassRules={rowClassRules}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
