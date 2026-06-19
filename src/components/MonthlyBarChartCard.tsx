import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface MonthlyBarChartCardProps {
  year: string;
  data: Record<string, string | number>[];
  catNames: string[];
  catColorMap: Map<string, string>;
  isDark: boolean;
}

export default function MonthlyBarChartCard({ year, data, catNames, catColorMap, isDark }: MonthlyBarChartCardProps) {
  return (
    <div className="bg-surface-solid dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-xs">
      <p className="text-lg font-semibold mb-4 dark:text-gray-100">Monthly expenses — {year}</p>
      {data.length > 0 && catNames.length > 0 ? (
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke={isDark ? "#6b7280" : "#9ca3af"} />
            <YAxis tick={{ fontSize: 12 }} stroke={isDark ? "#6b7280" : "#9ca3af"} tickFormatter={(v: unknown) => `£${Number(v)}`} />
            <Tooltip
              contentStyle={isDark ? { backgroundColor: "#1f2937", border: "1px solid #374151", color: "#d1d5db" } : undefined}
              formatter={(v: unknown) => `£${(Number(v) || 0).toLocaleString()}`}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {catNames.map((name) => (
              <Bar key={name} dataKey={name} stackId="a" fill={catColorMap.get(name) ?? "#6b7280"} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      ) : <p className="text-gray-400 py-8 text-center">Sem dados</p>}
    </div>
  );
}
