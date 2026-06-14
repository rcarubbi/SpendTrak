import type { CsvRow, Transaction } from "../types";

export function parseCsv(text: string): CsvRow[] {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  const rows: CsvRow[] = [];

  for (const line of lines) {
    const parts = line.split(",");
    if (parts.length < 6) continue;

    const fullMemo = parts.slice(5).join(",").trim();

    rows.push({
      number: parts[0].trim(),
      date: parts[1].trim(),
      account: parts[2].trim(),
      amount: parts[3].trim(),
      subcategory: parts[4].trim(),
      memo: fullMemo,
    });
  }

  return rows;
}

export function csvRowsToTransactions(rows: CsvRow[]): Transaction[] {
  const txs: Transaction[] = [];

  for (const row of rows) {
    const amount = parseFloat(row.amount);
    if (isNaN(amount) || amount >= 0) continue;

    const [day, month, year] = row.date.split("/").map(Number);
    if (!day || !month || !year) continue;

    const desc = `${row.subcategory} ${row.memo}`.trim().toUpperCase();
    if (!desc) continue;

    // skip credit card payments and transfers between own accounts
    if (desc.includes("AMERICAN EXP") || desc.includes("BARCLAYCARD") || desc.includes("PAYMENT, THANK YOU")) continue;

    const id = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}_${Math.abs(amount)}_${desc.slice(0, 20).replace(/\s/g, "_")}`;

    txs.push({
      id,
      date: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      amount: Math.abs(amount),
      description: desc,
      subcategory: row.subcategory,
      categoryId: "",
      account: row.account,
      source: "",
    });
  }

  return txs;
}

export function extractYearMonth(fileName: string): { year: number; month: number } | null {
  const name = fileName.replace(/\.[^/.]+$/, "");

  // Try YYYY-MM pattern
  const match1 = name.match(/(\d{4})[_-](\d{2})/);
  if (match1) return { year: parseInt(match1[1]), month: parseInt(match1[2]) };

  // Try pattern like "2025.csv" -> infer January
  const match2 = name.match(/(\d{4})/);
  if (match2) return { year: parseInt(match2[1]), month: 1 };

  return null;
}

export function detectMonthsInRows(rows: CsvRow[]): Set<string> {
  const months = new Set<string>();
  for (const row of rows) {
    const parts = row.date.split("/");
    if (parts.length === 3) {
      months.add(`${parts[2]}-${parts[1]}`);
    }
  }
  return months;
}
