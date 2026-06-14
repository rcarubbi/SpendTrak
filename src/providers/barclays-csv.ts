import type { UploadProvider, ParseResult } from "./types";
import type { Transaction } from "../types";

export class BarclaysCsvProvider implements UploadProvider {
  id = "barclays-csv";
  name = "Barclays Account CSV";
  accept = ".csv";

  detectByExtension(fileName: string): boolean {
    return fileName.toLowerCase().endsWith(".csv");
  }

  async parse(file: File): Promise<ParseResult> {
    const text = await file.text();
    const txs = this.parseLines(text);
    return this.buildResult(txs);
  }

  private parseLines(text: string): Transaction[] {
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    const txs: Transaction[] = [];

    for (const line of lines) {
      const parts = line.split(",");
      if (parts.length < 6) continue;

      const amount = parseFloat(parts[3].trim());
      if (isNaN(amount) || amount >= 0) continue;

      const [day, month, year] = parts[1].trim().split("/").map(Number);
      if (!day || !month || !year) continue;

      const subcategory = parts[4].trim();
      const memo = parts.slice(5).join(",").trim();
      const desc = `${subcategory} ${memo}`.trim().toUpperCase();
      if (!desc) continue;

      if (desc.includes("AMERICAN EXP") || desc.includes("BARCLAYCARD") || desc.includes("PAYMENT, THANK YOU")) continue;

      txs.push({
        id: `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}_${Math.abs(amount)}_${desc.slice(0, 20).replace(/\s/g, "_")}`,
        date: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
        amount: Math.abs(amount),
        description: desc,
        subcategory,
        categoryId: "",
        account: parts[2].trim(),
        source: "",
      });
    }

    return txs;
  }

  private buildResult(txs: Transaction[]): ParseResult {
    const months = new Set<string>();
    let total = 0;
    for (const tx of txs) {
      months.add(tx.date.slice(0, 7));
      total += tx.amount;
    }
    return { transactions: txs, months: Array.from(months).sort(), total };
  }
}
