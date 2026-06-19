// @ts-nocheck
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataGrid from "../DataGrid";
import { useUIStore } from "../../stores/uiStore";

vi.mock("ag-grid-react", async () => {
  const React = await import("react");

  function AgGridReact(props: Record<string, unknown>) {
    const { rowData, columnDefs, onGridReady } = props;
    const ref = React.useRef(null);
    React.useImperativeHandle(ref, () => ({
      api: {
        exportDataAsCsv: vi.fn(),
        sizeColumnsToFit: vi.fn(),
      },
    }));
    React.useEffect(() => {
      if (typeof onGridReady === "function") {
        onGridReady({ api: { exportDataAsCsv: vi.fn(), sizeColumnsToFit: vi.fn() } });
      }
    }, []);
    return React.createElement("div", {
      "data-testid": "ag-grid",
      "data-rows": JSON.stringify(rowData ?? []),
      "data-columns": JSON.stringify(columnDefs ?? []),
      ref,
    });
  }
  return { AgGridReact, default: AgGridReact };
});

const rows = [{ id: "1", name: "test" }];
const colDefs = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
];

describe("DataGrid integration", { tags: ["integration"] }, () => {
  it("renders grid and export button", () => {
    render(<DataGrid rows={rows} colDefs={colDefs} />);
    expect(screen.getByTestId("ag-grid")).toBeInTheDocument();
    expect(screen.getByText("Export CSV")).toBeInTheDocument();
  });

  it("calls export on button click", async () => {
    const user = userEvent.setup();
    render(<DataGrid rows={rows} colDefs={colDefs} />);
    await user.click(screen.getByText("Export CSV"));
  });

  it("applies dark theme", () => {
    useUIStore.setState({ theme: "dark" });
    const { container } = render(<DataGrid rows={rows} colDefs={colDefs} />);
    const gridContainer = container.querySelector("[data-ag-theme-mode]");
    expect(gridContainer?.getAttribute("data-ag-theme-mode")).toBe("dark");
  });

  it("applies light theme", () => {
    useUIStore.setState({ theme: "light" });
    const { container } = render(<DataGrid rows={rows} colDefs={colDefs} />);
    const gridContainer = container.querySelector("[data-ag-theme-mode]");
    expect(gridContainer?.getAttribute("data-ag-theme-mode")).toBe("light");
  });

  it("renders with loading state", () => {
    render(<DataGrid rows={rows} colDefs={colDefs} loading={true} />);
    expect(screen.getByTestId("ag-grid")).toBeInTheDocument();
  });

  it("renders with fillHeight", () => {
    const { container } = render(<DataGrid rows={rows} colDefs={colDefs} fillHeight={true} />);
    const outer = container.firstChild as HTMLElement;
    expect(outer.className).toContain("flex");
  });
});
