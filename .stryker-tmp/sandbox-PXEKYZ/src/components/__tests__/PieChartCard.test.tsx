// @ts-nocheck
import { render, screen } from "@testing-library/react";
import PieChartCard from "../PieChartCard";

const data = [
  { name: "Food", value: 500 },
  { name: "Transport", value: 200 },
];

const catColorMap = new Map([
  ["Food", "#ef4444"],
  ["Transport", "#3b82f6"],
]);

describe("PieChartCard", { tags: ["unit"] }, () => {
it("renders title and totals", () => {
  render(
    <PieChartCard
      title="Expenses by category"
      data={data}
      total={700}
      income={0}
      catColorMap={catColorMap}
      isDark={false}
      emptyText="No data"
    />
  );
  expect(screen.getByText("Expenses by category")).toBeInTheDocument();
  expect(screen.getByText(/700/)).toBeInTheDocument();
});

it("shows empty text when no data", () => {
  render(
    <PieChartCard
      title="Expenses"
      data={[]}
      total={0}
      income={0}
      catColorMap={catColorMap}
      isDark={false}
      emptyText="No data"
    />
  );
  expect(screen.getByText("No data")).toBeInTheDocument();
});

it("shows income when provided", () => {
  render(
    <PieChartCard
      title="Expenses"
      data={data}
      total={700}
      income={1000}
      catColorMap={catColorMap}
      isDark={false}
      emptyText="No data"
    />
  );
  expect(screen.getByText(/Income:/)).toBeInTheDocument();
});

})