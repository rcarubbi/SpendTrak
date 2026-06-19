// @ts-nocheck
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReclassifyModal from "../ReclassifyModal";
import type { Transaction } from "../../types";
import { useCategoryStore } from "../../stores/categoryStore";

const tx: Transaction = {
  id: "1", date: "2024-01-01", amount: 100, description: "DEBIT MERCADO",
  subcategory: "", categoryId: "old", account: "acc", source: "csv",
};

describe("ReclassifyModal", { tags: ["unit"] }, () => {
beforeEach(() => {
  useCategoryStore.setState({
    categories: [
      { id: "old", name: "Old", color: "#ef4444", type: "debit", keywords: [] },
      { id: "new", name: "New", color: "#3b82f6", type: "debit", keywords: [] },
    ],
    loaded: true,
  });
});

const defaultProps = {
  tx,
  newCategoryId: "new",
  customKeyword: "",
  onCustomKeywordChange: vi.fn(),
  autoKeyword: "MERCADO",
  saveKeyword: true,
  onSaveKeywordChange: vi.fn(),
  onConfirm: vi.fn(),
  onCancel: vi.fn(),
};

it("renders transaction details", () => {
  render(<ReclassifyModal {...defaultProps} />);
  expect(screen.getByText("DEBIT MERCADO")).toBeInTheDocument();
  expect(screen.getByText("2024-01-01")).toBeInTheDocument();
});

it("shows category badges", () => {
  render(<ReclassifyModal {...defaultProps} />);
  expect(screen.getByText("Old")).toBeInTheDocument();
  expect(screen.getByText("New")).toBeInTheDocument();
});

it("calls onConfirm when confirm clicked", async () => {
  const onConfirm = vi.fn();
  const user = userEvent.setup();
  render(<ReclassifyModal {...defaultProps} onConfirm={onConfirm} />);
  await user.click(screen.getByText("Confirm"));
  expect(onConfirm).toHaveBeenCalledOnce();
});

it("calls onCancel when cancel clicked", async () => {
  const onCancel = vi.fn();
  const user = userEvent.setup();
  render(<ReclassifyModal {...defaultProps} onCancel={onCancel} />);
  await user.click(screen.getByText("Cancel"));
  expect(onCancel).toHaveBeenCalledOnce();
});

it("calls onCustomKeywordChange when keyword typed", async () => {
  const onCustomKeywordChange = vi.fn();
  const user = userEvent.setup();
  render(<ReclassifyModal {...defaultProps} onCustomKeywordChange={onCustomKeywordChange} />);
  const input = screen.getByPlaceholderText("MERCADO");
  await user.type(input, "X");
  expect(onCustomKeywordChange).toHaveBeenCalledWith("X");
});

it("shows fallback placeholder when autoKeyword empty", () => {
  render(<ReclassifyModal {...defaultProps} autoKeyword="" />);
  expect(screen.getByPlaceholderText("e.g. MERCADO")).toBeInTheDocument();
});

it("toggles save keyword checkbox", async () => {
  const onSaveKeywordChange = vi.fn();
  const user = userEvent.setup();
  render(<ReclassifyModal {...defaultProps} onSaveKeywordChange={onSaveKeywordChange} />);
  const checkbox = screen.getByRole("checkbox");
  await user.click(checkbox);
  expect(onSaveKeywordChange).toHaveBeenCalledWith(false);
});

})