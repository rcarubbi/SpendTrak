interface TransactionTypeCellProps {
  categoryId: string;
  creditCatIds: Set<string>;
}

export default function TransactionTypeCell({ categoryId, creditCatIds }: TransactionTypeCellProps) {
  return creditCatIds.has(categoryId)
    ? <span className="text-green-600 font-semibold text-xs">CREDIT</span>
    : <span className="text-red-600 font-semibold text-xs">DEBIT</span>;
}
