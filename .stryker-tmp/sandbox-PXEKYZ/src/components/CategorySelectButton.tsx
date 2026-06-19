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
interface CategorySelectButtonProps {
  name: string;
  color: string;
  onClick: () => void;
}
export default function CategorySelectButton({
  name,
  color,
  onClick
}: CategorySelectButtonProps) {
  if (stryMutAct_9fa48("176")) {
    {}
  } else {
    stryCov_9fa48("176");
    return <button onClick={onClick} className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition-all duration-200 bg-surface/80 dark:bg-gray-800/80 backdrop-blur-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm" style={stryMutAct_9fa48("177") ? {} : (stryCov_9fa48("177"), {
      borderColor: color,
      color: color
    })} onMouseEnter={e => {
      if (stryMutAct_9fa48("178")) {
        {}
      } else {
        stryCov_9fa48("178");
        e.currentTarget.style.background = color;
        e.currentTarget.style.color = stryMutAct_9fa48("179") ? "" : (stryCov_9fa48("179"), "#fff");
      }
    }} onMouseLeave={e => {
      if (stryMutAct_9fa48("180")) {
        {}
      } else {
        stryCov_9fa48("180");
        e.currentTarget.style.background = stryMutAct_9fa48("181") ? "Stryker was here!" : (stryCov_9fa48("181"), "");
        e.currentTarget.style.color = color;
      }
    }}>
      {name}
    </button>;
  }
}