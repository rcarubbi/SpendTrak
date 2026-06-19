import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(() => false),
  }),
});

Object.defineProperty(window, "showDirectoryPicker", {
  writable: true,
  value: () => Promise.reject(new DOMException("Not supported", "AbortError")),
});

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

vi.mock("ag-grid-community", () => {
  const ModuleRegistry = { registerModules: vi.fn() };
  const themeQuartz = { withParams: () => themeQuartz };
  return {
    ModuleRegistry, themeQuartz,
    ClientSideRowModelModule: {},
    CsvExportModule: {},
    RowStyleModule: {},
  };
});

vi.mock("ag-grid-react", async () => {
  const React = await import("react");
  const MockAgGrid = ({ rowData, columnDefs }: Record<string, unknown>) =>
    React.createElement("div", {
      "data-testid": "ag-grid",
      "data-rows": JSON.stringify(rowData),
      "data-columns": JSON.stringify(columnDefs),
    });
  return { AgGridReact: MockAgGrid, default: MockAgGrid };
});

vi.mock("recharts", async () => {
  const React = await import("react");
  const mkEl = (testId: string) => (props: Record<string, unknown>) =>
    React.createElement("div", { "data-testid": testId, "data-props": JSON.stringify(props) });
  const section = (testId: string) => ({ children }: { children?: React.ReactNode }) =>
    React.createElement("div", { "data-testid": testId }, children);

  return {
    ResponsiveContainer: section("responsive-container"),
    PieChart: section("pie-chart"),
    Pie: ({ children, ...props }: Record<string, unknown>) =>
      React.createElement("div", { "data-testid": "pie", "data-props": JSON.stringify(props) }, children),
    Cell: mkEl("cell"),
    BarChart: section("bar-chart"),
    Bar: mkEl("bar"),
    XAxis: mkEl("xaxis"),
    YAxis: mkEl("yaxis"),
    CartesianGrid: mkEl("cartesian-grid"),
    Tooltip: mkEl("tooltip"),
    Legend: mkEl("legend"),
  };
});

vi.mock("../utils/fileSystem", () => ({
  readJSON: vi.fn().mockResolvedValue(null),
  writeJSON: vi.fn().mockResolvedValue(undefined),
  ensureDataDir: vi.fn().mockResolvedValue(true),
  pickDataDir: vi.fn().mockResolvedValue(undefined),
  writeMonthData: vi.fn().mockResolvedValue(undefined),
  listAllMonthData: vi.fn().mockResolvedValue([]),
  readMonthData: vi.fn().mockResolvedValue(null),
  listMonthFiles: vi.fn().mockResolvedValue([]),
}));
