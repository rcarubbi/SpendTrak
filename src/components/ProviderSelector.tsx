import type { UploadProvider } from "../providers/types";

interface ProviderSelectorProps {
  selectedProvider: string;
  providers: UploadProvider[];
  onChange: (value: string) => void;
}

export default function ProviderSelector({ selectedProvider, providers, onChange }: ProviderSelectorProps) {
  return (
    <select
      value={selectedProvider}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all"
    >
      <option value="auto" className="bg-white dark:bg-gray-800">Auto-detect</option>
      {providers.map((p) => (
        <option key={p.id} value={p.id} className="bg-white dark:bg-gray-800">{p.name}</option>
      ))}
    </select>
  );
}
