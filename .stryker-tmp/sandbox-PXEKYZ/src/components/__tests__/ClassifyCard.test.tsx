// @ts-nocheck
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClassifyCard from "../ClassifyCard";
import type { Category } from "../../types";

const categories: Category[] = [
  { id: "food", name: "Food", color: "#ef4444", type: "debit", keywords: ["MERCADO"] },
  { id: "transport", name: "Transport", color: "#3b82f6", type: "debit", keywords: ["UBER"] },
];

const defaultProps = {
  desc: "DEBIT MERCADO LISBON",
  count: 3,
  total: 150.5,
  isOneOff: false,
  customKeyword: "",
  categories,
  onToggleOneOff: vi.fn(),
  onKeywordChange: vi.fn(),
  onClassify: vi.fn(),
};

describe("ClassifyCard", { tags: ["unit"] }, () => {
it("renders description and stats", () => {
  render(<ClassifyCard {...defaultProps} />);
  expect(screen.getByText("DEBIT MERCADO LISBON")).toBeInTheDocument();
  expect(screen.getByText(/3x/)).toBeInTheDocument();
});

it("renders category buttons", () => {
  render(<ClassifyCard {...defaultProps} />);
  expect(screen.getByText("Food")).toBeInTheDocument();
  expect(screen.getByText("Transport")).toBeInTheDocument();
});

it("toggles auto mode", async () => {
  const onToggleOneOff = vi.fn();
  const user = userEvent.setup();
  render(<ClassifyCard {...defaultProps} onToggleOneOff={onToggleOneOff} />);
  const checkbox = screen.getByRole("checkbox");
  await user.click(checkbox);
  expect(onToggleOneOff).toHaveBeenCalledWith("DEBIT MERCADO LISBON");
});

it("calls onClassify when category button clicked", async () => {
  const onClassify = vi.fn();
  const user = userEvent.setup();
  render(<ClassifyCard {...defaultProps} onClassify={onClassify} />);
  await user.click(screen.getByText("Food"));
  expect(onClassify).toHaveBeenCalledWith("DEBIT MERCADO LISBON", "food", true);
});

it("shows keyword input when not one-off", () => {
  render(<ClassifyCard {...defaultProps} isOneOff={false} />);
  expect(screen.getByDisplayValue("")).toBeInTheDocument();
});

it("hides keyword input when one-off", () => {
  render(<ClassifyCard {...defaultProps} isOneOff={true} />);
  expect(screen.queryByText("KW:")).not.toBeInTheDocument();
});

it("shows custom keyword value", () => {
  render(<ClassifyCard {...defaultProps} customKeyword="CUSTOM" />);
  expect(screen.getByDisplayValue("CUSTOM")).toBeInTheDocument();
});

})