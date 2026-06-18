interface StatementHeaderProps {
  dupGroupsLength: number;
  debitTotal: number;
  creditTotal: number;
}

export default function StatementHeader({ dupGroupsLength, debitTotal, creditTotal }: StatementHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Statement</h1>
        {dupGroupsLength > 0 && (
          <span className="text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-700/50">
            {dupGroupsLength} duplicate group(s)
          </span>
        )}
      </div>
      <div className="flex items-center gap-4 px-4 py-2 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 shadow-sm">
        <div className="text-sm">
          <span className="text-gray-500 dark:text-gray-400">Expenses: </span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">£{debitTotal.toLocaleString()}</span>
        </div>
        {creditTotal > 0 && (
          <>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Income: </span>
              <span className="font-semibold text-green-600 dark:text-green-400">£{Math.round(creditTotal).toLocaleString()}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
