interface DebugSectionProps {
  debug: string;
}

export default function DebugSection({ debug }: DebugSectionProps) {
  if (!debug) return null;

  return (
    <details className="mb-4 text-xs text-gray-500 dark:text-gray-400">
      <summary className="cursor-pointer font-semibold">Debug</summary>
      <pre className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 max-h-40 overflow-auto whitespace-pre-wrap dark:text-gray-300">{debug}</pre>
    </details>
  );
}
