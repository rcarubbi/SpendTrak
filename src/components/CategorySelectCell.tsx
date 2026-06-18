import type { Transaction, Category } from "../types";

interface CategorySelectCellProps {
  data: Transaction;
  categories: Category[];
  onReclassify: (tx: Transaction, newCategoryId: string) => void;
}

export default function CategorySelectCell({ data, categories, onReclassify }: CategorySelectCellProps) {
  return (
    <select
      id={`category-select-${data.id}`}
      name={`category-${data.id}`}
      value={data.categoryId}
      onChange={(e) => {
        if (e.target.value !== data.categoryId) {
          onReclassify(data, e.target.value);
          (e.target as HTMLSelectElement).value = data.categoryId;
        }
      }}
      className="text-xs border border-gray-300 dark:border-gray-600 rounded px-1 py-0.5 w-full bg-transparent"
      style={{ color: "inherit" }}
      onClick={(e) => e.stopPropagation()}
    >
      {categories.map((c) => (
        <option key={c.id} value={c.id} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          {c.name}
        </option>
      ))}
    </select>
  );
}
