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
import type { Category } from "../types";
import { UNCATEGORIZED_ID } from "../constants";
const STOP_WORDS = new Set(stryMutAct_9fa48("2511") ? [] : (stryCov_9fa48("2511"), [stryMutAct_9fa48("2512") ? "" : (stryCov_9fa48("2512"), "ON"), stryMutAct_9fa48("2513") ? "" : (stryCov_9fa48("2513"), "THE"), stryMutAct_9fa48("2514") ? "" : (stryCov_9fa48("2514"), "AND"), stryMutAct_9fa48("2515") ? "" : (stryCov_9fa48("2515"), "FOR"), stryMutAct_9fa48("2516") ? "" : (stryCov_9fa48("2516"), "WITH"), stryMutAct_9fa48("2517") ? "" : (stryCov_9fa48("2517"), "LIMITED"), stryMutAct_9fa48("2518") ? "" : (stryCov_9fa48("2518"), "LTD"), stryMutAct_9fa48("2519") ? "" : (stryCov_9fa48("2519"), "LIMIT"), stryMutAct_9fa48("2520") ? "" : (stryCov_9fa48("2520"), "UK")]));
const ESCAPE_RE = stryMutAct_9fa48("2521") ? /[^.*+?^${}()|[\]\\]/g : (stryCov_9fa48("2521"), /[.*+?^${}()|[\]\\]/g);
function escapeRegex(s: string): string {
  if (stryMutAct_9fa48("2522")) {
    {}
  } else {
    stryCov_9fa48("2522");
    return s.replace(ESCAPE_RE, stryMutAct_9fa48("2523") ? "" : (stryCov_9fa48("2523"), "\\$&"));
  }
}
export function matchKeyword(text: string, keyword: string): boolean {
  if (stryMutAct_9fa48("2524")) {
    {}
  } else {
    stryCov_9fa48("2524");
    const upperKeyword = stryMutAct_9fa48("2525") ? keyword.toLowerCase() : (stryCov_9fa48("2525"), keyword.toUpperCase());
    const upperText = stryMutAct_9fa48("2526") ? text.toLowerCase() : (stryCov_9fa48("2526"), text.toUpperCase());

    // Keyword must be preceded by a word boundary (start-of-string, space, underscore, punctuation).
    // No trailing boundary check — bank descriptions often concatenate fields without spaces
    // (e.g. "YOUR-MOVE" in "YOUR-MOVECOUK" should match).
    //
    // Leading boundary prevents false positives like "TFL" in "NETFLIX":
    //   "TFL" in "NETFLIX" is preceded by 'E' (word char) -> no match
    //
    // Examples:
    // - "YOUR-MOVE" matches in "YOUR-MOVECOUK"  ✓  (start + no trailing check)
    // - "WASABI"   matches in "DEBIT WASABI_161" ✓  (space before)
    // - "TFL"      does NOT match in "NETFLIX"   ✓  ('E' before TFL)
    // - "TFL"      matches in "TFL_CARD"         ✓  (start)

    const pattern = stryMutAct_9fa48("2527") ? `` : (stryCov_9fa48("2527"), `(?:^|[\\W_])${escapeRegex(upperKeyword)}`);
    return new RegExp(pattern).test(upperText);
  }
}
export function classify(description: string, categories: Category[]): string {
  if (stryMutAct_9fa48("2528")) {
    {}
  } else {
    stryCov_9fa48("2528");
    for (const cat of categories) {
      if (stryMutAct_9fa48("2529")) {
        {}
      } else {
        stryCov_9fa48("2529");
        if (stryMutAct_9fa48("2533") ? cat.keywords.some(k => matchKeyword(description, k)) : stryMutAct_9fa48("2532") ? cat.keywords?.every(k => matchKeyword(description, k)) : stryMutAct_9fa48("2531") ? false : stryMutAct_9fa48("2530") ? true : (stryCov_9fa48("2530", "2531", "2532", "2533"), cat.keywords?.some(stryMutAct_9fa48("2534") ? () => undefined : (stryCov_9fa48("2534"), k => matchKeyword(description, k))))) {
          if (stryMutAct_9fa48("2535")) {
            {}
          } else {
            stryCov_9fa48("2535");
            return cat.id;
          }
        }
      }
    }
    return UNCATEGORIZED_ID;
  }
}
export function extractKeyword(desc: string): string {
  if (stryMutAct_9fa48("2536")) {
    {}
  } else {
    stryCov_9fa48("2536");
    const words = desc.split(stryMutAct_9fa48("2538") ? /\S+/ : stryMutAct_9fa48("2537") ? /\s/ : (stryCov_9fa48("2537", "2538"), /\s+/));
    let kw = words.find(stryMutAct_9fa48("2539") ? () => undefined : (stryCov_9fa48("2539"), w => stryMutAct_9fa48("2542") ? w.length > 3 || !STOP_WORDS.has(w.toUpperCase()) : stryMutAct_9fa48("2541") ? false : stryMutAct_9fa48("2540") ? true : (stryCov_9fa48("2540", "2541", "2542"), (stryMutAct_9fa48("2545") ? w.length <= 3 : stryMutAct_9fa48("2544") ? w.length >= 3 : stryMutAct_9fa48("2543") ? true : (stryCov_9fa48("2543", "2544", "2545"), w.length > 3)) && (stryMutAct_9fa48("2546") ? STOP_WORDS.has(w.toUpperCase()) : (stryCov_9fa48("2546"), !STOP_WORDS.has(stryMutAct_9fa48("2547") ? w.toLowerCase() : (stryCov_9fa48("2547"), w.toUpperCase())))))));
    if (stryMutAct_9fa48("2550") ? false : stryMutAct_9fa48("2549") ? true : stryMutAct_9fa48("2548") ? kw : (stryCov_9fa48("2548", "2549", "2550"), !kw)) kw = words[0];
    return stryMutAct_9fa48("2551") ? kw.toLowerCase() : (stryCov_9fa48("2551"), kw.toUpperCase());
  }
}