import type { Transaction } from "../types";
import CategoryBadge from "./CategoryBadge";

interface ReclassifyModalProps {
  tx: Transaction;
  newCategoryId: string;
  customKeyword: string;
  onCustomKeywordChange: (val: string) => void;
  autoKeyword: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ReclassifyModal({
  tx, newCategoryId,
  customKeyword, onCustomKeywordChange, autoKeyword,
  onConfirm, onCancel,
}: ReclassifyModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onCancel}>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold mb-2 dark:text-white">Reclassificar transação</h3>
        <p className="text-sm text-gray-500 dark:text-white mb-1">{tx.date}</p>
        <p className="text-sm text-gray-700 dark:text-white mb-4 font-medium">{tx.description.slice(0, 100)}</p>
        <div className="flex items-center gap-2 mb-4">
          <CategoryBadge categoryId={tx.categoryId} />
          <span className="text-gray-400 dark:text-white">→</span>
          <CategoryBadge categoryId={newCategoryId} />
        </div>
        <div className="mb-4">
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
            Keyword (deixe vazio para extrair automaticamente)
          </label>
          <input
            type="text"
            value={customKeyword}
            onChange={(e) => onCustomKeywordChange(e.target.value)}
            placeholder={autoKeyword || "ex: MERCADO"}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-white rounded-md text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
