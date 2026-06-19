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
