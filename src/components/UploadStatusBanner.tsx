interface UploadStatusBannerProps {
  status: string;
  loading: boolean;
}

export default function UploadStatusBanner({ status, loading }: UploadStatusBannerProps) {
  if (!status) return null;

  return (
    <div className={`flex items-center gap-2 px-4 py-3 rounded-lg mb-4 text-sm font-semibold ${
      status.startsWith("Error")
        ? "bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300"
        : status.startsWith("Imported") || status.startsWith("Saving")
        ? "bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300"
        : "bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300"
    }`}>
      {loading && <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />}
      {status}
    </div>
  );
}
