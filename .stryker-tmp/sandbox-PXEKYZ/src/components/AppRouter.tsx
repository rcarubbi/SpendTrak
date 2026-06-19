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
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ErrorBoundary from "./ErrorBoundary";
const Dashboard = lazy(stryMutAct_9fa48("38") ? () => undefined : (stryCov_9fa48("38"), () => import("../pages/Dashboard")));
const Categories = lazy(stryMutAct_9fa48("39") ? () => undefined : (stryCov_9fa48("39"), () => import("../pages/Categories")));
const ImportPage = lazy(stryMutAct_9fa48("40") ? () => undefined : (stryCov_9fa48("40"), () => import("../pages/Import")));
const Classify = lazy(stryMutAct_9fa48("41") ? () => undefined : (stryCov_9fa48("41"), () => import("../pages/Classify")));
const Statement = lazy(stryMutAct_9fa48("42") ? () => undefined : (stryCov_9fa48("42"), () => import("../pages/Statement")));
const NotFound = lazy(stryMutAct_9fa48("43") ? () => undefined : (stryCov_9fa48("43"), () => import("../pages/NotFound")));
function PageLoader() {
  if (stryMutAct_9fa48("44")) {
    {}
  } else {
    stryCov_9fa48("44");
    return <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-700 border-t-blue-500 animate-spin" />
        <span className="text-sm text-gray-400 dark:text-gray-500 animate-pulse-subtle">Loading...</span>
      </div>
    </div>;
  }
}
export default function AppRouter() {
  if (stryMutAct_9fa48("45")) {
    {}
  } else {
    stryCov_9fa48("45");
    return <ErrorBoundary>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/import" element={<ImportPage />} />
              <Route path="/classify" element={<Classify />} />
              <Route path="/statement" element={<Statement />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>;
  }
}