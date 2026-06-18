import type { UploadProvider } from "../providers/types";

interface ProviderSelectorProps {
  selectedProvider: string;
  providers: UploadProvider[];
  onChange: (value: string) => void;
}

export default function ProviderSelector({ selectedProvider, providers, onChange }: ProviderSelectorProps) {
  return (
    <div className="flex gap-3 items-center mb-4">
      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Provider:</label>
      <select
        value={selectedProvider}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
      >
        <option value="auto">Auto-detect</option>
        {providers.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
    </div>
  );
}
