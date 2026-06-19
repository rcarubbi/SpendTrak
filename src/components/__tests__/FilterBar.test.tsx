import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterBar from "../FilterBar";

const cats = [
  { id: "food", name: "Food" },
  { id: "transport", name: "Transport" },
];

const defaultProps = {
  search: "",
  onSearchChange: vi.fn(),
  monthFilter: "all",
  onMonthFilterChange: vi.fn(),
  loadedMonths: ["2024-01", "2024-02"],
  catFilter: "all",
  onCatFilterChange: vi.fn(),
  cats,
  showDuplicates: false,
  onToggleDuplicates: vi.fn(),
  dupCount: 3,
};

it("renders filter controls", () => {
  render(<FilterBar {...defaultProps} />);
  expect(screen.getByText("All months")).toBeInTheDocument();
  expect(screen.getByText("All categories")).toBeInTheDocument();
  expect(screen.getByText("⚠ Duplicates (3)")).toBeInTheDocument();
});

it("calls onSearchChange on input", async () => {
  const onSearchChange = vi.fn();
  const user = userEvent.setup();
  render(<FilterBar {...defaultProps} onSearchChange={onSearchChange} />);
  const input = screen.getByPlaceholderText("Search description...");
  await user.type(input, "food");
  expect(onSearchChange).toHaveBeenCalled();
});

it("calls onMonthFilterChange on month select", async () => {
  const onMonthFilterChange = vi.fn();
  const user = userEvent.setup();
  render(<FilterBar {...defaultProps} onMonthFilterChange={onMonthFilterChange} />);
  const selects = screen.getAllByRole("combobox");
  await user.selectOptions(selects[0], "2024-01");
  expect(onMonthFilterChange).toHaveBeenCalledWith("2024-01");
});

it("calls onToggleDuplicates on button click", async () => {
  const onToggleDuplicates = vi.fn();
  const user = userEvent.setup();
  render(<FilterBar {...defaultProps} onToggleDuplicates={onToggleDuplicates} />);
  await user.click(screen.getByText("⚠ Duplicates (3)"));
  expect(onToggleDuplicates).toHaveBeenCalledOnce();
});

it("shows show all when duplicates visible", () => {
  render(<FilterBar {...defaultProps} showDuplicates={true} />);
  expect(screen.getByText("⇤ Show all")).toBeInTheDocument();
});
