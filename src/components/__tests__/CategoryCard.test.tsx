import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryCard from "../CategoryCard";
import type { Category } from "../../types";

const cat: Category = {
  id: "food",
  name: "Food",
  color: "#ef4444",
  type: "debit",
  keywords: ["MERCADO", "UBER"],
};

const defaultProps = {
  cat,
  editing: null,
  onStartEdit: vi.fn(),
  onFinishEdit: vi.fn(),
  onCancelEdit: vi.fn(),
  onEditColor: vi.fn(),
  onEditType: vi.fn(),
  onDelete: vi.fn(),
  onAddKeyword: vi.fn(),
  onRemoveKeyword: vi.fn(),
};

it("renders category name and details", () => {
  render(<CategoryCard {...defaultProps} />);
  expect(screen.getByText("Food")).toBeInTheDocument();
  expect(screen.getByText("2 kw")).toBeInTheDocument();
  expect(screen.getByText("DEBIT")).toBeInTheDocument();
  expect(screen.getByText("MERCADO")).toBeInTheDocument();
  expect(screen.getByText("UBER")).toBeInTheDocument();
});

it("shows editing input when editing matches cat id", () => {
  render(<CategoryCard {...defaultProps} editing="food" />);
  expect(screen.getByDisplayValue("Food")).toBeInTheDocument();
});

it("calls onStartEdit when name clicked", async () => {
  const onStartEdit = vi.fn();
  const user = userEvent.setup();
  render(<CategoryCard {...defaultProps} onStartEdit={onStartEdit} />);
  await user.click(screen.getByText("Food"));
  expect(onStartEdit).toHaveBeenCalledWith("food");
});

it("calls onDelete when delete clicked", async () => {
  const onDelete = vi.fn();
  const user = userEvent.setup();
  render(<CategoryCard {...defaultProps} onDelete={onDelete} />);
  await user.click(screen.getByText("Delete"));
  expect(onDelete).toHaveBeenCalledWith("food");
});

it("calls onAddKeyword when add clicked", async () => {
  const onAddKeyword = vi.fn();
  const user = userEvent.setup();
  render(<CategoryCard {...defaultProps} onAddKeyword={onAddKeyword} />);
  await user.click(screen.getByText("+ Add"));
  expect(onAddKeyword).toHaveBeenCalledWith("food");
});

it("calls onRemoveKeyword when keyword remove clicked", async () => {
  const onRemoveKeyword = vi.fn();
  const user = userEvent.setup();
  render(<CategoryCard {...defaultProps} onRemoveKeyword={onRemoveKeyword} />);
  const removeButtons = screen.getAllByText("×");
  await user.click(removeButtons[0]);
  expect(onRemoveKeyword).toHaveBeenCalledWith("food", "MERCADO");
});

it("hides delete button for OTHER category", () => {
  const otherCat: Category = { id: "other", name: "Other", color: "#6b7280", type: "debit", keywords: [] };
  render(<CategoryCard {...defaultProps} cat={otherCat} />);
  expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  expect(screen.queryByText("+ Add")).not.toBeInTheDocument();
});

it("calls onEditType when type select changes", async () => {
  const onEditType = vi.fn();
  const user = userEvent.setup();
  render(<CategoryCard {...defaultProps} onEditType={onEditType} />);
  const select = screen.getByDisplayValue("DEBIT");
  await user.selectOptions(select, "credit");
  expect(onEditType).toHaveBeenCalledWith("food", "credit");
});

it("calls onFinishEdit when editing input loses focus", async () => {
  const onFinishEdit = vi.fn();
  const user = userEvent.setup();
  render(<CategoryCard {...defaultProps} editing="food" onFinishEdit={onFinishEdit} />);
  const input = screen.getByDisplayValue("Food");
  await user.click(input);
  await user.tab();
  expect(onFinishEdit).toHaveBeenCalledWith("food", "Food");
});
