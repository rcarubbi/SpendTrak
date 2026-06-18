interface StatementHeaderProps {
  dupGroupsLength: number;
  debitTotal: number;
  creditTotal: number;
}

export default function StatementHeader({ dupGroupsLength, debitTotal, creditTotal }: StatementHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold dark:text-white">
        Statement
        {dupGroupsLength > 0 && (
          <span className="text-sm font-normal text-amber-600 ml-3">
            {dupGroupsLength} group(s) with possible duplicates
          </span>
        )}
      </h1>
      <div className="text-gray-500 dark:text-white text-sm text-right">
        <div>Expenses: £{debitTotal.toLocaleString()}</div>
        {creditTotal > 0 && <div className="text-green-600">Income: £{Math.round(creditTotal).toLocaleString()}</div>}
      </div>
    </div>
  );
}
