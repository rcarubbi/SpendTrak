// @ts-nocheck
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FileDropZone from "../FileDropZone";

const providers = [
  { id: "csv", name: "CSV", accept: ".csv" },
];

const defaultProps = {
  dragging: false,
  providers,
  onDragOver: vi.fn(),
  onDragLeave: vi.fn(),
  onDrop: vi.fn(),
  onFilesSelected: vi.fn(),
};

describe("FileDropZone", { tags: ["unit"] }, () => {
it("renders drop zone", () => {
  render(<FileDropZone {...defaultProps} />);
  expect(screen.getByText("Drag files or click to select")).toBeInTheDocument();
  expect(screen.getByText("Select files")).toBeInTheDocument();
});

it("shows dragging state", () => {
  render(<FileDropZone {...defaultProps} dragging={true} />);
  expect(screen.getByText("Drop files here")).toBeInTheDocument();
});

it("calls onFilesSelected when file input changes", async () => {
  const onFilesSelected = vi.fn();
  const user = userEvent.setup();
  render(<FileDropZone {...defaultProps} onFilesSelected={onFilesSelected} />);
  const input = screen.getByTestId("file-input");
  const file = new File(["content"], "test.csv", { type: "text/csv" });
  await user.upload(input, file);
  expect(onFilesSelected).toHaveBeenCalledOnce();
});

})