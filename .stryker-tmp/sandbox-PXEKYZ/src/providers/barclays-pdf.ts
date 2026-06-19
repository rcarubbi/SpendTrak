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
import type * as PdfJs from "pdfjs-dist";
import { CATEGORY_IDS } from "../constants";
const MONTHS: Record<string, string> = stryMutAct_9fa48("1655") ? {} : (stryCov_9fa48("1655"), {
  JAN: stryMutAct_9fa48("1656") ? "" : (stryCov_9fa48("1656"), "01"),
  FEB: stryMutAct_9fa48("1657") ? "" : (stryCov_9fa48("1657"), "02"),
  MAR: stryMutAct_9fa48("1658") ? "" : (stryCov_9fa48("1658"), "03"),
  APR: stryMutAct_9fa48("1659") ? "" : (stryCov_9fa48("1659"), "04"),
  MAY: stryMutAct_9fa48("1660") ? "" : (stryCov_9fa48("1660"), "05"),
  JUN: stryMutAct_9fa48("1661") ? "" : (stryCov_9fa48("1661"), "06"),
  JUL: stryMutAct_9fa48("1662") ? "" : (stryCov_9fa48("1662"), "07"),
  AUG: stryMutAct_9fa48("1663") ? "" : (stryCov_9fa48("1663"), "08"),
  SEP: stryMutAct_9fa48("1664") ? "" : (stryCov_9fa48("1664"), "09"),
  OCT: stryMutAct_9fa48("1665") ? "" : (stryCov_9fa48("1665"), "10"),
  NOV: stryMutAct_9fa48("1666") ? "" : (stryCov_9fa48("1666"), "11"),
  DEC: stryMutAct_9fa48("1667") ? "" : (stryCov_9fa48("1667"), "12")
});
interface PdfItem {
  str: string;
  x: number;
  y: number;
}

