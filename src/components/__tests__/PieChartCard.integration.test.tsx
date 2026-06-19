import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PieChartCard from "../PieChartCard";

vi.mock("recharts", async () => {
  const React = await import("react");

  return {
    ResponsiveContainer: ({ children }: { children?: React.ReactNode }) =>
      React.createElement("div", { "data-testid": "responsive-container" }, children),
    PieChart: ({ children }: { children?: React.ReactNode }) =>
      React.createElement("div", { "data-testid": "pie-chart" }, children),
    Pie: (allProps: Record<string, unknown>) => {
      const { children, label, data, ...props } = allProps;
      if (typeof label === "function") {
        label({ name: "Food", percent: 0.5 });
        label({ name: "", percent: undefined });
        label({ name: undefined, percent: 0.5 });
      }
      return React.createElement("div", { "data-testid": "pie", "data-props": JSON.stringify(props) }, children as React.ReactNode);
    },
    Cell: (props: Record<string, unknown>) =>
      React.createElement("div", { "data-testid": "cell", "data-props": JSON.stringify(props) }),
    Tooltip: (allProps: Record<string, unknown>) => {
      const { formatter, ...props } = allProps;
      if (typeof formatter === "function") {
        formatter(100);
        formatter(0);
      }
      return React.createElement("div", { "data-testid": "tooltip", "data-props": JSON.stringify(props) });
    },
  };
});

const data = [
  { name: "Food", value: 500 },
  { name: "Transport", value: 200 },
];

const dataWithMissingCat = [
  { name: "Food", value: 500 },
  { name: "Unknown", value: 300 },
];

const catColorMap = new Map([
  ["Food", "#ef4444"],
  ["Transport", "#3b82f6"],
]);

describe("PieChartCard integration", { tags: ["integration"] }, () => {
  it("renders with data and dark mode", () => {
    render(
      <PieChartCard
        title="Expenses"
        data={data}
        total={700}
        income={1000}
        catColorMap={catColorMap}
        isDark={true}
        emptyText="No data"
      />
    );
    expect(screen.getByText("Expenses")).toBeInTheDocument();
    expect(screen.getByText(/Income:/)).toBeInTheDocument();
    expect(screen.getByText(/700/)).toBeInTheDocument();
  });

  it("renders with missing category color", () => {
    render(
      <PieChartCard
        title="Missing"
        data={dataWithMissingCat}
        total={800}
        income={0}
        catColorMap={catColorMap}
        isDark={false}
        emptyText="No data"
      />
    );
    expect(screen.getByText("Missing")).toBeInTheDocument();
    expect(screen.getByText(/800/)).toBeInTheDocument();
  });

  it("renders with empty data", () => {
    render(
      <PieChartCard
        title="Empty"
        data={[]}
        total={0}
        income={0}
        catColorMap={catColorMap}
        isDark={false}
        emptyText="No data"
      />
    );
    expect(screen.getByText("No data")).toBeInTheDocument();
    expect(screen.queryByTestId("pie-chart")).not.toBeInTheDocument();
  });
});
