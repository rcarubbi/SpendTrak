interface UploadStatusBannerProps {
  status: string;
  loading: boolean;
}

export default function UploadStatusBanner({ status, loading }: UploadStatusBannerProps) {
  if (!status) return null;

  const isError = status.startsWith("Error");
  const isSuccess = status.startsWith("Imported");
  const isSaving = status.startsWith("Saving");

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium backdrop-blur-sm border shadow-sm ${
      isError
        ? "bg-red-50/80 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
        : isSuccess
        ? "bg-green-50/80 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
        : "bg-blue-50/80 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
    }`}>
      {loading && (
        <div className={`w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0 ${
          isSaving ? "text-green-500" : "text-blue-500"
        }`} />
      )}
      {!loading && (isError ? "⚠" : isSuccess ? "✓" : "ℹ")}
      <span className="flex-1 min-w-0">{status}</span>
    </div>
  );
}
