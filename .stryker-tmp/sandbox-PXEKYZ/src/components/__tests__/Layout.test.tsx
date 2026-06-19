// @ts-nocheck
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Layout from "../Layout";
import { useUIStore } from "../../stores/uiStore";
import { flushSync } from "react-dom";

function renderLayout(initialRoute = "/") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Layout><p>content</p></Layout>
    </MemoryRouter>
  );
}

describe("Layout", { tags: ["unit"] }, () => {
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

it("does not navigate when already on /statement after search", async () => {
  const user = userEvent.setup();
  renderLayout("/statement");

  const searchInput = screen.getByPlaceholderText("Search transactions...");
  await user.type(searchInput, "test");
  await new Promise((r) => setTimeout(r, 300));

  expect(useUIStore.getState().searchQuery).toBe("test");
});

it("uses view transition for search when available", async () => {
  const startViewTransition = vi.fn().mockImplementation((cb) => {
    cb();
    return { finished: Promise.resolve() };
  });
  (document as any).startViewTransition = startViewTransition;

  const user = userEvent.setup();
  renderLayout("/categories");

  const searchInput = screen.getByPlaceholderText("Search transactions...");
  await user.type(searchInput, "x");

  // Wait for debounce to fire
  await new Promise((r) => setTimeout(r, 300));

  expect(startViewTransition).toHaveBeenCalled();
  expect(document.documentElement.classList.contains("nav-forward")).toBe(false);

  delete (document as any).startViewTransition;
});

it("closes sidebar on nav link click on mobile", async () => {
  useUIStore.setState({ sidebarOpen: true });
  const orig = window.innerWidth;
  Object.defineProperty(window, "innerWidth", { configurable: true, value: 600 });

  const user = userEvent.setup();
  renderLayout();
  await user.click(screen.getByText("Statement"));

  expect(useUIStore.getState().sidebarOpen).toBe(false);
  Object.defineProperty(window, "innerWidth", { configurable: true, value: orig });
});

it("triggers view transition on nav link click when available", async () => {
  const startViewTransition = vi.fn().mockImplementation((cb) => {
    cb();
    return { finished: Promise.resolve() };
  });
  (document as any).startViewTransition = startViewTransition;

  const user = userEvent.setup();
  renderLayout();
  await user.click(screen.getByText("Statement"));

  expect(startViewTransition).toHaveBeenCalled();
  expect(document.documentElement.classList.contains("nav-forward")).toBe(false);

  delete (document as any).startViewTransition;
});

})