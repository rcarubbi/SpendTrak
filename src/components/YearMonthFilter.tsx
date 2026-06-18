interface YearMonthFilterProps {
  years: string[];
  selectedYear: string;
  onYearChange: (year: string) => void;
  monthsInYear: string[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export default function YearMonthFilter({ years, selectedYear, onYearChange, monthsInYear, selectedMonth, onMonthChange }: YearMonthFilterProps) {
  return (
    <div className="flex gap-3 items-center mb-6">
      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Year:</label>
      <select value={selectedYear} onChange={(e) => onYearChange(e.target.value)} className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm">
        {years.map((y) => <option key={y} value={y}>{y}</option>)}
      </select>
      <label className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-2">Month:</label>
      <select value={selectedMonth} onChange={(e) => onMonthChange(e.target.value)} className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm">
        {monthsInYear.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
    </div>
  );
}