// Matches numbers with exactly 2 decimal places: 6.99, 1,234.56
const AMOUNT_RE = stryMutAct_9fa48("1673") ? /(\d[\d,]*\.\D{2})/g : stryMutAct_9fa48("1672") ? /(\d[\d,]*\.\d)/g : stryMutAct_9fa48("1671") ? /(\d[\D,]*\.\d{2})/g : stryMutAct_9fa48("1670") ? /(\d[^\d,]*\.\d{2})/g : stryMutAct_9fa48("1669") ? /(\d[\d,]\.\d{2})/g : stryMutAct_9fa48("1668") ? /(\D[\d,]*\.\d{2})/g : (stryCov_9fa48("1668", "1669", "1670", "1671", "1672", "1673"), /(\d[\d,]*\.\d{2})/g);
function parseAmounts(text: string): number[] {
  if (stryMutAct_9fa48("1674")) {
    {}
  } else {
    stryCov_9fa48("1674");
    const results: number[] = stryMutAct_9fa48("1675") ? ["Stryker was here"] : (stryCov_9fa48("1675"), []);
    let m: RegExpExecArray | null;
    const re = new RegExp(AMOUNT_RE.source, stryMutAct_9fa48("1676") ? "" : (stryCov_9fa48("1676"), "g"));
    while (stryMutAct_9fa48("1678") ? (m = re.exec(text)) === null : stryMutAct_9fa48("1677") ? false : (stryCov_9fa48("1677", "1678"), (m = re.exec(text)) !== null)) {
      if (stryMutAct_9fa48("1679")) {
        {}
      } else {
        stryCov_9fa48("1679");
        const val = parseFloat(m[1].replace(/,/g, stryMutAct_9fa48("1680") ? "Stryker was here!" : (stryCov_9fa48("1680"), "")));
        if (stryMutAct_9fa48("1683") ? false : stryMutAct_9fa48("1682") ? true : stryMutAct_9fa48("1681") ? isNaN(val) : (stryCov_9fa48("1681", "1682", "1683"), !isNaN(val))) results.push(val);
      }
    }
    return results;
  }
}
function isFooterJunk(text: string): boolean {
  if (stryMutAct_9fa48("1684")) {
    {}
  } else {
    stryCov_9fa48("1684");
    const u = stryMutAct_9fa48("1685") ? text.toLowerCase() : (stryCov_9fa48("1685"), text.toUpperCase());
    if (stryMutAct_9fa48("1689") ? u.length <= 120 : stryMutAct_9fa48("1688") ? u.length >= 120 : stryMutAct_9fa48("1687") ? false : stryMutAct_9fa48("1686") ? true : (stryCov_9fa48("1686", "1687", "1688", "1689"), u.length > 120)) return stryMutAct_9fa48("1690") ? false : (stryCov_9fa48("1690"), true);
    if (stryMutAct_9fa48("1692") ? false : stryMutAct_9fa48("1691") ? true : (stryCov_9fa48("1691", "1692"), (stryMutAct_9fa48("1694") ? /(WWW\.|\.CO\.UK|BARCLAYS\.CO\.UK|0800\s|0345\S)/i : stryMutAct_9fa48("1693") ? /(WWW\.|\.CO\.UK|BARCLAYS\.CO\.UK|0800\S|0345\s)/i : (stryCov_9fa48("1693", "1694"), /(WWW\.|\.CO\.UK|BARCLAYS\.CO\.UK|0800\s|0345\s)/i)).test(u))) return stryMutAct_9fa48("1695") ? false : (stryCov_9fa48("1695"), true);
    if (stryMutAct_9fa48("1697") ? false : stryMutAct_9fa48("1696") ? true : (stryCov_9fa48("1696", "1697"), (stryMutAct_9fa48("1720") ? /^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\S+YOUR)/i : stryMutAct_9fa48("1719") ? /^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\sYOUR)/i : stryMutAct_9fa48("1718") ? /^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\S+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1717") ? /^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\sIN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1716") ? /^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\S+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1715") ? /^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\sYOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1714") ? /^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\S+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1713") ? /^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\sCALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1712") ? /^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\S+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1711") ? /^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\sCAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1710") ? /^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\S+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1709") ? /^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\sACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1708") ? /^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\S+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1707") ? /^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\sIS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1706") ? /^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\S+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1705") ? /^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\sMORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1704") ? /^(THE|IF\s+YOUR|IF\s+YOU|TO\S+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1703") ? /^(THE|IF\s+YOUR|IF\s+YOU|TO\sHELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1702") ? /^(THE|IF\s+YOUR|IF\S+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1701") ? /^(THE|IF\s+YOUR|IF\sYOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1700") ? /^(THE|IF\S+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1699") ? /^(THE|IF\sYOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : stryMutAct_9fa48("1698") ? /(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i : (stryCov_9fa48("1698", "1699", "1700", "1701", "1702", "1703", "1704", "1705", "1706", "1707", "1708", "1709", "1710", "1711", "1712", "1713", "1714", "1715", "1716", "1717", "1718", "1719", "1720"), /^(THE|IF\s+YOUR|IF\s+YOU|TO\s+HELP|FOR\s+MORE|THIS\s+IS|YOUR\s+ACCOUNT|YOU\s+CAN|PLEASE\s+CALL|MONITOR\s+YOUR|STAY\s+IN|IDENTIFY\s+YOUR)/i)).test(u))) return stryMutAct_9fa48("1721") ? false : (stryCov_9fa48("1721"), true);
    if (stryMutAct_9fa48("1723") ? false : stryMutAct_9fa48("1722") ? true : (stryCov_9fa48("1722", "1723"), (stryMutAct_9fa48("1737") ? /(OVERDRAFT|INTEREST\s+RATE|INTEREST\s+EARNED|TAXPAYER|PERSONAL\s+SAVINGS|TAX\s+AFFAIRS|ALLOWANCE|STATEMENT\s+PERIOD|PRINTING\s+THE|CHARGES\S+EXPLAINED)/i : stryMutAct_9fa48("1736") ? /(OVERDRAFT|INTEREST\s+RATE|INTEREST\s+EARNED|TAXPAYER|PERSONAL\s+SAVINGS|TAX\s+AFFAIRS|ALLOWANCE|STATEMENT\s+PERIOD|PRINTING\s+THE|CHARGES\sEXPLAINED)/i : stryMutAct_9fa48("1735") ? /(OVERDRAFT|INTEREST\s+RATE|INTEREST\s+EARNED|TAXPAYER|PERSONAL\s+SAVINGS|TAX\s+AFFAIRS|ALLOWANCE|STATEMENT\s+PERIOD|PRINTING\S+THE|CHARGES\s+EXPLAINED)/i : stryMutAct_9fa48("1734") ? /(OVERDRAFT|INTEREST\s+RATE|INTEREST\s+EARNED|TAXPAYER|PERSONAL\s+SAVINGS|TAX\s+AFFAIRS|ALLOWANCE|STATEMENT\s+PERIOD|PRINTING\sTHE|CHARGES\s+EXPLAINED)/i : stryMutAct_9fa48("1733") ? /(OVERDRAFT|INTEREST\s+RATE|INTEREST\s+EARNED|TAXPAYER|PERSONAL\s+SAVINGS|TAX\s+AFFAIRS|ALLOWANCE|STATEMENT\S+PERIOD|PRINTING\s+THE|CHARGES\s+EXPLAINED)/i : stryMutAct_9fa48("1732") ? /(OVERDRAFT|INTEREST\s+RATE|INTEREST\s+EARNED|TAXPAYER|PERSONAL\s+SAVINGS|TAX\s+AFFAIRS|ALLOWANCE|STATEMENT\sPERIOD|PRINTING\s+THE|CHARGES\s+EXPLAINED)/i : stryMutAct_9fa48("1731") ? /(OVERDRAFT|INTEREST\s+RATE|INTEREST\s+EARNED|TAXPAYER|PERSONAL\s+SAVINGS|TAX\S+AFFAIRS|ALLOWANCE|STATEMENT\s+PERIOD|PRINTING\s+THE|CHARGES\s+EXPLAINED)/i : stryMutAct_9fa48("1730") ? /(OVERDRAFT|INTEREST\s+RATE|INTEREST\s+EARNED|TAXPAYER|PERSONAL\s+SAVINGS|TAX\sAFFAIRS|ALLOWANCE|STATEMENT\s+PERIOD|PRINTING\s+THE|CHARGES\s+EXPLAINED)/i : stryMutAct_9fa48("1729") ? /(OVERDRAFT|INTEREST\s+RATE|INTEREST\s+EARNED|TAXPAYER|PERSONAL\S+SAVINGS|TAX\s+AFFAIRS|ALLOWANCE|STATEMENT\s+PERIOD|PRINTING\s+THE|CHARGES\s+EXPLAINED)/i : stryMutAct_9fa48("1728") ? /(OVERDRAFT|INTEREST\s+RATE|INTEREST\s+EARNED|TAXPAYER|PERSONAL\sSAVINGS|TAX\s+AFFAIRS|ALLOWANCE|STATEMENT\s+PERIOD|PRINTING\s+THE|CHARGES\s+EXPLAINED)/i : stryMutAct_9fa48("1727") ? /(OVERDRAFT|INTEREST\s+RATE|INTEREST\S+EARNED|TAXPAYER|PERSONAL\s+SAVINGS|TAX\s+AFFAIRS|ALLOWANCE|STATEMENT\s+PERIOD|PRINTING\s+THE|CHARGES\s+EXPLAINED)/i : stryMutAct_9fa48("1726") ? /(OVERDRAFT|INTEREST\s+RATE|INTEREST\sEARNED|TAXPAYER|PERSONAL\s+SAVINGS|TAX\s+AFFAIRS|ALLOWANCE|STATEMENT\s+PERIOD|PRINTING\s+THE|CHARGES\s+EXPLAINED)/i : stryMutAct_9fa48("1725") ? /(OVERDRAFT|INTEREST\S+RATE|INTEREST\s+EARNED|TAXPAYER|PERSONAL\s+SAVINGS|TAX\s+AFFAIRS|ALLOWANCE|STATEMENT\s+PERIOD|PRINTING\s+THE|CHARGES\s+EXPLAINED)/i : stryMutAct_9fa48("1724") ? /(OVERDRAFT|INTEREST\sRATE|INTEREST\s+EARNED|TAXPAYER|PERSONAL\s+SAVINGS|TAX\s+AFFAIRS|ALLOWANCE|STATEMENT\s+PERIOD|PRINTING\s+THE|CHARGES\s+EXPLAINED)/i : (stryCov_9fa48("1724", "1725", "1726", "1727", "1728", "1729", "1730", "1731", "1732", "1733", "1734", "1735", "1736", "1737"), /(OVERDRAFT|INTEREST\s+RATE|INTEREST\s+EARNED|TAXPAYER|PERSONAL\s+SAVINGS|TAX\s+AFFAIRS|ALLOWANCE|STATEMENT\s+PERIOD|PRINTING\s+THE|CHARGES\s+EXPLAINED)/i)).test(u))) return stryMutAct_9fa48("1738") ? false : (stryCov_9fa48("1738"), true);
    if (stryMutAct_9fa48("1740") ? false : stryMutAct_9fa48("1739") ? true : (stryCov_9fa48("1739", "1740"), (stryMutAct_9fa48("1749") ? /^(\d{1,2})\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+\D{4}/i : stryMutAct_9fa48("1748") ? /^(\d{1,2})\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+\d/i : stryMutAct_9fa48("1747") ? /^(\d{1,2})\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\S+\d{4}/i : stryMutAct_9fa48("1746") ? /^(\d{1,2})\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s\d{4}/i : stryMutAct_9fa48("1745") ? /^(\d{1,2})\S+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+\d{4}/i : stryMutAct_9fa48("1744") ? /^(\d{1,2})\s(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+\d{4}/i : stryMutAct_9fa48("1743") ? /^(\D{1,2})\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+\d{4}/i : stryMutAct_9fa48("1742") ? /^(\d)\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+\d{4}/i : stryMutAct_9fa48("1741") ? /(\d{1,2})\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+\d{4}/i : (stryCov_9fa48("1741", "1742", "1743", "1744", "1745", "1746", "1747", "1748", "1749"), /^(\d{1,2})\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+\d{4}/i)).test(u))) return stryMutAct_9fa48("1750") ? false : (stryCov_9fa48("1750"), true);
    return stryMutAct_9fa48("1751") ? true : (stryCov_9fa48("1751"), false);
  }
}
function isNoise(text: string): boolean {
  if (stryMutAct_9fa48("1752")) {
    {}
  } else {
    stryCov_9fa48("1752");
    return (stryMutAct_9fa48("1770") ? /^(PAGE\s*\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\s|STATEMENT|START\s+BALANCE|END\s+BALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\S+(IN|OUT))/i : stryMutAct_9fa48("1769") ? /^(PAGE\s*\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\s|STATEMENT|START\s+BALANCE|END\s+BALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\s(IN|OUT))/i : stryMutAct_9fa48("1768") ? /^(PAGE\s*\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\s|STATEMENT|START\s+BALANCE|END\s+BALANCE|OVERDRAFT|TIMED\S+AT|NOTEMACHINE|MONEY\s+(IN|OUT))/i : stryMutAct_9fa48("1767") ? /^(PAGE\s*\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\s|STATEMENT|START\s+BALANCE|END\s+BALANCE|OVERDRAFT|TIMED\sAT|NOTEMACHINE|MONEY\s+(IN|OUT))/i : stryMutAct_9fa48("1766") ? /^(PAGE\s*\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\s|STATEMENT|START\s+BALANCE|END\S+BALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\s+(IN|OUT))/i : stryMutAct_9fa48("1765") ? /^(PAGE\s*\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\s|STATEMENT|START\s+BALANCE|END\sBALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\s+(IN|OUT))/i : stryMutAct_9fa48("1764") ? /^(PAGE\s*\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\s|STATEMENT|START\S+BALANCE|END\s+BALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\s+(IN|OUT))/i : stryMutAct_9fa48("1763") ? /^(PAGE\s*\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\s|STATEMENT|START\sBALANCE|END\s+BALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\s+(IN|OUT))/i : stryMutAct_9fa48("1762") ? /^(PAGE\s*\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\S|STATEMENT|START\s+BALANCE|END\s+BALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\s+(IN|OUT))/i : stryMutAct_9fa48("1761") ? /^(PAGE\s*\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\s|ACCOUNT\S|SORT\s|STATEMENT|START\s+BALANCE|END\s+BALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\s+(IN|OUT))/i : stryMutAct_9fa48("1760") ? /^(PAGE\s*\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\S|ACCOUNT\s|SORT\s|STATEMENT|START\s+BALANCE|END\s+BALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\s+(IN|OUT))/i : stryMutAct_9fa48("1759") ? /^(PAGE\s*\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\S+PAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\s|STATEMENT|START\s+BALANCE|END\s+BALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\s+(IN|OUT))/i : stryMutAct_9fa48("1758") ? /^(PAGE\s*\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\sPAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\s|STATEMENT|START\s+BALANCE|END\s+BALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\s+(IN|OUT))/i : stryMutAct_9fa48("1757") ? /^(PAGE\s*\D*|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\s|STATEMENT|START\s+BALANCE|END\s+BALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\s+(IN|OUT))/i : stryMutAct_9fa48("1756") ? /^(PAGE\s*\d|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\s|STATEMENT|START\s+BALANCE|END\s+BALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\s+(IN|OUT))/i : stryMutAct_9fa48("1755") ? /^(PAGE\S*\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\s|STATEMENT|START\s+BALANCE|END\s+BALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\s+(IN|OUT))/i : stryMutAct_9fa48("1754") ? /^(PAGE\s\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\s|STATEMENT|START\s+BALANCE|END\s+BALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\s+(IN|OUT))/i : stryMutAct_9fa48("1753") ? /(PAGE\s*\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\s|STATEMENT|START\s+BALANCE|END\s+BALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\s+(IN|OUT))/i : (stryCov_9fa48("1753", "1754", "1755", "1756", "1757", "1758", "1759", "1760", "1761", "1762", "1763", "1764", "1765", "1766", "1767", "1768", "1769", "1770"), /^(PAGE\s*\d*|OPENING|CLOSING|TOTAL|BALANCE|THIS\s+PAGE|CONTINUED|DATE\s|ACCOUNT\s|SORT\s|STATEMENT|START\s+BALANCE|END\s+BALANCE|OVERDRAFT|TIMED\s+AT|NOTEMACHINE|MONEY\s+(IN|OUT))/i)).test(stryMutAct_9fa48("1771") ? text : (stryCov_9fa48("1771"), text.trim()));
  }
}
export class BarclaysPdfProvider implements UploadProvider {
  id = stryMutAct_9fa48("1772") ? "" : (stryCov_9fa48("1772"), "barclays-pdf");
  name = stryMutAct_9fa48("1773") ? "" : (stryCov_9fa48("1773"), "Barclays Account PDF");
  accept = stryMutAct_9fa48("1774") ? "" : (stryCov_9fa48("1774"), ".pdf");
  private debugLog: string[] = stryMutAct_9fa48("1775") ? ["Stryker was here"] : (stryCov_9fa48("1775"), []);
  private dbg = (msg: string) => {
    if (stryMutAct_9fa48("1776")) {
      {}
    } else {
      stryCov_9fa48("1776");
      this.debugLog.push(msg);
    }
  };
  detectByExtension(fileName: string): boolean {
    if (stryMutAct_9fa48("1777")) {
      {}
    } else {
      stryCov_9fa48("1777");
      const name = stryMutAct_9fa48("1778") ? fileName.toLowerCase() : (stryCov_9fa48("1778"), fileName.toUpperCase());
      return stryMutAct_9fa48("1781") ? name.endsWith(".PDF") || name.includes("STATEMENT") : stryMutAct_9fa48("1780") ? false : stryMutAct_9fa48("1779") ? true : (stryCov_9fa48("1779", "1780", "1781"), (stryMutAct_9fa48("1782") ? name.startsWith(".PDF") : (stryCov_9fa48("1782"), name.endsWith(stryMutAct_9fa48("1783") ? "" : (stryCov_9fa48("1783"), ".PDF")))) && name.includes(stryMutAct_9fa48("1784") ? "" : (stryCov_9fa48("1784"), "STATEMENT")));
    }
  }
  async parse(file: File): Promise<ParseResult> {
    if (stryMutAct_9fa48("1785")) {
      {}
    } else {
      stryCov_9fa48("1785");
      const pdfjsLib = await importPdfJs();
      return this.doParse(file, pdfjsLib);
    }
  }
  private doParse(file: File, pdfjsLib: typeof PdfJs): Promise<ParseResult> {
    if (stryMutAct_9fa48("1786")) {
      {}
    } else {
      stryCov_9fa48("1786");
      this.debugLog = stryMutAct_9fa48("1787") ? ["Stryker was here"] : (stryCov_9fa48("1787"), []);
      this.dbg(stryMutAct_9fa48("1788") ? `` : (stryCov_9fa48("1788"), `File: ${file.name} (${file.size} bytes)`));
      return (async () => {
        if (stryMutAct_9fa48("1789")) {
          {}
        } else {
          stryCov_9fa48("1789");
          const buffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument(stryMutAct_9fa48("1790") ? {} : (stryCov_9fa48("1790"), {
            data: buffer
          })).promise;
          const rawLines: {
            y: number;
            text: string;
          }[] = stryMutAct_9fa48("1791") ? ["Stryker was here"] : (stryCov_9fa48("1791"), []);
          for (let p = 1; stryMutAct_9fa48("1794") ? p > pdf.numPages : stryMutAct_9fa48("1793") ? p < pdf.numPages : stryMutAct_9fa48("1792") ? false : (stryCov_9fa48("1792", "1793", "1794"), p <= pdf.numPages); stryMutAct_9fa48("1795") ? p-- : (stryCov_9fa48("1795"), p++)) {
            if (stryMutAct_9fa48("1796")) {
              {}
            } else {
              stryCov_9fa48("1796");
              const page = await pdf.getPage(p);
              const vp = page.getViewport(stryMutAct_9fa48("1797") ? {} : (stryCov_9fa48("1797"), {
                scale: 1
              }));
              this.dbg(stryMutAct_9fa48("1798") ? `` : (stryCov_9fa48("1798"), `Page ${p}: w=${vp.width.toFixed(0)} h=${vp.height.toFixed(0)}`));
              const content = await page.getTextContent();
              const items: PdfItem[] = stryMutAct_9fa48("1799") ? ["Stryker was here"] : (stryCov_9fa48("1799"), []);
              for (const item of content.items) {
                if (stryMutAct_9fa48("1800")) {
                  {}
                } else {
                  stryCov_9fa48("1800");
                  const ti = item as {
                    str: string;
                    transform: number[];
                  };
                  const s = stryMutAct_9fa48("1801") ? ti.str : (stryCov_9fa48("1801"), ti.str.trim());
                  if (stryMutAct_9fa48("1804") ? false : stryMutAct_9fa48("1803") ? true : stryMutAct_9fa48("1802") ? s : (stryCov_9fa48("1802", "1803", "1804"), !s)) continue;
                  items.push(stryMutAct_9fa48("1805") ? {} : (stryCov_9fa48("1805"), {
                    str: s,
                    x: ti.transform[4],
                    y: ti.transform[5]
                  }));
                }
              }
              stryMutAct_9fa48("1806") ? items : (stryCov_9fa48("1806"), items.sort(stryMutAct_9fa48("1807") ? () => undefined : (stryCov_9fa48("1807"), (a, b) => stryMutAct_9fa48("1810") ? a.y - b.y && a.x - b.x : stryMutAct_9fa48("1809") ? false : stryMutAct_9fa48("1808") ? true : (stryCov_9fa48("1808", "1809", "1810"), (stryMutAct_9fa48("1811") ? a.y + b.y : (stryCov_9fa48("1811"), a.y - b.y)) || (stryMutAct_9fa48("1812") ? a.x + b.x : (stryCov_9fa48("1812"), a.x - b.x))))));
              const groups: PdfItem[][] = stryMutAct_9fa48("1813") ? ["Stryker was here"] : (stryCov_9fa48("1813"), []);
              for (const item of items) {
                if (stryMutAct_9fa48("1814")) {
                  {}
                } else {
                  stryCov_9fa48("1814");
                  const last = groups[stryMutAct_9fa48("1815") ? groups.length + 1 : (stryCov_9fa48("1815"), groups.length - 1)];
                  if (stryMutAct_9fa48("1818") ? last || Math.abs(item.y - last[0].y) <= 0.3 : stryMutAct_9fa48("1817") ? false : stryMutAct_9fa48("1816") ? true : (stryCov_9fa48("1816", "1817", "1818"), last && (stryMutAct_9fa48("1821") ? Math.abs(item.y - last[0].y) > 0.3 : stryMutAct_9fa48("1820") ? Math.abs(item.y - last[0].y) < 0.3 : stryMutAct_9fa48("1819") ? true : (stryCov_9fa48("1819", "1820", "1821"), Math.abs(stryMutAct_9fa48("1822") ? item.y + last[0].y : (stryCov_9fa48("1822"), item.y - last[0].y)) <= 0.3)))) {
                    if (stryMutAct_9fa48("1823")) {
                      {}
                    } else {
                      stryCov_9fa48("1823");
                      last.push(item);
                    }
                  } else {
                    if (stryMutAct_9fa48("1824")) {
                      {}
                    } else {
                      stryCov_9fa48("1824");
                      groups.push(stryMutAct_9fa48("1825") ? [] : (stryCov_9fa48("1825"), [item]));
                    }
                  }
                }
              }
              for (const g of groups) {
                if (stryMutAct_9fa48("1826")) {
                  {}
                } else {
                  stryCov_9fa48("1826");
                  stryMutAct_9fa48("1827") ? g : (stryCov_9fa48("1827"), g.sort(stryMutAct_9fa48("1828") ? () => undefined : (stryCov_9fa48("1828"), (a, b) => stryMutAct_9fa48("1829") ? a.x + b.x : (stryCov_9fa48("1829"), a.x - b.x))));
                  rawLines.push(stryMutAct_9fa48("1830") ? {} : (stryCov_9fa48("1830"), {
                    y: g[0].y,
                    text: g.map(stryMutAct_9fa48("1831") ? () => undefined : (stryCov_9fa48("1831"), i => i.str)).join(stryMutAct_9fa48("1832") ? "" : (stryCov_9fa48("1832"), " "))
                  }));
                }
              }
            }
          }
          this.dbg(stryMutAct_9fa48("1833") ? `` : (stryCov_9fa48("1833"), `Total lines (all pages): ${rawLines.length}`));
          this.dbg(stryMutAct_9fa48("1834") ? "" : (stryCov_9fa48("1834"), "--- LINE TEXT (first 60) ---"));
          for (let i = 0; stryMutAct_9fa48("1837") ? i >= Math.min(60, rawLines.length) : stryMutAct_9fa48("1836") ? i <= Math.min(60, rawLines.length) : stryMutAct_9fa48("1835") ? false : (stryCov_9fa48("1835", "1836", "1837"), i < (stryMutAct_9fa48("1838") ? Math.max(60, rawLines.length) : (stryCov_9fa48("1838"), Math.min(60, rawLines.length)))); stryMutAct_9fa48("1839") ? i-- : (stryCov_9fa48("1839"), i++)) {
            if (stryMutAct_9fa48("1840")) {
              {}
            } else {
              stryCov_9fa48("1840");
              const l = rawLines[i];
              this.dbg(stryMutAct_9fa48("1841") ? `` : (stryCov_9fa48("1841"), `L${i} y=${l.y.toFixed(0)} | ${stryMutAct_9fa48("1842") ? l.text.replace(/\n/g, "↵") : (stryCov_9fa48("1842"), l.text.slice(0, 140).replace(/\n/g, stryMutAct_9fa48("1843") ? "" : (stryCov_9fa48("1843"), "↵")))}`));
            }
          }
          this.dbg(stryMutAct_9fa48("1844") ? "" : (stryCov_9fa48("1844"), "--- END LINE TEXT ---"));
          let statementYear = new Date().getFullYear();
          for (const line of rawLines) {
            if (stryMutAct_9fa48("1845")) {
              {}
            } else {
              stryCov_9fa48("1845");
              const m = line.text.match(stryMutAct_9fa48("1853") ? /statement\s+(\d{2})-([A-Za-z]{3})-(\D{2,4})/i : stryMutAct_9fa48("1852") ? /statement\s+(\d{2})-([A-Za-z]{3})-(\d)/i : stryMutAct_9fa48("1851") ? /statement\s+(\d{2})-([^A-Za-z]{3})-(\d{2,4})/i : stryMutAct_9fa48("1850") ? /statement\s+(\d{2})-([A-Za-z])-(\d{2,4})/i : stryMutAct_9fa48("1849") ? /statement\s+(\D{2})-([A-Za-z]{3})-(\d{2,4})/i : stryMutAct_9fa48("1848") ? /statement\s+(\d)-([A-Za-z]{3})-(\d{2,4})/i : stryMutAct_9fa48("1847") ? /statement\S+(\d{2})-([A-Za-z]{3})-(\d{2,4})/i : stryMutAct_9fa48("1846") ? /statement\s(\d{2})-([A-Za-z]{3})-(\d{2,4})/i : (stryCov_9fa48("1846", "1847", "1848", "1849", "1850", "1851", "1852", "1853"), /statement\s+(\d{2})-([A-Za-z]{3})-(\d{2,4})/i));
              if (stryMutAct_9fa48("1855") ? false : stryMutAct_9fa48("1854") ? true : (stryCov_9fa48("1854", "1855"), m)) {
                if (stryMutAct_9fa48("1856")) {
                  {}
                } else {
                  stryCov_9fa48("1856");
                  const y = parseInt(m[3]);
                  statementYear = (stryMutAct_9fa48("1860") ? y >= 100 : stryMutAct_9fa48("1859") ? y <= 100 : stryMutAct_9fa48("1858") ? false : stryMutAct_9fa48("1857") ? true : (stryCov_9fa48("1857", "1858", "1859", "1860"), y < 100)) ? stryMutAct_9fa48("1861") ? 2000 - y : (stryCov_9fa48("1861"), 2000 + y) : y;
                  this.dbg(stryMutAct_9fa48("1862") ? `` : (stryCov_9fa48("1862"), `Year: ${statementYear}`));
                  break;
                }
              }
            }
          }
          const txs = this.parseLineText(rawLines, statementYear);
          this.dbg(stryMutAct_9fa48("1863") ? `` : (stryCov_9fa48("1863"), `TXs: ${txs.length}`));
          return this.buildResult(txs);
        }
      })();
    }
  }
  private parseLineText(lines: {
    y: number;
    text: string;
  }[], year: number): Transaction[] {
    if (stryMutAct_9fa48("1864")) {
      {}
    } else {
      stryCov_9fa48("1864");
      const dateRe = stryMutAct_9fa48("1875") ? /^(?:(\d{1,2})\s+|On\s+(\d{1,2})\S+)(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/i : stryMutAct_9fa48("1874") ? /^(?:(\d{1,2})\s+|On\s+(\d{1,2})\s)(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/i : stryMutAct_9fa48("1873") ? /^(?:(\d{1,2})\s+|On\s+(\D{1,2})\s+)(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/i : stryMutAct_9fa48("1872") ? /^(?:(\d{1,2})\s+|On\s+(\d)\s+)(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/i : stryMutAct_9fa48("1871") ? /^(?:(\d{1,2})\s+|On\S+(\d{1,2})\s+)(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/i : stryMutAct_9fa48("1870") ? /^(?:(\d{1,2})\s+|On\s(\d{1,2})\s+)(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/i : stryMutAct_9fa48("1869") ? /^(?:(\d{1,2})\S+|On\s+(\d{1,2})\s+)(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/i : stryMutAct_9fa48("1868") ? /^(?:(\d{1,2})\s|On\s+(\d{1,2})\s+)(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/i : stryMutAct_9fa48("1867") ? /^(?:(\D{1,2})\s+|On\s+(\d{1,2})\s+)(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/i : stryMutAct_9fa48("1866") ? /^(?:(\d)\s+|On\s+(\d{1,2})\s+)(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/i : stryMutAct_9fa48("1865") ? /(?:(\d{1,2})\s+|On\s+(\d{1,2})\s+)(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/i : (stryCov_9fa48("1865", "1866", "1867", "1868", "1869", "1870", "1871", "1872", "1873", "1874", "1875"), /^(?:(\d{1,2})\s+|On\s+(\d{1,2})\s+)(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/i);
      const amtSearchRe = stryMutAct_9fa48("1881") ? /\d[\d,]*\.\D{2}/ : stryMutAct_9fa48("1880") ? /\d[\d,]*\.\d/ : stryMutAct_9fa48("1879") ? /\d[\D,]*\.\d{2}/ : stryMutAct_9fa48("1878") ? /\d[^\d,]*\.\d{2}/ : stryMutAct_9fa48("1877") ? /\d[\d,]\.\d{2}/ : stryMutAct_9fa48("1876") ? /\D[\d,]*\.\d{2}/ : (stryCov_9fa48("1876", "1877", "1878", "1879", "1880", "1881"), /\d[\d,]*\.\d{2}/);
      const dateHeaderAtLine = new Map<number, string>();
      for (let idx = 0; stryMutAct_9fa48("1884") ? idx >= lines.length : stryMutAct_9fa48("1883") ? idx <= lines.length : stryMutAct_9fa48("1882") ? false : (stryCov_9fa48("1882", "1883", "1884"), idx < lines.length); stryMutAct_9fa48("1885") ? idx-- : (stryCov_9fa48("1885"), idx++)) {
        if (stryMutAct_9fa48("1886")) {
          {}
        } else {
          stryCov_9fa48("1886");
          const text = stryMutAct_9fa48("1887") ? lines[idx].text : (stryCov_9fa48("1887"), lines[idx].text.trim());
          if (stryMutAct_9fa48("1890") ? false : stryMutAct_9fa48("1889") ? true : stryMutAct_9fa48("1888") ? text : (stryCov_9fa48("1888", "1889", "1890"), !text)) continue;
          const m = text.match(dateRe);
          if (stryMutAct_9fa48("1893") ? false : stryMutAct_9fa48("1892") ? true : stryMutAct_9fa48("1891") ? m : (stryCov_9fa48("1891", "1892", "1893"), !m)) continue;
          const day = parseInt(stryMutAct_9fa48("1896") ? m[1] && m[2] : stryMutAct_9fa48("1895") ? false : stryMutAct_9fa48("1894") ? true : (stryCov_9fa48("1894", "1895", "1896"), m[1] || m[2]));
          const month = MONTHS[stryMutAct_9fa48("1897") ? (m[3] || m[2]).toLowerCase() : (stryCov_9fa48("1897"), (stryMutAct_9fa48("1900") ? m[3] && m[2] : stryMutAct_9fa48("1899") ? false : stryMutAct_9fa48("1898") ? true : (stryCov_9fa48("1898", "1899", "1900"), m[3] || m[2])).toUpperCase())];
          if (stryMutAct_9fa48("1903") ? false : stryMutAct_9fa48("1902") ? true : stryMutAct_9fa48("1901") ? month && day >= 1 && day <= 31 : (stryCov_9fa48("1901", "1902", "1903"), !(stryMutAct_9fa48("1906") ? month && day >= 1 || day <= 31 : stryMutAct_9fa48("1905") ? false : stryMutAct_9fa48("1904") ? true : (stryCov_9fa48("1904", "1905", "1906"), (stryMutAct_9fa48("1908") ? month || day >= 1 : stryMutAct_9fa48("1907") ? true : (stryCov_9fa48("1907", "1908"), month && (stryMutAct_9fa48("1911") ? day < 1 : stryMutAct_9fa48("1910") ? day > 1 : stryMutAct_9fa48("1909") ? true : (stryCov_9fa48("1909", "1910", "1911"), day >= 1)))) && (stryMutAct_9fa48("1914") ? day > 31 : stryMutAct_9fa48("1913") ? day < 31 : stryMutAct_9fa48("1912") ? true : (stryCov_9fa48("1912", "1913", "1914"), day <= 31)))))) continue;
          const dateStr = stryMutAct_9fa48("1915") ? `` : (stryCov_9fa48("1915"), `${year}-${month}-${String(day).padStart(2, stryMutAct_9fa48("1916") ? "" : (stryCov_9fa48("1916"), "0"))}`);
          const afterDate = stryMutAct_9fa48("1918") ? text.trim() : stryMutAct_9fa48("1917") ? text.slice(m[0].length) : (stryCov_9fa48("1917", "1918"), text.slice(m[0].length).trim());
          if (stryMutAct_9fa48("1921") ? afterDate || isNoise(afterDate) || isFooterJunk(afterDate) : stryMutAct_9fa48("1920") ? false : stryMutAct_9fa48("1919") ? true : (stryCov_9fa48("1919", "1920", "1921"), afterDate && (stryMutAct_9fa48("1923") ? isNoise(afterDate) && isFooterJunk(afterDate) : stryMutAct_9fa48("1922") ? true : (stryCov_9fa48("1922", "1923"), isNoise(afterDate) || isFooterJunk(afterDate))))) continue;
          dateHeaderAtLine.set(idx, dateStr);
        }
      }
      const txs: Transaction[] = stryMutAct_9fa48("1924") ? ["Stryker was here"] : (stryCov_9fa48("1924"), []);
      const seen = new Set<string>();
      let pendingDescParts: string[] = stryMutAct_9fa48("1925") ? ["Stryker was here"] : (stryCov_9fa48("1925"), []);
      for (let i = 0; stryMutAct_9fa48("1928") ? i >= lines.length : stryMutAct_9fa48("1927") ? i <= lines.length : stryMutAct_9fa48("1926") ? false : (stryCov_9fa48("1926", "1927", "1928"), i < lines.length); stryMutAct_9fa48("1929") ? i-- : (stryCov_9fa48("1929"), i++)) {
        if (stryMutAct_9fa48("1930")) {
          {}
        } else {
          stryCov_9fa48("1930");
          const rawText = stryMutAct_9fa48("1931") ? lines[i].text : (stryCov_9fa48("1931"), lines[i].text.trim());
          if (stryMutAct_9fa48("1934") ? false : stryMutAct_9fa48("1933") ? true : stryMutAct_9fa48("1932") ? rawText : (stryCov_9fa48("1932", "1933", "1934"), !rawText)) continue;
          let currentDateStr = stryMutAct_9fa48("1935") ? "Stryker was here!" : (stryCov_9fa48("1935"), "");
          if (stryMutAct_9fa48("1937") ? false : stryMutAct_9fa48("1936") ? true : (stryCov_9fa48("1936", "1937"), dateHeaderAtLine.has(i))) {
            if (stryMutAct_9fa48("1938")) {
              {}
            } else {
              stryCov_9fa48("1938");
              currentDateStr = dateHeaderAtLine.get(i)!;
            }
          } else {
            if (stryMutAct_9fa48("1939")) {
              {}
            } else {
              stryCov_9fa48("1939");
              for (let j = stryMutAct_9fa48("1940") ? i + 1 : (stryCov_9fa48("1940"), i - 1); stryMutAct_9fa48("1943") ? j < 0 : stryMutAct_9fa48("1942") ? j > 0 : stryMutAct_9fa48("1941") ? false : (stryCov_9fa48("1941", "1942", "1943"), j >= 0); stryMutAct_9fa48("1944") ? j++ : (stryCov_9fa48("1944"), j--)) {
                if (stryMutAct_9fa48("1945")) {
                  {}
                } else {
                  stryCov_9fa48("1945");
                  if (stryMutAct_9fa48("1947") ? false : stryMutAct_9fa48("1946") ? true : (stryCov_9fa48("1946", "1947"), dateHeaderAtLine.has(j))) {
                    if (stryMutAct_9fa48("1948")) {
                      {}
                    } else {
                      stryCov_9fa48("1948");
                      currentDateStr = dateHeaderAtLine.get(j)!;
                      break;
                    }
                  }
                }
              }
              if (stryMutAct_9fa48("1951") ? false : stryMutAct_9fa48("1950") ? true : stryMutAct_9fa48("1949") ? currentDateStr : (stryCov_9fa48("1949", "1950", "1951"), !currentDateStr)) {
                if (stryMutAct_9fa48("1952")) {
                  {}
                } else {
                  stryCov_9fa48("1952");
                  const curY = lines[i].y;
                  for (let j = stryMutAct_9fa48("1953") ? i - 1 : (stryCov_9fa48("1953"), i + 1); stryMutAct_9fa48("1956") ? j >= lines.length : stryMutAct_9fa48("1955") ? j <= lines.length : stryMutAct_9fa48("1954") ? false : (stryCov_9fa48("1954", "1955", "1956"), j < lines.length); stryMutAct_9fa48("1957") ? j-- : (stryCov_9fa48("1957"), j++)) {
                    if (stryMutAct_9fa48("1958")) {
                      {}
                    } else {
                      stryCov_9fa48("1958");
                      if (stryMutAct_9fa48("1961") ? dateHeaderAtLine.has(j) || Math.abs(lines[j].y - curY) < 50 : stryMutAct_9fa48("1960") ? false : stryMutAct_9fa48("1959") ? true : (stryCov_9fa48("1959", "1960", "1961"), dateHeaderAtLine.has(j) && (stryMutAct_9fa48("1964") ? Math.abs(lines[j].y - curY) >= 50 : stryMutAct_9fa48("1963") ? Math.abs(lines[j].y - curY) <= 50 : stryMutAct_9fa48("1962") ? true : (stryCov_9fa48("1962", "1963", "1964"), Math.abs(stryMutAct_9fa48("1965") ? lines[j].y + curY : (stryCov_9fa48("1965"), lines[j].y - curY)) < 50)))) {
                        if (stryMutAct_9fa48("1966")) {
                          {}
                        } else {
                          stryCov_9fa48("1966");
                          currentDateStr = dateHeaderAtLine.get(j)!;
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          const dateMatch = rawText.match(dateRe);
          const hasDate = stryMutAct_9fa48("1967") ? !dateMatch : (stryCov_9fa48("1967"), !(stryMutAct_9fa48("1968") ? dateMatch : (stryCov_9fa48("1968"), !dateMatch)));
          if (stryMutAct_9fa48("1970") ? false : stryMutAct_9fa48("1969") ? true : (stryCov_9fa48("1969", "1970"), hasDate)) {
            if (stryMutAct_9fa48("1971")) {
              {}
            } else {
              stryCov_9fa48("1971");
              pendingDescParts = stryMutAct_9fa48("1972") ? ["Stryker was here"] : (stryCov_9fa48("1972"), []);
              const afterDate = stryMutAct_9fa48("1974") ? rawText.trim() : stryMutAct_9fa48("1973") ? rawText.slice(dateMatch![0].length) : (stryCov_9fa48("1973", "1974"), rawText.slice(dateMatch![0].length).trim());
              if (stryMutAct_9fa48("1976") ? false : stryMutAct_9fa48("1975") ? true : (stryCov_9fa48("1975", "1976"), afterDate)) {
                if (stryMutAct_9fa48("1977")) {
                  {}
                } else {
                  stryCov_9fa48("1977");
                  const amtIdx = afterDate.search(amtSearchRe);
                  if (stryMutAct_9fa48("1981") ? amtIdx < 0 : stryMutAct_9fa48("1980") ? amtIdx > 0 : stryMutAct_9fa48("1979") ? false : stryMutAct_9fa48("1978") ? true : (stryCov_9fa48("1978", "1979", "1980", "1981"), amtIdx >= 0)) {
                    if (stryMutAct_9fa48("1982")) {
                      {}
                    } else {
                      stryCov_9fa48("1982");
                      const part = stryMutAct_9fa48("1985") ? afterDate.trim().toUpperCase() : stryMutAct_9fa48("1984") ? afterDate.slice(0, amtIdx).toUpperCase() : stryMutAct_9fa48("1983") ? afterDate.slice(0, amtIdx).trim().toLowerCase() : (stryCov_9fa48("1983", "1984", "1985"), afterDate.slice(0, amtIdx).trim().toUpperCase());
                      if (stryMutAct_9fa48("1987") ? false : stryMutAct_9fa48("1986") ? true : (stryCov_9fa48("1986", "1987"), part)) pendingDescParts.push(part);
                    }
                  } else {
                    if (stryMutAct_9fa48("1988")) {
                      {}
                    } else {
                      stryCov_9fa48("1988");
                      pendingDescParts.push(stryMutAct_9fa48("1989") ? afterDate.toLowerCase() : (stryCov_9fa48("1989"), afterDate.toUpperCase()));
                    }
                  }
                }
              }
            }
          }
          if (stryMutAct_9fa48("1992") ? false : stryMutAct_9fa48("1991") ? true : stryMutAct_9fa48("1990") ? currentDateStr : (stryCov_9fa48("1990", "1991", "1992"), !currentDateStr)) continue;
          if (stryMutAct_9fa48("1994") ? false : stryMutAct_9fa48("1993") ? true : (stryCov_9fa48("1993", "1994"), isNoise(rawText))) continue;
          const upperText = stryMutAct_9fa48("1995") ? rawText.toLowerCase() : (stryCov_9fa48("1995"), rawText.toUpperCase());
          const isFooter = isFooterJunk(rawText);
          const amounts = parseAmounts(rawText);
          if (stryMutAct_9fa48("1999") ? amounts.length <= 0 : stryMutAct_9fa48("1998") ? amounts.length >= 0 : stryMutAct_9fa48("1997") ? false : stryMutAct_9fa48("1996") ? true : (stryCov_9fa48("1996", "1997", "1998", "1999"), amounts.length > 0)) {
            if (stryMutAct_9fa48("2000")) {
              {}
            } else {
              stryCov_9fa48("2000");
              const txAmount = amounts[0];
              if (stryMutAct_9fa48("2004") ? txAmount < 0.01 : stryMutAct_9fa48("2003") ? txAmount > 0.01 : stryMutAct_9fa48("2002") ? false : stryMutAct_9fa48("2001") ? true : (stryCov_9fa48("2001", "2002", "2003", "2004"), txAmount >= 0.01)) {
                if (stryMutAct_9fa48("2005")) {
                  {}
                } else {
                  stryCov_9fa48("2005");
                  let desc: string;
                  if (stryMutAct_9fa48("2008") ? hasDate || pendingDescParts.length > 0 : stryMutAct_9fa48("2007") ? false : stryMutAct_9fa48("2006") ? true : (stryCov_9fa48("2006", "2007", "2008"), hasDate && (stryMutAct_9fa48("2011") ? pendingDescParts.length <= 0 : stryMutAct_9fa48("2010") ? pendingDescParts.length >= 0 : stryMutAct_9fa48("2009") ? true : (stryCov_9fa48("2009", "2010", "2011"), pendingDescParts.length > 0)))) {
                    if (stryMutAct_9fa48("2012")) {
                      {}
                    } else {
                      stryCov_9fa48("2012");
                      desc = stryMutAct_9fa48("2013") ? pendingDescParts.join(" ") : (stryCov_9fa48("2013"), pendingDescParts.join(stryMutAct_9fa48("2014") ? "" : (stryCov_9fa48("2014"), " ")).trim());
                    }
                  } else {
                    if (stryMutAct_9fa48("2015")) {
                      {}
                    } else {
                      stryCov_9fa48("2015");
                      const amtIdx = rawText.search(amtSearchRe);
                      const part = stryMutAct_9fa48("2017") ? (amtIdx >= 0 ? rawText.slice(0, amtIdx) : rawText).toUpperCase() : stryMutAct_9fa48("2016") ? (amtIdx >= 0 ? rawText.slice(0, amtIdx) : rawText).trim().toLowerCase() : (stryCov_9fa48("2016", "2017"), ((stryMutAct_9fa48("2021") ? amtIdx < 0 : stryMutAct_9fa48("2020") ? amtIdx > 0 : stryMutAct_9fa48("2019") ? false : stryMutAct_9fa48("2018") ? true : (stryCov_9fa48("2018", "2019", "2020", "2021"), amtIdx >= 0)) ? stryMutAct_9fa48("2022") ? rawText : (stryCov_9fa48("2022"), rawText.slice(0, amtIdx)) : rawText).trim().toUpperCase());
                      desc = stryMutAct_9fa48("2023") ? pendingDescParts.join(" ") + " " + part : (stryCov_9fa48("2023"), (pendingDescParts.join(stryMutAct_9fa48("2024") ? "" : (stryCov_9fa48("2024"), " ")) + (stryMutAct_9fa48("2025") ? "" : (stryCov_9fa48("2025"), " ")) + part).trim());
                    }
                  }
                  desc = stryMutAct_9fa48("2026") ? desc.replace(/[^A-Z0-9\s*/&.-]/g, "").replace(/\s+/g, " ") : (stryCov_9fa48("2026"), desc.replace(stryMutAct_9fa48("2028") ? /[^A-Z0-9\S*/&.-]/g : stryMutAct_9fa48("2027") ? /[A-Z0-9\s*/&.-]/g : (stryCov_9fa48("2027", "2028"), /[^A-Z0-9\s*/&.-]/g), stryMutAct_9fa48("2029") ? "Stryker was here!" : (stryCov_9fa48("2029"), "")).replace(stryMutAct_9fa48("2031") ? /\S+/g : stryMutAct_9fa48("2030") ? /\s/g : (stryCov_9fa48("2030", "2031"), /\s+/g), stryMutAct_9fa48("2032") ? "" : (stryCov_9fa48("2032"), " ")).trim());
                  if (stryMutAct_9fa48("2035") ? desc.length >= 2 && !isNoise(desc) || !isFooterJunk(desc) : stryMutAct_9fa48("2034") ? false : stryMutAct_9fa48("2033") ? true : (stryCov_9fa48("2033", "2034", "2035"), (stryMutAct_9fa48("2037") ? desc.length >= 2 || !isNoise(desc) : stryMutAct_9fa48("2036") ? true : (stryCov_9fa48("2036", "2037"), (stryMutAct_9fa48("2040") ? desc.length < 2 : stryMutAct_9fa48("2039") ? desc.length > 2 : stryMutAct_9fa48("2038") ? true : (stryCov_9fa48("2038", "2039", "2040"), desc.length >= 2)) && (stryMutAct_9fa48("2041") ? isNoise(desc) : (stryCov_9fa48("2041"), !isNoise(desc))))) && (stryMutAct_9fa48("2042") ? isFooterJunk(desc) : (stryCov_9fa48("2042"), !isFooterJunk(desc))))) {
                    if (stryMutAct_9fa48("2043")) {
                      {}
                    } else {
                      stryCov_9fa48("2043");
                      const isCredit = (stryMutAct_9fa48("2047") ? /CREDIT|REFUND|CASHBACK|DIVIDEND|INTEREST\s+PAID|RECEIVED\S+FROM|RETURNED/i : stryMutAct_9fa48("2046") ? /CREDIT|REFUND|CASHBACK|DIVIDEND|INTEREST\s+PAID|RECEIVED\sFROM|RETURNED/i : stryMutAct_9fa48("2045") ? /CREDIT|REFUND|CASHBACK|DIVIDEND|INTEREST\S+PAID|RECEIVED\s+FROM|RETURNED/i : stryMutAct_9fa48("2044") ? /CREDIT|REFUND|CASHBACK|DIVIDEND|INTEREST\sPAID|RECEIVED\s+FROM|RETURNED/i : (stryCov_9fa48("2044", "2045", "2046", "2047"), /CREDIT|REFUND|CASHBACK|DIVIDEND|INTEREST\s+PAID|RECEIVED\s+FROM|RETURNED/i)).test(desc);
                      const id = stryMutAct_9fa48("2048") ? `` : (stryCov_9fa48("2048"), `${currentDateStr.replace(/-/g, stryMutAct_9fa48("2049") ? "Stryker was here!" : (stryCov_9fa48("2049"), ""))}_${txAmount}_${stryMutAct_9fa48("2050") ? desc.replace(/[\s,]/g, "_") : (stryCov_9fa48("2050"), desc.slice(0, 30).replace(stryMutAct_9fa48("2052") ? /[\S,]/g : stryMutAct_9fa48("2051") ? /[^\s,]/g : (stryCov_9fa48("2051", "2052"), /[\s,]/g), stryMutAct_9fa48("2053") ? "" : (stryCov_9fa48("2053"), "_")))}`);
                      if (stryMutAct_9fa48("2056") ? false : stryMutAct_9fa48("2055") ? true : stryMutAct_9fa48("2054") ? seen.has(id) : (stryCov_9fa48("2054", "2055", "2056"), !seen.has(id))) {
                        if (stryMutAct_9fa48("2057")) {
                          {}
                        } else {
                          stryCov_9fa48("2057");
                          seen.add(id);
                          txs.push(stryMutAct_9fa48("2058") ? {} : (stryCov_9fa48("2058"), {
                            id,
                            date: currentDateStr,
                            amount: txAmount,
                            description: desc,
                            subcategory: stryMutAct_9fa48("2059") ? "Stryker was here!" : (stryCov_9fa48("2059"), ""),
                            categoryId: isCredit ? CATEGORY_IDS.INCOME : stryMutAct_9fa48("2060") ? "Stryker was here!" : (stryCov_9fa48("2060"), ""),
                            account: stryMutAct_9fa48("2061") ? "" : (stryCov_9fa48("2061"), "BARCLAYS PDF"),
                            source: stryMutAct_9fa48("2062") ? "Stryker was here!" : (stryCov_9fa48("2062"), "")
                          }));
                        }
                      }
                    }
                  }
                }
              }
              pendingDescParts = stryMutAct_9fa48("2063") ? ["Stryker was here"] : (stryCov_9fa48("2063"), []);
            }
          } else if (stryMutAct_9fa48("2065") ? false : stryMutAct_9fa48("2064") ? true : (stryCov_9fa48("2064", "2065"), isFooter)) {
            if (stryMutAct_9fa48("2066")) {
              {}
            } else {
              stryCov_9fa48("2066");
              pendingDescParts = stryMutAct_9fa48("2067") ? ["Stryker was here"] : (stryCov_9fa48("2067"), []);
            }
          } else if (stryMutAct_9fa48("2070") ? !hasDate || rawText.length > 3 : stryMutAct_9fa48("2069") ? false : stryMutAct_9fa48("2068") ? true : (stryCov_9fa48("2068", "2069", "2070"), (stryMutAct_9fa48("2071") ? hasDate : (stryCov_9fa48("2071"), !hasDate)) && (stryMutAct_9fa48("2074") ? rawText.length <= 3 : stryMutAct_9fa48("2073") ? rawText.length >= 3 : stryMutAct_9fa48("2072") ? true : (stryCov_9fa48("2072", "2073", "2074"), rawText.length > 3)))) {
            if (stryMutAct_9fa48("2075")) {
              {}
            } else {
              stryCov_9fa48("2075");
              const part = upperText;
              if (stryMutAct_9fa48("2078") ? !isNoise(part) || !isFooterJunk(part) : stryMutAct_9fa48("2077") ? false : stryMutAct_9fa48("2076") ? true : (stryCov_9fa48("2076", "2077", "2078"), (stryMutAct_9fa48("2079") ? isNoise(part) : (stryCov_9fa48("2079"), !isNoise(part))) && (stryMutAct_9fa48("2080") ? isFooterJunk(part) : (stryCov_9fa48("2080"), !isFooterJunk(part))))) {
                if (stryMutAct_9fa48("2081")) {
                  {}
                } else {
                  stryCov_9fa48("2081");
                  pendingDescParts.push(part);
                }
              }
            }
          }
        }
      }
      return txs;
    }
  }
  private buildResult(txs: Transaction[]): ParseResult {
    if (stryMutAct_9fa48("2082")) {
      {}
    } else {
      stryCov_9fa48("2082");
      const months = new Set<string>();
      let total = 0;
      for (const tx of txs) {
        if (stryMutAct_9fa48("2083")) {
          {}
        } else {
          stryCov_9fa48("2083");
          months.add(stryMutAct_9fa48("2084") ? tx.date : (stryCov_9fa48("2084"), tx.date.slice(0, 7)));
          stryMutAct_9fa48("2085") ? total -= tx.amount : (stryCov_9fa48("2085"), total += tx.amount);
        }
      }
      return stryMutAct_9fa48("2086") ? {} : (stryCov_9fa48("2086"), {
        transactions: txs,
        months: stryMutAct_9fa48("2087") ? Array.from(months) : (stryCov_9fa48("2087"), Array.from(months).sort()),
        total,
        debug: this.debugLog.join(stryMutAct_9fa48("2088") ? "" : (stryCov_9fa48("2088"), "\n"))
      });
    }
  }
}
async function importPdfJs(): Promise<typeof PdfJs> {
  if (stryMutAct_9fa48("2089")) {
    {}
  } else {
    stryCov_9fa48("2089");
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(stryMutAct_9fa48("2090") ? "" : (stryCov_9fa48("2090"), "pdfjs-dist/build/pdf.worker.min.mjs"), import.meta.url).href;
    return pdfjsLib;
  }
}