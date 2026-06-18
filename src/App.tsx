import { useEffect, useState } from "react";
import { useCategoryStore } from "./stores/categoryStore";
import { useTransactionStore } from "./stores/transactionStore";
import { ensureDataDir, pickDataDir } from "./utils/fileSystem";
import SetupScreen from "./components/SetupScreen";
import AppRouter from "./components/AppRouter";

type AppState = "loading" | "setup" | "ready";

export default function App() {
  const [state, setState] = useState<AppState>("loading");

  const boot = async () => {
    try {
      const handle = await ensureDataDir();
      if (handle) {
        await Promise.all([
          useCategoryStore.getState().init(),
          useTransactionStore.getState().init(),
        ]);
        setState("ready");
        return;
      }
    } catch (err) {
      console.error("App: boot failed", err);
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
      ]);
      setState("ready");
    } catch (err) {
      if ((err as DOMException).name !== "AbortError") {
        alert("Error picking folder: " + (err instanceof Error ? err.message : String(err)));
      }
      setState("setup");
    }
  };

  useEffect(() => { boot(); /* eslint-disable-line react-hooks/set-state-in-effect */ }, []);

  if (state === "loading") {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        Loading...
      </div>
    );
  }

  if (state === "setup") {
    return <SetupScreen onPickDir={handlePickDir} />;
  }

  return <AppRouter />;
}
