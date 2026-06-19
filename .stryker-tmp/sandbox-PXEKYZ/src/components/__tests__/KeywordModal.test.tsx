// @ts-nocheck
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import KeywordModal from "../KeywordModal";
import { useCategoryStore } from "../../stores/categoryStore";

const cat = {
  id: "food", name: "Food", color: "#ef4444", type: "debit" as const,
  keywords: ["MERCADO"],
};

describe("KeywordModal", { tags: ["unit"] }, () => {
beforeEach(() => {
  useCategoryStore.setState({ categories: [cat], loaded: true });
});

it("renders nothing when show is false", () => {
  const { container } = render(
    <KeywordModal show={false} categoryId="food" onClose={vi.fn()} />
  );
  expect(container.firstChild).toBeNull();
});

it("renders keyword input", () => {
  render(<KeywordModal show={true} categoryId="food" onClose={vi.fn()} />);
  expect(screen.getByPlaceholderText(/MERCADO/)).toBeInTheDocument();
});

it("adds keyword on save", async () => {
  const user = userEvent.setup();
  render(<KeywordModal show={true} categoryId="food" onClose={vi.fn()} />);

  const input = screen.getByPlaceholderText(/MERCADO/);
  await user.type(input, "UBER");
  await user.click(screen.getByText("Add"));

  const cats = useCategoryStore.getState().categories;
  expect(cats[0].keywords).toContain("UBER");
});

it("does not add duplicate keyword", async () => {
  const user = userEvent.setup();
  render(<KeywordModal show={true} categoryId="food" onClose={vi.fn()} />);

  const input = screen.getByPlaceholderText(/MERCADO/);
  await user.type(input, "MERCADO");
  await user.click(screen.getByText("Add"));

  const cats = useCategoryStore.getState().categories;
  expect(cats[0].keywords).toEqual(["MERCADO"]);
});

it("does not add keyword when category not found", async () => {
  const user = userEvent.setup();
  render(<KeywordModal show={true} categoryId="nonexistent" onClose={vi.fn()} />);

  const input = screen.getByPlaceholderText(/MERCADO/);
  await user.type(input, "TEST");
  await user.click(screen.getByText("Add"));

  const cats = useCategoryStore.getState().categories;
  expect(cats[0].keywords).toEqual(["MERCADO"]);
});

})