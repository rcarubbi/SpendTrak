import { render, screen } from "@testing-library/react";
import StatementHeader from "../StatementHeader";

it("renders debit total", () => {
  render(<StatementHeader dupGroupsLength={0} debitTotal={500} creditTotal={0} />);
  expect(screen.getByText("Statement")).toBeInTheDocument();
  expect(screen.getByText(/£500/)).toBeInTheDocument();
});

it("shows duplicate badge when groups exist", () => {
  render(<StatementHeader dupGroupsLength={3} debitTotal={500} creditTotal={0} />);
  expect(screen.getByText("3 duplicate group(s)")).toBeInTheDocument();
});

it("hides duplicate badge when no groups", () => {
  render(<StatementHeader dupGroupsLength={0} debitTotal={500} creditTotal={0} />);
  expect(screen.queryByText(/duplicate/)).not.toBeInTheDocument();
});

it("shows income when creditTotal > 0", () => {
  render(<StatementHeader dupGroupsLength={0} debitTotal={500} creditTotal={200} />);
  expect(screen.getByText(/£200/)).toBeInTheDocument();
});

it("hides income when creditTotal is 0", () => {
  render(<StatementHeader dupGroupsLength={0} debitTotal={500} creditTotal={0} />);
  expect(screen.queryByText("Income:")).not.toBeInTheDocument();
});
