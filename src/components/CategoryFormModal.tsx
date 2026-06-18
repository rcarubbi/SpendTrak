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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4 dark:text-gray-100">New Category</h2>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">ID</label>
            <input
              id="new-cat-id"
              name="categoryId"
              value={form.id}
              onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
              placeholder="e.g. pets"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer p-0.5"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as CategoryType }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md text-sm"
              >
                <option value="debit">Debit (expense)</option>
                <option value="credit">Credit (income)</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              Cancel
            </button>
            <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
