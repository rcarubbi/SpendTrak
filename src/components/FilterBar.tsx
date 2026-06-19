interface FilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  monthFilter: string;
  onMonthFilterChange: (val: string) => void;
  loadedMonths: string[];
  catFilter: string;
  onCatFilterChange: (val: string) => void;
  cats: Array<{ id: string; name: string }>;
  showDuplicates: boolean;
  onToggleDuplicates: () => void;
  dupCount: number;
}

export default function FilterBar({
  search, onSearchChange, monthFilter, onMonthFilterChange, loadedMonths,
  catFilter, onCatFilterChange, cats,
  showDuplicates, onToggleDuplicates, dupCount,
}: FilterBarProps) {
  return (
    <div className="flex gap-3 mb-4 items-center flex-wrap">
      <input
        id="search-description"
        name="search"
        placeholder="Search description..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 min-w-[150px] px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-surface-solid dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 md:hidden"
      />
      <select
        id="month-filter"
        name="monthFilter"
        value={monthFilter}
        onChange={(e) => onMonthFilterChange(e.target.value)}
        className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-surface-solid dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="all">All months</option>
        {loadedMonths.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <select
        id="category-filter"
        name="catFilter"
        value={catFilter}
        onChange={(e) => onCatFilterChange(e.target.value)}
        className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-surface-solid dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="all">All categories</option>
        {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <button
        onClick={onToggleDuplicates}
        className={`px-3 py-2 rounded-md text-sm font-semibold border cursor-pointer transition-colors ${
          showDuplicates
            ? "bg-amber-100 border-amber-300 text-amber-800"
            : "bg-surface-solid dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-white hover:bg-surface/40 dark:hover:bg-gray-600"
        }`}
      >
        {showDuplicates ? "⇤ Show all" : `⚠ Duplicates (${dupCount})`}
      </button>
    </div>
  );
}
