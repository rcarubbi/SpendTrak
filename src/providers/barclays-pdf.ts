import type { UploadProvider, ParseResult } from "./types";
import type { Transaction } from "../types";
import type * as PdfJs from "pdfjs-dist";

const MONTHS: Record<string, string> = {
  JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06",
  JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12",
};

interface PdfItem {
  str: string;
  x: number;
  y: number;
}



// Matches numbers with exactly 2 decimal places: 6.99, 1,234.56
const AMOUNT_RE = /(\d[\d,]*\.\d{2})/g;

function parseAmounts(text: string): number[] {
  const results: number[] = [];
  let m: RegExpExecArray | null;
  const re = new RegExp(AMOUNT_RE.source, "g");
  while ((m = re.exec(text)) !== null) {
    const val = parseFloat(m[1].replace(/,/g, ""));
    if (!isNaN(val)) results.push(val);
  }
  return results;
}

function isFooterJunk(text: string): boolean {
  const u = text.toUpperCase();
  if (u.length > 120) return true;
  if (/(WWW\.|\.CO\.UK|BARCLAYS\.CO\.UK|0800\s|0345\s)/i.test(u)) return true;
  if (/^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i.test(u)) return true;
  if (/(OVERDRAFT|INTEREST\s+RATE|INTEREST\s+EARNED|TAXPAYER|PERSONAL\s+SAVINGS|TAX\s+AFFAIRS|ALLOWANCE|STATEMENT\s+PERIOD|PRINTING\s+THE|CHARGES\s+EXPLAINED)/i.test(u)) return true;
  if (/^(\d{1,2})\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+\d{4}/i.test(u)) return true;
  return false;
}

function isNoise(text: string): boolean {
  return /^(PAGE\s*\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\s|STATEMENT|START\s+BALANCE|END\s+BALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\s+(IN|OUT))/i.test(text.trim());
}

export class BarclaysPdfProvider implements UploadProvider {
  id = "barclays-pdf";
  name = "Barclays Account PDF";
  accept = ".pdf";
  private debugLog: string[] = [];
  private dbg = (msg: string) => { this.debugLog.push(msg); };

  detectByExtension(fileName: string): boolean {
    const name = fileName.toUpperCase();
    return name.endsWith(".PDF") && name.includes("STATEMENT");
  }

  async parse(file: File): Promise<ParseResult> {
    const pdfjsLib = await importPdfJs();
    return this.doParse(file, pdfjsLib);
  }

  private doParse(file: File, pdfjsLib: typeof PdfJs): Promise<ParseResult> {
    this.debugLog = [];
    this.dbg(`File: ${file.name} (${file.size} bytes)`);

    return (async () => {
      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

      const rawLines: { y: number; text: string }[] = [];

      for (let p = 1; p <= pdf.numPages; p++) {
        const page = await pdf.getPage(p);
        const vp = page.getViewport({ scale: 1 });
        this.dbg(`Page ${p}: w=${vp.width.toFixed(0)} h=${vp.height.toFixed(0)}`);

        const content = await page.getTextContent();
        const items: PdfItem[] = [];
        for (const item of content.items) {
          const ti = item as { str: string; transform: number[] };
          const s = ti.str.trim();
          if (!s) continue;
          items.push({ str: s, x: ti.transform[4], y: ti.transform[5] });
        }

        items.sort((a, b) => a.y - b.y || a.x - b.x);

        const groups: PdfItem[][] = [];
        for (const item of items) {
          const last = groups[groups.length - 1];
          if (last && Math.abs(item.y - last[0].y) <= 0.3) {
            last.push(item);
          } else {
            groups.push([item]);
          }
        }

        for (const g of groups) {
          g.sort((a, b) => a.x - b.x);
          rawLines.push({ y: g[0].y, text: g.map(i => i.str).join(" ") });
        }
      }

      this.dbg(`Total lines (all pages): ${rawLines.length}`);

      this.dbg("--- LINE TEXT (first 60) ---");
      for (let i = 0; i < Math.min(60, rawLines.length); i++) {
        const l = rawLines[i];
        this.dbg(`L${i} y=${l.y.toFixed(0)} | ${l.text.slice(0, 140).replace(/\n/g, "↵")}`);
      }
      this.dbg("--- END LINE TEXT ---");

      let statementYear = new Date().getFullYear();
      for (const line of rawLines) {
        const m = line.text.match(/statement\s+(\d{2})-([A-Za-z]{3})-(\d{2,4})/i);
        if (m) {
          const y = parseInt(m[3]);
          statementYear = y < 100 ? 2000 + y : y;
          this.dbg(`Year: ${statementYear}`);
          break;
        }
      }

      const txs = this.parseLineText(rawLines, statementYear);
      this.dbg(`TXs: ${txs.length}`);

      return this.buildResult(txs);
    })();
  }

