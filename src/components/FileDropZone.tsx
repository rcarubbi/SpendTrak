import { useRef } from "react";
import type { UploadProvider } from "../providers/types";

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
      className={`border-2 border-dashed rounded-xl p-10 text-center mb-6 block cursor-pointer transition-colors ${
        dragging
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <p className="text-base text-gray-500 dark:text-gray-400 mb-3">
        {dragging ? "Drop files here" : "Drag files or click to select"}
      </p>
      <span className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
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
