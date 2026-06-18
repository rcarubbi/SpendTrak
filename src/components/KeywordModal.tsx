import { useState } from "react";
import { useCategoryStore } from "../stores/categoryStore";

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
    if (!cat) return;
    const kw = keyword.toUpperCase();
    if (cat.keywords.includes(kw)) {
      alert("Keyword already exists in this category.");
      return;
    }
    await updateCategory(categoryId, { keywords: [...cat.keywords, kw] });
    setKeyword("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4 dark:text-gray-100">Add Keyword</h2>
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
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              autoFocus
            />
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
