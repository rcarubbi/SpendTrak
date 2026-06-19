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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50" onClick={onCancel}>
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">Reclassify transaction</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{tx.date}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 font-medium">{tx.description.slice(0, 100)}</p>
        <div className="flex items-center gap-2 mb-4">
          <CategoryBadge categoryId={tx.categoryId} />
          <span className="text-gray-400 dark:text-gray-500">→</span>
          <CategoryBadge categoryId={newCategoryId} />
        </div>
        <div className="mb-4">
          <label className="relative inline-flex items-center cursor-pointer select-none mb-3">
            <input
              id="save-keyword-checkbox"
              name="saveKeyword"
              type="checkbox"
              checked={saveKeyword}
              onChange={(e) => onSaveKeywordChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-8 h-4.5 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:after:translate-x-3.5 after:shadow-sm" />
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-medium">Save rule for future classifications</span>
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
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all placeholder:text-gray-400"
              />
            </>
          )}
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-lg text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-semibold cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
