import type { Category, CategoryType } from "../types";
import { CATEGORY_IDS } from "../constants";

interface CategoryCardProps {
  cat: Category;
  editing: string | null;
  onStartEdit: (id: string) => void;
  onFinishEdit: (id: string, name: string) => void;
  onCancelEdit: () => void;
  onEditColor: (id: string, color: string) => void;
  onEditType: (id: string, type: CategoryType) => void;
  onDelete: (id: string) => void;
  onAddKeyword: (id: string) => void;
  onRemoveKeyword: (id: string, kw: string) => void;
}

export default function CategoryCard({
  cat, editing, onStartEdit, onFinishEdit, onCancelEdit,
  onEditColor, onEditType, onDelete, onAddKeyword, onRemoveKeyword,
}: CategoryCardProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800">
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        <input
          id={`color-input-${cat.id}`}
          name={`color-${cat.id}`}
          type="color"
          value={cat.color}
          onChange={(e) => onEditColor(cat.id, e.target.value)}
          className="w-8 h-8 border-none cursor-pointer p-0 shrink-0"
        />
        {editing === cat.id ? (
          <input
            id={`name-input-${cat.id}`}
            name={`name-${cat.id}`}
            defaultValue={cat.name}
            onBlur={(e) => onFinishEdit(cat.id, e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onCancelEdit()}
            autoFocus
            className="text-base font-semibold border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-2 py-0.5"
          />
        ) : (
          <span className="font-semibold text-base cursor-pointer dark:text-gray-100" onClick={() => onStartEdit(cat.id)}>
            {cat.name}
          </span>
        )}
        <span className="text-gray-400 dark:text-gray-500 text-xs">({cat.keywords.length} keywords)</span>
        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${cat.type === "credit" ? "text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-300" : "text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300"}`}>
          {cat.type === "credit" ? "CREDIT" : "DEBIT"}
        </span>
        {cat.id !== CATEGORY_IDS.OTHER && (
          <>
            <select
              id={`type-select-${cat.id}`}
              name={`type-${cat.id}`}
              value={cat.type}
              onChange={(e) => onEditType(cat.id, e.target.value as CategoryType)}
              className="text-xs border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-1 py-0.5"
            >
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </select>
            <button onClick={() => onDelete(cat.id)} className="ml-auto text-red-600 dark:text-red-400 text-xs font-semibold cursor-pointer hover:text-red-800 dark:hover:text-red-300 transition-colors">
              Delete
            </button>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-1">
        {cat.keywords.map((kw) => (
          <span key={kw} className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs dark:text-gray-200">
            {kw}
            {cat.id !== CATEGORY_IDS.OTHER && (
              <button onClick={() => onRemoveKeyword(cat.id, kw)} className="border-none bg-none cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm p-0 leading-none">
                ×
              </button>
            )}
          </span>
        ))}
        <button onClick={() => onAddKeyword(cat.id)} className="border border-dashed border-gray-300 dark:border-gray-600 rounded-full px-2 py-0.5 text-xs cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-gray-300">
          +
        </button>
      </div>
    </div>
  );
}
