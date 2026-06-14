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
  onReclassifyAll: () => void;
  reclassLoading: boolean;
  reclassProgress: { done: number; total: number } | null;
}

export default function FilterBar({
  search, onSearchChange, monthFilter, onMonthFilterChange, loadedMonths,
  catFilter, onCatFilterChange, cats,
  showDuplicates, onToggleDuplicates,
  dupCount, onReclassifyAll, reclassLoading, reclassProgress,
}: FilterBarProps) {
  return (
    <>
      <div className="flex gap-3 mb-4 items-center flex-wrap">
        <input
          placeholder="Buscar descrição..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 min-w-[150px] px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 md:hidden"
        />
        <select
          value={monthFilter}
          onChange={(e) => onMonthFilterChange(e.target.value)}
          className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">Todos meses</option>
          {loadedMonths.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <select
          value={catFilter}
          onChange={(e) => onCatFilterChange(e.target.value)}
          className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">Todas categorias</option>
          {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button
          onClick={onToggleDuplicates}
          className={`px-3 py-2 rounded-md text-sm font-semibold border cursor-pointer transition-colors ${
            showDuplicates
              ? "bg-amber-100 border-amber-300 text-amber-800"
              : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
          }`}
        >
          {showDuplicates ? "⇤ Ver todas" : `⚠ Duplicatas (${dupCount})`}
        </button>
        <button
          onClick={onReclassifyAll}
          disabled={reclassLoading}
          className="px-3 py-2 rounded-md text-sm font-semibold border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer disabled:opacity-50"
        >
          Reclassificar tudo
        </button>
      </div>
      {reclassLoading && (
        <div className="flex items-center gap-2 mb-4 text-sm text-blue-700">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0" />
          {reclassProgress
            ? `Reclassificando... ${reclassProgress.done}/${reclassProgress.total}`
            : "Reclassificando transações..."}
        </div>
      )}
    </>
  );
}
