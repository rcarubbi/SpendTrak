import { LogoIcon } from "./Icons";

interface SetupScreenProps {
  onPickDir: () => void;
}

export default function SetupScreen({ onPickDir }: SetupScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface/40 dark:bg-gray-950 transition-colors duration-300">
      <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-surface/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-2xl shadow-black/5 max-w-md w-full mx-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
          <LogoIcon className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">SpendTrak</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center max-w-sm">
          No data folder configured or the previous folder no longer exists.
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-xs text-center -mt-3">
          Select the <code className="text-blue-500 dark:text-blue-400">data/</code> directory of your project.
        </p>
        <button
          onClick={onPickDir}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-95"
        >
          Select data folder
        </button>
      </div>
    </div>
  );
}