  private parseLineText(lines: { y: number; text: string }[], year: number): Transaction[] {
    const dateRe = /^(?:(\d{1,2})\s+|On\s+(\d{1,2})\s+)(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/i;
    const amtSearchRe = /\d[\d,]*\.\d{2}/;

    const dateHeaderAtLine = new Map<number, string>();
    for (let idx = 0; idx < lines.length; idx++) {
      const text = lines[idx].text.trim();
      if (!text) continue;
      const m = text.match(dateRe);
      if (!m) continue;
      const day = parseInt(m[1] || m[2]);
      const month = MONTHS[(m[3] || m[2]).toUpperCase()];
      if (!(month && day >= 1 && day <= 31)) continue;
      const dateStr = `${year}-${month}-${String(day).padStart(2, "0")}`;
      const afterDate = text.slice(m[0].length).trim();
      if (afterDate && (isNoise(afterDate) || isFooterJunk(afterDate))) continue;
      dateHeaderAtLine.set(idx, dateStr);
    }

    const txs: Transaction[] = [];
    const seen = new Set<string>();
    let pendingDescParts: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const rawText = lines[i].text.trim();
      if (!rawText) continue;

      let currentDateStr = "";
      if (dateHeaderAtLine.has(i)) {
        currentDateStr = dateHeaderAtLine.get(i)!;
      } else {
        for (let j = i - 1; j >= 0; j--) {
          if (dateHeaderAtLine.has(j)) {
            currentDateStr = dateHeaderAtLine.get(j)!;
            break;
          }
        }
        if (!currentDateStr) {
          const curY = lines[i].y;
          for (let j = i + 1; j < lines.length; j++) {
            if (dateHeaderAtLine.has(j) && Math.abs(lines[j].y - curY) < 50) {
              currentDateStr = dateHeaderAtLine.get(j)!;
              break;
            }
          }
        }
      }

      const dateMatch = rawText.match(dateRe);
      const hasDate = !!dateMatch;

      if (hasDate) {
        pendingDescParts = [];
        const afterDate = rawText.slice(dateMatch![0].length).trim();
        if (afterDate) {
          const amtIdx = afterDate.search(amtSearchRe);
          if (amtIdx >= 0) {
            const part = afterDate.slice(0, amtIdx).trim().toUpperCase();
            if (part) pendingDescParts.push(part);
          } else {
            pendingDescParts.push(afterDate.toUpperCase());
          }
        }
      }

      if (!currentDateStr) continue;
      if (isNoise(rawText)) continue;

      const upperText = rawText.toUpperCase();
      const isFooter = isFooterJunk(rawText);
      const amounts = parseAmounts(rawText);

      if (amounts.length > 0) {
        const txAmount = amounts[0];
        if (txAmount >= 0.01) {
          let desc: string;

          if (hasDate && pendingDescParts.length > 0) {
            desc = pendingDescParts.join(" ").trim();
          } else {
            const amtIdx = rawText.search(amtSearchRe);
            const part = (amtIdx >= 0 ? rawText.slice(0, amtIdx) : rawText).trim().toUpperCase();
            desc = (pendingDescParts.join(" ") + " " + part).trim();
          }

          desc = desc.replace(/[^A-Z0-9\s*/&.-]/g, "").replace(/\s+/g, " ").trim();
          if (desc.length >= 2 && !isNoise(desc) && !isFooterJunk(desc)) {
            const isCredit = /CREDIT|REFUND|CASHBACK|DIVIDEND|INTEREST\s+PAID|RECEIVED\s+FROM|RETURNED/i.test(desc);
            const id = `${currentDateStr.replace(/-/g, "")}_${txAmount}_${desc.slice(0, 30).replace(/[\s,]/g, "_")}`;

            if (!seen.has(id)) {
              seen.add(id);
              txs.push({
                id,
                date: currentDateStr,
                amount: txAmount,
                description: desc,
                subcategory: "",
                categoryId: isCredit ? "receita" : "",
                account: "BARCLAYS PDF",
                source: "",
              });
            }
          }
        }
        pendingDescParts = [];
      } else if (isFooter) {
        pendingDescParts = [];
      } else if (!hasDate && rawText.length > 3) {
        const part = upperText;
        if (!isNoise(part) && !isFooterJunk(part)) {
          pendingDescParts.push(part);
        }
      }
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
    return {
      transactions: txs,
      months: Array.from(months).sort(),
      total,
      debug: this.debugLog.join("\n"),
    };
  }
}

async function importPdfJs(): Promise<typeof PdfJs> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).href;
  return pdfjsLib;
}
