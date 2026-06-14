import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import { useCategoryStore } from "./stores/categoryStore";
import { useTransactionStore } from "./stores/transactionStore";
import { useBudgetStore } from "./stores/budgetStore";
import { ensureDataDir, pickDataDir } from "./utils/fileSystem";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Categories = lazy(() => import("./pages/Categories"));
const Upload = lazy(() => import("./pages/Upload"));
const Classify = lazy(() => import("./pages/Classify"));
const Statement = lazy(() => import("./pages/Statement"));

type AppState = "loading" | "setup" | "ready";

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
      Carregando...
    </div>
  );
}

export default function App() {
  const [state, setState] = useState<AppState>("loading");

  const boot = async () => {
    try {
      const handle = await ensureDataDir();
      if (handle) {
        await Promise.all([
          useCategoryStore.getState().init(),
          useTransactionStore.getState().init(),
          useBudgetStore.getState().init(),
        ]);
        setState("ready");
        return;
      }
    } catch {
      // handle or init failed — fall through to setup
    }
    setState("setup");
  };

  const handlePickDir = async () => {
    setState("loading");
    try {
      await pickDataDir();
      await Promise.all([
        useCategoryStore.getState().init(),
        useTransactionStore.getState().init(),
        useBudgetStore.getState().init(),
      ]);
      setState("ready");
    } catch (err) {
      if ((err as DOMException).name !== "AbortError") {
        alert("Erro ao selecionar pasta: " + (err instanceof Error ? err.message : String(err)));
      }
      setState("setup");
    }
  };

  useEffect(() => { boot(); /* eslint-disable-line react-hooks/set-state-in-effect */ }, []);

  if (state === "loading") {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        Carregando...
      </div>
    );
  }

  if (state === "setup") {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-xl font-bold">Spending Tracker</h1>
        <p className="text-gray-500 text-sm text-center max-w-md">
          Nenhuma pasta de dados configurada ou a pasta anterior não existe mais.
        </p>
        <p className="text-gray-400 text-xs text-center max-w-md -mt-2">
          Selecione o diretório <code>data/</code> do seu projeto (ou crie um novo).
        </p>
        <button
          onClick={handlePickDir}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Selecionar pasta de dados
        </button>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Layout>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/classify" element={<Classify />} />
              <Route path="/statement" element={<Statement />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </BrowserRouter>
  );
}
