import { useRef } from "react";
import type { UploadProvider } from "../providers/types";
import { UploadIcon } from "./Icons";

interface FileDropZoneProps {
  dragging: boolean;
  providers: UploadProvider[];
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFilesSelected: (files: FileList) => void;
}

export default function FileDropZone({ dragging, providers, onDragOver, onDragLeave, onDrop, onFilesSelected }: FileDropZoneProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(e.target.files);
      e.target.value = "";
    }
  };

  return (
    <label
      className={`flex flex-col items-center justify-center gap-3 py-12 px-6 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
        dragging
          ? "border-blue-400 bg-blue-50/80 dark:bg-blue-900/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
          : "border-gray-300 dark:border-gray-600 bg-surface/50 dark:bg-gray-800/50 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-surface/80 dark:hover:bg-gray-800/80"
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className={`transition-colors ${dragging ? "text-blue-500" : "text-gray-300 dark:text-gray-500"}`}>
        <UploadIcon className="w-10 h-10" />
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          {dragging ? "Drop files here" : "Drag files or click to select"}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Supports CSV, PDF, and bank statement exports
        </p>
      </div>
      <span className="inline-block px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-semibold cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all shadow-sm hover:shadow-md active:scale-95">
        Select files
      </span>
      <input
        id="file-upload"
        name="fileInput"
        ref={fileRef}
        type="file"
        multiple
        accept={providers.map((p) => p.accept).join(",")}
        onChange={handleChange}
        className="hidden"
      />
    </label>
  );
}
