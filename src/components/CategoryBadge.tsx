import { useCategoryStore } from "../stores/categoryStore";
import { CATEGORY_IDS } from "../constants";

export default function CategoryBadge({ categoryId }: { categoryId: string }) {
  const cats = useCategoryStore((s) => s.categories);
  const cat = cats.find((c) => c.id === categoryId);
  const fallback = cats.find((c) => c.id === CATEGORY_IDS.OTHER);
  const display = cat ?? fallback;
  if (!display) return null;

  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-xs font-semibold text-white whitespace-nowrap shadow-sm"
      style={{ background: display.color }}
    >
      {display.name}
    </span>
  );
}
