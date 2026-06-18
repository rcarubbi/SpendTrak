import type { Transaction } from "../types";

interface EditableDescriptionCellProps {
  data: Transaction;
  onEdit: (tx: Transaction, newDesc: string) => void;
}

export default function EditableDescriptionCell({ data, onEdit }: EditableDescriptionCellProps) {
  return (
    <input
      id={`description-input-${data.id}`}
      name={`description-${data.id}`}
      defaultValue={data.description}
      onBlur={(e) => onEdit(data, e.target.value)}
      className="w-full bg-transparent border-none outline-none text-sm"
      style={{ color: "inherit" }}
      aria-label="Edit description"
      onClick={(e) => e.stopPropagation()}
    />
  );
}
