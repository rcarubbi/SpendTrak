import { useState } from "react";
import { useCategoryStore } from "../stores/categoryStore";
import { toastError } from "../stores/toastStore";
import type { CategoryType } from "../types";

interface CategoryFormModalProps {
  show: boolean;
  onClose: () => void;
}

export default function CategoryFormModal({ show, onClose }: CategoryFormModalProps) {
  const cats = useCategoryStore((s) => s.categories);
  const addCategory = useCategoryStore((s) => s.addCategory);
  const [form, setForm] = useState({ id: "", name: "", color: "#6366f1", type: "debit" as CategoryType });

  if (!show) return null;

  const handleCreate = async () => {
    const id = form.id.trim().toLowerCase().replace(/\s+/g, "_");
    if (!id) return;
    if (cats.find((c) => c.id === id)) {
      toastError("A category with this ID already exists.");
      return;
    }
    await addCategory({ id, name: form.name || id, color: form.color, type: form.type, keywords: [] });
    setForm({ id: "", name: "", color: "#6366f1", type: "debit" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-surface/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">New Category</h2>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">ID</label>
            <input
              id="new-cat-id"
              name="categoryId"
              value={form.id}
              onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
              placeholder="e.g. pets"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">Name</label>
            <input
              id="new-cat-name"
              name="categoryName"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Pets"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all placeholder:text-gray-400"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">Color</label>
              <input
                id="new-cat-color"
                name="categoryColor"
                type="color"
                value={form.color}
                onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                className="w-full h-10 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer p-0.5 bg-surface/80 dark:bg-gray-700/80"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">Type</label>
              <select
                id="new-cat-type"
                name="categoryType"
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as CategoryType }))}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all"
              >
                <option value="debit" className="bg-surface-solid dark:bg-gray-800">Debit (expense)</option>
                <option value="credit" className="bg-surface-solid dark:bg-gray-800">Credit (income)</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 bg-surface/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-lg text-sm cursor-pointer hover:bg-surface/40 dark:hover:bg-gray-600 transition-all">
              Cancel
            </button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-semibold cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all shadow-sm hover:shadow-md active:scale-95">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
