// @ts-nocheck
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditableDescriptionCell from "../EditableDescriptionCell";
import type { Transaction } from "../../types";

const tx: Transaction = {
  id: "1",
  date: "2024-01-01",
  amount: 100,
  description: "old desc",
  subcategory: "",
  categoryId: "food",
  account: "acc",
  source: "csv",
};

describe("EditableDescriptionCell", { tags: ["unit"] }, () => {
it("renders input with default value", () => {
  render(<EditableDescriptionCell data={tx} onEdit={vi.fn()} />);
  expect(screen.getByDisplayValue("old desc")).toBeInTheDocument();
});

it("calls onEdit on blur with new value", async () => {
  const onEdit = vi.fn();
  const user = userEvent.setup();
  render(<EditableDescriptionCell data={tx} onEdit={onEdit} />);
  const input = screen.getByDisplayValue("old desc");
  await user.clear(input);
  await user.type(input, "new desc");
  await user.tab();
  expect(onEdit).toHaveBeenCalledWith(tx, "new desc");
});

})