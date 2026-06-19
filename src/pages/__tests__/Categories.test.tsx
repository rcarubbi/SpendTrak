import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useCategoryStore } from "../../stores/categoryStore";
import Categories from "../Categories";

describe("Categories", { tags: ["unit"] }, () => {
  beforeEach(() => {
    useCategoryStore.setState({
      categories: [
        { id: "food", name: "Food", color: "#ef4444", type: "debit", keywords: ["MERCADO"] },
        { id: "other", name: "Other", color: "#6b7280", type: "debit", keywords: [] },
      ],
      loaded: true,
    });
  });

  it("renders page heading and new category button", () => {
    render(<Categories />);
    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getByText("+ New Category")).toBeInTheDocument();
  });

  it("renders category cards", () => {
    render(<Categories />);
    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("Other")).toBeInTheDocument();
  });

  it("opens modal when new category clicked", async () => {
    const user = userEvent.setup();
    render(<Categories />);
    await user.click(screen.getByText("+ New Category"));
    expect(screen.getByText("New Category")).toBeInTheDocument();
  });

  it("opens keyword modal when add keyword clicked", async () => {
    const user = userEvent.setup();
    render(<Categories />);
    const addButtons = screen.getAllByText("+ Add");
    await user.click(addButtons[0]);
    expect(screen.getByText("Add Keyword")).toBeInTheDocument();
  });
});
