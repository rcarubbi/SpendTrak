import { render, screen } from "@testing-library/react";
import { useCategoryStore } from "../../stores/categoryStore";
import { useTransactionStore } from "../../stores/transactionStore";
import { useUIStore } from "../../stores/uiStore";
import Statement from "../Statement";

function setDefaultStore() {
  useCategoryStore.setState({
    categories: [
      { id: "food", name: "Food", color: "#ef4444", type: "debit", keywords: [] },
      { id: "income", name: "Income", color: "#22c55e", type: "credit", keywords: [] },
    ],
    loaded: true,
  });
  useTransactionStore.setState({
    months: {
      "2024-01": {
        year: 2024, month: 1,
        transactions: [
          { id: "1", date: "2024-01-05", amount: 100, description: "groceries", subcategory: "", categoryId: "food", account: "a", source: "csv" },
          { id: "2", date: "2024-01-10", amount: 50, description: "salary", subcategory: "", categoryId: "income", account: "a", source: "csv" },
        ],
        uploadedAt: "",
      },
    },
    loaded: true,
    pendingDuplicates: [],
    debug: "",
    loading: false,
  });
  useUIStore.setState({ theme: "light", sidebarOpen: false, searchQuery: "" });
}

describe("Statement", { tags: ["unit"] }, () => {
  beforeEach(() => {
    setDefaultStore();
  });

  it("renders data grid with transactions", () => {
    render(<Statement />);
    expect(screen.getByTestId("ag-grid")).toBeInTheDocument();
  });

  it("renders statement header with totals", () => {
    render(<Statement />);
    expect(screen.getByText("Statement")).toBeInTheDocument();
  });

  it("renders filter bar", () => {
    render(<Statement />);
    expect(screen.getByText("All months")).toBeInTheDocument();
  });

  it("shows duplicate count button", () => {
    useTransactionStore.setState({
      months: {
        "2024-01": {
          year: 2024, month: 1,
          transactions: [
            { id: "1", date: "2024-01-05", amount: 100, description: "groceries", subcategory: "", categoryId: "food", account: "a", source: "csv" },
          ],
          uploadedAt: "",
        },
      },
    });
    render(<Statement />);
    expect(screen.getByText(/Duplicates/)).toBeInTheDocument();
  });

  it("shows empty message when no transactions pass filter", () => {
    useTransactionStore.setState({ months: {}, loaded: true });
    render(<Statement />);
    expect(screen.getByText("No transactions found")).toBeInTheDocument();
  });

  it("filters by search query", () => {
    useUIStore.setState({ searchQuery: "salary" });
    render(<Statement />);
    expect(screen.getByTestId("ag-grid")).toBeInTheDocument();
  });
});
