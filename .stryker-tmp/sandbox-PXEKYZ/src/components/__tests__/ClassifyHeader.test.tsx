// @ts-nocheck
import { render, screen } from "@testing-library/react";
import ClassifyHeader from "../ClassifyHeader";

describe("ClassifyHeader", { tags: ["unit"] }, () => {
it("renders heading with count", () => {
  render(<ClassifyHeader unknownCount={5} />);
  expect(screen.getByText("Classify")).toBeInTheDocument();
  expect(screen.getByText("(5)")).toBeInTheDocument();
});

it("renders zero count", () => {
  render(<ClassifyHeader unknownCount={0} />);
  expect(screen.getByText("(0)")).toBeInTheDocument();
});

})