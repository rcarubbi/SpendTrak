import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorBoundary from "../ErrorBoundary";

describe("ErrorBoundary", { tags: ["unit"] }, () => {
beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

function Bomb() {
  throw new Error("kaboom");
}

let shouldThrow = true;
function ControlledBomb() {
  if (shouldThrow) throw new Error("kaboom");
  return <p>recovered</p>;
}

it("renders children when no error", () => {
  render(<ErrorBoundary><p>all good</p></ErrorBoundary>);
  expect(screen.getByText("all good")).toBeInTheDocument();
});

it("catches error and shows fallback UI", () => {
  render(<ErrorBoundary><Bomb /></ErrorBoundary>);
  expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  expect(screen.getByText("kaboom")).toBeInTheDocument();
});

it("renders custom fallback when provided", () => {
  render(<ErrorBoundary fallback={<p>custom error</p>}><Bomb /></ErrorBoundary>);
  expect(screen.getByText("custom error")).toBeInTheDocument();
  expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
});

it("retry resets error state", async () => {
  shouldThrow = true;
  const user = userEvent.setup();
  const { rerender } = render(
    <ErrorBoundary key="eb">
      <ControlledBomb />
    </ErrorBoundary>
  );
  expect(screen.getByText("Something went wrong")).toBeInTheDocument();

  shouldThrow = false;
  await user.click(screen.getByText("Try again"));
  expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
  expect(screen.getByText("recovered")).toBeInTheDocument();
});

})