import { useRef } from "react";
import type { Transaction } from "../types";

interface EditableDescriptionCellProps {
  data: Transaction;
  onEdit: (tx: Transaction, newDesc: string) => void;
}

export default function EditableDescriptionCell({ data, onEdit }: EditableDescriptionCellProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const commit = () => {
    const input = inputRef.current;
    if (!input) return;
    const trimmed = input.value.trim();
    if (trimmed === data.description) return;
    if (!trimmed) return;
    onEdit(data, trimmed);
  };

  return (
    <input
      ref={inputRef}
      id={`description-input-${data.id}`}
      name={`description-${data.id}`}
      defaultValue={data.description}
      onBlur={() => commit()}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          (e.target as HTMLInputElement).blur();
        }
      }}
      className="w-full bg-transparent border-none outline-none text-sm"
      style={{ color: "inherit" }}
      aria-label="Edit description"
      onClick={(e) => e.stopPropagation()}
    />
  );
}
