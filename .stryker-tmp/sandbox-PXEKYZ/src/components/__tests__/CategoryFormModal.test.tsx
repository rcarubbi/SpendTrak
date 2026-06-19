// @ts-nocheck
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryFormModal from "../CategoryFormModal";
import { useCategoryStore } from "../../stores/categoryStore";

describe("CategoryFormModal", { tags: ["unit"] }, () => {
beforeEach(() => {
  useCategoryStore.setState({ categories: [], loaded: true });
});

it("renders nothing when show is false", () => {
  const { container } = render(<CategoryFormModal show={false} onClose={vi.fn()} />);
  expect(container.firstChild).toBeNull();
});

it("renders form fields", () => {
  render(<CategoryFormModal show={true} onClose={vi.fn()} />);
  expect(screen.getByPlaceholderText("e.g. pets")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("e.g. Pets")).toBeInTheDocument();
});

it("calls addCategory and onClose on create", async () => {
  const onClose = vi.fn();
  const user = userEvent.setup();
  render(<CategoryFormModal show={true} onClose={onClose} />);

  const idInput = screen.getByPlaceholderText("e.g. pets");
  const nameInput = screen.getByPlaceholderText("e.g. Pets");

  await user.type(idInput, "pets");
  await user.type(nameInput, "Pets");
  await user.click(screen.getByText("Create"));

  const cats = useCategoryStore.getState().categories;
  expect(cats).toHaveLength(1);
  expect(cats[0].id).toBe("pets");
  expect(cats[0].name).toBe("Pets");
  expect(onClose).toHaveBeenCalled();
});

it("does not create category with duplicate id", async () => {
  useCategoryStore.setState({
    categories: [{ id: "pets", name: "Pets", color: "#6366f1", type: "debit", keywords: [] }],
  });
  const onClose = vi.fn();
  const user = userEvent.setup();
  render(<CategoryFormModal show={true} onClose={onClose} />);

  const idInput = screen.getByPlaceholderText("e.g. pets");
  await user.type(idInput, "pets");
  await user.click(screen.getByText("Create"));

  const cats = useCategoryStore.getState().categories;
  expect(cats).toHaveLength(1);
  expect(onClose).not.toHaveBeenCalled();
});

})