import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProviderSelector from "../ProviderSelector";

const providers = [
  { id: "barclays-csv", name: "Barclays CSV", accept: ".csv" },
  { id: "barclays-pdf", name: "Barclays PDF", accept: ".pdf" },
];

it("renders auto-detect and provider options", () => {
  render(<ProviderSelector selectedProvider="auto" providers={providers} onChange={vi.fn()} />);
  const select = screen.getByRole("combobox");
  expect(select).toHaveValue("auto");
  expect(screen.getByText("Auto-detect")).toBeInTheDocument();
  expect(screen.getByText("Barclays CSV")).toBeInTheDocument();
});

it("calls onChange when selection changes", async () => {
  const onChange = vi.fn();
  const user = userEvent.setup();
  render(<ProviderSelector selectedProvider="auto" providers={providers} onChange={onChange} />);
  await user.selectOptions(screen.getByRole("combobox"), "barclays-csv");
  expect(onChange).toHaveBeenCalledWith("barclays-csv");
});
