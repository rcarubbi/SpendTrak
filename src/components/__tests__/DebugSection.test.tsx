import { render, screen } from "@testing-library/react";
import DebugSection from "../DebugSection";

it("renders nothing when debug empty", () => {
  const { container } = render(<DebugSection debug="" />);
  expect(container.firstChild).toBeNull();
});

it("renders debug content in details element", () => {
  render(<DebugSection debug="some debug text" />);
  expect(screen.getByText("Debug")).toBeInTheDocument();
  expect(screen.getByText("some debug text")).toBeInTheDocument();
});
