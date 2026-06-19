// @ts-nocheck
import { render, screen } from "@testing-library/react";
import TransactionTypeCell from "../TransactionTypeCell";

describe("TransactionTypeCell", { tags: ["unit"] }, () => {
it("renders CREDIT for credit category", () => {
  render(<TransactionTypeCell categoryId="income" creditCatIds={new Set(["income"])} />);
  expect(screen.getByText("CREDIT")).toBeInTheDocument();
});

it("renders DEBIT for debit category", () => {
  render(<TransactionTypeCell categoryId="food" creditCatIds={new Set(["income"])} />);
  expect(screen.getByText("DEBIT")).toBeInTheDocument();
});

})