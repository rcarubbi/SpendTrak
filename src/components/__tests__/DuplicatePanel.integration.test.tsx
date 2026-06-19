import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DuplicatePanel from "../DuplicatePanel";
import { useCategoryStore } from "../../stores/categoryStore";
import type { Transaction } from "../../types";

beforeEach(() => {
  useCategoryStore.setState({
    categories: [
      { id: "food", name: "Food", color: "#ef4444", type: "debit", keywords: [] },
    ],
    loaded: true,
  });
});

vi.mock("../DataGrid", async () => {
  const React = await import("react");
  const CategoryBadge = (await import("../CategoryBadge")).default;

  return {
    default: (allProps: Record<string, unknown>) => {
      const { rows, colDefs, ...rest } = allProps as {
        rows: Record<string, unknown>[];
        colDefs: { field?: string; headerName?: string; valueFormatter?: (p: { value: unknown }) => string; cellRenderer?: (p: { value: unknown; data: Record<string, unknown> }) => React.ReactNode }[];
      };
      return React.createElement("div", { "data-testid": "data-grid" },
        ...(rows ?? []).map((row, ri) =>
          React.createElement("div", { key: ri, "data-testid": "data-grid-row" },
            ...(colDefs ?? []).map((col, ci) => {
              const children: React.ReactNode[] = [];
              if (col.headerName) {
                children.push(React.createElement("span", { key: `h-${ci}` }, col.headerName));
              }
              if (typeof col.cellRenderer === "function") {
                const rendered = col.cellRenderer({ value: row[col.field ?? ""], data: row });
                children.push(React.createElement("span", { key: `c-${ci}` }, rendered));
              } else if (typeof col.valueFormatter === "function") {
                children.push(React.createElement("span", { key: `v-${ci}` }, col.valueFormatter({ value: row[col.field ?? ""] })));
              } else if (col.field) {
                children.push(React.createElement("span", { key: `f-${ci}` }, String(row[col.field] ?? "")));
              }
              return React.createElement("div", { key: ci, "data-testid": "data-grid-cell" }, ...children);
            })
          )
        )
      );
    },
  };
});

const tx1: Transaction = {
  id: "1", date: "2024-01-01", amount: 100, description: "test",
  subcategory: "", categoryId: "food", account: "acc1", source: "csv",
};
const tx2: Transaction = {
  id: "2", date: "2024-01-01", amount: 100, description: "test",
  subcategory: "", categoryId: "food", account: "acc2", source: "manual",
};

const groups = [
  { key: "test-100-2024-01-01", txs: [tx1, tx2], sources: ["csv", "manual"] },
];

describe("DuplicatePanel integration", () => {
  it("calls onDelete when remove button clicked", async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(<DuplicatePanel groups={groups} onMerge={vi.fn()} onDelete={onDelete} />);
    const removeBtns = screen.getAllByText("Remove");
    await user.click(removeBtns[0]);
    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("renders category badge for each row", () => {
    render(<DuplicatePanel groups={groups} onMerge={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getAllByText("Food").length).toBe(2);
  });

  it("renders amount with valueFormatter", () => {
    render(<DuplicatePanel groups={groups} onMerge={vi.fn()} onDelete={vi.fn()} />);
    const amounts = screen.getAllByText("£100.00");
    expect(amounts.length).toBeGreaterThanOrEqual(2);
  });

  it("shows empty message when no groups", () => {
    render(<DuplicatePanel groups={[]} onMerge={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText("No duplicates found")).toBeInTheDocument();
  });
});
