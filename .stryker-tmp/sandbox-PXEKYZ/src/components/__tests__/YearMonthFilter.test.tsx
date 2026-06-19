// @ts-nocheck
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import YearMonthFilter from "../YearMonthFilter";

const defaultProps = {
  years: ["2024", "2023"],
  selectedYear: "2024",
  onYearChange: vi.fn(),
  monthsInYear: ["Jan", "Feb"],
  selectedMonth: "Jan",
  onMonthChange: vi.fn(),
};

describe("YearMonthFilter", { tags: ["unit"] }, () => {
it("renders year and month selects", () => {
  render(<YearMonthFilter {...defaultProps} />);
  expect(screen.getByText("2024")).toBeInTheDocument();
  expect(screen.getByText("Jan")).toBeInTheDocument();
});

it("calls onYearChange when year changes", async () => {
  const onYearChange = vi.fn();
  const user = userEvent.setup();
  render(<YearMonthFilter {...defaultProps} onYearChange={onYearChange} />);
  const yearSelect = screen.getAllByRole("combobox")[0];
  await user.selectOptions(yearSelect, "2023");
  expect(onYearChange).toHaveBeenCalledWith("2023");
});

it("calls onMonthChange when month changes", async () => {
  const onMonthChange = vi.fn();
  const user = userEvent.setup();
  render(<YearMonthFilter {...defaultProps} onMonthChange={onMonthChange} />);
  const monthSelect = screen.getAllByRole("combobox")[1];
  await user.selectOptions(monthSelect, "Feb");
  expect(onMonthChange).toHaveBeenCalledWith("Feb");
});

})