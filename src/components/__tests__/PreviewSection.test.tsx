import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PreviewSection from "../PreviewSection";
import type { Transaction } from "../../types";

const pending = {
  transactions: [
    { id: "1", date: "2024-01-01", amount: 100, description: "test", subcategory: "", categoryId: "food", account: "acc", source: "csv" },
  ] as Transaction[],
  months: ["2024-01"],
  total: 100,
  provider: "Barclays CSV",
  debug: "",
};

const rowClassRules = { "row-red": () => true };

it("renders nothing when pending is null", () => {
  const { container } = render(
    <PreviewSection pending={null} pendingDuplicates={[]} rowClassRules={rowClassRules} onConfirm={vi.fn()} onCancel={vi.fn()} />
  );
  expect(container.firstChild).toBeNull();
});

it("renders preview details", () => {
  render(
    <PreviewSection pending={pending} pendingDuplicates={[]} rowClassRules={rowClassRules} onConfirm={vi.fn()} onCancel={vi.fn()} />
  );
  expect(screen.getByText("Preview")).toBeInTheDocument();
  expect(screen.getByText(/Barclays CSV/)).toBeInTheDocument();
  expect(screen.getByText(/£100/)).toBeInTheDocument();
});

it("calls onConfirm when import clicked", async () => {
  const onConfirm = vi.fn();
  const user = userEvent.setup();
  render(
    <PreviewSection pending={pending} pendingDuplicates={[]} rowClassRules={rowClassRules} onConfirm={onConfirm} onCancel={vi.fn()} />
  );
  await user.click(screen.getByText("Import"));
  expect(onConfirm).toHaveBeenCalledOnce();
});

it("calls onCancel when cancel clicked", async () => {
  const onCancel = vi.fn();
  const user = userEvent.setup();
  render(
    <PreviewSection pending={pending} pendingDuplicates={[]} rowClassRules={rowClassRules} onConfirm={vi.fn()} onCancel={onCancel} />
  );
  await user.click(screen.getByText("Cancel"));
  expect(onCancel).toHaveBeenCalledOnce();
});

it("shows duplicate warning when pendingDuplicates exist", () => {
  render(
    <PreviewSection pending={pending} pendingDuplicates={[{ id: "1" }] as Transaction[]} rowClassRules={rowClassRules} onConfirm={vi.fn()} onCancel={vi.fn()} />
  );
  expect(screen.getByText(/already exist/)).toBeInTheDocument();
});
