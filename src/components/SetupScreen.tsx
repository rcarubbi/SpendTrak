interface SetupScreenProps {
  onPickDir: () => void;
}

export default function SetupScreen({ onPickDir }: SetupScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-xl font-bold">SpendTrak</h1>
      <p className="text-gray-500 text-sm text-center max-w-md">
        No data folder configured or the previous folder no longer exists.
      </p>
      <p className="text-gray-400 text-xs text-center max-w-md -mt-2">
        Select the <code>data/</code> directory of your project (or create a new one).
      </p>
      <button
        onClick={onPickDir}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Select data folder
      </button>
    </div>
  );
}
