import { render, screen } from "@testing-library/react";
import MonthlyBarChartCard from "../MonthlyBarChartCard";

const data = [
  { month: "Jan", Food: 300, Transport: 100 },
  { month: "Feb", Food: 400, Transport: 150 },
];

const catColorMap = new Map([
  ["Food", "#ef4444"],
  ["Transport", "#3b82f6"],
]);

describe("MonthlyBarChartCard", { tags: ["unit"] }, () => {
it("renders chart with data", () => {
  render(
    <MonthlyBarChartCard
      year="2024"
      data={data}
      catNames={["Food", "Transport"]}
      catColorMap={catColorMap}
      isDark={false}
    />
  );
  expect(screen.getByText(/2024/)).toBeInTheDocument();
  expect(screen.getByText("Monthly expenses — 2024")).toBeInTheDocument();
  expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
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

it("renders with dark mode", () => {
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

it("shows empty message when data exists but no catNames", () => {
  render(
    <MonthlyBarChartCard
      year="2024"
      data={data}
      catNames={[]}
      catColorMap={catColorMap}
      isDark={false}
    />
  );
  expect(screen.getByText("Sem dados")).toBeInTheDocument();
});

it("shows empty message when catNames exist but no data", () => {
  render(
    <MonthlyBarChartCard
      year="2024"
      data={[]}
      catNames={["Food"]}
      catColorMap={catColorMap}
      isDark={false}
    />
  );
  expect(screen.getByText("Sem dados")).toBeInTheDocument();
});

it("renders bar for each category name", () => {
  render(
    <MonthlyBarChartCard
      year="2024"
      data={data}
      catNames={["Food", "Transport"]}
      catColorMap={catColorMap}
      isDark={false}
    />
  );
  const bars = screen.getAllByTestId("bar");
  expect(bars).toHaveLength(2);
});

it("renders fallback for missing color in catColorMap", () => {
  const partialMap = new Map([["Food", "#ef4444"]]);
  render(
    <MonthlyBarChartCard
      year="2024"
      data={data}
      catNames={["Food", "Transport"]}
      catColorMap={partialMap}
      isDark={false}
    />
  );
  const bars = screen.getAllByTestId("bar");
  expect(bars).toHaveLength(2);
});
})