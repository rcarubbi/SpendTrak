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
import { useState } from "react";
import toast from "react-hot-toast";
export function toastSuccess(message: string): void {
  if (stryMutAct_9fa48("2191")) {
    {}
  } else {
    stryCov_9fa48("2191");
    toast.success(message, stryMutAct_9fa48("2192") ? {} : (stryCov_9fa48("2192"), {
      duration: 4000
    }));
  }
}
export function toastError(message: string, details?: string): void {
  if (stryMutAct_9fa48("2193")) {
    {}
  } else {
    stryCov_9fa48("2193");
    if (stryMutAct_9fa48("2195") ? false : stryMutAct_9fa48("2194") ? true : (stryCov_9fa48("2194", "2195"), details)) {
      if (stryMutAct_9fa48("2196")) {
        {}
      } else {
        stryCov_9fa48("2196");
        toast.custom(stryMutAct_9fa48("2197") ? () => undefined : (stryCov_9fa48("2197"), t => <ErrorToast toastId={t.id} message={message} details={details} />), stryMutAct_9fa48("2198") ? {} : (stryCov_9fa48("2198"), {
          duration: Infinity
        }));
      }
    } else {
      if (stryMutAct_9fa48("2199")) {
        {}
      } else {
        stryCov_9fa48("2199");
        toast.error(message, stryMutAct_9fa48("2200") ? {} : (stryCov_9fa48("2200"), {
          duration: 6000
        }));
      }
    }
  }
}
function ErrorToast({
  toastId,
  message,
  details
}: {
  toastId: string;
  message: string;
  details: string;
}) {
  if (stryMutAct_9fa48("2201")) {
    {}
  } else {
    stryCov_9fa48("2201");
    const [showDetails, setShowDetails] = useState(stryMutAct_9fa48("2202") ? true : (stryCov_9fa48("2202"), false));
    return <div className="bg-red-600 text-white rounded-lg shadow-lg px-4 py-3 text-sm max-w-sm w-full pointer-events-auto">
      <div className="flex items-start justify-between gap-2">
        <span className="flex-1 break-words">{message}</span>
        <button onClick={stryMutAct_9fa48("2203") ? () => undefined : (stryCov_9fa48("2203"), () => toast.dismiss(toastId))} className="text-white/80 hover:text-white shrink-0 cursor-pointer leading-none text-lg" aria-label="Dismiss">
          ×
        </button>
      </div>
      <button onClick={stryMutAct_9fa48("2204") ? () => undefined : (stryCov_9fa48("2204"), () => setShowDetails(stryMutAct_9fa48("2205") ? showDetails : (stryCov_9fa48("2205"), !showDetails)))} className="text-white/70 hover:text-white underline text-xs self-start cursor-pointer">
        {showDetails ? stryMutAct_9fa48("2206") ? "" : (stryCov_9fa48("2206"), "Hide details") : stryMutAct_9fa48("2207") ? "" : (stryCov_9fa48("2207"), "Details")}
      </button>
      {stryMutAct_9fa48("2210") ? showDetails || <pre className="text-xs text-white/80 mt-1 max-h-40 overflow-auto whitespace-pre-wrap break-all bg-black/20 rounded p-2">
          {details}
        </pre> : stryMutAct_9fa48("2209") ? false : stryMutAct_9fa48("2208") ? true : (stryCov_9fa48("2208", "2209", "2210"), showDetails && <pre className="text-xs text-white/80 mt-1 max-h-40 overflow-auto whitespace-pre-wrap break-all bg-black/20 rounded p-2">
          {details}
        </pre>)}
    </div>;
  }
}