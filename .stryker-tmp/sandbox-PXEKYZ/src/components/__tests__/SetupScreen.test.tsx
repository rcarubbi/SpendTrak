// @ts-nocheck
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SetupScreen from "../SetupScreen";

describe("SetupScreen", { tags: ["unit"] }, () => {
it("renders setup screen", () => {
  render(<SetupScreen onPickDir={vi.fn()} />);
  expect(screen.getByText("SpendTrak")).toBeInTheDocument();
  expect(screen.getByText("Select data folder")).toBeInTheDocument();
});

it("calls onPickDir when button clicked", async () => {
  const onPickDir = vi.fn();
  const user = userEvent.setup();
  render(<SetupScreen onPickDir={onPickDir} />);
  await user.click(screen.getByText("Select data folder"));
  expect(onPickDir).toHaveBeenCalledOnce();
});

})