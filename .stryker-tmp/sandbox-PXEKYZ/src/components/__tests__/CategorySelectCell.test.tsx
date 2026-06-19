// @ts-nocheck
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategorySelectCell from "../CategorySelectCell";
import type { Transaction, Category } from "../../types";

const tx: Transaction = {
  id: "1",
  date: "2024-01-01",
  amount: 100,
  description: "test",
  subcategory: "",
  categoryId: "food",
  account: "acc",
  source: "csv",
};

const categories: Category[] = [
  { id: "food", name: "Food", color: "#ef4444", type: "debit", keywords: [] },
  { id: "transport", name: "Transport", color: "#3b82f6", type: "debit", keywords: [] },
];

describe("CategorySelectCell", { tags: ["unit"] }, () => {
it("renders select with current category selected", () => {
  render(<CategorySelectCell data={tx} categories={categories} onReclassify={vi.fn()} />);
  const select = screen.getByRole("combobox");
  expect(select).toHaveValue("food");
});

it("calls onReclassify when different option selected", async () => {
  const onReclassify = vi.fn();
  const user = userEvent.setup();
  render(<CategorySelectCell data={tx} categories={categories} onReclassify={onReclassify} />);
  const select = screen.getByRole("combobox");
  await user.selectOptions(select, "transport");
  expect(onReclassify).toHaveBeenCalledWith(tx, "transport");
});

})