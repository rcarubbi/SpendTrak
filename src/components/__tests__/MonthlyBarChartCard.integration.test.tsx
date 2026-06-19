import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MonthlyBarChartCard from "../MonthlyBarChartCard";

vi.mock("recharts", async () => {
  const React = await import("react");
  const section = (testId: string) => ({ children }: { children?: React.ReactNode }) =>
    React.createElement("div", { "data-testid": testId }, children);

  return {
    ResponsiveContainer: section("responsive-container"),
    BarChart: section("bar-chart"),
    Bar: ({ children, ...props }: Record<string, unknown>) =>
      React.createElement("div", { "data-testid": "bar", "data-props": JSON.stringify(props) }, children),
    XAxis: (props: Record<string, unknown>) =>
      React.createElement("div", { "data-testid": "xaxis", "data-props": JSON.stringify(props) }),
    YAxis: (allProps: Record<string, unknown>) => {
      const { tickFormatter, ...props } = allProps;
      if (typeof tickFormatter === "function") {
        tickFormatter(100);
        tickFormatter(0);
      }
      return React.createElement("div", { "data-testid": "yaxis", "data-props": JSON.stringify(props) });
    },
    CartesianGrid: (props: Record<string, unknown>) =>
      React.createElement("div", { "data-testid": "cartesian-grid", "data-props": JSON.stringify(props) }),
    Tooltip: (allProps: Record<string, unknown>) => {
      const { formatter, ...props } = allProps;
      if (typeof formatter === "function") {
        formatter(100);
        formatter(0);
      }
      return React.createElement("div", { "data-testid": "tooltip", "data-props": JSON.stringify(props) });
    },
    Legend: (props: Record<string, unknown>) =>
      React.createElement("div", { "data-testid": "legend", "data-props": JSON.stringify(props) }),
  };
});

const data = [
  { month: "Jan", Food: 300, Transport: 100 },
  { month: "Feb", Food: 400, Transport: 150 },
];

const catColorMap = new Map([
  ["Food", "#ef4444"],
  ["Transport", "#3b82f6"],
]);

describe("MonthlyBarChartCard integration", () => {
  it("renders chart with dark mode", () => {
    render(
      <MonthlyBarChartCard
        year="2024"
        data={data}
        catNames={["Food", "Transport"]}
        catColorMap={catColorMap}
        isDark={true}
      />
    );
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  it("renders with missing category color", () => {
    render(
      <MonthlyBarChartCard
        year="2025"
        data={data}
        catNames={["Food", "Unknown"]}
        catColorMap={catColorMap}
        isDark={false}
      />
    );
    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });

  it("shows empty message when no data", () => {
    render(
      <MonthlyBarChartCard
        year="2024"
        data={[]}
        catNames={[]}
        catColorMap={catColorMap}
        isDark={false}
      />
    );
    expect(screen.getByText("Sem dados")).toBeInTheDocument();
  });
});
