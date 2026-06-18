import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ErrorBoundary from "./ErrorBoundary";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Categories = lazy(() => import("../pages/Categories"));
const Upload = lazy(() => import("../pages/Upload"));
const Classify = lazy(() => import("../pages/Classify"));
const Statement = lazy(() => import("../pages/Statement"));
const NotFound = lazy(() => import("../pages/NotFound"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
      Loading...
    </div>
  );
}

export default function AppRouter() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/classify" element={<Classify />} />
              <Route path="/statement" element={<Statement />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
