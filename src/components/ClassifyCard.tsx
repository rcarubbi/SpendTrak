import type { Category } from "../types";
import { extractKeyword } from "../utils/classify";
import CategorySelectButton from "./CategorySelectButton";

interface ClassifyCardProps {
  desc: string;
  count: number;
  total: number;
  isOneOff: boolean;
  customKeyword: string;
  categories: Category[];
  onToggleOneOff: (desc: string) => void;
  onKeywordChange: (desc: string, value: string) => void;
  onClassify: (desc: string, catId: string, saveKeyword: boolean) => void;
}

export default function ClassifyCard({ desc, count, total, isOneOff, customKeyword, categories, onToggleOneOff, onKeywordChange, onClassify }: ClassifyCardProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800">
      <div className="flex items-start mb-2 gap-2">
        <div className="flex-1 min-w-0">
          <code className="text-xs text-gray-700 dark:text-gray-300 break-all">{desc}</code>
          <span className="text-gray-400 dark:text-gray-500 text-xs ml-2 whitespace-nowrap">
            {count}x · £{total.toFixed(2)}
          </span>
        </div>
        <label className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap shrink-0 cursor-pointer select-none">
          <input
            id={`auto-checkbox-${desc}`}
            name={`auto-${desc}`}
            type="checkbox"
            checked={!isOneOff}
            onChange={() => onToggleOneOff(desc)}
            className="w-3.5 h-3.5"
          />
          Auto (save rule)
        </label>
      </div>
      {!isOneOff && (
        <>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Keyword (used to classify similar)</label>
          <input
            id={`keyword-input-${desc}`}
            name={`keyword-${desc}`}
            type="text"
            value={customKeyword}
            onChange={(e) => onKeywordChange(desc, e.target.value)}
            placeholder={extractKeyword(desc) || "e.g. MERCADO"}
            className="w-full mb-2 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </>
      )}
      <div className="flex gap-1 flex-wrap">
        {categories.map((cat) => (
          <CategorySelectButton
            key={cat.id}
            name={cat.name}
            color={cat.color}
            onClick={() => onClassify(desc, cat.id, !isOneOff)}
          />
        ))}
      </div>
    </div>
  );
}
