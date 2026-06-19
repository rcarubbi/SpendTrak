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
import { useEffect, useState } from "react";
import { useCategoryStore } from "./stores/categoryStore";
import { useTransactionStore } from "./stores/transactionStore";
import { toastError } from "./stores/toastStore";
import { ensureDataDir, pickDataDir } from "./utils/fileSystem";
import SetupScreen from "./components/SetupScreen";
import AppRouter from "./components/AppRouter";
type AppState = "loading" | "setup" | "ready";
export default function App() {
  if (stryMutAct_9fa48("0")) {
    {}
  } else {
    stryCov_9fa48("0");
    const [state, setState] = useState<AppState>(stryMutAct_9fa48("1") ? "" : (stryCov_9fa48("1"), "loading"));
    const boot = async () => {
      if (stryMutAct_9fa48("2")) {
        {}
      } else {
        stryCov_9fa48("2");
        try {
          if (stryMutAct_9fa48("3")) {
            {}
          } else {
            stryCov_9fa48("3");
            const handle = await ensureDataDir();
            if (stryMutAct_9fa48("5") ? false : stryMutAct_9fa48("4") ? true : (stryCov_9fa48("4", "5"), handle)) {
              if (stryMutAct_9fa48("6")) {
                {}
              } else {
                stryCov_9fa48("6");
                await Promise.all(stryMutAct_9fa48("7") ? [] : (stryCov_9fa48("7"), [useCategoryStore.getState().init(), useTransactionStore.getState().init()]));
                setState(stryMutAct_9fa48("8") ? "" : (stryCov_9fa48("8"), "ready"));
                return;
              }
            }
          }
        } catch (err) {
          if (stryMutAct_9fa48("9")) {
            {}
          } else {
            stryCov_9fa48("9");
            toastError(stryMutAct_9fa48("10") ? "" : (stryCov_9fa48("10"), "App failed to start — pick your data folder"), err instanceof Error ? err.stack : String(err));
            console.error(stryMutAct_9fa48("11") ? "" : (stryCov_9fa48("11"), "App: boot failed"), err);
          }
        }
        setState(stryMutAct_9fa48("12") ? "" : (stryCov_9fa48("12"), "setup"));
      }
    };
    const handlePickDir = async () => {
      if (stryMutAct_9fa48("13")) {
        {}
      } else {
        stryCov_9fa48("13");
        setState(stryMutAct_9fa48("14") ? "" : (stryCov_9fa48("14"), "loading"));
        try {
          if (stryMutAct_9fa48("15")) {
            {}
          } else {
            stryCov_9fa48("15");
            await pickDataDir();
            await Promise.all(stryMutAct_9fa48("16") ? [] : (stryCov_9fa48("16"), [useCategoryStore.getState().init(), useTransactionStore.getState().init()]));
            setState(stryMutAct_9fa48("17") ? "" : (stryCov_9fa48("17"), "ready"));
          }
        } catch (err) {
          if (stryMutAct_9fa48("18")) {
            {}
          } else {
            stryCov_9fa48("18");
            if (stryMutAct_9fa48("21") ? (err as DOMException).name === "AbortError" : stryMutAct_9fa48("20") ? false : stryMutAct_9fa48("19") ? true : (stryCov_9fa48("19", "20", "21"), (err as DOMException).name !== (stryMutAct_9fa48("22") ? "" : (stryCov_9fa48("22"), "AbortError")))) {
              if (stryMutAct_9fa48("23")) {
                {}
              } else {
                stryCov_9fa48("23");
                alert((stryMutAct_9fa48("24") ? "" : (stryCov_9fa48("24"), "Error picking folder: ")) + (err instanceof Error ? err.message : String(err)));
              }
            }
            setState(stryMutAct_9fa48("25") ? "" : (stryCov_9fa48("25"), "setup"));
          }
        }
      }
    };
    useEffect(() => {
      if (stryMutAct_9fa48("26")) {
        {}
      } else {
        stryCov_9fa48("26");
        boot(); /* eslint-disable-line react-hooks/set-state-in-effect */
      }
    }, stryMutAct_9fa48("27") ? ["Stryker was here"] : (stryCov_9fa48("27"), []));
    if (stryMutAct_9fa48("30") ? state !== "loading" : stryMutAct_9fa48("29") ? false : stryMutAct_9fa48("28") ? true : (stryCov_9fa48("28", "29", "30"), state === (stryMutAct_9fa48("31") ? "" : (stryCov_9fa48("31"), "loading")))) {
      if (stryMutAct_9fa48("32")) {
        {}
      } else {
        stryCov_9fa48("32");
        return <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        Loading...
      </div>;
      }
    }
    if (stryMutAct_9fa48("35") ? state !== "setup" : stryMutAct_9fa48("34") ? false : stryMutAct_9fa48("33") ? true : (stryCov_9fa48("33", "34", "35"), state === (stryMutAct_9fa48("36") ? "" : (stryCov_9fa48("36"), "setup")))) {
      if (stryMutAct_9fa48("37")) {
        {}
      } else {
        stryCov_9fa48("37");
        return <SetupScreen onPickDir={handlePickDir} />;
      }
    }
    return <AppRouter />;
  }
}