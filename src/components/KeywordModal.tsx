import { useState } from "react";
import { useCategoryStore } from "../stores/categoryStore";
import { toastSuccess, toastError } from "../stores/toastStore";

interface KeywordModalProps {
  show: boolean;
  categoryId: string;
  onClose: () => void;
}

export default function KeywordModal({ show, categoryId, onClose }: KeywordModalProps) {
  const cats = useCategoryStore((s) => s.categories);
  const updateCategory = useCategoryStore((s) => s.updateCategory);
  const [keyword, setKeyword] = useState("");

  if (!show) return null;

  const handleSave = async () => {
    if (!keyword.trim()) return;
    const cat = cats.find((c) => c.id === categoryId);
    if (!cat) {
      toastError("Category not found");
      return;
    }
    const kw = keyword.toUpperCase();
    if (cat.keywords.includes(kw)) {
      toastError(`Keyword "${kw}" already exists in this category.`);
      return;
    }
    await updateCategory(categoryId, { keywords: [...cat.keywords, kw] });
    toastSuccess(`Keyword "${kw}" added`);
    setKeyword("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Add Keyword</h2>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">
              Keyword (will be uppercased)
            </label>
            <input
              id="keyword-input-modal"
              name="keyword"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. MERCADO, UBER, NETFLIX"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all placeholder:text-gray-400"
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              autoFocus
            />
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-lg text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-all">
              Cancel
            </button>
            <button onClick={handleSave} className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-semibold cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all shadow-sm hover:shadow-md active:scale-95">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
