// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
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
export default function FileDropZone({
  dragging,
  providers,
  onDragOver,
  onDragLeave,
  onDrop,
  onFilesSelected
}: FileDropZoneProps) {
  if (stryMutAct_9fa48("361")) {
    {}
  } else {
    stryCov_9fa48("361");
    const fileRef = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (stryMutAct_9fa48("362")) {
        {}
      } else {
        stryCov_9fa48("362");
        if (stryMutAct_9fa48("364") ? false : stryMutAct_9fa48("363") ? true : (stryCov_9fa48("363", "364"), e.target.files)) {
          if (stryMutAct_9fa48("365")) {
            {}
          } else {
            stryCov_9fa48("365");
            onFilesSelected(e.target.files);
            e.target.value = stryMutAct_9fa48("366") ? "Stryker was here!" : (stryCov_9fa48("366"), "");
          }
        }
      }
    };
    return <label className={stryMutAct_9fa48("367") ? `` : (stryCov_9fa48("367"), `flex flex-col items-center justify-center gap-3 py-12 px-6 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${dragging ? stryMutAct_9fa48("368") ? "" : (stryCov_9fa48("368"), "border-blue-400 bg-blue-50/80 dark:bg-blue-900/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]") : stryMutAct_9fa48("369") ? "" : (stryCov_9fa48("369"), "border-gray-300 dark:border-gray-600 bg-surface/50 dark:bg-gray-800/50 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-surface/80 dark:hover:bg-gray-800/80")}`)} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
      <div className={stryMutAct_9fa48("370") ? `` : (stryCov_9fa48("370"), `transition-colors ${dragging ? stryMutAct_9fa48("371") ? "" : (stryCov_9fa48("371"), "text-blue-500") : stryMutAct_9fa48("372") ? "" : (stryCov_9fa48("372"), "text-gray-300 dark:text-gray-500")}`)}>
        <UploadIcon className="w-10 h-10" />
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          {dragging ? stryMutAct_9fa48("373") ? "" : (stryCov_9fa48("373"), "Drop files here") : stryMutAct_9fa48("374") ? "" : (stryCov_9fa48("374"), "Drag files or click to select")}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Supports CSV, PDF, and bank statement exports
        </p>
      </div>
      <span className="inline-block px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-semibold cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all shadow-sm hover:shadow-md active:scale-95">
        Select files
      </span>
      <input id="file-upload" name="fileInput" ref={fileRef} type="file" multiple accept={providers.map(stryMutAct_9fa48("375") ? () => undefined : (stryCov_9fa48("375"), p => p.accept)).join(stryMutAct_9fa48("376") ? "" : (stryCov_9fa48("376"), ","))} onChange={handleChange} className="hidden" data-testid="file-input" />
    </label>;
  }
}