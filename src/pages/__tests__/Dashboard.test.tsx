import { render, screen } from "@testing-library/react";
import { useCategoryStore } from "../../stores/categoryStore";
import { useTransactionStore } from "../../stores/transactionStore";
import { useUIStore } from "../../stores/uiStore";
import Dashboard from "../Dashboard";

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
          { id: "1", date: "2024-01-05", amount: 100, description: "test", subcategory: "", categoryId: "food", account: "a", source: "csv" },
          { id: "2", date: "2024-01-10", amount: 50, description: "income", subcategory: "", categoryId: "income", account: "a", source: "csv" },
          { id: "3", date: "2024-01-15", amount: 200, description: "test2", subcategory: "", categoryId: "food", account: "a", source: "csv" },
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

describe("Dashboard", { tags: ["unit"] }, () => {
  beforeEach(() => {
    setDefaultStore();
  });

  it("renders heading and transaction count", () => {
    render(<Dashboard />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("3 transactions loaded")).toBeInTheDocument();
  });

  it("renders year filter option", () => {
    render(<Dashboard />);
    const yearOption = screen.getByRole("option", { name: "2024" });
    expect(yearOption).toBeInTheDocument();
  });

  it("renders empty month section text", () => {
    render(<Dashboard />);
    const emptyTexts = screen.getAllByText("Select a month");
    expect(emptyTexts.length).toBeGreaterThanOrEqual(1);
  });

  it("handles empty transactions gracefully", () => {
    useTransactionStore.setState({ months: {}, loaded: true });
    render(<Dashboard />);
    expect(screen.getByText("0 transactions loaded")).toBeInTheDocument();
    const emptyTexts = screen.getAllByText("Select a month");
    expect(emptyTexts.length).toBeGreaterThanOrEqual(1);
  });

  it("handles dark theme", () => {
    useUIStore.setState({ theme: "dark" });
    render(<Dashboard />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
