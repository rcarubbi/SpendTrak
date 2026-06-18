interface ClassifyHeaderProps {
  unknownCount: number;
  loading: boolean;
  onReclassifyAll: () => void;
}

export default function ClassifyHeader({ unknownCount, loading, onReclassifyAll }: ClassifyHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold dark:text-gray-100">Classify ({unknownCount})</h1>
      <button
        onClick={onReclassifyAll}
        disabled={loading}
        className="px-3 py-2 rounded-md text-sm font-semibold border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer disabled:opacity-50"
      >
        Reclassify all
      </button>
    </div>
  );
}
