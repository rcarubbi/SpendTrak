import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategorySelectButton from "../CategorySelectButton";

describe("CategorySelectButton", { tags: ["unit"] }, () => {
it("renders button with name", () => {
  render(<CategorySelectButton name="Food" color="#ef4444" onClick={vi.fn()} />);
  const btn = screen.getByText("Food");
  expect(btn).toBeInTheDocument();
  expect(btn).toHaveStyle({ borderColor: "#ef4444", color: "#ef4444" });
});

it("calls onClick when clicked", async () => {
  const onClick = vi.fn();
  const user = userEvent.setup();
  render(<CategorySelectButton name="Food" color="#ef4444" onClick={onClick} />);
  await user.click(screen.getByText("Food"));
  expect(onClick).toHaveBeenCalledOnce();
});

it("changes background on hover and resets on leave", async () => {
  const user = userEvent.setup();
  render(<CategorySelectButton name="Food" color="#ef4444" onClick={vi.fn()} />);
  const btn = screen.getByText("Food");

  await user.hover(btn);
  expect(btn).toHaveStyle({ background: "#ef4444", color: "#ffffff" });

  await user.unhover(btn);
  expect(btn).toHaveStyle({ color: "#ef4444" });
  expect(btn.style.background).toBe("");
});

})