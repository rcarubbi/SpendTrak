// @ts-nocheck
import { render, screen } from "@testing-library/react";
import AppRouter from "../AppRouter";
import { useCategoryStore } from "../../stores/categoryStore";
import { useTransactionStore } from "../../stores/transactionStore";

describe("AppRouter", { tags: ["unit"] }, () => {
beforeEach(() => {
  useCategoryStore.setState({ categories: [], loaded: true });
  useTransactionStore.setState({
    transactions: [],
    months: [],
    loaded: true,
    pendingDuplicates: [],
    debug: "",
    loading: false,
  });
});

it("renders app router with dashboard route", async () => {
  render(<AppRouter />);
  expect(await screen.findByText("Dashboard")).toBeInTheDocument();
});

})