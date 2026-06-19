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
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="border-l-[3px] p-4" style={{ borderLeftColor: cat.color }}>
        {/* Header row */}
        <div className="flex items-center gap-2.5">
          <input
            id={`color-input-${cat.id}`}
            name={`color-${cat.id}`}
            type="color"
            value={cat.color}
            onChange={(e) => onEditColor(cat.id, e.target.value)}
            className="w-7 h-7 rounded-lg cursor-pointer border-0 p-0 shrink-0"
          />
          {editing === cat.id ? (
            <input
              id={`name-input-${cat.id}`}
              name={`name-${cat.id}`}
              defaultValue={cat.name}
              onBlur={(e) => onFinishEdit(cat.id, e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onCancelEdit()}
              autoFocus
              className="text-sm font-semibold border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-2 py-1 flex-1 min-w-0"
            />
          ) : (
            <span
              className="font-semibold text-sm cursor-pointer dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex-1 min-w-0 truncate"
              onClick={() => onStartEdit(cat.id)}
              title="Click to rename"
            >
              {cat.name}
            </span>
          )}
          <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0 hidden sm:inline">
            {cat.keywords.length} kw
          </span>
          {cat.id !== CATEGORY_IDS.OTHER ? (
            <select
              id={`type-select-${cat.id}`}
              name={`type-${cat.id}`}
              value={cat.type}
              onChange={(e) => onEditType(cat.id, e.target.value as CategoryType)}
              className={`text-xs rounded-full px-2.5 py-0.5 font-semibold border border-transparent cursor-pointer transition-colors shrink-0 ${
                cat.type === "credit"
                  ? "text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/50"
                  : "text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/50"
              }`}
            >
              <option value="debit" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">DEBIT</option>
              <option value="credit" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">CREDIT</option>
            </select>
          ) : (
            <span className={`text-xs rounded-full px-2.5 py-0.5 font-semibold shrink-0 ${
              cat.type === "credit"
                ? "text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/50"
                : "text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/50"
            }`}>
              {cat.type === "credit" ? "CREDIT" : "DEBIT"}
            </span>
          )}
          {cat.id !== CATEGORY_IDS.OTHER && (
            <button
              onClick={() => onDelete(cat.id)}
              className="text-xs text-red-400 hover:text-red-600 dark:hover:text-red-300 cursor-pointer transition-colors shrink-0 font-medium"
            >
              Delete
            </button>
          )}
        </div>

        {/* Keywords */}
        <div className="mt-3 flex flex-wrap gap-1.5 items-center">
          {cat.keywords.map((kw) => (
            <span
              key={kw}
              className="inline-flex items-center gap-1.5 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs dark:text-gray-200 border border-gray-200/50 dark:border-gray-600/30 hover:scale-105 transition-transform"
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: cat.color }} />
              {kw}
              {cat.id !== CATEGORY_IDS.OTHER && (
                <button
                  onClick={() => onRemoveKeyword(cat.id, kw)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer text-sm leading-none p-0 border-0 bg-transparent"
                >
                  ×
                </button>
              )}
            </span>
          ))}
          {cat.id !== CATEGORY_IDS.OTHER && (
            <button
              onClick={() => onAddKeyword(cat.id)}
              className="inline-flex items-center gap-1 border border-dashed border-gray-300 dark:border-gray-600 px-2.5 py-1 rounded-full text-xs cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-gray-300"
            >
              + Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
