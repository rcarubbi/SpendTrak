import { render, screen } from "@testing-library/react";
import { useCategoryStore } from "../../stores/categoryStore";
import { useTransactionStore } from "../../stores/transactionStore";
import Classify from "../Classify";

describe("Classify", { tags: ["unit"] }, () => {
  beforeEach(() => {
    useCategoryStore.setState({
      categories: [
        { id: "food", name: "Food", color: "#ef4444", type: "debit", keywords: [] },
        { id: "other", name: "Other", color: "#6b7280", type: "debit", keywords: [] },
      ],
      loaded: true,
    });
    useTransactionStore.setState({
      months: {},
      loaded: true,
      pendingDuplicates: [],
      debug: "",
      loading: false,
    });
  });

  it("shows no unclassified message when none exist", () => {
    render(<Classify />);
    expect(screen.getByText("No unclassified transactions.")).toBeInTheDocument();
  });

  it("renders classify cards when unknowns exist", () => {
    useTransactionStore.setState({
      months: {
        "2024-01": {
          year: 2024, month: 1,
          transactions: [
            { id: "1", date: "2024-01-05", amount: 100, description: "UNKNOWN SHOP", subcategory: "", categoryId: "other", account: "a", source: "csv" },
            { id: "2", date: "2024-01-10", amount: 50, description: "RANDOM STORE", subcategory: "", categoryId: "other", account: "a", source: "csv" },
          ],
          uploadedAt: "",
        },
      },
      loaded: true,
    });
    render(<Classify />);
    expect(screen.getByText("Classify")).toBeInTheDocument();
    expect(screen.getByText("(2)")).toBeInTheDocument();
    expect(screen.getByText("UNKNOWN SHOP")).toBeInTheDocument();
    expect(screen.getByText("RANDOM STORE")).toBeInTheDocument();
  });

  it("shows show all button when more than 50 unique descriptions", () => {
    const txs = Array.from({ length: 55 }, (_, i) => ({
      id: String(i), date: "2024-01-01", amount: 10, description: `DESC ${i}`,
      subcategory: "", categoryId: "other", account: "a", source: "csv",
    }));
    useTransactionStore.setState({
      months: { "2024-01": { year: 2024, month: 1, transactions: txs, uploadedAt: "" } },
      loaded: true,
    });
    render(<Classify />);
    expect(screen.getByText(/Show all/)).toBeInTheDocument();
  });
});
