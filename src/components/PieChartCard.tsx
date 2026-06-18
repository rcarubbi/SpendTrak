import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function renderLabel({ name, percent }: { name?: string; percent?: number }) {
  return `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`;
}

interface PieChartCardProps {
  title: string;
  data: { name: string; value: number }[];
  total: number;
  income: number;
  catColorMap: Map<string, string>;
  isDark: boolean;
  emptyText: string;
}

export default function PieChartCard({ title, data, total, income, catColorMap, isDark, emptyText }: PieChartCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-xs">
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg font-semibold dark:text-gray-100">{title}</p>
        <div className="text-right text-sm">
          {income > 0 && <p className="text-emerald-600 font-semibold">Income: £{Math.round(income).toLocaleString()}</p>}
          <p className="text-gray-500">Expenses: £{total.toLocaleString()}</p>
        </div>
      </div>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={380}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={140} label={renderLabel} stroke={isDark ? "#374151" : "#fff"} strokeWidth={1}>
              {data.map((entry) => <Cell key={entry.name} fill={catColorMap.get(entry.name) ?? "#6b7280"} />)}
            </Pie>
            <Tooltip
              contentStyle={isDark ? { backgroundColor: "#1f2937", border: "1px solid #374151", color: "#d1d5db" } : undefined}
              formatter={(v: unknown) => `£${(Number(v) || 0).toLocaleString()}`}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : <p className="text-gray-400 py-8 text-center">{emptyText}</p>}
    </div>
  );
}
