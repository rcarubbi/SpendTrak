import { render, screen } from "@testing-library/react";
import CategoryBadge from "../CategoryBadge";
import { useCategoryStore } from "../../stores/categoryStore";

const testCats = [
  { id: "food", name: "Food", color: "#ef4444", type: "debit" as const, keywords: [] },
  { id: "other", name: "Other", color: "#6b7280", type: "debit" as const, keywords: [] },
];

beforeEach(() => {
  useCategoryStore.setState({ categories: testCats, loaded: true });
});

it("renders category name with matching color", () => {
  render(<CategoryBadge categoryId="food" />);
  const badge = screen.getByText("Food");
  expect(badge).toBeInTheDocument();
  expect(badge).toHaveStyle({ background: "#ef4444" });
});

it("falls back to OTHER category when id not found", () => {
  render(<CategoryBadge categoryId="nonexistent" />);
  expect(screen.getByText("Other")).toBeInTheDocument();
});

it("returns null when no categories loaded", () => {
  useCategoryStore.setState({ categories: [] });
  const { container } = render(<CategoryBadge categoryId="food" />);
  expect(container.firstChild).toBeNull();
});
