import { useState, useMemo } from "react";
import { useCategoryStore } from "../stores/categoryStore";
import { useTransactionStore } from "../stores/transactionStore";
import { useUIStore } from "../stores/uiStore";
import YearMonthFilter from "../components/YearMonthFilter";
import PieChartCard from "../components/PieChartCard";
import MonthlyBarChartCard from "../components/MonthlyBarChartCard";

const MONTH_LABELS: Record<string, string> = {
  "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
  "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
  "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec",
};

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
    return Array.from(s).toSorted();
  }, [txs]);

  const [selectedYear, setSelectedYear] = useState(() => years[years.length - 1] || String(new Date().getFullYear()));

  const monthsInYear = useMemo(() => {
    const s = new Set<string>();
    for (const tx of txs) {
      if (tx.date.startsWith(selectedYear)) s.add(tx.date.slice(0, 7));
    }
    return Array.from(s).toSorted();
  }, [txs, selectedYear]);

  const [selectedMonth, setSelectedMonth] = useState("");

  const [yearDebit, yearCredit, barData] = useMemo(() => {
    const yearAgg = new Map<string, number>();
    let yearCred = 0;
    const barMap = new Map<string, { month: string; [cat: string]: number | string }>();

    for (const tx of txs) {
      if (tx.date.slice(0, 4) !== selectedYear) continue;
      const isDebit = debitCatIds.has(tx.categoryId);
      const isCredit = creditCatIds.has(tx.categoryId);

      if (isDebit) {
        yearAgg.set(tx.categoryId, (yearAgg.get(tx.categoryId) || 0) + tx.amount);
      }
      if (isCredit) {
        yearCred += tx.amount;
      }
      if (isDebit) {
        const month = tx.date.slice(5, 7);
        const catName = cats.find((c) => c.id === tx.categoryId)?.name ?? tx.categoryId;
        if (!barMap.has(month)) barMap.set(month, { month } as { month: string; [cat: string]: number | string });
        const entry = barMap.get(month);
        if (entry) entry[catName] = ((entry[catName] as number) || 0) + Math.round(tx.amount);
      }
    }

    const yearDeb = Array.from(yearAgg.entries())
      .map(([id, value]) => ({ name: cats.find((c) => c.id === id)?.name ?? id, value: Math.round(value) }))
      .toSorted((a, b) => b.value - a.value);

    const bar = Array.from(barMap.values()).toSorted((a, b) => String(a.month).localeCompare(String(b.month)));

    return [yearDeb, yearCred, bar] as const;
  }, [txs, cats, selectedYear, debitCatIds, creditCatIds]);

  const [monthDebit, monthCredit] = useMemo((): [Array<{ name: string; value: number }>, number] => {
    if (!selectedMonth) return [[], 0];

    const mDebit: { name: string; value: number }[] = [];
    let mCred = 0;

    for (const tx of txs) {
      if (tx.date.slice(0, 7) !== selectedMonth) continue;
      const isDebit = debitCatIds.has(tx.categoryId);
      const isCredit = creditCatIds.has(tx.categoryId);

      if (isDebit) {
        const idx = mDebit.findIndex((d) => d.name === tx.categoryId);
        if (idx >= 0) mDebit[idx].value += Math.round(tx.amount);
        else mDebit.push({ name: tx.categoryId, value: Math.round(tx.amount) });
      }
      if (isCredit) {
        mCred += tx.amount;
      }
    }

    const result = mDebit
      .map((d) => ({ name: cats.find((c) => c.id === d.name)?.name ?? d.name, value: d.value }))
      .toSorted((a, b) => b.value - a.value);

    return [result, mCred];
  }, [txs, cats, selectedMonth, debitCatIds, creditCatIds]);

  const totalYear = yearDebit.reduce((s, d) => s + d.value, 0);
  const totalMonth = monthDebit.reduce((s, d) => s + d.value, 0);

  const catNames = useMemo(() => {
    const names = new Set<string>();
    for (const row of barData) {
      for (const key of Object.keys(row)) {
        if (key !== "month") names.add(key);
      }
    }
    return Array.from(names);
  }, [barData]);

  const fullBarData = useMemo(() => {
    const existing = new Map(barData.map((d) => [d.month, d]));
    return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map((m) => {
      const entry = existing.get(m);
      if (entry) return { ...entry, month: MONTH_LABELS[m] };
      const base: Record<string, string | number> = { month: MONTH_LABELS[m] };
      for (const name of catNames) base[name] = 0;
      return base;
    });
  }, [barData, catNames]);

  // Map category name -> color
  const catColorMap = useMemo(() => {
    const m = new Map<string, string>();
    for (const cat of cats) {
      if (cat.type !== "credit") m.set(cat.name, cat.color);
    }
    return m;
  }, [cats]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">Dashboard</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">{txs.length} transactions loaded</p>

      <YearMonthFilter
        years={years}
        selectedYear={selectedYear}
        onYearChange={(year) => { setSelectedYear(year); setSelectedMonth(""); }}
        monthsInYear={monthsInYear}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PieChartCard
          title={selectedYear}
          data={yearDebit}
          total={totalYear}
          income={yearCredit}
          catColorMap={catColorMap}
          isDark={isDark}
          emptyText="No data"
        />
        <PieChartCard
          title={selectedMonth || "Select a month"}
          data={monthDebit}
          total={totalMonth}
          income={monthCredit}
          catColorMap={catColorMap}
          isDark={isDark}
          emptyText="Select a month"
        />
      </div>

      <MonthlyBarChartCard
        year={selectedYear}
        data={fullBarData}
        catNames={catNames}
        catColorMap={catColorMap}
        isDark={isDark}
      />
    </div>
  );
}
