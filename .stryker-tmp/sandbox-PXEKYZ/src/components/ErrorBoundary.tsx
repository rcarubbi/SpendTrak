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
import { Component, type ErrorInfo, type ReactNode } from "react";
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}
interface State {
  hasError: boolean;
  error: Error | null;
}
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = stryMutAct_9fa48("342") ? {} : (stryCov_9fa48("342"), {
      hasError: stryMutAct_9fa48("343") ? true : (stryCov_9fa48("343"), false),
      error: null
    });
  }
  static getDerivedStateFromError(error: Error): State {
    if (stryMutAct_9fa48("344")) {
      {}
    } else {
      stryCov_9fa48("344");
      return stryMutAct_9fa48("345") ? {} : (stryCov_9fa48("345"), {
        hasError: stryMutAct_9fa48("346") ? false : (stryCov_9fa48("346"), true),
        error
      });
    }
  }
  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (stryMutAct_9fa48("347")) {
      {}
    } else {
      stryCov_9fa48("347");
      console.error(stryMutAct_9fa48("348") ? "" : (stryCov_9fa48("348"), "ErrorBoundary caught:"), error, info.componentStack);
    }
  }
  handleRetry = () => {
    if (stryMutAct_9fa48("349")) {
      {}
    } else {
      stryCov_9fa48("349");
      this.setState(stryMutAct_9fa48("350") ? {} : (stryCov_9fa48("350"), {
        hasError: stryMutAct_9fa48("351") ? true : (stryCov_9fa48("351"), false),
        error: null
      }));
    }
  };
  render() {
    if (stryMutAct_9fa48("352")) {
      {}
    } else {
      stryCov_9fa48("352");
      if (stryMutAct_9fa48("354") ? false : stryMutAct_9fa48("353") ? true : (stryCov_9fa48("353", "354"), this.state.hasError)) {
        if (stryMutAct_9fa48("355")) {
          {}
        } else {
          stryCov_9fa48("355");
          if (stryMutAct_9fa48("357") ? false : stryMutAct_9fa48("356") ? true : (stryCov_9fa48("356", "357"), this.props.fallback)) return this.props.fallback;
          return <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h2>
          <p className="text-gray-500 text-sm mb-4 max-w-md">
            {stryMutAct_9fa48("358") ? this.state.error?.message && "Unknown error" : (stryCov_9fa48("358"), (stryMutAct_9fa48("359") ? this.state.error.message : (stryCov_9fa48("359"), this.state.error?.message)) ?? (stryMutAct_9fa48("360") ? "" : (stryCov_9fa48("360"), "Unknown error")))}
          </p>
          <button onClick={this.handleRetry} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
            Try again
          </button>
        </div>;
        }
      }
      return this.props.children;
    }
  }
}