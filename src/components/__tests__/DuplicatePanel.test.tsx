import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DuplicatePanel from "../DuplicatePanel";
import type { Transaction } from "../../types";

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

describe("DuplicatePanel", { tags: ["unit"] }, () => {
it("shows empty message when no groups", () => {
  render(<DuplicatePanel groups={[]} onMerge={vi.fn()} onDelete={vi.fn()} />);
  expect(screen.getByText("No duplicates found")).toBeInTheDocument();
});

it("renders duplicate group header with description", () => {
  render(<DuplicatePanel groups={groups} onMerge={vi.fn()} onDelete={vi.fn()} />);
  expect(screen.getByText(/2024-01-01/)).toBeInTheDocument();
  expect(screen.getByText(/test/)).toBeInTheDocument();
});

it("calls onMerge when merge clicked", async () => {
  const onMerge = vi.fn();
  const user = userEvent.setup();
  render(<DuplicatePanel groups={groups} onMerge={onMerge} onDelete={vi.fn()} />);
  await user.click(screen.getByTitle("Keep this one, remove duplicates"));
  expect(onMerge).toHaveBeenCalledWith([tx1, tx2]);
});

})