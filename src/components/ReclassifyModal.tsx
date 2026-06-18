import type { Transaction } from "../types";
import CategoryBadge from "./CategoryBadge";

interface ReclassifyModalProps {
  tx: Transaction;
  newCategoryId: string;
  customKeyword: string;
  onCustomKeywordChange: (val: string) => void;
  autoKeyword: string;
  saveKeyword: boolean;
  onSaveKeywordChange: (val: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ReclassifyModal({
  tx, newCategoryId,
  customKeyword, onCustomKeywordChange, autoKeyword,
  saveKeyword, onSaveKeywordChange,
  onConfirm, onCancel,
}: ReclassifyModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onCancel}>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold mb-2 dark:text-white">Reclassify transaction</h3>
        <p className="text-sm text-gray-500 dark:text-white mb-1">{tx.date}</p>
        <p className="text-sm text-gray-700 dark:text-white mb-4 font-medium">{tx.description.slice(0, 100)}</p>
        <div className="flex items-center gap-2 mb-4">
          <CategoryBadge categoryId={tx.categoryId} />
          <span className="text-gray-400 dark:text-white">→</span>
          <CategoryBadge categoryId={newCategoryId} />
        </div>
        <div className="mb-4">
          <label className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 cursor-pointer select-none mb-3">
            <input
              id="save-keyword-checkbox"
              name="saveKeyword"
              type="checkbox"
              checked={saveKeyword}
              onChange={(e) => onSaveKeywordChange(e.target.checked)}
              className="w-3.5 h-3.5"
            />
            Save rule for future classifications
          </label>
          {saveKeyword && (
            <>
              <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">
                Keyword (leave empty to auto-extract)
              </label>
              <input
                id="custom-keyword"
                name="keyword"
                type="text"
                value={customKeyword}
                onChange={(e) => onCustomKeywordChange(e.target.value)}
                placeholder={autoKeyword || "e.g. MERCADO"}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </>
          )}
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-white rounded-md text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
