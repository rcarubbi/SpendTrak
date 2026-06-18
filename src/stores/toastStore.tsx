import { useState } from "react";
import toast from "react-hot-toast";

export function toastSuccess(message: string): void {
  toast.success(message, { duration: 4000 });
}

export function toastError(message: string, details?: string): void {
  if (details) {
    toast.custom(
      (t) => <ErrorToast toastId={t.id} message={message} details={details} />,
      { duration: Infinity }
    );
  } else {
    toast.error(message, { duration: 6000 });
  }
}

function ErrorToast({ toastId, message, details }: { toastId: string; message: string; details: string }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-red-600 text-white rounded-lg shadow-lg px-4 py-3 text-sm max-w-sm w-full pointer-events-auto">
      <div className="flex items-start justify-between gap-2">
        <span className="flex-1 break-words">{message}</span>
        <button
          onClick={() => toast.dismiss(toastId)}
          className="text-white/80 hover:text-white shrink-0 cursor-pointer leading-none text-lg"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-white/70 hover:text-white underline text-xs self-start cursor-pointer"
      >
        {showDetails ? "Hide details" : "Details"}
      </button>
      {showDetails && (
        <pre className="text-xs text-white/80 mt-1 max-h-40 overflow-auto whitespace-pre-wrap break-all bg-black/20 rounded p-2">
          {details}
        </pre>
      )}
    </div>
  );
}
