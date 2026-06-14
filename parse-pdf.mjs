import * as fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const MONTHS = {
  JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06",
  JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12",
};

const AMOUNT_RE = /(\d[\d,]*\.\d{2})/g;

function parseAmounts(text) {
  const results = [];
  let m;
  const re = new RegExp(AMOUNT_RE.source, "g");
  while ((m = re.exec(text)) !== null) {
    const val = parseFloat(m[1].replace(/,/g, ""));
    if (!isNaN(val)) results.push(val);
  }
  return results;
}

function isFooterJunk(text) {
  const u = text.toUpperCase();
  if (u.length > 120) return true;
  if (/(WWW\.|\.CO\.UK|BARCLAYS\.CO\.UK|0800\s|0345\s)/i.test(u)) return true;
  if (/^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i.test(u)) return true;
  if (/(OVERDRAFT|INTEREST\s+RATE|INTEREST\s+EARNED|TAXPAYER|PERSONAL\s+SAVINGS|TAX\s+AFFAIRS|ALLOWANCE|STATEMENT\s+PERIOD|PRINTING\s+THE|CHARGES\s+EXPLAINED)/i.test(u)) return true;
  if (/^(\d{1,2})\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+\d{4}/i.test(u)) return true;
  return false;
}

function isNoise(text) {
  return /^(PAGE\s*\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\s|STATEMENT|START\s+BALANCE|END\s+BALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\s+(IN|OUT))/i.test(text.trim());
}

async function main() {
  const pdfPath = process.argv[2];
  if (!pdfPath) { console.error("Usage: node parse-pdf.mjs <pdf-path>"); process.exit(1); }

  const buffer = fs.readFileSync(pdfPath).buffer;
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

  let rawLines = [];

  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const items = [];
    for (const item of content.items) {
      const ti = item;
      // Skip empty strings
      if (!ti.str || ti.str.trim() === "") continue;
      items.push({ str: ti.str, x: ti.transform[4], y: ti.transform[5] });
    }

    items.sort((a, b) => a.y - b.y || a.x - b.x);

    // Group into lines by Y (±0.3px)
    const groups = [];
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

  console.error(`Total lines (all pages): ${rawLines.length}`);

  // Dump first 60 line texts
  console.error("--- LINE TEXT (first 60) ---");
  for (let i = 0; i < Math.min(60, rawLines.length); i++) {
    const l = rawLines[i];
    console.error(`L${i} y=${l.y.toFixed(0)} | ${l.text.slice(0, 140).replace(/\n/g, "↵")}`);
  }
  console.error("--- END LINE TEXT ---");

  // Detect year
  let statementYear = new Date().getFullYear();
  for (const line of rawLines) {
    const m = line.text.match(/statement\s+(\d{2})-([A-Za-z]{3})-(\d{2,4})/i);
    if (m) {
      const y = parseInt(m[3]);
      statementYear = y < 100 ? 2000 + y : y;
      console.error(`Year: ${statementYear}`);
      break;
    }
  }

  // Parse transactions — two-pass approach
  // Pass 1: collect all date-header lines and their Y positions
  // Pass 2: for each transaction line, assign the nearest date header by Y
  const txs = [];
  const seen = new Set();
  const dateRe = /^(?:(\d{1,2})\s+|On\s+(\d{1,2})\s+)(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/i;
  const amtSearchRe = /\d[\d,]*\.\d{2}/;

  // --- Pass 1: build date-header index (position-based) ---
  const dateHeaderAtLine = new Map(); // line index → dateStr
  for (let idx = 0; idx < rawLines.length; idx++) {
    const text = rawLines[idx].text.trim();
    if (!text) continue;
    const m = text.match(dateRe);
    if (!m) continue;
    const day = parseInt(m[1] || m[2]);
    const month = MONTHS[(m[3] || m[2]).toUpperCase()];
    if (!(month && day >= 1 && day <= 31)) continue;
    const dateStr = `${statementYear}-${month}-${String(day).padStart(2, "0")}`;
    const afterDate = text.slice(m[0].length).trim();
    // Skip balance/continued lines that happen to start with a date
    if (afterDate && (isNoise(afterDate) || isFooterJunk(afterDate))) continue;
    dateHeaderAtLine.set(idx, dateStr);
  }

  // --- Pass 2: process lines with date-lookup by index ---
  let pendingDescParts = [];

  for (let i = 0; i < rawLines.length; i++) {
    const rawText = rawLines[i].text.trim();
    if (!rawText) continue;

    // Find date by line index: same line → preceding lines → forward (close Y)
    let currentDateStr = "";
    if (dateHeaderAtLine.has(i)) {
      currentDateStr = dateHeaderAtLine.get(i);
    } else {
      // Look backwards first
      for (let j = i - 1; j >= 0; j--) {
        if (dateHeaderAtLine.has(j)) {
          currentDateStr = dateHeaderAtLine.get(j);
          break;
        }
      }
      // If nothing above, look forward within close vertical proximity
      if (!currentDateStr) {
        const curY = rawLines[i].y;
        for (let j = i + 1; j < rawLines.length; j++) {
          if (dateHeaderAtLine.has(j) && Math.abs(rawLines[j].y - curY) < 50) {
            currentDateStr = dateHeaderAtLine.get(j);
            break;
          }
        }
      }
    }

    const dateMatch = rawText.match(dateRe);
    const hasDate = !!dateMatch;

    if (hasDate) {
      pendingDescParts = [];
      const afterDate = rawText.slice(dateMatch[0].length).trim();
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
        let desc;

        if (hasDate && pendingDescParts.length > 0) {
          desc = pendingDescParts.join(" ").trim();
        } else {
          const amtIdx = rawText.search(amtSearchRe);
          const part = (amtIdx >= 0 ? rawText.slice(0, amtIdx) : rawText).trim().toUpperCase();
          desc = (pendingDescParts.join(" ") + " " + part).trim();
        }

        desc = desc.replace(/[^A-Z0-9\s\*\/&.\-]/g, "").replace(/\s+/g, " ").trim();
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

  console.error(`TXs: ${txs.length}`);

  // Output CSV
  const header = "id,date,amount,description,categoryId,account";
  const rows = txs.map(tx =>
    `"${tx.id}","${tx.date}","${tx.amount.toFixed(2)}","${tx.description.replace(/"/g, '""')}","${tx.categoryId}","${tx.account}"`
  );
  console.log(header);
  rows.forEach(r => console.log(r));
}

main().catch(e => { console.error("ERROR:", e); process.exit(1); });
