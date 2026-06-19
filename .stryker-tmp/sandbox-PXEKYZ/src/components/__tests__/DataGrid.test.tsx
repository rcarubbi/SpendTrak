// @ts-nocheck
import { render, screen } from "@testing-library/react";
import DataGrid from "../DataGrid";

const rows = [{ id: "1", name: "test" }];
const colDefs = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
];

describe("DataGrid", { tags: ["unit"] }, () => {
it("renders mock ag-grid with rows and columns", () => {
  render(<DataGrid rows={rows} colDefs={colDefs} />);
  const grid = screen.getByTestId("ag-grid");
  expect(grid).toBeInTheDocument();
  expect(grid).toHaveAttribute("data-rows", JSON.stringify(rows));
  expect(grid).toHaveAttribute("data-columns", JSON.stringify(colDefs));
});

it("renders export button", () => {
  render(<DataGrid rows={rows} colDefs={colDefs} />);
  expect(screen.getByText("Export CSV")).toBeInTheDocument();
});

it("renders with custom export filename", () => {
  render(<DataGrid rows={rows} colDefs={colDefs} exportFilename="test-export" />);
  expect(screen.getByText("Export CSV")).toBeInTheDocument();
});

it("renders additional buttons", () => {
  render(
    <DataGrid rows={rows} colDefs={colDefs} additionalButtons={<button>Custom</button>} />
  );
  expect(screen.getByText("Custom")).toBeInTheDocument();
});

it("renders with custom height", () => {
  const { container } = render(<DataGrid rows={rows} colDefs={colDefs} height={500} />);
  expect(container.querySelector('[style*="height"]')).toBeInTheDocument();
});

})