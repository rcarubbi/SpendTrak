import { render, screen } from "@testing-library/react";
import { useCategoryStore } from "../../stores/categoryStore";
import { useTransactionStore } from "../../stores/transactionStore";
import Import from "../Import";

describe("Import", { tags: ["unit"] }, () => {
  beforeEach(() => {
    useCategoryStore.setState({
      categories: [
        { id: "food", name: "Food", color: "#ef4444", type: "debit", keywords: [] },
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

  it("renders page heading and description", () => {
    render(<Import />);
    expect(screen.getByText("Import")).toBeInTheDocument();
    expect(screen.getByText(/Upload bank statements/)).toBeInTheDocument();
  });

  it("renders provider selector", () => {
    render(<Import />);
    expect(screen.getByText("Provider")).toBeInTheDocument();
  });

  it("renders file drop zone", () => {
    render(<Import />);
    expect(screen.getByText(/Drag files or click/)).toBeInTheDocument();
  });

  it("shows transaction count", () => {
    render(<Import />);
    expect(screen.getByText("0 transactions")).toBeInTheDocument();
  });
});
