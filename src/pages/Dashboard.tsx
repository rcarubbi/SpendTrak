import { useState, useMemo, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { useCategoryStore } from "../stores/categoryStore";
import { useTransactionStore } from "../stores/transactionStore";
import { useUIStore } from "../stores/uiStore";

export default function Dashboard() {
  const cats = useCategoryStore((s) => s.categories);
  const months = useTransactionStore((s) => s.months);
  const txs = useMemo(() => Object.values(months).flatMap((m) => m.transactions), [months]);
  const theme = useUIStore((s) => s.theme);
  const isDark = useMemo(() => {
    if (theme === "dark") return true;
    if (theme === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }, [theme]);

  const creditCatIds = useMemo(() => new Set(cats.filter((c) => c.type === "credit").map((c) => c.id)), [cats]);
  const debitCatIds = useMemo(() => new Set(cats.filter((c) => c.type !== "credit").map((c) => c.id)), [cats]);

  const years = useMemo(() => {
    const s = new Set(txs.map((t) => t.date.slice(0, 4)));
    return Array.from(s).sort();
  }, [txs]);

  const [selectedYear, setSelectedYear] = useState(years[years.length - 1] || "2026");

  const monthsInYear = useMemo(() => {
    const s = new Set<string>();
    for (const tx of txs) {
      if (tx.date.startsWith(selectedYear)) s.add(tx.date.slice(0, 7));
    }
    return Array.from(s).sort();
  }, [txs, selectedYear]);

  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    if (selectedMonth && !monthsInYear.includes(selectedMonth)) {
      setSelectedMonth("");
    }
  }, [monthsInYear, selectedMonth]);

  const yearDebit = useMemo(() => {
    const agg = new Map<string, number>();
    for (const tx of txs) {
      if (tx.date.slice(0, 4) !== selectedYear || !debitCatIds.has(tx.categoryId)) continue;
      agg.set(tx.categoryId, (agg.get(tx.categoryId) || 0) + tx.amount);
    }
    return Array.from(agg.entries())
      .map(([id, value]) => ({ name: cats.find((c) => c.id === id)?.name ?? id, value: Math.round(value) }))
      .sort((a, b) => b.value - a.value);
  }, [txs, cats, selectedYear, debitCatIds]);

  const yearCredit = useMemo(() => {
    let total = 0;
    for (const tx of txs) {
      if (tx.date.slice(0, 4) === selectedYear && creditCatIds.has(tx.categoryId)) total += tx.amount;
    }
    return total;
  }, [txs, selectedYear, creditCatIds]);

  const monthDebit = useMemo(() => {
    if (!selectedMonth) return [];
    const agg = new Map<string, number>();
    for (const tx of txs) {
      if (tx.date.slice(0, 7) !== selectedMonth || !debitCatIds.has(tx.categoryId)) continue;
      agg.set(tx.categoryId, (agg.get(tx.categoryId) || 0) + tx.amount);
    }
    return Array.from(agg.entries())
      .map(([id, value]) => ({ name: cats.find((c) => c.id === id)?.name ?? id, value: Math.round(value) }))
      .sort((a, b) => b.value - a.value);
  }, [txs, cats, selectedMonth, debitCatIds]);

  const monthCredit = useMemo(() => {
    if (!selectedMonth) return 0;
    let total = 0;
    for (const tx of txs) {
      if (tx.date.slice(0, 7) === selectedMonth && creditCatIds.has(tx.categoryId)) total += tx.amount;
    }
    return total;
  }, [txs, selectedMonth, creditCatIds]);

  const totalYear = yearDebit.reduce((s, d) => s + d.value, 0);
  const totalMonth = monthDebit.reduce((s, d) => s + d.value, 0);

  // Bar chart data
  const barData = useMemo(() => {
    const map = new Map<string, { month: string; [cat: string]: number | string }>();
    for (const tx of txs) {
      if (tx.date.slice(0, 4) !== selectedYear || !debitCatIds.has(tx.categoryId)) continue;
      const month = tx.date.slice(5, 7);
      const catName = cats.find((c) => c.id === tx.categoryId)?.name ?? tx.categoryId;
      if (!map.has(month)) map.set(month, { month } as { month: string; [cat: string]: number | string });
      const entry = map.get(month)!;
      entry[catName] = ((entry[catName] as number) || 0) + Math.round(tx.amount);
    }
    return Array.from(map.values()).sort((a, b) => String(a.month).localeCompare(String(b.month)));
  }, [txs, cats, selectedYear, debitCatIds]);

  const catNames = useMemo(() => {
    const names = new Set<string>();
    for (const row of barData) {
      for (const key of Object.keys(row)) {
        if (key !== "month") names.add(key);
      }
    }
    return Array.from(names);
  }, [barData]);

  const monthLabels = useMemo<Record<string, string>>(() => ({
    "01": "Jan", "02": "Fev", "03": "Mar", "04": "Abr",
    "05": "Mai", "06": "Jun", "07": "Jul", "08": "Ago",
    "09": "Set", "10": "Out", "11": "Nov", "12": "Dez",
  }), []);

  const fullBarData = useMemo(() => {
    const existing = new Map(barData.map((d) => [d.month, d]));
    return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map((m) => {
      const entry = existing.get(m);
      if (entry) return { ...entry, month: monthLabels[m] };
      const base: Record<string, string | number> = { month: monthLabels[m] };
      for (const name of catNames) base[name] = 0;
      return base;
    });
  }, [barData, catNames, monthLabels]);

  // Map category name -> color
  const catColorMap = useMemo(() => {
    const m = new Map<string, string>();
    for (const cat of cats) {
      if (cat.type !== "credit") m.set(cat.name, cat.color);
    }
    return m;
  }, [cats]);

  const renderLabel = ({ name, percent }: { name?: string; percent?: number }) =>
    `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">Dashboard</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">{txs.length} transações carregadas</p>

      <div className="flex gap-3 items-center mb-6">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Ano:</label>
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm">
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <label className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-2">Mês:</label>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm">
          {monthsInYear.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-semibold dark:text-gray-100">{selectedYear}</p>
            <div className="text-right text-sm">
              {yearCredit > 0 && <p className="text-emerald-600 font-semibold">Receita: £{Math.round(yearCredit).toLocaleString()}</p>}
              <p className="text-gray-500">Despesas: £{totalYear.toLocaleString()}</p>
            </div>
          </div>
          {yearDebit.length > 0 ? (
            <ResponsiveContainer width="100%" height={380}>
              <PieChart>
                <Pie data={yearDebit} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={140} label={renderLabel} stroke={isDark ? "#374151" : "#fff"} strokeWidth={1}>
                  {yearDebit.map((entry, i) => <Cell key={i} fill={catColorMap.get(entry.name) ?? "#6b7280"} />)}
                </Pie>
                <Tooltip
                  contentStyle={isDark ? { backgroundColor: "#1f2937", border: "1px solid #374151", color: "#d1d5db" } : undefined}
                  formatter={(v: unknown) => `£${(Number(v) || 0).toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-400 py-8 text-center">Sem dados</p>}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-semibold dark:text-gray-100">{selectedMonth || "Selecione um mês"}</p>
            <div className="text-right text-sm">
              {monthCredit > 0 && <p className="text-emerald-600 font-semibold">Receita: £{Math.round(monthCredit).toLocaleString()}</p>}
              <p className="text-gray-500">Despesas: £{totalMonth.toLocaleString()}</p>
            </div>
          </div>
          {monthDebit.length > 0 ? (
            <ResponsiveContainer width="100%" height={380}>
              <PieChart>
                <Pie data={monthDebit} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={140} label={renderLabel} stroke={isDark ? "#374151" : "#fff"} strokeWidth={1}>
                  {monthDebit.map((entry, i) => <Cell key={i} fill={catColorMap.get(entry.name) ?? "#6b7280"} />)}
                </Pie>
                <Tooltip
                  contentStyle={isDark ? { backgroundColor: "#1f2937", border: "1px solid #374151", color: "#d1d5db" } : undefined}
                  formatter={(v: unknown) => `£${(Number(v) || 0).toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-400 py-8 text-center">Selecione um mês</p>}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-xs">
        <p className="text-lg font-semibold mb-4 dark:text-gray-100">Despesas mensais — {selectedYear}</p>
        {fullBarData.length > 0 && catNames.length > 0 ? (
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={fullBarData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
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
    </div>
  );
}
