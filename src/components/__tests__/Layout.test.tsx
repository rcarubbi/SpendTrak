import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Layout from "../Layout";
import { useUIStore } from "../../stores/uiStore";

function renderLayout(initialRoute = "/") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Layout><p>content</p></Layout>
    </MemoryRouter>
  );
}

beforeEach(() => {
  useUIStore.setState({ theme: "system", sidebarOpen: false, searchQuery: "" });
  localStorage.clear();
  document.documentElement.classList.remove("dark");
});

it("renders brand name and nav links", () => {
  renderLayout();
  expect(screen.getByText("SpendTrak")).toBeInTheDocument();
  expect(screen.getByText("Dashboard")).toBeInTheDocument();
  expect(screen.getByText("Statement")).toBeInTheDocument();
  expect(screen.getByText("Categories")).toBeInTheDocument();
  expect(screen.getByText("Classify")).toBeInTheDocument();
  expect(screen.getByText("Import")).toBeInTheDocument();
});

it("renders children content", () => {
  renderLayout();
  expect(screen.getByText("content")).toBeInTheDocument();
});

it("toggles sidebar via hamburger button", async () => {
  const user = userEvent.setup();
  renderLayout();

  await user.click(screen.getByLabelText("Open menu"));
  expect(useUIStore.getState().sidebarOpen).toBe(true);

  await user.click(screen.getByLabelText("Close menu"));
  expect(useUIStore.getState().sidebarOpen).toBe(false);
});

it("cycles theme on button click", async () => {
  const user = userEvent.setup();
  renderLayout();

  useUIStore.setState({ theme: "light" });
  const themeBtn = screen.getByLabelText(/Theme:/);
  await user.click(themeBtn);
  expect(useUIStore.getState().theme).toBe("dark");
  expect(localStorage.getItem("theme:v1")).toBe("dark");
});

it("updates search input value on type", async () => {
  const user = userEvent.setup();
  renderLayout("/categories");

  const searchInput = screen.getByPlaceholderText("Search transactions...") as HTMLInputElement;
  await user.type(searchInput, "food");

  expect(searchInput.value).toBe("food");
});

it("shows correct theme icon", () => {
  useUIStore.setState({ theme: "dark" });
  const { container } = renderLayout();
  expect(container.querySelector('[aria-label="Theme: dark"]')).toBeInTheDocument();

  useUIStore.setState({ theme: "light" });
});

it("renders Toaster component", () => {
  renderLayout();
  expect(screen.getByTestId("toaster")).toBeInTheDocument();
});

it("shows footer text", () => {
  renderLayout();
  expect(screen.getByText(/Track your spending/)).toBeInTheDocument();
});
