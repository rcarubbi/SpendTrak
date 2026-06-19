interface DebugSectionProps {
  debug: string;
}

export default function DebugSection({ debug }: DebugSectionProps) {
  if (!debug) return null;

  return (
    <details className="bg-surface/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 rounded-xl shadow-sm overflow-hidden group">
      <summary className="px-4 md:px-5 py-3 text-xs text-gray-500 dark:text-gray-400 cursor-pointer font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors select-none list-none flex items-center gap-2">
        <span className="text-gray-400 dark:text-gray-500 transition-transform group-open:rotate-90">▶</span>
        Debug
      </summary>
      <div className="px-4 md:px-5 pb-4">
        <pre className="p-3 bg-surface/40 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/30 max-h-40 overflow-auto whitespace-pre-wrap text-xs text-gray-600 dark:text-gray-400">{debug}</pre>
      </div>
    </details>
  );
}
