// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import type { UploadProvider, ParseResult } from "./types";
import type { Transaction } from "../types";
export class BarclaysCsvProvider implements UploadProvider {
  id = stryMutAct_9fa48("1581") ? "" : (stryCov_9fa48("1581"), "barclays-csv");
  name = stryMutAct_9fa48("1582") ? "" : (stryCov_9fa48("1582"), "Barclays Account CSV");
  accept = stryMutAct_9fa48("1583") ? "" : (stryCov_9fa48("1583"), ".csv");
  detectByExtension(fileName: string): boolean {
    if (stryMutAct_9fa48("1584")) {
      {}
    } else {
      stryCov_9fa48("1584");
      return stryMutAct_9fa48("1586") ? fileName.toUpperCase().endsWith(".csv") : stryMutAct_9fa48("1585") ? fileName.toLowerCase().startsWith(".csv") : (stryCov_9fa48("1585", "1586"), fileName.toLowerCase().endsWith(stryMutAct_9fa48("1587") ? "" : (stryCov_9fa48("1587"), ".csv")));
    }
  }
  async parse(file: File): Promise<ParseResult> {
    if (stryMutAct_9fa48("1588")) {
      {}
    } else {
      stryCov_9fa48("1588");
      const text = await file.text();
      const txs = this.parseLines(text);
      return this.buildResult(txs);
    }
  }
  private parseLines(text: string): Transaction[] {
    if (stryMutAct_9fa48("1589")) {
      {}
    } else {
      stryCov_9fa48("1589");
      const lines = stryMutAct_9fa48("1590") ? text.split(/\r?\n/) : (stryCov_9fa48("1590"), text.split(stryMutAct_9fa48("1591") ? /\r\n/ : (stryCov_9fa48("1591"), /\r?\n/)).filter(stryMutAct_9fa48("1592") ? () => undefined : (stryCov_9fa48("1592"), l => stryMutAct_9fa48("1593") ? l : (stryCov_9fa48("1593"), l.trim()))));
      const txs: Transaction[] = stryMutAct_9fa48("1594") ? ["Stryker was here"] : (stryCov_9fa48("1594"), []);
      for (const line of lines) {
        if (stryMutAct_9fa48("1595")) {
          {}
        } else {
          stryCov_9fa48("1595");
          const parts = line.split(stryMutAct_9fa48("1596") ? "" : (stryCov_9fa48("1596"), ","));
          if (stryMutAct_9fa48("1600") ? parts.length >= 6 : stryMutAct_9fa48("1599") ? parts.length <= 6 : stryMutAct_9fa48("1598") ? false : stryMutAct_9fa48("1597") ? true : (stryCov_9fa48("1597", "1598", "1599", "1600"), parts.length < 6)) continue;
          const amount = parseFloat(stryMutAct_9fa48("1601") ? parts[3] : (stryCov_9fa48("1601"), parts[3].trim()));
          if (stryMutAct_9fa48("1604") ? isNaN(amount) && amount >= 0 : stryMutAct_9fa48("1603") ? false : stryMutAct_9fa48("1602") ? true : (stryCov_9fa48("1602", "1603", "1604"), isNaN(amount) || (stryMutAct_9fa48("1607") ? amount < 0 : stryMutAct_9fa48("1606") ? amount > 0 : stryMutAct_9fa48("1605") ? false : (stryCov_9fa48("1605", "1606", "1607"), amount >= 0)))) continue;
          const [day, month, year] = stryMutAct_9fa48("1608") ? parts[1].split("/").map(Number) : (stryCov_9fa48("1608"), parts[1].trim().split(stryMutAct_9fa48("1609") ? "" : (stryCov_9fa48("1609"), "/")).map(Number));
          if (stryMutAct_9fa48("1612") ? (!day || !month) && !year : stryMutAct_9fa48("1611") ? false : stryMutAct_9fa48("1610") ? true : (stryCov_9fa48("1610", "1611", "1612"), (stryMutAct_9fa48("1614") ? !day && !month : stryMutAct_9fa48("1613") ? false : (stryCov_9fa48("1613", "1614"), (stryMutAct_9fa48("1615") ? day : (stryCov_9fa48("1615"), !day)) || (stryMutAct_9fa48("1616") ? month : (stryCov_9fa48("1616"), !month)))) || (stryMutAct_9fa48("1617") ? year : (stryCov_9fa48("1617"), !year)))) continue;
          const subcategory = stryMutAct_9fa48("1618") ? parts[4] : (stryCov_9fa48("1618"), parts[4].trim());
          const memo = stryMutAct_9fa48("1620") ? parts.join(",").trim() : stryMutAct_9fa48("1619") ? parts.slice(5).join(",") : (stryCov_9fa48("1619", "1620"), parts.slice(5).join(stryMutAct_9fa48("1621") ? "" : (stryCov_9fa48("1621"), ",")).trim());
          const desc = stryMutAct_9fa48("1623") ? `${subcategory} ${memo}`.toUpperCase() : stryMutAct_9fa48("1622") ? `${subcategory} ${memo}`.trim().toLowerCase() : (stryCov_9fa48("1622", "1623"), (stryMutAct_9fa48("1624") ? `` : (stryCov_9fa48("1624"), `${subcategory} ${memo}`)).trim().toUpperCase());
          if (stryMutAct_9fa48("1627") ? false : stryMutAct_9fa48("1626") ? true : stryMutAct_9fa48("1625") ? desc : (stryCov_9fa48("1625", "1626", "1627"), !desc)) continue;
          if (stryMutAct_9fa48("1630") ? (desc.includes("AMERICAN EXP") || desc.includes("BARCLAYCARD")) && desc.includes("PAYMENT, THANK YOU") : stryMutAct_9fa48("1629") ? false : stryMutAct_9fa48("1628") ? true : (stryCov_9fa48("1628", "1629", "1630"), (stryMutAct_9fa48("1632") ? desc.includes("AMERICAN EXP") && desc.includes("BARCLAYCARD") : stryMutAct_9fa48("1631") ? false : (stryCov_9fa48("1631", "1632"), desc.includes(stryMutAct_9fa48("1633") ? "" : (stryCov_9fa48("1633"), "AMERICAN EXP")) || desc.includes(stryMutAct_9fa48("1634") ? "" : (stryCov_9fa48("1634"), "BARCLAYCARD")))) || desc.includes(stryMutAct_9fa48("1635") ? "" : (stryCov_9fa48("1635"), "PAYMENT, THANK YOU")))) continue;
          txs.push(stryMutAct_9fa48("1636") ? {} : (stryCov_9fa48("1636"), {
            id: stryMutAct_9fa48("1637") ? `` : (stryCov_9fa48("1637"), `${year}${String(month).padStart(2, stryMutAct_9fa48("1638") ? "" : (stryCov_9fa48("1638"), "0"))}${String(day).padStart(2, stryMutAct_9fa48("1639") ? "" : (stryCov_9fa48("1639"), "0"))}_${Math.abs(amount)}_${stryMutAct_9fa48("1640") ? desc.replace(/\s/g, "_") : (stryCov_9fa48("1640"), desc.slice(0, 20).replace(stryMutAct_9fa48("1641") ? /\S/g : (stryCov_9fa48("1641"), /\s/g), stryMutAct_9fa48("1642") ? "" : (stryCov_9fa48("1642"), "_")))}`),
            date: stryMutAct_9fa48("1643") ? `` : (stryCov_9fa48("1643"), `${year}-${String(month).padStart(2, stryMutAct_9fa48("1644") ? "" : (stryCov_9fa48("1644"), "0"))}-${String(day).padStart(2, stryMutAct_9fa48("1645") ? "" : (stryCov_9fa48("1645"), "0"))}`),
            amount: Math.abs(amount),
            description: desc,
            subcategory,
            categoryId: stryMutAct_9fa48("1646") ? "Stryker was here!" : (stryCov_9fa48("1646"), ""),
            account: stryMutAct_9fa48("1647") ? parts[2] : (stryCov_9fa48("1647"), parts[2].trim()),
            source: stryMutAct_9fa48("1648") ? "Stryker was here!" : (stryCov_9fa48("1648"), "")
          }));
        }
      }
      return txs;
    }
  }
  private buildResult(txs: Transaction[]): ParseResult {
    if (stryMutAct_9fa48("1649")) {
      {}
    } else {
      stryCov_9fa48("1649");
      const months = new Set<string>();
      let total = 0;
      for (const tx of txs) {
        if (stryMutAct_9fa48("1650")) {
          {}
        } else {
          stryCov_9fa48("1650");
          months.add(stryMutAct_9fa48("1651") ? tx.date : (stryCov_9fa48("1651"), tx.date.slice(0, 7)));
          stryMutAct_9fa48("1652") ? total -= tx.amount : (stryCov_9fa48("1652"), total += tx.amount);
        }
      }
      return stryMutAct_9fa48("1653") ? {} : (stryCov_9fa48("1653"), {
        transactions: txs,
        months: stryMutAct_9fa48("1654") ? Array.from(months) : (stryCov_9fa48("1654"), Array.from(months).sort()),
        total
      });
    }
  }
}